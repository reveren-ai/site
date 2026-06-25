#!/usr/bin/env bash
# Branch-aware pre-push validation for the reveren site.
#
# Pushes to `main` run the FULL gate — typecheck + lint + test:run + test:e2e.
# This site's GitHub Actions gates push-to-main (and PR-to-main) on exactly
# those checks, e2e included — unlike sister repos whose CI has no e2e — so
# the local gate mirrors CI and a CI failure becomes the exception. e2e
# catches selector / copy / hydration drift that unit tests cannot (e.g. a
# pricing-copy rename that left a stale landing-IA assertion). The sync flow
# promotes to main on every change, so this is the gate that matters most.
#
# Pushes to any other branch run a SCOPED gate:
#   - typecheck (always full — TS errors cascade across files)
#   - lint on changed JS/TS files only
#   - vitest --changed against the diff base
# CI still runs the full suite (incl. e2e) when the branch hits a PR to main,
# and the next promotion to main re-runs e2e locally anyway.
#
# e2e runs on a dedicated PORT (3137) so Playwright boots the site's OWN dev
# server rather than reusing whatever already listens on :3000 (a sibling
# project's dev server, say) — reuseExistingServer is on for non-CI runs, so
# without this the suite would silently test the wrong app and fail.
#
# Explicit skip: `PRE_PUSH_SKIP=1 git push` — for trivial / low-surface
# changes where the full gate is overkill. CI on PR-to-main is still the
# safety net. Prefer this over `--no-verify` so the intent is logged.
#
# Bypass in an emergency: `git push --no-verify` (use sparingly).

set -e

if [ -n "$PRE_PUSH_SKIP" ] && [ "$PRE_PUSH_SKIP" != "0" ]; then
  echo "▶ PRE_PUSH_SKIP set — skipping pre-push validation"
  exit 0
fi

# Dedicated port for the local e2e run so we never reuse a stray dev server
# on :3000. Override with PRE_PUSH_E2E_PORT if 3137 is taken.
E2E_PORT="${PRE_PUSH_E2E_PORT:-3137}"

ZERO_SHA="0000000000000000000000000000000000000000"
FULL_MODE=0
DIFF_BASE=""

# Pre-push hook stdin: <local_ref> <local_sha> <remote_ref> <remote_sha>
while read -r local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_ref" = "refs/heads/main" ]; then
    FULL_MODE=1
    break
  fi
  if [ "$remote_sha" = "$ZERO_SHA" ]; then
    if git rev-parse --verify --quiet origin/main >/dev/null; then
      DIFF_BASE="$(git merge-base "$local_sha" origin/main 2>/dev/null || git rev-parse origin/main)"
    else
      DIFF_BASE="${local_sha}~1"
    fi
  else
    DIFF_BASE="$remote_sha"
  fi
done

# --- Dev-server handoff for the local e2e run -------------------------------
# Next.js 16 allows only ONE dev server per project directory (not per port).
# The e2e stage boots the site's own dev server, so any dev server you already
# have running for this repo blocks it ("Another next dev server is already
# running") and the push aborts. To keep `git push` from interrupting your
# workflow, we stop a standing dev server before e2e and ALWAYS restart it
# afterwards — on the same port — whether the gate passes, fails, or aborts.
#
# Next records the running server in `.next/dev/lock` as {"pid":…,"port":…},
# which is how we find it and which port to bring it back on. On CI there's no
# standing dev server, so all of this is a no-op.
DEV_LOCK=".next/dev/lock"
DEV_RESTART_PORT=""

_lock_pid() { grep -o '"pid":[0-9]*' "$DEV_LOCK" 2>/dev/null | grep -o '[0-9]*' | head -1; }
_lock_port() { grep -o '"port":[0-9]*' "$DEV_LOCK" 2>/dev/null | grep -o '[0-9]*' | head -1; }

# Runs on EXIT (success, failure, or set -e abort) once armed — this is the
# "always restart after" guarantee.
restart_dev_server() {
  [ -z "$DEV_RESTART_PORT" ] && return 0
  # Wait for the e2e dev server to release the per-dir lock.
  _n=0
  while [ -f "$DEV_LOCK" ] && [ "$_n" -lt 6 ]; do
    _p="$(_lock_pid)"
    { [ -n "$_p" ] && kill -0 "$_p" 2>/dev/null; } || break
    _n=$((_n + 1)); sleep 1
  done
  # Hard-stop any lingering same-dir server (e.g. an e2e server Playwright did
  # not reap) so Next's one-server-per-dir guard does not reject the restart.
  if [ -f "$DEV_LOCK" ]; then
    _p="$(_lock_pid)"
    if [ -n "$_p" ] && kill -0 "$_p" 2>/dev/null; then kill "$_p" 2>/dev/null || true; sleep 1; fi
  fi
  # Belt-and-braces: free the target port in case a worker still lingers.
  if command -v lsof >/dev/null 2>&1; then
    _hold="$(lsof -ti tcp:"$DEV_RESTART_PORT" 2>/dev/null || true)"
    [ -n "$_hold" ] && kill $_hold 2>/dev/null || true
  fi
  echo "▶ Restarting your dev server on port $DEV_RESTART_PORT (it was stopped for e2e)"
  PORT="$DEV_RESTART_PORT" nohup pnpm dev >"/tmp/reveren-dev-restart-${DEV_RESTART_PORT}.log" 2>&1 &
  disown 2>/dev/null || true
}

# Stop a standing dev server for THIS directory so the e2e stage can boot its
# own. Arms the EXIT trap only when we actually stop one — so a failed
# typecheck/lint/unit run (which happens before this) never disturbs the
# server, and the scoped gate never touches it either.
stop_standing_dev_server() {
  [ "${CI:-}" = "true" ] && return 0
  [ -f "$DEV_LOCK" ] || return 0
  _pid="$(_lock_pid)"; _port="$(_lock_port)"
  [ -n "$_pid" ] || return 0
  kill -0 "$_pid" 2>/dev/null || return 0   # stale lock (dead pid) — no conflict
  DEV_RESTART_PORT="${_port:-3000}"
  echo "▶ Stopping your dev server (pid $_pid, port $DEV_RESTART_PORT) so e2e can boot its own — it will be restarted after"
  trap restart_dev_server EXIT
  kill "$_pid" 2>/dev/null || true
  _n=0
  while kill -0 "$_pid" 2>/dev/null && [ "$_n" -lt 6 ]; do _n=$((_n + 1)); sleep 1; done
  # Next runs a parent + a worker; free anything still holding the port so the
  # same-port restart later isn't bumped onto a different port. Safe because
  # DEV_RESTART_PORT is this repo's own dev port, read from its lock.
  if command -v lsof >/dev/null 2>&1; then
    _hold="$(lsof -ti tcp:"$DEV_RESTART_PORT" 2>/dev/null || true)"
    [ -n "$_hold" ] && kill $_hold 2>/dev/null || true
  fi
}

run_full_gate() {
  echo "▶ Pushing to main — running FULL pre-push gate (typecheck + lint + unit + e2e)"
  pnpm pre-push
  stop_standing_dev_server
  echo "▶ E2E (playwright) on port $E2E_PORT"
  PORT="$E2E_PORT" pnpm test:e2e
}

if [ "$FULL_MODE" = "1" ]; then
  run_full_gate
  exit 0
fi

if [ -z "$DIFF_BASE" ]; then
  echo "▶ No diff base detected — running FULL pre-push gate"
  run_full_gate
  exit 0
fi

SHORT_BASE="$(git rev-parse --short "$DIFF_BASE" 2>/dev/null || echo "$DIFF_BASE")"
echo "▶ Scoped pre-push gate (base: $SHORT_BASE)"

pnpm typecheck

# The diff is computed from the commit range, but eslint reads the working
# tree. A path that existed in the pushed commit yet is absent on disk —
# deleted in a later commit, or in a concurrent working-tree edit — makes
# eslint hard-fail with "No files matching the pattern" and blocks the push.
# So lint only the changed paths that still exist on disk, and log the rest.
# `mapfile`/`readarray` is bash 4+, but macOS ships bash 3.2 — so read the
# changed paths into the array with a portable while-read loop instead.
ALL_CHANGED=()
while IFS= read -r _changed_path; do
  ALL_CHANGED+=("$_changed_path")
done < <(git diff --name-only --diff-filter=ACMRTUXB "$DIFF_BASE"...HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.mjs' '*.cjs' 2>/dev/null || true)
EXISTING=()
DROPPED=()
for f in "${ALL_CHANGED[@]}"; do
  [ -z "$f" ] && continue
  if [ -f "$f" ]; then EXISTING+=("$f"); else DROPPED+=("$f"); fi
done

if [ "${#DROPPED[@]}" -gt 0 ]; then
  echo "▶ Skipping lint for ${#DROPPED[@]} changed path(s) no longer on disk (deleted/moved since the pushed commit):"
  printf '  - %s\n' "${DROPPED[@]}"
fi

if [ "${#EXISTING[@]}" -gt 0 ]; then
  echo "▶ Lint scope:"
  printf '  %s\n' "${EXISTING[@]}"
  pnpm exec eslint --no-warn-ignored "${EXISTING[@]}"
else
  echo "▶ Lint skipped — no existing JS/TS file changes since $SHORT_BASE"
fi

echo "▶ Tests related to changes since $SHORT_BASE"
pnpm exec vitest run --changed "$DIFF_BASE"

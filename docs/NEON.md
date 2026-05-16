# Neon Postgres — Operations Guide

> Migration cadence, branch model, and operational details for the
> Neon-backed projects on this stack. Companion to `PRE_PRODUCTION.md`
> (initial setup) and `docs/Site/02-UX-PLAN.md` (per-project schema decisions).
>
> _Maintainer: Innocent Muisha. Last updated 2026-05-10._

---

## Branch model

One Neon **project** per app. Three **branches** within the project:

| Neon branch | Maps to Vercel | Public URL | Purpose |
|---|---|---|---|
| `main` | Production scope | `<domain>` | Live user data — schema + writes are real. PITR is your only recovery. |
| `uat` | Preview, `uat` git branch | `uat.<domain>` | Pre-prod soak. Schema should match `main` ± latest pending migration. |
| `develop` | Preview, `develop` git branch | `dev.<domain>` | Active dev. Migrations land here first. Local `.env.local` points here. |

Neon branches are **copy-on-write** — creating a new branch from main
costs nothing in storage until writes diverge. Use that to your
advantage.

---

## Migration cadence

### Daily / per-feature flow

```
feature branch  →  PR to develop  →  merge
                     ↓
              Vercel builds develop branch
                     ↓
              `prisma migrate deploy` runs against DEV Neon branch
                     ↓
              Verify on dev.<domain>
                     ↓
              PR develop → uat → merge
                     ↓
              `prisma migrate deploy` runs against UAT Neon branch
                     ↓
              Soak on uat.<domain> (24h+ for risky migrations)
                     ↓
              PR uat → main → merge
                     ↓
              `prisma migrate deploy` runs against PROD Neon branch
                     ↓
              Verify on <domain>
```

Each migration applies **once per branch** because Prisma tracks the
applied set in `_prisma_migrations` table per database.

### Rules

1. **Never edit a migration after it's been applied to any environment.**
   Once `prisma migrate dev` has written a migration file, changing it
   means you have a different migration than what ran on uat/prod.
   Create a new migration that fixes the issue instead.

2. **Always migrate in the dev → uat → main direction.** If you need to
   apply a migration directly to prod (emergency), document it in
   `docs/INCIDENTS.md` and back-port to uat + dev manually.

3. **Risky migrations soak on uat for 24h.** "Risky" =
   data-deleting, NOT NULL on existing column, type change on a
   populated column, index on a large table. Non-risky =
   adding a new table, adding a nullable column.

4. **No data-only changes via migrations.** Migrations are schema only.
   Use seed scripts (`prisma/seed.ts`) or one-off scripts in
   `scripts/` for data backfills.

### How `prisma migrate deploy` runs in CI

The Vercel build script (per `package.json`) is:

```
prisma generate && prisma migrate deploy && next build
```

`prisma migrate deploy`:
- Reads pending migrations from `prisma/migrations/`
- Applies them to whichever DB `DIRECT_URL` env var points at
- Idempotent — re-running the same build doesn't re-apply
- Non-interactive (no `prisma migrate dev`-style prompts)

If `prisma migrate deploy` fails, the build fails, and the deploy
doesn't promote. So a broken migration on `develop` is caught at
deploy-time, not at runtime.

---

## Connection strings

Neon gives two strings per branch. **Both go into Vercel env vars** for
each environment scope:

| Var | Source | Used for |
|---|---|---|
| `DATABASE_URL` | Pooled (host has `-pooler` suffix) | App runtime — serverless function handlers via `@prisma/adapter-neon` |
| `DIRECT_URL` | Direct (no `-pooler` suffix) | `prisma migrate` — pgbouncer doesn't support advisory locks Prisma uses |

**On feature-branch previews**, the Neon Vercel integration auto-provisions
`DATABASE_URL` + `DATABASE_URL_UNPOOLED` (Neon's name for the direct
connection). `prisma.config.ts` reads `DIRECT_URL ?? DATABASE_URL_UNPOOLED
?? DATABASE_URL` so both naming conventions work without per-branch fiddling.
Long-lived branches (`develop`, `uat`, `main`) keep using the hand-set
`DIRECT_URL` since their Vercel branch-scoped env vars win over the
integration's generic Preview-scope vars.

**Why both**: pgbouncer (the pooler) batches many client connections
into a few real Postgres connections. It doesn't support session-level
features like advisory locks, prepared statements (in some modes), or
SET commands. Prisma migrations need those, so they hit Postgres
directly. Runtime queries don't need them, so they go through the pool
to avoid burning connections at scale.

**Deriving DIRECT_URL from a pooled string**: drop the `-pooler` from
the host. e.g.
- Pooled: `postgres://user:pw@ep-frosty-rain-xxx-pooler.region.aws.neon.tech/db?…`
- Direct: `postgres://user:pw@ep-frosty-rain-xxx.region.aws.neon.tech/db?…`

---

## Compute autosuspend

Neon Free tier suspends compute after 5 min idle → first request after
suspend pays ~500ms cold start.

| Branch | Default | Recommended |
|---|---|---|
| `develop` | autosuspend on | leave on (saves $) |
| `uat` | autosuspend on | leave on |
| `main` (post-launch with traffic) | autosuspend on | **disable** for production once you have a real user load — cold starts on the waitlist insert path are user-visible |

Disable: Neon dashboard → branch → Settings → "Suspend compute after
inactivity" → set to **Never** (Pro plan only). On Free, your only
option is the default 5 min.

---

## Backups + recovery

### Point-in-time recovery (PITR)

| Plan | PITR retention |
|---|---|
| Free | 24 hours |
| Pro | 7 days |
| Scale | 30 days |

PITR is automatic — no setup. Restore via Neon dashboard → Branches →
"Restore branch to point in time".

### Manual snapshots

Not needed for waitlist-volume data. If/when the schema gets richer
(subscriptions, user content), set up `pg_dump` to S3 weekly via a
cron-triggered Vercel function.

---

## Branch refresh workflow

Over time, `develop` and `uat` will drift from `main` — schema
divergence (migrations soaking on uat that haven't promoted) plus
data divergence (test rows in uat, real users in prod). Periodically
**refresh** the non-prod branches:

### When to refresh

- Major release just landed on `main` and you want uat/dev to match
- Test data has accumulated and is hiding real bugs
- Schema between branches has diverged in confusing ways

### How to refresh

Neon dashboard → branch (e.g. `uat`) → "Reset from parent" → choose
`main` as the source. Copy-on-write means this is fast (~seconds) and
doesn't cost anything until uat writes start diverging again.

After refresh:
1. `git checkout uat && git merge main && git push origin uat` — keep
   the git branch + Neon branch in sync.
2. Run any test-only seed if needed (`pnpm db:seed:test`).

**Don't refresh during active QA on uat** — you'll wipe the rows the
QA team is depending on. Coordinate.

---

## Storage + connection limits

| Plan | Storage | Connections (per branch) | Compute |
|---|---|---|---|
| Free | 0.5 GB | ~100 active | 0.25 vCPU, 5h/month active |
| Launch | 10 GB | 1000 | 0.5 vCPU, unlimited |
| Scale | 50 GB | 10,000 | up to 8 vCPU, unlimited |

Pre-launch waitlist uses kilobytes — Free is fine. Phase 1 (Auth.js +
Subscriptions) will hit MB-range. Plan to upgrade when Free's compute
hour limit becomes the bottleneck (~1000 daily active queries).

---

## Schema conventions

- **Always `@@map("snake_case")`** — Postgres convention. Prisma model
  names stay PascalCase.
- **`@id @default(cuid())`** — collision-resistant + URL-safe.
- **Indexes on every query path** — anything you `where: { … }` on in
  hot paths gets an `@@index` declaration.
- **Tier / status / category fields = String, not enum** — Postgres
  enums require migrations to add new values; String is forward-
  compatible. Validate at the application layer with Zod / Prisma's
  generated types.
- **Hash PII at write time** — IPs become SHA-256 hashes; raw IPs
  never hit disk. Same applies to anything that touches the
  GDPR/Privacy Act 1988 personal-data line and isn't strictly necessary.

---

## Common operations

### Apply pending migrations to a specific branch from local

```bash
# DANGEROUS for prod — only do this if Vercel build can't run for some reason
DATABASE_URL=<pooled-prod>  DIRECT_URL=<direct-prod>  pnpm db:deploy
```

Normal flow: just push the commit; Vercel runs `migrate deploy` in CI.

### Inspect a branch interactively

```bash
DATABASE_URL=<pooled> DIRECT_URL=<direct> pnpm db:studio
# Opens Prisma Studio at http://localhost:5555
```

### Run a one-off query against a branch

```bash
# Write a small TypeScript file in scripts/, run with tsx
cat > scripts/one-off.mts <<'EOF'
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});
const rows = await prisma.waitlistSignup.count();
console.log({ rows });
await prisma.$disconnect();
EOF

DATABASE_URL=<pooled> pnpm dlx tsx scripts/one-off.mts
rm scripts/one-off.mts  # delete after — these are scratch
```

### Cleanup test rows safely

```bash
# Same shape — delete by email pattern, never by hand-picked IDs
# (which can drift between environments).
```

---

## Credential rotation

If a connection string is exposed in any third-party log (chat, issue
tracker, screenshare, etc.), rotate immediately:

1. Neon dashboard → Roles → `neondb_owner` → "Reset password"
2. New password generates new pooled + direct URLs (host stays the same)
3. Update Vercel env vars (per environment scope):
   ```bash
   printf '%s' "$NEW_POOLED" | vercel env add DATABASE_URL <env> [git-branch] --yes --force --sensitive
   printf '%s' "$NEW_DIRECT" | vercel env add DIRECT_URL  <env> [git-branch] --yes --force --sensitive
   ```
4. Update local `.env.local` if relevant
5. Trigger a redeploy on Vercel (push a commit OR "Redeploy" from the dashboard)
6. Verify the next request to `/api/<persisting-route>` returns 200

Cost: ~5 minutes. Worth doing the moment a credential travels somewhere
it shouldn't have, regardless of how trustworthy that destination feels.

---

## Phase 1 additions (post-launch)

When wiring Auth.js v5 + Stripe Subscriptions, add these models:

- `User` — id, email, emailVerified, name, image, createdAt
- `Account` — provider, providerAccountId, userId (Auth.js OAuth shape)
- `Session` — sessionToken, userId, expires
- `VerificationToken` — for magic-link auth
- `Subscription` — userId, tier, status, currentPeriodEnd,
  stripeCustomerId, stripeSubscriptionId

Auth.js's Prisma adapter has the canonical schema — copy it verbatim,
don't roll your own. The `Subscription` model is project-specific.

Keep the migration that adds these atomic — one migration adds all
five tables. Reversible only by `migrate reset`, which wipes data.

---

## When to consult this doc

- Bringing up a new project on Neon → §1 + §2
- Schema change incoming → §"Migration cadence"
- "It's been months and uat data is junk" → §"Branch refresh"
- "We just got a real user signup spike" → §"Compute autosuspend" + §"Storage + connection limits"
- "I think a connection string leaked" → §"Credential rotation"
- "Adding auth/billing" → §"Phase 1 additions"

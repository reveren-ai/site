# Deployment

Pre-Go-Live target: Vercel + reveren.ai DNS. Self-hosting is out of scope for the marketing site (the CLI is what users run; the site just describes it).

## First-time deploy (TBD when DNS is moved)

1. **Connect repo to Vercel.** Once `packages/site/` has its own GitHub remote (e.g. `reveren-ai/site` private repo), import to Vercel as a project. Set Root Directory to `.` (the site package is the repo root after we split it; it doesn't depend on the workspace at install time because it has its own `package.json`).
2. **Build settings.** Default Next.js detection works. Build command `pnpm build`. Install command `pnpm install`. Node 22.x.
3. **Env vars.** None required for Pre-Go-Live. Phase 1 introduces `DATABASE_URL`, `WAITLIST_RATE_LIMIT_PER_HOUR`, analytics keys.
4. **Domain.** Point `reveren.ai` at Vercel (CNAME or A records per Vercel's onboarding). The defensive `.com` / `.io` etc. (per [`/Users/innocentmuisha/Software/reveren/docs/COMMERCIALISATION.md`](../../../docs/COMMERCIALISATION.md) and the `project_domains` memory) all 301 to `reveren.ai`.
5. **Verify.** Run the QA checklist in [`TESTING.md`](./TESTING.md) — at minimum the routes return 200, OG image renders on Twitter / Slack / LinkedIn previews, mode toggle persists across reload.

## Ongoing — branch deploys

Vercel builds every PR by default. The Playwright suite runs in GitHub Actions (config TBD when the repo is split — for now, run locally before pushing). CI gate: lint + typecheck + unit tests must pass; e2e is informational until the dev server can run reliably in Actions.

## Going private vs. public

The site source is currently in the private workspace at `/Users/innocentmuisha/Software/reveren/`. Per [`/Users/innocentmuisha/Software/reveren/DEV_TODOS.md:63`](../../../DEV_TODOS.md), `docs/` at the workspace root is gitignored — it contains pricing strategy and partner notes. The site code itself can go public if/when you split `packages/site/` into its own GitHub repo.

If/when you do split:
1. The package's `.git` (initialised in this commit) is the only git history we need.
2. Add a public-friendly README to `packages/site/` (the existing one already is).
3. Remove any references to private workspace docs (the `../../docs/` links above will dangle in a public repo — convert to absolute references or remove).

## Pre-launch checklist (from MVP-SITE-ADJUSTMENTS.md §9)

- [ ] All copy passes the embargo check — no partner names anywhere in the rendered HTML.
- [ ] OG card renders with the correct headline and the `reveren.ai` URL footer.
- [ ] Favicon resolves on Chrome, Safari, Firefox.
- [ ] Hero CTA's `npx @reveren-ai/core init` is the canonical scope (not the defensive `@reveren/core` v0.0.1 placeholder).
- [ ] Privacy + Terms pages exist and are linked from the footer.
- [ ] Waitlist endpoint returns 200 in production.
- [ ] Lighthouse: ≥ 95 on Performance, Accessibility, Best Practices, SEO on `/`.

## Phase 1 deployment notes (when wiring real waitlist + dashboard)

- Move `/api/waitlist` persistence to `packages/api/` and proxy from the site, or keep it on the site and import a shared lib.
- Add `@vercel/analytics` or PostHog. Update CSP `connect-src` accordingly.
- Replace the in-memory rate limit with Upstash Ratelimit.
- Add a cookie consent banner before any tracking pixel ships.

# reveren — Pre-Go-Live Checklist

> **Reveren-site-specific.** Lives in this repo at `PRE_GO_LIVE_CHECKLIST.md`. Companion to `BUSINESS_TODOS.md` (full commercial backlog) and `DEV_TODOS.md` (full engineering backlog) — those still live in the outer reveren workspace as personal-scratchpad files. This file is the **launch-day readiness gate** — only items that MUST be true on go-live day. Once an item ships, mark it `[x]`. Items that aren't blocking go-live live in the broader TODO files.
>
> _Authored 2026-05-03. Last updated 2026-05-10. Maintainer: Innocent Muisha._
>
> **Companion docs** (read these first when bringing up a new project on the same stack):
> - [`docs/PRE_PRODUCTION.md`](docs/PRE_PRODUCTION.md) — canonical step-by-step environment-provisioning playbook (Vercel + DNS + branches + gate + JSON-LD + Neon + PostHog).
> - [`docs/NEON.md`](docs/NEON.md) — Neon migration cadence, branch model, credential rotation, ops details.
> - [`pre-production.protocol.md`](https://github.com/reveren-ai/core/blob/main/protocols/pre-production.protocol.md) — the protocol that drives that playbook (lives in the `reveren-ai/core` repo since it's stack-wide, not site-specific).

---

## Status snapshot (as of 2026-05-10)

**What's READY to launch (no further work needed):**

- ✅ Reveren marketing site code (`packages/site/`) — Next.js 16, MUI v7, 8 user-facing routes (`/`, `/pricing`, `/manifesto`, `/pods`, `/dpa`, `/privacy`, `/security`, `/terms`) + `/api/waitlist`, typecheck + ESLint + 263 unit-test files pass, `pnpm build` green
- ✅ **Marketing site git remote** — `github.com/reveren-ai/site` (public), `main` synced
- ✅ **Vercel project linked** — auto-deploys `main` to production, PRs to preview; recent `ca7fae6` and `e783576` deployed Production successfully
- ✅ Waitlist API (`/api/waitlist`) — Zod-validated (tier-aware: email + tier + company + seats + useCase), rate-limited, returns 200 (deferred persistence is acceptable for soft-launch)
- ✅ **Tier-aware waitlist CTAs** — Pro and Enterprise CTAs route through `<WaitlistButton>` and open the tier-aware modal (no broken anchors); pricing surface labelled pre-launch
- ✅ **Logo, accent, and type system locked** — see "Design lock-in (2026-05-10)" below
- ✅ **Motion choreography pass shipped** — landing + pricing + manifesto + pods all use `MotionReveal` / `MotionStagger` / `MotionDrawLine` / `useReducedMotion` primitives; Pro CTA contrast + Comparison first-row spacing fixes shipped on top
- ✅ Reveren CLI v0.1.0-alpha.1 (`packages/core/`) — buildable, publishable, 16 unit tests pass, BSL + grant + MIT licenses in place, SPEC v1.0 written
- ✅ Reveren manifesto + README content (matches v2 brand + protocols rename); manifesto copy refreshed 2026-05-10 with inline-`code` rendering
- ✅ Mrktable Storybook gallery (102 stories, build green)
- ✅ Mrktable tsc clean, 1075 unit tests pass, ESLint clean (0 / 0)
- ✅ Mrktable Partners gated behind `NEXT_PUBLIC_SHOW_PARTNERS` flag (embargo enforced)
- ✅ Mrktable design refresh shipped end-to-end (warm editorial system, Phases A–E)
- ✅ Mrktable Storybook-retrofit bug list cleared (Footer / HeroChart / MarkdownContent / UserRatingForm / PriceChartModal / CommentForm)

### Design lock-in (2026-05-10)

The accent/typography/wordmark "owner pick" decisions in `docs/Design/MVP_SITE.md` §4.3, §4.4, and §4.5 are **locked to whatever shipped to `main`**, since the shipped surface is what users will see on launch day:

- **Accent**: Variant B — monochrome + cool slate / iron (`#3A4553` light, `#C9D1DC` dark via MUI `cssVariables`)
- **Type**: Inter (sans, body) · Instrument Serif (display, manifesto, wordmark) · JetBrains Mono (mono, terminal + eyebrows)
- **Wordmark**: three-stacked-bars `<Mark>` + `<Wordmark>` SVG in `currentColor`, animates in once on first paint via CSS keyframes (`rv-mark-bar-in`, `rv-wordmark-word-in`)
- **Future-upgrade reminder still stands**: revisit JetBrains Mono → Berkeley Mono at Phase 1 dashboard build (one-token swap, ~$50/yr)

---

## Blockers — MUST resolve before go-live

### 🔴 Legal / Brand

- [ ] **File AU trademark for "reveren"** in Class 42 — IP Australia online portal, ~AUD $330. _Why blocking: Convention Priority window starts here; filing AFTER going public increases the risk of squatters establishing prior use._
- [ ] **Incorporate Reveren Pty Ltd** — ASIC online registration, ~AUD $597 + ~AUD $98 for "reveren" business name. _Why blocking: the LICENSE files on `@reveren-ai/core` name `Reveren Pty Ltd` as Licensor; publishing under a non-existent entity is a contractual void._ Reveren Pty Ltd will trade as **reveren**; **reveren.ai** is the primary website domain, not the entity name.
- [ ] **Set up Luanda Pty Ltd → Reveren Pty Ltd shareholding** at incorporation per BUSINESS*TODOS. \_Why blocking: cleaner than retroactive restructuring after revenue lands.*
- [ ] **Engage startup lawyer** for one-pass review of LICENSE + LICENSE-ADDITIONAL-GRANT.txt + SPEC.md before npm publish. _Why blocking: AU-specific quirks for BSL-1.1 and W3C SDL2 haven't been verified by counsel._

### 🔴 Reveren Marketing Site Infrastructure

- [x] **Initialise `packages/site/` as a git repo** with remote `github.com/reveren-ai/site` — _shipped 2026-05-09, public repo, `main` is the default branch._
- [x] **Acquire `reveren.ai` domain** (per BUSINESS*TODOS Tier 1 list).
- [ ] **Acquire Tier 1 defensive domains** (`.net .co .io .org` of `reveren`) — register before public launch to prevent squatters. _Why blocking: post-launch acquisition is 10–100× the cost._
- [x] **Set up Vercel project** for `@reveren-ai/site` — _shipped: linked to `reveren-ai/site`, auto-deploys `main` to production, PRs to preview; verified via `gh api repos/reveren-ai/site/deployments` 2026-05-10._
- [ ] **`reveren.ai` production domain attached on Vercel** — registrar A/AAAA (or apex `ALIAS`/CNAME) → Vercel; verify SSL provisioning and `www` redirect behaviour.
- [ ] **DNS records** at the registrar: `A` → Vercel, `MX` if email goes through Google Workspace / similar, SPF/DKIM/DMARC records.
- [ ] **`develop` and `uat` long-lived branches + `dev.reveren.ai` / `uat.reveren.ai` Vercel custom-domain-per-branch mappings** — _decided 2026-05-10: single-project, branch-based environment model. See "Environment topology" below._
- [ ] **OG cards + Twitter share cards + favicon set** generated and hooked into `app/layout.tsx`.
- [ ] **Production env vars set on Vercel** — at minimum: any analytics keys (PostHog/Plausible), the rate-limit secret if upgraded.

### Environment topology (decided 2026-05-10)

| Vercel env | Git branch | Public host | Neon branch | Robots |
|---|---|---|---|---|
| Production | `main` | `reveren.ai` | `main` | indexable |
| Preview (long-lived) | `uat` | `uat.reveren.ai` | `uat` | `noindex` |
| Preview (long-lived) | `develop` | `dev.reveren.ai` | `develop` | `noindex` |
| Preview (PRs) | feature branches | `*.vercel.app` | (ephemeral) | `noindex` |

Promotion path: `develop` → PR → `uat` → PR → `main`. Hotfixes can land directly on `main` and be back-ported.

### 🔴 Mrktable Production (if going live alongside)

- [ ] **Stripe production account ready** — products/prices created in live mode (mirror what `scripts/stripe-setup.ts` does in test mode), webhook endpoints registered, Stripe Tax enabled for AU/GST.
- [ ] **Stripe live keys in production env** (Vercel) — never commit to repo.
- [ ] **Auth.js production OAuth credentials** for Google + GitHub providers (separate from dev/staging app IDs).
- [ ] **Neon production database** provisioned + Prisma migrations applied + seed data validated (or empty-state UI confirmed acceptable).
- [ ] **`mrktable.com` DNS** → production Vercel deployment; verify SSL.
- [ ] **Resolve dev-server slowness** on `/advertise` (4.5s) and `/market-moves` (4.7s) — these are app-code time, not Next.js framework time, so likely Prisma query or rendering work. Profile + optimise before go-live or accept.

### 🔴 Reveren CLI npm publish

- [ ] **Push `packages/core/` commits to `github.com/reveren-ai/core`** — currently 5+ commits ahead of origin/main.
- [ ] **`npm publish` `@reveren-ai/core@0.1.0-alpha.1`** under the `alpha` dist-tag (NOT `latest`). _Why under `alpha`: stub commands aren't safe to ship as the default install._
- [ ] **Defensive `@reveren/core` v0.0.1** stays as-is (do NOT republish — see `docs/COMMERCIALISATION.md`).

---

## Strongly recommended — should resolve before go-live

### 🟡 Reveren Site Polish

- [x] **Lock logo + accent variant + headline serif/sans** — _decided 2026-05-10: Variant B (iron slate `#3A4553` / `#C9D1DC`), Instrument Serif display, three-stacked-bars wordmark. See "Design lock-in" in the status snapshot._
- [x] **Manifesto page copy** validated against current positioning. _Verified 2026-05-08; refreshed 2026-05-10 with sharper, more declarative voice + inline `code` rendering._
- [ ] **Pricing page numbers** match `docs/COMMERCIALISATION.md` v2 ($19/mo Pro, $39/seat Team).
- [ ] **Privacy + Terms + DPA + Security pages** reviewed by lawyer (or marked clearly as "draft, last reviewed YYYY-MM-DD").
- [ ] **Waitlist persistence** — currently in-memory only, lost on redeploy. Wire to a Neon table (Postgres 17, branched per Vercel env) once Neon project is provisioned. Sequence: `pnpm add prisma @prisma/client` → `prisma init` → `WaitlistSignup` model → `prisma migrate dev` → swap [route.ts](packages/site/app/api/waitlist/route.ts) to insert → wire `DATABASE_URL` + `DIRECT_URL` in Vercel envs (production / uat / develop).
- [ ] **Analytics** — PostHog keys provisioned per-environment (production / uat / develop) and CTA click events instrumented.
- [ ] **JSON-LD structured data** — `Organization` + `WebSite` on root layout, `Article` on `/manifesto`, `FAQPage` on `/pricing`, `Product` / `SoftwareApplication` on `/`. Per [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld). _Why pre-launch: rich-result eligibility takes weeks for Google to recompute after first crawl; better to ship structured data with the launch crawl._
- [ ] **Robots `noindex` on non-production hosts** (`uat.reveren.ai`, `dev.reveren.ai`, `*.vercel.app`) — gate via `process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'` in `metadata.robots`.

### 🟡 Reveren CLI hardening

- [ ] **Replace v0.1.0-alpha.1 stubs with real implementations** for `init` (interactive flow) and `run` (resolve + print protocol) — _only if launching the CLI publicly alongside the site._ If launching site-first as a waitlist play, CLI can ship later.
- [ ] **Storybook autogen + GH Pages workflow writer** — required for the Lovable / Bolt / v0 (`--preset=no-code`) story to actually work.
- [ ] **Integration test harness** spawning the built CLI against fixture projects.
- [ ] **CONTRIBUTING.md** for `reveren-ai/core` explaining the BSL/MIT/SDL2 split and DCO requirement for protocol contributions.

### 🟡 Distribution

- [ ] **Launch announcement draft** ready to send to AI Engineer newsletter, Latent Space, The Pragmatic Engineer, Changelog, The New Stack, InfoQ.
- [ ] **Mrktable house ad creative** pointing at reveren.ai (rotates as default unsold-inventory filler — per BUSINESS_TODOS).
- [ ] **Social presence** — at minimum `@reveren_ai` on X/Twitter + a LinkedIn company page registered (to prevent squatting).

---

## Nice-to-have — can ship after launch

### 🟢 Brand & Legal (within 6 months of launch)

- [ ] **File US trademark** within 6 months of AU filing for Convention Priority retroactivity (~AUD $350–400 USPTO TEAS Plus).
- [ ] **Tier 2 domain acquisition** (`.com.au .co.uk` of `reveren`) before market expansion to those regions.
- [ ] **Trademark watch** — Google Alerts for "reveren AI" and "@reveren" to catch squatting.

### 🟢 Reveren CLI v0.1.0 final + v0.1.1

- [ ] **CONTRIBUTING.md** explaining BSL/MIT/SDL2 split.
- [ ] **Release script + Changesets + CI publish workflow** — automate `npm publish` on merge to main.
- [ ] **Public `github.com/reveren-ai/protocols` repo** with the MIT-licensed protocol library as canonical source (currently bundled snapshot inside `@reveren-ai/core/protocols/`).
- [ ] **Public `github.com/reveren-ai/spec` repo** mirroring SPEC.md as the canonical source.

### 🟢 Mrktable polish

- [x] **Lint cleanup** — root cause was `storybook-static/**` (Storybook build output, gitignored) being scanned by ESLint, generating ~16k spurious warnings/errors against minified bundles. Fixed by adding `storybook-static/**` and `coverage/**` to `eslint.config.mjs` `globalIgnores`. `pnpm lint` now exits clean (0 errors, 0 warnings) — _shipped 2026-05-03_.
- [x] **Fix bugs flagged by Storybook retrofit** — _shipped 2026-05-03_:
  - Footer social icons: replaced placeholder Lucide `close`/`globe` glyphs with proper inline X and LinkedIn brand SVGs.
  - HeroChart canvas DPR scaling: removed redundant `ctx.scale()`, swapped `window.resize` for `ResizeObserver` (catches container-driven resizes in Storybook flex decorators), and re-syncs the backing buffer per frame so display-PPI changes mid-animation render correctly.
  - MarkdownContent regex: tightened the italic alternative with a CommonMark-style flanking rule so plain text containing free-standing asterisks (e.g. `2 * 3 = 6 and 4 * 5 = 20`) is no longer corrupted into a stray italic span. Regression tests added.
  - AgiTracker UserRatingForm: defensively reads existing rating values via `existingRating?.scores?.[key]` plus a finite-number / 0–100 range check (handles malformed JSON-column drift); collapses MUI `Slider` `number | number[]` payloads to scalar safely.
  - PriceChartModal: stale chart data when the modal reopened for a different move now resets via the React-recommended "track previous prop" render-time pattern (avoids `react-hooks/set-state-in-effect`).
  - CommentForm: wrapped the server action in `try/catch` so RSC/network failures surface as user-visible error feedback instead of silently swallowing the rejection.

### 🟢 Post-launch follow-ups

- [ ] **Schedule recurring "reveren brand health"** check (weekly).
- [ ] **Schedule one-time "MVP site soak"** at +30 days post-launch (manifesto ranking, GitHub stars, npm install counts).
- [ ] **Quarterly investor update template** (post-seed).

---

## Decision points before pulling the launch lever

1. **Site-only soft-launch vs site + CLI dual-launch?**
   - **Site-only**: lower risk, waitlist captures interest, CLI ships later when v0.1.0 final is ready. Recommended for launch-week velocity.
   - **Dual-launch**: more buzz, but stub CLI commands could damage credibility. Recommended ONLY if v0.1.0 final ships before launch day. **_Selected Option_**

2. **Mrktable launch timing**
   - Same day as reveren? Different days? Per memory: mrktable is the "media (funnel)" and reveren is the "product" — launching mrktable first to build audience for reveren may make sense. But the user's Q phrased them as a joint "go live" — clarify before pulling the trigger.

3. **GTM track for Lovable / Bolt / v0 founders** — the `--preset=no-code` contract is locked but the dependent UI (reveren.ai/start) isn't built. Is this a Day-1 promise or a Phase 3b reveal?

---

_This file is the launch-day gate. Items above are cross-referenced from `BUSINESS_TODOS.md` and `DEV_TODOS.md` — when an item ships, mark `[x]` here AND in the source backlog. When the gate is fully green, you're ready to launch._

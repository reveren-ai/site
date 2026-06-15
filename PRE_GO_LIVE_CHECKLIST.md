# reveren — Pre-Go-Live Checklist

> **Reveren-site-specific.** Lives in this repo at `PRE_GO_LIVE_CHECKLIST.md`. Companion to `BUSINESS_TODOS.md` (full commercial backlog) and `DEV_TODOS.md` (full engineering backlog) — those still live in the outer reveren workspace as personal-scratchpad files. This file is the **launch-day readiness gate** — only items that MUST be true on go-live day. Once an item ships, mark it `[x]`. Items that aren't blocking go-live live in the broader TODO files.
>
> _Authored 2026-05-03. Last updated 2026-05-26. Maintainer: Innocent Muisha._
>
> **Companion docs** (read these first when bringing up a new project on the same stack):
> - [`docs/PRE_PRODUCTION.md`](docs/PRE_PRODUCTION.md) — canonical step-by-step environment-provisioning playbook (Vercel + DNS + branches + gate + JSON-LD + Neon + PostHog).
> - [`docs/NEON.md`](docs/NEON.md) — Neon migration cadence, branch model, credential rotation, ops details.
> - [`pre-production.protocol.md`](https://github.com/reveren-ai/core/blob/main/protocols/pre-production.protocol.md) — the protocol that drives that playbook (lives in the `reveren-ai/core` repo since it's stack-wide, not site-specific).

---

## Status snapshot (as of 2026-05-26)

**What's READY to launch (no further work needed):**

- ✅ Reveren marketing site code (`packages/site/`) — Next.js 16, MUI v7, 8 user-facing routes (`/`, `/pricing`, `/manifesto`, `/pods`, `/dpa`, `/privacy`, `/security`, `/terms`) + `/api/waitlist`, typecheck + ESLint + 263 unit-test files pass, `pnpm build` green
- ✅ **Marketing site git remote** — `github.com/reveren-ai/site` (public), `main` synced
- ✅ **Vercel project linked** — auto-deploys `main` to production, PRs to preview
- ✅ **Waitlist persistence shipped** — Neon-backed `WaitlistSignup` table via Prisma; tier-aware Zod validation (email + tier + company + seats + useCase); rate-limited; PostHog server-side event firing on success. `app/api/waitlist/route.ts` writes to `prisma.waitlistSignup.create(...)` (no more in-memory loss on redeploy).
- ✅ **Tier-aware waitlist CTAs** — Pods and Marketplace CTAs route through `<WaitlistButton>` and open the tier-aware modal; mobile Nav + end-of-manifesto CTAs shipped (commit `dfc86c1`); coming-soon deep-share intent preservation shipped (commit `8de0b68`)
- ✅ **Logo, accent, and type system locked** — see "Design lock-in (2026-05-10)" below
- ✅ **Motion choreography pass shipped** — landing + pricing + manifesto + pods all use `MotionReveal` / `MotionStagger` / `MotionDrawLine` / `useReducedMotion` primitives; popular-card (Pods) CTA contrast + Comparison first-row spacing fixes shipped on top
- ✅ **SEO foundations shipped** — homepage canonical, sitemap, robots with AI-crawler allow (commit `2c7dc1d`); brand OG via `ImageResponse` + per-route OG / descriptions (commit `b78716f`); per-page JSON-LD + locked manifesto title + FAQ schema test (commit `1ee33ba`)
- ✅ **Per-environment indexing gate** — `EnvBanner` + `FeatureTeaser` variant + `noindex` on non-prod hosts (commit `7df0644`)
- ✅ **`PROD_` prefix env convention** introduced for prod-only credentials (commit `52a8498`); PostHog redeploy verified (commit `5c239ae`)
- ✅ **PostHog production wiring** — client + server, WebDriver-safe init guard, null-safe server client (commit `c4d65b4`); ManifestoTeaser CTA instrumented (commit `52a8498`); wizard report finalised
- ✅ **CI hardening** — split build from `prisma migrate deploy` so CI can build without DB env (commit `b34fe52`); postinstall prisma generate + husky pre-push parity gate (commit `97eb52c`)
- ✅ **React 19 hydration cleanup** — mode-init script moved to body to silence head-Float mismatch (commit `6934f31`); MUI button styles win on Button-as-anchor via `@layer` global-reset wrap (commit `db2ab8c`)
- ✅ **CLI binary `rvr`** aligned across all site copy (commit `c965153`)
- ✅ **SEO + UX audit baseline** captured at `docs/audits/2026-05-16-seo-audit.md` (commit `96ff679`)
- ✅ **Roadmap** — Protocol Generator added; Pods shifted to Release 2 (commit `1f74afc`)
- ✅ Reveren CLI v0.1.0-alpha.1 (`packages/core/`) — real `rvr init` / `run` / `check` / `list`, integration test harness (6 cases against built `dist/cli.js`), pre-production protocol shipped, 13-protocol library consolidated, husky pre-push hook, CONTRIBUTING + commit-msg hook, BSL + grant + MIT licenses, SPEC v1.0
- ✅ **Canonical source repos seeded (private)** — `github.com/reveren-ai/protocols` (MIT, tagged `v0.1.0`); `github.com/reveren-ai/spec` (W3C SDL2, tagged `spec-1.0`)
- ✅ Reveren manifesto + README content (matches v2 brand + protocols rename); manifesto copy refreshed 2026-05-10 with inline-`code` rendering
- ✅ Mrktable Storybook gallery (102 stories, build green)
- ✅ Mrktable tsc clean, 1075 unit tests pass, ESLint clean (0 / 0)
- ✅ Mrktable Partners embargo lifted 2026-05-19 — `<Partners />` strip live on home (`NEXT_PUBLIC_SHOW_PARTNERS` flag + check script + tests all removed)
- ✅ Mrktable design refresh shipped end-to-end (warm editorial system, Phases A–E)
- ✅ Mrktable Storybook-retrofit bug list cleared (Footer / HeroChart / MarkdownContent / UserRatingForm / PriceChartModal / CommentForm)
- ✅ **Vercel SSO posture locked** for both mrktable + reveren-site — `prod_deployment_urls_and_all_previews` + apex 308 redirect (2026-05-11)

### Design lock-in (2026-05-10)

The accent/typography/wordmark "owner pick" decisions in `docs/_archive/MVP_SITE.md` §4.3, §4.4, and §4.5 (archived 2026-06-14) are **locked to whatever shipped to `main`**, since the shipped surface is what users will see on launch day:

- **Accent**: Variant B — monochrome + cool slate / iron (`#3A4553` light, `#C9D1DC` dark via MUI `cssVariables`)
- **Type**: Inter (sans, body) · Instrument Serif (display, manifesto, wordmark) · JetBrains Mono (mono, terminal + eyebrows)
- **Wordmark**: three-stacked-bars `<Mark>` + `<Wordmark>` SVG in `currentColor`, animates in once on first paint via CSS keyframes (`rv-mark-bar-in`, `rv-wordmark-word-in`)
- **Future-upgrade reminder still stands**: revisit JetBrains Mono → Berkeley Mono at Phase 1 dashboard build (one-token swap, ~$50/yr)

---

## Blockers — MUST resolve before go-live

### 🔴 Legal / Brand

- [ ] **File AU trademark for "reveren"** in Class 42 — IP Australia online portal, ~AUD $330. _Why blocking: Convention Priority window starts here; filing AFTER going public increases the risk of squatters establishing prior use._
- [x] **Entity structure: reveren trades under Cadere Pty Ltd.** reveren operates as a **trading name under the existing Cadere Pty Ltd**; no separate Reveren Pty Ltd is being incorporated. The reveren name, marks, and software are owned **personally by Innocent Muisha** and licensed to Cadere. The LICENSE files on `@reveren-ai/core` name **Cadere Pty Ltd (trading as Reveren)** as Licensor, so there is no non-existent-entity gap to close. _**reveren.ai** is the primary website domain, not the entity name._
- [x] **No separate holding company above Cadere.** There is **no Reveren Pty Ltd and no Luanda Pty Ltd above Cadere**. Cadere already exists, so there is no shareholding to set up at incorporation.
- [ ] **Engage startup lawyer** for one-pass review of LICENSE + LICENSE-ADDITIONAL-GRANT.txt + SPEC.md before npm publish, and to confirm the Cadere-trading-as-Reveren contracting party on the privacy / terms / DPA pages. _Why blocking: AU-specific quirks for BSL-1.1 and W3C SDL2 haven't been verified by counsel._

### 🔴 Reveren Marketing Site Infrastructure

- [x] **Initialise `packages/site/` as a git repo** with remote `github.com/reveren-ai/site` — _shipped 2026-05-09, public repo, `main` is the default branch._
- [x] **Acquire `reveren.ai` domain** (per BUSINESS*TODOS Tier 1 list).
- [ ] **Acquire Tier 1 defensive domains** (`.net .co .io .org` of `reveren`) — register before public launch to prevent squatters. _Why blocking: post-launch acquisition is 10–100× the cost._
- [x] **Set up Vercel project** for `@reveren-ai/site` — _shipped: linked to `reveren-ai/site`, auto-deploys `main` to production, PRs to preview; verified via `gh api repos/reveren-ai/site/deployments` 2026-05-10._
- [ ] **`reveren.ai` production domain attached on Vercel** — registrar A/AAAA (or apex `ALIAS`/CNAME) → Vercel; verify SSL provisioning and `www` redirect behaviour.
- [ ] **DNS records** at the registrar: `A` → Vercel, `MX` if email goes through Google Workspace / similar, SPF/DKIM/DMARC records.
- [x] **`develop` and `uat` long-lived branches** — _shipped: branches exist on `reveren-ai/site` and are wired into the Vercel project per the env-banner per-environment indexing gate (commit `7df0644`). Confirm `dev.reveren.ai` / `uat.reveren.ai` custom-domain-per-branch mappings under "🔴 DNS / domains" once the apex attach is done._
- [x] **OG cards** — brand OG via Next.js `ImageResponse` + per-route OG / descriptions (commit `b78716f`); applied site-wide via App Router metadata API.
- [ ] **Twitter share cards (X)** — verify `twitter:card` metadata renders correctly via [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) once apex is live.
- [ ] **Favicon set** — generated and hooked into `app/layout.tsx`. _If shipped, mark done; otherwise confirm against current `app/icon.tsx` / `favicon.ico`._
- [x] **Production env vars (analytics)** — PostHog production keys set in Vercel; redeploy verified (commit `5c239ae`); `PROD_` prefix convention introduced for prod-only credentials (commit `52a8498`).
- [ ] **Production env vars (rate-limit secret)** — only required once the in-memory rate-limit in `app/api/waitlist/route.ts` is replaced by Upstash Redis (currently noted as Phase 1 / post-launch). Not blocking go-live for the waitlist volume during pre-launch — confirm acceptable risk before flipping the lever.

### Environment topology (decided 2026-05-10)

| Vercel env | Git branch | Public host | Neon branch | Robots |
|---|---|---|---|---|
| Production | `main` | `reveren.ai` | `main` | indexable |
| Preview (long-lived) | `uat` | `uat.reveren.ai` | `uat` | `noindex` |
| Preview (long-lived) | `develop` | `dev.reveren.ai` | `develop` | `noindex` |
| Preview (PRs) | feature branches | `*.vercel.app` | (ephemeral) | `noindex` |

Promotion path: `develop` → PR → `uat` → PR → `main`. Hotfixes can land directly on `main` and be back-ported.

### 🔴 Mrktable Production (if going live alongside)

> Full mrktable launch gate lives in `/Users/innocentmuisha/Software/mrktable/TODOS.md` § _Pre-Go-live_. This subsection mirrors only the items that gate a joint launch.

- [ ] **Stripe production account ready** — products/prices created in live mode (mirror what `scripts/stripe-setup.ts` does in test mode), webhook endpoints registered, Stripe Tax enabled for AU/GST.
- [ ] **Stripe live keys in production env** (Vercel) — never commit to repo.
- [ ] **Stripe production webhook endpoint** at `https://mrktable.com/api/webhooks/stripe` — subscribed to `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`; signing secret in `STRIPE_WEBHOOK_SECRET`.
- [ ] **Auth.js production OAuth credentials** for Google + GitHub providers (separate from dev/staging app IDs); redirect URIs updated to `https://mrktable.com/api/auth/callback/{google,github}`.
- [ ] **Neon production database baselined.** Schema exists but `_prisma_migrations` history is empty (was on `prisma db push`). Run `pnpm exec prisma migrate resolve --applied 20260501_multi_vertical_taxonomy` against prod `DIRECT_URL` (strip `-pooler` from the Neon hostname). Then restore `prisma migrate deploy && next build` build script.
- [ ] **`mrktable.com` DNS** → production Vercel deployment; verify SSL; MX/SPF/DKIM/DMARC for Resend.
- [ ] **`NEXT_PUBLIC_APP_URL=https://mrktable.com`** set in Vercel production env (currently `.env.example` only carries localhost).
- [ ] **Resend production sending domain** — verify `mrktable.com` in Resend, rotate `EMAIL_FROM` + `EMAIL_SERVER` to the production key.
- [ ] **Inngest production keys** — `INNGEST_EVENT_KEY` + `INNGEST_SIGNING_KEY` in Vercel; app registered at `https://mrktable.com/api/inngest` in Inngest dashboard.
- [ ] **Firecrawl production API key** — `FIRECRAWL_API_KEY` in Vercel.
- [ ] **PostHog production keys** for mrktable (code wiring shipped in commit `7402523` — only env-key provisioning across prod / preview-uat / preview-develop remains).
- [ ] **`pnpm audit` clear** on mrktable — 1 critical + 7 high transitive advisories pending (protobufjs ≥7.5.5, postcss ≥8.5.10, picomatch ≥4.0.4 via `pnpm.overrides`; direct bumps to `@anthropic-ai/sdk` + `@prisma/client`).
- [ ] **Persistent rate limiter** for mrktable `lib/feedback.ts` — Upstash Redis vs Vercel WAF decision pending.
- [ ] **Resolve dev-server slowness** on `/advertise` (4.5s) and `/market-moves` (4.7s) — these are app-code time, not Next.js framework time, so likely Prisma query or rendering work. Profile + optimise before go-live or accept. _Note: `/advertise` is being deferred to post-launch per owner direction, so this item only matters for `/market-moves`._

### 🔴 Reveren CLI npm publish

- [ ] **`git pull` core** — local `main` may be 1 commit behind origin after the `rvr check` squash-merge — verify before publish.
- [ ] **`npm publish` `@reveren-ai/core@0.1.0-alpha.1`** under the `alpha` dist-tag (NOT `latest`). _Stubs are now real implementations (PR #3 + #4) so the credibility risk that originally justified the `alpha` tag is reduced — but keep `alpha` for v0.1.0-alpha.1 and reserve `latest` for the v0.1.0 final release._
- [ ] **Defensive `@reveren/core` v0.0.1** stays as-is (do NOT republish — see `docs/COMMERCIALISATION.md`).
- [ ] **Flip `reveren-ai/protocols` and `reveren-ai/spec` repos to PUBLIC.** No longer gated on incorporating a new entity (reveren already trades under the existing Cadere Pty Ltd). Gate only on the lawyer's licence review landing, then `gh repo edit reveren-ai/{protocols,spec} --visibility public --accept-visibility-change-consequences`.
- [ ] **Add `published-at` link** from each `@reveren-ai/core` LICENSE/SPEC reference to the canonical repo URL once those repos are public.

---

## Strongly recommended — should resolve before go-live

### 🟡 Reveren Site Polish

- [x] **Lock logo + accent variant + headline serif/sans** — _decided 2026-05-10: Variant B (iron slate `#3A4553` / `#C9D1DC`), Instrument Serif display, three-stacked-bars wordmark. See "Design lock-in" in the status snapshot._
- [x] **Manifesto page copy** validated against current positioning. _Verified 2026-05-08; refreshed 2026-05-10 with sharper, more declarative voice + inline `code` rendering._
- [x] **Pricing page aligned to the three-surface model.** Free core ($0), Pods (subscription, pricing finalising), and the Protocol Marketplace (subscription, pricing finalising). No invented prices for the paid surfaces; no Pro/Team/Enterprise tiers; no cloud-run metering. _Swept 2026-06-14 to the 9 June commercialisation decision._
- [ ] **Privacy + Terms + DPA + Security pages** reviewed by lawyer (or marked clearly as "draft, last reviewed YYYY-MM-DD"). _Status: pages exist as draft; need legal pass or explicit "draft" labels with review date before go-live._
- [x] **Waitlist persistence** — _shipped: Neon-backed `WaitlistSignup` table via Prisma; `app/api/waitlist/route.ts` writes via `prisma.waitlistSignup.create(...)`; PostHog server-side event on success; `DATABASE_URL` + `DATABASE_URL_UNPOOLED` (Prisma migrate URL fix, commit `7383801`) wired per environment._
- [x] **Analytics — PostHog keys provisioned per-environment** and CTA click events instrumented — _shipped: WebDriver-safe init (commit `c4d65b4`), ManifestoTeaser CTA instrumented (commit `52a8498`), redeploy with env vars verified (commit `5c239ae`)._
- [x] **JSON-LD structured data** — _shipped 2026-05-12 (commit `1ee33ba`): per-page JSON-LD + locked manifesto title + FAQ schema test. `Organization` + `WebSite` on root, `Article` on `/manifesto`, `FAQPage` on `/pricing`, `SoftwareApplication` on `/`._
- [x] **Robots `noindex` on non-production hosts** — _shipped 2026-05-13 (commit `7df0644`): per-environment indexing gate + EnvBanner + FeatureTeaser variant. Gates via `process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'` in `metadata.robots`._
- [x] **`Sitemap` + `robots.txt` with AI-crawler allow-list** — _shipped 2026-05-11 (commit `2c7dc1d`). Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot._

### 🟡 Reveren CLI hardening

- [x] **Replace v0.1.0-alpha.1 stubs with real implementations** for `init` (interactive flow) and `run` (resolve + print protocol) — _shipped 2026-05-10 (PR #3 on `reveren-ai/core`)._
- [x] **Storybook autogen + GH Pages workflow writer** — _shipped 2026-05-10 (PR #3)._
- [x] **Integration test harness** spawning the built CLI against fixture projects — _shipped 2026-05-10 (PR #4): 6 cases against the built `dist/cli.js`, separate `vitest.integration.config.ts`, `pretest:integration` build hook._
- [x] **CONTRIBUTING.md** for `reveren-ai/core` explaining the BSL/MIT/SDL2 split and DCO requirement for protocol contributions — _shipped 2026-05-10 (PR #4)._
- [x] **`commit-msg` Husky hook** + commitlint conventional-config — _shipped 2026-05-10 (PR #4)._
- [x] **Pre-production protocol** in `protocols/` library (runs once per project to set up env infra) — _shipped (commit `bf96f2e`)._
- [x] **Protocol library consolidated to 13 canonical protocols** (commit `3d4204b`).
- [ ] **Changesets workflow** (`@changesets/cli` + `.changeset/config.json`) for automated `npm publish` on merge to main — _deferred to Release 2 per `packages/core/TODOS.md`._

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
   - **Site-only**: lower risk, waitlist captures interest, CLI ships later when v0.1.0 final is ready.
   - **Dual-launch**: more buzz; **_Selected Option_**. Originally risky because stub commands could damage credibility, but PR #3 + #4 replaced the stubs with real `init` / `run` / `check` / `list` + integration test harness, so the credibility argument no longer applies. Publish under `--tag alpha` only because `v0.1.0` final still has Release 2 work (login, sync, push, ci, MCP) ahead.

2. **Mrktable launch timing**
   - Same day as reveren? Different days? Per memory: mrktable is the "media (funnel)" and reveren is the "product" — launching mrktable first to build audience for reveren may make sense (staggered: mrktable Week 1, reveren Week 2 or 3). The mrktable launch is gated on its own checklist in `/Users/innocentmuisha/Software/mrktable/TODOS.md` § _Pre-Go-live_ — confirm timing once both gates are green.

3. **GTM track for Lovable / Bolt / v0 founders** — the `--preset=no-code` contract is locked but the dependent UI (reveren.ai/start) isn't built. Is this a Day-1 promise or a Phase 3b reveal?

4. **Mrktable `/advertise` posture at launch.** Owner direction (per mrktable TODOS): hide for Media Release 1 and ship advertising post-launch. If this is final, the ad-stats analytics blocker on mrktable moves with it to post-launch.

5. **Rate-limit infra for both projects.** Mrktable's `lib/feedback.ts` and reveren's `/api/waitlist` both run an in-memory `Map` rate-limiter. Pick infra once (Upstash Redis vs Vercel WAF) and apply consistently — Vercel WAF needs no app code changes which is the lower-effort path.

---

_This file is the launch-day gate. Items above are cross-referenced from `BUSINESS_TODOS.md` and `DEV_TODOS.md` — when an item ships, mark `[x]` here AND in the source backlog. When the gate is fully green, you're ready to launch._

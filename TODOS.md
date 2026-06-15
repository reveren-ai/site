# `@reveren-ai/site` — Engineering TODOs

> Package-scoped engineering backlog for the reveren marketing site at `packages/site/`.
> Companion to workspace-level `BUSINESS_TODOS.md` (commercial), `DEV_TODOS.md` (cross-package eng), and `PRE_GO_LIVE_CHECKLIST.md` (launch-day gate).
>
> Non-engineering blockers (legal entity, trademark, lawyer review, DNS, domains) live in `PRE_GO_LIVE_CHECKLIST.md` — not duplicated here. This file is engineering-only.
>
> _Created 2026-05-09. Last updated 2026-05-10. Maintainer: Innocent Muisha._
>
> **Companion docs**: [`docs/PRE_PRODUCTION.md`](docs/PRE_PRODUCTION.md) (full pre-prod playbook), [`docs/NEON.md`](docs/NEON.md) (Neon ops + migration cadence), [`PRE_GO_LIVE_CHECKLIST.md`](PRE_GO_LIVE_CHECKLIST.md) (launch-day gate), [`pre-production.protocol.md`](https://github.com/reveren-ai/core/blob/main/protocols/pre-production.protocol.md) (the protocol that drives the playbook).

---

## Release 1 — Launch-day site (the marketing site goes live)

The marketing site is a **waitlist play** for Release 1. The pricing model is the three-surface commercialisation decision (9 June 2026): **Free core ($0), Pods (subscription, pricing finalising), and the Protocol Marketplace (subscription, pricing finalising)**, with no Pro/Team/Enterprise tiers, no cloud-run metering, and no enterprise sales motion. The subscriptions don't exist yet, so each paid surface CTA routes to a tier-aware waitlist, not a Stripe checkout.

### CTAs and waitlist plumbing

- [x] **Pods + Marketplace waitlist CTAs.** Pods and Marketplace cards open the tier-aware WaitlistModal (email-only capture; no enterprise lead fields). _Swept to the three-surface model 2026-06-14._
- [x] **`/api/waitlist` schema accepts tier.** Backward-compatible email-only payload; `tier` is one of `pods | marketplace | general`. _Swept 2026-06-14 (dropped the enterprise company/seats/useCase fields)._
- [x] **Pricing disclosure line.** "Pods and the Marketplace are pre-launch. Join the waitlist and we will let you know when each subscription opens." Protects against AU ACCC misleading-conduct exposure. _Swept 2026-06-14._
- [ ] **Waitlist persistence** — currently in-memory only; signups vanish on redeploy. Wire to Neon table OR Loops/Tally before the launch announcement. (Cross-listed in `PRE_GO_LIVE_CHECKLIST.md` §🟡.)

### Polish before launch

- [ ] **OG cards + Twitter share cards + favicon set** generated and hooked into `app/layout.tsx`. (Cross-listed in `PRE_GO_LIVE_CHECKLIST.md`.)
- [x] **Pricing footnote audit.** Footnote now states local CLI use is always free with no metering; the only paid surfaces are the Pods and Marketplace subscriptions (indicative, finalising); no enterprise motion. No cloud-run / overage language remains. _Swept 2026-06-14._
- [x] **Pricing page disclosure.** "Pods and the Marketplace are pre-launch. Join the waitlist and we will let you know when each subscription opens." _Swept 2026-06-14._
- [ ] **JSON-LD structured data** — Organization + WebSite (root layout), Article (`/manifesto`), FAQPage (`/pricing`), SoftwareApplication (`/`). [Next.js guide](https://nextjs.org/docs/app/guides/json-ld).
- [ ] **Robots `noindex` on non-production hosts** — gate `metadata.robots` on `NEXT_PUBLIC_VERCEL_ENV !== 'production'` so `uat.reveren.ai`, `dev.reveren.ai`, and PR previews don't index.
- [ ] **Analytics keys provisioned** — PostHog env vars set per Vercel environment; CTA click events instrumented.
- [ ] **Pricing snapshot test** — lock the per-tier feature lists in `lib/pricing.ts` against accidental edits via a snapshot test. (Already the pattern for `noCodePreset()` in core.)

### Subscription architecture (Release 1: stub only)

Release 1 ships **no** subscription enforcement — only the surface that signals tier. Real enforcement lands in Phase 1.

- [ ] **Document the architecture** in `docs/ARCHITECTURE-SUBSCRIPTIONS.md`: three layers (Stripe source of truth, hosted API gates with `requireTier(...)` middleware, CLI ↔ API binding via `rv_live_xxx` token). Captures the design before the build so Phase 1 doesn't drift.

---

## Phase 1 — Subscription enforcement (after legal entity + Stripe setup)

- [ ] **Auth.js v5** — GitHub + Google providers (separate prod credentials per `PRE_GO_LIVE_CHECKLIST.md`).
- [ ] **`Subscription` Prisma model** — `userId / orgId / tier / status / currentPeriodEnd / stripeCustomerId / stripeSubscriptionId`.
- [ ] **Stripe webhook** at `/api/stripe/webhook` handling `customer.subscription.{created,updated,deleted}` + `invoice.{paid,payment_failed}`. Webhook signature verified with `STRIPE_WEBHOOK_SECRET`.
- [ ] **Pods + Marketplace CTAs flip from waitlist → Stripe Checkout** once the subscription SKUs + webhook are live in production.
- [ ] **`requireTier(tier)` middleware** for hosted API routes. Returns 402 (over quota) / 403 (wrong tier) with structured error body.
- [ ] **`rv_live_xxx` token issuance** — device-code flow for `rvr login`. Token stored server-side as hashed; client stores raw in `~/.reveren/credentials.json`.
- [ ] **Account / billing page** — minimal port from mrktable patterns.
- [ ] **Subscription state UI.** Show which Pods and Marketplace packs are active for the current period. (Local `rvr run` is unlimited and not metered, so there is no run-quota meter.)

## Phase 2+ — Pod marketplace + private registry surface (downstream)

- [ ] **Pod marketplace listing pages** (browsing UI; transactions still routed through Phase 1 Stripe).
- [ ] **Private protocol registry browse UI** for Marketplace subscribers.
- [ ] **GitHub App marketplace listing** + install flow surface.

---

## Done

- [x] **8 user-facing routes built** (`/`, `/pricing`, `/manifesto`, `/pods`, `/dpa`, `/privacy`, `/security`, `/terms`) — _shipped pre-2026-05-03. (`/v2` alternate landing was explored 2026-05-09 then dropped 2026-05-10 — canonical hero stays.)_
- [x] **Waitlist API route** (`/api/waitlist`) — Zod-validated, rate-limited, stub persistence — _2026-05-03._
- [x] **WaitlistModal + WaitlistButton** components — _shipped._
- [x] **TierCards + PricingMatrix + PricingTeaser + PricingHeader** — _shipped._
- [x] **Manifesto copy validated** — zero `skill`/`playbook` references post-rename — _2026-05-08; refreshed 2026-05-10._
- [x] **263 unit-test files passing; `pnpm build` green; lint clean** — _verified 2026-05-10 against `ca7fae6`._
- [x] **Motion choreography pass** — landing + pricing + manifesto + pods all use `MotionReveal` / `MotionStagger` / `MotionDrawLine` / `useReducedMotion` primitives. CSS keyframes (`rv-mark-bar-in`, `rv-wordmark-word-in`, `rv-photo-settle`, `rv-popular-pulse`) for one-shot brand moments. _Shipped 2026-05-09–10._
- [x] **Popular-card CTA contrast fix** — dropped the `--rv-cta-bg` mode-invariant override on the popular-tier (Pods) CTA so it picks up MUI's primary contained palette and pops against the dark-mode card border. _Shipped 2026-05-10._
- [x] **Comparison first-row spacing** — first body row gets extra top padding to breathe under the heading row's bottom border. _Shipped 2026-05-10._
- [x] **MotionDrawLine react-hooks/set-state-in-effect lint fix** — switched to `useReducedMotion` from `motion/react` + derived `drawn || reduced` rendered state. _Shipped 2026-05-10._
- [x] **GitHub repo + Vercel project linked** — `reveren-ai/site` (public) auto-deploys `main` → production, PRs → preview.

---

_Update freely. Cross-reference items here in `PRE_GO_LIVE_CHECKLIST.md` when they cross the launch-gate threshold._

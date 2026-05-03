# Testing

Two layers — unit (vitest + jsdom) and end-to-end (Playwright with axe-core).

## Unit — `pnpm test:run`

7 spec files, 28 assertions. Runs in ~1.5s.

| Spec | What it covers |
|------|----------------|
| [`theme/theme.test.ts`](../theme/theme.test.ts) | both colour schemes exist, Iron accent is primary in each, CSS-vars enabled, button case |
| [`lib/install.test.ts`](../lib/install.test.ts) | install command points at canonical scope, no stale `rvr` references |
| [`lib/pricing.test.ts`](../lib/pricing.test.ts) | four tiers in canonical order, no `.99`, exactly one popular tier, matrix groups in order, every row has all four tier values, local run is unlimited everywhere |
| [`components/CopyButton/CopyButton.test.tsx`](../components/CopyButton/CopyButton.test.tsx) | renders the install command, writes to clipboard on click, flips to "Copied" |
| [`components/ModeToggle/ModeToggle.test.tsx`](../components/ModeToggle/ModeToggle.test.tsx) | flips data-mode and persists to localStorage |
| [`components/PricingMatrix/PricingMatrix.test.tsx`](../components/PricingMatrix/PricingMatrix.test.tsx) | every group label renders, every row label renders, four tier columns in head |
| [`app/api/waitlist/route.test.ts`](../app/api/waitlist/route.test.ts) | accepts valid email, rejects invalid, rejects missing, rejects malformed JSON, rate-limits after threshold |

### Notes

- `vitest.setup.ts` extends `expect` with `@testing-library/jest-dom/matchers`.
- `userEvent.setup()` v14 installs its own clipboard, so CopyButton tests use
  `vi.spyOn(navigator.clipboard, "writeText")` rather than `defineProperty`.
- jsdom does not render CSS, so visual assertions go to e2e instead.

## End-to-end — `pnpm test:e2e`

Playwright config:
- chromium + iPhone 14 mobile project
- `reuseExistingServer: true` — pairs with a running `pnpm dev`
- 2 retries on CI, 0 locally

| Spec | What it covers |
|------|----------------|
| [`e2e/landing.spec.ts`](../e2e/landing.spec.ts) | hero copy, CTA copy-to-clipboard with permission grant, nav link resolution, all 8 representative section anchors render in vertical order |
| [`e2e/pricing.spec.ts`](../e2e/pricing.spec.ts) | four tier labels visible, no `.99` in body text, $19 + $39 visible, matrix group order Pipeline→Support, FAQ expand reveals answer |
| [`e2e/manifesto.spec.ts`](../e2e/manifesto.spec.ts) | h1 visible, "operating manual" body string visible, h2 section heading visible, closing CTA copies install command |
| [`e2e/mode.spec.ts`](../e2e/mode.spec.ts) | toggle flips data-mode and persists across reload |
| [`e2e/a11y.spec.ts`](../e2e/a11y.spec.ts) | axe-core scan returns zero violations on `/`, `/pricing`, `/manifesto`, `/privacy`, `/terms`, `/security`, `/dpa`. `color-contrast` rule is disabled (verified manually against tokens). |

### When tests fail in CI but pass locally

- Clipboard tests skip on WebKit (different permission UX). They run on Chromium and Mobile Chrome.
- The mode-toggle test depends on the inline `mode-init` script setting `data-mode` before paint — if hydration order changes, this is the canary.

### What e2e doesn't cover

- Visual regression (no Percy / Chromatic). Add when the design is locked across more than three pages.
- Real email deliverability (waitlist API doesn't send mail yet — Phase 1).
- Performance (Lighthouse CI not wired). Add when traffic justifies the budget.

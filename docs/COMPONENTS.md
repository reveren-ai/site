# Components

Grouped by route. C = Client component (`"use client"`), S = Server component.

## Layout (every route)

| Component | Boundary | File |
|-----------|----------|------|
| Root layout | S | [`app/layout.tsx`](../app/layout.tsx) |
| `<Nav>` | S | [`components/Nav/Nav.tsx`](../components/Nav/Nav.tsx) |
| `<MobileNav>` | C | [`components/Nav/MobileNav.tsx`](../components/Nav/MobileNav.tsx) |
| `<ModeToggle>` | C | [`components/ModeToggle/ModeToggle.tsx`](../components/ModeToggle/ModeToggle.tsx) |
| `<WaitlistButton>` / `<WaitlistModal>` | C | [`components/WaitlistModal/`](../components/WaitlistModal) |
| `<Footer>` | S | [`components/Footer/Footer.tsx`](../components/Footer/Footer.tsx) |
| `<Wordmark>` / `<Mark>` | S (inline SVG, currentColor) | [`components/Logo/`](../components/Logo) |

## Landing — `/` ([`app/page.tsx`](../app/page.tsx))

Sections render in the order they appear in `app/page.tsx`, matching MVP-SITE-ADJUSTMENTS.md §3.

| # | Section | Component | Boundary |
|---|---------|-----------|----------|
| 1 | Hero (headline + sub + CTAs + terminal) | `<Hero>` | S |
| 1a | Animated terminal demo | `<Terminal>` | C |
| 1b | Install command CTA | `<CopyButton>` | C |
| 2 | Three audiences | `<AudienceCards>` | S |
| 3 | Four capabilities | `<CapabilityGrid>` | S |
| 4 | mrktable proof | `<ProofPoint>` | S |
| 5 | What reveren ISN'T | `<NotThis>` | S |
| 6 | Pricing teaser | `<PricingTeaser>` | S |
| 7 | Comparison table | `<Comparison>` | S |
| 8 | Manifesto teaser | `<ManifestoTeaser>` | S |
| 9 | Open file format | `<OpenFormat>` | S |

## Pricing — `/pricing` ([`app/pricing/page.tsx`](../app/pricing/page.tsx))

| Section | Component | Boundary |
|---------|-----------|----------|
| Page header | `<PricingHeader>` | S |
| Tier cards | `<TierCards>` | S |
| Feature matrix (CSS grid, sticky head) | `<PricingMatrix>` | S |
| FAQ (`<details>` accordion) | `<FAQ>` | C (only because it imports from same chunk; could be S) |
| Closing CTA band | `<CtaBand>` | S |

## Manifesto — `/manifesto` ([`app/manifesto/page.tsx`](../app/manifesto/page.tsx))

| Section | Component | Boundary |
|---------|-----------|----------|
| Title block | `<ManifestoHeader>` | S |
| Long-form prose container | `<Prose>` | S |
| Pull quotes | `<PullQuote>` | S |
| Closing CTA | `<TerminalButton>` (wraps `<CopyButton>`) | C |

Manifesto body lives in [`app/manifesto/copy.ts`](../app/manifesto/copy.ts). Owner-editable.

## Stub legal / info pages

`/privacy`, `/terms`, `/security`, `/dpa` — single Server Component each,
using `<Prose>` for long-form copy.

## Client/Server boundary rules learned the hard way

1. **Function-form sx doesn't cross.** A Server Component cannot pass
   `sx={(t) => ({...})}` to a MUI primitive. Use static objects + CSS
   variables (`var(--mui-palette-...)`) for theme-aware values.

2. **`<Button component={Link}>` doesn't cross.** Inside Server Components
   use `<Button component="a" href="...">`. Inside Client Components,
   `component={Link}` is fine.

3. **Inline event handlers don't cross.** The skip-to-content link uses CSS
   `:focus` styling, not `onFocus` / `onBlur` (lesson from the build).

4. **`<Box sx>` in Server Components must be deeply serializable** — no
   functions, no class instances, no Symbol keys.

5. **Hydration parity**: any DOM read in a client component (`<ModeToggle>`)
   must return `null` on the server snapshot to match the initial render.

## Adding a new section

1. Add the component file under `components/<SectionName>/`.
2. If the section accepts copy, put the copy in `lib/<SectionName>.ts` as a typed export, not in the component.
3. If the section is interactive, mark `"use client"` and colocate a `*.test.tsx`.
4. Wire it into the parent route's `page.tsx`.
5. Update IA in [`/docs/Site/02-UX-PLAN.md`](../../../docs/Site/02-UX-PLAN.md) so the canonical section list stays accurate.

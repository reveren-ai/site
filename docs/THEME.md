# Theme

The theme is the brand. Treat changes here as brand changes.

## Layered structure

```
theme/
├── tokens.ts          # Raw values — single source of truth, no MUI imports
├── palette.ts         # Maps tokens → MUI PaletteOptions for light + dark
├── theme.ts           # createTheme({ cssVariables, colorSchemes, typography, transitions, components })
└── ThemeRegistry.tsx  # Client wrapper: AppRouterCacheProvider + ThemeProvider + CssBaseline
```

If a designer updates a colour, change `tokens.ts`. Nothing else.

## Iron palette

Light mode:
- bg `#FAF8F5` · paper `#FFFFFF` · surface-2 `#F2EEE8` · surface-3 `#E9E3DA`
- text-1 `#161412` · text-2 `#5A544E` · text-3 `#8B847D`
- accent `#3A4553` · accent-hover `#2B3441` · accent-soft `#ECEEF1` · accent-ink `#FFFFFF`

Dark mode:
- bg `#141312` · paper `#1C1A18` · surface-2 `#26221F` · surface-3 `#322D29`
- text-1 `#F2ECE6` · text-2 `#B5A99E` · text-3 `#6E645C`
- accent `#C9D1DC` · accent-hover `#DEE3EB` · accent-soft `#232830` · accent-ink `#161412`

Iron is intentionally cool slate — reads as serious infrastructure, not decorative tech-bro green/blue.

## CSS variables strategy

`createTheme({ cssVariables: { colorSchemeSelector: "data-mode" } })` emits
the full palette as CSS custom properties scoped under
`html[data-mode="light"]` and `html[data-mode="dark"]`. Mode swap is a single
attribute change — no JS layout work, no React rerender of static content.

Components access mode-aware values as `var(--mui-palette-text-primary)`,
`var(--mui-palette-background-paper)`, etc. Never read theme via a
function-form sx — that doesn't survive the RSC boundary.

## Mode toggle

`<ModeToggle>` (client) reads via `useSyncExternalStore`. The store source is
the DOM attribute `data-mode` set by the inline `mode-init` script in
[`app/layout.tsx`](../app/layout.tsx) — that script runs before paint and
seeds from `localStorage("rv-mode")` or `prefers-color-scheme`. The toggle
flips the attribute and writes localStorage; the next call to `getSnapshot`
returns the new value.

Why useSyncExternalStore (not useEffect): React 19's React Compiler now
warns on `setState` inside `useEffect` for state derived from external
sources. `useSyncExternalStore` is the idiomatic primitive.

## Typography

| Variant | Family | Weight | Tracking | Use |
|---------|--------|--------|----------|-----|
| h1 | Inter | 700 | -0.035em | hero only |
| h2 | Inter | 700 | -0.03em | section headlines |
| h3 | Inter | 600 | -0.02em | subsection headings |
| h4 | Inter | 600 | -0.01em | card titles |
| body1 | Inter | 400 | 0 | paragraph copy |
| caption | JetBrains Mono | 500 | 0.08em uppercase | meta info |
| eyebrow | JetBrains Mono | 500 | 0.08em uppercase | section labels (custom variant) |
| (wordmark only) | Instrument Serif | 400 | -0.015em | logo wordmark — never used elsewhere |

`Instrument Serif` is loaded via `next/font/google` but only rendered inside
the `<Wordmark>` SVG and the `<PullQuote>` component. Don't introduce it to
body or headings — single serif moment is the entire point.

## Spacing & shape

- 8-pixel base (`theme.spacing(1) === "8px"` resolves to `var(--mui-spacing, 8px)` in CSS-vars mode).
- Card radius 12 (`radius.lg`), button radius 8 (`radius.md`).
- Container max width 1200px, 32px horizontal padding (20px on mobile via `.rv-container`).

## Motion

- Standard duration 220ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- All animations respect `prefers-reduced-motion: reduce` via `globals.css` global override.

## What NOT to add to the theme

- A `secondary` palette entry that competes with the accent.
- A success/warning/error palette beyond the four already wired (we have them; they shouldn't appear on marketing pages outside form errors).
- Custom breakpoints — the four MUI defaults (sm/md/lg/xl) are enough.
- Multiple shadow tiers — `shadowCard` and `shadowPop` from tokens.ts are sufficient.

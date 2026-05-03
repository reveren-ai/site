# Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16.2.4 (App Router, Turbopack, React Compiler on) | matches mrktable; static-by-default fits a marketing site |
| Language | TypeScript 5 (strict) | catches the boundary errors RSC introduces |
| React | 19.2.3 | required by Next 16; `useSyncExternalStore` used in `<ModeToggle>` |
| UI library | MUI 7.3.9 (Material) | strong primitives; `cssVariables` enables the data-mode mode swap with no JS layout cost |
| Styling | MUI sx + a small `globals.css` for tokens / skip link / motion preferences | no Tailwind — single styling system keeps the surface small |
| Fonts | Inter, Instrument Serif (wordmark only), JetBrains Mono — all via `next/font/google` | `display: swap`, self-hosted at build time, CSP-safe |
| Tests | Vitest 4 + Testing Library 16 + Playwright 1.58 + @axe-core/playwright | mrktable parity |
| Pkg manager | pnpm 10 (workspace root at `../../`) | each package retains its own `.git` + publish lifecycle |
| Bundler | Turbopack via `next dev` and `next build` | default in Next 16 |

## What we explicitly DON'T use

- **`@next/mdx`** — manifesto ships as a TS module (`app/manifesto/copy.ts`), no MDX toolchain.
- **`framer-motion` / `motion`** — terminal demo uses CSS keyframes only; no JS animation library.
- **`tailwindcss`** — single styling system (MUI + globals.css).
- **Tracking / analytics** — Pre-Go-Live ships with no analytics. Phase 1 wires PostHog or Plausible.
- **Auth / DB** — none on the marketing site. Phase 1 (`packages/api/`) introduces both.

## File / directory conventions

```
packages/site/
├── app/                     # App Router routes + API routes
├── components/              # Grouped by section name; *.test.tsx colocated
├── lib/                     # Typed data modules, mode helpers, install command constants
├── theme/                   # tokens.ts → palette.ts → theme.ts → ThemeRegistry.tsx
├── public/logo/svg/         # Brand SVG assets (currentColor where possible)
├── public/og/               # OpenGraph share card
├── e2e/                     # Playwright specs
├── docs/                    # this folder
└── README.md                # quickstart for the package
```

## Scripts

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start dev server on :3000 (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint flat config (next/core-web-vitals + next/typescript) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` / `pnpm test:run` | Vitest watch / run-once |
| `pnpm test:coverage` | Vitest with coverage |
| `pnpm test:e2e` | Playwright (auto-spawns dev server if not already running) |
| `pnpm test:e2e:ui` | Playwright UI mode |

## Compatibility notes

- **MUI Box + Server Components**: MUI primitives are Client Components. Server Components must pass *static* sx objects to them — function-form sx (`sx={(t) => ({...})}`) cannot serialize across the boundary. Use CSS variables (`var(--mui-palette-...)`) inside object sx for theme-aware values.
- **`<Button component={Link}>`** likewise can't cross the RSC boundary. Inside Server Components, use `<Button component="a" href={...}>`. Inside Client Components, `component={Link}` is fine.
- **React Compiler**: `reactCompiler: true` in `next.config.ts`. Don't add `useMemo` / `useCallback` defensively — let the compiler memoize. Only intervene for measured perf issues.

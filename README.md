# reveren.ai marketing site

Next.js 16 + React 19 + MUI v7 + TypeScript strict. Three pages: `/`, `/pricing`, `/manifesto`.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Verify

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm test:e2e
pnpm build
```

## Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16 (App Router, React Compiler on) |
| React | React 19 |
| UI | MUI v7 + Emotion |
| Tokens | CSS custom properties driven by MUI `cssVariables` + `colorSchemes` |
| Fonts | Inter, Instrument Serif (wordmark only), JetBrains Mono — `next/font/google` |
| Tests | Vitest + Testing Library + Playwright + axe-core |
| Pkg manager | pnpm (workspace at `../../`) |

## Architecture in one minute

- `app/` — three Server Components (one per route) + `api/waitlist`.
- `components/` — grouped by section name; client components flagged with `"use client"`.
- `theme/` — `tokens.ts` (raw values from design), `palette.ts` (MUI shape), `theme.ts` (`createTheme`).
- `lib/` — typed data: pricing matrix, comparison rows, FAQ, audience cards, capabilities, stats.
- `public/logo/` — wordmarks, marks, favicons, OG card.

See [`docs/`](./docs/) for component-level notes.

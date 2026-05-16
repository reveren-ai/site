# Pre-Production Setup Playbook

> Canonical environment-provisioning workflow for any project on this stack.
> Authored from the reveren site setup (2026-05-10). Copy into each new
> project's `docs/Infrastructure/` and adapt the project-specific values.
>
> **Stack assumptions**: Next.js 15+, Vercel hosting, Neon Postgres,
> PostHog analytics, GitHub repo, optional pre-launch holding page.
>
> _Maintainer: Innocent Muisha. Last updated 2026-05-10._

---

## What this playbook gets you

By the end of this playbook every project has:

| Surface | URL pattern | Branch | Robots | Auth |
|---|---|---|---|---|
| Production | `<domain>` (apex) | `main` | indexable | public |
| UAT | `uat.<domain>` | `uat` | `noindex` | public |
| Develop | `dev.<domain>` | `develop` | `noindex` | public |
| PR previews | `*.vercel.app` | feature branches | `noindex` | public |

Plus: an env-driven coming-soon gate that locks production behind a
holding page until launch day, JSON-LD structured data for SEO, three
isolated Neon Postgres branches matching the three environments, and
PostHog analytics scoped per environment.

---

## Order of operations

The order matters — DNS provisioning blocks Vercel domain attachment,
which blocks the env vars, which blocks the database wiring. Follow
top-to-bottom unless you're cherry-picking a specific section.

1. [GitHub repo + branch model](#1-github-repo--branch-model)
2. [Domain + DNS](#2-domain--dns)
3. [Vercel project + custom domains per branch](#3-vercel-project--custom-domains-per-branch)
4. [Canonical URL flip (apex over www)](#4-canonical-url-flip)
5. [Deployment protection (SSO disable on previews)](#5-deployment-protection)
6. [Environment-aware robots + JSON-LD](#6-robots--json-ld)
7. [Pre-launch coming-soon gate](#7-pre-launch-coming-soon-gate)
8. [Neon Postgres + Prisma](#8-neon-postgres--prisma)
9. [PostHog analytics](#9-posthog-analytics)
10. [Smoke verification](#10-smoke-verification)

Throughout, `<project>` = the project's npm-style name (e.g. `reveren-site`,
`mrktable`). `<domain>` = the apex domain (e.g. `reveren.ai`, `mrktable.com`).

---

## 1. GitHub repo + branch model

```bash
# In the project root
git init
git remote add origin git@github.com:<org>/<project>.git
git checkout -b main
git push -u origin main

# Create the two long-lived non-production branches off main
git checkout -b uat && git push -u origin uat
git checkout -b develop && git push -u origin develop
git checkout main
```

**Promotion path**: feature branch → PR → `develop` → PR → `uat` → PR → `main`.
Hotfixes land directly on `main` and are back-ported to `develop` + `uat`.

**Rationale for the model**: keeps each environment at a known SHA;
every long-lived branch has a stable URL teams can share; the gap
between `main` and `develop` is your "what's still cooking" buffer.

---

## 2. Domain + DNS

### 2a. Choose the DNS authority

You have two options. **Default to Option B** unless you have a
specific reason to keep DNS at the registrar.

| Option | DNS lives at | Pros | Cons |
|---|---|---|---|
| A | Registrar (e.g. GoDaddy) | Email + apex MX records easier to keep | Each subdomain is a manual record; no Vercel CLI for DNS |
| B | Vercel | CLI-driven, automatic SSL, branch domains "just work" | Email records must be re-created in Vercel DNS |

### 2b. Move nameservers to Vercel (Option B)

1. Vercel dashboard → Domains → **Add** → enter `<domain>` → next.
2. Vercel shows two nameservers (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
3. Registrar (GoDaddy/etc.) → Domain Settings → Nameservers → switch to those two.
4. Wait 5–60 minutes for propagation:
   ```bash
   dig NS <domain> +short
   # expect: ns1.vercel-dns.com. / ns2.vercel-dns.com.
   ```
5. **Before flipping nameservers**, in Vercel DNS panel re-create any
   existing TXT/MX records (Google Workspace SPF/DKIM/DMARC, Resend
   verification, etc.) so email doesn't break during the cutover.

### 2c. If you stay on Option A (registrar DNS)

Add these records at the registrar:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` (apex) | `76.76.21.21` | 600 |
| CNAME | `www` | `cname.vercel-dns.com.` | 600 |
| CNAME | `uat` | `cname.vercel-dns.com.` | 600 |
| CNAME | `dev` | `cname.vercel-dns.com.` | 600 |

---

## 3. Vercel project + custom domains per branch

```bash
# Install Vercel CLI globally (one-time per dev machine)
npm i -g vercel

# In the project root, link the local dir to the Vercel project
vercel link --yes
# Creates .vercel/project.json (auto-added to .gitignore by the CLI)
```

### 3a. Attach the apex + subdomains

Via dashboard (most reliable for first-time setup):

1. Project → Settings → Domains → **Add Domain**
2. Add `<domain>` → Production
3. Add `www.<domain>` → Production (will become a redirect — see §4)
4. Add `uat.<domain>` → assign to **Git Branch: uat**
5. Add `dev.<domain>` → assign to **Git Branch: develop**

Each domain shows ✅ once SSL provisions (~2 min).

### 3b. CLI verification

```bash
# Get project ID for API calls
cat .vercel/project.json
# → {"projectId":"prj_…","orgId":"team_…"}

# List all domains attached to the project
vercel api "/v9/projects/<projectId>/domains?teamId=<orgId>"
```

---

## 4. Canonical URL flip

By default Vercel sets `www.<domain>` as primary and `<domain>` (apex)
redirects to it. Most brand sites prefer apex as canonical (cleaner OG
cards, share URLs). Flip via the API:

```bash
# Clear apex redirect (apex stops redirecting to www)
vercel api "/v9/projects/<projectId>/domains/<domain>?teamId=<orgId>" -X PATCH \
  --input - <<<'{"redirect":null,"redirectStatusCode":null}'

# Set www → apex 308 permanent
vercel api "/v9/projects/<projectId>/domains/www.<domain>?teamId=<orgId>" -X PATCH \
  --input - <<<'{"redirect":"<domain>","redirectStatusCode":308}'
```

Verify:

```bash
curl -sI https://<domain>/   | grep -E "^HTTP"        # 200
curl -sI https://www.<domain>/ | grep -E "^(HTTP|location)"  # 308 → https://<domain>/
```

The codebase's canonical (`metadataBase` in `app/layout.tsx`,
`SITE_URL` in `lib/jsonLd.ts`) should always declare the apex, regardless
of which side redirects.

---

## 5. Deployment protection

By default Vercel enables SSO ("Vercel Authentication") on all preview
deployments — your team would need to be logged into Vercel before
viewing `uat.<domain>` or `dev.<domain>`. Disable so QA + sales can share
links freely:

```bash
# Disable SSO protection entirely (custom domains + raw deployment URLs become public)
vercel api "/v9/projects/<projectId>?teamId=<orgId>" -X PATCH \
  --input - <<<'{"ssoProtection":null}'
```

If you want to keep raw `*.vercel.app` URLs gated but allow custom
domains:

```bash
vercel api "/v9/projects/<projectId>?teamId=<orgId>" -X PATCH \
  --input - <<<'{"ssoProtection":{"deploymentType":"all_except_custom_domains"}}'
```

(Note: `all_except_custom_domains` works on Pro plan; Hobby may force
gate-on regardless. Test before committing to it.)

Robots `noindex` on previews (next section) prevents search-engine
indexing even with SSO off, so the public-preview tradeoff is fine for
pre-launch.

---

## 6. Robots + JSON-LD

### 6a. Env-aware robots

In `app/layout.tsx`, gate `metadata.robots` on `VERCEL_ENV`:

```ts
const isProductionEnv = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  // …
  robots: isProductionEnv
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
};
```

Vercel sets `VERCEL_ENV` to `production` only on the production
deployment. Preview (uat / develop / PR) and local dev all see
`undefined` → noindex.

### 6b. JSON-LD structured data

Per the [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld),
ship structured data with the launch crawl so rich-result eligibility is
in place when Google first indexes — rich-result attachment takes weeks
of recompute after first discovery.

Recommended schemas per surface:

| Surface | Schema | Justification |
|---|---|---|
| Root layout (sitewide) | `Organization` + `WebSite` | Knowledge panel + sitelinks searchbox |
| Marketing landing | `SoftwareApplication` or `Product` | Rich app/product cards in SERPs |
| Long-form article | `Article` | News-style cards |
| FAQ section | `FAQPage` | Expandable FAQ in SERPs (must match rendered text exactly) |
| Pricing | `Product` (one per tier) | Rich pricing cards |

Implementation pattern:

```ts
// lib/jsonLd.ts — typed builders, never user input
export function organizationJsonLd() { return { "@context": "https://schema.org", "@type": "Organization", … }; }

// components/JsonLd.tsx — server-rendered <script>
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// app/layout.tsx (sitewide)
<head>
  <JsonLd data={organizationJsonLd()} />
  <JsonLd data={websiteJsonLd()} />
</head>

// app/<route>/page.tsx (per-page)
<>
  <JsonLd data={articleJsonLd({ … })} />
  <PageContent />
</>
```

`FAQPage` schema MUST be derived from the same data source the rendered
FAQ uses (e.g. `lib/faq.ts`) so they can never drift. Google requires
the schema text to match the rendered text.

Verify after deploy:

```bash
curl -s https://<domain>/ | grep -oE '"@type":"[A-Z][a-zA-Z]+"' | sort -u
```

---

## 7. Pre-launch coming-soon gate

Lock production behind a holding page until launch day. Reversible in
seconds via env-var toggle.

### 7a. Env var

Vercel dashboard → Settings → Environment Variables → Add:
- **Name**: `LAUNCH_MODE`
- **Value**: `coming-soon`
- **Environments**: ✅ Production only (leave Preview + Development unchecked)

### 7b. Code

`middleware.ts` (project root):

```ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.LAUNCH_MODE !== "coming-soon") {
    return NextResponse.next();
  }
  const { pathname } = request.nextUrl;
  if (
    pathname === "/coming-soon" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/og/") ||
    pathname.startsWith("/logo/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf|css|js)).*)",
  ],
};
```

`app/coming-soon/page.tsx`: minimal server component — wordmark, "Coming
soon" eyebrow, one-line value prop, dual CTA (waitlist + secondary), set
`metadata.alternates.canonical = "/"` so all rewritten variants
canonicalise to the homepage for SEO.

### 7c. Allowlist rationale

The middleware allowlist must include:
- `/coming-soon` itself (otherwise infinite rewrite loop)
- `/api/*` (so the waitlist signup still works through the gate)
- `/_next/*`, static asset extensions (so the page can render)
- `/og/`, `/logo/` (image dirs the holding page references)
- `/favicon.ico`, `/robots.txt`, `/sitemap.xml` (SEO files)

### 7d. Launch day

Remove `LAUNCH_MODE` from Vercel Production, redeploy. Middleware
no-ops, full marketing site renders. Reversible if you spot a problem —
re-add the env var. **Don't delete the `/coming-soon` route or
`middleware.ts`** — keep them around for the next pre-launch cycle.

---

## 8. Neon Postgres + Prisma

See `NEON.md` for the migration cadence + ops details. Quick setup:

### 8a. Provision Neon

1. Neon dashboard → Create project → choose region (`aws-ap-southeast-2`
   for AU primary, `aws-us-east-1` for global default).
2. Postgres version: **17** (Neon default).
3. Branches: `main` is the default. Create `uat` and `develop` branches
   off `main` (Settings → Branches → "Create branch from main"). Neon
   branches are copy-on-write — cheap.
4. Per branch, copy both connection strings:
   - **Pooled** (`DATABASE_URL`) — `…-pooler.<region>.aws.neon.tech…`
   - **Unpooled / Direct** (`DIRECT_URL`) — `…<region>.aws.neon.tech…` (no `-pooler`)

### 8b. Vercel env vars

Per environment scope:

```bash
printf '%s' "$PROD_POOLED" | vercel env add DATABASE_URL production --yes --force --sensitive
printf '%s' "$PROD_DIRECT" | vercel env add DIRECT_URL  production --yes --force --sensitive
printf '%s' "$UAT_POOLED"  | vercel env add DATABASE_URL preview uat --yes --force --sensitive
printf '%s' "$UAT_DIRECT"  | vercel env add DIRECT_URL  preview uat --yes --force --sensitive
printf '%s' "$DEV_POOLED"  | vercel env add DATABASE_URL preview develop --yes --force --sensitive
printf '%s' "$DEV_DIRECT"  | vercel env add DIRECT_URL  preview develop --yes --force --sensitive
```

`printf` is a bash builtin — values don't appear in argv or process
listings. Pre-set them as shell variables before this block (or use
`vercel env pull`).

### 8c. Local dev

`.env.local` (gitignored): use the **DEV** branch connection so local
work doesn't touch production data.

### 8d. Prisma 7

```bash
pnpm add prisma --save-dev
pnpm add @prisma/client @prisma/adapter-neon @neondatabase/serverless
pnpm add -D dotenv
pnpm dlx prisma init --datasource-provider postgresql
```

Allowlist Prisma's postinstall scripts in the workspace root
`pnpm-workspace.yaml`:

```yaml
onlyBuiltDependencies:
  - prisma
  - "@prisma/engines"
```

Prisma 7 schema `provider` only — connection lives in `prisma.config.ts`:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

```ts
// prisma.config.ts
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local", override: false });
loadEnv();

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
```

### 8e. Singleton (lazy proxy)

```ts
// lib/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set.");
  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
}

function getOrCreate(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}

// Lazy proxy: import-time safe (tests/builds without env), real
// connection on first method access.
export const prisma = new Proxy({} as PrismaClient, {
  get: (_t, p, r) => Reflect.get(getOrCreate(), p, r),
});
```

### 8f. Build script

`package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "db:migrate": "prisma migrate dev",
    "db:deploy":  "prisma migrate deploy",
    "db:generate": "prisma generate",
    "db:studio":  "prisma studio"
  }
}
```

`prisma migrate deploy` is non-interactive and applies pending migrations
to whichever Neon branch the deploy's env scope points at. First-time
Vercel build for each branch will apply all migrations from zero.

### 8g. Standalone lockfile

If the project is in a pnpm workspace but Vercel deploys from the
project's own repo (not the workspace), regenerate a standalone
lockfile:

```bash
pnpm install --ignore-workspace --lockfile-only
git add pnpm-lock.yaml
git commit -m "chore: standalone pnpm-lock.yaml for Vercel deploy"
```

---

## 9. PostHog analytics

See the dedicated `POSTHOG.md` (or this section) for the full setup.
Quick path:

### 9a. Run the PostHog setup wizard

PostHog publishes a Next.js wizard that wires up the recommended Next.js
15.3+ pattern (`instrumentation-client.ts`) plus a `/ingest` reverse
proxy (so the client-side capture endpoint lives on your domain and
isn't blocked by ad-blockers) plus the server-side client. Use it; it's
both faster and more correct than hand-rolling.

```bash
npx posthog-init@latest --next.js
# Wizard prompts for: project key, host, integration depth.
# Pick "deep" — adds reverse proxy + capture_exceptions + suggests
# event names for the conversion CTAs.
```

The wizard writes / modifies:

| File | Purpose |
|---|---|
| `instrumentation-client.ts` (project root) | Client init via Next.js's instrumentation hook (replaces the old `<PostHogProvider>` component pattern). |
| `lib/posthog-server.ts` | Server-side PostHog client (`posthog-node`) for events fired from API routes / Server Actions. |
| `next.config.ts` | Adds `/ingest` rewrites + `skipTrailingSlashRedirect: true` for the reverse proxy. |
| `.env.local` | Adds `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST` placeholders. |
| `package.json` | `posthog-js` + `posthog-node` deps. |

Reference shape:

```ts
// instrumentation-client.ts
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",                    // reverse-proxied via next.config.ts
  ui_host: "https://us.posthog.com",
  defaults: "2026-01-30",
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
});
```

```ts
// lib/posthog-server.ts — singleton for server-side captures
import { PostHog } from "posthog-node";

let client: PostHog | null = null;

export function getPostHogClient(): PostHog {
  if (!client) {
    client = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,           // flush immediately — serverless funcs are short-lived
      flushInterval: 0,
    });
  }
  return client;
}
```

No layout wrapping required — `instrumentation-client.ts` runs once at
client boot.

### 9b. Env vars (per Vercel environment scope)

| Key | Value | Where |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | `phc_…` (project API key, public) | Production / Preview-uat / Preview-develop |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` (or `eu.i.posthog.com`) | Same |

The `NEXT_PUBLIC_` prefix is required so they're available client-side.
These keys are PUBLIC by design (PostHog project keys are not secrets).

### 9c. Per-environment projects

Best practice: **one PostHog project per environment** (prod, uat, dev)
with distinct keys. Stops uat noise from polluting prod analytics.
Cheaper alternative: one project, use `posthog.register({ environment:
process.env.VERCEL_ENV })` to auto-tag events.

### 9d. Event instrumentation conventions

PostHog autocapture covers generic clicks. Add **explicit events** at
funnel-relevant moments so you don't have to filter autocapture noise
later. Naming convention: `<surface>_<action>` in past-tense, snake_case.

Canonical event matrix for a marketing site + waitlist (mirrored across
projects on this stack):

| Event | Where | Properties |
|---|---|---|
| `waitlist_modal_opened` | `WaitlistButton` onClick | `tier` |
| `waitlist_form_submitted` | Modal submit handler entry | `tier`, `is_enterprise` |
| `waitlist_signup_succeeded` | After 200 from `/api/waitlist`. Also calls `posthog.identify(email, { waitlist_tier })` | `tier`, `is_enterprise` |
| `waitlist_signup_failed` | After error from `/api/waitlist` | `tier`, `is_enterprise`, `error_message` |
| `waitlist_signup_recorded` | **Server-side** in `/api/waitlist/route.ts` after the DB insert succeeds. Source-of-truth for "real conversions" (client events can be lost to ad-blockers; server events can't). Also calls `getPostHogClient().identify(email)` | `tier`, `source`, `has_company`, `has_seats`, `has_use_case` |
| `install_command_copied` | `CopyButton` on copy success | `command` |
| `cta_<name>_clicked` | Any conversion-grade outbound link or non-modal CTA. `<name>` = the link's purpose: `talk_to_sales`, `read_manifesto`, etc. | (varies; include source pathname when useful) |
| `pricing_tier_cta_clicked` | Tier-card CTA on `/pricing` | `tier`, `label` |

Why the duplicated client + server events on waitlist signup: client-side
fires sooner (good for funnel-step latency), server-side is authoritative
(can't be ad-blocked). Use the server event for the conversion KPI
dashboard; use the client funnel for drop-off analysis.

Drop a `posthog-setup-report.md` (the wizard writes one) in the project
root after wiring — it's the audit trail for which events exist + the
PostHog dashboard URLs they feed.

---

## 10. Smoke verification

After every step above, before declaring done:

```bash
# DNS
dig <domain>            +short  # → Vercel anycast IP
dig www.<domain>        +short  # → Vercel CNAME
dig uat.<domain>        +short
dig dev.<domain>        +short

# HTTP
curl -sI https://<domain>/        | grep -E "^HTTP"  # 200 (or coming-soon page)
curl -sI https://www.<domain>/    | grep -E "^(HTTP|location)"  # 308 → apex
curl -sI https://uat.<domain>/    | grep -E "^HTTP"  # 200
curl -sI https://dev.<domain>/    | grep -E "^HTTP"  # 200

# Robots
curl -s https://<domain>/         | grep -oE 'name="robots" content="[^"]+"'  # index, follow
curl -s https://uat.<domain>/     | grep -oE 'name="robots" content="[^"]+"'  # noindex, nofollow

# JSON-LD
curl -s https://<domain>/         | grep -oE '"@type":"[A-Z][a-zA-Z]+"' | sort -u

# Database (with connection string in shell var, not argv)
DATABASE_URL=… pnpm dlx tsx scripts/smoke-db.mts

# API persistence
curl -s -w "\n%{http_code}\n" -X POST https://<domain>/api/waitlist \
  -H "Content-Type: application/json" -H "x-real-ip: 198.51.100.1" \
  -d '{"email":"smoke@example.test"}'

# PostHog (after env vars set)
# Open https://<domain>/ with browser devtools → Network → look for /e/ requests to *.i.posthog.com
```

If any check fails, fix before moving on.

---

## Credential separation — `PROD_` prefix convention

Pre-launch, most env vars are shared across Vercel's Production and
Preview scopes because the values are test/dev creds — sharing is fine,
even desirable (one source of truth, less drift). Once real production
credentials arrive (live billing keys, prod AI keys with their own
budgets, prod OAuth apps), they need to be **isolated to the Production
scope** so a preview deploy can't accidentally charge a real card, burn
the prod AI budget, or send mail from the prod sender.

### The convention

For any credential that **needs a different value in Production**:

- Add the prod-only value to Vercel as `PROD_<KEY>` scoped to
  **Production only**.
- Leave the existing `<KEY>` (shared or Preview-only) holding the
  test/dev value.
- App code reads via `envProd('<KEY>')` from `lib/env.ts`, which
  prefers `PROD_<KEY>` on Vercel's production scope and falls back to
  `<KEY>` everywhere else.

This means the Vercel dashboard env list visually separates real prod
secrets (`PROD_` prefix) from shared dev/test values (bare name) — no
risk of editing the wrong row when both happen to be named the same.

### Adding a prod-only credential

```bash
# 1. Set the prod-only value, Production scope only
printf '%s' "$LIVE_KEY" | vercel env add PROD_SOME_API_KEY production --yes --force --sensitive

# 2. (Optional) Constrain the existing shared value to Preview only,
#    once you've confirmed the prod path uses PROD_SOME_API_KEY
vercel env rm SOME_API_KEY preview --yes
printf '%s' "$TEST_KEY" | vercel env add SOME_API_KEY preview --yes --force --sensitive
```

### Reading from app code

```ts
import { envProd } from "@/lib/env";

const authSecret = envProd("AUTH_SECRET");       // PROD_AUTH_SECRET in prod, AUTH_SECRET elsewhere
const billingKey = envProd("STRIPE_SECRET_KEY"); // separate live vs test
const aiKey = envProd("ANTHROPIC_API_KEY");      // separate prod budget
```

### When NOT to use `PROD_`

- **`NEXT_PUBLIC_*`** — build-time public values; bare names + Vercel
  scope per env are enough.
- **Values identical across all envs** — keep one entry on shared
  scope.
- **Vars with branch-scoped overrides already in Vercel** —
  `DATABASE_URL` on `Preview (develop)` already overrides the shared
  entry for develop deploys; the per-branch Vercel scope is doing the
  job `PROD_` would.

### Reveren applicability

Reveren is pre-launch with only a `WaitlistSignup` table — no live
credentials today need `PROD_*` separation. The convention is here
for Phase 1 (Auth.js + Subscriptions per `docs/NEON.md`), at which
point `AUTH_SECRET`, OAuth client secrets, and Stripe keys all become
candidates for the prefix. `prisma.config.ts` already accepts
`PROD_DIRECT_URL` ahead of the bare `DIRECT_URL` so the migration URL
fits the same pattern when needed.

---

## What goes in `.env.local` vs Vercel

| Key | `.env.local` (local dev) | Vercel Production | Vercel Preview (uat) | Vercel Preview (develop) | Generic Preview (feature branches) |
|---|---|---|---|---|---|
| `LAUNCH_MODE` | optional (test gate locally) | `coming-soon` until launch | unset | unset | unset |
| `DATABASE_URL` | DEV branch pooled | PROD branch pooled | UAT branch pooled | DEV branch pooled | auto-injected by Neon integration (per-branch fork) |
| `DIRECT_URL` | DEV branch direct | PROD branch direct (or `PROD_DIRECT_URL`) | UAT branch direct | DEV branch direct | — (integration uses `DATABASE_URL_UNPOOLED`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | DEV PostHog project key | PROD project key | UAT project key | DEV project key | DEV project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` | same | same | same | same |

`.env.local` is gitignored. Never paste production credentials in chat,
issue trackers, or any third-party SaaS log; rotate immediately if you do.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `vercel domains add <subdomain>` returns `alias_conflict` | DNS not propagated yet, or apex not on Vercel DNS | Wait for `dig` to confirm propagation, then retry |
| `uat.<domain>` returns 401 with "Authentication Required" | Vercel SSO protection enabled | `vercel api … -X PATCH … {"ssoProtection":null}` |
| `prisma migrate dev` fails with "datasource property url no longer supported" | Prisma 7 schema change | Move `url` to `prisma.config.ts`; schema only declares `provider` |
| Vercel build fails on `prisma migrate deploy` | DIRECT_URL not set on that env scope | Add via `vercel env add DIRECT_URL <env> [git-branch]` |
| Tests fail with "DATABASE_URL is not set" | `lib/prisma.ts` not lazy | Wrap export in a `Proxy` so import-time doesn't construct |
| `next dev` route returns 404 in middleware-rewritten path | `/coming-soon` route doesn't exist | Create `app/coming-soon/page.tsx` |

---

## When to revisit

This playbook lives alongside the project's launch checklist
(`PRE_GO_LIVE_CHECKLIST.md`) and TODOS. Revisit when:

- Adding a fourth long-lived environment (e.g. `staging`) — the model
  generalises but each new env needs its own Neon branch + Vercel
  domain + env var matrix entry.
- Migrating off Hobby plan — some Vercel features (better SSO config,
  custom environments, more env vars) unlock at Pro.
- Adding email — Resend / Loops / SES setup goes in a separate
  `EMAIL.md` doc; SPF/DKIM/DMARC records are added at the DNS step.
- Changing primary user region — Neon + Vercel both have AU regions
  (Sydney) but US-East is the global default. Switching means new
  Neon project + new connection strings + Vercel `regions` config.

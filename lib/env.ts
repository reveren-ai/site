/**
 * Environment resolution + indexability rules.
 *
 * The single source of truth for "what environment is this build running in"
 * and "should crawlers index this surface". Used by the root layout's
 * `robots` directive and the `<EnvBanner>` component so they can never drift.
 *
 * Indexing only happens in `production`. dev / preview / uat all emit
 * `noindex, follow` — follow is on (not nofollow) so internal links still
 * carry signal when the team shares a non-prod link for review.
 *
 * Environment resolution priority:
 *   1. NEXT_PUBLIC_APP_ENV explicit override (any of 'production' | 'uat'
 *      | 'preview' | 'development'). Wins over Vercel's signal — useful for
 *      branch deploys that should be tagged UAT specifically.
 *   2. VERCEL_ENV ('production' | 'preview' | 'development').
 *   3. NODE_ENV fallback for local-only builds.
 */

export type AppEnv = "production" | "uat" | "preview" | "development";

const VALID_ENVS: ReadonlySet<AppEnv> = new Set([
  "production",
  "uat",
  "preview",
  "development",
]);

export function getAppEnv(): AppEnv {
  const override = process.env.NEXT_PUBLIC_APP_ENV;
  if (override && VALID_ENVS.has(override as AppEnv)) {
    return override as AppEnv;
  }
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "production") return "production";
  if (vercelEnv === "preview") return "preview";
  if (process.env.NODE_ENV === "production") return "production";
  return "development";
}

export function isProductionEnv(): boolean {
  return getAppEnv() === "production";
}

/**
 * Read an env var with a production-scope override.
 *
 * On Vercel's production scope (`VERCEL_ENV=production`), prefers
 * `PROD_<KEY>` when set — the real production credential. Falls back to
 * the bare `<KEY>`, which typically holds the shared dev/test value.
 *
 * In Preview / Development scopes, only reads `<KEY>`, ignoring any
 * stray `PROD_<KEY>` so production credentials can't leak by accident
 * even if mis-scoped in Vercel.
 *
 * Uses `VERCEL_ENV` directly rather than `getAppEnv()` so a local
 * `NEXT_PUBLIC_APP_ENV=production` override can't unlock prod
 * credentials by mistake. To test PROD_* values locally, set
 * `VERCEL_ENV=production` in `.env.local` explicitly.
 *
 * Use for credentials that NEED to differ between prod and preview:
 * Stripe live vs test keys, prod DB vs dev DB, AUTH secrets, AI API
 * keys with separate budgets, OAuth client IDs.
 *
 * Don't use for: `NEXT_PUBLIC_*` (build-time public values), values
 * identical across all envs, or env vars that already have
 * branch-scoped overrides in Vercel.
 *
 * See `docs/PRE_PRODUCTION.md` § "Credential separation".
 */
export function envProd(key: string): string | undefined {
  if (process.env.VERCEL_ENV === "production") {
    const prodValue = process.env[`PROD_${key}`];
    if (prodValue) return prodValue;
  }
  return process.env[key];
}

export const ENV_BANNER_LABELS: Record<Exclude<AppEnv, "production">, string> =
  {
    development: "Local · noindex",
    preview: "Preview · noindex",
    uat: "UAT · noindex",
  };

/**
 * Background colour for the EnvBanner, keyed to environment.
 *   development -> grey (safe)
 *   preview     -> blue (Vercel-default semantic)
 *   uat         -> orange (warning — closer to prod, easier to confuse)
 */
export const ENV_BANNER_COLORS: Record<
  Exclude<AppEnv, "production">,
  { bg: string; fg: string }
> = {
  development: { bg: "#3a3a3a", fg: "#f5f5f5" },
  preview: { bg: "#1d4ed8", fg: "#ffffff" },
  uat: { bg: "#c2410c", fg: "#ffffff" },
};

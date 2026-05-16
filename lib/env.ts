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

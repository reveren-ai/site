// Load .env.local before .env so Next.js-style local secrets are available
// to Prisma CLI commands. Prisma's auto dotenv only reads .env; without
// this shim, `prisma migrate dev` would not see DATABASE_URL when it
// lives in .env.local.
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local", override: false });
loadEnv(); // fall back to .env (no override; .env.local wins where set)

import { defineConfig } from "prisma/config";

// Prisma 7 wants the connection URL here, not in schema.prisma.
//
// `prisma migrate` needs the unpooled connection because pgbouncer doesn't
// expose advisory locks. The URL can land under several names depending on
// who provisioned the env — resolve in priority order:
//
//   1. PROD_DIRECT_URL on Vercel Production scope (the PROD_ prefix
//      convention, see docs/PRE_PRODUCTION.md § "Credential separation").
//   2. DIRECT_URL — hand-set name on Production + Preview(develop|uat)
//      and local .env.local.
//   3. DATABASE_URL_UNPOOLED — what the Neon Vercel integration injects on
//      auto-forked feature-branch previews.
//   4. DATABASE_URL — last resort (the pooled connection). `migrate deploy`
//      will fail on advisory locks but the error is clear.
//
// Runtime serverless handlers always use the pooled DATABASE_URL via
// `new PrismaClient({ datasourceUrl })` so the lambda doesn't exhaust the
// DB's connection limit under load.
function migrationUrl(): string | undefined {
  if (
    process.env["VERCEL_ENV"] === "production" &&
    process.env["PROD_DIRECT_URL"]
  ) {
    return process.env["PROD_DIRECT_URL"];
  }
  return (
    process.env["DIRECT_URL"] ??
    process.env["DATABASE_URL_UNPOOLED"] ??
    process.env["DATABASE_URL"]
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationUrl(),
  },
});

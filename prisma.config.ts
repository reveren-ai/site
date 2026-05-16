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
// expose advisory locks. Two names for the same thing depending on who
// provisioned the env:
//   - DIRECT_URL: our hand-set name on Production + Preview(develop|uat).
//   - DATABASE_URL_UNPOOLED: what the Neon Vercel integration injects on
//     auto-forked feature-branch previews.
// Fall through to the pooled DATABASE_URL only as a last resort (will fail
// on `migrate deploy`, but at least surfaces a clear error).
//
// Runtime serverless handlers always use the pooled DATABASE_URL via
// `new PrismaClient({ datasourceUrl })` so the lambda doesn't exhaust the
// DB's connection limit under load.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env["DIRECT_URL"] ??
      process.env["DATABASE_URL_UNPOOLED"] ??
      process.env["DATABASE_URL"],
  },
});

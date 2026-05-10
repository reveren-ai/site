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
// We use DIRECT_URL (the unpooled Neon connection) because `prisma migrate`
// needs advisory locks that pgbouncer doesn't expose. Runtime serverless
// handlers create PrismaClient with `datasourceUrl: process.env.DATABASE_URL`
// (the pooled connection) so the lambda doesn't exhaust the DB's connection
// limit under load.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});

// Prisma client singleton. Uses the Neon serverless driver via
// @prisma/adapter-neon so cold starts on Vercel Fluid Compute don't pay
// the TCP-handshake cost — the driver speaks Neon's HTTP protocol and
// reuses the connection pool across warm invocations.
//
// The exported `prisma` is a Proxy that lazy-creates the underlying
// PrismaClient on first method access. This keeps tests + builds where
// DATABASE_URL is intentionally absent from throwing at import time;
// the real connection only happens when a route handler actually
// queries.
//
// The globalThis trick is the canonical Next.js + Prisma pattern: in dev
// it prevents hot-reload from leaking new clients on every save; in prod
// it lets warm Vercel instances reuse the same client across requests.

import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Local: add to .env.local. Vercel: set per environment scope.",
    );
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

function getOrCreate(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  } else {
    // In production we still cache — single instance per warm container.
    globalForPrisma.prisma = client;
  }
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getOrCreate(), prop, receiver);
  },
});

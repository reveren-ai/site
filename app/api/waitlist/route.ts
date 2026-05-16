import { NextResponse } from "next/server";
import { z } from "zod";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getPostHogClient } from "@/lib/posthog-server";

// Persists tier-aware waitlist signups to the Neon-backed waitlist_signups
// table (Prisma model: WaitlistSignup). Inserts are intentionally
// non-idempotent — a given email may sign up at multiple tiers over time
// and each event matters for funnel analysis. The in-memory rate limit
// below caps abuse before it reaches the DB.

const schema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(254),
    tier: z.enum(["pro", "team", "enterprise", "general"]).default("general"),
    company: z.string().trim().min(1).max(200).optional(),
    seats: z.number().int().min(1).max(100000).optional(),
    useCase: z
      .enum(["banking", "healthcare", "government", "regulated", "other"])
      .optional(),
  })
  .superRefine((val, ctx) => {
    // Enterprise leads must include a company so sales can route the lead.
    if (val.tier === "enterprise" && !val.company) {
      ctx.addIssue({
        code: "custom",
        path: ["company"],
        message: "Company is required for the Enterprise waitlist.",
      });
    }
  });

// Cap raised from 1024 → 4096 to fit enterprise payloads (email + tier +
// company + seats + useCase). Still small enough that a megabyte of garbage
// is rejected before parsing.
const MAX_BODY_BYTES = 4096;

// Tiny in-memory rate limit. Best-effort only — replaced by real rate limiting
// (Upstash) in Phase 1. Resets when the server restarts; fine for waitlist
// volume during pre-launch.
const HITS = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LIMIT = 5;

function rateLimit(key: string) {
  const now = Date.now();
  const entry = HITS.get(key);
  if (!entry || entry.resetAt < now) {
    HITS.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= LIMIT) {
    return { ok: false };
  }
  entry.count += 1;
  return { ok: true };
}

function clientKey(req: Request): string | null {
  // Trust only forwarded headers we'd actually receive in production behind
  // Vercel/CDN. If none are present, treat as untrusted and fail closed —
  // refusing to serve is safer than putting every anonymous caller in the
  // same shared bucket.
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return null;
}

// SHA-256 of the IP. Used for dedup + anti-abuse without storing PII;
// never reversed. Hex output is fine — collision risk on a few thousand
// signups is negligible.
function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

// Extract the path the user was on when they hit the waitlist (referer).
// Used for funnel attribution: which surface drove the signup. Returns
// undefined if the referer is missing or cross-origin.
function sourcePath(req: Request): string | undefined {
  const referer = req.headers.get("referer");
  if (!referer) return undefined;
  try {
    const url = new URL(referer);
    return url.pathname;
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  const key = clientKey(req);
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "Unable to identify client. Try again from a different network." },
      { status: 503 },
    );
  }

  const allowed = rateLimit(key);
  if (!allowed.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  // Cap body size before parsing — a 50MB body of garbage shouldn't pin memory.
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Body too large." },
      { status: 413 },
    );
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read request body." },
      { status: 400 },
    );
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Body too large." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    // Surface the first issue's message so enterprise callers see "Company
    // is required" instead of a generic email error. Falls back to the
    // generic message for plain email validation failures.
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue?.message?.startsWith("Company")
      ? firstIssue.message
      : "Please enter a valid email.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 },
    );
  }

  const source = sourcePath(req);

  try {
    await prisma.waitlistSignup.create({
      data: {
        email: parsed.data.email,
        tier: parsed.data.tier,
        company: parsed.data.company,
        seats: parsed.data.seats,
        useCase: parsed.data.useCase,
        source,
        ipHash: hashIp(key),
      },
    });
  } catch (err) {
    // Don't surface DB internals to the caller. Log for observability,
    // return a transient 503 so the user can retry.
    console.error("[waitlist] insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not record your signup. Please try again." },
      { status: 503 },
    );
  }

  const posthog = getPostHogClient();
  if (posthog) {
    posthog.identify({
      distinctId: parsed.data.email,
      properties: { waitlist_tier: parsed.data.tier },
    });
    posthog.capture({
      distinctId: parsed.data.email,
      event: "waitlist_signup_recorded",
      properties: {
        tier: parsed.data.tier,
        source,
        has_company: Boolean(parsed.data.company),
        has_seats: Boolean(parsed.data.seats),
        has_use_case: Boolean(parsed.data.useCase),
      },
    });
    await posthog._shutdown();
  }

  // Email confirmation comes in Phase 1 alongside Auth.js + Resend wiring.
  // Today the DB row is the system of record.
  return NextResponse.json(
    { ok: true, message: "You're on the list." },
    { status: 200 },
  );
}

export const runtime = "nodejs";

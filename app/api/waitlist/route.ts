import { NextResponse } from "next/server";
import { z } from "zod";

// Pre-Go-Live: validates and returns 200 without persisting. Phase 1 wires
// real persistence (Neon + email confirmation) and must capture every field
// — email, tier, company, seats, useCase — not just email. Don't add a DB
// call here yet.

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

  // TODO(phase-1): persist all captured fields (email, tier, company, seats,
  // useCase) to the waitlist table; send tier-aware confirmation email.
  // Today this validates and returns 200 without writing anywhere.
  return NextResponse.json(
    { ok: true, message: "You're on the list." },
    { status: 200 },
  );
}

export const runtime = "nodejs";

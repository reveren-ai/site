import { NextResponse } from "next/server";
import { z } from "zod";

// Pre-Go-Live: validates and returns 200 without persisting. Phase 1 wires
// real persistence (Neon + email confirmation). Don't add a DB call here yet.

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

// Tiny in-memory rate limit. Best-effort only — replaced by real rate limiting
// (Upstash) in Phase 1. Resets when the server restarts; fine for waitlist
// volume during pre-launch.
const HITS = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LIMIT = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || entry.resetAt < now) {
    HITS.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= LIMIT) {
    return { ok: false };
  }
  entry.count += 1;
  return { ok: true };
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  const allowed = rateLimit(ip);
  if (!allowed.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  // TODO(phase-1): persist to waitlist table; send confirmation email.
  // For now, accept silently — UX is "you're on the list" either way.
  return NextResponse.json(
    { ok: true, message: "You're on the list." },
    { status: 200 },
  );
}

export const runtime = "nodejs";

import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock the Prisma singleton so tests don't touch a real Neon branch.
// `prisma.waitlistSignup.create` is the only method the route calls.
const createMock = vi.fn().mockResolvedValue({ id: "test-id" });
vi.mock("@/lib/prisma", () => ({
  prisma: {
    waitlistSignup: {
      create: (args: unknown) => createMock(args),
    },
  },
}));

// Mock the server-side PostHog client. posthog-node's ESM resolution
// chokes inside vitest's environment; the tests don't need real
// observability anyway. Capture + identify both no-op.
const captureMock = vi.fn();
const identifyMock = vi.fn();
vi.mock("@/lib/posthog-server", () => ({
  getPostHogClient: () => ({
    capture: captureMock,
    identify: identifyMock,
    shutdown: vi.fn().mockResolvedValue(undefined),
    _shutdown: vi.fn().mockResolvedValue(undefined),
    flush: vi.fn().mockResolvedValue(undefined),
  }),
}));

import { POST } from "./route";

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-real-ip": "127.0.0.1", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(async () => {
    // Each test uses a unique IP so the in-memory rate limiter doesn't leak
    // between tests within the same process.
    createMock.mockClear();
    createMock.mockResolvedValue({ id: "test-id" });
  });

  it("accepts a valid email", async () => {
    const res = await POST(makeRequest({ email: "user@example.com" }, { "x-real-ip": "10.0.0.1" }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean };
    expect(body.ok).toBe(true);
  });

  it("rejects an invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }, { "x-real-ip": "10.0.0.2" }));
    expect(res.status).toBe(400);
    const body = (await res.json()) as { ok: boolean };
    expect(body.ok).toBe(false);
  });

  it("rejects a missing email", async () => {
    const res = await POST(makeRequest({}, { "x-real-ip": "10.0.0.3" }));
    expect(res.status).toBe(400);
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(makeRequest("not json", { "x-real-ip": "10.0.0.4" }));
    expect(res.status).toBe(400);
  });

  it("rate limits after the configured threshold", async () => {
    const ip = "10.0.0.99";
    const responses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await POST(makeRequest({ email: `u${i}@x.com` }, { "x-real-ip": ip }));
      responses.push(res.status);
    }
    expect(responses.filter((s) => s === 429).length).toBeGreaterThanOrEqual(1);
  });

  it("prefers x-forwarded-for over x-real-ip and 503s when neither is present", async () => {
    // x-forwarded-for wins over x-real-ip (first IP in list).
    const ok = await POST(
      makeRequest(
        { email: "fwd@example.com" },
        { "x-forwarded-for": "203.0.113.5, 10.0.0.1", "x-real-ip": "10.0.0.6" },
      ),
    );
    expect(ok.status).toBe(200);

    // No identifying headers → fail closed.
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "u@example.com" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
  });

  it("rejects a payload over the size cap with a 413", async () => {
    // Declared content-length over the cap short-circuits before parsing.
    const big = "x".repeat(2048);
    const res = await POST(
      makeRequest(
        { email: `${big}@example.com` },
        { "x-real-ip": "10.0.0.7", "content-length": "5000" },
      ),
    );
    expect(res.status).toBe(413);
  });

  it("rejects a body whose actual size exceeds the cap", async () => {
    // No content-length header — caught by the post-read length check instead.
    const big = "x".repeat(8192);
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "10.0.0.8" },
      body: JSON.stringify({ email: `${big}@example.com` }),
    });
    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  describe("tier-aware payloads", () => {
    it("email-only still succeeds (tier defaults to general)", async () => {
      const res = await POST(
        makeRequest({ email: "legacy@example.com" }, { "x-real-ip": "10.0.1.1" }),
      );
      expect(res.status).toBe(200);
      const body = (await res.json()) as { ok: boolean };
      expect(body.ok).toBe(true);
    });

    it("accepts a Pods tier payload", async () => {
      const res = await POST(
        makeRequest(
          { email: "pods@example.com", tier: "pods" },
          { "x-real-ip": "10.0.1.2" },
        ),
      );
      expect(res.status).toBe(200);
    });

    it("accepts a Marketplace tier payload", async () => {
      const res = await POST(
        makeRequest(
          { email: "market@example.com", tier: "marketplace" },
          { "x-real-ip": "10.0.1.3" },
        ),
      );
      expect(res.status).toBe(200);
      const body = (await res.json()) as { ok: boolean };
      expect(body.ok).toBe(true);
    });

    it("rejects an unknown tier value with 400", async () => {
      const res = await POST(
        makeRequest(
          { email: "x@example.com", tier: "enterprise" },
          { "x-real-ip": "10.0.1.5" },
        ),
      );
      expect(res.status).toBe(400);
    });
  });

  describe("persistence", () => {
    it("inserts the signup with hashed IP + source path", async () => {
      const res = await POST(
        makeRequest(
          { email: "persist@example.com", tier: "pods" },
          { "x-real-ip": "10.0.2.1", referer: "https://reveren.ai/pricing" },
        ),
      );
      expect(res.status).toBe(200);
      expect(createMock).toHaveBeenCalledTimes(1);
      const arg = createMock.mock.calls[0]?.[0] as {
        data: Record<string, unknown>;
      };
      expect(arg.data.email).toBe("persist@example.com");
      expect(arg.data.tier).toBe("pods");
      expect(arg.data.source).toBe("/pricing");
      // ipHash should be SHA-256 hex (64 chars), not the raw IP.
      expect(arg.data.ipHash).toMatch(/^[0-9a-f]{64}$/);
      expect(arg.data.ipHash).not.toBe("10.0.2.1");
    });

    it("returns 503 on DB failure without leaking the error", async () => {
      createMock.mockRejectedValueOnce(new Error("connection refused"));
      const res = await POST(
        makeRequest(
          { email: "boom@example.com" },
          { "x-real-ip": "10.0.2.2" },
        ),
      );
      expect(res.status).toBe(503);
      const body = (await res.json()) as { ok: boolean; error: string };
      expect(body.ok).toBe(false);
      // User-facing error must not echo the raw exception.
      expect(body.error).not.toMatch(/connection refused/i);
      expect(body.error).toMatch(/try again/i);
    });
  });
});

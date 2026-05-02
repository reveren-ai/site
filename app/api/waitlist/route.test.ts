import { describe, it, expect, beforeEach } from "vitest";
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
});

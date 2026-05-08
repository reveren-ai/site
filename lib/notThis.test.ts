import { describe, it, expect } from "vitest";
import { notThis } from "./notThis";

describe("notThis (counter-positioning)", () => {
  it("declares the six 'not a' rules in canonical order — agent → IDE → model → knowledge base → vendor lock-in → marketplace lock-in", () => {
    expect(notThis.map((n) => n.id)).toEqual([
      "not-an-agent",
      "not-an-ide",
      "not-a-model",
      "not-a-knowledge-base",
      "not-locked-in",
      "not-a-locked-marketplace",
    ]);
  });

  it("includes the marketplace counter-positioning shot at single-agent stores", () => {
    const marketplace = notThis.find((n) => n.id === "not-a-locked-marketplace");
    expect(marketplace).toBeDefined();
    expect(marketplace?.body).toMatch(/Anthropic Skills/);
    expect(marketplace?.body).toMatch(/GPT Store/);
    expect(marketplace?.body).toMatch(/every agent/);
  });

  it("every rule starts with 'Not'", () => {
    for (const item of notThis) {
      expect(item.rule.startsWith("Not")).toBe(true);
    }
  });

  it("every rule has supporting body copy", () => {
    for (const item of notThis) {
      expect(item.body.length).toBeGreaterThan(20);
    }
  });
});

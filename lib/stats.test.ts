import { describe, it, expect } from "vitest";
import { proofStats, proofStory } from "./stats";

describe("proofStats", () => {
  it("ships a non-empty list of stats", () => {
    expect(proofStats.length).toBeGreaterThan(0);
  });

  it("every stat carries a value and a label", () => {
    for (const s of proofStats) {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
    }
  });

  it("at least one stat has an explanatory hint", () => {
    expect(proofStats.some((s) => Boolean(s.hint))).toBe(true);
  });
});

describe("proofStory", () => {
  it("frames mrktable as the dogfood project", () => {
    expect(proofStory.eyebrow.toLowerCase()).toContain("reveren");
    expect(proofStory.headline).toMatch(/mrktable/i);
    expect(proofStory.body.length).toBeGreaterThan(40);
  });
});

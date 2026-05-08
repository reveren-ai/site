import { describe, it, expect } from "vitest";
import { audiences } from "./audiences";

describe("audiences", () => {
  it("lists exactly the three canonical audiences", () => {
    expect(audiences.map((a) => a.id)).toEqual([
      "engineering-teams",
      "vibe-coders",
      "engineering-leaders",
    ]);
  });

  it("requires every audience to have label, pain, and CTA copy", () => {
    for (const a of audiences) {
      expect(a.label).toBeTruthy();
      expect(a.pain.length).toBeGreaterThan(40);
      expect(a.cta).toBeTruthy();
    }
  });

  it("has unique ids", () => {
    const ids = audiences.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

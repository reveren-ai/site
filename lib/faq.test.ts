import { describe, it, expect } from "vitest";
import { faq } from "./faq";

describe("faq", () => {
  it("ships at least the seven launch FAQs", () => {
    expect(faq.length).toBeGreaterThanOrEqual(7);
  });

  it("has unique ids", () => {
    const ids = faq.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("answers every question with non-trivial copy", () => {
    for (const item of faq) {
      expect(item.question.length).toBeGreaterThan(10);
      expect(item.question.endsWith("?")).toBe(true);
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });

  it("calls out byo-keys and self-host policy explicitly", () => {
    const ids = faq.map((f) => f.id);
    expect(ids).toContain("byo-keys");
    expect(ids).toContain("self-host");
  });
});

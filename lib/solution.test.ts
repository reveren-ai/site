import { describe, it, expect } from "vitest";
import { solution, solutionIntro } from "./solution";

describe("solution pillars", () => {
  it("ships the four primitives in canonical order", () => {
    expect(solution.map((s) => s.id)).toEqual([
      "protocols",
      "pipelines",
      "standards",
      "audit",
    ]);
  });

  it("has a labelled, non-trivial description per pillar", () => {
    for (const s of solution) {
      expect(s.label.length).toBeGreaterThan(2);
      expect(s.description.length).toBeGreaterThan(30);
    }
  });

  it("intro frames the layer as the standards layer", () => {
    expect(solutionIntro.eyebrow.toLowerCase()).toContain("standards");
    expect(solutionIntro.body.length).toBeGreaterThan(40);
  });
});

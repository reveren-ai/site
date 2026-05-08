import { describe, it, expect } from "vitest";
import { comparisonHeader, comparisonRows } from "./comparison";

describe("comparison table", () => {
  it("uses the canonical four-column header (cursorrules / copilot / windsurf / reveren)", () => {
    expect(comparisonHeader.cursorrules).toBe(".cursorrules");
    expect(comparisonHeader.copilot).toBe("Copilot Instructions");
    expect(comparisonHeader.windsurf).toBe("Windsurf rules");
    expect(comparisonHeader.reveren).toBe("reveren");
  });

  it("populates a value for every cell in every row", () => {
    for (const row of comparisonRows) {
      expect(row.feature).toBeTruthy();
      expect(row.cursorrules).toBeTruthy();
      expect(row.copilot).toBeTruthy();
      expect(row.windsurf).toBeTruthy();
      expect(row.reveren).toBeTruthy();
    }
  });

  it("calls out reveren's multi-step + agent-agnostic differentiators", () => {
    const features = comparisonRows.map((r) => r.feature.toLowerCase());
    expect(features.some((f) => f.includes("multi-step"))).toBe(true);
    expect(features.some((f) => f.includes("agent compat"))).toBe(true);
  });
});

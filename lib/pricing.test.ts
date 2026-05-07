import { describe, it, expect } from "vitest";
import { tiers, featureMatrix, pricingFootnote } from "./pricing";

describe("pricing data", () => {
  it("ships exactly four tiers in canonical order", () => {
    expect(tiers.map((t) => t.id)).toEqual(["free", "pro", "team", "enterprise"]);
  });

  it("uses round numbers — no .99 anywhere", () => {
    for (const t of tiers) {
      expect(t.price).not.toMatch(/\.99/);
    }
  });

  it("flags exactly one tier as popular", () => {
    const popular = tiers.filter((t) => t.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].id).toBe("pro");
  });

  it("Free tier has no recurring price suffix", () => {
    const free = tiers.find((t) => t.id === "free");
    expect(free?.priceSuffix).toBeUndefined();
  });

  it("matrix is grouped into Pipeline, Protocols, Agents, Cloud, Support — in that order", () => {
    expect(featureMatrix.map((g) => g.id)).toEqual([
      "pipeline",
      "protocols",
      "agents",
      "cloud",
      "support",
    ]);
  });

  it("every matrix row has values for all four tiers", () => {
    for (const group of featureMatrix) {
      for (const row of group.rows) {
        expect(row.free).toBeDefined();
        expect(row.pro).toBeDefined();
        expect(row.team).toBeDefined();
        expect(row.enterprise).toBeDefined();
      }
    }
  });

  it("declares local reveren run as unlimited on every tier", () => {
    const pipeline = featureMatrix.find((g) => g.id === "pipeline");
    const localRow = pipeline?.rows.find((r) => r.label.includes("Local"));
    expect(localRow?.free).toBe("Unlimited");
    expect(localRow?.pro).toBe("Unlimited");
    expect(localRow?.team).toBe("Unlimited");
    expect(localRow?.enterprise).toBe("Unlimited");
  });

  it("calls out USD and the cloud-runs distinction in the footnote", () => {
    expect(pricingFootnote).toMatch(/USD/);
    expect(pricingFootnote).toMatch(/cloud/i);
  });
});

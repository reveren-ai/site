import { describe, it, expect } from "vitest";
import {
  podsHero,
  podsHowItWorks,
  podsCompareRows,
  podsCompareHeader,
  podsWaitlist,
} from "./pods";

describe("pods (marketplace coming-soon copy)", () => {
  it("hero declares the open-marketplace eyebrow + the App Store comparison hook", () => {
    expect(podsHero.eyebrow).toMatch(/Pod Marketplace/);
    expect(podsHero.headline).toMatch(/App Store/);
    expect(podsHero.subline).toMatch(/Mo 3/);
  });

  it("how-it-works has three canonical steps: Author → List → Earn", () => {
    expect(podsHowItWorks.map((s) => s.id)).toEqual(["author", "list", "earn"]);
  });

  it("comparison table contains the cross-agent + open-format moats", () => {
    const features = podsCompareRows.map((r) => r.feature.toLowerCase());
    expect(features.some((f) => f.includes("cross-agent"))).toBe(true);
    expect(features.some((f) => f.includes("open file format"))).toBe(true);
  });

  it("comparison header names the three competitors clearly", () => {
    expect(podsCompareHeader.anthropicSkills).toMatch(/Anthropic Skills/);
    expect(podsCompareHeader.gptStore).toMatch(/GPT Store/);
    expect(podsCompareHeader.reveren).toMatch(/reveren/);
  });

  it("waitlist block has eyebrow + headline + body", () => {
    expect(podsWaitlist.eyebrow.length).toBeGreaterThan(0);
    expect(podsWaitlist.headline.length).toBeGreaterThan(0);
    expect(podsWaitlist.body.length).toBeGreaterThan(0);
  });
});

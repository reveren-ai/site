import { describe, it, expect } from "vitest";
import {
  podsHero,
  podsHowItWorks,
  podsCompareRows,
  podsCompareHeader,
  podsWaitlist,
} from "./pods";

describe("pods (marketplace coming-soon copy)", () => {
  it("hero names the Protocol Marketplace and avoids invented prices", () => {
    expect(podsHero.eyebrow).toMatch(/Marketplace/);
    expect(podsHero.headline.length).toBeGreaterThan(0);
    // No invented revenue-share figure or price floor anywhere in the hero.
    const heroText = [
      podsHero.eyebrow,
      podsHero.headline,
      podsHero.subline,
    ].join(" ");
    expect(heroText).not.toMatch(/\d+\s*\/\s*\d+/);
    expect(heroText).not.toMatch(/\$\d/);
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

import { describe, it, expect } from "vitest";
import { featureTeaser, featureTeaserIntro } from "./featureTeaser";

describe("featureTeaser (roadmap cards)", () => {
  it("declares three cards in canonical order: available → release-1 → release-2", () => {
    expect(featureTeaser.map((c) => c.status)).toEqual([
      "available",
      "release-1",
      "release-2",
    ]);
  });

  it("uses vague-precision Mo dates, not concrete calendar months", () => {
    for (const card of featureTeaser) {
      if (card.status === "available") continue;
      expect(card.statusLabel).toMatch(/Mo \d/);
      expect(card.statusLabel).not.toMatch(/Q[1-4]/);
      expect(card.statusLabel).not.toMatch(
        /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i,
      );
    }
  });

  it("Available-now card routes to a real surface (not a dead CTA)", () => {
    const live = featureTeaser.find((c) => c.status === "available");
    expect(live).toBeDefined();
    // Either an in-page anchor (#install) or a routed page — never a placeholder.
    expect(live?.cta.href).toMatch(/^(#|\/)/);
    expect(live?.cta.href).not.toBe("#");
  });

  it("upcoming cards route to /pods waitlist", () => {
    for (const card of featureTeaser) {
      if (card.status === "available") continue;
      expect(card.cta.href).toBe("/pods");
    }
  });

  it("every card has body + at least three bullets", () => {
    for (const card of featureTeaser) {
      expect(card.body.length).toBeGreaterThan(20);
      expect(card.bullets.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("intro provides eyebrow + headline", () => {
    expect(featureTeaserIntro.eyebrow.length).toBeGreaterThan(0);
    expect(featureTeaserIntro.headline.length).toBeGreaterThan(0);
  });
});

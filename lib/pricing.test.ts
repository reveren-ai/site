import { describe, it, expect } from "vitest";
import { tiers, featureMatrix, pricingFootnote } from "./pricing";

describe("pricing data", () => {
  it("ships exactly three tiers in canonical order", () => {
    expect(tiers.map((t) => t.id)).toEqual(["free", "pods", "marketplace"]);
  });

  it("labels the tiers Free / Pro / Marketplace", () => {
    expect(tiers.map((t) => t.label)).toEqual(["Free", "Pro", "Marketplace"]);
  });

  it("uses round numbers (no .99 anywhere)", () => {
    for (const t of tiers) {
      expect(t.price).not.toMatch(/\.99/);
    }
  });

  it("prices Pro at $12/mo (the one paid tier at launch)", () => {
    const pro = tiers.find((t) => t.id === "pods");
    expect(pro?.price).toBe("$12");
    expect(pro?.priceSuffix).toMatch(/per month/);
    expect(pro?.priceSuffix).toMatch(/\$120\/yr/);
  });

  it("shows the Marketplace as coming soon (no price yet)", () => {
    const mkt = tiers.find((t) => t.id === "marketplace");
    expect(mkt?.price).toBe("Coming soon");
    expect(mkt?.priceSuffix).toBeUndefined();
  });

  it("flags exactly one tier as popular (Pro)", () => {
    const popular = tiers.filter((t) => t.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].id).toBe("pods");
  });

  it("Free tier is genuinely free", () => {
    const free = tiers.find((t) => t.id === "free");
    expect(free?.price).toBe("$0");
    expect(free?.priceSuffix).toBeUndefined();
  });

  it("surfaces the vibe-coder Pro layer in its features", () => {
    const pro = tiers.find((t) => t.id === "pods");
    const joined = pro?.features.join(" ") ?? "";
    expect(joined).toMatch(/Project brain/i);
    expect(joined).toMatch(/Pre-ship gate/i);
    expect(joined).toMatch(/Autopilot/i);
    // The no-custody promise must be explicit wherever Autopilot appears.
    expect(joined).toMatch(/we never hold credentials/i);
  });

  it("keeps the pricing cards lean — every tier has exactly 3 card features", () => {
    // Cards are the scan layer; the exhaustive list lives in featureMatrix.
    // Three keeps the cards inside the desktop viewport and the mobile scroll
    // short. If this needs to grow, revisit the card layout, don't just bump it.
    for (const t of tiers) {
      expect(t.cardFeatures).toHaveLength(3);
      for (const f of t.cardFeatures) {
        expect(f.length).toBeGreaterThan(0);
      }
    }
  });

  it("matrix is grouped into CLI & protocols, Pro, Marketplace, in that order", () => {
    expect(featureMatrix.map((g) => g.id)).toEqual([
      "cli",
      "pods",
      "marketplace",
    ]);
    expect(featureMatrix.find((g) => g.id === "pods")?.label).toBe("Pro");
  });

  it("every tier carries a non-empty detail string", () => {
    for (const t of tiers) {
      expect(typeof t.detail).toBe("string");
      expect(t.detail.length).toBeGreaterThan(0);
    }
  });

  it("every matrix row has values for all three tiers", () => {
    for (const group of featureMatrix) {
      for (const row of group.rows) {
        expect(row.free).toBeDefined();
        expect(row.pods).toBeDefined();
        expect(row.marketplace).toBeDefined();
      }
    }
  });

  it("declares local rvr run as unlimited on every tier", () => {
    const cli = featureMatrix.find((g) => g.id === "cli");
    const localRow = cli?.rows.find((r) => r.label.includes("Local"));
    expect(localRow?.free).toBe("Unlimited");
    expect(localRow?.pods).toBe("Unlimited");
    expect(localRow?.marketplace).toBe("Unlimited");
  });

  it("footnote states the free core, Pro ($12), the no-custody promise, and no enterprise motion", () => {
    expect(pricingFootnote).toMatch(/free core/i);
    expect(pricingFootnote).toMatch(/Engineering Pod/);
    expect(pricingFootnote).toMatch(/\$12/);
    expect(pricingFootnote).toMatch(/Marketplace/);
    expect(pricingFootnote).toMatch(/never holds your credentials/i);
    expect(pricingFootnote).toMatch(/no enterprise/i);
    // Never a metered/overage figure.
    expect(pricingFootnote).not.toMatch(/overage/i);
  });

  // Snapshot the per-tier CTA shape so accidental edits to label or kind get
  // caught. Pro is purchasable (kind: "checkout" -> Stripe route); Marketplace
  // is still pre-launch (waitlist); Free links to install.
  it("locks the per-tier CTA shape", () => {
    const ctas = Object.fromEntries(tiers.map((t) => [t.id, t.cta]));
    expect(ctas).toEqual({
      free: {
        label: "Install the CLI",
        href: "#install",
        variant: "outlined",
        kind: "install",
      },
      pods: {
        label: "Get Pro — $12/mo",
        href: "/api/checkout/pro",
        variant: "contained",
        kind: "checkout",
      },
      marketplace: {
        label: "Join the waitlist",
        href: "#waitlist",
        variant: "outlined",
        kind: "waitlist",
      },
    });
  });
});

import { describe, it, expect } from "vitest";
import { tiers, featureMatrix, pricingFootnote } from "./pricing";

describe("pricing data", () => {
  it("ships exactly three surfaces in canonical order", () => {
    expect(tiers.map((t) => t.id)).toEqual(["free", "pods", "marketplace"]);
  });

  it("uses round numbers (no .99 anywhere)", () => {
    for (const t of tiers) {
      expect(t.price).not.toMatch(/\.99/);
    }
  });

  it("never prints a dollar figure for the paid surfaces", () => {
    for (const t of tiers) {
      if (t.id === "free") continue;
      // Paid surfaces show "Subscription", never a price.
      expect(t.price).toBe("Subscription");
      expect(t.priceSuffix).toBe("Pricing finalising");
      expect(t.features.join(" ")).not.toMatch(/\$\d/);
    }
  });

  it("flags exactly one tier as popular (Pods)", () => {
    const popular = tiers.filter((t) => t.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].id).toBe("pods");
  });

  it("Free tier is genuinely free", () => {
    const free = tiers.find((t) => t.id === "free");
    expect(free?.price).toBe("$0");
    expect(free?.priceSuffix).toBeUndefined();
  });

  it("matrix is grouped into CLI & protocols, Pods, Marketplace, in that order", () => {
    expect(featureMatrix.map((g) => g.id)).toEqual([
      "cli",
      "pods",
      "marketplace",
    ]);
  });

  it("every tier carries a non-empty detail string", () => {
    for (const t of tiers) {
      expect(typeof t.detail).toBe("string");
      expect(t.detail.length).toBeGreaterThan(0);
    }
  });

  it("every matrix row has values for all three surfaces", () => {
    for (const group of featureMatrix) {
      for (const row of group.rows) {
        expect(row.free).toBeDefined();
        expect(row.pods).toBeDefined();
        expect(row.marketplace).toBeDefined();
      }
    }
  });

  it("declares local rvr run as unlimited on every surface", () => {
    const cli = featureMatrix.find((g) => g.id === "cli");
    const localRow = cli?.rows.find((r) => r.label.includes("Local"));
    expect(localRow?.free).toBe("Unlimited");
    expect(localRow?.pods).toBe("Unlimited");
    expect(localRow?.marketplace).toBe("Unlimited");
  });

  it("footnote states local use is free, paid surfaces are Pods + Marketplace, and there is no enterprise motion", () => {
    expect(pricingFootnote).toMatch(/free/i);
    expect(pricingFootnote).toMatch(/Pods/);
    expect(pricingFootnote).toMatch(/Marketplace/);
    expect(pricingFootnote).toMatch(/no enterprise/i);
    // Never a metered/overage figure, never a dollar amount.
    expect(pricingFootnote).not.toMatch(/\$\d/);
    expect(pricingFootnote).not.toMatch(/overage/i);
  });

  // Snapshot the per-tier CTA shape so accidental edits to label or kind get
  // caught. Pods + Marketplace route through the waitlist (the subscriptions
  // don't exist yet); Free links to install.
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
        label: "Join the Pods waitlist",
        href: "#waitlist",
        variant: "contained",
        kind: "waitlist",
      },
      marketplace: {
        label: "Join the Marketplace waitlist",
        href: "#waitlist",
        variant: "outlined",
        kind: "waitlist",
      },
    });
  });
});

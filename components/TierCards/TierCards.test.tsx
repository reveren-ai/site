import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import TierCards from "./TierCards";
import { tiers, pricingFootnote } from "@/lib/pricing";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

function ctaForTier(tierId: string): HTMLElement {
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) throw new Error(`unknown tier: ${tierId}`);
  // Each card renders its label only once at the top, so we look up the
  // closest card and find the CTA element by its label inside that card.
  return screen.getByRole(
    tier.cta.kind === "waitlist" ? "button" : "link",
    { name: new RegExp(tier.cta.label, "i") },
  );
}

describe("TierCards", () => {
  it("renders all three surfaces", () => {
    renderWithTheme(<TierCards />);
    expect(tiers).toHaveLength(3);
    for (const t of tiers) {
      expect(screen.getByText(t.label)).toBeInTheDocument();
      expect(screen.getByText(t.audience)).toBeInTheDocument();
    }
  });

  it("renders the pricing footnote", () => {
    renderWithTheme(<TierCards />);
    expect(screen.getByText(pricingFootnote)).toBeInTheDocument();
  });

  it("flags exactly one tier with 'Most popular'", () => {
    renderWithTheme(<TierCards />);
    expect(screen.getAllByText("Most popular")).toHaveLength(1);
  });

  it("renders the pre-launch disclosure line for Pro + Marketplace", () => {
    renderWithTheme(<TierCards />);
    expect(
      screen.getByText(/pro and the marketplace are pre-launch/i),
    ).toBeInTheDocument();
  });

  it("Pro CTA renders as a WaitlistButton (button, not anchor)", () => {
    renderWithTheme(<TierCards />);
    const cta = ctaForTier("pods");
    expect(cta.tagName).toBe("BUTTON");
    expect(cta).toHaveTextContent(/join the pro waitlist/i);
  });

  it("Marketplace CTA renders as a WaitlistButton (button, not anchor)", () => {
    renderWithTheme(<TierCards />);
    const cta = ctaForTier("marketplace");
    expect(cta.tagName).toBe("BUTTON");
    expect(cta).toHaveTextContent(/join the waitlist/i);
  });

  it("Free CTA renders as an anchor (#install)", () => {
    renderWithTheme(<TierCards />);
    const cta = ctaForTier("free");
    expect(cta.tagName).toBe("A");
    expect(cta).toHaveAttribute("href", "#install");
  });

  it("does not leak a stray anchor for the paid tiers", () => {
    renderWithTheme(<TierCards />);
    // Avoid relying on `name` matchers — be explicit: there should be exactly
    // zero <a href="#waitlist"> in the rendered tree.
    const links = screen.queryAllByRole("link");
    for (const link of links) {
      expect(link).not.toHaveAttribute("href", "#waitlist");
    }
  });
});

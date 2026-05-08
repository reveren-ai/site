import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import TierCards from "./TierCards";
import { tiers, pricingFootnote } from "@/lib/pricing";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("TierCards", () => {
  it("renders all four tiers", () => {
    renderWithTheme(<TierCards />);
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
});

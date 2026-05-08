import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import PricingTeaser from "./PricingTeaser";
import { tiers } from "@/lib/pricing";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("PricingTeaser", () => {
  it("shows the first three tier labels", () => {
    renderWithTheme(<PricingTeaser />);
    for (const t of tiers.slice(0, 3)) {
      expect(screen.getByText(t.label)).toBeInTheDocument();
    }
  });

  it("flags the popular tier with a 'Most popular' chip", () => {
    renderWithTheme(<PricingTeaser />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("links 'Compare every feature' to the pricing page", () => {
    renderWithTheme(<PricingTeaser />);
    const link = screen.getByRole("link", { name: /compare every feature/i });
    expect(link).toHaveAttribute("href", "/pricing");
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import FeatureTeaser from "./FeatureTeaser";
import { featureTeaser, featureTeaserIntro } from "@/lib/featureTeaser";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("FeatureTeaser", () => {
  it("renders the section heading", () => {
    renderWithTheme(<FeatureTeaser />);
    expect(
      screen.getByRole("heading", { level: 2, name: featureTeaserIntro.headline }),
    ).toBeInTheDocument();
  });

  it("renders one card per roadmap entry with title + body + status label", () => {
    renderWithTheme(<FeatureTeaser />);
    for (const card of featureTeaser) {
      expect(
        screen.getByRole("heading", { level: 3, name: card.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
      expect(screen.getByText(card.statusLabel)).toBeInTheDocument();
    }
  });

  it("each card surfaces a CTA whose href matches the configured target", () => {
    renderWithTheme(<FeatureTeaser />);
    const links = screen.getAllByRole("link");
    for (const card of featureTeaser) {
      expect(
        links.some(
          (l) =>
            l.getAttribute("href") === card.cta.href &&
            l.textContent?.includes(card.cta.label),
        ),
      ).toBe(true);
    }
  });
});

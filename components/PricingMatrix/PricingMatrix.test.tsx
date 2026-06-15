import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import PricingMatrix from "./PricingMatrix";
import { featureMatrix } from "@/lib/pricing";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("PricingMatrix", () => {
  it("renders every group label", () => {
    renderWithTheme(<PricingMatrix />);
    for (const group of featureMatrix) {
      expect(screen.getByText(group.label, { selector: "[role='cell']" })).toBeInTheDocument();
    }
  });

  it("renders every row label", () => {
    renderWithTheme(<PricingMatrix />);
    for (const group of featureMatrix) {
      for (const row of group.rows) {
        expect(screen.getByText(row.label)).toBeInTheDocument();
      }
    }
  });

  it("renders three tier columns in the head", () => {
    renderWithTheme(<PricingMatrix />);
    const table = screen.getByRole("table");
    const colHeaders = within(table).getAllByRole("columnheader");
    // 1 feature column header + 3 tier headers
    expect(colHeaders).toHaveLength(4);
  });
});

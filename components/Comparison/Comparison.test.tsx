import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Comparison from "./Comparison";
import { comparisonRows } from "@/lib/comparison";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Comparison", () => {
  it("renders a table with one row per comparison entry plus the header", () => {
    renderWithTheme(<Comparison />);
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(comparisonRows.length + 1);
  });

  it("renders the four comparison columns in the header", () => {
    renderWithTheme(<Comparison />);
    const headers = screen.getAllByRole("columnheader").map((el) => el.textContent);
    expect(headers).toEqual(
      expect.arrayContaining([".cursorrules", "Copilot Instructions", "Windsurf rules", "reveren"])
    );
  });
});

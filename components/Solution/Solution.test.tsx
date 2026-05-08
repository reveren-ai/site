import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Solution from "./Solution";
import { solution } from "@/lib/solution";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Solution", () => {
  it("renders every solution pillar label as a heading", () => {
    renderWithTheme(<Solution />);
    for (const s of solution) {
      expect(screen.getByRole("heading", { level: 3, name: s.label })).toBeInTheDocument();
    }
  });

  it("numbers the pillars 01..N", () => {
    renderWithTheme(<Solution />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(
      screen.getByText(String(solution.length).padStart(2, "0"))
    ).toBeInTheDocument();
  });
});

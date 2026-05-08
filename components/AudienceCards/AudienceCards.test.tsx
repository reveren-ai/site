import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import AudienceCards from "./AudienceCards";
import { audiences } from "@/lib/audiences";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("AudienceCards", () => {
  it("renders one card per audience with label + pain copy", () => {
    renderWithTheme(<AudienceCards />);
    for (const a of audiences) {
      expect(screen.getByText(a.label)).toBeInTheDocument();
      expect(screen.getByText(a.pain)).toBeInTheDocument();
    }
  });

  it("renders the section heading", () => {
    renderWithTheme(<AudienceCards />);
    expect(
      screen.getByRole("heading", { level: 2, name: /three audiences/i })
    ).toBeInTheDocument();
  });
});

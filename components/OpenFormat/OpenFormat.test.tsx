import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import OpenFormat from "./OpenFormat";
import { GITHUB_SPEC_URL } from "@/lib/install";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("OpenFormat", () => {
  it("links the spec CTA to the canonical SPEC.md URL", () => {
    renderWithTheme(<OpenFormat />);
    const link = screen.getByRole("link", { name: /read the spec/i });
    expect(link).toHaveAttribute("href", GITHUB_SPEC_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders the canonical .protocols/ heading copy", () => {
    renderWithTheme(<OpenFormat />);
    expect(screen.getByText(/the \.protocols\/ format is yours/i)).toBeInTheDocument();
  });
});

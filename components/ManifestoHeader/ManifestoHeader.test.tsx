import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import ManifestoHeader from "./ManifestoHeader";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("ManifestoHeader", () => {
  it("renders the title in an H1", () => {
    renderWithTheme(
      <ManifestoHeader title="Test Title" author="Author X" date="2026-05-08" />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Title");
  });

  it("renders 'By <author> · <date>'", () => {
    renderWithTheme(
      <ManifestoHeader title="T" author="Innocent Muisha" date="2026-01-01" />
    );
    expect(screen.getByText(/By Innocent Muisha · 2026-01-01/)).toBeInTheDocument();
  });
});

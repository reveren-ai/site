import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Nav from "./Nav";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Nav", () => {
  it("links the wordmark to home", () => {
    renderWithTheme(<Nav />);
    expect(screen.getByRole("link", { name: /reveren home/i })).toHaveAttribute("href", "/");
  });

  it("renders the desktop nav links", () => {
    renderWithTheme(<Nav />);
    expect(screen.getAllByRole("link", { name: /pricing/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /manifesto/i }).length).toBeGreaterThan(0);
  });

  it("opens the GitHub link in a new tab", () => {
    renderWithTheme(<Nav />);
    const ghLinks = screen.getAllByRole("link", { name: /^github$/i });
    for (const link of ghLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Hero from "./Hero";
import { INSTALL_COMMAND } from "@/lib/install";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Hero", () => {
  it("renders the H1 'One pipeline. Every agent.'", () => {
    renderWithTheme(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("One pipeline. Every agent.");
  });

  it("renders the install command CTA", () => {
    renderWithTheme(<Hero />);
    expect(screen.getByRole("button", { name: INSTALL_COMMAND })).toBeInTheDocument();
  });

  it("links to the manifesto page", () => {
    renderWithTheme(<Hero />);
    const link = screen.getByRole("link", { name: /manifesto/i });
    expect(link).toHaveAttribute("href", "/manifesto");
  });
});

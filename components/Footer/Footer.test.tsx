import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Footer from "./Footer";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Footer", () => {
  it("renders the four canonical column headings", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders the current year in the footer rule", () => {
    renderWithTheme(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("opens external links in a new tab with rel=noopener", () => {
    renderWithTheme(<Footer />);
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses internal routing for legal pages (no target=_blank)", () => {
    renderWithTheme(<Footer />);
    const privacy = screen.getByRole("link", { name: "Privacy" });
    expect(privacy).not.toHaveAttribute("target");
  });
});

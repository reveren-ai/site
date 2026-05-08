import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import ManifestoTeaser from "./ManifestoTeaser";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("ManifestoTeaser", () => {
  it("renders the headline quote", () => {
    renderWithTheme(<ManifestoTeaser />);
    expect(screen.getByText(/operating manual/i)).toBeInTheDocument();
  });

  it("links to the manifesto page", () => {
    renderWithTheme(<ManifestoTeaser />);
    const link = screen.getByRole("link", { name: /read the manifesto/i });
    expect(link).toHaveAttribute("href", "/manifesto");
  });
});

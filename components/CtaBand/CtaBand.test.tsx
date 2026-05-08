import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import CtaBand from "./CtaBand";
import { INSTALL_COMMAND } from "@/lib/install";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("CtaBand", () => {
  it("shows the install command as the primary CTA", () => {
    renderWithTheme(<CtaBand />);
    expect(screen.getByRole("button", { name: INSTALL_COMMAND })).toBeInTheDocument();
  });

  it("renders the sales mailto link", () => {
    renderWithTheme(<CtaBand />);
    const link = screen.getByRole("link", { name: /talk to sales/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("mailto:hello@reveren.ai"));
  });
});

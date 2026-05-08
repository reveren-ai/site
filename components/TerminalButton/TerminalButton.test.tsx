import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import TerminalButton from "./TerminalButton";
import { INSTALL_COMMAND } from "@/lib/install";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("TerminalButton", () => {
  it("renders a CopyButton bound to the canonical install command", () => {
    renderWithTheme(<TerminalButton />);
    expect(screen.getByRole("button", { name: INSTALL_COMMAND })).toBeInTheDocument();
  });

  it("forwards the variant prop to CopyButton", () => {
    renderWithTheme(<TerminalButton variant="outlined" />);
    expect(screen.getByRole("button", { name: INSTALL_COMMAND })).toBeInTheDocument();
  });
});

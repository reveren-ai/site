import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import ProofPoint from "./ProofPoint";
import { proofStats } from "@/lib/stats";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("ProofPoint", () => {
  it("renders every stat value + label", () => {
    renderWithTheme(<ProofPoint />);
    for (const s of proofStats) {
      expect(screen.getByText(s.value)).toBeInTheDocument();
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
  });

  it("renders hints for stats that have them", () => {
    renderWithTheme(<ProofPoint />);
    for (const s of proofStats) {
      if (s.hint) {
        expect(screen.getByText(s.hint)).toBeInTheDocument();
      }
    }
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import FAQ from "./FAQ";
import { faq } from "@/lib/faq";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("FAQ", () => {
  it("renders one details element per FAQ item", () => {
    const { container } = renderWithTheme(<FAQ />);
    const detailsEls = container.querySelectorAll("details");
    expect(detailsEls).toHaveLength(faq.length);
  });

  it("renders each FAQ question and answer", () => {
    renderWithTheme(<FAQ />);
    for (const item of faq) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });
});

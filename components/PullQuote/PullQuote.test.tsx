import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import PullQuote from "./PullQuote";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("PullQuote", () => {
  it("renders children inside a blockquote within a figure", () => {
    renderWithTheme(<PullQuote>This is a quote.</PullQuote>);
    const quote = screen.getByText("This is a quote.");
    expect(quote.tagName.toLowerCase()).toBe("blockquote");
    expect(quote.closest("figure")).not.toBeNull();
  });
});

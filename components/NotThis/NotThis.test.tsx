import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import NotThis from "./NotThis";
import { notThis } from "@/lib/notThis";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("NotThis", () => {
  it("renders every counter-positioning rule", () => {
    renderWithTheme(<NotThis />);
    for (const item of notThis) {
      expect(screen.getByRole("heading", { level: 3, name: item.rule })).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });
});

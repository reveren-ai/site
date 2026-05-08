import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Cell from "./Cell";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Cell", () => {
  it("renders a check icon when value=true", () => {
    renderWithTheme(<Cell value={true} />);
    expect(screen.getByLabelText("Included")).toBeInTheDocument();
  });

  it("renders a remove icon when value=false", () => {
    renderWithTheme(<Cell value={false} />);
    expect(screen.getByLabelText("Not included")).toBeInTheDocument();
  });

  it("renders a string value verbatim", () => {
    renderWithTheme(<Cell value="$0.015 / run" />);
    expect(screen.getByText("$0.015 / run")).toBeInTheDocument();
  });

  it("renders a numeric value verbatim", () => {
    renderWithTheme(<Cell value={2000} />);
    expect(screen.getByText("2000")).toBeInTheDocument();
  });
});

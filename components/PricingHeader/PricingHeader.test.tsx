import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import PricingHeader from "./PricingHeader";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("PricingHeader", () => {
  it("renders the H1 + the free-core, no-metering disclaimer", () => {
    renderWithTheme(<PricingHeader />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Free core");
    expect(screen.getByText(/free forever, with unlimited local use and no metering/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Prose from "./Prose";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Prose", () => {
  it("wraps children in an article element", () => {
    renderWithTheme(
      <Prose>
        <p>Hello, world.</p>
      </Prose>
    );
    const article = screen.getByText("Hello, world.").closest("article");
    expect(article).not.toBeNull();
  });

  it("renders nested headings + lists verbatim", () => {
    renderWithTheme(
      <Prose>
        <h2>Section</h2>
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </Prose>
    );
    expect(screen.getByRole("heading", { level: 2, name: "Section" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

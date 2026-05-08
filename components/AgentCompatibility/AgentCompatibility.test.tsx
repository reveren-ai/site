import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import AgentCompatibility from "./AgentCompatibility";
import { supportedAgents } from "@/lib/agents";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("AgentCompatibility", () => {
  it("renders every supported agent label", () => {
    renderWithTheme(<AgentCompatibility />);
    for (const a of supportedAgents) {
      expect(screen.getByText(a.label)).toBeInTheDocument();
    }
  });

  it("flags beta agents with a Beta chip", () => {
    renderWithTheme(<AgentCompatibility />);
    const betaCount = supportedAgents.filter((a) => a.status === "beta").length;
    expect(screen.getAllByText("Beta")).toHaveLength(betaCount);
  });

  it("renders the eyebrow and headline copy", () => {
    renderWithTheme(<AgentCompatibility />);
    expect(screen.getByText(/agent-agnostic/i)).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("FounderBio (no photo)", () => {
  it("renders the brand monogram placeholder when photoUrl is null", async () => {
    vi.resetModules();
    vi.doMock("@/lib/founder", () => ({
      founder: {
        eyebrow: "Built by",
        name: "Innocent Muisha",
        role: "Founder, reveren",
        quote: "I built reveren because I was tired of correcting the agent.",
        photoUrl: null as string | null,
      },
    }));
    const { default: FounderBio } = await import("./FounderBio");

    const { container } = renderWithTheme(<FounderBio />);

    expect(screen.getByText(/Innocent Muisha/i)).toBeInTheDocument();
    expect(screen.getByText(/Founder, reveren/i)).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByLabelText(/reveren mark/i)).toBeInTheDocument();
    vi.doUnmock("@/lib/founder");
  });
});

describe("FounderBio (with photo)", () => {
  it("renders an <img> when photoUrl is provided", async () => {
    vi.resetModules();
    vi.doMock("@/lib/founder", () => ({
      founder: {
        eyebrow: "Built by",
        name: "Innocent Muisha",
        role: "Founder, reveren",
        quote: "Q",
        photoUrl: "/founder/innocent.jpg",
      },
    }));
    const { default: FounderBio } = await import("./FounderBio");

    renderWithTheme(<FounderBio />);

    const img = screen.getByRole("img", { name: /Innocent Muisha — Founder, reveren/i });
    expect(img).toHaveAttribute("src", "/founder/innocent.jpg");
    vi.doUnmock("@/lib/founder");
  });
});

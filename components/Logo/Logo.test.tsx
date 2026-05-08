import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Mark from "./Mark";
import Wordmark from "./Wordmark";

describe("Mark", () => {
  it("renders an SVG with the default aria-label", () => {
    render(<Mark />);
    const svg = screen.getByRole("img", { name: "reveren mark" });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("respects size and ariaLabel overrides", () => {
    render(<Mark size={64} ariaLabel="custom label" />);
    const svg = screen.getByRole("img", { name: "custom label" });
    expect(svg).toHaveAttribute("width", "64");
  });
});

describe("Wordmark", () => {
  it("renders an SVG with computed width from default height", () => {
    render(<Wordmark />);
    const svg = screen.getByRole("img", { name: "reveren" });
    expect(svg).toHaveAttribute("height", "28");
    // 28 * 380/80 = 133
    expect(svg).toHaveAttribute("width", "133");
  });

  it("respects custom height + ariaLabel", () => {
    render(<Wordmark height={56} ariaLabel="reveren home" />);
    const svg = screen.getByRole("img", { name: "reveren home" });
    expect(svg).toHaveAttribute("height", "56");
  });

  it("uses currentColor by default and an explicit fill when monochrome=false", () => {
    const { rerender } = render(<Wordmark />);
    const svg = screen.getByRole("img");
    expect(svg.innerHTML).toContain("currentColor");

    rerender(<Wordmark monochrome={false} />);
    const svg2 = screen.getByRole("img");
    expect(svg2.innerHTML).toContain("#1A1916");
  });
});

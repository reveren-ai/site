import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Terminal from "./Terminal";
import { frames } from "./Terminal.frames";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

type MQ = MediaQueryList & {
  setMatches?: (next: boolean) => void;
};

function installMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  const mq: MQ = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: (_type: string, cb: (e: MediaQueryListEvent) => void) =>
      listeners.add(cb),
    removeEventListener: (_type: string, cb: (e: MediaQueryListEvent) => void) =>
      listeners.delete(cb),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  } as unknown as MQ;

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockReturnValue(mq),
  });
  return mq;
}

describe("Terminal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders the terminal with an aria-label and the prompt path", () => {
    installMatchMedia(false);
    renderWithTheme(<Terminal />);
    expect(screen.getByRole("img", { name: /Terminal:/ })).toBeInTheDocument();
    expect(screen.getByText("~ / your-repo")).toBeInTheDocument();
  });

  it("renders every defined frame line", () => {
    installMatchMedia(false);
    const { container } = renderWithTheme(<Terminal />);
    const text = container.textContent ?? "";
    for (const f of frames) {
      expect(text).toContain(f.text);
    }
  });

  it("clears the loop interval immediately under prefers-reduced-motion", () => {
    installMatchMedia(true);
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");
    renderWithTheme(<Terminal />);
    // The first render sets up the interval before the matchMedia effect
    // flips reducedMotion to true. After the flip we expect the cleanup
    // path to have torn it down again.
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it("starts the loop when motion is allowed", () => {
    installMatchMedia(false);
    const setIntervalSpy = vi.spyOn(global, "setInterval");
    renderWithTheme(<Terminal />);
    expect(setIntervalSpy).toHaveBeenCalled();
  });
});

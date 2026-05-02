import { describe, it, expect } from "vitest";
import theme from "./theme";
import { tokens } from "./tokens";

// MUI's CSS-variables theme stashes the colour schemes on the runtime object
// even though the public Theme type doesn't expose them. Reading via a typed
// shim keeps the test honest without resorting to `any`.
type SchemeShape = { palette: { primary: { main: string; contrastText: string } } };
type CssVarsThemeShape = {
  colorSchemes?: { light?: SchemeShape; dark?: SchemeShape };
};

const cssVarsTheme = theme as unknown as CssVarsThemeShape;

describe("theme", () => {
  it("exports both light and dark colour schemes", () => {
    expect(cssVarsTheme.colorSchemes?.light).toBeDefined();
    expect(cssVarsTheme.colorSchemes?.dark).toBeDefined();
  });

  it("uses the Iron accent as primary in light mode", () => {
    const primary = cssVarsTheme.colorSchemes?.light?.palette.primary;
    expect(primary?.main).toBe(tokens.light.accent);
    expect(primary?.contrastText).toBe(tokens.light.accentInk);
  });

  it("uses the Iron-light accent as primary in dark mode", () => {
    const primary = cssVarsTheme.colorSchemes?.dark?.palette.primary;
    expect(primary?.main).toBe(tokens.dark.accent);
    expect(primary?.contrastText).toBe(tokens.dark.accentInk);
  });

  it("emits CSS variables for spacing (proof cssVariables is on)", () => {
    expect(theme.spacing(1)).toContain("8px");
    expect(theme.spacing(1)).toContain("var(");
  });

  it("disables button text-transform (no SHOUTING)", () => {
    expect(theme.typography.button?.textTransform).toBe("none");
  });
});

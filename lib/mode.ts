// Runs inline in <head> before React hydration. Sets data-mode on <html>
// so MUI's CSS-variable color schemes resolve to the correct palette on
// the first paint, with no FOUC. Keep this small and dependency-free.
//
// Strategy: localStorage("rv-mode") wins over OS preference. Default fallback
// is "light" to match HANDOFF.md §2 (light is the default surface).

export const MODE_STORAGE_KEY = "rv-mode";

// Light is the brand default per HANDOFF.md §2 — we don't follow OS preference
// out of the gate. Users opt into dark via the toggle (the choice is persisted
// to localStorage and survives reloads).

export const modeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${MODE_STORAGE_KEY}");
    var mode = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.setAttribute("data-mode", mode);
  } catch (e) {
    document.documentElement.setAttribute("data-mode", "light");
  }
})();
`.trim();

export type Mode = "light" | "dark";

export function readMode(): Mode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "light";
}

export function writeMode(mode: Mode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  document.documentElement.setAttribute("data-mode", mode);
}

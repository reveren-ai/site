import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  MODE_STORAGE_KEY,
  modeInitScript,
  readMode,
  writeMode,
} from "./mode";

describe("mode storage key + init script", () => {
  it("uses the canonical 'rv-mode' key everywhere", () => {
    expect(MODE_STORAGE_KEY).toBe("rv-mode");
    expect(modeInitScript).toContain("rv-mode");
  });

  it("init script defaults to light when nothing is stored", () => {
    expect(modeInitScript).toContain('"light"');
    expect(modeInitScript).toContain("data-mode");
  });
});

describe("readMode / writeMode", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-mode");
  });

  it("returns 'light' when storage is empty", () => {
    expect(readMode()).toBe("light");
  });

  it("round-trips dark via writeMode", () => {
    writeMode("dark");
    expect(readMode()).toBe("dark");
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
  });

  it("round-trips light via writeMode", () => {
    writeMode("dark");
    writeMode("light");
    expect(readMode()).toBe("light");
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });

  it("treats malformed stored values as light", () => {
    window.localStorage.setItem(MODE_STORAGE_KEY, "midnight");
    expect(readMode()).toBe("light");
  });
});

describe("readMode / writeMode in SSR (no window)", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      writable: true,
      value: originalWindow,
    });
  });

  it("returns the light default and is a no-op when window is undefined", () => {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    expect(readMode()).toBe("light");
    // writeMode should bail out without throwing.
    expect(() => writeMode("dark")).not.toThrow();
  });
});

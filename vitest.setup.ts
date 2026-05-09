import { expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// jsdom does not implement matchMedia. Most components only call it to detect
// prefers-reduced-motion; default to "no preference" so animations stay on
// and the reduced-motion branch is exercised explicitly via per-test stubs.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

// jsdom also lacks IntersectionObserver. `motion/react`'s whileInView triggers
// observe() on mount, so a no-op stub is enough to let render() return without
// throwing. The viewport callback is never fired in tests — we only assert on
// the eventual rendered DOM, not on entrance animations.
if (typeof window !== "undefined" && typeof window.IntersectionObserver === "undefined") {
  class StubIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = () => undefined;
    unobserve = () => undefined;
    disconnect = () => undefined;
    takeRecords = () => [];
  }
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: StubIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: StubIntersectionObserver,
  });
}

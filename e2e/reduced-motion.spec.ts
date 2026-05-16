import { test, expect } from "@playwright/test";

/**
 * Reduced-motion smoke — every route must render cleanly when the user
 * has `prefers-reduced-motion: reduce`.
 *
 * Catches hydration mismatches caused by `useReducedMotion()` returning
 * `null` during SSR but the actual preference on the client. The fix
 * pattern is to keep the rendered DOM shape stable across modes and
 * gate only the `transition.duration` (or equivalent animation prop)
 * on the reduced flag.
 *
 * @see /Users/innocentmuisha/Software/mrktable/components/PageTransition/index.tsx
 *      for the reference fix that motivates this regression test.
 */

const ROUTES = [
  "/",
  "/manifesto",
  "/pricing",
  "/privacy",
  "/security",
  "/terms",
  "/dpa",
  "/pods",
  "/coming-soon",
] as const;

test.use({ reducedMotion: "reduce" });

test.describe("reduced-motion smoke", () => {
  for (const route of ROUTES) {
    test(`${route} renders without hydration or console errors under prefers-reduced-motion: reduce`, async ({
      page,
    }) => {
      const pageErrors: Error[] = [];
      const consoleErrors: string[] = [];

      page.on("pageerror", (err) => pageErrors.push(err));
      page.on("console", (msg) => {
        if (msg.type() !== "error") return;
        const text = msg.text();
        // Filter pre-existing infra noise that's unrelated to motion:
        // CSP violations on third-party stylesheets, Lighthouse-only
        // warnings, etc. Add specific filters here if they become
        // load-bearing — keep the list short and explain each.
        if (text.includes("Content Security Policy")) return;
        // PostHog logs AbortError on its in-flight retry queue when the
        // page navigates mid-test. We disable PostHog under WebDriver in
        // instrumentation-client.ts, but keep the filter as defence-in-
        // depth so an init-order regression can't quietly fail this suite.
        if (text.includes("PostHog.js") && text.includes("AbortError")) return;
        consoleErrors.push(text);
      });

      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.ok(), `${route} should return a 2xx`).toBe(true);

      // Give React a tick to surface any post-mount hydration warnings.
      await page.waitForTimeout(300);

      expect(pageErrors, `pageerror[s] on ${route} under reduced motion`).toEqual([]);
      expect(consoleErrors, `console.error[s] on ${route} under reduced motion`).toEqual([]);
    });
  }
});

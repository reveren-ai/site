import { test, expect } from "@playwright/test";

/**
 * Motion-on smoke — every route must render cleanly with motion enabled.
 *
 * Catches runtime errors thrown inside `motion/react` consumers
 * (e.g. `MotionDrawLine`, `StatAnimations`, `MotionPrimitives`) on
 * first paint. Pairs with `reduced-motion.spec.ts` to lock the matrix:
 * both motion modes must produce a clean console on every public route.
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

test.use({ reducedMotion: "no-preference" });

test.describe("motion-on smoke", () => {
  for (const route of ROUTES) {
    test(`${route} renders without page or console errors with motion enabled`, async ({
      page,
    }) => {
      const pageErrors: Error[] = [];
      const consoleErrors: string[] = [];

      page.on("pageerror", (err) => pageErrors.push(err));
      page.on("console", (msg) => {
        if (msg.type() !== "error") return;
        const text = msg.text();
        if (text.includes("Content Security Policy")) return;
        // PostHog AbortError on navigation mid-test — disabled under
        // WebDriver in instrumentation-client.ts; filter as defence-in-
        // depth. See reduced-motion.spec.ts for the canonical comment.
        if (text.includes("PostHog.js") && text.includes("AbortError")) return;
        consoleErrors.push(text);
      });

      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.ok(), `${route} should return a 2xx`).toBe(true);

      await page.waitForTimeout(300);

      expect(pageErrors, `pageerror[s] on ${route} with motion enabled`).toEqual([]);
      expect(consoleErrors, `console.error[s] on ${route} with motion enabled`).toEqual([]);
    });
  }
});

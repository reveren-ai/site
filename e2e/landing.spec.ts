import { test, expect } from "@playwright/test";

test.describe("landing page", () => {
  test("renders headline + sub-headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "One pipeline. Every agent.",
    );
    await expect(page.getByText("Stop correcting your AI. Start directing it.")).toBeVisible();
  });

  test("hero CTA copies the install command", async ({ page, browserName, context }) => {
    test.skip(browserName === "webkit", "clipboard permission UX differs on WebKit");

    await context.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});

    await page.goto("/");

    // Scope to the hero section. After click, the button's accessible name
    // flips from the install command to "Copied", so we assert by looking
    // for the new label inside the same section rather than re-resolving
    // the install-command locator.
    const hero = page.locator("section").first();
    const cta = hero.getByRole("button", { name: /npx @reveren-ai\/core init/i });
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(hero.getByRole("button", { name: /copied/i })).toBeVisible();
  });

  test("nav offers Pricing and Manifesto links that resolve", async ({ page }) => {
    await page.goto("/");

    // The first navigation to a route triggers a cold Turbopack compile that
    // can exceed the default 5s assertion timeout — clicking and immediately
    // asserting toHaveURL flakes. So assert the link target first (cheap), then
    // navigate with a generous waitForURL budget and confirm the destination
    // actually rendered (h1 visible), not just that the URL string changed.
    const NAV_TIMEOUT = 30_000;

    const pricing = page.getByRole("link", { name: "Pricing" }).first();
    await expect(pricing).toHaveAttribute("href", "/pricing");
    await Promise.all([
      page.waitForURL(/\/pricing$/, { timeout: NAV_TIMEOUT }),
      pricing.click(),
    ]);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goBack();
    await page.waitForURL((url) => url.pathname === "/", { timeout: NAV_TIMEOUT });

    const manifesto = page.getByRole("link", { name: "Manifesto" }).first();
    await expect(manifesto).toHaveAttribute("href", "/manifesto");
    await Promise.all([
      page.waitForURL(/\/manifesto$/, { timeout: NAV_TIMEOUT }),
      manifesto.click(),
    ]);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("sections render in the canonical IA order", async ({ page }) => {
    await page.goto("/");
    const expected = [
      "One pipeline. Every agent.",                             // Hero
      "What ships, when.",                                       // FeatureTeaser
      "Three audiences, one operating manual.",                 // AudienceCards
      "Four primitives. Composable in any order.",              // Solution
      "Works with whichever agent you already pay for.",        // AgentCompatibility
      "mrktable runs on its own protocols.",                    // ProofPoint
      "Six things we deliberately don't do.",                   // NotThis
      "Single-file rules vs. a real standards layer.",          // Comparison
      "Free core. Two paid surfaces.",                           // PricingTeaser
      "The .protocols/ format is yours.",                       // OpenFormat
      "Innocent Muisha",                                         // FounderBio
    ];
    const positions: number[] = [];
    for (const text of expected) {
      const locator = page.getByText(text).first();
      await expect(locator).toBeVisible();
      const box = await locator.boundingBox();
      positions.push(box?.y ?? -1);
    }
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1]);
    }
  });
});

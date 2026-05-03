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
    await page.getByRole("link", { name: "Pricing" }).first().click();
    await expect(page).toHaveURL(/\/pricing$/);
    await page.goBack();
    await page.getByRole("link", { name: "Manifesto" }).first().click();
    await expect(page).toHaveURL(/\/manifesto$/);
  });

  test("renders sections in HANDOFF.md §5.2 order", async ({ page }) => {
    await page.goto("/");
    const expected = [
      "One pipeline. Every agent.",                             // Hero
      "Three failure modes every team hits at scale.",          // Problem
      "Four primitives. Composable in any order.",              // Solution
      "Works with whichever agent you already pay for.",        // AgentCompatibility
      "mrktable runs on its own playbooks.",                    // ProofPoint
      "Round numbers. No .99.",                                  // PricingTeaser
      "The .playbooks/ format is yours.",                       // OpenFormat
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

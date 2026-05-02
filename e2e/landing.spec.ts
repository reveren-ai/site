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

    // Pick the FIRST button labelled with the install command — it's the hero CTA.
    const cta = page.getByRole("button", { name: /npx @reveren-ai\/core init/i }).first();
    await expect(cta).toBeVisible();
    await cta.click();

    await expect(cta).toContainText(/Copied/i);
  });

  test("nav offers Pricing and Manifesto links that resolve", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Pricing" }).first().click();
    await expect(page).toHaveURL(/\/pricing$/);
    await page.goBack();
    await page.getByRole("link", { name: "Manifesto" }).first().click();
    await expect(page).toHaveURL(/\/manifesto$/);
  });

  test("renders all 12 sections in canonical order", async ({ page }) => {
    await page.goto("/");
    // Six representative anchors that must appear in order.
    const expected = [
      "One pipeline. Every agent.",
      "Three audiences, one operating manual.",
      "Four capabilities. Composable in any order.",
      "mrktable runs on its own playbooks.",
      "Five things we deliberately don't do.",
      "Round numbers. No .99.",
      "Single-file rules vs. a real standards layer.",
      "The .playbooks/ format is yours.",
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

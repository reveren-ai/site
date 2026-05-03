import { test, expect } from "@playwright/test";

test.describe("mode toggle", () => {
  test("flips data-mode and persists across reload", async ({ page }) => {
    await page.goto("/");

    // Wait for the inline mode-init script to seed data-mode AND for the
    // ModeToggle to hydrate so its onClick is wired up.
    await page.waitForFunction(() => {
      const el = document.documentElement;
      return el.dataset.mode === "light" || el.dataset.mode === "dark";
    });

    const initial = await page.evaluate(() => document.documentElement.dataset.mode);

    // Scope to the desktop nav (the first button matching is in the sticky
    // header). Use force in case any ancestor has pointer-events animations.
    const toggle = page
      .locator("header")
      .getByRole("button", { name: /switch to (dark|light) mode/i })
      .first();
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect
      .poll(
        () => page.evaluate(() => document.documentElement.dataset.mode),
        { timeout: 5000 },
      )
      .not.toBe(initial);

    const next = await page.evaluate(() => document.documentElement.dataset.mode);

    await page.reload();
    await page.waitForFunction(() => {
      const el = document.documentElement;
      return el.dataset.mode === "light" || el.dataset.mode === "dark";
    });

    const persisted = await page.evaluate(() => document.documentElement.dataset.mode);
    expect(persisted).toBe(next);
  });
});

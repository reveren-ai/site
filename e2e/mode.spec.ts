import { test, expect } from "@playwright/test";

test.describe("mode toggle", () => {
  test("flips data-mode and persists across reload", async ({ page }) => {
    await page.goto("/");

    const initial = await page.evaluate(() => document.documentElement.dataset.mode);

    const toggle = page.getByRole("button", { name: /switch to (dark|light) mode/i }).first();
    await toggle.click();

    const next = await page.evaluate(() => document.documentElement.dataset.mode);
    expect(next).not.toBe(initial);

    await page.reload();
    const persisted = await page.evaluate(() => document.documentElement.dataset.mode);
    expect(persisted).toBe(next);
  });
});

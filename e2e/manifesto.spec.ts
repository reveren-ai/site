import { test, expect } from "@playwright/test";

test.describe("manifesto page", () => {
  test("renders title, intro, and at least one section heading", async ({ page }) => {
    await page.goto("/manifesto");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/operating manual/i).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  });

  test("closing CTA copies the install command", async ({ page, browserName, context }) => {
    test.skip(browserName === "webkit", "clipboard permission UX differs on WebKit");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});

    await page.goto("/manifesto");
    const cta = page.getByRole("button", { name: /npx @reveren-ai\/core init/i }).last();
    await cta.scrollIntoViewIfNeeded();
    await cta.click();
    await expect(cta).toContainText(/Copied/i);
  });
});

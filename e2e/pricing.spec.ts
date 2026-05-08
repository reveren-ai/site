import { test, expect } from "@playwright/test";

test.describe("pricing page", () => {
  test("renders all four tiers", async ({ page }) => {
    await page.goto("/pricing");
    for (const label of ["Free", "Pro", "Team", "Enterprise"]) {
      await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });

  test("uses round dollar amounts (no .99)", async ({ page }) => {
    await page.goto("/pricing");
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\$\d+\.99/);
    expect(text).toContain("$19");
    expect(text).toContain("$39");
  });

  test("matrix renders the six row groups in order", async ({ page }) => {
    await page.goto("/pricing");
    const groups = ["Pipeline", "Marketplace", "Protocols", "Agents", "Cloud", "Support"];
    const table = page.getByRole("table", { name: /pricing feature matrix/i });
    await expect(table).toBeVisible();
    const positions: number[] = [];
    for (const g of groups) {
      // Group header rows render as a single cell that exactly equals the
      // group label — match by exact text scoped to cells to avoid bleed
      // from row labels that contain the same word (e.g. "Cloud pipeline runs").
      const cell = table.getByRole("cell", { name: g, exact: true }).first();
      await expect(cell).toBeVisible();
      const box = await cell.boundingBox();
      positions.push(box?.y ?? -1);
    }
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1]);
    }
  });

  test("FAQ items expand on click", async ({ page }) => {
    await page.goto("/pricing");
    const summary = page.getByText(/Why not just use/i);
    await summary.scrollIntoViewIfNeeded();
    await summary.click();
    await expect(page.getByText(/vendor-specific single files/i)).toBeVisible();
  });
});

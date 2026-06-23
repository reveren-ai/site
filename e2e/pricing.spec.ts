import { test, expect } from "@playwright/test";

test.describe("pricing page", () => {
  test("renders all three surfaces", async ({ page }) => {
    await page.goto("/pricing");
    for (const label of ["Free", "Pro", "Marketplace"]) {
      await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });

  test("free is genuinely free, Pro is the one real paid price", async ({ page }) => {
    await page.goto("/pricing");
    const text = await page.locator("body").innerText();
    // Free is $0; Pro is the single real paid tier at $12. No fabricated prices.
    expect(text).toContain("$0");
    expect(text).toContain("$12");
    expect(text).not.toMatch(/\$\d+\.99/);
    // Guard against legacy mrktable pricing copy creeping back in.
    expect(text).not.toContain("$19");
    expect(text).not.toContain("$39");
    // Marketplace is pre-launch, not priced.
    expect(text).toContain("Coming soon");
  });

  test("matrix renders the three row groups in order", async ({ page }) => {
    await page.goto("/pricing");
    const groups = ["CLI & protocols", "Pro", "Marketplace"];
    const table = page.getByRole("table", { name: /pricing feature matrix/i });
    await expect(table).toBeVisible();
    const positions: number[] = [];
    for (const g of groups) {
      // Group header rows render as a single cell that exactly equals the
      // group label — match by exact text scoped to cells to avoid bleed
      // from row labels that contain the same word.
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

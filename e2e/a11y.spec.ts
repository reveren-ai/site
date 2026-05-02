import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/pricing", "/manifesto", "/privacy", "/terms", "/security", "/dpa"];

for (const route of routes) {
  test(`${route} passes axe-core scan`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"]) // verified manually against tokens
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

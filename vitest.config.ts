import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(root, "."),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [resolve(root, "vitest.setup.ts")],
    exclude: ["node_modules", "e2e", ".next"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html", "json-summary"],
      reportsDirectory: "./coverage",
      include: [
        "components/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
        "app/**/*.{ts,tsx}",
        "theme/**/*.{ts,tsx}",
      ],
      exclude: [
        "node_modules/**",
        ".next/**",
        "e2e/**",
        "coverage/**",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "app/**/layout.tsx",
        "app/**/page.tsx",
        "app/**/loading.tsx",
        "app/**/not-found.tsx",
        "app/**/error.tsx",
        "app/**/template.tsx",
        "app/**/sitemap.ts",
        "app/**/robots.ts",
        "app/**/opengraph-image.tsx",
        "app/**/icon.tsx",
        "components/Terminal/Terminal.frames.ts",
        "theme/ThemeRegistry.tsx",
      ],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});

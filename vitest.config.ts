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
  },
});

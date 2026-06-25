import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import useServerOnlyAsyncExports from "./eslint-rules/use-server-only-async-exports.mjs";

// Local rules — guards for failure modes CI/typecheck miss.
const localPlugin = {
  rules: { "use-server-only-async-exports": useServerOnlyAsyncExports },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { local: localPlugin },
    rules: {
      // A module-level `'use server'` file may only export async functions;
      // non-function exports break across the RSC boundary at render time.
      // See .protocols/plan-engineering.protocol.md.
      "local/use-server-only-async-exports": "error",
      // Marketing copy uses contractions and quoted phrases freely; HTML
      // entities for every apostrophe is noise without a real benefit.
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;

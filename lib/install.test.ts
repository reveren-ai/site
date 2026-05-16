import { describe, it, expect } from "vitest";
import { INSTALL_COMMAND, NPM_PACKAGE, GITHUB_REPO } from "./install";

describe("install constants", () => {
  it("uses the canonical npm scope, not the defensive one", () => {
    expect(INSTALL_COMMAND).toBe("npx @reveren-ai/core init");
    expect(NPM_PACKAGE).toBe("@reveren-ai/core");
  });

  it("uses `npx @reveren-ai/core init` for first install, not `rvr init`", () => {
    // After install, the typed binary is `rvr` — but the bootstrap step is
    // always the npm-style `npx @reveren-ai/core init` so users can run it
    // without first installing the package globally. Keep these distinct so
    // copy stays consistent across the site.
    expect(INSTALL_COMMAND).not.toMatch(/\brvr\b/);
  });

  it("points GitHub at the canonical repo", () => {
    expect(GITHUB_REPO).toBe("reveren-ai/core");
  });
});

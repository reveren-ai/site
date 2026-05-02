import { describe, it, expect } from "vitest";
import { INSTALL_COMMAND, NPM_PACKAGE, GITHUB_REPO } from "./install";

describe("install constants", () => {
  it("uses the canonical npm scope, not the defensive one", () => {
    expect(INSTALL_COMMAND).toBe("npx @reveren-ai/core init");
    expect(NPM_PACKAGE).toBe("@reveren-ai/core");
  });

  it("does not mention the deprecated rvr binary", () => {
    expect(INSTALL_COMMAND).not.toMatch(/\brvr\b/);
  });

  it("points GitHub at the canonical repo", () => {
    expect(GITHUB_REPO).toBe("reveren-ai/core");
  });
});

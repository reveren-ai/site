import { describe, it, expect } from "vitest";
import { manifesto } from "./copy";
import { INSTALL_COMMAND } from "@/lib/install";

describe("manifesto copy", () => {
  it("ships title, author, date and a substantive intro", () => {
    expect(manifesto.title.length).toBeGreaterThan(20);
    expect(manifesto.author).toBe("Innocent Muisha");
    expect(manifesto.date).toMatch(/2026/);
    expect(manifesto.intro.length).toBeGreaterThan(200);
  });

  it("renders every section with a heading and at least one paragraph", () => {
    expect(manifesto.sections.length).toBeGreaterThanOrEqual(5);
    for (const s of manifesto.sections) {
      expect(s.heading.length).toBeGreaterThan(2);
      expect(s.body.length).toBeGreaterThan(0);
      for (const p of s.body) {
        expect(p.length).toBeGreaterThan(20);
      }
    }
  });

  it("interpolates the canonical install command into the closing section", () => {
    const allBody = manifesto.sections.flatMap((s) => s.body).join("\n");
    expect(allBody).toContain(INSTALL_COMMAND);
  });

  it("ships at least one pull quote", () => {
    expect(manifesto.pullQuotes.length).toBeGreaterThan(0);
  });
});

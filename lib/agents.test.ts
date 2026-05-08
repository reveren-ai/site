import { describe, it, expect } from "vitest";
import { supportedAgents, agentsIntro } from "./agents";

describe("supportedAgents", () => {
  it("includes the four primary agents we ship as supported", () => {
    const supported = supportedAgents.filter((a) => a.status === "supported");
    const ids = supported.map((a) => a.id);
    expect(ids).toEqual(expect.arrayContaining(["claude", "cursor", "copilot", "windsurf"]));
  });

  it("only uses known status values", () => {
    const allowed = new Set(["supported", "beta", "planned"]);
    for (const a of supportedAgents) {
      expect(allowed.has(a.status)).toBe(true);
    }
  });

  it("uses unique ids and human labels", () => {
    const ids = supportedAgents.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of supportedAgents) {
      expect(a.label).toMatch(/^[A-Za-z0-9 ]+$/);
    }
  });
});

describe("agentsIntro", () => {
  it("frames the section as agent-agnostic", () => {
    expect(agentsIntro.eyebrow).toMatch(/agnostic/i);
    expect(agentsIntro.headline).toMatch(/agent/i);
    expect(agentsIntro.body.length).toBeGreaterThan(20);
  });
});

import { describe, it, expect } from "vitest";
import { founder } from "./founder";

describe("founder bio", () => {
  it("names the founder and role explicitly", () => {
    expect(founder.name).toBe("Innocent Muisha");
    expect(founder.role).toMatch(/reveren/i);
  });

  it("ships a non-trivial founder quote", () => {
    expect(founder.quote.length).toBeGreaterThan(60);
  });

  it("leaves photoUrl null until owner provides one", () => {
    // Owner-provided per HANDOFF.md §10. Until the photo lands, the bio
    // component falls back to the brand monogram.
    expect(founder.photoUrl).toBeNull();
  });
});

import { describe, it, expect } from "vitest";
import { metadata } from "./page";

describe("manifesto page metadata", () => {
  // Locks the SEO-vs-UX tradeoff from the 2026-05-16 audit (M5):
  // The page's <title> stays short ("Manifesto" → "Manifesto · reveren" via
  // layout template, ~20 chars) so the SERP renders cleanly. The long-form
  // pull-quote ("The agent doesn't need a smarter model. It needs an
  // operating manual.") lives in openGraph.title only, where there's no
  // length cap and the rhetorical turn is the social-share conversion hook.
  //
  // A future "fix" that pushes the pull-quote into metadata.title would
  // clip in the SERP. Don't.
  it("keeps the rendered <title> short ('Manifesto'), not the pull-quote", () => {
    expect(metadata.title).toBe("Manifesto");
  });

  it("uses the long-form pull-quote only on openGraph (where length is unlimited)", () => {
    const og = metadata.openGraph as { title?: string };
    expect(og.title).toContain("The agent doesn't need a smarter model");
    expect(og.title).toContain("operating manual");
  });
});

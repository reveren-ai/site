import { describe, it, expect } from "vitest";
import {
  dur,
  durFast,
  durSlow,
  ease,
  revealVariants,
  reducedVariants,
  staggerParent,
} from "./animations";
import { motion as motionTokens } from "@/theme/tokens";

describe("animation tokens", () => {
  it("exposes dur/durFast/durSlow as the token values converted to seconds", () => {
    expect(dur).toBeCloseTo(motionTokens.dur / 1000);
    expect(durFast).toBeCloseTo(motionTokens.durFast / 1000);
    expect(durSlow).toBeCloseTo(motionTokens.durSlow / 1000);
  });

  it("exposes the canonical ease curve", () => {
    expect(ease).toEqual([0.22, 1, 0.36, 1]);
  });
});

describe("revealVariants", () => {
  it("hides with opacity 0 and y=10", () => {
    expect(revealVariants.hidden).toMatchObject({ opacity: 0, y: 10 });
  });

  it("settles to opacity 1 and y=0", () => {
    expect(revealVariants.visible).toMatchObject({ opacity: 1, y: 0 });
  });
});

describe("reducedVariants", () => {
  it("renders the final state immediately for prefers-reduced-motion", () => {
    expect(reducedVariants.hidden).toMatchObject({ opacity: 1, y: 0 });
    expect(reducedVariants.visible).toMatchObject({ opacity: 1, y: 0 });
  });
});

describe("staggerParent()", () => {
  it("returns the default stagger and delay", () => {
    const v = staggerParent();
    expect(v.visible.transition).toEqual({ staggerChildren: 0.07, delayChildren: 0 });
  });

  it("returns custom stagger and delay when passed", () => {
    const v = staggerParent(0.09, 0.12);
    expect(v.visible.transition).toEqual({ staggerChildren: 0.09, delayChildren: 0.12 });
  });

  it("emits an empty hidden state so children animate independently", () => {
    expect(staggerParent().hidden).toEqual({});
  });
});

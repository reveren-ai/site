// Animation tokens and variant primitives. RSC-safe — does NOT import from
// `motion/react` so server components can reference these constants without
// pulling client code into the server bundle. The `motion/react` import lives
// only in components/motion/MotionPrimitives.tsx.

import { motion as motionTokens } from "@/theme/tokens";

// Convert ms tokens to seconds (motion uses seconds for `transition.duration`).
export const dur = motionTokens.dur / 1000; // 0.22
export const durFast = motionTokens.durFast / 1000; // 0.14
export const durSlow = motionTokens.durSlow / 1000; // 0.48

// Cubic-bezier curve mirroring tokens.motion.ease.
export const ease = [0.22, 1, 0.36, 1] as const;

// Standard reveal: fade + 10px rise. The default for both inline children
// (when consumed via MotionItem) and one-shot reveals (MotionReveal).
export const revealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: dur, ease } },
};

// prefers-reduced-motion fallback. Visible-from-zero, no transform, no
// transition — effectively renders the final state immediately.
export const reducedVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

// Parent variant that staggers its children. Returns a fresh object each call
// so call-sites can tweak stagger without sharing references.
export const staggerParent = (stagger = 0.07, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Identity stagger for reduced-motion mode — children still consume the
// "visible" variant, but with zero stagger and zero delay.
export const reducedStaggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

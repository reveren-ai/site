"use client";

// Count-up + battery-gauge primitives for ProofPoint stats.
// Both are one-shot on viewport entry, respect prefers-reduced-motion,
// and stay inside the Iron palette (primary.main fill, divider track).

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { animate, useInView, useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { dur, ease, durSlow } from "@/lib/animations";

type StatNumberProps = {
  value: string;
  duration?: number;
};

// Parses "1100+" → { target: 1100, suffix: "+" }, "95%+" → { 95, "%+" },
// "12" → { 12, "" }. If the string doesn't start with digits, returns null
// and the component renders the raw value as a fallback.
function parseStat(value: string): { target: number; suffix: string } | null {
  const m = value.match(/^([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  if (!m) return null;
  const target = parseFloat(m[1].replace(",", ""));
  if (Number.isNaN(target)) return null;
  return { target, suffix: m[2] };
}

export function StatNumber({ value, duration = 0.9 }: StatNumberProps) {
  const parsed = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  // Start at target so SSR, no-JS, screen readers, search engines, and
  // jsdom-based tests all see the real value. The animation kicks on
  // viewport entry: animate() drives `n` from 0 → target via its onUpdate
  // callback (which is the only setState call here — synchronous setState
  // inside an effect body trips React 19's react-hooks/set-state-in-effect
  // rule, so the "has animated" guard uses a ref, not state).
  const [n, setN] = useState<number>(parsed?.target ?? 0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!parsed || reduced || hasAnimatedRef.current) return;
    if (!inView) return;
    hasAnimatedRef.current = true;
    const controls = animate(0, parsed.target, {
      duration,
      ease,
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, reduced, duration, parsed]);

  if (!parsed) return <>{value}</>;

  const isInteger = Number.isInteger(parsed.target);
  const display = isInteger ? Math.round(n).toString() : n.toFixed(1);

  return (
    <span ref={ref} aria-label={value}>
      {display}
      {parsed.suffix}
    </span>
  );
}

type StatBatteryProps = {
  // Percent the bar fills to, e.g. 95 for "95%+".
  percent: number;
  // Optional sx for layout (mt/width/maxWidth overrides).
  sx?: React.ComponentProps<typeof Box>["sx"];
};

// Battery-style fill bar. Fills from 0 to `percent` over durSlow on viewport
// entry. Reduced motion = pre-filled at percent. The "+" semantics in stats
// like "95%+" are preserved by NOT filling to 100% — leaving headroom is the
// communication.
export function StatBattery({ percent, sx }: StatBatteryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const target = `${Math.min(Math.max(percent, 0), 100)}%`;

  return (
    <Box
      ref={ref}
      role="presentation"
      sx={{
        height: 6,
        width: "100%",
        maxWidth: 140,
        bgcolor: "divider",
        borderRadius: 999,
        overflow: "hidden",
        mt: 1.25,
        ...sx,
      }}
    >
      <motion.div
        initial={{ width: reduced ? target : "0%" }}
        animate={{ width: inView || reduced ? target : "0%" }}
        transition={{
          duration: reduced ? 0 : durSlow,
          ease,
          delay: reduced ? 0 : dur,
        }}
        style={{
          height: "100%",
          background: "var(--mui-palette-primary-main)",
          borderRadius: 999,
        }}
      />
    </Box>
  );
}

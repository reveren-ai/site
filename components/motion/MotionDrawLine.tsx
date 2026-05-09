"use client";

// Horizontal accent line that draws from 0 → full width on viewport entry.
// CSS-only width transition driven by IntersectionObserver — kept zero-runtime
// motion to honour the "motion communicates, not decorates" policy. Reduced
// motion = pre-drawn at full width.

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type MotionDrawLineProps = {
  /** Line thickness in pixels. Default 1. */
  thickness?: number;
  /** Animation duration in ms. Defaults to motion token durSlow. */
  duration?: number;
  /** Delay in ms before draw begins. Default 0. */
  delay?: number;
  /** Token for the line colour. Default "primary.main". */
  color?: "primary.main" | "divider" | "text.primary" | "text.secondary";
  /** Origin of the draw: "left" | "right" | "center". Default "left". */
  origin?: "left" | "right" | "center";
  sx?: SxProps<Theme>;
};

export default function MotionDrawLine({
  thickness = 1,
  duration = 480,
  delay = 0,
  color = "primary.main",
  origin = "left",
  sx,
}: MotionDrawLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-10% 0px", threshold: 0.01 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduced]);

  const transformOrigin =
    origin === "right" ? "right center" : origin === "center" ? "center center" : "left center";

  return (
    <Box
      ref={ref}
      role="presentation"
      aria-hidden
      sx={{
        position: "relative",
        height: thickness,
        width: "100%",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: color,
          transformOrigin,
          transform: drawn ? "scaleX(1)" : "scaleX(0)",
          transition: reduced
            ? "none"
            : `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        }}
      />
    </Box>
  );
}

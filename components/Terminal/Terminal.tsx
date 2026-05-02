"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { fonts } from "@/theme/tokens";
import { frames, LOOP_DURATION_MS, LOOP_RESET_PAUSE_MS } from "./Terminal.frames";

// Animated terminal demo. CSS-only fades; no per-character typing.
// Honours prefers-reduced-motion: falls back to the fully-revealed final frame.

export default function Terminal() {
  const [tick, setTick] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setTick((n) => n + 1);
    }, LOOP_DURATION_MS + LOOP_RESET_PAUSE_MS);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <Box
      role="img"
      aria-label="Terminal: npx @reveren-ai/core init writes a .playbooks/ directory and prepares your repo for agent runs."
      sx={(t) => ({
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        background:
          t.palette.mode === "dark" ? "rgba(20,19,18,0.85)" : "rgba(22,20,18,0.97)",
        boxShadow: t.palette.mode === "dark"
          ? "0 24px 60px -24px rgba(0,0,0,0.7), 0 6px 16px rgba(0,0,0,0.4)"
          : "0 24px 60px -24px rgba(22,20,18,0.22), 0 6px 16px rgba(22,20,18,0.06)",
      })}
    >
      {/* Title bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.25,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(255,255,255,0.04)",
        }}
        aria-hidden
      >
        {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
          <Box
            key={c}
            sx={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: c,
              opacity: 0.85,
            }}
          />
        ))}
        <Box
          sx={{
            ml: 1.5,
            fontFamily: fonts.mono,
            fontSize: 11,
            color: "rgba(242,236,230,0.55)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          ~ / your-repo
        </Box>
      </Box>

      {/* Body */}
      <Box
        component="pre"
        key={tick}
        sx={{
          margin: 0,
          padding: 3,
          fontFamily: fonts.mono,
          fontSize: 13,
          lineHeight: 1.7,
          color: "#F2ECE6",
          minHeight: 320,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {frames.map((f, i) => (
          <Box
            component="span"
            key={`${tick}-${i}`}
            sx={{
              display: "block",
              opacity: reducedMotion ? 1 : 0,
              animation: reducedMotion
                ? "none"
                : `rvFadeIn 220ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
              animationDelay: reducedMotion ? "0ms" : `${f.delay}ms`,
              color:
                f.className === "input"
                  ? "#F2ECE6"
                  : f.className === "info"
                  ? "#C9D1DC"
                  : f.className === "success"
                  ? "#74B58C"
                  : f.className === "warn"
                  ? "#D8A24A"
                  : "rgba(242,236,230,0.65)",
            }}
          >
            {f.prompt ? (
              <Box
                component="span"
                aria-hidden
                sx={{ color: "rgba(201,209,220,0.65)", marginRight: 1 }}
              >
                {f.prompt}
              </Box>
            ) : null}
            {f.text}
          </Box>
        ))}

        <Box
          component="span"
          aria-hidden
          sx={{
            display: "inline-block",
            width: 8,
            height: 16,
            verticalAlign: "-3px",
            backgroundColor: "#C9D1DC",
            marginLeft: 1,
            animation: reducedMotion
              ? "none"
              : "rvBlink 1s steps(2, end) infinite",
          }}
        />

        <style>{`
          @keyframes rvFadeIn {
            to { opacity: 1; }
          }
          @keyframes rvBlink {
            50% { opacity: 0; }
          }
        `}</style>
      </Box>
    </Box>
  );
}

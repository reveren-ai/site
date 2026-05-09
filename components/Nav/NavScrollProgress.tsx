"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

// 1px hairline at the bottom of the sticky nav. Width tracks scroll progress
// through the document. Honours prefers-reduced-motion: snaps to 0 when the
// user is at the top, snaps to 100 when scrolled to the bottom — no easing.
//
// Implementation: rAF-throttled scroll listener writes a CSS variable on the
// element. Avoids React re-renders entirely — the only frame work per scroll
// event is setting one inline style property.

export default function NavScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      rafRef.current = null;
      const node = ref.current;
      if (!node) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      node.style.setProperty("--rv-nav-progress", `${(ratio * 100).toFixed(2)}%`);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <Box ref={ref} className="rv-nav-progress" aria-hidden />;
}

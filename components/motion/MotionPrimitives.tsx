"use client";

// Client-only wrappers around `motion/react`. These are the only files in the
// project that import from `motion/react` — server components compose them
// without crossing the RSC boundary themselves.

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import type { SxProps, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";
import {
  dur as defaultDur,
  ease,
  revealVariants,
  reducedVariants,
  staggerParent,
  reducedStaggerParent,
} from "@/lib/animations";

type MotionAs = "div" | "section" | "ul" | "li" | "article";

type CommonProps = {
  children: React.ReactNode;
  as?: MotionAs;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
};

// Pick the right motion primitive for our narrow `as` set. Keeping this
// closed-form rather than fully polymorphic — React 19 generic component
// types make polymorphic typing painful for an internal helper.
function pickMotion(as: MotionAs) {
  switch (as) {
    case "section":
      return motion.section;
    case "ul":
      return motion.ul;
    case "li":
      return motion.li;
    case "article":
      return motion.article;
    case "div":
    default:
      return motion.div;
  }
}

export type MotionRevealProps = CommonProps & {
  delay?: number;
  /** Pixel offset for the entrance translate. Default 10. */
  y?: number;
  /** Override animation duration in seconds. Defaults to motion token `dur`. */
  duration?: number;
  /** "inview" triggers on scroll, "initial" plays on mount. */
  mode?: "inview" | "initial";
  /** Only relevant when mode="inview". Default true. */
  once?: boolean;
  /** Only relevant when mode="inview". IntersectionObserver rootMargin. */
  margin?: string;
  /** Forwarded to the underlying motion element for accessibility hooks. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean;
  role?: string;
};

/**
 * Single-element entrance. Use `mode="initial"` for above-the-fold (Hero) and
 * `mode="inview"` for everything below the fold.
 */
export function MotionReveal({
  children,
  as = "div",
  className,
  id,
  style,
  sx,
  delay = 0,
  y = 10,
  duration,
  mode = "inview",
  once = true,
  margin = "-10% 0px",
  ...rest
}: MotionRevealProps) {
  const prefersReduced = useReducedMotion();
  const Component = pickMotion(as);

  const variants = React.useMemo(() => {
    if (prefersReduced) {
      return reducedVariants;
    }
    return {
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration ?? defaultDur,
          ease,
          delay,
        },
      },
    };
  }, [prefersReduced, y, duration, delay]);

  const animateProps =
    mode === "initial"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once, margin },
        };

  return (
    <Box
      component={Component}
      // Cast through unknown — Box's component prop typing is intersected
      // with HTMLElementProps and our motion variant props don't match the
      // intrinsic element types. The runtime contract is correct.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ variants, ...animateProps } as any)}
      className={className}
      id={id}
      style={style}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
}

export type MotionStaggerProps = CommonProps & {
  /** Seconds between each child's entrance. Default 0.07. */
  stagger?: number;
  /** Initial delay before the first child enters. Default 0. */
  delay?: number;
  mode?: "inview" | "initial";
  once?: boolean;
  margin?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Parent that orchestrates child stagger via shared variants. Children must
 * be `<MotionItem>` (or another `motion.*` element consuming `revealVariants`).
 */
export function MotionStagger({
  children,
  as = "div",
  className,
  id,
  style,
  sx,
  stagger = 0.07,
  delay = 0,
  mode = "inview",
  once = true,
  margin = "-10% 0px",
  ...rest
}: MotionStaggerProps) {
  const prefersReduced = useReducedMotion();
  const Component = pickMotion(as);

  const variants = prefersReduced ? reducedStaggerParent : staggerParent(stagger, delay);

  const animateProps =
    mode === "initial"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once, margin },
        };

  return (
    <Box
      component={Component}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ variants, ...animateProps } as any)}
      className={className}
      id={id}
      style={style}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
}

export type MotionItemProps = CommonProps & {
  /** Override the entrance translate distance for this item only. */
  y?: number;
  role?: string;
  "aria-label"?: string;
};

/**
 * Child of `<MotionStagger>`. Consumes the parent's variants via the shared
 * "hidden"/"visible" keys. Override `y` to skip the translate (e.g. for stat
 * grids where opacity-only is calmer).
 */
export function MotionItem({
  children,
  as = "div",
  className,
  id,
  style,
  sx,
  y,
  ...rest
}: MotionItemProps) {
  const prefersReduced = useReducedMotion();
  const Component = pickMotion(as);

  const variants = React.useMemo(() => {
    if (prefersReduced) return reducedVariants;
    if (typeof y === "number") {
      return {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: defaultDur, ease } },
      };
    }
    return revealVariants;
  }, [prefersReduced, y]);

  return (
    <Box
      component={Component}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ variants } as any)}
      className={className}
      id={id}
      style={style}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
}

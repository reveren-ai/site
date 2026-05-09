type MarkProps = {
  size?: number;
  ariaLabel?: string;
  /** Opt out of the on-mount stack-build animation (e.g. for static contexts). */
  animated?: boolean;
};

// Stacked-bars symbol in currentColor. Tints to match surrounding text.
// Bars stack-build on first paint via keyframes in globals.css. Per-bar
// target opacities (0.42 / 0.7 / 1.0) are encoded as CSS variables on the
// classes — keeping the SVG itself unstyled so server rendering matches.
export default function Mark({
  size = 32,
  ariaLabel = "reveren mark",
  animated = true,
}: MarkProps) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={{ display: "block" }}
    >
      <rect
        x="4"
        y="7"
        width="24"
        height="3"
        rx="1.5"
        fill="currentColor"
        className={animated ? "rv-mark-bar rv-mark-bar--1" : undefined}
        opacity={animated ? undefined : 0.42}
      />
      <rect
        x="6"
        y="14"
        width="20"
        height="3"
        rx="1.5"
        fill="currentColor"
        className={animated ? "rv-mark-bar rv-mark-bar--2" : undefined}
        opacity={animated ? undefined : 0.7}
      />
      <rect
        x="9"
        y="21"
        width="14"
        height="3"
        rx="1.5"
        fill="currentColor"
        className={animated ? "rv-mark-bar rv-mark-bar--3" : undefined}
      />
    </svg>
  );
}

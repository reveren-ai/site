import { fonts } from "@/theme/tokens";

type WordmarkProps = {
  height?: number;
  ariaLabel?: string;
  monochrome?: boolean;
  /** Opt out of the on-mount entrance animation. Default true. */
  animated?: boolean;
};

// Inline SVG so it inherits currentColor — lets the wordmark match the active
// text colour in both light and dark modes without swapping assets. The bars
// stack-build and the serif word eases in after; both honour reduced motion
// via globals.css. The scale(1.75) lives on a wrapping <g> so the bars'
// CSS keyframe transform doesn't fight a per-bar `transform` attribute.
export default function Wordmark({
  height = 28,
  ariaLabel = "reveren",
  monochrome = true,
  animated = true,
}: WordmarkProps) {
  const aspect = 380 / 80;
  const width = Math.round(height * aspect);
  const fill = monochrome ? "currentColor" : "#1A1916";

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={width}
      height={height}
      viewBox="0 0 380 80"
      fill="none"
      style={{ display: "block" }}
    >
      <g transform="translate(23 12)">
        <g transform="scale(1.75)">
          <rect
            x="4"
            y="7"
            width="24"
            height="3"
            rx="1.5"
            fill={fill}
            className={animated ? "rv-mark-bar rv-mark-bar--1" : undefined}
            opacity={animated ? undefined : 0.42}
          />
          <rect
            x="6"
            y="14"
            width="20"
            height="3"
            rx="1.5"
            fill={fill}
            className={animated ? "rv-mark-bar rv-mark-bar--2" : undefined}
            opacity={animated ? undefined : 0.7}
          />
          <rect
            x="9"
            y="21"
            width="14"
            height="3"
            rx="1.5"
            fill={fill}
            className={animated ? "rv-mark-bar rv-mark-bar--3" : undefined}
          />
        </g>
      </g>
      <text
        x="97"
        y="61.76"
        fontFamily={fonts.serif}
        fontWeight={400}
        fontSize="64"
        letterSpacing="-0.015em"
        fill={fill}
        className={animated ? "rv-wordmark-word" : undefined}
      >
        reveren
      </text>
    </svg>
  );
}

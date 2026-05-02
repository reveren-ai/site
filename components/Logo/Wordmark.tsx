import { fonts } from "@/theme/tokens";

type WordmarkProps = {
  height?: number;
  ariaLabel?: string;
  monochrome?: boolean;
};

// Inline SVG so it inherits currentColor — lets the wordmark match the active
// text colour in both light and dark modes without swapping assets.
export default function Wordmark({
  height = 28,
  ariaLabel = "reveren",
  monochrome = true,
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
        <rect x="4" y="7" width="24" height="3" rx="1.5" fill={fill} opacity="0.42" transform="scale(1.75)" />
        <rect x="6" y="14" width="20" height="3" rx="1.5" fill={fill} opacity="0.7" transform="scale(1.75)" />
        <rect x="9" y="21" width="14" height="3" rx="1.5" fill={fill} transform="scale(1.75)" />
      </g>
      <text
        x="97"
        y="61.76"
        fontFamily={fonts.serif}
        fontWeight={400}
        fontSize="64"
        letterSpacing="-0.015em"
        fill={fill}
      >
        reveren
      </text>
    </svg>
  );
}

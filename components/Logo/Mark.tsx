type MarkProps = {
  size?: number;
  ariaLabel?: string;
};

// Stacked-bars symbol in currentColor. Tints to match surrounding text.
export default function Mark({ size = 32, ariaLabel = "reveren mark" }: MarkProps) {
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
      <rect x="4" y="7" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.42" />
      <rect x="6" y="14" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="9" y="21" width="14" height="3" rx="1.5" fill="currentColor" />
    </svg>
  );
}

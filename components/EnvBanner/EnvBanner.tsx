import type { ReactElement } from "react";
import { getAppEnv, ENV_BANNER_LABELS, ENV_BANNER_COLORS } from "@/lib/env";

/**
 * Visible stripe rendered on every non-production page. Makes "we shipped
 * noindex to prod" incidents impossible to miss on first page load — if a
 * preview / UAT deploy is mis-tagged, the stripe is the visible signal.
 *
 * Server component — reads env at request time, no JS to the client.
 */
export default function EnvBanner(): ReactElement | null {
  const env = getAppEnv();
  if (env === "production") return null;

  const label = ENV_BANNER_LABELS[env];
  const { bg, fg } = ENV_BANNER_COLORS[env];

  return (
    <div
      role="status"
      aria-label={`Environment: ${env}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        backgroundColor: bg,
        color: fg,
        textAlign: "center",
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace',
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "4px 12px",
        lineHeight: 1.4,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}

"use client";

import CopyButton from "@/components/CopyButton/CopyButton";
import { INSTALL_COMMAND } from "@/lib/install";

// Closing CTA reused across pages. Same canonical install command, same UX,
// always presented as the page's "peak" moment per UX plan §UX Principles.
export default function TerminalButton({
  variant = "contained",
}: {
  variant?: "contained" | "outlined" | "text";
}) {
  return <CopyButton text={INSTALL_COMMAND} variant={variant} size="large" />;
}

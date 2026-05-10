"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/CheckRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";
import { fonts } from "@/theme/tokens";

type CopyButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  text: string;
  label?: string;
  copiedLabel?: string;
  showIcon?: boolean;
};

export default function CopyButton({
  text,
  label,
  copiedLabel = "Copied",
  showIcon = true,
  variant = "contained",
  size = "large",
  ...rest
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    // Flip the label first so the user gets feedback even if the underlying
    // clipboard call hangs (headless browsers, missing permissions, etc.).
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);

    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        // execCommand may itself fail; the visible label already shows what
        // to type, so swallowing is fine.
      }
    };

    posthog.capture("install_command_copied", { command: text });

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      // Fire and forget — the user has already seen "Copied"; if the modern
      // API rejects, drop to the textarea path without blocking the UI.
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }
  }, [text]);

  const visibleLabel = label ?? text;

  return (
    <Button
      {...rest}
      variant={variant}
      size={size}
      onClick={handleClick}
      startIcon={
        showIcon ? (
          copied ? (
            <CheckIcon fontSize="small" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )
        ) : undefined
      }
      aria-live="polite"
      sx={{
        fontFamily: fonts.mono,
        fontSize: "0.875rem",
        letterSpacing: "0.02em",
        ...(rest.sx ?? {}),
      }}
    >
      {copied ? copiedLabel : visibleLabel}
    </Button>
  );
}

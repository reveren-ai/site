"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const handleClick = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail — user can still read the command in the visible label.
      setCopied(false);
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

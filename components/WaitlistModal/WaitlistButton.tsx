"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import WaitlistModal, { type WaitlistTier } from "./WaitlistModal";

type WaitlistButtonProps = Omit<ButtonProps, "onClick"> & {
  label?: string;
  /**
   * Forwarded to WaitlistModal — selects tier-aware title, body copy, and
   * submit payload. Defaults to "general" (the original CLI waitlist flow).
   */
  tier?: WaitlistTier;
};

export default function WaitlistButton({
  label = "Join waitlist",
  variant = "outlined",
  size = "medium",
  tier = "general",
  ...rest
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...rest} variant={variant} size={size} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <WaitlistModal open={open} onClose={() => setOpen(false)} tier={tier} />
    </>
  );
}

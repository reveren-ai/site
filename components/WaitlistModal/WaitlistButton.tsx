"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import WaitlistModal from "./WaitlistModal";

type WaitlistButtonProps = Omit<ButtonProps, "onClick"> & {
  label?: string;
};

export default function WaitlistButton({
  label = "Join waitlist",
  variant = "outlined",
  size = "medium",
  ...rest
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...rest} variant={variant} size={size} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

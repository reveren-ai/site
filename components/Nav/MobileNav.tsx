"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import WaitlistButton from "@/components/WaitlistModal/WaitlistButton";

type NavLink = { href: string; label: string; external?: boolean };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => { posthog.capture("mobile_nav_opened"); setOpen(true); }}
        sx={{
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 999,
          width: 36,
          height: 36,
        }}
      >
        <MenuIcon fontSize="small" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 360 }, px: 3, py: 2 } }}
      >
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 4 }}>
          <IconButton
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2.5} sx={{ flex: 1 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--mui-palette-text-primary)",
                paddingBlock: 8,
              }}
            >
              {l.label}
            </Link>
          ))}
        </Stack>

        <Box sx={{ mt: 4 }}>
          <WaitlistButton variant="contained" size="large" sx={{ width: "100%" }} />
        </Box>
      </Drawer>
    </>
  );
}

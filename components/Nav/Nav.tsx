import Link from "next/link";
import { Box, Stack } from "@mui/material";
import Wordmark from "@/components/Logo/Wordmark";
import ModeToggle from "@/components/ModeToggle/ModeToggle";
import WaitlistButton from "@/components/WaitlistModal/WaitlistButton";
import MobileNav from "./MobileNav";
import NavScrollProgress from "./NavScrollProgress";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "https://github.com/reveren-ai/core", label: "GitHub", external: true },
];

export default function Nav() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        backgroundColor: "color-mix(in srgb, var(--mui-palette-background-paper) 80%, transparent)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <NavScrollProgress />
      <Box className="rv-container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: 64 }}
        >
          <Link
            href="/"
            aria-label="reveren home"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Wordmark height={26} />
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.005em",
                  paddingBlock: 8,
                  color: "var(--mui-palette-text-primary)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <ModeToggle />
            <WaitlistButton />
          </Stack>

          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <ModeToggle />
            <WaitlistButton />
            <MobileNav links={links} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import Wordmark from "@/components/Logo/Wordmark";
import { GITHUB_URL, GITHUB_DISCUSSIONS_URL, GITHUB_SPEC_URL, NPM_URL } from "@/lib/install";

type Column = { heading: string; links: { href: string; label: string; external?: boolean }[] };

const columns: Column[] = [
  {
    heading: "Product",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: NPM_URL, label: "npm package", external: true },
      { href: GITHUB_URL, label: "GitHub", external: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/manifesto", label: "Manifesto" },
      { href: GITHUB_DISCUSSIONS_URL, label: "Discussions", external: true },
      { href: GITHUB_SPEC_URL, label: "Open spec", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "mailto:hello@reveren.ai", label: "Contact" },
      { href: "https://x.com/reverenai", label: "X (Twitter)", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/security", label: "Security" },
      { href: "/dpa", label: "DPA" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        mt: { xs: 8, md: 12 },
      }}
    >
      <Box className="rv-container" sx={{ py: { xs: 6, md: 9 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          justifyContent="space-between"
        >
          <Stack spacing={2} sx={{ maxWidth: 360 }}>
            <Wordmark height={28} />
            <Typography variant="body2" color="text.secondary">
              The standards layer between your codebase and whichever coding agent you already pay for.
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
              gap: { xs: 4, md: 6 },
              flex: 1,
              maxWidth: 720,
            }}
          >
            {columns.map((col) => (
              <Stack key={col.heading} spacing={1.5}>
                <Typography variant="eyebrow" component="div">
                  {col.heading}
                </Typography>
                <Stack spacing={1}>
                  {col.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      style={{
                        fontSize: 14,
                        color: "var(--mui-palette-text-primary)",
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {year} reveren · all rights reserved
          </Typography>
          <Typography variant="caption" color="text.secondary">
            reveren.ai
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

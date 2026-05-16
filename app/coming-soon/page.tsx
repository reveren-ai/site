import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Wordmark from "@/components/Logo/Wordmark";
import CopyButton from "@/components/CopyButton/CopyButton";
import WaitlistButton from "@/components/WaitlistModal/WaitlistButton";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationJsonLd } from "@/lib/jsonLd";
import { INSTALL_COMMAND } from "@/lib/install";

// Pre-launch holding page. Rendered at every URL on production while
// LAUNCH_MODE === "coming-soon" is set on Vercel (see middleware.ts).
// Canonical URL is collapsed to https://reveren.ai/ so search engines
// don't fragment authority across rewritten variants.
//
// Surface intent: brand + one-line proposition + dual CTA (waitlist for
// the curious, copy-install for engineers who want to try the CLI now).
// Deliberately minimal — every additional element is one more thing
// that could leak unfinished copy or signal "we're stalling".

export const metadata: Metadata = {
  title: "Coming soon",
  description:
    "reveren is the standards layer between your codebase and whichever AI coding agent you already pay for. Sign up to be notified when it's live.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "reveren — coming soon",
    description:
      "Stop correcting your AI. Start directing it. reveren is launching soon — sign up to be notified.",
  },
  twitter: {
    title: "reveren — coming soon",
    description: "Stop correcting your AI. Start directing it.",
  },
};

// Friendly labels for paths a Slack-pasted link might have originally
// targeted. Keep this list aligned with sitemap.ts post-launch routes — if
// a path isn't listed, the holding page falls back to the generic eyebrow.
const FROM_LABELS: Record<string, string> = {
  "/pricing": "the pricing page",
  "/manifesto": "the manifesto",
  "/pods": "the Pod Marketplace",
  "/security": "the security page",
  "/privacy": "the privacy page",
  "/terms": "the terms page",
  "/dpa": "the data-processing addendum",
};

function resolveFromLabel(from: string | string[] | undefined): string | null {
  const raw = Array.isArray(from) ? from[0] : from;
  if (!raw) return null;
  // Only accept site-relative paths to keep this safe from open-redirect-
  // style abuse via the visible eyebrow text.
  if (!raw.startsWith("/") || raw.includes("://")) return null;
  return FROM_LABELS[raw] ?? null;
}

interface ComingSoonPageProps {
  searchParams: Promise<{ from?: string | string[] }>;
}

export default async function ComingSoonPage({
  searchParams,
}: ComingSoonPageProps) {
  const params = await searchParams;
  const fromLabel = resolveFromLabel(params?.from);

  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <Box
        component="section"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "calc(100vh - 200px)", md: "calc(100vh - 240px)" },
          py: { xs: 8, md: 12 },
        }}
      >
        <Box className="rv-container" sx={{ textAlign: "center" }}>
          <Stack spacing={4} sx={{ alignItems: "center", maxWidth: 720, mx: "auto" }}>
            <Box sx={{ color: "text.primary" }}>
              <Wordmark height={56} />
            </Box>

            <Typography variant="eyebrow" component="div">
              {fromLabel
                ? `You came for ${fromLabel} — coming soon`
                : "Coming soon"}
            </Typography>

            <Typography
              variant="h1"
              component="h1"
              sx={{ maxWidth: 640, fontSize: { xs: "2.5rem", md: "4rem" } }}
            >
              One pipeline. Every agent.
            </Typography>

            <Typography
              variant="subtitle1"
              component="p"
              color="text.secondary"
              sx={{ maxWidth: 560, fontSize: { xs: "1.0625rem", md: "1.1875rem" } }}
            >
              reveren is the standards layer between your codebase and whichever
              AI coding agent you already pay for. Sign up to be notified when
              it's live.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 1 }}
            >
              <WaitlistButton
                variant="contained"
                size="large"
                tier="general"
                label="Join the waitlist"
              />
              <CopyButton
                text={INSTALL_COMMAND}
                variant="outlined"
                size="large"
              />
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ pt: 2 }}>
              MIT-licensed CLI · agent-agnostic · open file format
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

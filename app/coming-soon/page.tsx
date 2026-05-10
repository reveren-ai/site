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

export default function ComingSoonPage() {
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
              Coming soon
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

import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Legal
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Terms of service
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: May 2026 · Pre-launch placeholder
          </Typography>
        </Stack>

        <Prose>
          <p>
            Pre-launch, the only thing you can do here is browse the site and
            join the waitlist. By joining the waitlist you agree to receive
            exactly one email from us when the CLI is generally available, plus
            occasional product updates that you can unsubscribe from.
          </p>
          <p>
            The reveren CLI is MIT-licensed. The .playbooks/ format spec is
            CC-BY 4.0. The marketing site is © reveren — content reuse with
            attribution is welcome; lifting the layout wholesale is not.
          </p>
          <p>
            When billing launches, this page will expand to cover plans,
            cancellation, refunds, acceptable use, and the rest. Until then,
            email <a href="mailto:hello@reveren.ai">hello@reveren.ai</a> with
            anything you want clarified.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

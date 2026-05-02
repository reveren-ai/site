import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Legal
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Privacy policy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: May 2026 · Pre-launch placeholder
          </Typography>
        </Stack>

        <Prose>
          <p>
            We're a small, pre-launch company. We don't run analytics, we don't
            set tracking cookies, and we don't ship pixels from third parties.
            The only data we collect today is the email address you give us when
            you join the waitlist, and we use it for one thing: to email you
            once when the public CLI ships.
          </p>
          <p>
            When the dashboard product launches, this page will expand to cover
            authentication, account data, billing, and subprocessors. Until
            then, what you see is what we have.
          </p>
          <p>
            Questions: <a href="mailto:hello@reveren.ai">hello@reveren.ai</a>.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

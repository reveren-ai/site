import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";

export const metadata: Metadata = {
  title: "Security",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Security posture
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Security
          </Typography>
        </Stack>

        <Prose>
          <p>
            <strong>Bring your own keys.</strong> The reveren CLI runs locally on your
            machine. Your model API keys (Claude, OpenAI, GitHub Copilot) stay in
            your environment and never round-trip through us.
          </p>

          <h2>Today, pre-launch</h2>
          <p>
            We don't yet operate any production infrastructure beyond this
            marketing site. There is no dashboard, no database, no auth surface.
            The waitlist endpoint validates an email address and returns 200; it
            doesn't persist anything yet.
          </p>

          <h2>At launch (Phase 1)</h2>
          <p>
            The hosted dashboard ships with TLS everywhere, encrypted at rest
            (Postgres on Neon), Auth.js for OAuth (GitHub + Google), per-row
            tenant isolation. SOC2 Type II is in progress; expect a Trust Center
            page replacing this one when reports are available.
          </p>

          <h2>Reporting a vulnerability</h2>
          <p>
            Email <a href="mailto:security@reveren.ai">security@reveren.ai</a>.
            Please do not file public issues for security findings; we'll
            acknowledge within 72 hours and credit responsible disclosure on
            this page once a fix has shipped.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

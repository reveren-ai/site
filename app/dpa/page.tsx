import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";

export const metadata: Metadata = {
  title: "DPA",
  alternates: { canonical: "/dpa" },
};

export default function DPAPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Legal
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Data Processing Agreement
          </Typography>
        </Stack>

        <Prose>
          <p>
            A draft DPA is available on request for teams evaluating reveren for
            regulated environments. Email{" "}
            <a href="mailto:hello@reveren.ai?subject=DPA%20request">
              hello@reveren.ai
            </a>{" "}
            with the company name and use case, and we'll send the current
            draft.
          </p>
          <p>
            A signed DPA will be available as a self-serve download once the
            hosted dashboard launches and SOC2 Type II is complete.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import posthog from "posthog-js";
import CopyButton from "@/components/CopyButton/CopyButton";
import { INSTALL_COMMAND } from "@/lib/install";
import { MotionReveal } from "@/components/motion/MotionPrimitives";

export default function CtaBand() {
  return (
    <Box component="section" className="rv-section" sx={{ bgcolor: "background.default" }}>
      <Box className="rv-container">
        <MotionReveal>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 760,
            mx: "auto",
            textAlign: "center",
            p: { xs: 4, md: 6 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="eyebrow" component="div">
            Ready to try it
          </Typography>
          <Typography variant="h2" component="h2">
            Sixty seconds. One command.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            No credit card. No signup. The CLI scaffolds .protocols/ in your repo and
            wires the agent you're already using.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <CopyButton text={INSTALL_COMMAND} variant="contained" size="large" />
            <Button
              component="a"
              href="mailto:hello@reveren.ai?subject=Pricing%20question"
              variant="outlined"
              size="large"
              onClick={() => posthog.capture("cta_talk_to_sales_clicked")}
            >
              Talk to sales
            </Button>
          </Stack>
        </Stack>
        </MotionReveal>
      </Box>
    </Box>
  );
}

"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import posthog from "posthog-js";
import { fonts } from "@/theme/tokens";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import { durSlow } from "@/lib/animations";

export default function ManifestoTeaser() {
  return (
    <Box
      component="section"
      className="rv-section"
      sx={{ bgcolor: "background.default" }}
    >
      <Box className="rv-container">
        <MotionReveal y={14} duration={durSlow}>
          <Stack spacing={4} sx={{ maxWidth: 880, mx: "auto", textAlign: "center" }}>
            <Typography variant="eyebrow" component="div">
              Manifesto
            </Typography>
            <Typography
              component="blockquote"
              sx={{
                fontFamily: fonts.serif,
                fontSize: { xs: "1.875rem", md: "2.75rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                fontWeight: 400,
                color: "text.primary",
                m: 0,
              }}
            >
              "The agent doesn't need a smarter model. It needs an operating manual."
            </Typography>
            <Box>
              <Button
                component="a"
                href="/manifesto"
                variant="text"
                size="large"
                onClick={() => posthog.capture("manifesto_cta_clicked", { source: "manifesto_teaser" })}
                sx={{
                  // Underline-offset transition only — no boxShadow on links
                  // (RSC hydration trap). textDecoration handled inline.
                  textUnderlineOffset: "1px",
                  transition:
                    "text-underline-offset 140ms cubic-bezier(0.22,1,0.36,1), color 140ms cubic-bezier(0.22,1,0.36,1)",
                  "&:hover": {
                    textUnderlineOffset: "3px",
                  },
                }}
              >
                Read the manifesto →
              </Button>
            </Box>
          </Stack>
        </MotionReveal>
      </Box>
    </Box>
  );
}

"use client";

import { Box, Stack, Typography } from "@mui/material";
import posthog from "posthog-js";
import { faq } from "@/lib/faq";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";

// Uses native <details> / <summary> so it degrades gracefully without JS,
// styled to match the rest of the system (no MUI Accordion needed for this).
export default function FAQ() {
  return (
    <Box component="section" className="rv-section">
      <Box className="rv-container">
        <MotionReveal>
          <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
            <Typography variant="eyebrow" component="div">
              FAQ
            </Typography>
            <Typography variant="h2" component="h2">
              Questions worth answering.
            </Typography>
          </Stack>
        </MotionReveal>

        <MotionStagger
          stagger={0.05}
          sx={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            "& > div:not(:last-child) > details": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {faq.map((item) => (
            <MotionItem key={item.id} y={0}>
            <Box
              component="details"
              sx={{
                "& > summary": {
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 3,
                  py: 2.75,
                  fontSize: { xs: "1.0625rem", md: "1.125rem" },
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "text.primary",
                },
                "& > summary::-webkit-details-marker": { display: "none" },
                "& > summary::after": {
                  content: '"+"',
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  color: "text.secondary",
                  transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                },
                "&[open] > summary::after": {
                  content: '"−"',
                },
                "& > p": {
                  pb: 3,
                  pr: 6,
                  m: 0,
                  color: "text.secondary",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                },
              }}
            >
              <Box
                component="summary"
                onClick={(e) => {
                  const details = (e.currentTarget as HTMLElement).closest("details") as HTMLDetailsElement | null;
                  if (!details?.open) {
                    posthog.capture("faq_question_expanded", { question: item.question, question_id: item.id });
                  }
                }}
              >{item.question}</Box>
              <p>{item.answer}</p>
            </Box>
            </MotionItem>
          ))}
        </MotionStagger>
      </Box>
    </Box>
  );
}

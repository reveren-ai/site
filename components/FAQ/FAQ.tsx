"use client";

import { Box, Stack, Typography } from "@mui/material";
import { faq } from "@/lib/faq";

// Uses native <details> / <summary> so it degrades gracefully without JS,
// styled to match the rest of the system (no MUI Accordion needed for this).
export default function FAQ() {
  return (
    <Box component="section" className="rv-section">
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            FAQ
          </Typography>
          <Typography variant="h2" component="h2">
            Questions worth answering.
          </Typography>
        </Stack>

        <Stack
          divider={<Box aria-hidden sx={{ height: 1, bgcolor: "divider" }} />}
          sx={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {faq.map((item) => (
            <Box
              key={item.id}
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
              <Box component="summary">{item.question}</Box>
              <p>{item.answer}</p>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import { MotionReveal } from "@/components/motion/MotionPrimitives";

export default function PricingHeader() {
  return (
    <Box component="section" className="rv-section--tight" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box className="rv-container">
        <MotionReveal mode="initial">
          <Stack spacing={3} sx={{ maxWidth: 800 }}>
            <Typography variant="eyebrow" component="div">
              Pricing
            </Typography>
            <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}>
              Round numbers. No tricks.
            </Typography>
            <Typography variant="subtitle1" component="p" color="text.secondary">
              All prices in USD, billed monthly. Local <code>rvr run</code> is unlimited
              and free on every tier. Cloud runs apply only when you use the hosted
              orchestrator (analytics, registry, GitHub App, MCP write).
            </Typography>
          </Stack>
        </MotionReveal>
      </Box>
    </Box>
  );
}

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
              Free core. No tricks.
            </Typography>
            <Typography variant="subtitle1" component="p" color="text.secondary">
              The <code>rvr</code> CLI, the full protocol library, and every
              agent at its baseline are free forever, with unlimited local use
              and no metering. <strong>Pro</strong> ($12/mo) is the one paid
              tier (the maintained Engineering Pod plus the vibe-coder layer),
              and the Protocol Marketplace follows. Pro is pre-launch; join the
              waitlist below.
            </Typography>
          </Stack>
        </MotionReveal>
      </Box>
    </Box>
  );
}

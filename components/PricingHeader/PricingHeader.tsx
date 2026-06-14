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
              The <code>rvr</code> CLI and the full protocol library are free
              forever, with unlimited local use and no metering. The only paid
              surfaces are Pods and the Protocol Marketplace, both on a
              subscription whose pricing is still being finalised.
            </Typography>
          </Stack>
        </MotionReveal>
      </Box>
    </Box>
  );
}

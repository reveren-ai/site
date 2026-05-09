import { Box, Typography } from "@mui/material";
import { fonts } from "@/theme/tokens";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import { durSlow } from "@/lib/animations";

// Pull quote with a "serif drama" entrance: slower, longer rise, more weight
// on the moment. Border-left strip and italic serif do the visual work; the
// motion just earns it the reader's attention.
export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <MotionReveal y={16} duration={durSlow} as="div">
      <Box
        component="figure"
        sx={{
          m: 0,
          my: { xs: 5, md: 7 },
          py: { xs: 3, md: 4 },
          px: { xs: 0, md: 2 },
          borderLeft: "3px solid",
          borderColor: "primary.main",
          pl: { xs: 3, md: 4 },
        }}
      >
        <Typography
          component="blockquote"
          sx={{
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontSize: { xs: "1.5rem", md: "2rem" },
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: "text.primary",
            m: 0,
          }}
        >
          {children}
        </Typography>
      </Box>
    </MotionReveal>
  );
}

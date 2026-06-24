import { Box, Stack, Typography } from "@mui/material";
import { notThis } from "@/lib/notThis";
import { fonts } from "@/theme/tokens";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";
import MotionDrawLine from "@/components/motion/MotionDrawLine";

export default function NotThis() {
  return (
    <Box
      component="section"
      className="rv-section"
      sx={{ bgcolor: "background.default" }}
    >
      <Box className="rv-container">
        <MotionReveal>
          <Stack spacing={2} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 760 }}>
            <Typography variant="eyebrow" component="div">
              What reveren isn't
            </Typography>
            <Typography variant="h2" component="h2">
              Six things we deliberately don't do.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Counter-positioning matters more than feature lists. Here's where we draw lines, including the one that separates an open marketplace from a vendor-locked one.
            </Typography>
          </Stack>
        </MotionReveal>

        <MotionStagger
          stagger={0.07}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {notThis.map((n, i) => (
            <MotionItem
              key={n.id}
              sx={{
                py: { xs: 3.5, md: 4 },
                position: "relative",
              }}
            >
              {/* Top accent rule — draws left-to-right on entry. */}
              <MotionDrawLine
                duration={520}
                delay={i * 50}
                color="primary.main"
                sx={{ mb: { xs: 2.5, md: 3 }, opacity: 0.85 }}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "minmax(0, 1fr) minmax(0, 4fr) minmax(0, 8fr)",
                  },
                  gap: { xs: 1, md: 6 },
                  alignItems: "baseline",
                }}
              >
                <Typography
                  component="div"
                  aria-hidden
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} / 06
                </Typography>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ fontWeight: 600, fontSize: { xs: "1.125rem", md: "1.25rem" } }}
                >
                  {n.rule}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {n.body}
                </Typography>
              </Box>
            </MotionItem>
          ))}
        </MotionStagger>
      </Box>
    </Box>
  );
}

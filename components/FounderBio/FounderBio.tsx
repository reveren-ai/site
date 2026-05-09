import { Box, Stack, Typography } from "@mui/material";
import Mark from "@/components/Logo/Mark";
import { founder } from "@/lib/founder";
import { fonts } from "@/theme/tokens";
import { MotionReveal } from "@/components/motion/MotionPrimitives";

// Founder bio. When `founder.photoUrl` is provided, replaces the monogram
// placeholder with a real <Image>. Until then, we ship a tasteful brand
// monogram on a tinted accent surface — better than a default avatar SVG.

export default function FounderBio() {
  return (
    <Box component="section" className="rv-section" sx={{ bgcolor: "background.default" }}>
      <Box className="rv-container">
        <MotionReveal>
          <Box
            sx={{
              maxWidth: 880,
              mx: "auto",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 200px) minmax(0, 1fr)" },
              gap: { xs: 4, sm: 5 },
              alignItems: "start",
            }}
          >
            <Box>
              {founder.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={founder.photoUrl}
                  alt={`${founder.name} — ${founder.role}`}
                  width={160}
                  height={160}
                  style={{
                    width: "100%",
                    maxWidth: 160,
                    aspectRatio: "1 / 1",
                    borderRadius: 12,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <Box
                  aria-hidden
                  sx={{
                    width: "100%",
                    maxWidth: 160,
                    aspectRatio: "1 / 1",
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                  }}
                >
                  <Mark size={64} />
                </Box>
              )}
            </Box>

            <Stack spacing={3}>
              <Typography variant="eyebrow" component="div">
                {founder.eyebrow}
              </Typography>
              <Typography
                component="blockquote"
                sx={{
                  fontFamily: fonts.serif,
                  fontSize: { xs: "1.375rem", md: "1.625rem" },
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  color: "text.primary",
                  m: 0,
                  fontStyle: "italic",
                }}
              >
                "{founder.quote}"
              </Typography>
              <Stack spacing={0.25}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {founder.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {founder.role}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </MotionReveal>
      </Box>
    </Box>
  );
}

import { Box, Stack, Typography, Button } from "@mui/material";
import { fonts } from "@/theme/tokens";

export default function ManifestoTeaser() {
  return (
    <Box
      component="section"
      className="rv-section"
      sx={{ bgcolor: "background.default" }}
    >
      <Box className="rv-container">
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
            <Button component="a" href="/manifesto" variant="text" size="large">
              Read the manifesto →
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import { capabilities } from "@/lib/capabilities";

export default function CapabilityGrid() {
  return (
    <Box component="section" className="rv-section" sx={{ bgcolor: "background.default" }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            What reveren is
          </Typography>
          <Typography variant="h2" component="h2">
            Four capabilities. Composable in any order.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {capabilities.map((c, i) => (
            <Stack key={c.id} spacing={1.5} sx={{ position: "relative", pt: 3 }}>
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  bgcolor: "divider",
                }}
              />
              <Typography variant="caption" component="div" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography variant="h4" component="h3">
                {c.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import { proofStats, proofStory } from "@/lib/stats";

export default function ProofPoint() {
  return (
    <Box component="section" className="rv-section">
      <Box className="rv-container">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" },
            gap: { xs: 6, md: 10 },
            alignItems: "start",
          }}
        >
          <Stack spacing={2} sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
            <Typography variant="eyebrow" component="div">
              {proofStory.eyebrow}
            </Typography>
            <Typography variant="h2" component="h2">
              {proofStory.headline}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {proofStory.body}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: { xs: 0, sm: 0 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {proofStats.map((s, i) => (
              <Stack
                key={s.label}
                spacing={0.5}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRight: {
                    xs: i % 2 === 0 ? "1px solid" : "none",
                    sm:
                      (i + 1) % 3 !== 0 ? "1px solid" : "none",
                  },
                  borderBottom: {
                    xs: i < 4 ? "1px solid" : "none",
                    sm: i < 3 ? "1px solid" : "none",
                  },
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.label}
                </Typography>
                {s.hint ? (
                  <Typography variant="caption" color="text.disabled">
                    {s.hint}
                  </Typography>
                ) : null}
              </Stack>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

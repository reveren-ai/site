import { Box, Stack, Typography } from "@mui/material";
import { solution, solutionIntro } from "@/lib/solution";

export default function Solution() {
  return (
    <Box component="section" className="rv-section" sx={{ bgcolor: "background.default" }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            {solutionIntro.eyebrow}
          </Typography>
          <Typography variant="h2" component="h2">
            {solutionIntro.headline}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {solutionIntro.body}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {solution.map((s, i) => (
            <Stack key={s.id} spacing={1.5} sx={{ position: "relative", pt: 3 }}>
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
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ fontVariantNumeric: "tabular-nums" }}
              >
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography variant="h4" component="h3">
                {s.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {s.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

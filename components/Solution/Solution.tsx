import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { solution, solutionIntro } from "@/lib/solution";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";

export default function Solution() {
  return (
    <Box component="section" className="rv-section" sx={{ bgcolor: "background.default" }}>
      <Box className="rv-container">
        <MotionReveal>
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
        </MotionReveal>

        <MotionStagger
          stagger={0.06}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          {solution.map((s, i) => (
            <MotionItem key={s.id} sx={{ height: "100%" }}>
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
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
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </MotionStagger>
      </Box>
    </Box>
  );
}

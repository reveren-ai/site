import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { problems, problemIntro } from "@/lib/problem";

export default function Problem() {
  return (
    <Box component="section" className="rv-section--tight" sx={{ py: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 5, md: 7 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            {problemIntro.eyebrow}
          </Typography>
          <Typography variant="h2" component="h2">
            {problemIntro.headline}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {problemIntro.body}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {problems.map((p) => (
            <Card key={p.id} sx={{ p: 0.5, height: "100%" }}>
              <CardContent sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
                <Typography variant="eyebrow" component="div" sx={{ mb: 1.5 }}>
                  {p.label}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {p.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

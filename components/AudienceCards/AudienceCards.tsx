import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { audiences } from "@/lib/audiences";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";

export default function AudienceCards() {
  return (
    <Box component="section" className="rv-section--tight" sx={{ py: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <MotionReveal>
          <Stack spacing={2} sx={{ mb: { xs: 5, md: 7 }, maxWidth: 760 }}>
            <Typography variant="eyebrow" component="div">
              Who this is for
            </Typography>
            <Typography variant="h2" component="h2">
              Three audiences, one operating manual.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              reveren works the same way whether you're shipping production software in a
              team of fifty, building your fourth side project this quarter, or governing
              five engineering pods running three different agents.
            </Typography>
          </Stack>
        </MotionReveal>

        <MotionStagger
          stagger={0.08}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {audiences.map((a) => (
            <MotionItem key={a.id} sx={{ height: "100%" }}>
              <Card
                sx={{
                  p: 0.5,
                  height: "100%",
                  transition:
                    "transform 140ms cubic-bezier(0.22,1,0.36,1), box-shadow 140ms cubic-bezier(0.22,1,0.36,1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "var(--rv-shadow-pop)",
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Typography variant="eyebrow" component="div" sx={{ mb: 1.5 }}>
                    {a.label}
                  </Typography>
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {a.pain}
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

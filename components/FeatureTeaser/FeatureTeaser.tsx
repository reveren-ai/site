import { Box, Card, CardContent, Stack, Typography, Button } from "@mui/material";
import { featureTeaser, featureTeaserIntro } from "@/lib/featureTeaser";
import { fonts } from "@/theme/tokens";

export default function FeatureTeaser() {
  return (
    <Box component="section" className="rv-section--tight" sx={{ py: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 5, md: 7 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            {featureTeaserIntro.eyebrow}
          </Typography>
          <Typography variant="h2" component="h2">
            {featureTeaserIntro.headline}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {featureTeaserIntro.body}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {featureTeaser.map((card) => {
            const isAvailable = card.status === "available";
            return (
              <Card
                key={card.id}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  bgcolor: isAvailable ? "background.paper" : "background.default",
                  // Top accent stripe: iron accent for live, accentSoft for upcoming.
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    bgcolor: isAvailable
                      ? "primary.main"
                      : "var(--mui-palette-action-selected)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3.5,
                    pt: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                  }}
                >
                  <Typography
                    variant="eyebrow"
                    component="div"
                    sx={{
                      color: isAvailable ? "primary.main" : "text.secondary",
                    }}
                  >
                    {card.statusLabel}
                  </Typography>

                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: fonts.serif,
                      fontSize: { xs: "1.5rem", md: "1.625rem" },
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      color: "text.primary",
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.55 }}
                  >
                    {card.body}
                  </Typography>

                  <Stack
                    component="ul"
                    spacing={1}
                    sx={{ listStyle: "none", p: 0, m: 0, flex: 1 }}
                  >
                    {card.bullets.map((b) => (
                      <Typography
                        key={b}
                        component="li"
                        variant="body2"
                        sx={{
                          position: "relative",
                          pl: 2.5,
                          color: "text.secondary",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "0.65em",
                            width: 8,
                            height: 1.5,
                            backgroundColor: isAvailable
                              ? "primary.main"
                              : "text.disabled",
                          },
                        }}
                      >
                        {b}
                      </Typography>
                    ))}
                  </Stack>

                  <Button
                    component="a"
                    href={card.cta.href}
                    variant={card.cta.variant}
                    size="large"
                    fullWidth
                  >
                    {card.cta.label}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Card, CardContent, Stack, Typography, Button, Chip } from "@mui/material";
import { tiers } from "@/lib/pricing";

export default function PricingTeaser() {
  return (
    <Box component="section" className="rv-section" id="pricing-teaser">
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            Pricing
          </Typography>
          <Typography variant="h2" component="h2">
            Round numbers. No .99.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Free is genuinely free. Pro is what an indie developer pays. Team is what
            an engineering org pays. Enterprise is for the regulated and the very large.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {tiers.slice(0, 3).map((t) => (
            <Card
              key={t.id}
              sx={{
                p: 0.5,
                ...(t.popular
                  ? {
                      borderColor: "primary.main",
                      borderWidth: 2,
                      transform: { md: "scale(1.04)" },
                      boxShadow:
                        "0 24px 60px -24px rgba(22,20,18,0.22), 0 6px 16px rgba(22,20,18,0.06)",
                    }
                  : {}),
              }}
            >
              <CardContent
                sx={{
                  p: 3.5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="eyebrow" component="div">
                    {t.label}
                  </Typography>
                  {t.popular ? (
                    <Chip
                      label="Most popular"
                      size="small"
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        fontWeight: 500,
                      }}
                    />
                  ) : null}
                </Stack>

                <Stack direction="row" alignItems="baseline" spacing={1}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {t.price}
                  </Typography>
                  {t.priceSuffix ? (
                    <Typography variant="body2" color="text.secondary">
                      {t.priceSuffix}
                    </Typography>
                  ) : null}
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                  {t.audience}
                </Typography>

                <Stack component="ul" spacing={1} sx={{ listStyle: "none", p: 0, m: 0, flex: 1 }}>
                  {t.features.slice(0, 5).map((f) => (
                    <Typography
                      key={f}
                      component="li"
                      variant="body2"
                      sx={{
                        position: "relative",
                        pl: 2.5,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "0.65em",
                          width: 8,
                          height: 1.5,
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      {f}
                    </Typography>
                  ))}
                </Stack>

                <Button
                  component="a"
                  href={t.cta.href}
                  variant={t.cta.variant}
                  size="large"
                  fullWidth
                >
                  {t.cta.label}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button component="a" href="/pricing" variant="text" size="large">
            Compare every feature →
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

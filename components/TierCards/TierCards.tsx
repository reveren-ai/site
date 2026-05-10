"use client";

import { Box, Card, CardContent, Stack, Typography, Button, Chip } from "@mui/material";
import posthog from "posthog-js";
import { tiers, pricingFootnote } from "@/lib/pricing";
import {
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";
import WaitlistButton from "@/components/WaitlistModal/WaitlistButton";
import type { WaitlistTier } from "@/components/WaitlistModal/WaitlistModal";

export default function TierCards() {
  return (
    <Box component="section" className="rv-section--tight">
      <Box className="rv-container">
        <MotionStagger
          stagger={0.08}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {tiers.map((t) => (
            <MotionItem key={t.id} sx={{ height: "100%" }}>
            <Card
              className={t.popular ? "rv-popular-pulse" : undefined}
              sx={{
                p: 0.5,
                height: "100%",
                transition:
                  "transform 140ms cubic-bezier(0.22,1,0.36,1), box-shadow 140ms cubic-bezier(0.22,1,0.36,1)",
                "&:hover": {
                  transform: t.popular
                    ? { xs: "translateY(-2px)", lg: "scale(1.04) translateY(-2px)" }
                    : "translateY(-2px)",
                  boxShadow: "var(--rv-shadow-pop)",
                },
                ...(t.popular
                  ? {
                      borderColor: "primary.main",
                      borderWidth: 2,
                      transform: { lg: "scale(1.04)" },
                      boxShadow: "var(--rv-shadow-pop)",
                    }
                  : {}),
              }}
            >
              <CardContent
                sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="eyebrow" component="div">
                    {t.label}
                  </Typography>
                  {t.popular ? (
                    <Chip
                      label="Most popular"
                      size="small"
                      sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontWeight: 500 }}
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

                <Typography variant="caption" color="text.secondary" component="div">
                  {t.cadence}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 36 }}>
                  {t.audience}
                </Typography>

                <Stack component="ul" spacing={1} sx={{ listStyle: "none", p: 0, m: 0, flex: 1 }}>
                  {t.features.map((f) => (
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

                <Box
                  sx={{
                    py: 2,
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="eyebrow"
                    component="div"
                    color="text.secondary"
                  >
                    Pod credits
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, textAlign: "right" }}
                  >
                    {t.podCredits}
                  </Typography>
                </Box>

                {t.cta.kind === "waitlist" ? (
                  <WaitlistButton
                    tier={t.id as WaitlistTier}
                    label={t.cta.label}
                    variant={t.cta.variant}
                    fullWidth
                    size="large"
                  />
                ) : (
                  <Button
                    component="a"
                    href={t.cta.href}
                    variant={t.cta.variant}
                    size="large"
                    fullWidth
                    onClick={() =>
                      posthog.capture("pricing_tier_cta_clicked", {
                        tier: t.id,
                        label: t.cta.label,
                      })
                    }
                  >
                    {t.cta.label}
                  </Button>
                )}
              </CardContent>
            </Card>
            </MotionItem>
          ))}
        </MotionStagger>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, maxWidth: 800, fontStyle: "italic" }}
        >
          Pro, Team, and Enterprise are pre-launch — sign up to be notified
          when the platform opens.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 800 }}>
          {pricingFootnote}
        </Typography>
      </Box>
    </Box>
  );
}

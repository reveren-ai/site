import type { Metadata } from "next";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  podsHero,
  podsHowItWorks,
  podsCompareHeader,
  podsCompareRows,
  podsWaitlist,
} from "@/lib/pods";
import { fonts } from "@/theme/tokens";
import WaitlistButton from "@/components/WaitlistModal/WaitlistButton";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Pods Marketplace",
  description:
    "The open Pod Marketplace for AI agents. Coming Mo 3. Author once. Sell on every agent. 70/30 creator split. $1 floor.",
  alternates: { canonical: "/pods" },
  openGraph: {
    title: "Pods Marketplace · reveren",
    description:
      "Author once. Sell on every agent. 70/30 creator split, $1 floor. The open Pod Marketplace for AI coding agents.",
    url: "/pods",
  },
  twitter: {
    title: "Pods Marketplace · reveren",
    description:
      "Author once. Sell on every agent. 70/30 creator split, $1 floor.",
  },
};

export default function PodsPage() {
  return (
    <>
      {/* Hero */}
      <Box component="section" className="rv-section" sx={{ pt: { xs: 8, md: 12 } }}>
        <Box className="rv-container">
          <MotionReveal mode="initial">
            <Stack spacing={3} sx={{ maxWidth: 880 }}>
              <Typography variant="eyebrow" component="div">
                {podsHero.eyebrow}
              </Typography>
              <Typography variant="h1" component="h1" sx={{ maxWidth: 820 }}>
                {podsHero.headline}
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                color="text.secondary"
                sx={{ maxWidth: 640, fontSize: { xs: "1.0625rem", md: "1.1875rem" } }}
              >
                {podsHero.subline}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
                <WaitlistButton variant="contained" size="large" label="Get on the creator waitlist" />
                <Button component="a" href="/pricing" variant="outlined" size="large">
                  See pod credits in pricing
                </Button>
              </Stack>
            </Stack>
          </MotionReveal>
        </Box>
      </Box>

      {/* How it works */}
      <Box
        component="section"
        className="rv-section"
        sx={{ bgcolor: "background.default" }}
      >
        <Box className="rv-container">
          <MotionReveal>
            <Stack spacing={2} sx={{ mb: { xs: 5, md: 7 }, maxWidth: 760 }}>
              <Typography variant="eyebrow" component="div">
                How it works
              </Typography>
              <Typography variant="h2" component="h2">
                Author. List. Earn.
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
            {podsHowItWorks.map((s, i) => (
              <MotionItem
                key={s.id}
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  transition:
                    "transform 140ms cubic-bezier(0.22,1,0.36,1), box-shadow 140ms cubic-bezier(0.22,1,0.36,1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "var(--rv-shadow-pop)",
                  },
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
                  {s.step}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.body}
                </Typography>
              </MotionItem>
            ))}
          </MotionStagger>
        </Box>
      </Box>

      {/* Comparison: reveren vs Anthropic Skills vs GPT Store */}
      <Box component="section" className="rv-section">
        <Box className="rv-container">
          <MotionReveal>
            <Stack spacing={2} sx={{ mb: { xs: 5, md: 7 }, maxWidth: 760 }}>
              <Typography variant="eyebrow" component="div">
                Why reveren
              </Typography>
              <Typography variant="h2" component="h2">
                Cross-agent. Open format. Hosted runtime.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Single-agent stores trap creators inside one vendor's reach.
                reveren ships across every agent your team already pays for —
                and the file format stays yours.
              </Typography>
            </Stack>
          </MotionReveal>

          <Box
            tabIndex={0}
            aria-label="Pod marketplace comparison table (scrollable)"
            sx={{
              overflowX: { xs: "auto", lg: "visible" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
                borderRadius: 2,
              },
            }}
          >
            <Box
              role="table"
              aria-label="reveren Pods vs Anthropic Skills vs GPT Store"
              sx={{
                minWidth: { xs: 720, lg: "100%" },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
              }}
            >
              {/* Header row — lands first */}
              <MotionReveal>
                <Box
                  role="row"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
                    alignItems: "stretch",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                  }}
                >
                  {(
                    [
                      { key: "feature", label: podsCompareHeader.feature },
                      { key: "anthropicSkills", label: podsCompareHeader.anthropicSkills },
                      { key: "gptStore", label: podsCompareHeader.gptStore },
                      { key: "reveren", label: podsCompareHeader.reveren, accent: true },
                    ] as const
                  ).map((c) => (
                    <Box
                      role="columnheader"
                      key={c.key}
                      sx={{
                        px: { xs: 2, md: 3 },
                        py: 2,
                        fontFamily: fonts.mono,
                        fontSize: 12,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "text.secondary",
                        ...("accent" in c && c.accent
                          ? { color: "primary.main", fontWeight: 600 }
                          : {}),
                        borderRight: { xs: "none", md: "1px solid" },
                        borderColor: { md: "divider" },
                        "&:last-child": { borderRight: "none" },
                      }}
                    >
                      {c.label}
                    </Box>
                  ))}
                </Box>
              </MotionReveal>

              {/* Rows — cascade after the header */}
              <MotionStagger stagger={0.07} delay={0.12}>
                {podsCompareRows.map((row, idx) => (
                  <MotionItem
                    key={row.feature}
                    role="row"
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
                      borderBottom:
                        idx < podsCompareRows.length - 1 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    {(
                      ["feature", "anthropicSkills", "gptStore", "reveren"] as const
                    ).map((k) => (
                      <Box
                        role="cell"
                        key={k}
                        sx={{
                          px: { xs: 2, md: 3 },
                          py: 2.25,
                          fontSize: 14,
                          color: k === "feature" ? "text.primary" : "text.secondary",
                          fontWeight: k === "feature" ? 500 : 400,
                          borderRight: { xs: "none", md: "1px solid" },
                          borderColor: { md: "divider" },
                          "&:last-child": {
                            borderRight: "none",
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            fontWeight: 500,
                          },
                        }}
                      >
                        {row[k]}
                      </Box>
                    ))}
                  </MotionItem>
                ))}
              </MotionStagger>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Waitlist */}
      <Box
        component="section"
        className="rv-section"
        sx={{ bgcolor: "background.default" }}
      >
        <Box className="rv-container">
          <MotionReveal>
            <Stack
              spacing={3}
              sx={{ maxWidth: 720, mx: "auto", textAlign: "center" }}
            >
              <Typography variant="eyebrow" component="div">
                {podsWaitlist.eyebrow}
              </Typography>
              <Typography variant="h2" component="h2">
                {podsWaitlist.headline}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {podsWaitlist.body}
              </Typography>
              <Box sx={{ pt: 1 }}>
                <WaitlistButton
                  variant="contained"
                  size="large"
                  label="Join the creator waitlist"
                />
              </Box>
            </Stack>
          </MotionReveal>
        </Box>
      </Box>
    </>
  );
}

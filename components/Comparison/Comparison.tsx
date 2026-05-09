import { Box, Stack, Typography } from "@mui/material";
import { comparisonRows, comparisonHeader } from "@/lib/comparison";
import { fonts } from "@/theme/tokens";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
} from "@/components/motion/MotionPrimitives";

const TOOL_KEYS = ["cursorrules", "copilot", "windsurf", "reveren"] as const;

export default function Comparison() {
  return (
    <Box component="section" className="rv-section">
      <Box className="rv-container">
        <MotionReveal>
          <Stack spacing={2} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 760 }}>
            <Typography variant="eyebrow" component="div">
              Why not just .cursorrules?
            </Typography>
            <Typography variant="h2" component="h2">
              Single-file rules vs. a real standards layer.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Vendor-specific instruction files solve a piece of the problem. They don't
              chain into pipelines, don't run from CI, don't survive a tool switch.
            </Typography>
          </Stack>
        </MotionReveal>

        {/* Desktop / tablet: full grid table */}
        <Box
          role="table"
          aria-label="Comparison: .cursorrules vs Copilot Instructions vs Windsurf rules vs reveren"
          sx={{
            display: { xs: "none", md: "block" },
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
                gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr",
                alignItems: "stretch",
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
              }}
            >
              {([
                { key: "feature", label: comparisonHeader.feature },
                { key: "cursorrules", label: comparisonHeader.cursorrules },
                { key: "copilot", label: comparisonHeader.copilot },
                { key: "windsurf", label: comparisonHeader.windsurf },
                { key: "reveren", label: comparisonHeader.reveren, accent: true },
              ] as const).map((c) => (
                <Box
                  role="columnheader"
                  key={c.key}
                  sx={{
                    px: 3,
                    py: 2,
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    ...("accent" in c && c.accent
                      ? {
                          color: "primary.main",
                          fontWeight: 600,
                        }
                      : {}),
                    borderRight: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderRight: "none" },
                  }}
                >
                  {c.label}
                </Box>
              ))}
            </Box>
          </MotionReveal>

          {/* Body rows — cascade after the header */}
          <MotionStagger stagger={0.07} delay={0.12}>
            {comparisonRows.map((row, idx) => (
              <MotionItem
                key={row.feature}
                role="row"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr",
                  borderBottom: idx < comparisonRows.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                }}
              >
                {(["feature", "cursorrules", "copilot", "windsurf", "reveren"] as const).map((k) => (
                  <Box
                    role="cell"
                    key={k}
                    sx={{
                      px: 3,
                      py: 2.25,
                      fontSize: 14,
                      color: k === "feature" ? "text.primary" : "text.secondary",
                      fontWeight: k === "feature" ? 500 : 400,
                      borderRight: "1px solid",
                      borderColor: "divider",
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

        {/* Mobile: card per feature */}
        <MotionStagger
          stagger={0.08}
          aria-label="Comparison: .cursorrules vs Copilot Instructions vs Windsurf rules vs reveren"
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 2,
          }}
        >
          {comparisonRows.map((row) => (
            <MotionItem
              key={row.feature}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
              }}
            >
              <Box
                sx={{
                  px: 2.5,
                  py: 1.75,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.default",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    mb: 0.5,
                  }}
                >
                  {comparisonHeader.feature}
                </Typography>
                <Typography
                  component="div"
                  sx={{ fontSize: 16, fontWeight: 600, color: "text.primary" }}
                >
                  {row.feature}
                </Typography>
              </Box>

              <Box>
                {TOOL_KEYS.map((k, i) => {
                  const isReveren = k === "reveren";
                  return (
                    <Box
                      key={k}
                      sx={{
                        px: 2.5,
                        py: 1.75,
                        bgcolor: isReveren ? "primary.main" : "transparent",
                        color: isReveren ? "primary.contrastText" : "text.secondary",
                        borderTop: i > 0 ? "1px solid" : "none",
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: fonts.mono,
                          fontSize: 11,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: isReveren ? "primary.contrastText" : "text.secondary",
                          opacity: isReveren ? 0.85 : 1,
                          fontWeight: isReveren ? 600 : 400,
                          mb: 0.5,
                        }}
                      >
                        {comparisonHeader[k]}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          fontSize: 14,
                          fontWeight: isReveren ? 500 : 400,
                          color: isReveren ? "primary.contrastText" : "text.primary",
                        }}
                      >
                        {row[k]}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </MotionItem>
          ))}
        </MotionStagger>
      </Box>
    </Box>
  );
}

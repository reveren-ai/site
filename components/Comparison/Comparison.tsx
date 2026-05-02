import { Box, Stack, Typography } from "@mui/material";
import { comparisonRows, comparisonHeader } from "@/lib/comparison";
import { fonts } from "@/theme/tokens";

export default function Comparison() {
  return (
    <Box component="section" className="rv-section">
      <Box className="rv-container">
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

        <Box
          role="table"
          aria-label="Comparison: .cursorrules vs Copilot Instructions vs Windsurf rules vs reveren"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          {/* Header row */}
          <Box
            role="row"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1.4fr 1fr 1fr 1fr 1.2fr" },
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
                  px: { xs: 2, md: 3 },
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
                  borderRight: { xs: "none", md: "1px solid" },
                  borderColor: { md: "divider" },
                  "&:last-child": { borderRight: "none" },
                }}
              >
                {c.label}
              </Box>
            ))}
          </Box>

          {/* Rows */}
          {comparisonRows.map((row, idx) => (
            <Box
              role="row"
              key={row.feature}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1.4fr 1fr 1fr 1fr 1.2fr" },
                borderBottom: idx < comparisonRows.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
              }}
            >
              {(["feature", "cursorrules", "copilot", "windsurf", "reveren"] as const).map((k) => (
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
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

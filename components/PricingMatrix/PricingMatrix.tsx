import { Fragment } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { featureMatrix, tiers } from "@/lib/pricing";
import { fonts } from "@/theme/tokens";
import Cell from "./Cell";

// CSS-grid pricing matrix. Sticky head, popular column wash, hard contrast.
// Per HANDOFF.md §6 we deliberately avoid <Table> so we keep the structural
// freedom to overlay a popular-column wash and stick the head correctly.

export default function PricingMatrix() {
  const tierColumns = tiers; // 4 columns

  return (
    <Box id="matrix" component="section" className="rv-section">
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            Compare every feature
          </Typography>
          <Typography variant="h2" component="h2">
            What you get, exactly.
          </Typography>
        </Stack>

        <Box sx={{ overflowX: { xs: "auto", lg: "visible" } }}>
          <Box
            role="table"
            aria-label="reveren pricing feature matrix"
            sx={{
              minWidth: { xs: 720, lg: "100%" },
              border: "1px solid",
              borderColor: "text.primary",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            {/* Sticky head */}
            <Box
              role="row"
              sx={{
                position: "sticky",
                top: 64,
                zIndex: 2,
                display: "grid",
                gridTemplateColumns: "minmax(220px, 2fr) repeat(4, minmax(160px, 1fr))",
                bgcolor: "background.paper",
                boxShadow: "inset 0 -2px 0 currentColor",
              }}
            >
              <Box role="columnheader" sx={{ px: 3, py: 2.5 }}>
                <Typography variant="eyebrow" component="div" color="text.secondary">
                  Feature
                </Typography>
              </Box>
              {tierColumns.map((t) => (
                <Box
                  role="columnheader"
                  key={t.id}
                  sx={{
                    px: { xs: 2, md: 3 },
                    py: 2.5,
                    textAlign: "left",
                    ...(t.popular
                      ? {
                          bgcolor: "var(--mui-palette-primary-main)",
                          color: "var(--mui-palette-primary-contrastText)",
                        }
                      : {}),
                  }}
                >
                  <Stack spacing={0.25}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: fonts.mono,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        opacity: 0.8,
                      }}
                    >
                      {t.label}
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}
                    >
                      {t.price}
                      {t.priceSuffix ? (
                        <Box
                          component="span"
                          sx={{ ml: 0.5, fontWeight: 400, opacity: 0.85, fontSize: 13 }}
                        >
                          {t.priceSuffix}
                        </Box>
                      ) : null}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Box>

            {/* Groups */}
            {featureMatrix.map((group) => (
              <Fragment key={group.id}>
                <Box
                  role="row"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "minmax(220px, 2fr) repeat(4, minmax(160px, 1fr))",
                    bgcolor: "text.primary",
                    color: "background.paper",
                  }}
                >
                  <Box
                    role="cell"
                    sx={{
                      gridColumn: "1 / -1",
                      px: 3,
                      py: 1.5,
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {group.label}
                  </Box>
                </Box>
                {group.rows.map((row) => (
                  <Box
                    role="row"
                    key={row.label}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "minmax(220px, 2fr) repeat(4, minmax(160px, 1fr))",
                      borderTop: "1px solid",
                      borderColor: "divider",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Box role="cell" sx={{ px: 3, py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {row.label}
                      </Typography>
                      {row.hint ? (
                        <Typography variant="caption" color="text.secondary" component="div">
                          {row.hint}
                        </Typography>
                      ) : null}
                    </Box>
                    {tierColumns.map((t) => (
                      <Box
                        role="cell"
                        key={t.id}
                        sx={{
                          px: { xs: 2, md: 3 },
                          py: 2,
                          display: "flex",
                          alignItems: "center",
                          ...(t.popular
                            ? {
                                bgcolor: "color-mix(in srgb, var(--mui-palette-primary-main) 5%, transparent)",
                              }
                            : {}),
                        }}
                      >
                        <Cell value={row[t.id as keyof typeof row] as never} />
                      </Box>
                    ))}
                  </Box>
                ))}
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

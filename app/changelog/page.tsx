import type { Metadata } from "next";
import { Box, Stack, Typography, Chip } from "@mui/material";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonLd";
import { fonts } from "@/theme/tokens";
import { releases } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release history for the reveren CLI (@reveren-ai/core): what's shipped on npm and what's next. Versioned with changesets; every release note here matches the published package.",
  alternates: { canonical: "/changelog" },
  openGraph: { title: "Changelog · reveren", url: "/changelog" },
};

export default function ChangelogPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <JsonLd
        data={webPageJsonLd({
          url: "/changelog",
          name: "Changelog · reveren",
          description: metadata.description as string,
        })}
      />
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mb: { xs: 5, md: 7 } }}>
          <Typography variant="eyebrow" component="div">
            Releases
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Changelog
          </Typography>
          <Typography variant="body1" color="text.secondary">
            What&apos;s shipped on npm and what&apos;s next. The CLI is versioned
            with changesets — every entry here matches a published{" "}
            <code>@reveren-ai/core</code> release.
          </Typography>
        </Stack>

        <Stack
          component="ol"
          spacing={0}
          sx={{ listStyle: "none", p: 0, m: 0, maxWidth: 920 }}
        >
          {releases.map((r, i) => (
            <Box
              key={r.version}
              component="li"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 6 },
                py: { xs: 4, md: 5 },
                borderTop: i === 0 ? "none" : "1px solid",
                borderColor: "divider",
              }}
            >
              {/* Version rail */}
              <Stack
                spacing={1}
                sx={{ minWidth: { md: 160 }, flexShrink: 0 }}
                direction={{ xs: "row", md: "column" }}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  v{r.version}
                </Typography>
                <Chip
                  label={r.status === "upcoming" ? "Upcoming" : "Released"}
                  size="small"
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: "0.625rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    height: 20,
                    bgcolor:
                      r.status === "upcoming" ? "transparent" : "primary.main",
                    color:
                      r.status === "upcoming"
                        ? "text.secondary"
                        : "primary.contrastText",
                    border: r.status === "upcoming" ? "1px solid" : "none",
                    borderColor: "divider",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {r.date}
                </Typography>
              </Stack>

              {/* Detail */}
              <Stack spacing={1.5} sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {r.summary}
                </Typography>
                <Stack component="ul" spacing={1} sx={{ pl: 2.5, m: 0 }}>
                  {r.highlights.map((h, j) => (
                    <Typography
                      key={j}
                      component="li"
                      variant="body2"
                      color="text.secondary"
                    >
                      {h}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

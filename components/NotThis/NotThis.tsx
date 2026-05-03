import { Box, Stack, Typography } from "@mui/material";
import { notThis } from "@/lib/notThis";

export default function NotThis() {
  return (
    <Box
      component="section"
      className="rv-section"
      sx={{ bgcolor: "background.default" }}
    >
      <Box className="rv-container">
        <Stack spacing={2} sx={{ mb: { xs: 5, md: 8 }, maxWidth: 760 }}>
          <Typography variant="eyebrow" component="div">
            What reveren isn't
          </Typography>
          <Typography variant="h2" component="h2">
            Five things we deliberately don't do.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Counter-positioning matters more than feature lists. Here's where we draw lines.
          </Typography>
        </Stack>

        <Stack
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {notThis.map((n) => (
            <Box
              key={n.id}
              sx={{
                py: { xs: 3.5, md: 4 },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 4fr) minmax(0, 8fr)" },
                gap: { xs: 1, md: 6 },
                alignItems: "baseline",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 600, fontSize: { xs: "1.125rem", md: "1.25rem" } }}
              >
                {n.rule}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {n.body}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

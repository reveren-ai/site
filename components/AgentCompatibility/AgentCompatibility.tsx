import { Box, Stack, Typography, Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckRounded";
import { supportedAgents, agentsIntro } from "@/lib/agents";
import { fonts } from "@/theme/tokens";
import { MotionReveal } from "@/components/motion/MotionPrimitives";

export default function AgentCompatibility() {
  return (
    <Box component="section" className="rv-section--tight" sx={{ py: { xs: 6, md: 9 } }}>
      <Box className="rv-container">
        <MotionReveal>
          <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
            <Typography variant="eyebrow" component="div">
              {agentsIntro.eyebrow}
            </Typography>
            <Typography variant="h2" component="h2">
              {agentsIntro.headline}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {agentsIntro.body}
            </Typography>
          </Stack>
        </MotionReveal>

        <MotionReveal>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(6, 1fr)" },
              gap: { xs: 0, md: 0 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            {supportedAgents.map((a, i) => (
              <Stack
                key={a.id}
                direction="row"
                alignItems="center"
                spacing={1.25}
                sx={{
                  px: { xs: 2, md: 2.5 },
                  py: 2.25,
                  borderRight: {
                    xs: i % 2 === 0 ? "1px solid" : "none",
                    sm: (i + 1) % 3 !== 0 ? "1px solid" : "none",
                    md: i < supportedAgents.length - 1 ? "1px solid" : "none",
                  },
                  borderBottom: {
                    xs: i < supportedAgents.length - 2 ? "1px solid" : "none",
                    sm: i < supportedAgents.length - (supportedAgents.length % 3 || 3) ? "1px solid" : "none",
                    md: "none",
                  },
                  borderColor: "divider",
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    bgcolor: a.status === "supported" ? "primary.main" : "transparent",
                    color: a.status === "supported" ? "primary.contrastText" : "text.secondary",
                    border: a.status === "supported" ? "none" : "1px solid",
                    borderColor: "divider",
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon sx={{ fontSize: 14 }} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {a.label}
                </Typography>
                {a.status === "beta" ? (
                  <Chip
                    label="Beta"
                    size="small"
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: "0.625rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      height: 18,
                      bgcolor: "transparent",
                      color: "text.secondary",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                ) : null}
              </Stack>
            ))}
          </Box>
        </MotionReveal>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: "block" }}>
          More agents coming as MCP coverage expands. Bring your own model. No vendor lock-in.
        </Typography>
      </Box>
    </Box>
  );
}

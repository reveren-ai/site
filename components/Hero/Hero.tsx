import { Box, Stack, Typography, Button } from "@mui/material";
import Terminal from "@/components/Terminal/Terminal";
import CopyButton from "@/components/CopyButton/CopyButton";
import { INSTALL_COMMAND } from "@/lib/install";

export default function Hero() {
  return (
    <Box id="install" component="section" className="rv-section" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box className="rv-container">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8, lg: 10 },
            alignItems: "center",
          }}
        >
          <Stack spacing={4}>
            <Typography variant="eyebrow" component="div">
              Standards layer for AI agents
            </Typography>

            <Typography
              variant="h1"
              component="h1"
              sx={{ maxWidth: 680 }}
            >
              One pipeline. Every agent.
            </Typography>

            <Typography
              variant="subtitle1"
              component="p"
              color="text.secondary"
              sx={{ maxWidth: 640, fontSize: { xs: "1.0625rem", md: "1.1875rem" } }}
            >
              Stop correcting your AI. Start directing it. <strong style={{ color: "var(--mui-palette-text-primary)", fontWeight: 600 }}>reveren</strong> is structured, versioned, repo-aware guardrails for AI coding agents — protocols plus pipelines that make whichever agent you already pay for dramatically better.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
              <CopyButton text={INSTALL_COMMAND} variant="contained" size="large" />
              <Button
                component="a"
                href="/manifesto"
                variant="outlined"
                size="large"
              >
                Read the manifesto
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ pt: 1 }}>
              MIT-licensed CLI · agent-agnostic · open file format
            </Typography>
          </Stack>

          <Box sx={{ minWidth: 0 }}>
            <Terminal />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

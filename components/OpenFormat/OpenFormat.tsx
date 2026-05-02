import { Box, Stack, Typography, Button } from "@mui/material";
import { fonts } from "@/theme/tokens";
import { GITHUB_SPEC_URL } from "@/lib/install";

export default function OpenFormat() {
  return (
    <Box component="section" className="rv-section">
      <Box className="rv-container">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 6fr) minmax(0, 6fr)" },
            gap: { xs: 6, md: 10 },
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="eyebrow" component="div">
              Open by design
            </Typography>
            <Typography variant="h2" component="h2">
              The .playbooks/ format is yours.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Every playbook is plain Markdown with a typed front-matter block. Version-controlled in your repo. Readable by humans, parseable by agents, portable between vendors.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We publish the spec under CC-BY 4.0. The reference CLI is MIT. If we disappear tomorrow, your team's playbooks keep working.
            </Typography>
            <Box>
              <Button
                component="a"
                href={GITHUB_SPEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
              >
                Read the spec →
              </Button>
            </Box>
          </Stack>

          <Box
            component="pre"
            aria-hidden
            sx={{
              m: 0,
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              fontFamily: fonts.mono,
              fontSize: 13,
              lineHeight: 1.7,
              color: "var(--mui-palette-text-primary)",
              bgcolor: "var(--mui-palette-background-default)",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
{`# .playbooks/ship.playbook.md
---
name: ship
mode: pipeline
agents: [claude, cursor, copilot, windsurf]
inputs:
  - branch
  - tests_pass
---

When the feature is done, reviewed, and ready
to merge, run lint, tests, build. Update docs.
Open a PR with conventional title.

Stop on any failed check. Don't auto-amend.`}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

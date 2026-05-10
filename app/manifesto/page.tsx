import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import ManifestoHeader from "@/components/ManifestoHeader/ManifestoHeader";
import Prose from "@/components/Prose/Prose";
import PullQuote from "@/components/PullQuote/PullQuote";
import TerminalButton from "@/components/TerminalButton/TerminalButton";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import { manifesto } from "./copy";

// Render a body string with inline `code` segments (Markdown-style backticks)
// turned into <code> elements. Prose styles them via the `& code` selector.
function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 1
      ? <code key={i}>{part.slice(1, -1)}</code>
      : part,
  );
}

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "The agent doesn't need a smarter model. It needs an operating manual. Why standards layers, not better models, are what comes next.",
  alternates: { canonical: "/manifesto" },
};

export default function ManifestoPage() {
  // Insert pull quotes between sections at sensible points (~30%, ~60% of body).
  const pullQuoteAfter = [Math.floor(manifesto.sections.length * 0.3), Math.floor(manifesto.sections.length * 0.6)];

  return (
    <>
      <ManifestoHeader title={manifesto.title} author={manifesto.author} date={manifesto.date} />

      <Box className="rv-container">
        <Prose>
          <p>{renderInlineCode(manifesto.intro)}</p>
          {manifesto.sections.map((s, sectionIdx) => (
            <Box key={s.heading} component="div">
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{renderInlineCode(p)}</p>
              ))}
              {pullQuoteAfter.includes(sectionIdx) && manifesto.pullQuotes[pullQuoteAfter.indexOf(sectionIdx)] ? (
                <PullQuote>{manifesto.pullQuotes[pullQuoteAfter.indexOf(sectionIdx)]}</PullQuote>
              ) : null}
            </Box>
          ))}
        </Prose>
      </Box>

      <Box component="section" className="rv-section" sx={{ pt: { xs: 6, md: 10 } }}>
        <Box className="rv-container">
          <MotionReveal>
            <Stack
              spacing={3}
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                py: { xs: 5, md: 7 },
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="eyebrow" component="div">
                Try it
              </Typography>
              <Typography variant="h3" component="h2">
                Sixty seconds. One command.
              </Typography>
              <Box>
                <TerminalButton />
              </Box>
            </Stack>
          </MotionReveal>
        </Box>
      </Box>
    </>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import MotionDrawLine from "@/components/motion/MotionDrawLine";

type ManifestoHeaderProps = {
  title: string;
  author: string;
  date: string;
};

export default function ManifestoHeader({ title, author, date }: ManifestoHeaderProps) {
  return (
    <Box component="section" sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 5, md: 8 } }}>
      <Box className="rv-container">
        <MotionReveal mode="initial" duration={0.48}>
          <Stack spacing={3} sx={{ maxWidth: "65ch", mx: "auto", textAlign: "left" }}>
            <Typography variant="eyebrow" component="div">
              Manifesto
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
            >
              {title}
            </Typography>
            <MotionDrawLine
              duration={720}
              delay={320}
              color="primary.main"
              sx={{ maxWidth: 96 }}
            />
            <Typography variant="body2" color="text.secondary">
              By {author} · {date}
            </Typography>
          </Stack>
        </MotionReveal>
      </Box>
    </Box>
  );
}

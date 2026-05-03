import { Box, Typography } from "@mui/material";
import { fonts } from "@/theme/tokens";

export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        my: { xs: 5, md: 7 },
        py: { xs: 3, md: 4 },
        px: { xs: 0, md: 2 },
        borderLeft: "3px solid",
        borderColor: "primary.main",
        pl: { xs: 3, md: 4 },
      }}
    >
      <Typography
        component="blockquote"
        sx={{
          fontFamily: fonts.serif,
          fontStyle: "italic",
          fontSize: { xs: "1.5rem", md: "2rem" },
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: "text.primary",
          m: 0,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

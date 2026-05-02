import { Box } from "@mui/material";

// Long-form prose container. Sets the type rhythm for the manifesto and any
// future article-like surface. Max 65ch line length for readability.
export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="article"
      sx={{
        maxWidth: "65ch",
        mx: "auto",
        "& p": {
          margin: 0,
          marginBlock: { xs: "1em", md: "1.25em" },
          fontSize: { xs: "1.0625rem", md: "1.1875rem" },
          lineHeight: 1.7,
          color: "text.primary",
          fontVariantLigatures: "common-ligatures",
        },
        "& p:first-of-type": {
          fontSize: { xs: "1.1875rem", md: "1.375rem" },
          lineHeight: 1.55,
          color: "text.primary",
          letterSpacing: "-0.005em",
        },
        "& h2": {
          marginTop: { xs: "2.5em", md: "3em" },
          marginBottom: "0.5em",
          fontSize: { xs: "1.625rem", md: "2rem" },
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "text.primary",
        },
        "& h3": {
          marginTop: { xs: "2em", md: "2.5em" },
          marginBottom: "0.25em",
          fontSize: "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
        },
        "& code": {
          fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          fontSize: "0.95em",
          padding: "0.1em 0.4em",
          borderRadius: 4,
          bgcolor: "action.hover",
        },
        "& a": {
          color: "primary.main",
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "3px",
        },
        "& ul, & ol": {
          paddingInlineStart: "1.5em",
          marginBlock: "1em",
        },
        "& li": {
          fontSize: { xs: "1.0625rem", md: "1.1875rem" },
          lineHeight: 1.7,
          marginBlock: "0.4em",
        },
      }}
    >
      {children}
    </Box>
  );
}

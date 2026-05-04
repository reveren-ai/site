import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import { fonts, motion, radius, breakpoints } from "./tokens";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    eyebrow: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    eyebrow?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    eyebrow: true;
  }
}

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mode",
  },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  shape: {
    borderRadius: radius.md,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
  transitions: {
    easing: {
      easeInOut: motion.ease,
      easeOut: motion.ease,
      sharp: motion.ease,
    },
    duration: {
      shortest: motion.durFast,
      shorter: motion.durFast,
      short: motion.dur,
      standard: motion.dur,
      complex: motion.durSlow,
      enteringScreen: motion.dur,
      leavingScreen: motion.durFast,
    },
  },
  typography: {
    fontFamily: fonts.sans,
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.035em",
      lineHeight: 1.02,
      fontSize: "clamp(2.5rem, 6.4vw, 5.5rem)",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      fontSize: "clamp(2rem, 4vw, 2.75rem)",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      fontSize: "1.25rem",
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.35,
      fontSize: "1.125rem",
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.9375rem",
      lineHeight: 1.55,
    },
    caption: {
      fontFamily: fonts.mono,
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
    eyebrow: {
      fontFamily: fonts.mono,
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      lineHeight: 1.4,
      color: "var(--mui-palette-text-secondary)",
    },
    button: {
      fontWeight: 500,
      letterSpacing: "0",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: radius.md,
          paddingInline: t.spacing(2.25),
          paddingBlock: t.spacing(1),
          minHeight: 40,
          transition: `transform ${motion.durFast}ms ${motion.ease}, background-color ${motion.dur}ms ${motion.ease}, border-color ${motion.dur}ms ${motion.ease}, color ${motion.dur}ms ${motion.ease}`,
          "&:active": {
            transform: "translateY(1px)",
          },
          "&:focus-visible": {
            outline: `2px solid var(--mui-palette-primary-main)`,
            outlineOffset: 2,
          },
        }),
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        outlined: {
          borderColor: "var(--mui-palette-divider)",
          color: "var(--mui-palette-text-primary)",
          "&:hover": {
            borderColor: "var(--mui-palette-text-secondary)",
            backgroundColor: "var(--mui-palette-action-hover)",
          },
        },
        outlinedPrimary: {
          // MUI's per-color rule (`MuiButton-outlinedPrimary`) wins on specificity
          // over the generic `outlined` rule above. Without this, in dark mode
          // the button text resolves to primary.main = #C9D1DC, which is visible
          // on the page bg but reads as a low-emphasis chip rather than a CTA.
          // Force text.primary so the action label has full contrast on either bg.
          color: "var(--mui-palette-text-primary)",
          borderColor: "var(--mui-palette-divider)",
          "&:hover": {
            borderColor: "var(--mui-palette-text-secondary)",
            backgroundColor: "var(--mui-palette-action-hover)",
          },
        },
        textPrimary: {
          color: "var(--mui-palette-text-primary)",
          "&:hover": {
            backgroundColor: "var(--mui-palette-action-hover)",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          border: "1px solid var(--mui-palette-divider)",
          backgroundColor: "var(--mui-palette-background-paper)",
          color: "var(--mui-palette-text-primary)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          color: "var(--mui-palette-text-primary)",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: {
          color: "var(--mui-palette-text-primary)",
          textDecorationColor: "var(--mui-palette-divider)",
          "&:focus-visible": {
            outline: `2px solid var(--mui-palette-primary-main)`,
            outlineOffset: 2,
            borderRadius: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: fonts.sans,
          backgroundColor: "var(--mui-palette-background-default)",
          color: "var(--mui-palette-text-primary)",
          fontFeatureSettings: '"ss01", "cv11"',
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "::selection": {
          backgroundColor: "var(--mui-palette-primary-main)",
          color: "var(--mui-palette-primary-contrastText)",
        },
        "*:focus": {
          outline: "none",
        },
        "*:focus-visible": {
          outline: `2px solid var(--mui-palette-primary-main)`,
          outlineOffset: 2,
          borderRadius: 2,
        },
      },
    },
  },
});

export default theme;

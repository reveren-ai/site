// Lifted verbatim from docs/Design/tokens.ts (Iron accent · light + dark).
// Single source of truth — palette.ts and theme.ts derive from here.

export const tokens = {
  light: {
    bg: "#FAF8F5",
    paper: "#FFFFFF",
    surface2: "#F2EEE8",
    surface3: "#E9E3DA",
    text1: "#161412",
    text2: "#5A544E",
    text3: "#8B847D",
    divider: "rgba(22,20,18,0.10)",
    divider2: "rgba(22,20,18,0.06)",
    accent: "#3A4553",
    accentHover: "#2B3441",
    accentSoft: "#ECEEF1",
    accentInk: "#FFFFFF",
    accentTint: "rgba(58,69,83,0.10)",
    success: "#4E8A6A",
    warning: "#B5811A",
    error: "#8E1F18",
    info: "#3A6A9E",
    selection: "rgba(58,69,83,0.20)",
    shadowCard:
      "0 1px 2px rgba(22,20,18,0.04), 0 8px 24px -12px rgba(22,20,18,0.10)",
    shadowPop:
      "0 24px 60px -24px rgba(22,20,18,0.22), 0 6px 16px rgba(22,20,18,0.06)",
  },
  dark: {
    bg: "#141312",
    paper: "#1C1A18",
    surface2: "#26221F",
    surface3: "#322D29",
    text1: "#F2ECE6",
    text2: "#B5A99E",
    text3: "#6E645C",
    divider: "rgba(242,236,230,0.10)",
    divider2: "rgba(242,236,230,0.06)",
    accent: "#C9D1DC",
    accentHover: "#DEE3EB",
    accentSoft: "#232830",
    accentInk: "#161412",
    accentTint: "rgba(201,209,220,0.14)",
    success: "#74B58C",
    warning: "#D8A24A",
    error: "#D17066",
    info: "#6FA0CC",
    selection: "rgba(201,209,220,0.26)",
    shadowCard:
      "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.6)",
    shadowPop:
      "0 24px 60px -24px rgba(0,0,0,0.7), 0 6px 16px rgba(0,0,0,0.4)",
  },
} as const;

export const fonts = {
  sans: "var(--font-inter), system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
  serif: "var(--font-instrument-serif), 'Iowan Old Style', Georgia, serif",
  mono: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
} as const;

export const space = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 32,
  s8: 48,
  s9: 64,
  s10: 96,
  s11: 128,
} as const;

export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  durFast: 140,
  dur: 220,
  durSlow: 480,
} as const;

export const breakpoints = {
  sm: 720,
  md: 960,
  lg: 1200,
  xl: 1440,
} as const;

export const layout = {
  containerMax: 1200,
  containerPadX: 32,
  containerPadXMobile: 20,
  navHeight: 64,
} as const;

export type ThemeMode = "light" | "dark";

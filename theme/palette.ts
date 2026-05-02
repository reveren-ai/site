import type { PaletteOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: tokens.light.accent,
    dark: tokens.light.accentHover,
    light: tokens.light.accentSoft,
    contrastText: tokens.light.accentInk,
  },
  secondary: {
    main: tokens.light.text2,
    contrastText: tokens.light.paper,
  },
  background: {
    default: tokens.light.bg,
    paper: tokens.light.paper,
  },
  text: {
    primary: tokens.light.text1,
    secondary: tokens.light.text2,
    disabled: tokens.light.text3,
  },
  divider: tokens.light.divider,
  success: { main: tokens.light.success },
  warning: { main: tokens.light.warning },
  error: { main: tokens.light.error },
  info: { main: tokens.light.info },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: tokens.dark.accent,
    dark: tokens.dark.accentHover,
    light: tokens.dark.accentSoft,
    contrastText: tokens.dark.accentInk,
  },
  secondary: {
    main: tokens.dark.text2,
    contrastText: tokens.dark.paper,
  },
  background: {
    default: tokens.dark.bg,
    paper: tokens.dark.paper,
  },
  text: {
    primary: tokens.dark.text1,
    secondary: tokens.dark.text2,
    disabled: tokens.dark.text3,
  },
  divider: tokens.dark.divider,
  success: { main: tokens.dark.success },
  warning: { main: tokens.dark.warning },
  error: { main: tokens.dark.error },
  info: { main: tokens.dark.info },
};

"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { MODE_STORAGE_KEY } from "@/lib/mode";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider
        theme={theme}
        defaultMode="system"
        // MUI's CssVarsProvider also writes data-mode on hydration; without
        // this, it would clobber the inline mode-init script's value because
        // it reads from its default key ("mui-mode") and finds nothing.
        modeStorageKey={MODE_STORAGE_KEY}
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import { type Mode, readMode, writeMode, MODE_STORAGE_KEY } from "@/lib/mode";

// Subscribe directly to the DOM attribute the inline mode-init script set.
// Reading via useSyncExternalStore avoids the "setState in useEffect" pitfall
// and keeps the toggle in sync if the value ever flips from another source.

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-mode"],
  });
  const onStorage = (e: StorageEvent) => {
    if (e.key === MODE_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Mode | null {
  if (typeof document === "undefined") return null;
  const attr = document.documentElement.dataset.mode;
  return attr === "dark" || attr === "light" ? attr : null;
}

function getServerSnapshot(): null {
  return null;
}

export default function ModeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const current = mode ?? readMode();
    const next: Mode = current === "dark" ? "light" : "dark";
    writeMode(next);
  };

  const label =
    mode === "dark"
      ? "Switch to light mode"
      : mode === "light"
      ? "Switch to dark mode"
      : "Toggle colour mode";

  return (
    <IconButton
      onClick={toggle}
      aria-label={label}
      size="small"
      sx={{
        color: "text.primary",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 999,
        width: 36,
        height: 36,
      }}
    >
      {mode === "dark" ? (
        <LightModeIcon fontSize="small" />
      ) : (
        <DarkModeIcon fontSize="small" />
      )}
    </IconButton>
  );
}

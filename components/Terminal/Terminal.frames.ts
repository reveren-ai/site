// Frame data for the animated terminal demo. Each frame is one line that
// reveals at the given offset (ms). The cursor sits on the last visible line.
//
// Keep the loop ≤ 12 seconds — long enough to read, short enough not to feel
// infinite. Restart with a 1.5s pause so eyes can rest.

export type TerminalFrame = {
  prompt?: string;
  text: string;
  className?: "input" | "info" | "success" | "muted" | "warn";
  delay: number; // ms before this line appears
};

export const frames: TerminalFrame[] = [
  { prompt: "$", text: "npx @reveren-ai/core init", className: "input", delay: 0 },
  { text: "✓ Detected: Next.js 16 · TypeScript · pnpm · Vitest", className: "muted", delay: 800 },
  { text: "✓ Selected agent: Claude (via Cursor)", className: "muted", delay: 1300 },
  { text: "↳ Writing .protocols/", className: "info", delay: 1900 },
  { text: "  · plan-product.protocol.md", className: "muted", delay: 2200 },
  { text: "  · plan-engineering.protocol.md", className: "muted", delay: 2450 },
  { text: "  · ship.protocol.md", className: "muted", delay: 2700 },
  { text: "  · review.protocol.md", className: "muted", delay: 2950 },
  { text: "↳ Writing .reveren/config.ts", className: "info", delay: 3400 },
  { text: "↳ Wiring package.json scripts", className: "info", delay: 3800 },
  { text: "✓ Ready. 13 protocols installed.", className: "success", delay: 4400 },
  { prompt: "$", text: "rvr run plan-engineering", className: "input", delay: 5500 },
  { text: "→ The agent now reads your repo before it touches it.", className: "muted", delay: 6300 },
];

export const LOOP_DURATION_MS = 9000;
export const LOOP_RESET_PAUSE_MS = 1500;

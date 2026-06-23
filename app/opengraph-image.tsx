import { ImageResponse } from "next/og";

/**
 * Brand OG card — 1200×630 typography-driven PNG generated at request time.
 *
 * Replaces the static SVG at `/og/reveren-og-1200x630.svg`, which Slack /
 * LinkedIn / Twitter / Facebook / Discord do not render. This file uses
 * Next.js's File Conventions for OG images: any route under app/ that
 * doesn't define its own `opengraph-image.*` inherits this one.
 *
 * Runtime: edge (Vercel caches the response). No client JS, no fonts loaded
 * from disk — we use the system font stack via raw CSS so the cold-start
 * cost stays in the tens of milliseconds.
 */

export const runtime = "edge";
export const alt = "reveren — One pipeline. Every agent.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#1a1410",
          backgroundImage:
            "radial-gradient(ellipse 800px 600px at 80% 30%, rgba(233, 141, 79, 0.18), transparent 60%)",
          color: "#f5ede4",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#e98d4f",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: "#e98d4f",
              color: "#1a1410",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            r
          </span>
          <span>reveren</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "#f5ede4",
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            One pipeline. Every agent.
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "#b8a899",
              maxWidth: 900,
              display: "flex",
            }}
          >
            Keep your AI agent on the rails of your project.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#8a7a6e",
            fontFamily:
              "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
          }}
        >
          <span>$ npx @reveren-ai/core init</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

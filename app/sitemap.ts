import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/jsonLd";

/**
 * Sitemap is gate-aware.
 *
 * Under `LAUNCH_MODE=coming-soon`, the middleware rewrites every UI path to
 * /coming-soon — so we only list the holding page itself. When the gate is
 * lifted, every public route appears.
 *
 * The middleware allowlist (`middleware.ts`) preserves /sitemap.xml so
 * this file is reachable in both modes.
 */
const COMING_SOON = process.env.LAUNCH_MODE === "coming-soon";

const abs = (path: string): string => new URL(path, SITE_URL).toString();

const POST_LAUNCH_ROUTES: MetadataRoute.Sitemap = [
  { url: abs("/"), changeFrequency: "daily", priority: 1.0 },
  { url: abs("/manifesto"), changeFrequency: "monthly", priority: 0.9 },
  { url: abs("/changelog"), changeFrequency: "monthly", priority: 0.6 },
  { url: abs("/pricing"), changeFrequency: "monthly", priority: 0.9 },
  { url: abs("/pods"), changeFrequency: "weekly", priority: 0.8 },
  { url: abs("/security"), changeFrequency: "yearly", priority: 0.5 },
  { url: abs("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  { url: abs("/terms"), changeFrequency: "yearly", priority: 0.3 },
  { url: abs("/dpa"), changeFrequency: "yearly", priority: 0.3 },
];

const COMING_SOON_ROUTES: MetadataRoute.Sitemap = [
  { url: abs("/"), changeFrequency: "weekly", priority: 1.0 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return COMING_SOON ? COMING_SOON_ROUTES : POST_LAUNCH_ROUTES;
}

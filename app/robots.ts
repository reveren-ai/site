import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/jsonLd";

/**
 * robots.ts — gate-aware crawler policy.
 *
 * AI-crawler stance: explicitly **allow**. reveren's open-format/MIT
 * positioning is that AI agents should be able to read this content; the
 * marketing site is part of the surface area that wants to be cited by
 * answer engines.
 *
 * Under LAUNCH_MODE=coming-soon, only the homepage is crawlable. When the
 * gate lifts, the full marketing surface opens up, with /api/* always
 * disallowed.
 */
const COMING_SOON = process.env.LAUNCH_MODE === "coming-soon";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  if (COMING_SOON) {
    return {
      rules: [
        { userAgent: "*", allow: "/", disallow: ["/api/"] },
        ...AI_CRAWLERS.map((ua) => ({
          userAgent: ua,
          allow: "/",
          disallow: ["/api/"],
        })),
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  const disallow = ["/api/", "/app/", "/dashboard/", "/login/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((ua) => ({ userAgent: ua, allow: "/", disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

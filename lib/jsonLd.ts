// JSON-LD structured-data builders. Per Next.js's recommended pattern
// (https://nextjs.org/docs/app/guides/json-ld), each surface emits a
// <script type="application/ld+json"> with the schema object stringified.
//
// Schema vocabulary: schema.org. Search engines (primarily Google, Bing) parse
// these to power rich-result eligibility — Article cards on /manifesto, FAQ
// accordions on /pricing, sitelinks searchbox via WebSite, and the
// Organization knowledge panel.

import { faq } from "@/lib/faq";

export const SITE_URL = "https://reveren.ai";
const ORG_NAME = "reveren";
const ORG_LEGAL_NAME = "Cadere Pty Ltd (trading as Reveren)";
const LOGO_URL = `${SITE_URL}/logo/svg/reveren-favicon.svg`;
const SOCIAL_PROFILES = [
  "https://github.com/reveren-ai",
  "https://x.com/reverenai",
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: SOCIAL_PROFILES,
    description:
      "Structured, versioned, repo-aware guardrails for AI coding agents. Protocols plus pipelines that make whichever agent you already pay for dramatically better.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
  };
}

// Article schema for /manifesto. The manifesto is the canonical long-form
// piece on the site — Article schema makes it eligible for News-style cards.
export function articleJsonLd(opts: {
  title: string;
  author: string;
  datePublished: string; // ISO 8601 date or YYYY-MM
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    author: {
      "@type": "Person",
      name: opts.author,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    datePublished: opts.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
    inLanguage: "en",
  };
}

// FAQPage schema — derived from lib/faq.ts so the rendered FAQ accordion and
// the structured data can never drift. Google requires that the question and
// answer text in the schema match what users see on the page.
export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// WebPage schema for legal/policy surfaces. Less rich than Article but
// gives answer engines a clear "this is a documentation page about X"
// signal — useful when someone asks an LLM "what is reveren's privacy
// posture?" or "show me reveren's DPA."
export function webPageJsonLd(input: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: new URL(input.url, SITE_URL).toString(),
    isPartOf: {
      "@type": "WebSite",
      name: ORG_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
  };
}

// Service schema for /pods. Pods is a marketplace offering — Google's
// Service rich-result eligibility maps cleanly to "thing you can buy /
// sign up for." The `potentialAction` deep-links to the waitlist anchor
// so answer-engine citations can point at the actual conversion surface.
export function podsServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "reveren Pods and Protocol Marketplace",
    serviceType: "AI coding-agent protocol marketplace",
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    description:
      "Protocol Marketplace for AI coding agents. Install community and reveren-published packs; creators are paid a revenue share.",
    url: `${SITE_URL}/pods`,
    areaServed: "Global",
    audience: {
      "@type": "Audience",
      audienceType: "Software developers using AI coding agents",
    },
    potentialAction: {
      "@type": "JoinAction",
      target: `${SITE_URL}/pods#waitlist`,
      name: "Join the Pods and Marketplace waitlist",
    },
  };
}

// SoftwareApplication schema for the landing page. The reveren CLI is the
// product behind the marketing site; this schema lets Google attach the
// reveren brand to the "developer tool" category in rich results.
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: ORG_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    description:
      "Open file format and CLI for AI coding-agent guardrails. Author once, run on every agent.",
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier — full base protocol library, CLI, unlimited local runs.",
    },
  };
}

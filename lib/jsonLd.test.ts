import { describe, it, expect } from "vitest";
import { faq } from "@/lib/faq";
import {
  organizationJsonLd,
  websiteJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
  podsServiceJsonLd,
  softwareApplicationJsonLd,
} from "./jsonLd";

describe("organizationJsonLd", () => {
  it("emits the canonical Organization schema", () => {
    const ld = organizationJsonLd();
    expect(ld["@type"]).toBe("Organization");
    expect(ld["@context"]).toBe("https://schema.org");
  });
});

describe("websiteJsonLd", () => {
  it("emits the canonical WebSite schema", () => {
    const ld = websiteJsonLd();
    expect(ld["@type"]).toBe("WebSite");
  });
});

describe("faqPageJsonLd", () => {
  // Google penalises FAQPage schemas where the schema text doesn't match what
  // users see on the page. Both the schema and the rendered FAQ component
  // derive from the same `lib/faq.ts` source — these assertions prove the
  // binding so a future refactor that splits them can't silently introduce
  // drift.
  it("emits FAQPage with mainEntity == faq array (same source of truth)", () => {
    const ld = faqPageJsonLd() as {
      "@type": string;
      mainEntity: Array<{
        "@type": string;
        name: string;
        acceptedAnswer: { "@type": string; text: string };
      }>;
    };
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(faq.length);
    for (let i = 0; i < faq.length; i++) {
      expect(ld.mainEntity[i].name).toBe(faq[i].question);
      expect(ld.mainEntity[i].acceptedAnswer.text).toBe(faq[i].answer);
    }
  });
});

describe("webPageJsonLd", () => {
  it("resolves the URL against SITE_URL and carries name + description", () => {
    const ld = webPageJsonLd({
      url: "/security",
      name: "Security · reveren",
      description: "Test description.",
    }) as {
      "@type": string;
      name: string;
      description: string;
      url: string;
    };
    expect(ld["@type"]).toBe("WebPage");
    expect(ld.name).toBe("Security · reveren");
    expect(ld.description).toBe("Test description.");
    expect(ld.url).toBe("https://reveren.ai/security");
  });
});

describe("podsServiceJsonLd", () => {
  it("emits a Service with potentialAction deep-linked to #waitlist", () => {
    const ld = podsServiceJsonLd() as {
      "@type": string;
      potentialAction: { target: string };
    };
    expect(ld["@type"]).toBe("Service");
    expect(ld.potentialAction.target).toContain("#waitlist");
  });
});

describe("softwareApplicationJsonLd", () => {
  it("emits SoftwareApplication with Free offer", () => {
    const ld = softwareApplicationJsonLd() as {
      "@type": string;
      offers: { price: string };
    };
    expect(ld["@type"]).toBe("SoftwareApplication");
    expect(ld.offers.price).toBe("0");
  });
});

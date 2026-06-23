import type { Metadata } from "next";
import PricingHeader from "@/components/PricingHeader/PricingHeader";
import TierCards from "@/components/TierCards/TierCards";
import PricingMatrix from "@/components/PricingMatrix/PricingMatrix";
import FAQ from "@/components/FAQ/FAQ";
import CtaBand from "@/components/CtaBand/CtaBand";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "The reveren CLI, the full protocol library, and every agent at its baseline are free forever, with unlimited local use and no metering. Pro ($12/mo) is the one paid tier — the maintained Engineering Pod plus the vibe-coder layer — with the Protocol Marketplace to follow.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing · reveren",
    description:
      "Free core: the rvr CLI, the full protocol library, the open format spec, and every agent at its baseline, with unlimited local use. Pro ($12/mo) is the paid tier; the Protocol Marketplace follows.",
    url: "/pricing",
  },
  twitter: {
    title: "Pricing · reveren",
    description:
      "Free core forever. Pro ($12/mo) is the one paid tier; the Protocol Marketplace follows.",
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <PricingHeader />
      <TierCards />
      <PricingMatrix />
      <FAQ />
      <CtaBand />
    </>
  );
}

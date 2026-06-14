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
    "The reveren CLI and the full protocol library are free forever, with unlimited local use and no metering. The only paid surfaces are Pods and the Protocol Marketplace.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing · reveren",
    description:
      "Free core: the rvr CLI, the full protocol library, and the open format spec, with unlimited local use. Pods and the Protocol Marketplace are the only paid surfaces.",
    url: "/pricing",
  },
  twitter: {
    title: "Pricing · reveren",
    description:
      "Free core forever. Pods and the Protocol Marketplace are the only paid surfaces.",
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

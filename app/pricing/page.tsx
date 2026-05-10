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
    "Free, Pro ($19/mo), Team ($39/seat/mo), Enterprise. All USD. Local reveren run is unlimited and free on every tier.",
  alternates: { canonical: "/pricing" },
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

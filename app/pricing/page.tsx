import type { Metadata } from "next";
import PricingHeader from "@/components/PricingHeader/PricingHeader";
import TierCards from "@/components/TierCards/TierCards";
import PricingMatrix from "@/components/PricingMatrix/PricingMatrix";
import FAQ from "@/components/FAQ/FAQ";
import CtaBand from "@/components/CtaBand/CtaBand";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free, Pro ($19/mo), Team ($39/seat/mo), Enterprise. All USD. Local reveren run is unlimited and free on every tier.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingHeader />
      <TierCards />
      <PricingMatrix />
      <FAQ />
      <CtaBand />
    </>
  );
}

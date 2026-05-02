import Hero from "@/components/Hero/Hero";
import AudienceCards from "@/components/AudienceCards/AudienceCards";
import CapabilityGrid from "@/components/CapabilityGrid/CapabilityGrid";
import ProofPoint from "@/components/ProofPoint/ProofPoint";
import NotThis from "@/components/NotThis/NotThis";
import PricingTeaser from "@/components/PricingTeaser/PricingTeaser";
import Comparison from "@/components/Comparison/Comparison";
import ManifestoTeaser from "@/components/ManifestoTeaser/ManifestoTeaser";
import OpenFormat from "@/components/OpenFormat/OpenFormat";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceCards />
      <CapabilityGrid />
      <ProofPoint />
      <NotThis />
      <PricingTeaser />
      <Comparison />
      <ManifestoTeaser />
      <OpenFormat />
    </>
  );
}

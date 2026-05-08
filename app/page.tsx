import Hero from "@/components/Hero/Hero";
import FeatureTeaser from "@/components/FeatureTeaser/FeatureTeaser";
import AudienceCards from "@/components/AudienceCards/AudienceCards";
import Solution from "@/components/Solution/Solution";
import AgentCompatibility from "@/components/AgentCompatibility/AgentCompatibility";
import ProofPoint from "@/components/ProofPoint/ProofPoint";
import NotThis from "@/components/NotThis/NotThis";
import Comparison from "@/components/Comparison/Comparison";
import PricingTeaser from "@/components/PricingTeaser/PricingTeaser";
import ManifestoTeaser from "@/components/ManifestoTeaser/ManifestoTeaser";
import OpenFormat from "@/components/OpenFormat/OpenFormat";
import FounderBio from "@/components/FounderBio/FounderBio";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureTeaser />
      <AudienceCards />
      <Solution />
      <AgentCompatibility />
      <ProofPoint />
      <NotThis />
      <Comparison />
      <PricingTeaser />
      <ManifestoTeaser />
      <OpenFormat />
      <FounderBio />
    </>
  );
}

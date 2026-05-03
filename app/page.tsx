// Landing IA per HANDOFF.md §5.2 (Claude Design's section order). The
// previous IA components (AudienceCards, CapabilityGrid, NotThis,
// Comparison) live alongside in `components/` and can be swapped in here
// to reinstate or A/B individual sections.

import Hero from "@/components/Hero/Hero";
import Problem from "@/components/Problem/Problem";
import Solution from "@/components/Solution/Solution";
import AgentCompatibility from "@/components/AgentCompatibility/AgentCompatibility";
import ProofPoint from "@/components/ProofPoint/ProofPoint";
import PricingTeaser from "@/components/PricingTeaser/PricingTeaser";
import ManifestoTeaser from "@/components/ManifestoTeaser/ManifestoTeaser";
import OpenFormat from "@/components/OpenFormat/OpenFormat";
import FounderBio from "@/components/FounderBio/FounderBio";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <AgentCompatibility />
      <ProofPoint />
      <PricingTeaser />
      <ManifestoTeaser />
      <OpenFormat />
      <FounderBio />
    </>
  );
}

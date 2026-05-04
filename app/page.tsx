// A/B layout: both the original IA (MVP-SITE-ADJUSTMENTS.md §3) and the
// HANDOFF.md §5.2 IA render together so we can compare in-browser. Pairs:
//   AudienceCards (old) ↔ Problem (new)        — three-up framing
//   CapabilityGrid (old) ↔ Solution (new)       — four-up primitives
//   NotThis (old)                              — counter-positioning, no new pair
//   Comparison (old)                           — vendor comparison, no new pair
//   AgentCompatibility (new), FounderBio (new) — no old pair
// Decide which to keep, then trim this file.

import Hero from "@/components/Hero/Hero";
import AudienceCards from "@/components/AudienceCards/AudienceCards";
import Problem from "@/components/Problem/Problem";
import CapabilityGrid from "@/components/CapabilityGrid/CapabilityGrid";
import Solution from "@/components/Solution/Solution";
import AgentCompatibility from "@/components/AgentCompatibility/AgentCompatibility";
import ProofPoint from "@/components/ProofPoint/ProofPoint";
import NotThis from "@/components/NotThis/NotThis";
import PricingTeaser from "@/components/PricingTeaser/PricingTeaser";
import Comparison from "@/components/Comparison/Comparison";
import ManifestoTeaser from "@/components/ManifestoTeaser/ManifestoTeaser";
import OpenFormat from "@/components/OpenFormat/OpenFormat";
import FounderBio from "@/components/FounderBio/FounderBio";

export default function Home() {
  return (
    <>
      <Hero />

      {/* A/B: 3-up framing */}
      <AudienceCards />
      <Problem />

      {/* A/B: 4-up primitives */}
      <CapabilityGrid />
      <Solution />

      {/* New only — no old pair */}
      <AgentCompatibility />

      <ProofPoint />

      {/* Original only — counter-positioning */}
      <NotThis />

      <PricingTeaser />

      {/* Original only — vendor comparison */}
      <Comparison />

      <ManifestoTeaser />
      <OpenFormat />

      {/* New only — no old pair */}
      <FounderBio />
    </>
  );
}

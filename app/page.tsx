import type { Metadata } from "next";
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
import JsonLd from "@/components/JsonLd";
import { softwareApplicationJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  description:
    "reveren is the operating manual for AI coding agents. A CLI (`npx @reveren-ai/core init`) scaffolds an open Markdown protocol library into your repo so every agent — Claude, Cursor, Copilot, Windsurf, Lovable, Bolt, v0 — works from the same set of rules.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
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

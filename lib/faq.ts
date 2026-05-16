export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    id: "what-is-a-protocol",
    question: "What is a protocol, exactly?",
    answer:
      "A short Markdown file in your repo that tells an AI coding agent how your team works — how you name things, test things, ship things. The agent reads the relevant protocol before doing the work, so it stops guessing your conventions. Authored once, reused by every agent you run.",
  },
  {
    id: "vs-cursorrules",
    question: "Why not just use .cursorrules / Copilot Instructions / Windsurf rules?",
    answer:
      "Those are vendor-specific single files. Your investment doesn't move when you switch agents, and they don't compose into multi-step pipelines. reveren's protocols are an open format that runs across every major coding agent and chains into deterministic workflows.",
  },
  {
    id: "what-counts-as-cloud-run",
    question: "What counts as a cloud pipeline run?",
    answer:
      "Anything dispatched to the hosted orchestrator (dashboard, registry, GitHub App, MCP write). Local `rvr run` against your own machine is free and unlimited on every tier — including Free.",
  },
  {
    id: "self-host",
    question: "Can I self-host?",
    answer:
      "Self-hosting is on Enterprise only — Docker images for the orchestrator, registry, and dashboard. The CLI itself is MIT-licensed and runs anywhere.",
  },
  {
    id: "byo-keys",
    question: "Do I bring my own model API keys?",
    answer:
      "Yes. reveren is the standards layer; the model is yours. Your Claude / OpenAI / GitHub keys stay in your environment and never round-trip through us.",
  },
  {
    id: "switch-agents",
    question: "What happens if I switch agents next year?",
    answer:
      "Your protocols come with you. The .protocols/ format is open-spec and version-controlled in your repo. Switching agents is a config change, not a migration.",
  },
  {
    id: "discount",
    question: "Are there startup / OSS discounts?",
    answer:
      "Yes — open-source maintainers and pre-seed startups get Pro free for 12 months. Email hello@reveren.ai with a link to your project or GitHub.",
  },
  {
    id: "regulated",
    question: "We're regulated. SOC2, audit logs, DPA?",
    answer:
      "Enterprise tier only. SOC2 Type II is in-progress; DPA is available on request. Self-host removes data-residency questions entirely.",
  },
];

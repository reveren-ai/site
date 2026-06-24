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
      "A short Markdown file in your repo that tells an AI coding agent how your team works: how you name things, test things, ship things. The agent reads the relevant protocol before doing the work, so it stops guessing your conventions. Authored once, reused by every agent you run.",
  },
  {
    id: "vs-cursorrules",
    question: "Why not just use .cursorrules / Copilot Instructions / Windsurf rules?",
    answer:
      "Those are vendor-specific single files. Your investment doesn't move when you switch agents, and they don't compose into multi-step pipelines. reveren's protocols are an open format that runs across every major coding agent and chains into deterministic workflows.",
  },
  {
    id: "what-do-i-pay-for",
    question: "What do I actually pay for?",
    answer:
      "One paid tier at launch: Pro ($12/mo). It's the maintained Engineering Pod (kept current as models move) plus a pre-ship gate (review + QA + security as one go/no-go), auto-fix, and a supervised pipeline, all powered by the open protocols and coordinator reveren already ships and running on your machine and your keys (reveren never holds your credentials). A cross-agent project brain and deeper guardrails are rolling out, and the Protocol Marketplace follows. Everything else is free (the CLI, the full base protocol library, every specialist agent at its baseline, and the self-improvement loop), unlimited and bring-your-own-model. Pro is pre-launch today; join the waitlist and we'll tell you when it opens.",
  },
  {
    id: "self-host",
    question: "Can I self-host, or buy an enterprise tier?",
    answer:
      "Not at this stage. There is no enterprise sales motion, no self-host distribution, and no SSO or dedicated-infrastructure tier. reveren is built for individuals, small teams, and vibe coders. The CLI already runs entirely on your own machine, so your code and keys never leave it.",
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
    id: "is-the-core-open-source",
    question: "Is reveren open source?",
    answer:
      "The core CLI is source-available under the Business Source License 1.1: the source is published, it is free to use for your own work, and it converts to Apache-2.0 on its Change Date. The protocol library is MIT-licensed and the `.protocols/` format spec is published as an open standard. Pro (the maintained Engineering Pod plus the vibe-coder layer) and the Protocol Marketplace are the proprietary, paid surfaces.",
  },
  {
    id: "regulated",
    question: "Do you offer SOC 2, a signed DPA, or self-hosting?",
    answer:
      "Not at this stage. There is no enterprise compliance programme, no formal SOC 2 report, and no self-hosted distribution. Because the CLI runs locally and calls your model provider directly, your code, prompts, and keys stay on your own machine. See the Security page for the current posture.",
  },
];

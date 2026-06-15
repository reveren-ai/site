// /pods coming-soon copy — verbatim from
// DESIGN-REVISION-HANDOVER-PODS.md §7.1. Holds the route until Release 1
// ships the actual marketplace UI.

export const podsHero = {
  eyebrow: "Pods and the Protocol Marketplace",
  headline: "Specialist agents and protocol packs, without the lock-in.",
  subline: "Coming soon. Author once. Runs on every agent.",
};

export type PodsHowItWorksStep = {
  id: string;
  step: string;
  body: string;
};

export const podsHowItWorks: PodsHowItWorksStep[] = [
  {
    id: "author",
    step: "Author",
    body: "Bundle your protocols into a pod. Pin it to your preferred agents — Claude, Cursor, Copilot, anything that supports .protocols/.",
  },
  {
    id: "list",
    step: "List",
    body: "Publish your pack to the Protocol Marketplace with a description. We handle billing, payouts, and sales tax so you don't have to.",
  },
  {
    id: "earn",
    step: "Earn",
    body: "Creators are paid a revenue share on what they publish. Pricing and terms are being finalised ahead of launch.",
  },
];

export type PodsCompareRow = {
  feature: string;
  anthropicSkills: string;
  gptStore: string;
  reveren: string;
};

export const podsCompareHeader = {
  feature: "What you get",
  anthropicSkills: "Anthropic Skills",
  gptStore: "GPT Store",
  reveren: "reveren Pods",
};

export const podsCompareRows: PodsCompareRow[] = [
  {
    feature: "Cross-agent reach",
    anthropicSkills: "Claude only",
    gptStore: "ChatGPT only",
    reveren: "Every agent",
  },
  {
    feature: "Workplace verticals",
    anthropicSkills: "Limited",
    gptStore: "Consumer-leaning",
    reveren: "4 launch verticals",
  },
  {
    feature: "Runs inside your own CLI",
    anthropicSkills: "—",
    gptStore: "—",
    reveren: "Yes",
  },
  {
    feature: "Creator revenue share",
    anthropicSkills: "N/A",
    gptStore: "Variable",
    reveren: "Yes",
  },
  {
    feature: "Open file format",
    anthropicSkills: "No",
    gptStore: "No",
    reveren: "Yes (.protocols/, MIT)",
  },
];

export const podsWaitlist = {
  eyebrow: "Creator waitlist",
  headline: "Be the first to publish.",
  body: "Drop your email. When the marketplace opens, you'll get a creator account and a window to publish before listings open to everyone else.",
};

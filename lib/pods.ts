// /pods coming-soon copy — verbatim from
// DESIGN-REVISION-HANDOVER-PODS.md §7.1. Holds the route until Release 1
// ships the actual marketplace UI.

export const podsHero = {
  eyebrow: "The open Pod Marketplace for AI agents",
  headline: "The App Store for agents — without the lock-in.",
  subline: "Coming Mo 3. Author once. Sell on every agent.",
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
    body: "Set a price, choose between self-host and hosted pods, write a description. We handle billing, payouts, and sales tax.",
  },
  {
    id: "earn",
    step: "Earn",
    body: "70/30 creator split. $1 floor. Top creators (50+ pods or $100K+ revenue) move to an 80/20 split.",
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
    feature: "Hosted always-on runtime",
    anthropicSkills: "—",
    gptStore: "—",
    reveren: "Yes (Release 2)",
  },
  {
    feature: "Creator revenue share",
    anthropicSkills: "N/A",
    gptStore: "Variable",
    reveren: "70/30 (80/20 top tier)",
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

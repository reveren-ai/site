// Pricing data — verbatim from MVP-SITE-ADJUSTMENTS.md §4.
// All USD, no .99. Round numbers. Cloud runs only count when using the
// hosted orchestrator; local `reveren run` is unlimited and free on every tier.

export type TierId = "free" | "pro" | "team" | "enterprise";

export type Tier = {
  id: TierId;
  label: string;
  price: string;
  priceSuffix?: string;
  cadence: string;
  audience: string;
  cta: { label: string; href: string; variant: "contained" | "outlined" };
  popular?: boolean;
  features: string[];
};

export const tiers: Tier[] = [
  {
    id: "free",
    label: "Free",
    price: "$0",
    cadence: "Forever",
    audience: "Solo learners, hobbyists, evaluators",
    cta: { label: "Try free", href: "#install", variant: "outlined" },
    features: [
      "Full base playbook library",
      "CLI: init / run / list / sync",
      "Single repo",
      "200 cloud pipeline runs / month",
      "Community support",
    ],
  },
  {
    id: "pro",
    label: "Pro",
    price: "$19",
    priceSuffix: "/ month",
    cadence: "Solo developers",
    audience: "Indie hackers, freelancers, side projects",
    cta: { label: "Start Pro trial", href: "#install", variant: "contained" },
    popular: true,
    features: [
      "Everything in Free",
      "Custom playbooks",
      "Multi-step pipelines",
      "Unlimited repos",
      "CI/CD integration",
      "MCP server (read)",
      "2,000 cloud runs / mo · overage $0.015 / run",
    ],
  },
  {
    id: "team",
    label: "Team",
    price: "$39",
    priceSuffix: "/ seat / month",
    cadence: "2 – 500 seats",
    audience: "Engineering teams shipping production software",
    cta: { label: "Talk to sales", href: "mailto:hello@reveren.ai?subject=Team%20pricing", variant: "outlined" },
    features: [
      "Everything in Pro",
      "Hosted dashboard",
      "Private playbook registry",
      "Team sync + analytics",
      "GitHub App / SSO",
      "MCP server (write)",
      "6,000 cloud runs / seat · overage $0.012 / run",
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: "Custom",
    cadence: "500+ seats / regulated",
    audience: "Banks, healthcare, government, regulated platforms",
    cta: { label: "Talk to sales", href: "mailto:hello@reveren.ai?subject=Enterprise", variant: "outlined" },
    features: [
      "Everything in Team",
      "Self-host (Docker)",
      "Dedicated CSM",
      "Custom SLA",
      "Security review",
      "Optional professional services engagement",
    ],
  },
];

export const pricingFootnote =
  "All prices in USD. Local-only `reveren run` is unlimited and free on every tier. Cloud pipeline runs apply only when you use the hosted orchestrator (analytics, registry, GitHub App, MCP write).";

// Feature matrix — five row groups per HANDOFF.md §5.3, with cell values
// that can be boolean | string | number. Order matters: Pipeline first
// (most differentiating), Support last (table-stakes).

export type CellValue = boolean | string | number;

export type MatrixRow = {
  label: string;
  hint?: string;
  free: CellValue;
  pro: CellValue;
  team: CellValue;
  enterprise: CellValue;
};

export type MatrixGroup = {
  id: string;
  label: string;
  rows: MatrixRow[];
};

export const featureMatrix: MatrixGroup[] = [
  {
    id: "pipeline",
    label: "Pipeline",
    rows: [
      {
        label: "Multi-step playbook chains",
        free: false,
        pro: true,
        team: true,
        enterprise: true,
      },
      {
        label: "Cloud pipeline runs / month",
        free: 200,
        pro: 2000,
        team: "6,000 / seat",
        enterprise: "Custom",
      },
      {
        label: "Overage rate",
        free: "—",
        pro: "$0.015 / run",
        team: "$0.012 / run",
        enterprise: "Negotiated",
      },
      {
        label: "Local `reveren run`",
        hint: "Unlimited on every tier",
        free: "Unlimited",
        pro: "Unlimited",
        team: "Unlimited",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    id: "playbooks",
    label: "Playbooks",
    rows: [
      { label: "Base playbook library (12)", free: true, pro: true, team: true, enterprise: true },
      { label: "Author custom playbooks", free: false, pro: true, team: true, enterprise: true },
      { label: "Private playbook registry", free: false, pro: false, team: true, enterprise: true },
      { label: "Versioned changesets", free: false, pro: true, team: true, enterprise: true },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    rows: [
      { label: "Claude · Cursor · Copilot · Windsurf · GPT", free: true, pro: true, team: true, enterprise: true },
      { label: "MCP server (read)", free: false, pro: true, team: true, enterprise: true },
      { label: "MCP server (write)", free: false, pro: false, team: true, enterprise: true },
      { label: "Bring-your-own model keys", free: true, pro: true, team: true, enterprise: true },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    rows: [
      { label: "Hosted dashboard", free: false, pro: false, team: true, enterprise: true },
      { label: "GitHub App on PRs", free: false, pro: true, team: true, enterprise: true },
      { label: "SSO / SAML", free: false, pro: false, team: true, enterprise: true },
      { label: "Self-host (Docker)", free: false, pro: false, team: false, enterprise: true },
      { label: "Audit log", free: false, pro: false, team: true, enterprise: true },
    ],
  },
  {
    id: "support",
    label: "Support",
    rows: [
      { label: "Community", free: true, pro: true, team: true, enterprise: true },
      { label: "Email support", free: false, pro: true, team: true, enterprise: true },
      { label: "Dedicated CSM", free: false, pro: false, team: false, enterprise: true },
      { label: "Custom SLA", free: false, pro: false, team: false, enterprise: true },
      { label: "Security review", free: false, pro: false, team: false, enterprise: true },
    ],
  },
];

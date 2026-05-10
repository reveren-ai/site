// Pricing data — verbatim from MVP-SITE-ADJUSTMENTS.md §4.
// All USD, no .99. Round numbers. Cloud runs only count when using the
// hosted orchestrator; local `reveren run` is unlimited and free on every tier.

export type TierId = "free" | "pro" | "team" | "enterprise";

export type CtaKind = "mailto" | "waitlist" | "install";

export type Tier = {
  id: TierId;
  label: string;
  price: string;
  priceSuffix?: string;
  cadence: string;
  audience: string;
  // `kind` discriminates how TierCards renders the CTA. Defaults to "mailto"
  // for backward compatibility — leave it off for legacy mailto-only tiers.
  // Pro / Enterprise route through WaitlistButton (kind: "waitlist") because
  // the hosted orchestrator + Stripe checkout don't exist yet; we capture
  // intent only. Free uses "install" (CLI install instructions).
  cta: {
    label: string;
    href: string;
    variant: "contained" | "outlined";
    kind?: CtaKind;
  };
  popular?: boolean;
  features: string[];
  // Pod Marketplace credits per DESIGN-REVISION-HANDOVER-PODS.md §5.
  // One credit = one paid pod / month at no additional cost (creators still paid).
  podCredits: string;
};

export const tiers: Tier[] = [
  {
    id: "free",
    label: "Free",
    price: "$0",
    cadence: "Forever",
    audience: "Solo learners, hobbyists, evaluators",
    cta: { label: "Try free", href: "#install", variant: "outlined", kind: "install" },
    features: [
      "Full base protocol library",
      "CLI: init / run / list / sync",
      "Single repo",
      "200 cloud pipeline runs / month",
      "Community support",
    ],
    podCredits: "Free pods only",
  },
  {
    id: "pro",
    label: "Pro",
    price: "$19",
    priceSuffix: "/ month",
    cadence: "Solo developers",
    audience: "Indie hackers, freelancers, side projects",
    // Pre-launch sentinel — the hosted orchestrator + Stripe checkout don't
    // exist yet, so the CTA opens the tier-aware WaitlistModal instead of
    // navigating. `href` is unused when `kind === "waitlist"`.
    cta: { label: "Join Pro waitlist", href: "#waitlist", variant: "contained", kind: "waitlist" },
    popular: true,
    features: [
      "Everything in Free",
      "Custom protocols",
      "Multi-step pipelines",
      "Unlimited repos",
      "CI/CD integration",
      "MCP server (read)",
      "2,000 cloud runs / mo · overage $0.015 / run",
    ],
    podCredits: "1 paid pod / month",
  },
  {
    id: "team",
    label: "Team",
    price: "$39",
    priceSuffix: "/ seat / month",
    cadence: "2 – 500 seats",
    audience: "Engineering teams shipping production software",
    cta: {
      label: "Talk to sales",
      href: "mailto:hello@reveren.ai?subject=Team%20pricing",
      variant: "outlined",
      kind: "mailto",
    },
    features: [
      "Everything in Pro",
      "Hosted dashboard",
      "Private protocol registry",
      "Team sync + analytics",
      "GitHub App / SSO",
      "MCP server (write)",
      "6,000 cloud runs / seat · overage $0.012 / run",
    ],
    podCredits: "3 paid pods / org / month",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: "Custom",
    cadence: "500+ seats / regulated",
    audience: "Banks, healthcare, government, regulated platforms",
    // Pre-launch — Enterprise routes through the tier-aware WaitlistModal,
    // which collects company / seats / use-case in addition to the email.
    // `href` is unused when `kind === "waitlist"`.
    cta: { label: "Join Enterprise waitlist", href: "#waitlist", variant: "outlined", kind: "waitlist" },
    features: [
      "Everything in Team",
      "Self-host (Docker)",
      "Dedicated CSM",
      "Custom SLA",
      "Security review",
      "Optional professional services engagement",
    ],
    podCredits: "Unlimited",
  },
];

export const pricingFootnote =
  "All prices in USD. Local-only `reveren run` is unlimited and free on every tier. Cloud pipeline runs apply only when you use the hosted orchestrator (analytics, registry, GitHub App, MCP write). Pod credits entitle you to one paid Marketplace pod per month at no additional cost — creators are still paid. Beyond included credits, additional pods are purchased separately (self-host pods $1–$9 / mo; hosted pods $19+ / mo).";

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
        label: "Multi-step protocol chains",
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
    id: "marketplace",
    label: "Marketplace",
    rows: [
      {
        label: "Pod credits / month",
        hint: "One paid Marketplace pod, no extra charge",
        free: "Free pods only",
        pro: 1,
        team: "3 / org",
        enterprise: "Unlimited",
      },
      {
        label: "Author + sell pods",
        free: false,
        pro: true,
        team: true,
        enterprise: true,
      },
      {
        label: "Creator revenue share",
        free: "—",
        pro: "70 / 30",
        team: "70 / 30",
        enterprise: "Negotiated",
      },
      {
        label: "Private org pod registry",
        free: false,
        pro: false,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    id: "protocols",
    label: "Protocols",
    rows: [
      { label: "Base protocol library (12)", free: true, pro: true, team: true, enterprise: true },
      { label: "Author custom protocols", free: false, pro: true, team: true, enterprise: true },
      { label: "Private protocol registry", free: false, pro: false, team: true, enterprise: true },
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
      { label: "Bring your own model", free: true, pro: true, team: true, enterprise: true },
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

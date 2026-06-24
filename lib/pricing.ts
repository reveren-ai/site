// Pricing data: three tiers — Free core, Pro (the vibe-coder paid tier), and the
// Protocol Marketplace (coming soon). Local `rvr run` and every baseline agent
// are unlimited and free; Pro is the one paid tier at launch. Pro is priced at
// $12/mo ($120/yr) — an easy add-on on top of whatever builder a vibe coder
// already pays for. Pro is purchasable via Stripe checkout (the route is wired
// pre-go-live; see PRE_GO_LIVE_CHECKLIST.md); the Marketplace stays on the
// waitlist. There is no enterprise sales motion at this stage. See
// reveren_monetization_model.md (workspace root) for the artifact-vs-upkeep
// rationale behind the free/paid line.

export type TierId = "free" | "pods" | "marketplace";

export type CtaKind = "mailto" | "waitlist" | "install" | "checkout";

export type Tier = {
  id: TierId;
  label: string;
  price: string;
  priceSuffix?: string;
  cadence: string;
  audience: string;
  // `kind` discriminates how TierCards renders the CTA. Free uses "install"
  // (CLI install instructions). Pro is purchasable — kind: "checkout" links to
  // the Stripe checkout route (`/api/checkout/pro`), which is wired pre-go-live
  // (see PRE_GO_LIVE_CHECKLIST.md). Marketplace is still pre-launch, so it
  // routes through the tier-aware WaitlistModal (kind: "waitlist").
  cta: {
    label: string;
    href: string;
    variant: "contained" | "outlined";
    kind?: CtaKind;
  };
  popular?: boolean;
  // Full per-surface list — feeds the home `PricingTeaser`. The exhaustive
  // side-by-side comparison lives in `featureMatrix`, so the pricing cards do
  // NOT render this; they render the lean `cardFeatures` below.
  features: string[];
  // Lean 3-bullet differentiators shown on the pricing cards (the scan layer).
  // Kept short on purpose: three tall 6-bullet cards overflowed the desktop
  // viewport and made an excessive mobile scroll. Depth is one section down in
  // the matrix — cards orient, the matrix proves. Keep this to the top 3.
  cardFeatures: string[];
  // Non-pricing per-card detail row: what the surface includes, not a metered
  // credit count. Keeps the card layout consistent across all three tiers.
  detail: string;
};

export const tiers: Tier[] = [
  {
    id: "free",
    label: "Free",
    price: "$0",
    cadence: "Forever",
    audience: "Vibe coders, individuals, and small teams",
    cta: { label: "Install the CLI", href: "#install", variant: "outlined", kind: "install" },
    features: [
      "The `rvr` CLI: init / run / list / check / sync",
      "No-terminal onboarding: your agent runs one command",
      "Full base protocol library + open `.protocols/` spec",
      "Every specialist agent at its free baseline",
      "The self-improvement loop",
      "Bring your own model and key: unlimited, any repo",
    ],
    cardFeatures: [
      "The `rvr` CLI + full base protocol library",
      "Every specialist agent at its baseline",
      "Bring your own model: unlimited, any repo",
    ],
    detail: "Everything you need to adopt reveren, free",
  },
  {
    id: "pods",
    label: "Pro",
    price: "$12",
    priceSuffix: "per month · $120/yr billed yearly",
    cadence: "For vibe coders shipping with AI",
    audience: "Ship with confidence. It won't let you ship something broken",
    // Pro is purchasable. The CTA links to the Stripe checkout route; wiring
    // Stripe is a pre-go-live action (PRE_GO_LIVE_CHECKLIST.md).
    cta: { label: "Get Pro · $12/mo", href: "/api/checkout/pro", variant: "contained", kind: "checkout" },
    popular: true,
    features: [
      "The maintained Engineering Pod: kept current as models move",
      "Pre-ship gate: review + QA + security as one go/no-go, built on shipped protocols",
      "Auto-fix: turns review findings into applied fixes, in plain language",
      "Supervised Autopilot: runs the pipeline on your machine and your keys; we never hold credentials",
      "Project brain: cross-agent memory so your agent stops re-breaking things (rolling out)",
      "Deploy, secret & cost guardrails: catch disasters before they ship (rolling out)",
    ],
    cardFeatures: [
      "The maintained Engineering Pod: current as models move",
      "Pre-ship gate: review + QA + security as one go/no-go",
      "Auto-fix + a supervised pipeline on your machine, your keys",
    ],
    detail: "Maintained by reveren · bring your own model",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    price: "Coming soon",
    cadence: "The Protocol Marketplace",
    audience: "Community and reveren-published protocol packs",
    // Pre-launch sentinel: same WaitlistModal flow as Pro.
    cta: { label: "Join the waitlist", href: "#waitlist", variant: "outlined", kind: "waitlist" },
    features: [
      "Install community and reveren-published packs",
      "Private registry for your own packs",
      "`rvr sync` against the registry",
      "Versioned protocol releases",
      "Creators are paid a revenue share",
    ],
    cardFeatures: [
      "Install community + reveren-published packs",
      "Private registry for your own packs",
      "Creators are paid a revenue share",
    ],
    detail: "Community and reveren packs",
  },
];

export const pricingFootnote =
  "The free core is everything you need to adopt reveren (the CLI, the full protocol library, the open format spec, every specialist agent at its baseline, and the self-improvement loop), unlimited and bring-your-own-model throughout. Pro ($12/mo) is the one paid tier at launch: the maintained Engineering Pod, plus a pre-ship gate, auto-fix, and a supervised pipeline, all powered by the open protocols and coordinator reveren already ships, running on your machine and your keys; reveren never holds your credentials. The cross-agent project brain and deeper guardrails are rolling out. The Marketplace follows. There is no enterprise sales motion at this stage.";

// Feature matrix: three columns (Free, Pro, Marketplace) grouped by surface.
// Order matters: the free CLI and protocols first, then the two paid surfaces.

export type CellValue = boolean | string | number;

export type MatrixRow = {
  label: string;
  hint?: string;
  free: CellValue;
  pods: CellValue;
  marketplace: CellValue;
};

export type MatrixGroup = {
  id: string;
  label: string;
  rows: MatrixRow[];
};

export const featureMatrix: MatrixGroup[] = [
  {
    id: "cli",
    label: "CLI & protocols",
    rows: [
      {
        label: "`rvr` CLI: init / run / list / sync",
        free: true,
        pods: true,
        marketplace: true,
      },
      {
        label: "Full base protocol library",
        free: true,
        pods: true,
        marketplace: true,
      },
      {
        label: "Open `.protocols/` format spec",
        free: true,
        pods: true,
        marketplace: true,
      },
      {
        label: "Author your own protocols and agents",
        free: true,
        pods: true,
        marketplace: true,
      },
      {
        label: "Every specialist agent at its baseline",
        free: true,
        pods: true,
        marketplace: true,
      },
      {
        label: "Local `rvr run`",
        hint: "Unlimited, no metering",
        free: "Unlimited",
        pods: "Unlimited",
        marketplace: "Unlimited",
      },
    ],
  },
  {
    id: "pods",
    label: "Pro",
    rows: [
      {
        label: "Maintained Engineering Pod: current as models move",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Pre-ship gate: review + QA + security as one go/no-go",
        hint: "Built on shipped protocols + the coordinator",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Auto-fix: findings turned into applied fixes",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Supervised Autopilot: your machine, your keys",
        hint: "reveren never holds your credentials",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Project brain: cross-agent memory",
        hint: "Rolling out",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Deploy, secret & cost guardrails",
        hint: "Rolling out",
        free: false,
        pods: true,
        marketplace: false,
      },
    ],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    rows: [
      {
        label: "Install community + reveren packs",
        free: false,
        pods: false,
        marketplace: true,
      },
      {
        label: "Private registry",
        free: false,
        pods: false,
        marketplace: true,
      },
      {
        label: "`rvr sync` against the registry",
        free: false,
        pods: false,
        marketplace: true,
      },
      {
        label: "Creator revenue share",
        free: false,
        pods: false,
        marketplace: "Creators paid a share",
      },
    ],
  },
];

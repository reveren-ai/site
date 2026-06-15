// Pricing data: three surfaces only (Free core, Pods, and the Protocol
// Marketplace). Local `rvr run` is unlimited and free; the only paid surfaces
// are the Pods subscription and the Marketplace subscription. Prices for the
// paid surfaces are indicative and finalising, so we never print a dollar
// figure for them, just a "Subscription" label with a "Pricing finalising"
// sub-line. There is no enterprise sales motion at this stage.

export type TierId = "free" | "pods" | "marketplace";

export type CtaKind = "mailto" | "waitlist" | "install";

export type Tier = {
  id: TierId;
  label: string;
  price: string;
  priceSuffix?: string;
  cadence: string;
  audience: string;
  // `kind` discriminates how TierCards renders the CTA. Free uses "install"
  // (CLI install instructions). Pods + Marketplace route through the
  // tier-aware WaitlistModal (kind: "waitlist") because the subscriptions
  // don't exist yet; we capture intent only.
  cta: {
    label: string;
    href: string;
    variant: "contained" | "outlined";
    kind?: CtaKind;
  };
  popular?: boolean;
  features: string[];
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
    audience: "Individuals, small teams, and vibe coders",
    cta: { label: "Install the CLI", href: "#install", variant: "outlined", kind: "install" },
    features: [
      "The `rvr` CLI: init / run / list / sync",
      "Full base protocol library",
      "Open `.protocols/` format spec",
      "Author your own protocols and agents",
      "Unlimited local use on any number of repos",
    ],
    detail: "Local use, always free",
  },
  {
    id: "pods",
    label: "Pods",
    price: "Subscription",
    priceSuffix: "Pricing finalising",
    cadence: "reveren's maintained specialist agents",
    audience: "Teams that want expert agents kept current for them",
    // Pre-launch sentinel: the subscription and checkout don't exist yet, so
    // the CTA opens the tier-aware WaitlistModal instead of navigating.
    // `href` is unused when `kind === "waitlist"`.
    cta: { label: "Join the Pods waitlist", href: "#waitlist", variant: "contained", kind: "waitlist" },
    popular: true,
    features: [
      "reveren-authored specialist agents in the core",
      "Review, QA, security, and planning pods",
      "Kept current as models and practice move",
      "Runs inside the CLI you already use",
      "More pods added over time",
    ],
    detail: "Maintained by reveren",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    price: "Subscription",
    priceSuffix: "Pricing finalising",
    cadence: "The Protocol Marketplace",
    audience: "Anyone who wants community and reveren protocol packs",
    // Pre-launch sentinel: same WaitlistModal flow as Pods.
    cta: { label: "Join the Marketplace waitlist", href: "#waitlist", variant: "outlined", kind: "waitlist" },
    features: [
      "Install community and reveren-published packs",
      "Private registry for your own packs",
      "`rvr sync` against the registry",
      "Versioned protocol releases",
      "Creators are paid a revenue share",
    ],
    detail: "Community and reveren packs",
  },
];

export const pricingFootnote =
  "Local CLI use is always free: author and run your own protocols and agents on any number of repos, with no metering. The only paid surfaces are the Pods subscription and the Protocol Marketplace subscription; both are indicative and finalising, which is why no figure is shown yet. There is no enterprise sales motion at this stage.";

// Feature matrix: three columns (Free, Pods, Marketplace) grouped by surface.
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
    label: "Pods",
    rows: [
      {
        label: "reveren-authored specialist agents",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Review, QA, security, planning pods",
        free: false,
        pods: true,
        marketplace: false,
      },
      {
        label: "Kept current as models move",
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

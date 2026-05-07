// Agent compatibility row. We deliberately don't ship third-party logos
// (some of these companies are trademarked, and partner-naming embargo
// applies broadly to surfaces we don't control). Plain wordmarks + a
// checkmark per agent reads as a feature row, not an endorsement claim.

export type SupportedAgent = {
  id: string;
  label: string;
  status: "supported" | "beta" | "planned";
};

export const supportedAgents: SupportedAgent[] = [
  { id: "claude", label: "Claude", status: "supported" },
  { id: "cursor", label: "Cursor", status: "supported" },
  { id: "copilot", label: "Copilot", status: "supported" },
  { id: "windsurf", label: "Windsurf", status: "supported" },
  { id: "lovable", label: "Lovable", status: "beta" },
  { id: "v0", label: "v0", status: "beta" },
];

export const agentsIntro = {
  eyebrow: "Agent-agnostic",
  headline: "Works with whichever agent you already pay for.",
  body:
    "Bring your own model API keys. reveren is the standards layer between your codebase and whichever coding agent you use today. Switch agents next quarter and your protocols come with you.",
};

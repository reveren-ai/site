// Comparison table — landing page §9. Compares ad-hoc instruction files
// (.cursorrules, Copilot Instructions, Windsurf rules) against reveren.

export type ComparisonRow = {
  feature: string;
  cursorrules: string;
  copilot: string;
  windsurf: string;
  reveren: string;
};

export const comparisonHeader = {
  feature: "",
  cursorrules: ".cursorrules",
  copilot: "Copilot Instructions",
  windsurf: "Windsurf rules",
  reveren: "reveren",
} as const;

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Format",
    cursorrules: "Single file",
    copilot: "Single file",
    windsurf: "Single file",
    reveren: "Versioned library, one file per playbook",
  },
  {
    feature: "Multi-step pipelines",
    cursorrules: "—",
    copilot: "—",
    windsurf: "—",
    reveren: "Yes — plan → ship → review → qa",
  },
  {
    feature: "Agent compatibility",
    cursorrules: "Cursor only",
    copilot: "Copilot only",
    windsurf: "Windsurf only",
    reveren: "Claude, Cursor, Copilot, Windsurf, GPT",
  },
  {
    feature: "Repo-aware",
    cursorrules: "Static rules",
    copilot: "Static rules",
    windsurf: "Static rules",
    reveren: "Reads structure, conventions, prior decisions",
  },
  {
    feature: "Team-shareable",
    cursorrules: "Copy-paste",
    copilot: "Copy-paste",
    windsurf: "Copy-paste",
    reveren: "Private registry, GitHub App, dashboard",
  },
  {
    feature: "Run from CI",
    cursorrules: "—",
    copilot: "—",
    windsurf: "—",
    reveren: "GitHub App on every PR",
  },
  {
    feature: "Open format",
    cursorrules: "Vendor-specific",
    copilot: "Vendor-specific",
    windsurf: "Vendor-specific",
    reveren: "MIT-licensed spec",
  },
];

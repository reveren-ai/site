export type SolutionPillar = {
  id: string;
  label: string;
  description: string;
};

export const solution: SolutionPillar[] = [
  {
    id: "protocols",
    label: "Protocols",
    description:
      "Short Markdown files in your repo that tell your AI agent how your team works — naming, testing, shipping, reviewing. Versioned, repo-aware, agent-agnostic. Author once. The format is open, so your work travels with you.",
  },
  {
    id: "pipelines",
    label: "Pipelines",
    description:
      "Chain protocols into deterministic workflows: plan → ship → review → qa → document. The agent stops freelancing and follows the manual.",
  },
  {
    id: "standards",
    label: "Standards",
    description:
      "One source of truth for naming, testing, coverage thresholds, deploying, reviewing — applied identically by every agent on every PR. Coverage drift becomes a CI failure, not an oversight.",
  },
  {
    id: "audit",
    label: "Audit",
    description:
      "Every run is recorded. Every decision is traceable. When the regulator, the post-mortem, or the new hire asks why, the answer is in the log.",
  },
];

export const solutionIntro = {
  eyebrow: "The standards layer",
  headline: "Four primitives. Composable in any order.",
  body:
    "Protocols describe the work. Pipelines chain them. Standards make them consistent. Audit makes them defensible. Together they're the operating manual the agent didn't ship with.",
};

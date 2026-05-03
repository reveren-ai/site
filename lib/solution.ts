export type SolutionPillar = {
  id: string;
  label: string;
  description: string;
};

export const solution: SolutionPillar[] = [
  {
    id: "playbooks",
    label: "Playbooks",
    description:
      "Versioned, repo-aware instructions in plain Markdown. Author once. Run from any agent. The format is open — your work travels with you.",
  },
  {
    id: "pipelines",
    label: "Pipelines",
    description:
      "Chain playbooks into deterministic workflows: plan → ship → review → qa → document. The agent stops freelancing and follows the manual.",
  },
  {
    id: "standards",
    label: "Standards",
    description:
      "One source of truth for naming, testing, deploying, reviewing — applied identically by every agent on every PR. Decisions stop dissolving between sessions.",
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
    "Playbooks describe the work. Pipelines chain them. Standards make them consistent. Audit makes them defensible. Together they're the operating manual the agent didn't ship with.",
};

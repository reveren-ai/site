export type Capability = {
  id: string;
  label: string;
  description: string;
};

export const capabilities: Capability[] = [
  {
    id: "playbook-library",
    label: "Playbook library",
    description:
      "Versioned, repo-aware instructions in plain Markdown. Author once, run from any agent. The format is open — your work travels with you.",
  },
  {
    id: "multi-step-pipelines",
    label: "Multi-step pipelines",
    description:
      "Chain playbooks into deterministic workflows: plan → ship → review → qa → document. The agent stops freelancing and follows the manual.",
  },
  {
    id: "agent-agnostic",
    label: "Agent-agnostic",
    description:
      "Works with whichever agent you already pay for: Claude, Cursor, Copilot, Windsurf, GPT. Bring your own keys. No vendor lock-in.",
  },
  {
    id: "team-shareable",
    label: "Team-shareable",
    description:
      "Private playbook registry, GitHub App on every PR, dashboard for runs and quality signals. Your team learns once; the agent applies it forever.",
  },
];

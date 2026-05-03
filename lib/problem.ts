export type Problem = {
  id: string;
  label: string;
  body: string;
};

export const problems: Problem[] = [
  {
    id: "spec-drift",
    label: "Spec drift",
    body: "By Tuesday afternoon the agent is writing code that doesn't match yesterday's decisions. By Friday it's contradicting itself. Without a versioned source of truth, every prompt is a fresh act of memory.",
  },
  {
    id: "quality-gap",
    label: "Quality gap",
    body: "The agent's first draft passes lint and fails review. The second draft passes review and breaks the migration. Quality is bolted on after the fact, by the engineer who's supposed to be moving faster, not slower.",
  },
  {
    id: "compliance-theatre",
    label: "Compliance theatre",
    body: "Security review, accessibility checks, audit trails — all real requirements, all done by hand on every PR. The agent doesn't know they exist. The team performs them in the gaps the agent leaves.",
  },
];

export const problemIntro = {
  eyebrow: "The problem",
  headline: "Three failure modes every team hits at scale.",
  body:
    "These aren't model problems — Claude 4.7 is brilliant. They're standards problems. The agent doesn't know what your team has already decided, so the team becomes the standards layer, manually, in real time, on every interaction.",
};

export type Audience = {
  id: string;
  label: string;
  pain: string;
  cta: string;
};

export const audiences: Audience[] = [
  {
    id: "engineering-teams",
    label: "Engineering teams",
    pain: "Your AI agent writes code that drifts from your conventions, your testing patterns, your migration strategy. You spend the second hour of the day correcting it. reveren makes the agent inherit the team's protocol on day one.",
    cta: "Read the team protocol",
  },
  {
    id: "vibe-coders",
    label: "Vibe coders",
    pain: "You're shipping with Lovable, Bolt, v0, or Cursor. The agent moves fast, but the third feature breaks the first two. reveren turns your scattered prompts into versioned guardrails that keep the agent on rails as your project grows.",
    cta: "See the no-CLI start",
  },
  {
    id: "engineering-leaders",
    label: "Engineering leaders",
    pain: "Your team pays for three different agents. Quality and review burden vary by who's on duty. reveren is the standards layer — same protocols, same pipeline, every developer, every agent. One thing to govern instead of five.",
    cta: "Talk to sales",
  },
];

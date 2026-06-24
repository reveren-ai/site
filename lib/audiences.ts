export type Audience = {
  id: string;
  label: string;
  pain: string;
  cta: string;
};

export const audiences: Audience[] = [
  {
    id: "vibe-coders",
    label: "Vibe coders",
    pain: "You're shipping with Lovable, Bolt, v0, or Cursor. The agent moves fast, but the third feature breaks the first two, and you can't always tell what's wrong. reveren gives the agent the rules of your project, remembers them across sessions, and won't let you ship something broken. No terminal required.",
    cta: "See the no-terminal start",
  },
  {
    id: "engineering-teams",
    label: "Engineering teams",
    pain: "Your AI agent writes code that drifts from your conventions, your testing patterns, your migration strategy. You spend the second hour of the day correcting it. reveren makes the agent inherit the team's protocol on day one, across whichever agents your team uses.",
    cta: "Read the team protocol",
  },
  {
    id: "solo-founders",
    label: "Solo founders & small teams",
    pain: "You're building a real product without a real team. reveren is the review, QA, and security teammates you don't have: the same protocols on every agent, running on your machine and your keys. Start free; add the maintained Pro pod when you want it kept sharp for you.",
    cta: "See what's free",
  },
];

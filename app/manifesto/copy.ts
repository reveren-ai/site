// Manifesto copy. Owner-editable. Replace the placeholder body with the final
// essay when ready — structure (sections + pull quotes) can stay the same.
//
// Voice notes: editorial, declarative, no jargon. Engineers read this. Don't
// hedge. Don't reference competitors by name unless naming them strengthens
// our position.

import { INSTALL_COMMAND } from "@/lib/install";

export const manifesto = {
  title: "The agent doesn't need a smarter model. It needs an operating manual.",
  author: "Innocent Muisha",
  date: "May 2026",
  intro:
    "The state of AI coding is this: every team is paying for an agent. Every team's agent does some things brilliantly and some things badly. The badly part is the same across teams — the agent doesn't know how this codebase prefers to do things, doesn't know what the team has already decided, doesn't know what good looks like here. So engineers spend the second hour of every day correcting the agent. Renaming, rewriting, re-aligning. We are paying for the agent and then paying again to clean up after it.",
  sections: [
    {
      heading: "What's actually broken.",
      body: [
        "The model isn't broken. The model is improving every quarter, and the improvement is real — Claude 4.7, GPT-5, the next thing. But model improvement does not solve the problem we have. The problem we have is that the model does not know what we know.",
        "Every team has decisions: how we name things, how we test things, how we ship things. Every team has constraints: regulated, legacy, on-call. Every team has a roadmap, an architecture, a set of agreements. None of that is in the model's weights. None of that is in a one-page .cursorrules file. And none of that survives when someone switches editors next week.",
        "What's broken is the layer between the model and the team. There isn't one. So the team becomes the layer, manually, in real time, on every interaction.",
      ],
    },
    {
      heading: "What an operating manual looks like.",
      body: [
        "An operating manual is the set of instructions that lets a competent person do good work in your specific context. It is not a tutorial. It is not training material. It is the thing the senior engineer would say to the new hire on day one: how we do things here, why, and what to do when reality deviates.",
        "We call this a protocol. A protocol is a versioned Markdown file with typed front-matter that tells the agent: here is the role you are playing, here are the inputs you receive, here is the work you do, here is what you produce, here is what success looks like. It is repo-aware because it lives in your repo. It is agent-agnostic because it is plain Markdown that any agent can read. It composes into pipelines because the format is structured.",
        "Twelve protocols is enough to run a real engineering team. Plan-product. Plan-ux. Plan-engineering. Ship. Review. QA. Document. Capture-learnings. Improve. Cyber. Legal. Audit. Each one is replaceable. Each one is forkable. Each one travels with you across agents.",
      ],
    },
    {
      heading: "Why this should be open.",
      body: [
        "If this works, it becomes infrastructure. Infrastructure that is single-vendor is rented, not owned. We don't think teams should rent the format their work runs in.",
        "So the .protocols/ format is open under CC-BY 4.0, and the reference CLI is MIT. If reveren the company disappears tomorrow, your team's protocols keep working. Anyone can build a competing CLI tomorrow. We win by being the best implementation, not by trapping the schema.",
      ],
    },
    {
      heading: "What we will not do.",
      body: [
        "We will not write the code. We will not run the inference. We will not replace your IDE, your knowledge base, or your model provider. Counter-positioning is more honest than feature lists; here is what reveren is not.",
        "We will not echo the same dozen patterns every AI tool ships with. No green primary. No brackets in copy. No skeleton loaders for content that's already in the HTML. Editorial restraint is part of the product. If we add a section to fill space, please tell us, and we will remove it.",
      ],
    },
    {
      heading: "How this gets to a billion-dollar company.",
      body: [
        "Standards layers compound. The first ten teams using reveren each authoring two private protocols adds twenty protocols of value. The hundredth team adds two hundred. The marketplace, once it opens, lets a vibe coder buy the protocol a staff engineer wrote on Tuesday and use it on Wednesday. The agent, whichever agent, gets better every time someone ships a protocol.",
        "Revenue is the orchestrator: cloud runs, hosted dashboard, private registry, GitHub App, Enterprise self-host. The CLI is free forever because the CLI is the wedge. The orchestrator is the moat because the orchestrator is the network.",
      ],
    },
    {
      heading: "If you've read this far.",
      body: [
        `Run ${INSTALL_COMMAND}. Watch it scaffold .protocols/ in your repo. Run reveren run plan-engineering on the next feature. Tell me whether the agent's output got better.`,
        "If it didn't, email me. I'll fix it.",
      ],
    },
  ],
  pullQuotes: [
    "We are paying for the agent and then paying again to clean up after it.",
    "Standards layers compound. The CLI is the wedge. The orchestrator is the moat.",
  ],
};

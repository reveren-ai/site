// Counter-positioning copy — extends MVP-SITE-ADJUSTMENTS.md §6 with the
// sixth "Not a vendor-locked marketplace" principle from
// DESIGN-REVISION-HANDOVER-PODS.md §6 (the marketplace moat against
// Anthropic Skills + GPT Store).

export type NotThisItem = {
  id: string;
  rule: string;
  body: string;
};

export const notThis: NotThisItem[] = [
  {
    id: "not-an-agent",
    rule: "Not an AI agent.",
    body: "We don't write code, run inference, or replace Claude / Cursor / Copilot / Windsurf. We make the agent you already use dramatically better.",
  },
  {
    id: "not-an-ide",
    rule: "Not an IDE.",
    body: "Live in whichever editor you already love. We coordinate the agent inside it.",
  },
  {
    id: "not-a-model",
    rule: "Not a model provider.",
    body: "Bring your own model API keys. We're the standards layer between your codebase and whichever model you pay for.",
  },
  {
    id: "not-a-knowledge-base",
    rule: "Not a knowledge base.",
    body: "Notion, Confluence, internal docs already exist. reveren reads them; it doesn't replace them.",
  },
  {
    id: "not-locked-in",
    rule: "Not single-vendor lock-in.",
    body: "The .protocols/ format is open. Your investment in protocols travels with you across agents, IDEs, even off-platform.",
  },
  {
    id: "not-a-locked-marketplace",
    rule: "Not a vendor-locked marketplace.",
    body: "Anthropic Skills runs on Claude. ChatGPT GPT Store runs on ChatGPT. The reveren Pod Marketplace runs on every agent your team already pays for. Author once. Sell on every agent.",
  },
];

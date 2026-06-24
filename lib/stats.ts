// Single source of truth for the "Built with reveren" proof-point numbers.
// Pull from mrktable's actual repo state — these are claims, so they must
// be verifiable. Owner to update when numbers change materially.

export type Stat = {
  value: string
  label: string
  hint?: string
}

export const proofStats: Stat[] = [
  {
    value: '15',
    label: 'protocols shipped',
    hint: 'all MIT in the base library'
  },
  { value: '6', label: 'agents tested' },
  { value: '4', label: 'pipeline runners' },
  { value: '2,820', label: 'tests passing' },
  { value: '95%+', label: 'code coverage' },
  { value: '34', label: 'data models' }
]

export const proofStory = {
  eyebrow: 'Built with reveren',
  headline: 'mrktable runs on its own protocols.',
  body: 'mrktable is a production financial-media platform (a weekly markets digest, Market Moves, Deep Dives, an AGI tracker, and an analysis Terminal in beta) built on Next.js 16, Prisma 7, Stripe, and Auth.js, with an automated AI pipeline that researches, drafts, and publishes. Every surface is shipped by AI agents working from reveren’s protocol library; we dogfood reveren before we release it. The numbers below are real, not aspirational.'
}

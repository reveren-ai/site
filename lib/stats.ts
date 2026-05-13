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
    value: '13',
    label: 'protocols shipped',
    hint: 'all MIT in the base library'
  },
  { value: '6', label: 'agents tested' },
  { value: '4', label: 'pipeline runners' },
  { value: '1100+', label: 'tests passing' },
  { value: '95%+', label: 'code coverage' },
  { value: '25', label: 'data models' }
]

export const proofStory = {
  eyebrow: 'Built with reveren',
  headline: 'mrktable runs on its own protocols.',
  body: 'mrktable is a production newsletter platform shipping with Next.js 16, Prisma 7, Stripe, Auth.js, and thirteen agents working from the same protocol library. We dogfood reveren before we ship it. The numbers below are real, not aspirational.'
}

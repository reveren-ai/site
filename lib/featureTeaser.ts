// Roadmap teaser — verbatim shape per DESIGN-REVISION-HANDOVER-PODS.md §3.
// Dates: Release 1 = ~2 months out (protocol generator); Release 2 = ~7 months
// out (pods marketplace). Owner sets these explicitly (rather than relative
// "Mo N" labels) so the calendar promise is unambiguous to investors and
// waitlist signups.

export type FeatureTeaserStatus = 'available' | 'release-1' | 'release-2'

export type FeatureTeaserCard = {
  id: string
  status: FeatureTeaserStatus
  statusLabel: string
  title: string
  body: string
  bullets: string[]
  cta: { label: string; href: string; variant: 'contained' | 'outlined' }
}

export const featureTeaserIntro = {
  eyebrow: 'Roadmap',
  headline: 'What ships, when.',
  body: 'The CLI and protocols are live today. Protocol generation, the pods, and the Protocol Marketplace are next.'
}

export const featureTeaser: FeatureTeaserCard[] = [
  {
    id: 'available-now',
    status: 'available',
    statusLabel: '✓ Available now',
    title: 'Protocols + pipelines',
    body: 'Author versioned, repo-aware protocols. Chain them into deterministic pipelines. Run from any agent.',
    bullets: [
      'Plain-Markdown .protocols/ format',
      'Multi-step pipelines',
      'Source-available CLI, MIT protocols',
      'Bring your own model'
    ],
    cta: { label: 'Try the CLI →', href: '#install', variant: 'contained' }
  },
  {
    id: 'release-1',
    status: 'release-1',
    statusLabel: 'Release 1 · Aug 2026',
    title: 'Protocol generator',
    body: 'Describe what you are building. Reveren scaffolds the core protocols for the job — versioned, repo-aware, ready to run.',
    bullets: [
      'Describe-to-scaffold prompt',
      'Stack-aware protocol selection',
      'Editable Markdown output',
      'Drops straight into .protocols/'
    ],
    cta: { label: 'Get on the waitlist', href: '/pods', variant: 'outlined' }
  },
  {
    id: 'release-2',
    status: 'release-2',
    statusLabel: 'Release 2 · Jan 2027',
    title: 'Pods + Marketplace',
    body: 'reveren-authored specialist agents (pods) plus the Protocol Marketplace for community and reveren-published packs. Creators are paid a revenue share.',
    bullets: [
      'Author once',
      'Runs on every agent',
      'Creators paid a revenue share'
    ],
    cta: { label: 'Get on the waitlist', href: '/pods', variant: 'outlined' }
  }
  // Kept for a later release — hosted runtimes + knowledge graphs.
  // {
  //   id: 'release-3',
  //   status: 'release-2',
  //   statusLabel: 'Release 3 · Dec 2027',
  //   title: 'Hosted pods + knowledge graphs',
  //   body: '24/7 always-on agent runtimes. Knowledge graphs and pruning as opt-in installables.',
  //   bullets: [
  //     'Always-on pods',
  //     'Knowledge graph add-ons',
  //     'MCP connectors',
  //     'EA / PA pod templates'
  //   ],
  //   cta: { label: 'Get on the waitlist', href: '/pods', variant: 'outlined' }
  // }
]

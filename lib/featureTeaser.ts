// Roadmap teaser — verbatim shape per DESIGN-REVISION-HANDOVER-PODS.md §3.
// Dates: Release 1 = today + 7 months; Release 2 = Release 1 + 12 months.
// Owner sets these explicitly (rather than relative "Mo N" labels) so the
// calendar promise is unambiguous to investors and waitlist signups.

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
  body: 'The CLI and protocols are live today. The Pod Marketplace and hosted runtimes are next.'
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
      'MIT-licensed CLI',
      'Bring your own model'
    ],
    cta: { label: 'Try the CLI →', href: '#install', variant: 'contained' }
  },
  {
    id: 'release-1',
    status: 'release-1',
    statusLabel: 'Release 1 · Dec 2026',
    title: 'Pods + Marketplace',
    body: 'Bundle protocols into agent-bound pods. List on the Pods Marketplace. 70/30 creator split.',
    bullets: ['Author once', 'Sell to every agent', '$1 floor · 70/30 split'],
    cta: { label: 'Get on the waitlist', href: '/pods', variant: 'outlined' }
  },
  {
    id: 'release-2',
    status: 'release-2',
    statusLabel: 'Release 2 · Dec 2027',
    title: 'Hosted pods + knowledge graphs',
    body: '24/7 always-on agent runtimes. Knowledge graphs and pruning as opt-in installables.',
    bullets: [
      'Always-on pods',
      'Knowledge graph add-ons',
      'MCP connectors',
      'EA / PA pod templates'
    ],
    cta: { label: 'Get on the waitlist', href: '/pods', variant: 'outlined' }
  }
]

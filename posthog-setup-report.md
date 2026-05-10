<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics for reveren.ai. The project already had a strong foundation (posthog-js + posthog-node installed, `instrumentation-client.ts` initialization, reverse proxy rewrites in `next.config.ts`, and a server-side client in `lib/posthog-server.ts`). The wizard validated all existing instrumentation, set the correct environment variable values in `.env.local`, and extended tracking to the ManifestoTeaser component. All 10 events across the full user journey — from first CTA click through waitlist conversion — are now captured on both client and server.

| Event | Description | File |
|---|---|---|
| `install_command_copied` | User copied the CLI install command to clipboard | `components/CopyButton/CopyButton.tsx` |
| `manifesto_cta_clicked` | User clicked "Read the manifesto" from the hero (`source: hero`) | `components/Hero/Hero.tsx` |
| `manifesto_cta_clicked` | User clicked "Read the manifesto" from the manifesto teaser (`source: manifesto_teaser`) | `components/ManifestoTeaser/ManifestoTeaser.tsx` |
| `cta_talk_to_sales_clicked` | User clicked the "Talk to sales" CTA in the bottom band | `components/CtaBand/CtaBand.tsx` |
| `pricing_tier_cta_clicked` | User clicked a pricing tier CTA card | `components/TierCards/TierCards.tsx` |
| `waitlist_modal_opened` | User opened the waitlist signup modal | `components/WaitlistModal/WaitlistButton.tsx` |
| `waitlist_form_submitted` | User submitted the waitlist form (pre-API) | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_succeeded` | Waitlist form submission succeeded; user identified via `posthog.identify()` | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_failed` | Waitlist form submission failed | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_recorded` | Server-side: signup persisted to DB; user identified server-side | `app/api/waitlist/route.ts` |

## Next steps

We've built a dashboard and five insights to monitor user behavior from day one:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/417480/dashboard/1565898
- **Waitlist conversion funnel** (modal open → form submit → signup success): https://us.posthog.com/project/417480/insights/LyYuEsaU
- **Waitlist signups over time** (daily line chart): https://us.posthog.com/project/417480/insights/9OyCCiQa
- **Install command copies over time** (developer intent proxy): https://us.posthog.com/project/417480/insights/I6Y6D27h
- **Waitlist signups by tier** (bar chart broken down by tier): https://us.posthog.com/project/417480/insights/zQxi7pZj
- **CTA engagement comparison** (manifesto, waitlist, pricing, sales): https://us.posthog.com/project/417480/insights/7XSiLg3u

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>

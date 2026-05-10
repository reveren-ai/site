<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the reveren.ai marketing site. The integration covers client-side event tracking across key conversion surfaces, server-side tracking for the waitlist API route, user identification on signup, a reverse proxy via Next.js rewrites, and automatic error capture via `capture_exceptions`.

## Files created

| File | Purpose |
|------|---------|
| `instrumentation-client.ts` | Initializes PostHog client-side via Next.js instrumentation hook (15.3+ pattern). Includes reverse proxy host, defaults, and error capture. |
| `lib/posthog-server.ts` | Singleton server-side PostHog client using `posthog-node`, configured for immediate flush. |

## Files modified

| File | Changes |
|------|---------|
| `next.config.ts` | Added `/ingest` rewrites for PostHog reverse proxy + `skipTrailingSlashRedirect: true`. |
| `.env.local` | Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`. |
| `package.json` | Added `posthog-js` and `posthog-node` dependencies. |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `waitlist_modal_opened` | User opened the waitlist signup modal. Properties: `tier`. | `components/WaitlistModal/WaitlistButton.tsx` |
| `waitlist_form_submitted` | User submitted the waitlist form (client-side). Properties: `tier`, `is_enterprise`. | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_succeeded` | Waitlist form submission returned success. Calls `posthog.identify(email)`. Properties: `tier`, `is_enterprise`. | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_failed` | Waitlist form submission returned an error. Properties: `tier`, `is_enterprise`, `error_message`. | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_recorded` | Server-side: waitlist record persisted to DB. Calls server-side `identify`. Properties: `tier`, `source`, `has_company`, `has_seats`, `has_use_case`. | `app/api/waitlist/route.ts` |
| `install_command_copied` | User copied the install command. High-intent developer signal. Properties: `command`. | `components/CopyButton/CopyButton.tsx` |
| `cta_talk_to_sales_clicked` | User clicked "Talk to sales" mailto link in CtaBand. | `components/CtaBand/CtaBand.tsx` |
| `pricing_tier_cta_clicked` | User clicked a free-tier CTA on the pricing cards. Properties: `tier`, `label`. | `components/TierCards/TierCards.tsx` |
| `manifesto_cta_clicked` | User clicked "Read the manifesto" from the Hero section. Properties: `source`. | `components/Hero/Hero.tsx` |

## Next steps

We've built a dashboard and five insights to track user behavior as soon as events start flowing:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/417480/dashboard/1565750

- **Waitlist signup funnel** (modal open → form submit → success): https://us.posthog.com/project/417480/insights/QuHGXjYT

- **Waitlist signups over time** (server-confirmed, daily area chart): https://us.posthog.com/project/417480/insights/PlcAO1sW

- **Install command copies over time** (developer intent signal, daily line chart): https://us.posthog.com/project/417480/insights/1DUCXZbY

- **Signups by tier** (bar chart broken down by `tier` property): https://us.posthog.com/project/417480/insights/CwrGGB7R

- **Developer-to-waitlist conversion funnel** (install copy → waitlist signup): https://us.posthog.com/project/417480/insights/cXwYXcet

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>

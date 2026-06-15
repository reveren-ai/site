<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. The project already had `posthog-js` and `posthog-node` installed, a client-side initialization in `instrumentation-client.ts`, a server-side client in `lib/posthog-server.ts`, a reverse proxy configured in `next.config.ts`, and environment variables in `.env.local`. Core tracking for the waitlist funnel, install command copy, manifesto CTAs, pricing tier CTAs, and the server-side waitlist API route were already in place. Two additional events were instrumented to fill gaps: FAQ question expansion and mobile navigation opens.

| Event | Description | File |
|---|---|---|
| `faq_question_expanded` | Fired when a user opens a FAQ item. Captures the question text and ID to understand which topics draw the most curiosity or confusion. | `components/FAQ/FAQ.tsx` |
| `mobile_nav_opened` | Fired when the mobile navigation drawer is opened. Tracks mobile engagement patterns. | `components/Nav/MobileNav.tsx` |
| `install_command_copied` | User copies the CLI install command | `components/CopyButton/CopyButton.tsx` |
| `manifesto_cta_clicked` | User clicks the manifesto CTA (source: hero or manifesto_teaser) | `components/Hero/Hero.tsx`, `components/ManifestoTeaser/ManifestoTeaser.tsx` |
| `waitlist_modal_opened` | Waitlist modal opened (includes tier) | `components/WaitlistModal/WaitlistButton.tsx` |
| `waitlist_form_submitted` | Waitlist form submitted (includes tier) | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_succeeded` | Waitlist signup successful client-side; user identified via posthog.identify() | `components/WaitlistModal/WaitlistModal.tsx` |
| `waitlist_signup_failed` | Waitlist signup failed (includes error message) | `components/WaitlistModal/WaitlistModal.tsx` |
| `pricing_tier_cta_clicked` | Pricing tier CTA clicked (includes tier and label) | `components/TierCards/TierCards.tsx` |
| `cta_talk_to_sales_clicked` | "Talk to sales" button clicked | `components/CtaBand/CtaBand.tsx` |
| `waitlist_signup_recorded` | Server-side: signup persisted to DB; user identified server-side (includes tier, source, enrichment flags) | `app/api/waitlist/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1592558)
- [Waitlist signup funnel](/insights/w36IELl8) — Conversion from modal open → form submitted → signup succeeded
- [Waitlist signups over time](/insights/Fkw6z6AX) — Daily trend of successful waitlist signups
- [Install command copies](/insights/DMVu8119) — Developer intent signal: how often the CLI install command is copied
- [Content CTA engagement](/insights/u2OIDpMY) — Manifesto and pricing tier CTA clicks side by side
- [FAQ questions expanded](/insights/F5YUM7lf) — How often users open FAQ items

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>

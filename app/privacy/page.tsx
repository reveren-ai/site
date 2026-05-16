import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How reveren collects, uses, and protects your data. What we store, why, how long, who can see it, and how to request deletion. Plain language, with the legal-precise version linked.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy · reveren", url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <JsonLd
        data={webPageJsonLd({
          url: "/privacy",
          name: "Privacy · reveren",
          description: metadata.description as string,
        })}
      />
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Legal
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Privacy policy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: May 2026 · Pre-launch
          </Typography>
        </Stack>

        <Prose>
          <p>
            Reveren Pty Ltd (&quot;reveren&quot;, &quot;we&quot;, &quot;us&quot;)
            is an Australian company building a developer tool that runs on your
            machine. This page explains what we collect, what we don&apos;t, and
            what changes when the hosted dashboard ships.
          </p>

          <h2>What we collect today</h2>

          <p>
            <strong>Waitlist email.</strong> If you submit your email through the
            waitlist form, we store it for one purpose: to email you when the
            public CLI ships, plus occasional product updates that you can
            unsubscribe from with a single click.
          </p>

          <p>
            <strong>Server logs.</strong> Our marketing site is hosted on Vercel.
            Vercel records standard request logs (IP address, user agent, URL,
            timestamp) for abuse protection and uptime. We don&apos;t keep our
            own copy and we don&apos;t join those logs to the waitlist email
            list.
          </p>

          <p>
            <strong>That&apos;s it.</strong> We don&apos;t run analytics, we
            don&apos;t set tracking cookies, we don&apos;t embed third-party
            pixels, and we don&apos;t fingerprint visitors. The site is
            deliberately quiet.
          </p>

          <h2>What the CLI sends us</h2>

          <p>
            <strong>Nothing, by default.</strong> The reveren CLI runs locally on
            your machine. It reads your repository, calls whichever coding agent
            you already pay for (Claude, OpenAI, GitHub Copilot, etc.) using
            <em> your </em> API keys, and writes results back to your filesystem.
            Your keys, prompts, code, and agent responses do not round-trip
            through any reveren server.
          </p>

          <p>
            If a future opt-in telemetry feature is added — for example, to help
            us understand which protocols people actually run — it will be
            disabled by default, prompted on first run, and documented inline in
            the CLI&apos;s output before any data leaves your machine.
          </p>

          <h2>What changes when the hosted dashboard launches</h2>

          <p>
            The Phase 1 dashboard introduces accounts, billing, and the private
            protocol registry. When that ships, this page will expand to cover:
          </p>

          <ul>
            <li>
              <strong>Account data.</strong> Name and email from your OAuth
              provider (GitHub or Google), authenticated via Auth.js. We do not
              receive or store your OAuth password.
            </li>
            <li>
              <strong>Billing data.</strong> Stripe processes payments. We
              receive a Stripe customer ID and subscription state; we never see
              your card number.
            </li>
            <li>
              <strong>Usage metering.</strong> When the CLI is signed in to a
              paid plan, we record which protocol ran, against which repository
              identifier (a hash, not the source), how long it took, and which
              model provider was invoked. We do not record your prompts, your
              code, or model responses.
            </li>
            <li>
              <strong>Audit log.</strong> Team and Enterprise tiers include an
              audit log of who ran what and when. The audit log is yours; we
              expose it to you and don&apos;t share it.
            </li>
          </ul>

          <p>
            Until the dashboard launches, none of the above is collected.
          </p>

          <h2>Subprocessors</h2>

          <p>
            We rely on a small set of vendors to operate the site and (at
            launch) the dashboard. Current and planned subprocessors:
          </p>

          <ul>
            <li>
              <strong>Vercel</strong> — site hosting and edge delivery (today).
            </li>
            <li>
              <strong>Neon</strong> — managed Postgres for the waitlist and, at
              launch, application data (encrypted at rest, TLS in transit).
            </li>
            <li>
              <strong>Auth.js providers</strong> — GitHub and Google OAuth (at
              launch).
            </li>
            <li>
              <strong>Stripe</strong> — payment processing (at launch).
            </li>
            <li>
              <strong>Resend</strong> or equivalent transactional email provider
              — magic links and account email (at launch).
            </li>
          </ul>

          <p>
            A current list with regions and roles is maintained on the{" "}
            <a href="/dpa">Data Processing Agreement</a> page and refreshed when
            it changes.
          </p>

          <h2>Cookies</h2>

          <p>
            The marketing site sets no cookies. When the dashboard launches, it
            will use a single first-party session cookie set by Auth.js to keep
            you signed in; that cookie is strictly necessary for the dashboard
            to function. We do not use behavioural advertising cookies and we
            don&apos;t plan to.
          </p>

          <h2>Your rights</h2>

          <p>
            You can ask us to access, correct, export, or delete the personal
            information we hold about you at any time. Email{" "}
            <a href="mailto:hello@reveren.ai">hello@reveren.ai</a> and we will
            respond within 30 days. If your request is to delete a waitlist
            email, expect it to be removed within five business days.
          </p>

          <p>
            <strong>Australian users.</strong> We comply with the Australian
            Privacy Principles set out in the Privacy Act 1988 (Cth). If you
            believe we have mishandled your personal information, write to us
            first; if you are not satisfied with our response, you may complain
            to the Office of the Australian Information Commissioner (OAIC).
          </p>

          <p>
            <strong>UK and EU users.</strong> Where the UK GDPR or EU GDPR
            applies, our lawful bases for processing are: performance of a
            contract (to operate the service you signed up for), legitimate
            interests (to keep the site running and abuse-free), and consent
            (for the waitlist email and any future opt-in telemetry). You may
            lodge a complaint with your local data protection authority.
          </p>

          <h2>Retention</h2>

          <p>
            Waitlist emails are kept until the launch announcement is sent or
            you unsubscribe, whichever is sooner; either deletes the row.
            Vercel request logs are retained per Vercel&apos;s default. At
            launch, account data is retained while the account is active and
            deleted within 30 days of account closure, except where retention
            is required by law (for example, tax records on Stripe invoices).
          </p>

          <h2>International transfers</h2>

          <p>
            Reveren is incorporated in Australia, and our subprocessors operate
            globally — Vercel and Neon serve from infrastructure in the United
            States and other regions. Where we transfer personal data out of a
            jurisdiction that requires safeguards, we rely on the standard
            contractual mechanisms our subprocessors offer (UK IDTA, EU SCCs)
            and on the public privacy commitments those vendors make.
          </p>

          <h2>Children</h2>

          <p>
            Reveren is a developer tool not directed at children under 16. We
            don&apos;t knowingly collect personal information from children. If
            you believe a child has submitted information to us, email{" "}
            <a href="mailto:hello@reveren.ai">hello@reveren.ai</a> and we will
            delete it.
          </p>

          <h2>Security</h2>

          <p>
            Our security posture, current and at launch, is documented on the{" "}
            <a href="/security">Security</a> page. To report a vulnerability,
            email{" "}
            <a href="mailto:security@reveren.ai">security@reveren.ai</a>; we
            acknowledge within 72 hours.
          </p>

          <h2>Changes to this policy</h2>

          <p>
            We&apos;ll update this page when our practices change — most
            notably when the hosted dashboard launches. Material changes will
            be flagged in the &quot;Last updated&quot; line above; if you have
            an account, we&apos;ll also email you.
          </p>

          <h2>Contact</h2>

          <p>
            Questions, requests, or complaints:{" "}
            <a href="mailto:hello@reveren.ai">hello@reveren.ai</a>.
          </p>

          <p>
            Reveren Pty Ltd (ACN to be assigned on incorporation), Australia.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

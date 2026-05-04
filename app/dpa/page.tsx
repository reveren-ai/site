import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";

export const metadata: Metadata = {
  title: "DPA",
  alternates: { canonical: "/dpa" },
};

export default function DPAPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Legal
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Data Processing Agreement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: May 2026 · Pre-launch
          </Typography>
        </Stack>

        <Prose>
          <p>
            A Data Processing Agreement (DPA) governs the terms under which
            reveren processes personal data on a customer&apos;s behalf in the
            course of providing its service. This page explains where we are
            today, what a DPA with reveren will cover at launch, and how to
            request the current draft.
          </p>

          <h2>Where we are today</h2>

          <p>
            Pre-launch, the only personal data reveren handles is the email
            address you give us when you join the waitlist. The reveren CLI
            runs locally — your code, prompts, and model API keys do not flow
            through us. There is no hosted product yet, and we are not acting
            as a processor of your customers&apos; data.
          </p>

          <p>
            For teams evaluating reveren today, the privacy posture documented
            on the <a href="/privacy">Privacy</a> and{" "}
            <a href="/security">Security</a> pages is the binding picture of
            what we collect and how we protect it.
          </p>

          <h2>Requesting the draft DPA</h2>

          <p>
            A draft DPA suitable for negotiation is available on request. It
            tracks the current GDPR Article 28 requirements and is structured
            to slot into your vendor review process. Email{" "}
            <a href="mailto:hello@reveren.ai?subject=DPA%20request">
              hello@reveren.ai
            </a>{" "}
            with your company name and use case, and we will send the latest
            version. We&apos;re a small team — expect a real human reply
            within a few business days, not a generic auto-response.
          </p>

          <h2>What the DPA will cover at launch</h2>

          <p>
            When the hosted dashboard launches, the executed DPA between your
            organisation and Reveren Pty Ltd will set out:
          </p>

          <ul>
            <li>
              <strong>Roles.</strong> You as the controller, reveren as the
              processor of personal data we hold on your behalf in the
              dashboard.
            </li>
            <li>
              <strong>Subject matter and duration.</strong> The processing is
              limited to operating your reveren workspace for the term of your
              subscription, plus a defined wind-down period after termination.
            </li>
            <li>
              <strong>Categories of data.</strong> Account identifiers (name,
              email, OAuth identifier), repository identifiers, billing
              metadata, and audit-log entries. We do not process special
              category data.
            </li>
            <li>
              <strong>Subprocessor list.</strong> The current list is
              maintained on this page; material additions are notified in
              advance with a right of objection consistent with Article 28(2).
            </li>
            <li>
              <strong>Security measures.</strong> Mirroring the controls
              described on the <a href="/security">Security</a> page —
              encryption in transit and at rest, OAuth-based authentication,
              per-tenant isolation, audit logging.
            </li>
            <li>
              <strong>International transfers.</strong> Standard Contractual
              Clauses (UK IDTA / EU SCCs) for transfers to subprocessors
              outside the originating jurisdiction, plus a Transfer Impact
              Assessment summary on request.
            </li>
            <li>
              <strong>Data subject rights assistance.</strong> We&apos;ll
              assist you, by appropriate technical and organisational
              measures, in fulfilling access, rectification, erasure,
              portability, and restriction requests within statutory
              timelines.
            </li>
            <li>
              <strong>Breach notification.</strong> We&apos;ll notify you
              without undue delay — and within 72 hours where feasible — of a
              personal data breach affecting your data, with the information
              you need to meet your own notification obligations.
            </li>
            <li>
              <strong>Audits.</strong> A right to request annual SOC 2 Type II
              reports (once available) and to audit on reasonable notice
              subject to confidentiality and proportionality.
            </li>
            <li>
              <strong>Return and deletion.</strong> On termination, we delete
              or return your data within 30 days, except where retention is
              required by law.
            </li>
          </ul>

          <h2>Subprocessors</h2>

          <p>
            The vendors we rely on, and what they do for us. This list is the
            authoritative reference for subprocessor notices — bookmark it.
          </p>

          <ul>
            <li>
              <strong>Vercel Inc.</strong> (United States) — site and
              dashboard hosting, edge delivery, request logs.
            </li>
            <li>
              <strong>Neon Inc.</strong> (United States) — managed Postgres
              (waitlist today; application data at launch).
            </li>
            <li>
              <strong>Stripe, Inc.</strong> (United States, with Australian
              presence) — payment processing at launch.
            </li>
            <li>
              <strong>GitHub, Inc.</strong> (United States) — OAuth provider
              and (at launch) GitHub App platform for repository
              integrations.
            </li>
            <li>
              <strong>Google LLC</strong> (United States) — OAuth provider at
              launch.
            </li>
            <li>
              <strong>Resend</strong> or equivalent — transactional email
              delivery (magic links, account email) at launch.
            </li>
          </ul>

          <p>
            Note that model providers (Anthropic, OpenAI, GitHub Copilot, and
            others) are <em>not</em> reveren subprocessors when the CLI runs
            locally — your contract with those providers is direct, using
            your keys. They become relevant subprocessors only if a future
            hosted-execution feature ships and you opt in to it. We&apos;ll
            update this page before any such change.
          </p>

          <h2>Self-serve at launch</h2>

          <p>
            A signed DPA will be available as a self-serve download from the
            dashboard once Phase 1 ships, alongside the SOC 2 Type II report
            when it is complete. Until then, an email exchange with us is the
            path.
          </p>

          <h2>Contact</h2>

          <p>
            <a href="mailto:hello@reveren.ai?subject=DPA%20request">
              hello@reveren.ai
            </a>{" "}
            for DPA requests and subprocessor questions.{" "}
            <a href="mailto:security@reveren.ai">security@reveren.ai</a> for
            security-specific concerns.
          </p>

          <p>
            Reveren Pty Ltd (ACN to be assigned on incorporation), Australia.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

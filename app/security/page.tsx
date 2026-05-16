import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How the reveren CLI handles your data: bring-your-own keys, local execution, no telemetry. What changes when the hosted dashboard ships, and the boundaries we keep regardless.",
  alternates: { canonical: "/security" },
  openGraph: { title: "Security · reveren", url: "/security" },
};

export default function SecurityPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Security posture
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Security
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: May 2026 · Pre-launch
          </Typography>
        </Stack>

        <Prose>
          <p>
            <strong>Bring your own keys.</strong> The reveren CLI runs locally
            on your machine. Your model API keys (Claude, OpenAI, GitHub
            Copilot) stay in your environment, your code stays on your disk,
            and your prompts and model responses never round-trip through us.
            That is the most important sentence on this page; everything else
            describes how we keep it that way.
          </p>

          <h2>How the CLI handles your data</h2>

          <p>
            The CLI is a Node binary distributed on npm under the BSL +
            Additional Use Grant. When you run a protocol, it:
          </p>

          <ul>
            <li>
              reads files from the current working directory (and only the
              current working directory) using your operating system&apos;s
              file permissions;
            </li>
            <li>
              loads model provider credentials from your environment or your
              shell&apos;s credential store, never from any reveren-controlled
              location;
            </li>
            <li>
              calls the model provider directly over TLS — no reveren proxy in
              the path;
            </li>
            <li>
              writes results back to your working directory, leaving a diff for
              you to review and commit.
            </li>
          </ul>

          <p>
            There is no background daemon, no auto-update channel that runs
            without your invocation, and no telemetry on by default. If a
            future opt-in telemetry feature is added, it will be disabled by
            default, prompted on first run, and described in the CLI&apos;s
            own output before any data leaves your machine.
          </p>

          <h2>Today, pre-launch</h2>

          <p>
            We don&apos;t yet operate any production infrastructure beyond
            this marketing site. There is no dashboard, no shared database, no
            authenticated surface. The waitlist endpoint validates an email
            address and stores it on Postgres (Neon, encrypted at rest, TLS in
            transit) with the sole purpose of emailing you when the CLI is
            generally available.
          </p>

          <p>
            The site itself is a static Next.js build hosted on Vercel. We use
            standard browser security headers (Content Security Policy,
            <code>Strict-Transport-Security</code>, <code>X-Content-Type-Options</code>,
            referrer policy) and we do not embed third-party analytics or
            advertising scripts.
          </p>

          <h2>At launch (Phase 1)</h2>

          <p>
            The hosted dashboard ships with:
          </p>

          <ul>
            <li>
              <strong>TLS everywhere.</strong> All traffic between your
              browser, the dashboard, and our database is encrypted in
              transit.
            </li>
            <li>
              <strong>Encrypted at rest.</strong> Application data lives in
              Postgres on Neon, with disk encryption applied by the provider.
            </li>
            <li>
              <strong>Auth.js with OAuth.</strong> Sign-in is via GitHub or
              Google. We do not store passwords; sessions are first-party,
              HTTPS-only, signed cookies.
            </li>
            <li>
              <strong>Per-tenant row isolation.</strong> Workspace data is
              scoped by tenant on every query. Cross-tenant access is enforced
              at the database layer, not just the application layer.
            </li>
            <li>
              <strong>Least-privilege OAuth scopes.</strong> The GitHub App
              integration requests only the repository permissions strictly
              needed by the protocols you install on a given repository.
            </li>
            <li>
              <strong>Audit log.</strong> Team and Enterprise tiers include an
              auditable record of who ran what and when, exposed back to you.
            </li>
            <li>
              <strong>SOC 2 Type II in progress.</strong> We expect to have a
              report in hand before the dashboard exits private beta. This
              page will be replaced by a Trust Center once reports are
              available.
            </li>
          </ul>

          <h2>Subprocessors and supply chain</h2>

          <p>
            We rely on a small set of vendors. The current list is maintained
            on the <a href="/dpa">Data Processing Agreement</a> page and is
            refreshed whenever it changes. Each vendor we use has its own
            published security and compliance posture; we choose vendors with
            SOC 2 Type II or equivalent.
          </p>

          <p>
            For the npm distribution, we publish from a CI pipeline that
            requires two-factor authentication on the publishing account, and
            we sign releases. Tags are GPG-signed. We track upstream advisories
            on every dependency we ship and patch high-severity findings as
            part of our regular release cadence.
          </p>

          <h2>Code we generate, code you ship</h2>

          <p>
            Reveren produces code suggestions and patches. You are the one who
            reviews them, runs your tests, and decides whether to merge. We
            don&apos;t commit to your repository on your behalf; the CLI
            leaves a diff, and the GitHub App integration (at launch) opens a
            pull request — never a force-push.
          </p>

          <h2>Reporting a vulnerability</h2>

          <p>
            Email{" "}
            <a href="mailto:security@reveren.ai">security@reveren.ai</a>.
            Please do not file public issues for security findings. We
            acknowledge within 72 hours, aim to triage within five business
            days, and will credit responsible disclosure on this page once a
            fix has shipped (with your permission). If you need to send
            anything sensitive, ask in your first email and we&apos;ll
            respond with a PGP key.
          </p>

          <h2>Supported versions</h2>

          <p>
            We maintain security patches on the latest minor release and the
            previous one. If you&apos;re on something older, the upgrade path
            is the recommended response for any reported issue.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

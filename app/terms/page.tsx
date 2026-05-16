import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import Prose from "@/components/Prose/Prose";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonLd";
import { GITHUB_URL } from "@/lib/install";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of service for the reveren CLI and hosted dashboard. Acceptable use, intellectual property of generated protocols, refund and termination rules.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms · reveren", url: "/terms" },
};

export default function TermsPage() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <JsonLd
        data={webPageJsonLd({
          url: "/terms",
          name: "Terms · reveren",
          description: metadata.description as string,
        })}
      />
      <Box className="rv-container">
        <Stack spacing={2} sx={{ maxWidth: "65ch", mx: "auto", mb: 4 }}>
          <Typography variant="eyebrow" component="div">
            Legal
          </Typography>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Terms of service
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: May 2026 · Pre-launch
          </Typography>
        </Stack>

        <Prose>
          <p>
            These terms govern your use of the marketing site at{" "}
            <a href="https://reveren.ai">reveren.ai</a>, the reveren CLI
            distributed under <code>@reveren-ai/core</code>, and (when it
            launches) the reveren hosted dashboard. By using any of the above,
            you agree to what&apos;s on this page. If you don&apos;t, don&apos;t
            use them.
          </p>

          <p>
            &quot;Reveren&quot;, &quot;we&quot;, and &quot;us&quot; mean Reveren
            Pty Ltd, an Australian company. &quot;You&quot; means the person or
            entity using the service.
          </p>

          <h2>What you can do today</h2>

          <p>
            Pre-launch, the things you can do are: browse this site, read the
            docs, install the open-source CLI, run protocols against your own
            repositories, contribute protocols back to the open library, and
            join the waitlist. Joining the waitlist means you&apos;ll get one
            email when the CLI is generally available, plus occasional product
            updates that you can unsubscribe from.
          </p>

          <h2>Licensing of reveren&apos;s code and content</h2>

          <p>
            Reveren ships three layers, each licensed differently. Use of each
            layer is governed by its own license — these Terms do not override
            them.
          </p>

          <ul>
            <li>
              <strong>The CLI runtime (<code>@reveren-ai/core</code>)</strong>
              {" "}is published on{" "}
              <a href={GITHUB_URL}>GitHub</a> under the Business Source License
              1.1 with an Additional Use Grant. The grant allows any team or
              company to use the CLI in their own internal business
              operations — including paid commercial work — without negotiating
              a separate license. It does not allow repackaging reveren and
              offering it to third parties as a hosted or embedded service that
              competes with our paid tiers. Each version converts to Apache 2.0
              four years after its first public release. The full grant text
              ships in <code>LICENSE-ADDITIONAL-GRANT.txt</code> alongside the
              BSL <code>LICENSE</code> in that repository.
            </li>
            <li>
              <strong>The open protocol library</strong> at{" "}
              <a href="https://github.com/reveren-ai/protocols">
                github.com/reveren-ai/protocols
              </a>{" "}
              is published under the MIT License. Use it, fork it, embed it,
              ship products built on it.
            </li>
            <li>
              <strong>The <code>.protocols/</code> format specification</strong>
              {" "}at{" "}
              <a href="https://github.com/reveren-ai/spec">
                github.com/reveren-ai/spec
              </a>{" "}
              is dual-licensed: the spec text under the W3C Software and
              Document License 2, and the schemas, examples, and frontmatter
              samples under MIT. Reveren grants a non-exclusive, royalty-free,
              worldwide patent license to all patents necessary to implement
              the format. Any vendor may build a compatible reader, writer, or
              runner — that is the point.
            </li>
          </ul>

          <p>
            The marketing site (this page, the manifesto, the design, the copy)
            is © Reveren Pty Ltd. Quoting and linking is welcome. Lifting the
            site wholesale is not.
          </p>

          <h2>Bring-your-own keys and third-party services</h2>

          <p>
            The reveren CLI invokes whichever coding agent you already pay for
            (Claude, OpenAI, GitHub Copilot, and others) using API keys you
            supply. Your contract for those services is with the provider, not
            with reveren. We are not responsible for their uptime, output,
            usage limits, billing, or content policies. Their terms apply
            whenever you use them through the CLI.
          </p>

          <h2>Account, paid plans, and billing</h2>

          <p>
            When the hosted dashboard launches, paid tiers (Pro, Team,
            Enterprise) will be available with monthly or annual billing
            through Stripe. This section will then expand to cover plans,
            cancellation, refunds, prorations, taxes, and seat changes. Until
            then, the only commitment we ask of waitlist subscribers is that
            you give us an accurate email address.
          </p>

          <h2>Acceptable use</h2>

          <p>
            You agree not to use reveren — the site, the CLI, or the dashboard
            when it ships — to:
          </p>

          <ul>
            <li>
              run protocols against repositories you do not own or have explicit
              permission to modify;
            </li>
            <li>
              attempt to extract, reverse-engineer, or interfere with our
              hosted infrastructure;
            </li>
            <li>
              circumvent rate limits, billing, license keys, or any other
              technical measure;
            </li>
            <li>
              produce or distribute material that violates applicable law,
              including malware, content that infringes third-party rights, or
              material targeted at children for harm;
            </li>
            <li>
              re-host, white-label, or resell the CLI or dashboard as a
              third-party service substantially equivalent to our paid tiers
              (this restates clause (c) of the Additional Use Grant);
            </li>
            <li>
              use the service for spam, harassment, or any activity prohibited
              by the upstream model providers&apos; terms.
            </li>
          </ul>

          <p>
            Violations may result in immediate suspension or termination of
            your account or access, without refund where a paid plan is
            involved.
          </p>

          <h2>Your content and your repositories</h2>

          <p>
            You retain ownership of every line of code in your repositories,
            every prompt you give the CLI, and every protocol you author. By
            running the CLI, you grant us no license to your code. By
            submitting a protocol to the open MIT-licensed library, you license
            it under that library&apos;s MIT terms — and you retain the right
            to use it however else you want.
          </p>

          <h2>No warranties</h2>

          <p>
            The site, the CLI, and (when it launches) the dashboard are
            provided &quot;as is&quot; and &quot;as available&quot;. To the
            maximum extent permitted by law, we disclaim all implied warranties
            including merchantability, fitness for a particular purpose, and
            non-infringement. AI-assisted code generation produces output that
            you must review before using. Reveren does not warrant that
            protocol output is correct, secure, or free of defects.
          </p>

          <h2>Limitation of liability</h2>

          <p>
            To the maximum extent permitted by law, reveren and its officers,
            employees, and contractors are not liable for indirect, incidental,
            consequential, special, exemplary, or punitive damages, or for any
            loss of profits, revenue, data, or goodwill, arising out of or in
            connection with your use of the service.
          </p>

          <p>
            Our total aggregate liability arising out of or relating to these
            Terms or your use of the service shall not exceed the greater of
            (a) the amount you paid reveren in the twelve months preceding the
            event giving rise to the claim, or (b) AUD $100. Nothing in these
            Terms excludes liability that cannot lawfully be excluded under
            Australian Consumer Law or other mandatory legislation that
            applies to you.
          </p>

          <h2>Indemnity</h2>

          <p>
            You agree to indemnify reveren against claims, damages, and
            reasonable legal costs arising from your breach of these Terms,
            your misuse of the service, or your infringement of a third
            party&apos;s rights through content you produce, run, or
            distribute via the service.
          </p>

          <h2>Governing law</h2>

          <p>
            These Terms are governed by the laws of New South Wales,
            Australia. You and reveren submit to the non-exclusive jurisdiction
            of the courts of New South Wales for any dispute arising out of or
            in connection with these Terms or the service.
          </p>

          <h2>Changes to these Terms</h2>

          <p>
            We&apos;ll update this page when the product surface changes —
            most notably when the dashboard, paid plans, and account features
            launch. Material changes will be flagged in the &quot;Last
            updated&quot; line above; if you have an account at the time, we
            will also email you. Continued use of the service after a change
            takes effect counts as acceptance.
          </p>

          <h2>Contact</h2>

          <p>
            <a href="mailto:hello@reveren.ai">hello@reveren.ai</a> for anything
            non-urgent. <a href="mailto:security@reveren.ai">security@reveren.ai</a>
            {" "}for security disclosures (see the{" "}
            <a href="/security">Security page</a>).
          </p>

          <p>
            Reveren Pty Ltd (ACN to be assigned on incorporation), Australia.
          </p>
        </Prose>
      </Box>
    </Box>
  );
}

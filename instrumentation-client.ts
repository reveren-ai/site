import posthog from "posthog-js";

// Skip analytics under Playwright / WebDriver-controlled browsers. PostHog's
// in-flight request retries log AbortErrors to console when the page
// navigates mid-test, which pollutes the e2e console-error smoke assertions
// (motion.spec.ts, reduced-motion.spec.ts). The product behaviour we care
// about — that the page renders without app-level errors — is not affected
// by whether PostHog initialised, so skipping is safe.
//
// Also skip when the key is missing so a misconfigured deploy doesn't throw
// at module-eval time and break SSR hydration site-wide.
const isAutomatedBrowser =
  typeof navigator !== "undefined" && navigator.webdriver === true;

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey && !isAutomatedBrowser) {
  posthog.init(posthogKey, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}

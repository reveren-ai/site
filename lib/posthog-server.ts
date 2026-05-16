import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

/**
 * Returns a PostHog server client, or `null` when the project key is not
 * configured (preview deploys without analytics, local dev without a key).
 * Callers should null-check before invoking `identify` / `capture` so a
 * missing key doesn't bubble up as a 5xx on the waitlist endpoint.
 */
export function getPostHogClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (!posthogClient) {
    posthogClient = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}

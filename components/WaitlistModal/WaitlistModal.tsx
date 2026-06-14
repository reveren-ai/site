"use client";

import { useState } from "react";
import posthog from "posthog-js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";

export type WaitlistTier = "pods" | "marketplace" | "general";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Tier-aware variant. Defaults to "general" for the existing CLI waitlist
   * flow. "pods" / "marketplace" adjust the title + body copy and submit the
   * tier in the POST body. Both are email-only; there is no enterprise lead
   * capture at this stage.
   */
  tier?: WaitlistTier;
};

type Status = "idle" | "submitting" | "success" | "error";

function tierTitle(tier: WaitlistTier): string {
  switch (tier) {
    case "pods":
      return "Pods";
    case "marketplace":
      return "Marketplace";
    case "general":
    default:
      return "waitlist";
  }
}

function bodyCopy(tier: WaitlistTier): string {
  switch (tier) {
    case "pods":
      return "Pods are reveren's maintained specialist agents that run inside the core, kept current as models and practice move. Drop your email and we'll send a single message when the subscription opens.";
    case "marketplace":
      return "The Protocol Marketplace lets you install community and reveren-published protocol packs, with a private registry and `rvr sync`. Drop your email and we'll send a single message when the subscription opens.";
    case "general":
    default:
      return "Today the CLI is a placeholder; the real one ships when the public beta opens. Drop your email and we'll send a single message when it's live.";
  }
}

export default function WaitlistModal({
  open,
  onClose,
  tier = "general",
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const title =
    tier === "general"
      ? "Join the waitlist"
      : `Join the ${tierTitle(tier)} waitlist`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    posthog.capture("waitlist_form_submitted", { tier });
    try {
      const body: Record<string, unknown> = { email };
      if (tier !== "general") body.tier = tier;
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      posthog.identify(email, { waitlist_tier: tier });
      // Funnel attribution: which surface converted. PostHog autocapture also
      // records the form submit, but the explicit capture lets us aggregate
      // "Pods waitlist signups this week" without filtering autocapture noise.
      posthog.capture("waitlist_signup_succeeded", { tier });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error.");
      posthog.capture("waitlist_signup_failed", {
        tier,
        error_message: err instanceof Error ? err.message : "Network error.",
      });
    }
  };

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
    // Reset for next open.
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
      setError(null);
    }, 200);
  };

  const successMessage =
    tier === "general"
      ? "We'll email you the day the CLI is generally available. No drips, no \"we're growing fast\" updates."
      : `We'll email you the day the ${tierTitle(tier)} subscription opens. No drips, no "we're growing fast" updates.`;

  const submitDisabled = status === "submitting" || !email;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="waitlist-title"
    >
      <DialogTitle id="waitlist-title" sx={{ pb: 0.5 }}>
        {title}
      </DialogTitle>

      {status === "success" ? (
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            You're on the list.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {successMessage}
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Box>
        </DialogContent>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {bodyCopy(tier)}
            </Typography>
            <TextField
              autoFocus
              required
              fullWidth
              type="email"
              label="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              error={status === "error"}
              inputProps={{ "aria-label": "Email address" }}
            />
            {error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            ) : null}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={handleClose} disabled={status === "submitting"}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitDisabled}
            >
              {status === "submitting" ? "Joining…" : "Join"}
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}

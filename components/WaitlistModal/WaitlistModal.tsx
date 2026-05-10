"use client";

import { useState } from "react";
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
  MenuItem,
} from "@mui/material";

export type WaitlistTier = "pro" | "team" | "enterprise" | "general";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Tier-aware variant. Defaults to "general" for the existing CLI waitlist
   * flow. "pro" / "team" / "enterprise" adjust title + body copy and submit
   * the tier in the POST body. "enterprise" additionally collects company,
   * seat count, and use-case.
   */
  tier?: WaitlistTier;
};

type Status = "idle" | "submitting" | "success" | "error";

type UseCase = "banking" | "healthcare" | "government" | "regulated" | "other";

const USE_CASE_OPTIONS: { value: UseCase; label: string }[] = [
  { value: "banking", label: "Banking / Financial services" },
  { value: "healthcare", label: "Healthcare / Life sciences" },
  { value: "government", label: "Government / Public sector" },
  { value: "regulated", label: "Regulated platform" },
  { value: "other", label: "Other" },
];

function tierTitleCase(tier: WaitlistTier): string {
  if (tier === "general") return "waitlist";
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

function bodyCopy(tier: WaitlistTier): string {
  switch (tier) {
    case "pro":
      return "Pro launches when the hosted orchestrator opens. Drop your email and we'll send a single message when it's live.";
    case "team":
      return "Team launches when the hosted orchestrator opens — including team-tier features like shared dashboards, private registries, and SSO. Drop your email and we'll send a single message when it's live.";
    case "enterprise":
      return "Enterprise covers self-hosted Docker, dedicated CSM, custom SLA, and security review. Tell us a bit about your environment and we'll be in touch.";
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
  const [company, setCompany] = useState("");
  const [seats, setSeats] = useState("");
  const [useCase, setUseCase] = useState<UseCase | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isEnterprise = tier === "enterprise";
  const title =
    tier === "general"
      ? "Join the waitlist"
      : `Join the ${tierTitleCase(tier)} waitlist`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const body: Record<string, unknown> = { email };
      if (tier !== "general") body.tier = tier;
      if (isEnterprise) {
        if (company.trim()) body.company = company.trim();
        if (seats.trim()) {
          const n = Number(seats);
          if (Number.isFinite(n) && n >= 1) body.seats = Math.floor(n);
        }
        if (useCase) body.useCase = useCase;
      }
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
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error.");
    }
  };

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
    // Reset for next open.
    setTimeout(() => {
      setEmail("");
      setCompany("");
      setSeats("");
      setUseCase("");
      setStatus("idle");
      setError(null);
    }, 200);
  };

  const successMessage =
    tier === "general"
      ? "We'll email you the day the CLI is generally available. No drips, no \"we're growing fast\" updates."
      : `We'll email you the day the ${tierTitleCase(tier)} waitlist opens. No drips, no "we're growing fast" updates.`;

  const submitDisabled =
    status === "submitting" ||
    !email ||
    (isEnterprise && !company.trim());

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
            {isEnterprise ? (
              <>
                <TextField
                  required
                  fullWidth
                  label="Company"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={status === "submitting"}
                  inputProps={{ "aria-label": "Company" }}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Estimated seats (optional)"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  disabled={status === "submitting"}
                  inputProps={{
                    "aria-label": "Estimated seats",
                    min: 1,
                    step: 1,
                  }}
                  sx={{ mt: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Use case (optional)"
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value as UseCase | "")}
                  disabled={status === "submitting"}
                  inputProps={{ "aria-label": "Use case" }}
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="">
                    <em>Not specified</em>
                  </MenuItem>
                  {USE_CASE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : null}
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

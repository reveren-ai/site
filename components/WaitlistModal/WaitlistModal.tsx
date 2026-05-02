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
} from "@mui/material";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      setStatus("idle");
      setError(null);
    }, 200);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="waitlist-title"
    >
      <DialogTitle id="waitlist-title" sx={{ pb: 0.5 }}>
        Join the waitlist
      </DialogTitle>

      {status === "success" ? (
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            You're on the list.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We'll email you the day the CLI is generally available. No drips, no
            "we're growing fast" updates.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Box>
        </DialogContent>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Today the CLI is a placeholder; the real one ships when the public
              beta opens. Drop your email and we'll send a single message when
              it's live.
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
              disabled={status === "submitting" || !email}
            >
              {status === "submitting" ? "Joining…" : "Join"}
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}

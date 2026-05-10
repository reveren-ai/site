import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import WaitlistModal from "./WaitlistModal";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("WaitlistModal", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let onClose: () => void;

  beforeEach(() => {
    onClose = vi.fn() as unknown as () => void;
    fetchMock = vi.fn();
    Object.defineProperty(window, "fetch", {
      configurable: true,
      writable: true,
      value: fetchMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not render the dialog when closed", () => {
    renderWithTheme(<WaitlistModal open={false} onClose={onClose} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("posts the email and shows the success state", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });
    const user = userEvent.setup();
    renderWithTheme(<WaitlistModal open={true} onClose={onClose} />);

    await user.type(screen.getByLabelText("Email address"), "user@example.com");
    await user.click(screen.getByRole("button", { name: /^join$/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com" }),
      })
    );
  });

  it("shows an error when the API replies non-OK", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ ok: false, error: "Invalid email" }),
    });
    const user = userEvent.setup();
    renderWithTheme(<WaitlistModal open={true} onClose={onClose} />);

    await user.type(screen.getByLabelText("Email address"), "user@example.com");
    await user.click(screen.getByRole("button", { name: /^join$/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/invalid email/i);
    });
  });

  it("shows a network error when fetch rejects", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    const user = userEvent.setup();
    renderWithTheme(<WaitlistModal open={true} onClose={onClose} />);

    await user.type(screen.getByLabelText("Email address"), "user@example.com");
    await user.click(screen.getByRole("button", { name: /^join$/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/offline/i);
    });
  });

  it("closes via the Cancel button", async () => {
    const user = userEvent.setup();
    renderWithTheme(<WaitlistModal open={true} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  describe("tier-aware variants", () => {
    it("tier='pro' uses Pro-specific title and copy", () => {
      renderWithTheme(<WaitlistModal open={true} onClose={onClose} tier="pro" />);
      expect(
        screen.getByRole("dialog", { name: /join the pro waitlist/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/pro launches when the hosted orchestrator opens/i)).toBeInTheDocument();
    });

    it("tier='pro' submits with tier in payload", async () => {
      fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
      const user = userEvent.setup();
      renderWithTheme(<WaitlistModal open={true} onClose={onClose} tier="pro" />);

      await user.type(screen.getByLabelText("Email address"), "pro@example.com");
      await user.click(screen.getByRole("button", { name: /^join$/i }));

      await waitFor(() => {
        expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
      });

      const call = fetchMock.mock.calls[0];
      const body = JSON.parse(call[1].body as string);
      expect(body).toEqual({ email: "pro@example.com", tier: "pro" });
    });

    it("tier='enterprise' shows extra fields (company, seats, use case)", () => {
      renderWithTheme(<WaitlistModal open={true} onClose={onClose} tier="enterprise" />);
      expect(
        screen.getByRole("dialog", { name: /join the enterprise waitlist/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Company")).toBeInTheDocument();
      expect(screen.getByLabelText("Estimated seats")).toBeInTheDocument();
      expect(screen.getByLabelText("Use case")).toBeInTheDocument();
    });

    it("tier='enterprise' disables submit until company is filled", async () => {
      const user = userEvent.setup();
      renderWithTheme(<WaitlistModal open={true} onClose={onClose} tier="enterprise" />);

      await user.type(screen.getByLabelText("Email address"), "boss@bigco.com");
      const submit = screen.getByRole("button", { name: /^join$/i });
      expect(submit).toBeDisabled();

      await user.type(screen.getByLabelText("Company"), "BigCo");
      expect(submit).toBeEnabled();
    });

    it("tier='enterprise' submit body includes tier + extra fields", async () => {
      fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
      const user = userEvent.setup();
      renderWithTheme(<WaitlistModal open={true} onClose={onClose} tier="enterprise" />);

      await user.type(screen.getByLabelText("Email address"), "boss@bigco.com");
      await user.type(screen.getByLabelText("Company"), "BigCo");
      await user.type(screen.getByLabelText("Estimated seats"), "250");
      await user.click(screen.getByRole("button", { name: /^join$/i }));

      await waitFor(() => {
        expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
      });

      const call = fetchMock.mock.calls[0];
      const body = JSON.parse(call[1].body as string);
      expect(body).toMatchObject({
        email: "boss@bigco.com",
        tier: "enterprise",
        company: "BigCo",
        seats: 250,
      });
    });

    it("tier='team' uses Team-specific copy", () => {
      renderWithTheme(<WaitlistModal open={true} onClose={onClose} tier="team" />);
      expect(
        screen.getByRole("dialog", { name: /join the team waitlist/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/team-tier features/i)).toBeInTheDocument();
    });
  });
});

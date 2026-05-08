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
});

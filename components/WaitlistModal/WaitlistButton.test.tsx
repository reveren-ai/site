import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import WaitlistButton from "./WaitlistButton";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("WaitlistButton", () => {
  it("renders the default 'Join waitlist' label", () => {
    renderWithTheme(<WaitlistButton />);
    expect(screen.getByRole("button", { name: /join waitlist/i })).toBeInTheDocument();
  });

  it("opens the WaitlistModal when clicked", async () => {
    renderWithTheme(<WaitlistButton />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /join waitlist/i }));
    expect(screen.getByRole("dialog", { name: /join the waitlist/i })).toBeInTheDocument();
  });

  it("supports a custom label", () => {
    renderWithTheme(<WaitlistButton label="Get notified" />);
    expect(screen.getByRole("button", { name: /get notified/i })).toBeInTheDocument();
  });

  it("forwards tier='pods' to the modal", async () => {
    renderWithTheme(<WaitlistButton tier="pods" label="Join the Pods waitlist" />);
    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: /join the pods waitlist/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /join the pods waitlist/i }),
    ).toBeInTheDocument();
  });

  it("forwards tier='marketplace' to the modal", async () => {
    renderWithTheme(
      <WaitlistButton tier="marketplace" label="Join the Marketplace waitlist" />,
    );
    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: /join the marketplace waitlist/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /join the marketplace waitlist/i }),
    ).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import CopyButton from "./CopyButton";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("CopyButton", () => {
  it("renders the install command when no label is given", () => {
    renderWithTheme(<CopyButton text="npx @reveren-ai/core init" />);
    expect(screen.getByRole("button")).toHaveTextContent("npx @reveren-ai/core init");
  });

  it("writes the text to clipboard on click and flips to Copied", async () => {
    // userEvent.setup() v14 installs its own clipboard implementation, so we
    // spy on whatever it puts in place rather than fighting it with a getter.
    const user = userEvent.setup();
    const writeSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    renderWithTheme(<CopyButton text="npx @reveren-ai/core init" />);

    await user.click(screen.getByRole("button"));

    expect(writeSpy).toHaveBeenCalledWith("npx @reveren-ai/core init");

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("Copied");
    });

    writeSpy.mockRestore();
  });

  it("renders a custom label when provided", () => {
    renderWithTheme(<CopyButton text="some text" label="Copy install" />);
    expect(screen.getByRole("button")).toHaveTextContent("Copy install");
  });
});

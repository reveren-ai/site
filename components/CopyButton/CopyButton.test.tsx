import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

  it("falls back to execCommand textarea path when clipboard API is missing", () => {
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    if (typeof document.execCommand !== "function") {
      Object.defineProperty(document, "execCommand", {
        configurable: true,
        writable: true,
        value: () => true,
      });
    }
    const execSpy = vi
      .spyOn(document, "execCommand")
      .mockImplementation(() => true);

    renderWithTheme(<CopyButton text="fallback text" />);
    fireEvent.click(screen.getByRole("button"));

    expect(execSpy).toHaveBeenCalledWith("copy");

    execSpy.mockRestore();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: originalClipboard,
    });
  });

  it("falls back to execCommand if the clipboard API rejects", async () => {
    const originalClipboard = navigator.clipboard;
    // Replace the entire clipboard so userEvent's shim doesn't reinstall it.
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    if (typeof document.execCommand !== "function") {
      Object.defineProperty(document, "execCommand", {
        configurable: true,
        writable: true,
        value: () => true,
      });
    }
    const execSpy = vi
      .spyOn(document, "execCommand")
      .mockImplementation(() => true);

    renderWithTheme(<CopyButton text="rejected text" />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(execSpy).toHaveBeenCalledWith("copy");
    });

    execSpy.mockRestore();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: originalClipboard,
    });
  });

  it("swallows execCommand failures without throwing", () => {
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    if (typeof document.execCommand !== "function") {
      Object.defineProperty(document, "execCommand", {
        configurable: true,
        writable: true,
        value: () => true,
      });
    }
    const execSpy = vi.spyOn(document, "execCommand").mockImplementation(() => {
      throw new Error("permission denied");
    });

    renderWithTheme(<CopyButton text="will fail" />);
    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();

    execSpy.mockRestore();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: originalClipboard,
    });
  });

  it("renders without an icon when showIcon=false", () => {
    renderWithTheme(<CopyButton text="x" showIcon={false} />);
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeNull();
  });
});

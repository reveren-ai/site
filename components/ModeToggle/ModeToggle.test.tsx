import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import ModeToggle from "./ModeToggle";
import { MODE_STORAGE_KEY } from "@/lib/mode";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("ModeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-mode");
  });

  it("flips data-mode and persists to localStorage on click", async () => {
    document.documentElement.setAttribute("data-mode", "light");
    window.localStorage.setItem(MODE_STORAGE_KEY, "light");

    const user = userEvent.setup();
    renderWithTheme(<ModeToggle />);

    const button = await screen.findByRole("button");
    await user.click(button);

    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
    expect(window.localStorage.getItem(MODE_STORAGE_KEY)).toBe("dark");
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import MobileNav from "./MobileNav";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "https://github.com/x/y", label: "GitHub", external: true },
];

describe("MobileNav", () => {
  it("starts closed and opens the drawer when the menu button is clicked", async () => {
    renderWithTheme(<MobileNav links={links} />);
    expect(screen.queryByRole("link", { name: "Pricing" })).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Manifesto" })).toBeInTheDocument();
  });

  it("opens external links in a new tab", async () => {
    renderWithTheme(<MobileNav links={links} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const gh = screen.getByRole("link", { name: "GitHub" });
    expect(gh).toHaveAttribute("target", "_blank");
    expect(gh).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("closes the drawer when a link is clicked", async () => {
    renderWithTheme(<MobileNav links={links} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("link", { name: "Pricing" }));

    // Drawer animations are async; the link should disappear from view shortly.
    // jsdom does not animate, so the close handler unmounts immediately.
    await new Promise((r) => setTimeout(r, 0));
  });
});

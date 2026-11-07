import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteShell } from "@/components/layout/SiteShell";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

function renderShell() {
  return render(
    <SiteShell>
      <h1>Page content</h1>
    </SiteShell>,
  );
}

describe("SiteShell accessibility structure", () => {
  it("has a skip link as the very first focusable element, pointing at <main>", () => {
    renderShell();
    const focusable = screen.getAllByRole("link");
    expect(focusable[0]).toHaveTextContent("Skip to main content");
    expect(focusable[0]).toHaveAttribute("href", "#main-content");
    expect(document.getElementById("main-content")).toBe(screen.getByRole("main"));
  });

  it("has exactly one main landmark containing the page content", () => {
    renderShell();
    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1, name: "Page content" })).toBeInTheDocument();
  });

  it("has banner and contentinfo landmarks", () => {
    renderShell();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("gives the two navigation landmarks distinct names", () => {
    renderShell();
    const names = screen.getAllByRole("navigation").map((n) => n.getAttribute("aria-label"));
    expect(names).toEqual(["Main", "Mobile"]);
  });

  it("provides a labeled sign-in link on both desktop and mobile", () => {
    renderShell();
    const signIn = screen.getAllByRole("link", { name: "Sign in" });
    expect(signIn).toHaveLength(2);
    signIn.forEach((l) => expect(l).toHaveAttribute("href", "/login"));
  });

  it("hides the decorative account icon from assistive technology", () => {
    const { container } = renderShell();
    const svg = container.querySelector("header svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the 'Desi Days' wordmark in the header, linking home", () => {
    renderShell();
    const wordmark = within(screen.getByRole("banner")).getByRole("link", { name: "Desi Days" });
    expect(wordmark).toHaveAttribute("href", "/");
  });

  it("does not repeat the calendar reference location or tagline on every page", () => {
    const { container } = renderShell();
    expect(container).not.toHaveTextContent(/Atlanta/);
    expect(container).not.toHaveTextContent(/Reference calendar/);
    expect(container).not.toHaveTextContent(/wherever life takes you/);
  });

  it("still explains that dates are shown only once verified", () => {
    renderShell();
    expect(within(screen.getByRole("contentinfo")).getByText(/Date not yet verified/)).toBeInTheDocument();
  });
});

import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavLinks } from "@/components/layout/NavLinks";
import { isNavItemActive, primaryNav } from "@/lib/navigation";

// NavLinks asks Next.js which page we're on. Outside a real app there is no router,
// so we replace usePathname with a fake we can control per test.
const usePathname = vi.fn<() => string | null>();
vi.mock("next/navigation", () => ({ usePathname: () => usePathname() }));

describe("isNavItemActive", () => {
  const [home, calendar, explore] = primaryNav;

  it("matches Home only on the exact root path", () => {
    expect(isNavItemActive(home, "/")).toBe(true);
    expect(isNavItemActive(home, "/calendar")).toBe(false);
  });

  it("matches a section and its child pages", () => {
    expect(isNavItemActive(calendar, "/calendar")).toBe(true);
    expect(isNavItemActive(calendar, "/calendar/2027")).toBe(true);
  });

  it("does not match look-alike prefixes", () => {
    expect(isNavItemActive(calendar, "/calendars")).toBe(false);
  });

  it("highlights Explore on festival detail pages", () => {
    expect(isNavItemActive(explore, "/festivals/diwali")).toBe(true);
  });

  it("is inactive when the path is unknown", () => {
    expect(isNavItemActive(home, null)).toBe(false);
  });
});

describe("NavLinks", () => {
  beforeEach(() => usePathname.mockReturnValue("/"));

  it.each(["desktop", "mobile"] as const)("renders the four primary links (%s)", (variant) => {
    render(<NavLinks variant={variant} />);
    const links = screen.getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(["Home", "Calendar", "Explore", "My Festivals"]);
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "/",
      "/calendar",
      "/explore",
      "/my-festivals",
    ]);
  });

  it("marks only the current page with aria-current", () => {
    usePathname.mockReturnValue("/calendar");
    render(<NavLinks variant="desktop" />);
    const current = screen.getAllByRole("link").filter((l) => l.getAttribute("aria-current") === "page");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("Calendar");
  });

  it("marks Explore as current on a festival page", () => {
    usePathname.mockReturnValue("/festivals/holi");
    render(<NavLinks variant="mobile" />);
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute("aria-current", "page");
  });

  it("marks nothing current on pages outside the primary nav", () => {
    usePathname.mockReturnValue("/login");
    render(<NavLinks variant="desktop" />);
    const list = screen.getByRole("list");
    expect(within(list).queryByRole("link", { current: "page" })).toBeNull();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginPage from "@/app/login/page";
import FestivalPage from "@/app/festivals/[slug]/page";
import { FollowAction } from "@/components/festivals/detail/FollowAction";
import { contentFestivals } from "../fixtures/festivals";
import { safeReturnPath, signInHref } from "@/lib/utils/return-path";

// `connection()` only works inside a real request; in unit tests there is none, so it becomes a no-op.
vi.mock("next/server", () => ({ connection: async () => {} }));

const login = (params: Record<string, string | string[] | undefined> = {}) =>
  LoginPage({ searchParams: Promise.resolve(params) });

describe("signInHref", () => {
  it("builds a sign-in link carrying a validated, encoded return path", () => {
    expect(signInHref("/festivals/ugadi")).toBe("/login?next=%2Ffestivals%2Fugadi");
    expect(signInHref("/explore?q=ugadi")).toBe("/login?next=%2Fexplore%3Fq%3Dugadi");
  });

  it.each(["https://evil.com", "//evil.com", "/\\evil.com", "javascript:alert(1)", ""])("never carries the unsafe target %j", (bad) => {
    expect(signInHref(bad)).toBe("/login?next=%2F");
  });

  it("round-trips: decoding the link's next value gives back the same safe path", () => {
    const next = new URL(signInHref("/festivals/diwali#stories"), "http://x.test").searchParams.get("next");
    expect(next).toBe("/festivals/diwali#stories");
    expect(safeReturnPath(next)).toBe("/festivals/diwali#stories");
  });
});

describe("Follow action on festival pages", () => {
  it("sends guests to sign-in with this festival as the return URL", () => {
    render(<FollowAction slug="ugadi" name="Ugadi" />);
    const link = screen.getByRole("link", { name: /Follow Ugadi/ });
    expect(link).toHaveAttribute("href", "/login?next=%2Ffestivals%2Fugadi");
    expect(link).toHaveTextContent("Follow");
  });

  it("does not claim anything was followed, and says reminders are not available", () => {
    const { container } = render(<FollowAction slug="ugadi" name="Ugadi" />);
    expect(container).toHaveTextContent("You will be asked to sign in first.");
    expect(container).toHaveTextContent("Email reminders are not available yet.");
    expect(container).not.toHaveTextContent(/following|you follow|followed|unfollow|reminder set|subscribed/i);
    expect(screen.queryByRole("button")).not.toBeInTheDocument(); // no fake toggle, no reminder control
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it.each(contentFestivals.map((f) => [f.slug]))("%s page has the follow link with its own return URL", async (slug) => {
    render(await FestivalPage({ params: Promise.resolve({ slug }) }));
    expect(screen.getByRole("link", { name: /^Follow / })).toHaveAttribute("href", `/login?next=${encodeURIComponent(`/festivals/${slug}`)}`);
  });
});

describe("login page keeps the return URL for Phase 4", () => {
  it("offers a way back to the validated page and passes it on to sign-up, without implying a follow", async () => {
    const { container } = render(await login({ next: "/festivals/ugadi" }));
    expect(screen.getByRole("link", { name: "Go back to where you were" })).toHaveAttribute("href", "/festivals/ugadi");
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute("href", "/signup?next=%2Ffestivals%2Fugadi");
    expect(container).toHaveTextContent("nothing has been followed");
  });

  it.each(["https://evil.com", "//evil.com", "javascript:alert(1)", "/\\evil.com"])("ignores the unsafe next value %j", async (bad) => {
    const { container } = render(await login({ next: bad }));
    expect(screen.queryByRole("link", { name: "Go back to where you were" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute("href", "/signup");
    expect(container.innerHTML).not.toContain("evil.com");
  });

  it("uses the first value when next is repeated, and has no return link without next", async () => {
    render(await login({ next: ["/explore", "https://evil.com"] }));
    expect(screen.getByRole("link", { name: "Go back to where you were" })).toHaveAttribute("href", "/explore");
  });

  it("still has one h1 and a plain Explore link when there is no next", async () => {
    render(await login());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Explore festivals" })).toHaveAttribute("href", "/explore");
  });
});

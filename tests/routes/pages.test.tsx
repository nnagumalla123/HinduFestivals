import { render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import CalendarPage from "@/app/calendar/page";
import ExplorePage from "@/app/explore/page";
import FestivalPage, { generateMetadata, generateStaticParams } from "@/app/festivals/[slug]/page";
import Home from "@/app/page";
import LoginPage from "@/app/login/page";
import MyFestivalsPage from "@/app/my-festivals/page";
import OnboardingPage from "@/app/onboarding/page";
import SettingsPage from "@/app/settings/page";
import SignupPage from "@/app/signup/page";
import { contentFestivals, draftFestivals } from "../fixtures/festivals";

// `connection()` only works inside a real request; in unit tests there is none, so it becomes a no-op.
vi.mock("next/server", () => ({ connection: async () => {} }));

const slugProps = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("static pages render without login", () => {
  // Server components are plain functions, so we can call them and render the result.
  it.each([
    ["/my-festivals", () => <MyFestivalsPage />, /my festivals/i],
    ["/signup", () => <SignupPage />, /create an account/i],
    ["/onboarding", () => <OnboardingPage />, /welcome/i],
    ["/settings", () => <SettingsPage />, /settings/i],
  ] as Array<[string, () => ReactElement, RegExp]>)("%s has one h1", (_path, element, heading) => {
    render(element());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it.each([
    ["/", async () => Home(), /your traditions, wherever life takes you/i],
    ["/login", async () => LoginPage({ searchParams: Promise.resolve({}) }), /sign in/i],
  ] as Array<[string, () => Promise<ReactElement>, RegExp]>)("%s has one h1", async (_path, element, heading) => {
    render(await element());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("/calendar has one h1", async () => {
    render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: /festival calendar/i })).toBeInTheDocument();
  });

  it("/explore lists all ten festivals, each linking to its page", async () => {
    render(await ExplorePage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { level: 1, name: /explore festivals/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    contentFestivals.forEach((f) => {
      expect(screen.getByRole("link", { name: f.name })).toHaveAttribute("href", `/festivals/${f.slug}`);
    });
  });

  it("/explore marks every festival's date as not verified", async () => {
    render(await ExplorePage({ searchParams: Promise.resolve({}) }));
    expect(screen.getAllByText("Date not yet verified")).toHaveLength(10);
  });
});

describe("home and calendar never show invented dates", () => {
  it("home shows an honest empty state instead of a countdown", async () => {
    render(await Home());
    expect(screen.getByRole("heading", { name: "No verified dates yet" })).toBeInTheDocument();
  });

  it("calendar names its reference location directly beneath the page heading", async () => {
    const { container } = render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    const heading = screen.getByRole("heading", { level: 1, name: "Festival calendar" });
    const label = screen.getByText(/Reference calendar: Atlanta, GA · 2027/);
    // DOCUMENT_POSITION_FOLLOWING (4) means the label comes after the heading in the page.
    expect(heading.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // ...and it is the first thing after the heading, not buried lower down.
    expect(heading.parentElement?.contains(label)).toBe(true);
    expect(container.textContent?.match(/Atlanta/g)).toHaveLength(1);
  });

  it("the location label appears only on the calendar page", async () => {
    const { container: home } = render(await Home());
    expect(home).not.toHaveTextContent(/Atlanta|Reference calendar/);
    const { container: festival } = render(await FestivalPage(slugProps("diwali")));
    expect(festival).not.toHaveTextContent(/Atlanta|Reference calendar/);
  });
});

describe("/festivals/[slug]", () => {
  it.each(contentFestivals.map((f) => [f.slug, f.name]))("renders %s", async (slug, name) => {
    render(await FestivalPage(slugProps(slug)));
    expect(screen.getByRole("heading", { level: 1, name })).toBeInTheDocument();
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
  });

  it.each(draftFestivals.map((f) => [f.slug]))("%s (draft) shows all sections as placeholders, with no dates", async (slug) => {
    const { container } = render(await FestivalPage(slugProps(slug)));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(9);
    expect(screen.getAllByText("Not yet available.").length).toBeGreaterThan(0);
    expect(screen.getByText(/work in progress/i)).toBeInTheDocument();
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent(/Atlanta|Reference calendar/);
    expect(screen.getByRole("link", { name: "All festivals" })).toHaveAttribute("href", "/explore");
  });

  it.each([["diwali", 8], ["ugadi", 9], ["navaratri", 9], ["makara-sankranti", 8], ["maha-shivaratri", 9], ["holi", 9], ["rama-navami", 9]])("%s (reviewed) shows its guide, citations and review date, and still no date or countdown", async (slug, h2s) => {
    const { container } = render(await FestivalPage(slugProps(slug)));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(h2s);
    // Complete reviewed guides carry no placeholders and no partly-reviewed notice.
    expect(container).not.toHaveTextContent(/Not yet available|Parts of this guide are complete|work in progress/i);
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
    expect(screen.getByText(/Last reviewed November 8, 2026/)).toBeInTheDocument();
    expect(container.querySelectorAll("a[aria-label^='Source ']").length).toBeGreaterThan(10);
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent(/Atlanta|Reference calendar|days? (to go|left|until)/i);
    expect(container).not.toHaveTextContent(/desi-days-editorial|SOURCE NOTE|OPTIONAL:|EDITORIAL:/);
  });

  it("Diwali hides its empty optional content instead of showing placeholders, and invents nothing", async () => {
    const { container } = render(await FestivalPage(slugProps("diwali")));
    expect(screen.queryByRole("heading", { level: 2, name: "Food & fasting" })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "On this page" })).queryByRole("link", { name: "Food & fasting" })).not.toBeInTheDocument();
    const facts = document.getElementById("quick-facts")!;
    expect(within(facts).getAllByRole("term").map((t) => t.textContent)).toEqual(["Meaning", "Length of observance", "Associated deities", "Common customs"]);
    expect(container).not.toHaveTextContent(/Dietary practices|Signature foods/);
  });

  it("does not show unreviewed aliases or subtitles as approved content", async () => {
    const { container } = render(await FestivalPage(slugProps("holi")));
    expect(container).not.toHaveTextContent(/Also known as/);
  });

  it("shows the approved subtitle and aliases for a reviewed festival", async () => {
    render(await FestivalPage(slugProps("diwali")));
    expect(screen.getByText("The festival of lights")).toBeInTheDocument();
    expect(screen.getByText("Also known as Deepavali")).toBeInTheDocument();
  });

  it("triggers Next.js's 404 for an unknown slug", async () => {
    // notFound() throws a special error carrying a 404 marker; Next.js turns it into a 404 response.
    await expect(FestivalPage(slugProps("not-a-festival"))).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });

  it("does not match slugs by partial text", async () => {
    await expect(FestivalPage(slugProps("diwal"))).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });

  it("pre-builds one page per festival", async () => {
    expect(await generateStaticParams()).toHaveLength(10);
  });

  it("sets a page title from the festival name", async () => {
    expect(await generateMetadata(slugProps("holi"))).toEqual({ title: "Holi" });
    expect(await generateMetadata(slugProps("nope"))).toEqual({ title: "Festival not found" });
  });
});

import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import CalendarPage from "@/app/calendar/page";
import ExplorePage from "@/app/explore/page";
import FestivalPage, { generateMetadata, generateStaticParams } from "@/app/festivals/[slug]/page";
import Home from "@/app/page";
import LoginPage from "@/app/login/page";
import MyFestivalsPage from "@/app/my-festivals/page";
import OnboardingPage from "@/app/onboarding/page";
import SettingsPage from "@/app/settings/page";
import SignupPage from "@/app/signup/page";
import { mockFestivals } from "@/lib/festivals/mock-data";

const slugProps = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("static pages render without login", () => {
  // Server components are plain functions, so we can call them and render the result.
  it.each([
    ["/", () => <Home />, /your traditions, wherever life takes you/i],
    ["/calendar", () => <CalendarPage />, /festival calendar/i],
    ["/my-festivals", () => <MyFestivalsPage />, /my festivals/i],
    ["/login", () => <LoginPage />, /sign in/i],
    ["/signup", () => <SignupPage />, /create an account/i],
    ["/onboarding", () => <OnboardingPage />, /welcome/i],
    ["/settings", () => <SettingsPage />, /settings/i],
  ] as Array<[string, () => ReactElement, RegExp]>)("%s has one h1", (_path, element, heading) => {
    render(element());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("/explore lists all ten festivals, each linking to its page", async () => {
    render(await ExplorePage());
    expect(screen.getByRole("heading", { level: 1, name: /explore festivals/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    mockFestivals.forEach((f) => {
      expect(screen.getByRole("link", { name: f.name })).toHaveAttribute("href", `/festivals/${f.slug}`);
    });
  });

  it("/explore marks every festival's date as not verified", async () => {
    render(await ExplorePage());
    expect(screen.getAllByText("Date not yet verified")).toHaveLength(10);
  });
});

describe("home and calendar never show invented dates", () => {
  it("home shows an honest empty state instead of a countdown", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "No verified dates yet" })).toBeInTheDocument();
  });

  it("calendar names its reference location directly beneath the page heading", () => {
    const { container } = render(<CalendarPage />);
    const heading = screen.getByRole("heading", { level: 1, name: "Festival calendar" });
    const label = screen.getByText(/Reference calendar: Atlanta, GA · 2027/);
    // DOCUMENT_POSITION_FOLLOWING (4) means the label comes after the heading in the page.
    expect(heading.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // ...and it is the first thing after the heading, not buried lower down.
    expect(heading.parentElement?.contains(label)).toBe(true);
    expect(container.textContent?.match(/Atlanta/g)).toHaveLength(1);
  });

  it("the location label appears only on the calendar page", async () => {
    const { container: home } = render(<Home />);
    expect(home).not.toHaveTextContent(/Atlanta|Reference calendar/);
    const { container: festival } = render(await FestivalPage(slugProps("diwali")));
    expect(festival).not.toHaveTextContent(/Atlanta|Reference calendar/);
  });
});

describe("/festivals/[slug]", () => {
  it.each(mockFestivals.map((f) => [f.slug, f.name]))("renders %s", async (slug, name) => {
    render(await FestivalPage(slugProps(slug)));
    expect(screen.getByRole("heading", { level: 1, name })).toBeInTheDocument();
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
  });

  it("shows aliases when a festival has them", async () => {
    render(await FestivalPage(slugProps("diwali")));
    expect(screen.getByText(/Also known as Deepavali/)).toBeInTheDocument();
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

  it("pre-builds one page per festival", () => {
    expect(generateStaticParams()).toHaveLength(10);
  });

  it("sets a page title from the festival name", async () => {
    expect(await generateMetadata(slugProps("holi"))).toEqual({ title: "Holi" });
    expect(await generateMetadata(slugProps("nope"))).toEqual({ title: "Festival not found" });
  });
});

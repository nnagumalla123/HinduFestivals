import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { FeaturedFestivals } from "@/components/home/FeaturedFestivals";
import { NextFestival } from "@/components/home/NextFestival";
import { FEATURED_SLUGS } from "@/lib/festivals/featured";
import { buildEntries } from "@/lib/festivals/calendar";
import { mockFestivals } from "@/lib/festivals/mock-data";
import { syntheticDraft, syntheticVerifiedMultiDay, syntheticVerifiedSingleDay } from "../fixtures/occurrences";

vi.mock("next/server", () => ({ connection: async () => {} }));

const festivals = mockFestivals.map(({ slug, name }) => ({ slug, name }));
const holi = { ...syntheticVerifiedSingleDay, festivalSlug: "holi" };

describe("home page (production data)", () => {
  it("welcomes visitors, says who it is for, and links to Explore and Calendar", async () => {
    const { container } = render(await Home());
    expect(screen.getByRole("heading", { level: 1, name: /your traditions, wherever life takes you/i })).toBeInTheDocument();
    expect(container).toHaveTextContent(/Indian Americans/);
    expect(container).toHaveTextContent(/diaspora/);
    expect(screen.getByRole("link", { name: "Explore festivals" })).toHaveAttribute("href", "/explore");
    expect(screen.getByRole("link", { name: "View calendar" })).toHaveAttribute("href", "/calendar");
  });

  it("keeps the heading as one readable sentence even though it is split into two lines on wide screens", async () => {
    render(await Home());
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toBe("Your traditions, wherever life takes you.");
    expect(h1.querySelectorAll("span")).toHaveLength(2);
  });

  it("has a sensible outline: one h1, then Next festival, Featured festivals, What you will find", async () => {
    render(await Home());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Next festival",
      "Featured festivals",
      "What you will find here",
    ]);
  });

  it("shows an honest empty state: no date, no countdown, no location", async () => {
    const { container } = render(await Home());
    expect(screen.getByRole("heading", { level: 3, name: "No verified dates yet" })).toBeInTheDocument();
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent(/Starts (in|today|tomorrow)|Happening now|Atlanta|Reference calendar/);
  });

  it("features six of the ten existing festivals, each linking to its guide, with no dates", async () => {
    render(await Home());
    const section = screen.getByRole("region", { name: "Featured festivals" });
    expect(within(section).getAllByRole("listitem")).toHaveLength(6);
    FEATURED_SLUGS.forEach((slug) => {
      expect(within(section).getByRole("link", { name: mockFestivals.find((f) => f.slug === slug)!.name })).toHaveAttribute("href", `/festivals/${slug}`);
    });
    expect(within(section).getAllByText("Date not yet verified")).toHaveLength(6);
    expect(within(section).getByRole("link", { name: "See all ten festivals" })).toHaveAttribute("href", "/explore");
  });
});

describe("featured festival list", () => {
  it("only names festivals from the ten, once each", () => {
    const known = new Set(mockFestivals.map((f) => f.slug));
    expect(new Set(FEATURED_SLUGS).size).toBe(FEATURED_SLUGS.length);
    FEATURED_SLUGS.forEach((slug) => expect(known.has(slug), slug).toBe(true));
    expect(FEATURED_SLUGS.length).toBeLessThan(mockFestivals.length);
  });

  it("uses h3 card headings so they sit under the section's h2", () => {
    render(<FeaturedFestivals festivals={mockFestivals.slice(0, 2)} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  });
});

describe("next festival section (synthetic verified dates)", () => {
  it("shows the festival, its date with location and year, and a countdown", () => {
    const { container } = render(<NextFestival entries={buildEntries([holi], festivals)} today="2027-03-01" />);
    const section = screen.getByRole("region", { name: "Next festival" });
    expect(within(section).getByRole("link", { name: "Holi" })).toHaveAttribute("href", "/festivals/holi");
    expect(within(section).getByText("Fri, Mar 5")).toHaveAttribute("datetime", "2027-03-05");
    expect(container).toHaveTextContent("Atlanta, GA · 2027");
    expect(container).toHaveTextContent("Starts in 4 days");
  });

  it("says 'Happening now' during a multi-day festival", () => {
    const entries = buildEntries([{ ...syntheticVerifiedMultiDay, festivalSlug: "ugadi" }], festivals);
    const { container } = render(<NextFestival entries={entries} today="2027-03-06" />);
    expect(container).toHaveTextContent("Happening now");
    expect(container).toHaveTextContent("Fri, Mar 5 – Sun, Mar 7");
  });

  it("never counts down to a draft occurrence", () => {
    const { container } = render(<NextFestival entries={buildEntries([{ ...syntheticDraft, festivalSlug: "holi" }], festivals)} today="2027-03-01" />);
    expect(screen.getByRole("heading", { level: 3, name: "No verified dates yet" })).toBeInTheDocument();
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent(/Starts in/);
  });

  it("says so when every verified date has passed", () => {
    render(<NextFestival entries={buildEntries([holi], festivals)} today="2027-04-01" />);
    expect(screen.getByRole("heading", { level: 3, name: "No more verified dates this year" })).toBeInTheDocument();
  });
});

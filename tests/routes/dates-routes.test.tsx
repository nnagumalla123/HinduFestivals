import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FestivalPage from "@/app/festivals/[slug]/page";
import CalendarPage from "@/app/calendar/page";
import ExplorePage from "@/app/explore/page";
import Home from "@/app/page";
import type { FestivalOccurrence } from "@/lib/festivals/types";
import {
  syntheticMultiDayWithKeyDays,
  syntheticTraditionA,
  syntheticTraditionB,
} from "../fixtures/occurrences";

// `connection()` only works inside a real request; in unit tests there is none, so it becomes a no-op.
vi.mock("next/server", () => ({ connection: async () => {} }));

// Pages read dates only through the query layer, so these tests swap in SYNTHETIC verified occurrences
// to prove the whole integration works. The real content has none, and the real pages show none.
const SYNTHETIC: readonly FestivalOccurrence[] = [syntheticMultiDayWithKeyDays, syntheticTraditionA, syntheticTraditionB];
vi.mock("@/lib/festivals/queries", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/festivals/queries")>();
  return {
    ...actual,
    listVerifiedOccurrences: async () => SYNTHETIC,
    getOccurrencesForFestival: async (slug: string) => SYNTHETIC.filter((o) => o.festivalSlug === slug),
  };
});

const slugProps = (slug: string) => ({ params: Promise.resolve({ slug }) });

beforeEach(() => {
  // "Now" is 20 Oct 2027, 12:00 in Atlanta, which is 6 days before the synthetic observance starts.
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2027-10-20T16:00:00Z"));
});
afterEach(() => vi.useRealTimers());

describe("home page with verified dates (synthetic)", () => {
  it("shows the next festival with its date, location, year and countdown", async () => {
    const { container } = render(await Home());
    const next = container.querySelector('[aria-labelledby="next-festival-heading"]')!;
    expect(next).toHaveTextContent("Diwali");
    expect(next).toHaveTextContent("Tue, Oct 26 – Sat, Oct 30");
    expect(next).toHaveTextContent("Atlanta, GA · 2027");
    expect(next).toHaveTextContent("Starts in 6 days");
  });

  it("shows verified dates on featured cards and 'Date not yet verified' on the rest", async () => {
    const { container } = render(await Home());
    const featured = container.querySelector('[aria-labelledby="featured-heading"]')!;
    const diwali = within(featured as HTMLElement).getByRole("link", { name: "Diwali" }).closest("li")!;
    expect(diwali).toHaveTextContent("Atlanta, GA · 2027");
    const holi = within(featured as HTMLElement).getByRole("link", { name: "Holi" }).closest("li")!;
    expect(holi).toHaveTextContent("Date not yet verified");
  });
});

describe("explore page with verified dates (synthetic)", () => {
  it("shows each card's verified dates, both tradition labels, and location and year on every date", async () => {
    const { container } = render(await ExplorePage({ searchParams: Promise.resolve({}) }));
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(10);
    const janmashtami = within(container as HTMLElement).getByRole("link", { name: "Krishna Janmashtami" }).closest("li")!;
    expect(janmashtami).toHaveTextContent("Synthetic tradition A");
    expect(janmashtami).toHaveTextContent("Synthetic tradition B");
    container.querySelectorAll("time").forEach((t) => {
      expect(t.closest("li")).toHaveTextContent("Atlanta, GA · 2027");
    });
    expect(within(container as HTMLElement).getByRole("link", { name: "Ugadi" }).closest("li")).toHaveTextContent("Date not yet verified");
  });
});

describe("calendar page with verified dates (synthetic)", () => {
  const calendar = async (params: Record<string, string>) =>
    render(await CalendarPage({ searchParams: Promise.resolve(params) }));

  it("keeps the reference label directly under the heading and shows the multi-day observance in the list", async () => {
    const { container } = await calendar({ view: "list", month: "2027-10" });
    expect(container).toHaveTextContent("Reference calendar: Atlanta, GA · 2027");
    expect(container).toHaveTextContent("Tue, Oct 26 – Sat, Oct 30");
    expect(container).toHaveTextContent("Synthetic main puja (main day)");
  });

  it("labels tradition-specific observances in the grid so they are not confused", async () => {
    const { container } = await calendar({ view: "grid", month: "2027-08" });
    expect(container.querySelector('a[aria-label*="Synthetic tradition A"]')).not.toBeNull();
    expect(container.querySelector('a[aria-label*="Synthetic tradition B"]')).not.toBeNull();
  });

  it("shows the key day for a selected day", async () => {
    const { container } = await calendar({ view: "grid", month: "2027-10", day: "2027-10-28" });
    const details = container.querySelector("#day-details")!;
    expect(details).toHaveTextContent("On this day: Synthetic main puja (main day)");
    expect(details).toHaveTextContent("Atlanta, GA · 2027");
  });
});

describe("festival detail page with verified dates (synthetic)", () => {
  it("shows the date, key days, location, year and a countdown for the festival that has one", async () => {
    const { container } = render(await FestivalPage(slugProps("diwali")));
    expect(container).toHaveTextContent("Tue, Oct 26 – Sat, Oct 30");
    expect(container).toHaveTextContent("Atlanta, GA · 2027");
    expect(container).toHaveTextContent("Synthetic main puja (main day)");
    expect(container).toHaveTextContent("Starts in 6 days");
  });

  it("separates tradition-specific dates, each with its own countdown", async () => {
    vi.setSystemTime(new Date("2027-08-20T16:00:00Z"));
    const { container } = render(await FestivalPage(slugProps("krishna-janmashtami")));
    expect(container).toHaveTextContent("Synthetic tradition A");
    expect(container).toHaveTextContent("Synthetic tradition B");
    expect(container).toHaveTextContent("Starts in 4 days");
    expect(container).toHaveTextContent("Starts in 5 days");
  });

  it("shows 'Date not yet verified' and no countdown for a festival without verified dates", async () => {
    const { container } = render(await FestivalPage(slugProps("ugadi")));
    expect(container).toHaveTextContent("Date not yet verified");
    expect(container).not.toHaveTextContent(/Starts (in|today|tomorrow)|Happening now/);
  });
});

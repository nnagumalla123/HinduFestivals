import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FestivalCard } from "@/components/festivals/FestivalCard";
import { OccurrenceDate } from "@/components/festivals/OccurrenceDate";
import { FestivalHero } from "@/components/festivals/detail/FestivalHero";
import { entryLabel } from "@/lib/festivals/calendar";
import { occurrenceCountdown } from "@/lib/festivals/next-festival";
import { keyDaysOn, validKeyDays } from "@/lib/festivals/occurrences";
import type { FestivalOccurrence } from "@/lib/festivals/types";
import { contentFestivals } from "../fixtures/festivals";
import {
  syntheticDisputed,
  syntheticDraft,
  syntheticMultiDayWithKeyDays,
  syntheticTraditionA,
  syntheticTraditionB,
  syntheticVerifiedSingleDay,
} from "../fixtures/occurrences";

const festival = contentFestivals[0];

describe("OccurrenceDate: location, tradition and key days", () => {
  it("always prints the reference location and year beside a verified date", () => {
    const { container } = render(<OccurrenceDate occurrence={syntheticVerifiedSingleDay} />);
    expect(container).toHaveTextContent("Atlanta, GA · 2027");
    expect(container.querySelector("time")).toHaveAttribute("datetime", "2027-03-05");
  });

  it("names the tradition beside a tradition-specific date", () => {
    render(<OccurrenceDate occurrence={syntheticTraditionA} />);
    expect(screen.getByText("Synthetic tradition A")).toBeInTheDocument();
  });

  it("lists labelled key days in date order and marks the main day, only when asked", () => {
    const { container, rerender } = render(<OccurrenceDate occurrence={syntheticMultiDayWithKeyDays} />);
    expect(container.querySelectorAll("li")).toHaveLength(0);
    rerender(<OccurrenceDate occurrence={syntheticMultiDayWithKeyDays} showKeyDays />);
    const items = [...container.querySelectorAll("li")].map((li) => li.textContent);
    expect(items).toEqual([
      "Synthetic opening day: Tue, Oct 26",
      "Synthetic main puja (main day): Thu, Oct 28",
      "Synthetic closing day: Sat, Oct 30",
    ]);
    expect(container).toHaveTextContent("Tue, Oct 26 – Sat, Oct 30");
    expect(container).toHaveTextContent("Atlanta, GA · 2027");
  });

  it("ignores malformed key days instead of guessing", () => {
    const bad: FestivalOccurrence = {
      ...syntheticMultiDayWithKeyDays,
      keyDays: [
        { date: "2027-10-27", label: "Good day" },
        { date: "2027-02-30", label: "Impossible date" },
        { date: "2027-11-15", label: "Outside the range" },
        { date: "2027-10-28", label: "  " },
      ],
    };
    expect(validKeyDays(bad).map((d) => d.label)).toEqual(["Good day"]);
    expect(keyDaysOn(syntheticMultiDayWithKeyDays, "2027-10-28").map((d) => d.label)).toEqual(["Synthetic main puja"]);
  });

  it("shows 'Date not yet verified' for draft, disputed or missing dates, whatever else they carry", () => {
    for (const occurrence of [syntheticDraft, syntheticDisputed, { ...syntheticDraft, traditionLabel: "X", keyDays: [] }, undefined]) {
      const { container, unmount } = render(<OccurrenceDate occurrence={occurrence} showKeyDays />);
      expect(container).toHaveTextContent("Date not yet verified");
      expect(container.querySelector("time")).toBeNull();
      unmount();
    }
  });
});

describe("occurrenceCountdown", () => {
  const occ = syntheticMultiDayWithKeyDays; // 2027-10-26 to 2027-10-30
  it("counts down to a future start and handles today and tomorrow", () => {
    expect(occurrenceCountdown(occ, "2027-10-20")).toBe("Starts in 6 days");
    expect(occurrenceCountdown(occ, "2027-10-25")).toBe("Starts tomorrow");
    expect(occurrenceCountdown(occ, "2027-10-26")).toBe("Starts today");
  });
  it("says 'Happening now' during the observance and nothing after it", () => {
    expect(occurrenceCountdown(occ, "2027-10-28")).toBe("Happening now");
    expect(occurrenceCountdown(occ, "2027-10-30")).toBe("Happening now");
    expect(occurrenceCountdown(occ, "2027-10-31")).toBeNull();
  });
  it("never produces a countdown for unverified or malformed data", () => {
    expect(occurrenceCountdown(syntheticDraft, "2027-01-01")).toBeNull();
    expect(occurrenceCountdown(syntheticDisputed, "2027-01-01")).toBeNull();
    expect(occurrenceCountdown({ ...occ, startDate: "2027-02-30" }, "2027-01-01")).toBeNull();
    expect(occurrenceCountdown({ ...occ, startDate: "2027-10-30", endDate: "2027-10-26" }, "2027-01-01")).toBeNull();
    expect(occurrenceCountdown(occ, "not-a-date")).toBeNull();
  });
});

describe("festival hero dates", () => {
  const heroText = (occurrences: readonly FestivalOccurrence[], today?: string) =>
    render(<FestivalHero festival={festival} occurrences={occurrences} today={today} />).container;

  it("shows the date, location, year, key days and a countdown for a verified multi-day observance", () => {
    const c = heroText([syntheticMultiDayWithKeyDays], "2027-10-20");
    expect(c).toHaveTextContent("Tue, Oct 26 – Sat, Oct 30");
    expect(c).toHaveTextContent("Atlanta, GA · 2027");
    expect(c).toHaveTextContent("Synthetic main puja (main day)");
    expect(c).toHaveTextContent("Starts in 6 days");
  });

  it("gives each tradition-specific observance its own label and countdown", () => {
    const c = heroText([syntheticTraditionB, syntheticTraditionA], "2027-08-20");
    const groups = c.querySelectorAll('[aria-label="Festival date"] > div');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveTextContent("Synthetic tradition A");
    expect(groups[0]).toHaveTextContent("Starts in 4 days");
    expect(groups[1]).toHaveTextContent("Synthetic tradition B");
    expect(groups[1]).toHaveTextContent("Starts in 5 days");
  });

  it("works out today in the browser when none is supplied (Atlanta time zone), and shows none after the date has passed", () => {
    vi.useFakeTimers();
    try {
      // 2027-10-20 at 16:00 UTC is still the 20th in Atlanta, 6 days before the synthetic start.
      vi.setSystemTime(new Date("2027-10-20T16:00:00Z"));
      expect(heroText([syntheticMultiDayWithKeyDays])).toHaveTextContent("Starts in 6 days");
      // 2027-10-26 at 02:00 UTC is still the evening of the 25th in Atlanta, so it starts tomorrow.
      vi.setSystemTime(new Date("2027-10-26T02:00:00Z"));
      expect(heroText([syntheticMultiDayWithKeyDays])).toHaveTextContent("Starts tomorrow");
      vi.setSystemTime(new Date("2027-12-01T16:00:00Z"));
      const past = heroText([syntheticMultiDayWithKeyDays]);
      expect(past).toHaveTextContent("Atlanta, GA · 2027");
      expect(past).not.toHaveTextContent(/Starts|Happening/);
    } finally {
      vi.useRealTimers();
    }
  });

  it("with no verified date says 'Date not yet verified' and activates no countdown", () => {
    const c = heroText([syntheticDraft, syntheticDisputed], "2027-01-01");
    expect(c).toHaveTextContent("Date not yet verified");
    expect(c).not.toHaveTextContent(/Starts|Happening/);
    expect(c.querySelector("time")).toBeNull();
  });
});

describe("festival cards show dates only when verified", () => {
  const card = (occurrences: readonly FestivalOccurrence[]) =>
    render(
      <ul>
        <FestivalCard festival={festival} occurrences={occurrences} />
      </ul>,
    ).container;

  it("shows each verified date with its location and year (and tradition label)", () => {
    const c = card([syntheticTraditionB, syntheticTraditionA]);
    expect(c).toHaveTextContent("Atlanta, GA · 2027");
    expect(c.querySelectorAll("time")).toHaveLength(2);
    expect(c).toHaveTextContent("Synthetic tradition A");
    expect(c).toHaveTextContent("Synthetic tradition B");
  });

  it("falls back to 'Date not yet verified' for none, draft or disputed", () => {
    for (const occurrences of [[], [syntheticDraft], [syntheticDisputed]]) {
      const c = card(occurrences);
      expect(c).toHaveTextContent("Date not yet verified");
      expect(c.querySelector("time")).toBeNull();
    }
  });
});

describe("calendar entry labels", () => {
  it("adds the tradition to the name so two observances are never confused", () => {
    const entry = { occurrence: syntheticTraditionA, name: "Test Festival", slug: "krishna-janmashtami" };
    expect(entryLabel(entry)).toBe("Test Festival (Synthetic tradition A)");
    expect(entryLabel({ ...entry, occurrence: syntheticVerifiedSingleDay })).toBe("Test Festival");
  });
});

it("a heading-level sanity check: the hero keeps a single h1", () => {
  const { container } = render(<FestivalHero festival={festival} occurrences={[syntheticMultiDayWithKeyDays]} today="2027-10-20" />);
  expect(within(container).getAllByRole("heading", { level: 1 })).toHaveLength(1);
});

import { describe, expect, it } from "vitest";
import type { CalendarEntry } from "@/lib/festivals/calendar";
import { countdownLabel, daysBetween, selectNextFestival, todayInReferenceZone } from "@/lib/festivals/next-festival";
import { syntheticDisputed, syntheticDraft, syntheticVerifiedSingleDay } from "../fixtures/occurrences";

const entry = (start: string, end = start, name = "Test", extra: Partial<CalendarEntry["occurrence"]> = {}): CalendarEntry => ({
  name,
  slug: name.toLowerCase(),
  occurrence: { ...syntheticVerifiedSingleDay, startDate: start, endDate: end, ...extra },
});

describe("todayInReferenceZone (America/New_York)", () => {
  it.each([
    ["2027-03-05T12:00:00Z", "2027-03-05"], // midday: same date everywhere
    ["2027-03-05T03:00:00Z", "2027-03-04"], // 10 pm the evening before in Atlanta (EST, UTC-5)
    ["2027-01-01T04:59:00Z", "2026-12-31"], // year boundary: still New Year's Eve in Atlanta
    ["2027-01-01T05:00:00Z", "2027-01-01"],
    ["2027-03-14T04:59:00Z", "2027-03-13"], // the instant before midnight, the day daylight saving begins
    ["2027-03-14T05:00:00Z", "2027-03-14"],
    ["2027-03-14T06:59:00Z", "2027-03-14"], // 1:59 am EST, the minute before clocks jump forward
    ["2027-03-14T07:00:00Z", "2027-03-14"], // now 3:00 am EDT
    ["2027-11-07T03:59:00Z", "2027-11-06"], // EDT (UTC-4): just before midnight, the day daylight saving ends
    ["2027-11-07T04:00:00Z", "2027-11-07"],
    ["2027-11-07T05:00:00Z", "2027-11-07"],
  ])("%s -> %s", (instant, expected) => {
    expect(todayInReferenceZone(new Date(instant))).toBe(expected);
  });
});

describe("daysBetween", () => {
  it("counts whole days, across a daylight-saving change and a leap day", () => {
    expect(daysBetween("2027-03-05", "2027-03-05")).toBe(0);
    expect(daysBetween("2027-03-05", "2027-03-06")).toBe(1);
    expect(daysBetween("2027-03-13", "2027-03-15")).toBe(2); // spans the spring-forward day
    expect(daysBetween("2027-11-06", "2027-11-08")).toBe(2); // spans the fall-back day
    expect(daysBetween("2028-02-28", "2028-03-01")).toBe(2); // 2028 is a leap year
    expect(daysBetween("2027-12-31", "2028-01-01")).toBe(1);
  });
  it("is negative when the second date is earlier, and null for invalid input", () => {
    expect(daysBetween("2027-03-05", "2027-03-01")).toBe(-4);
    expect(daysBetween("nope", "2027-03-01")).toBeNull();
    expect(daysBetween("2027-03-01", "2027-02-30")).toBeNull();
  });
});

describe("selectNextFestival", () => {
  it("returns null when there are no entries", () => {
    expect(selectNextFestival([], "2027-03-01")).toBeNull();
  });

  it("ignores draft, disputed and malformed occurrences", () => {
    const entries = [
      entry("2027-03-10", "2027-03-10", "Draft", { verificationStatus: "draft" }),
      { ...entry("2027-03-11", "2027-03-11", "Disputed"), occurrence: syntheticDisputed },
      { ...entry("x", "y", "Broken") },
      { ...entry("2027-03-09", "2027-03-02", "Backwards") },
    ];
    expect(selectNextFestival(entries, "2027-03-01")).toBeNull();
    expect(selectNextFestival([{ ...entry("2027-03-10"), occurrence: syntheticDraft }], "2027-03-01")).toBeNull();
  });

  it("picks the soonest upcoming festival, whatever order the input is in", () => {
    const entries = [entry("2027-09-01", "2027-09-01", "Late"), entry("2027-03-10", "2027-03-10", "Early"), entry("2027-06-01", "2027-06-01", "Mid")];
    const next = selectNextFestival(entries, "2027-03-01")!;
    expect(next.entry.name).toBe("Early");
    expect(next).toMatchObject({ status: "upcoming", daysUntilStart: 9 });
  });

  it("breaks ties on the same start date by name", () => {
    const entries = [entry("2027-03-10", "2027-03-10", "Beta"), entry("2027-03-10", "2027-03-10", "Alpha")];
    expect(selectNextFestival(entries, "2027-03-01")!.entry.name).toBe("Alpha");
  });

  it("counts a festival that starts today as upcoming with 0 days", () => {
    expect(selectNextFestival([entry("2027-03-05")], "2027-03-05")).toMatchObject({ status: "upcoming", daysUntilStart: 0 });
  });

  it("treats a multi-day festival as ongoing between its start and end, and on its last day", () => {
    const e = [entry("2027-03-05", "2027-03-07")];
    expect(selectNextFestival(e, "2027-03-06")).toMatchObject({ status: "ongoing", daysUntilStart: -1 });
    expect(selectNextFestival(e, "2027-03-07")).toMatchObject({ status: "ongoing" });
  });

  it("prefers a festival under way over one that starts later", () => {
    const entries = [entry("2027-03-20", "2027-03-20", "Later"), entry("2027-03-05", "2027-03-07", "Now")];
    expect(selectNextFestival(entries, "2027-03-06")!.entry.name).toBe("Now");
  });

  it("returns null once every festival has ended, and for an invalid 'today'", () => {
    expect(selectNextFestival([entry("2027-03-05", "2027-03-07")], "2027-03-08")).toBeNull();
    expect(selectNextFestival([entry("2027-03-05")], "not-a-date")).toBeNull();
  });

  it("finds a festival on the first and last day of the year", () => {
    expect(selectNextFestival([entry("2027-12-31")], "2027-12-30")).toMatchObject({ daysUntilStart: 1 });
    expect(selectNextFestival([entry("2027-01-01")], "2026-12-31")).toMatchObject({ daysUntilStart: 1 });
  });
});

describe("countdownLabel", () => {
  it("uses plain language", () => {
    expect(countdownLabel({ status: "upcoming", daysUntilStart: 12 })).toBe("Starts in 12 days");
    expect(countdownLabel({ status: "upcoming", daysUntilStart: 1 })).toBe("Starts tomorrow");
    expect(countdownLabel({ status: "upcoming", daysUntilStart: 0 })).toBe("Starts today");
    expect(countdownLabel({ status: "ongoing", daysUntilStart: -2 })).toBe("Happening now");
  });
});

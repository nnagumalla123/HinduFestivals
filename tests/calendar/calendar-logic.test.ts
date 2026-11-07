import { describe, expect, it } from "vitest";
import {
  buildEntries,
  buildMonthGrid,
  calendarHref,
  daysInMonth,
  entriesByDay,
  entriesInMonth,
  monthKey,
  monthLabel,
  parseDay,
  parseMonth,
  parseView,
  shiftMonth,
  usableEntries,
  type CalendarEntry,
} from "@/lib/festivals/calendar";
import { syntheticDisputed, syntheticDraft, syntheticVerifiedMultiDay, syntheticVerifiedSingleDay } from "../fixtures/occurrences";

const entry = (occurrence: CalendarEntry["occurrence"], name = "Test Festival"): CalendarEntry => ({
  occurrence,
  name,
  slug: occurrence.festivalSlug,
});
const MARCH = { year: 2027, month: 3 };

describe("URL parameters", () => {
  it("parseView accepts grid and list, and falls back to grid", () => {
    expect(parseView("list")).toBe("list");
    expect(parseView("grid")).toBe("grid");
    for (const bad of [undefined, "", "LIST", "table", ["list"], 5, null]) expect(parseView(bad)).toBe("grid");
  });

  it("parseMonth accepts every month of 2027", () => {
    for (let m = 1; m <= 12; m++) {
      const raw = `2027-${String(m).padStart(2, "0")}`;
      expect(parseMonth(raw)).toEqual({ year: 2027, month: m });
    }
  });

  it.each([
    undefined, "", "2027", "2027-3", "2027-00", "2027-13", "2026-12", "2028-01", "2027-03-05",
    "march", "../../etc", "2027-03<script>", ["2027-03"], 202703, null,
  ])("parseMonth falls back to January 2027 for %j", (bad) => {
    expect(parseMonth(bad)).toEqual({ year: 2027, month: 1 });
  });

  it("parseDay accepts a real day inside the month shown", () => {
    expect(parseDay("2027-03-05", MARCH)).toBe("2027-03-05");
    expect(parseDay("2027-03-31", MARCH)).toBe("2027-03-31");
  });

  it.each(["2027-04-05", "2027-03-32", "2027-02-30", "2027-03-5", "2027-03", "", "nope", undefined, ["2027-03-05"], 5])(
    "parseDay ignores %j",
    (bad) => expect(parseDay(bad, MARCH)).toBeNull(),
  );

  it("parseDay rejects Feb 29 in a non-leap year but 2027 has no leap day anyway", () => {
    expect(parseDay("2027-02-29", { year: 2027, month: 2 })).toBeNull();
    expect(parseDay("2027-02-28", { year: 2027, month: 2 })).toBe("2027-02-28");
  });
});

describe("month arithmetic and boundaries", () => {
  it("formats keys and labels", () => {
    expect(monthKey(MARCH)).toBe("2027-03");
    expect(monthLabel({ year: 2027, month: 12 })).toBe("December 2027");
  });

  it("moves to the previous and next month", () => {
    expect(shiftMonth(MARCH, 1)).toEqual({ year: 2027, month: 4 });
    expect(shiftMonth(MARCH, -1)).toEqual({ year: 2027, month: 2 });
  });

  it("stops at the edges of the calendar year", () => {
    expect(shiftMonth({ year: 2027, month: 1 }, -1)).toBeNull();
    expect(shiftMonth({ year: 2027, month: 12 }, 1)).toBeNull();
    expect(shiftMonth({ year: 2027, month: 1 }, 1)).toEqual({ year: 2027, month: 2 });
    expect(shiftMonth({ year: 2027, month: 12 }, -1)).toEqual({ year: 2027, month: 11 });
  });

  it("knows how many days each month of 2027 has (no leap day)", () => {
    const lengths = Array.from({ length: 12 }, (_, i) => daysInMonth({ year: 2027, month: i + 1 }));
    expect(lengths).toEqual([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  });
});

describe("buildMonthGrid", () => {
  it("lays January 2027 out Sunday-first (Jan 1 is a Friday)", () => {
    const weeks = buildMonthGrid({ year: 2027, month: 1 });
    expect(weeks[0]).toEqual([null, null, null, null, null, "2027-01-01", "2027-01-02"]);
    expect(weeks.at(-1)).toEqual(["2027-01-31", null, null, null, null, null, null]);
    expect(weeks).toHaveLength(6);
  });

  it("makes whole weeks and includes every day exactly once, for all twelve months", () => {
    for (let month = 1; month <= 12; month++) {
      const ym = { year: 2027, month };
      const weeks = buildMonthGrid(ym);
      expect(weeks.every((w) => w.length === 7)).toBe(true);
      const days = weeks.flat().filter((d): d is string => d !== null);
      expect(days).toHaveLength(daysInMonth(ym));
      expect(days[0]).toBe(`${monthKey(ym)}-01`);
      expect(new Set(days).size).toBe(days.length);
    }
  });

  it("needs only four rows when February starts on a Monday (Feb 2027)", () => {
    // Feb 1, 2027 is a Monday and the month has 28 days: leading blank + 4 full weeks.
    const weeks = buildMonthGrid({ year: 2027, month: 2 });
    expect(weeks[0][1]).toBe("2027-02-01");
    expect(weeks).toHaveLength(5);
  });
});

describe("placing synthetic occurrences", () => {
  it("ignores draft, disputed and malformed occurrences", () => {
    const backwards = { ...syntheticVerifiedSingleDay, startDate: "2027-03-09", endDate: "2027-03-05" };
    const impossible = { ...syntheticVerifiedSingleDay, startDate: "2027-02-30", endDate: "2027-02-30" };
    const all = [syntheticDraft, syntheticDisputed, backwards, impossible, syntheticVerifiedSingleDay].map((o) => entry(o));
    expect(usableEntries(all)).toHaveLength(1);
    expect(entriesByDay([entry(syntheticDraft)], MARCH).size).toBe(0);
  });

  it("puts a single-day festival on its day only", () => {
    const byDay = entriesByDay([entry(syntheticVerifiedSingleDay)], MARCH);
    expect([...byDay.keys()]).toEqual(["2027-03-05"]);
  });

  it("puts a multi-day festival on each of its days", () => {
    const byDay = entriesByDay([entry(syntheticVerifiedMultiDay)], MARCH);
    expect([...byDay.keys()]).toEqual(["2027-03-05", "2027-03-06", "2027-03-07"]);
  });

  it("shows a festival that crosses a month boundary in both months", () => {
    const crossing = entry({ ...syntheticVerifiedSingleDay, startDate: "2027-03-30", endDate: "2027-04-02" });
    expect([...entriesByDay([crossing], MARCH).keys()]).toEqual(["2027-03-30", "2027-03-31"]);
    expect([...entriesByDay([crossing], { year: 2027, month: 4 }).keys()]).toEqual(["2027-04-01", "2027-04-02"]);
    expect(entriesInMonth([crossing], MARCH)).toHaveLength(1);
    expect(entriesInMonth([crossing], { year: 2027, month: 4 })).toHaveLength(1);
    expect(entriesInMonth([crossing], { year: 2027, month: 5 })).toHaveLength(0);
  });

  it("handles the first and last day of the year", () => {
    const newYear = entry({ ...syntheticVerifiedSingleDay, startDate: "2027-01-01", endDate: "2027-01-01" });
    const newYearsEve = entry({ ...syntheticVerifiedSingleDay, startDate: "2027-12-31", endDate: "2027-12-31" });
    expect(entriesInMonth([newYear], { year: 2027, month: 1 })).toHaveLength(1);
    expect(entriesInMonth([newYearsEve], { year: 2027, month: 12 })).toHaveLength(1);
  });

  it("lists entries earliest first", () => {
    const late = entry({ ...syntheticVerifiedSingleDay, startDate: "2027-03-20", endDate: "2027-03-20" }, "Late");
    const early = entry({ ...syntheticVerifiedSingleDay, startDate: "2027-03-02", endDate: "2027-03-02" }, "Early");
    expect(entriesInMonth([late, early], MARCH).map((e) => e.name)).toEqual(["Early", "Late"]);
  });

  it("buildEntries drops occurrences for unknown festivals", () => {
    const known = { ...syntheticVerifiedSingleDay, festivalSlug: "holi" };
    const entries = buildEntries([known, syntheticVerifiedSingleDay], [{ slug: "holi", name: "Holi" }]);
    expect(entries).toEqual([{ occurrence: known, name: "Holi", slug: "holi" }]);
  });
});

describe("calendarHref", () => {
  const jan = { year: 2027, month: 1 };
  it("leaves out default values", () => {
    expect(calendarHref({ view: "grid", month: jan })).toBe("/calendar");
  });
  it("includes non-default view, month and day", () => {
    expect(calendarHref({ view: "list", month: MARCH })).toBe("/calendar?view=list&month=2027-03");
    expect(calendarHref({ view: "grid", month: MARCH, day: "2027-03-05" })).toBe("/calendar?month=2027-03&day=2027-03-05");
  });
});

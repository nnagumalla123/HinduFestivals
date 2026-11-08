import { REFERENCE_CALENDAR } from "./constants";
import { isVerified, parseIsoDate } from "./occurrences";
import type { FestivalOccurrence } from "./types";
import { usableEntries, type CalendarEntry } from "./calendar";

/*
 * "What is the next festival?" as pure functions. They never read the clock themselves:
 * the caller passes in `today`, so tests can use any date and nothing here can drift.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Today's civil date ("YYYY-MM-DD") at the reference location. A festival's date belongs to the
 * reference calendar, so "today" is measured there, not in the visitor's or the server's time zone.
 */
export function todayInReferenceZone(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: REFERENCE_CALENDAR.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Whole days from `fromIso` to `toIso` (negative if `toIso` is earlier); null if either is not a real date. */
export function daysBetween(fromIso: string, toIso: string): number | null {
  const from = parseIsoDate(fromIso);
  const to = parseIsoDate(toIso);
  // Both are UTC midnights, so the difference is an exact whole number of days (no daylight-saving drift).
  return from && to ? Math.round((to.getTime() - from.getTime()) / MS_PER_DAY) : null;
}

export interface NextFestival {
  entry: CalendarEntry;
  /** "upcoming" starts later; "ongoing" has already started and has not ended yet. */
  status: "upcoming" | "ongoing";
  /** Days until the start date (0 = starts today, negative = already under way). */
  daysUntilStart: number;
}

/**
 * The verified occurrence that is under way or starts soonest on or after `today`.
 * Draft, disputed and malformed occurrences are ignored. Returns null when there is none.
 */
export function selectNextFestival(entries: readonly CalendarEntry[], today: string): NextFestival | null {
  if (!parseIsoDate(today)) return null;

  const candidates = usableEntries(entries)
    .filter(({ occurrence }) => occurrence.endDate >= today)
    .sort(
      (a, b) =>
        a.occurrence.startDate.localeCompare(b.occurrence.startDate) || a.name.localeCompare(b.name),
    );
  const entry = candidates[0];
  if (!entry) return null;

  const daysUntilStart = daysBetween(today, entry.occurrence.startDate) ?? 0;
  return { entry, status: entry.occurrence.startDate < today ? "ongoing" : "upcoming", daysUntilStart };
}

/** Plain-language countdown for a selected festival. */
export function countdownLabel({ status, daysUntilStart }: Pick<NextFestival, "status" | "daysUntilStart">): string {
  if (status === "ongoing") return "Happening now";
  if (daysUntilStart === 0) return "Starts today";
  if (daysUntilStart === 1) return "Starts tomorrow";
  return `Starts in ${daysUntilStart} days`;
}

/**
 * A countdown for one occurrence, or null when there must not be one: the date is not verified, is
 * malformed, or has already passed. Never invents a date.
 */
export function occurrenceCountdown(occurrence: FestivalOccurrence, today: string): string | null {
  if (!isVerified(occurrence) || !parseIsoDate(today)) return null;
  if (!parseIsoDate(occurrence.startDate) || !parseIsoDate(occurrence.endDate)) return null;
  if (occurrence.startDate > occurrence.endDate || occurrence.endDate < today) return null;
  const daysUntilStart = daysBetween(today, occurrence.startDate) ?? 0;
  return countdownLabel({ status: occurrence.startDate < today ? "ongoing" : "upcoming", daysUntilStart });
}

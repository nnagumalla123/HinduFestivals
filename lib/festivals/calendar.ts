import { REFERENCE_CALENDAR } from "./constants";
import { isVerified, parseIsoDate } from "./occurrences";
import type { FestivalOccurrence } from "./types";

/*
 * Pure calendar logic (no React, no clock). Everything works on civil dates written as
 * "YYYY-MM-DD" strings. The calendar covers one reference year only (PRD section 7).
 */

export const CALENDAR_YEAR = REFERENCE_CALENDAR.year;

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export type CalendarView = "grid" | "list";

/** A month inside the calendar year. `month` is 1-12. */
export interface YearMonth {
  year: number;
  month: number;
}

/** One verified occurrence plus the festival details a calendar needs to show it. */
export interface CalendarEntry {
  occurrence: FestivalOccurrence;
  name: string;
  slug: string;
}

export const DEFAULT_VIEW: CalendarView = "grid";
export const DEFAULT_MONTH: YearMonth = { year: CALENDAR_YEAR, month: 1 };

// ---- Reading the URL. Every function falls back to a safe default; the URL is untrusted input. ----

/** Accepts only "grid" or "list". Anything else (including repeated params) becomes the default. */
export function parseView(raw: unknown): CalendarView {
  return raw === "list" ? "list" : DEFAULT_VIEW;
}

/** Accepts "YYYY-MM" inside the calendar year ("2027-03"). Anything else becomes January. */
export function parseMonth(raw: unknown): YearMonth {
  if (typeof raw !== "string") return DEFAULT_MONTH;
  const match = /^(\d{4})-(\d{2})$/.exec(raw);
  if (!match) return DEFAULT_MONTH;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (year !== CALENDAR_YEAR || month < 1 || month > 12) return DEFAULT_MONTH;
  return { year, month };
}

/** Accepts a real "YYYY-MM-DD" date that falls inside `month`; otherwise null (no day selected). */
export function parseDay(raw: unknown, month: YearMonth): string | null {
  if (typeof raw !== "string" || !parseIsoDate(raw)) return null;
  return raw.startsWith(monthKey(month) + "-") ? raw : null;
}

// ---- Month arithmetic ----

export function monthKey({ year, month }: YearMonth): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function monthLabel({ year, month }: YearMonth): string {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

/** The month `delta` months away, or null when it would leave the calendar year. */
export function shiftMonth(from: YearMonth, delta: number): YearMonth | null {
  const month = from.month + delta;
  return month < 1 || month > 12 ? null : { year: from.year, month };
}

export function daysInMonth({ year, month }: YearMonth): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate(); // day 0 of next month = last day of this one
}

export function isoDay(ym: YearMonth, day: number): string {
  return `${monthKey(ym)}-${String(day).padStart(2, "0")}`;
}

/**
 * Weeks of the month as rows of 7 cells, Sunday first (US convention). Cells outside the
 * month are null. Always whole weeks, so the grid has 4 to 6 rows.
 */
export function buildMonthGrid(ym: YearMonth): (string | null)[][] {
  const leading = new Date(Date.UTC(ym.year, ym.month - 1, 1)).getUTCDay(); // 0 = Sunday
  const cells: (string | null)[] = [
    ...Array<null>(leading).fill(null),
    ...Array.from({ length: daysInMonth(ym) }, (_, i) => isoDay(ym, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// ---- Placing occurrences on days ----

/** Verified entries whose dates are real and in order. Everything else is ignored, never guessed. */
export function usableEntries(entries: readonly CalendarEntry[]): CalendarEntry[] {
  return entries.filter(({ occurrence: o }) => {
    const start = parseIsoDate(o.startDate);
    const end = parseIsoDate(o.endDate);
    return isVerified(o) && start !== null && end !== null && start <= end;
  });
}

/** Every day an entry covers (a multi-day festival appears on each of its days), inside `ym` only. */
export function entriesByDay(
  entries: readonly CalendarEntry[],
  ym: YearMonth,
): Map<string, CalendarEntry[]> {
  const byDay = new Map<string, CalendarEntry[]>();
  for (const entry of usableEntries(entries)) {
    for (let d = 1; d <= daysInMonth(ym); d++) {
      const day = isoDay(ym, d);
      if (entry.occurrence.startDate <= day && day <= entry.occurrence.endDate) {
        byDay.set(day, [...(byDay.get(day) ?? []), entry]);
      }
    }
  }
  return byDay;
}

/** Entries that overlap `ym` at all, earliest first (ISO strings sort correctly as text). */
export function entriesInMonth(entries: readonly CalendarEntry[], ym: YearMonth): CalendarEntry[] {
  const first = isoDay(ym, 1);
  const last = isoDay(ym, daysInMonth(ym));
  return usableEntries(entries)
    .filter(({ occurrence: o }) => o.startDate <= last && o.endDate >= first)
    .sort((a, b) => a.occurrence.startDate.localeCompare(b.occurrence.startDate) || a.name.localeCompare(b.name));
}

// ---- Writing the URL ----

/** Builds a /calendar link. Default values are left out so URLs stay short and tidy. */
export function calendarHref(state: { view: CalendarView; month: YearMonth; day?: string | null }): string {
  const params = new URLSearchParams();
  if (state.view !== DEFAULT_VIEW) params.set("view", state.view);
  if (monthKey(state.month) !== monthKey(DEFAULT_MONTH)) params.set("month", monthKey(state.month));
  if (state.day) params.set("day", state.day);
  const query = params.toString();
  return query ? `/calendar?${query}` : "/calendar";
}

/** Pairs occurrences with their festival's name and slug. Occurrences for unknown festivals are dropped. */
export function buildEntries(
  occurrences: readonly FestivalOccurrence[],
  festivals: readonly { slug: string; name: string }[],
): CalendarEntry[] {
  const bySlug = new Map(festivals.map((f) => [f.slug, f]));
  return occurrences.flatMap((occurrence) => {
    const festival = bySlug.get(occurrence.festivalSlug);
    return festival ? [{ occurrence, name: festival.name, slug: festival.slug }] : [];
  });
}

/** "Name" or "Name (Tradition)" so tradition-specific observances are never mistaken for each other. */
export function entryLabel(entry: CalendarEntry): string {
  const tradition = entry.occurrence.traditionLabel?.trim();
  return tradition ? `${entry.name} (${tradition})` : entry.name;
}

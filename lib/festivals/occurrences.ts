import type { FestivalOccurrence } from "./types";

/**
 * Verified festival dates. EMPTY ON PURPOSE: real, sourced Atlanta 2027 dates arrive in
 * Phase 3 (PRD section 7). tests/festivals/occurrences.test.ts fails if this is filled in early.
 */
export const mockOccurrences: readonly FestivalOccurrence[] = [];

/** Only verified occurrences may be shown as dates, counted down to, or scheduled. */
export function isVerified(occurrence: FestivalOccurrence): boolean {
  return occurrence.verificationStatus === "verified";
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parses "YYYY-MM-DD" at UTC midnight. Returns null for malformed or impossible dates (e.g. 2027-02-30). */
export function parseIsoDate(iso: string): Date | null {
  const match = ISO_DATE.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  // JavaScript rolls impossible dates forward (Feb 30 -> Mar 2), so check it round-trips.
  const valid =
    date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
  return valid ? date : null;
}

const DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC", // the date is a civil date, so format it in UTC to avoid a day shift
});

/** "Fri, Mar 5" for "2027-03-05"; null if the input is not a real date. The year is shown separately, with the location. */
export function formatCivilDay(iso: string): string | null {
  const date = parseIsoDate(iso);
  return date ? DAY_FORMAT.format(date) : null;
}

const FULL_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** "March 5, 2027" for "2027-03-05" (used for review and access dates); null if not a real date. */
export function formatCivilDate(iso: string): string | null {
  const date = parseIsoDate(iso);
  return date ? FULL_DATE_FORMAT.format(date) : null;
}

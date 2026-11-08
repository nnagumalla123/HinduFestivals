/**
 * Reference calendar for the first release (PRD section 7). Festival dates depend on
 * location, so the site always states which location it is talking about.
 * Phase 3 will load this from the `calendar_locations` table.
 */
export const REFERENCE_CALENDAR = {
  /** Stable key used by content files (`locationSlug`). */
  slug: "atlanta-ga",
  label: "Atlanta, GA",
  year: 2027,
  /** IANA time zone of the reference location (docs/ARCHITECTURE.md section 4). Decides what "today" means for countdowns. */
  timeZone: "America/New_York",
} as const;

export const DATE_NOT_VERIFIED_LABEL = "Date not yet verified";

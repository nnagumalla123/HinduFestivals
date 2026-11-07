/**
 * Reference calendar for the first release (PRD section 7). Festival dates depend on
 * location, so the site always states which location it is talking about.
 * Phase 3 will load this from the `calendar_locations` table.
 */
export const REFERENCE_CALENDAR = {
  label: "Atlanta, GA",
  year: 2027,
} as const;

export const DATE_NOT_VERIFIED_LABEL = "Date not yet verified";

/**
 * Mock-phase festival shape. Phase 3 replaces this with database-backed types.
 *
 * Deliberately there is NO date field here. `dateStatus` can only be "not_verified",
 * so TypeScript itself stops anyone from attaching an unverified date to mock data.
 * Real, sourced occurrences arrive in Phase 3.
 */
export interface MockFestival {
  slug: string;
  name: string;
  aliases: readonly string[];
  /** One neutral line. Placeholder wording, pending editorial review. */
  subtitle: string;
  dateStatus: "not_verified";
}

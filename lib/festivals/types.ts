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
  /**
   * Deity names that people commonly associate with the festival, used ONLY so search
   * can find it (e.g. "Lakshmi" finds Diwali). PENDING EDITORIAL REVIEW: these are not
   * claims about how any tradition or family observes the festival, and many festivals
   * are celebrated differently across traditions. Phase 3 replaces this with the
   * attributed `festival_deities` relation.
   */
  deities: readonly string[];
  dateStatus: "not_verified";
}

/** Editorial state of a date (docs/ARCHITECTURE.md section 3). Only "verified" is ever shown as a date. */
export type VerificationStatus = "draft" | "verified" | "disputed";

/**
 * One festival observance for one reference location and year (a subset of the
 * future `festival_occurrences` table). Dates are civil calendar dates written as
 * "YYYY-MM-DD" strings, never JavaScript Dates, so no time zone can shift the day.
 *
 * Production data (`mockOccurrences`) is empty until Phase 3 verifies real dates.
 */
export interface FestivalOccurrence {
  festivalSlug: string;
  year: number;
  startDate: string;
  endDate: string;
  /** Reference calendar location, e.g. "Atlanta, GA". Required so a date can never lose its location. */
  locationLabel: string;
  verificationStatus: VerificationStatus;
}

/** The section kinds from the festival detail contract (docs/ARCHITECTURE.md section 3). */
export type GuideSectionKind =
  | "overview"
  | "significance"
  | "story"
  | "rituals"
  | "food"
  | "fasting"
  | "traditional_guide"
  | "college_guide"
  | "regional_variation";

/**
 * A detail-page section is either written and reviewed, or honestly "not available".
 * There is no third state, so a half-written section cannot be shown as finished.
 */
export type GuideSection =
  | { kind: GuideSectionKind; title: string; status: "not_available" }
  | {
      kind: GuideSectionKind;
      title: string;
      status: "published";
      body: string;
      /** Tradition the content is attributed to, when it is not general. */
      tradition?: string;
      /** ISO date the section was editorially reviewed. */
      reviewedAt: string;
    };

/**
 * What a source is cited for. Kept separate on purpose (PRD section 11): a source that
 * verifies a date is not automatically a source for cultural claims, and festival-discovery
 * lists are never shown as citations at all, so they have no role here.
 */
export type SourceRole = "date" | "cultural";

export interface FestivalSource {
  role: SourceRole;
  title: string;
  url: string;
  publisher?: string;
  /** ISO date the source was last checked. */
  accessedAt: string;
}

/** Reviewed written content for one festival. Anything not in here is shown as "Not yet available". */
export interface FestivalGuide {
  /** Only `status: "published"` sections are ever shown. */
  sections: readonly GuideSection[];
  sources: readonly FestivalSource[];
}

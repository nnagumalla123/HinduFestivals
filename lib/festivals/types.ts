/**
 * A festival as shown on public pages. Only `slug` and `name` are always trustworthy: they are
 * the canonical name and URL. Everything else is shown only once the festival's basics have been
 * editorially reviewed (`FestivalRecord.basics`, content/festivals/*):
 *   - `subtitle`, `aliases`, `deities` are APPROVED display content, empty/absent until review;
 *   - `provisional` holds the unreviewed wording. It exists ONLY so search can still find the
 *     festival (e.g. "Dussehra" or "Lakshmi"); it must never be displayed as a fact.
 * Dates are not here at all: they live on `FestivalOccurrence`, handed out only when verified.
 */
export interface Festival {
  slug: string;
  name: string;
  aliases: readonly string[];
  subtitle?: string;
  deities: readonly string[];
  provisional: { aliases: readonly string[]; deities: readonly string[] };
}

/** Editorial state of a date (docs/ARCHITECTURE.md section 3). Only "verified" is ever shown as a date. */
export type VerificationStatus = "draft" | "verified" | "disputed";

/**
 * One festival observance for one reference location and year (a subset of the
 * future `festival_occurrences` table). Dates are civil calendar dates written as
 * "YYYY-MM-DD" strings, never JavaScript Dates, so no time zone can shift the day.
 *
 * Production data comes from the content loader, which only hands out occurrences that are
 * `verified` AND pass validation (lib/festivals/content/validate.ts).
 */
export interface FestivalOccurrence {
  festivalSlug: string;
  year: number;
  startDate: string;
  endDate: string;
  /** Reference calendar location, e.g. "Atlanta, GA". Required so a date can never lose its location. */
  locationLabel: string;
  verificationStatus: VerificationStatus;
  /** Set for a tradition-specific observance (e.g. "Smarta"); absent for a general one. Shown with the date. */
  traditionLabel?: string;
  /** How the date was determined (shown as date methodology). */
  method?: string;
  /** ISO date the date was verified. */
  verifiedAt?: string;
  /** Labelled days inside a multi-day observance (e.g. the main puja day). Dates are inside start and end. */
  keyDays?: readonly KeyDay[];
}

export interface KeyDay {
  date: string;
  label: string;
  /** True for the one most widely observed day, when the festival has one. */
  main?: boolean;
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
      /** Ids (FestivalSource.id) of the sources behind this section, for numbered citations. */
      sourceIds: readonly string[];
    };

/**
 * What a source is cited for. Kept separate on purpose (PRD section 11): a source that
 * verifies a date is not automatically a source for cultural claims, and festival-discovery
 * lists are never shown as citations at all, so they have no role here.
 */
export type SourceRole = "date" | "cultural";

export interface FestivalSource {
  /** Stable id that sections, quick facts and deities cite. */
  id: string;
  role: SourceRole;
  title: string;
  url: string;
  publisher?: string;
  /** ISO date the source was last checked. */
  accessedAt: string;
}

/** Every label a quick fact may carry (kept in step with QUICK_FACT_KEYS in content/schema.ts; a test checks this). */
export const QUICK_FACT_LABELS = [
  "Meaning",
  "Length of observance",
  "Associated deities",
  "Common customs",
  "Dietary practices",
  "Signature foods",
] as const;
export type QuickFactLabel = (typeof QUICK_FACT_LABELS)[number];

/**
 * The five at-a-glance slots on the detail page, in display order. The last slot takes either
 * "Dietary practices" (for example a fasting or diet note) or "Signature foods" (a festival's
 * characteristic dishes, where calling it a dietary rule would mislead). An empty slot shows
 * "Not yet available" under its first label.
 */
export const QUICK_FACT_SLOTS: readonly (readonly QuickFactLabel[])[] = [
  ["Meaning"],
  ["Length of observance"],
  ["Associated deities"],
  ["Common customs"],
  ["Dietary practices", "Signature foods"],
];

/** A reviewed quick fact. Drafts and internal notes never reach this shape. */
export interface PublicQuickFact {
  label: QuickFactLabel;
  text: string;
  /** Tradition or region the fact is attributed to, when it is not general. */
  tradition?: string;
  /** ISO review date. */
  reviewedAt: string;
  sourceIds: readonly string[];
}

/** A reviewed deity association; the tradition that makes it is always stated. */
export interface PublicDeity {
  name: string;
  role: string;
  tradition: string;
  reviewedAt: string;
  sourceIds: readonly string[];
}

/** Reviewed written content for one festival. Anything not in here is shown as "Not yet available". */
export interface FestivalGuide {
  /** Only `status: "published"` sections are ever shown. */
  sections: readonly GuideSection[];
  quickFacts: readonly PublicQuickFact[];
  deities: readonly PublicDeity[];
  /** Every source cited by the reviewed content above (never discovery sources, never holiday-list sources). */
  sources: readonly FestivalSource[];
  /**
   * True only when drafted guide content exists that is NOT yet published (a draft or in-review item, or a
   * reviewed item withheld by validation). It carries no content, only the fact. The page uses it to show the
   * "partly reviewed" notice: a guide that simply has no optional section is not partly reviewed.
   */
  pendingReview?: boolean;
}

/** A guide with nothing reviewed yet. */
export const EMPTY_GUIDE: FestivalGuide = { sections: [], quickFacts: [], deities: [], sources: [] };

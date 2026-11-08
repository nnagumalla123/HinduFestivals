import type { GuideSectionKind, VerificationStatus } from "../types";

/*
 * AUTHORED content shapes: what editors write in `content/festivals/<slug>.ts`.
 * These are richer than the PUBLIC shapes in ../types.ts (they carry review state,
 * internal reviewer names and every source). `load.ts` turns them into public shapes
 * and is the only bridge, so nothing internal can leak by accident.
 *
 * The shapes follow the relational model in docs/ARCHITECTURE.md section 3, so moving to
 * database tables later is a mapping exercise, not a redesign.
 */

/** draft: still being written (placeholders allowed). in_review: waiting for the owner. reviewed: approved to publish. */
export type ReviewStatus = "draft" | "in_review" | "reviewed";

/**
 * What a source may be used for (PRD section 11 keeps these jobs separate):
 * - date: backs an occurrence's date.
 * - cultural: backs stories, customs, food, fasting, regional notes.
 * - discovery: only helped find a festival or name. Never cited publicly, never proof of anything.
 */
export type ContentSourceRole = "date" | "cultural" | "discovery";

export type SourceKind = "calendar" | "text" | "temple" | "academic" | "cultural" | "other";

export interface ContentSource {
  /** Stable key that sections and occurrences point to, e.g. "diwali-temple-guide". */
  id: string;
  role: ContentSourceRole;
  kind: SourceKind;
  title: string;
  url: string;
  publisher?: string;
  /** ISO date the page was actually opened and read. */
  accessedAt: string;
  /** The specific claims this source supports (required before the source may back published content). */
  claimsSupported: readonly string[];
  /**
   * Source-use audit trail (docs/research/cultural/source-use-policy.md). Four separate questions, kept
   * apart on purpose:
   *  1. `termsChecked`: was the terms/copyright page actually read? (Informational. An unread or missing
   *     terms page does NOT block an original factual paraphrase, and a missing page is never permission.)
   *  2. `reproducesProtectedContent`: does our use copy protected text, images or data? (Original
   *     paraphrase of facts: false.)
   *  3. `permissionRequired`: do the terms, or the law, require permission for the INTENDED use
   *     (paraphrase plus a link)? "unresolved" blocks publication until someone decides.
   *  4. `permissionStatus`: where permission is needed, whether it has been obtained.
   */
  termsChecked: boolean;
  reproducesProtectedContent: boolean;
  permissionRequired: "no" | "yes" | "unresolved";
  permissionStatus: "not_needed" | "not_requested" | "requested" | "granted" | "denied";
  /** INTERNAL audit note: what the terms said, or why they could not be checked. Required for publication. Never published. */
  termsNote?: string;

  // --- date sources only ---
  /** The source computes dates for the reference location (not just India or a generic default). */
  locationSpecific?: boolean;
  /** How the source says it calculates or decides the observance day. */
  methodNote?: string;
  /**
   * Sources built on the same underlying calendar data share a group name. Two sources in the
   * same group are NOT an independent check of each other.
   */
  independenceGroup?: string;
  /** A general holiday-list site (e.g. CalendarLabs): cross-check only, never primary or the independent check. */
  holidayList?: boolean;
}

/** Review fields shared by everything that can be published. Reviewer identity stays internal. */
export interface ReviewInfo {
  status: ReviewStatus;
  /** ISO date of approval (shown publicly). */
  reviewedAt?: string;
  /** Who approved it. INTERNAL: never copied into public data. */
  reviewedBy?: string;
}

export interface ContentSection extends ReviewInfo {
  kind: GuideSectionKind;
  title: string;
  /** Plain text; paragraphs separated by a blank line. */
  body: string;
  /** Tradition or community the content is attributed to (required for stories and regional variations). */
  tradition?: string;
  /** Ids of `cultural` sources. Optional only for practical college guidance. */
  sourceIds: readonly string[];
  /**
   * INTERNAL editorial notes: claims that rest on one source, wording to double-check, open questions
   * for the reviewer. Never copied into public data.
   */
  reviewNotes?: readonly string[];
}

/** The quick-fact labels shown on the detail page (kept in step with components/festivals/detail/QuickFacts.tsx). */
export const QUICK_FACT_KEYS = [
  "Meaning",
  "Length of observance",
  "Associated deities",
  "Common customs",
  "Dietary practices",
] as const;
export type QuickFactKey = (typeof QUICK_FACT_KEYS)[number];

/** One at-a-glance fact. Validated now; published only once the detail page is wired to it (P3-04). */
export interface ContentQuickFact extends ReviewInfo {
  label: QuickFactKey;
  text: string;
  tradition?: string;
  sourceIds: readonly string[];
  reviewNotes?: readonly string[];
}

/** A deity and the tradition that associates them with the festival. Validated now; published in P3-04. */
export interface ContentDeity extends ReviewInfo {
  name: string;
  /** Their role in the festival, in one or two plain sentences. */
  role: string;
  /** Which tradition or region makes the association (required, so none reads as universal). */
  tradition: string;
  sourceIds: readonly string[];
  reviewNotes?: readonly string[];
}

/**
 * A labelled day inside a multi-day observance (for example "Lakshmi Puja"). At most one is the main day.
 * These are part of the occurrence, so they are shown only when the occurrence itself is verified.
 */
export interface ContentKeyDay {
  /** Civil date, inside the occurrence's start and end dates. */
  date: string;
  label: string;
  /** The single most widely observed day of the occurrence, when the festival has one. */
  main?: boolean;
}

export interface ContentOccurrence {
  year: number;
  startDate: string;
  endDate: string;
  /** Must be the reference location's slug. */
  locationSlug: string;
  /** "general" for the one common observance, otherwise a short key such as "smarta". */
  traditionKey: string;
  /** Public label for a tradition-specific observance; required when traditionKey is not "general". */
  traditionLabel?: string;
  status: VerificationStatus;
  verifiedAt?: string;
  /** INTERNAL: who approved the date. */
  verifiedBy?: string;
  /** How the date was determined (shown as date methodology). */
  method?: string;
  /** Labelled days inside a multi-day observance (public once the occurrence is verified). */
  keyDays?: readonly ContentKeyDay[];
  /** Ids of `date` sources. */
  sourceIds: readonly string[];
  /** Internal notes, e.g. why a date is disputed. */
  notes?: string;
}

export interface FestivalRecord {
  slug: string;
  name: string;
  aliases: readonly string[];
  subtitle: string;
  deities: readonly string[];
  /**
   * Review state of the name/aliases/subtitle/deities. These were written as provisional
   * wording in Phase 2 and are not verified cultural information until `status` is "reviewed".
   * (They still display as they do today; this records the truth about their review.)
   */
  basics: ReviewInfo;
  sections: readonly ContentSection[];
  quickFacts?: readonly ContentQuickFact[];
  /** Attributed deity entries. The plain `deities` list above stays as provisional search terms. */
  deityEntries?: readonly ContentDeity[];
  occurrences: readonly ContentOccurrence[];
  /** Every source used or considered, including discovery and cross-check sources. */
  sources: readonly ContentSource[];
}

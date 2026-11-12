import { FESTIVAL_RECORDS } from "@/content";
import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { publishAll, publishRecord } from "@/lib/festivals/content/load";
import type { Festival } from "@/lib/festivals/types";

/**
 * The ten real festivals as public pages see them today (synchronous, for tests). The three reviewed pilots
 * (Diwali, Ugadi, Navaratri) and the four Batch A guides show their approved basics; the other three (Batch B) are unreviewed, so name and slug only.
 */
export const contentFestivals: readonly Festival[] = publishAll(FESTIVAL_RECORDS, "2027-01-01").map((p) => p.festival);

/**
 * SYNTHETIC: the festival as it WILL look once its basics are reviewed (approved subtitle, aliases, deities).
 * Used to test display code only; the review stamp here is invented.
 */
export function withReviewedBasics(slug: string): Festival {
  const record = FESTIVAL_RECORDS.find((r) => r.slug === slug)!;
  const reviewed = { ...record, basics: { status: "reviewed" as const, reviewedAt: "2027-01-01", reviewedBy: "Test" } };
  return publishRecord(reviewed, "2027-01-02").festival;
}

/** Slugs whose basics and guides were reviewed in P3-05B (the three pilots). */
export const REVIEWED_PILOT_SLUGS = ["diwali", "ugadi", "navaratri"] as const;
/** Batch A, reviewed in P3-05 on 2026-11-08. */
export const REVIEWED_BATCH_A_SLUGS = ["makara-sankranti", "maha-shivaratri", "holi", "rama-navami"] as const;
/** Batch B, reviewed in P3-05 on 2026-11-12. */
export const REVIEWED_BATCH_B_SLUGS = ["krishna-janmashtami", "ganesh-chaturthi", "vijayadashami"] as const;
/** Every festival: all ten basics and guides are now reviewed. */
export const REVIEWED_SLUGS: readonly string[] = [...REVIEWED_PILOT_SLUGS, ...REVIEWED_BATCH_A_SLUGS, ...REVIEWED_BATCH_B_SLUGS];

/**
 * SYNTHETIC: a real record put back into its pre-review (draft) state, so the draft-handling code (name only,
 * provisional search terms, work-in-progress notice) stays under test now that no real festival is draft.
 */
export function asDraftRecord(slug: string): FestivalRecord {
  const r = FESTIVAL_RECORDS.find((x) => x.slug === slug)!;
  const draft = <T extends { status: string }>(item: T) => ({ ...item, status: "draft" as const, reviewedAt: undefined, reviewedBy: undefined });
  return {
    ...r,
    basics: { status: "draft" },
    sections: r.sections.map(draft),
    quickFacts: r.quickFacts?.map(draft),
    deityEntries: r.deityEntries?.map(draft),
  };
}
/** The three Batch B festivals as they looked before review (synthetic, see asDraftRecord). */
export const draftFestivals: readonly Festival[] = REVIEWED_BATCH_B_SLUGS.map((slug) => publishRecord(asDraftRecord(slug), "2027-01-01").festival);

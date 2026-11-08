import { FESTIVAL_RECORDS } from "@/content";
import { publishAll, publishRecord } from "@/lib/festivals/content/load";
import type { Festival } from "@/lib/festivals/types";

/** The ten real festivals as public pages see them today (synchronous, for tests): unreviewed basics, so name and slug only. */
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

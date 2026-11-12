/*
 * Review dates by entry. Every entry keeps the date of the batch that approved it, EXCEPT the entries the owner
 * explicitly re-approved after the P3-06 audit (2026-11-12, findings F-01 to F-05, F-07, F-08, F-14). A change to any
 * other entry's text must come with an owner re-approval and an update here, so it cannot happen silently.
 */
export const BATCH_B_SLUGS = ["krishna-janmashtami", "ganesh-chaturthi", "vijayadashami"] as const;
export const ORIGINAL_DATE = "2026-11-08"; // the three pilots and Batch A
export const BATCH_B_DATE = "2026-11-12";
export const P3_06_DATE = "2026-11-12";

export interface RevisedEntries {
  sections?: readonly string[];
  quickFacts?: readonly string[];
  deities?: readonly string[];
}
/** Entries re-approved by the owner on 2026-11-12 after the P3-06 audit, by slug. */
export const P3_06_REVISED: Readonly<Record<string, RevisedEntries>> = {
  navaratri: { sections: ["Fasting and food", "Celebrating Navaratri away from home"] }, // F-01
  "makara-sankranti": { sections: ["Why celebrate Makara Sankranti?", "A solar festival: tradition and astronomy"], quickFacts: ["Meaning"] }, // F-02
  holi: { sections: ["Celebrating Holi away from home", "Holi beyond temples and homes"] }, // F-03, F-08
  "rama-navami": { sections: ["Fasting and food"], quickFacts: ["Signature foods"] }, // F-04
  ugadi: { sections: ["Celebrating Ugadi away from home"] }, // F-05
  "ganesh-chaturthi": { deities: ["Parvati"] }, // F-07 (Batch B, same review date)
  vijayadashami: { sections: ["Vijayadashami, Dussehra and Dasara: the names"] }, // F-14 (Batch B, same review date)
};

type Kind = "sections" | "quickFacts" | "deities";
export function expectedReviewDate(slug: string, kind: Kind, key: string): string {
  if (P3_06_REVISED[slug]?.[kind]?.includes(key)) return P3_06_DATE;
  return (BATCH_B_SLUGS as readonly string[]).includes(slug) ? BATCH_B_DATE : ORIGINAL_DATE;
}

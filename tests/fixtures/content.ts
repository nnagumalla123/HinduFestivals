import type { ContentOccurrence, ContentSection, ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * SYNTHETIC TEST CONTENT. Invented to exercise the validators and the loader. None of it is real
 * cultural, religious or calendar information. Never import this file from app/, components/ or lib/.
 */
export const TODAY = "2027-06-01";

export const culturalSource: ContentSource = {
  id: "test-cultural",
  role: "cultural",
  kind: "temple",
  title: "Test cultural source",
  url: "https://example.test/culture",
  accessedAt: "2027-05-01",
  claimsSupported: ["Synthetic claim"],
  termsChecked: true,
  reproducesProtectedContent: false,
  permissionRequired: "no",
  permissionStatus: "not_needed",
  termsNote: "Synthetic audit note.",
};

export const primaryDateSource: ContentSource = {
  id: "test-date-primary",
  role: "date",
  kind: "calendar",
  title: "Test Atlanta calendar",
  url: "https://example.test/atlanta",
  accessedAt: "2027-05-02",
  claimsSupported: ["Synthetic date"],
  termsChecked: true,
  reproducesProtectedContent: false,
  permissionRequired: "no",
  permissionStatus: "not_needed",
  termsNote: "Synthetic audit note.",
  locationSpecific: true,
  methodNote: "Synthetic method note",
  independenceGroup: "engine-a",
};

export const independentDateSource: ContentSource = {
  ...primaryDateSource,
  id: "test-date-independent",
  title: "Test independent calendar",
  url: "https://example.test/independent",
  locationSpecific: false,
  methodNote: undefined,
  independenceGroup: "engine-b",
};

export const sameDataDateSource: ContentSource = {
  ...independentDateSource,
  id: "test-date-same-data",
  independenceGroup: "engine-a", // same underlying data as the primary: not independent
};

export const holidayListSource: ContentSource = {
  ...independentDateSource,
  id: "test-holiday-list",
  title: "Test holiday list",
  holidayList: true,
  independenceGroup: "list-site",
};

export const discoverySource: ContentSource = {
  id: "test-discovery",
  role: "discovery",
  kind: "other",
  title: "Test discovery list",
  url: "https://example.test/discovery",
  accessedAt: "2027-05-03",
  claimsSupported: [],
  termsChecked: true,
  reproducesProtectedContent: false,
  permissionRequired: "no",
  permissionStatus: "not_needed",
  termsNote: "Synthetic audit note.",
  holidayList: true,
};

export const reviewedSection: ContentSection = {
  kind: "story",
  title: "Test story",
  body: "Synthetic story text.",
  tradition: "Test tradition",
  sourceIds: ["test-cultural"],
  status: "reviewed",
  reviewedAt: "2027-05-10",
  reviewedBy: "Secret Reviewer Name",
};

export const verifiedOccurrence: ContentOccurrence = {
  year: 2027,
  startDate: "2027-03-05",
  endDate: "2027-03-07",
  locationSlug: "atlanta-ga",
  traditionKey: "general",
  status: "verified",
  verifiedAt: "2027-05-11",
  verifiedBy: "Secret Verifier Name",
  method: "Synthetic method",
  sourceIds: ["test-date-primary", "test-date-independent"],
};

export function makeRecord(overrides: Partial<FestivalRecord> = {}): FestivalRecord {
  return {
    slug: "test-festival",
    name: "Test Festival",
    aliases: [],
    subtitle: "Synthetic subtitle",
    deities: [],
    basics: { status: "draft" },
    sections: [],
    occurrences: [],
    sources: [culturalSource, primaryDateSource, independentDateSource, sameDataDateSource, holidayListSource, discoverySource],
    ...overrides,
  };
}

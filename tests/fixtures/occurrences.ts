import type { FestivalOccurrence } from "@/lib/festivals/types";

/**
 * SYNTHETIC TEST DATA. These dates are invented to exercise code paths and are NOT
 * real festival dates. Never import this file from app/, components/ or lib/.
 */
export const syntheticVerifiedSingleDay: FestivalOccurrence = {
  festivalSlug: "test-festival",
  year: 2027,
  startDate: "2027-03-05",
  endDate: "2027-03-05",
  locationLabel: "Atlanta, GA",
  verificationStatus: "verified",
};

export const syntheticVerifiedMultiDay: FestivalOccurrence = {
  ...syntheticVerifiedSingleDay,
  startDate: "2027-03-05",
  endDate: "2027-03-07",
};

export const syntheticDraft: FestivalOccurrence = {
  ...syntheticVerifiedSingleDay,
  verificationStatus: "draft",
};

export const syntheticDisputed: FestivalOccurrence = {
  ...syntheticVerifiedSingleDay,
  verificationStatus: "disputed",
};

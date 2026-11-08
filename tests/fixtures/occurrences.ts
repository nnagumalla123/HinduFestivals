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

/**
 * SYNTHETIC multi-day observance with labelled key days (shape of a Diwali-like festival). The dates and
 * labels are invented for tests and are NOT real festival dates.
 */
export const syntheticMultiDayWithKeyDays: FestivalOccurrence = {
  festivalSlug: "diwali",
  year: 2027,
  startDate: "2027-10-26",
  endDate: "2027-10-30",
  locationLabel: "Atlanta, GA",
  verificationStatus: "verified",
  keyDays: [
    { date: "2027-10-30", label: "Synthetic closing day" },
    { date: "2027-10-26", label: "Synthetic opening day" },
    { date: "2027-10-28", label: "Synthetic main puja", main: true },
  ],
};

/** SYNTHETIC tradition-specific observances of one festival on two different invented days. */
export const syntheticTraditionA: FestivalOccurrence = {
  festivalSlug: "krishna-janmashtami",
  year: 2027,
  startDate: "2027-08-24",
  endDate: "2027-08-24",
  locationLabel: "Atlanta, GA",
  verificationStatus: "verified",
  traditionLabel: "Synthetic tradition A",
};
export const syntheticTraditionB: FestivalOccurrence = {
  ...syntheticTraditionA,
  startDate: "2027-08-25",
  endDate: "2027-08-25",
  traditionLabel: "Synthetic tradition B",
};

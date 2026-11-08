import { describe, expect, it } from "vitest";
import { formatCivilDay, isVerified, parseIsoDate } from "@/lib/festivals/occurrences";
import { syntheticDisputed, syntheticDraft, syntheticVerifiedSingleDay } from "../fixtures/occurrences";

describe("isVerified", () => {
  it("is true only for verified occurrences", () => {
    expect(isVerified(syntheticVerifiedSingleDay)).toBe(true);
    expect(isVerified(syntheticDraft)).toBe(false);
    expect(isVerified(syntheticDisputed)).toBe(false);
  });
});

describe("parseIsoDate", () => {
  it("accepts real dates, including a leap day", () => {
    expect(parseIsoDate("2027-03-05")).not.toBeNull();
    expect(parseIsoDate("2028-02-29")).not.toBeNull();
  });

  it.each(["2027-02-29", "2027-02-30", "2027-13-01", "2027-00-10", "2027-3-5", "March 5", "", "2027-03-05T00:00"])(
    "rejects %j",
    (value) => expect(parseIsoDate(value)).toBeNull(),
  );
});

describe("formatCivilDay", () => {
  it("formats the calendar day without shifting it", () => {
    expect(formatCivilDay("2027-03-05")).toBe("Fri, Mar 5");
    expect(formatCivilDay("2027-01-01")).toBe("Fri, Jan 1");
    expect(formatCivilDay("2027-12-31")).toBe("Fri, Dec 31");
  });

  it("returns null for invalid input", () => {
    expect(formatCivilDay("nope")).toBeNull();
  });
});

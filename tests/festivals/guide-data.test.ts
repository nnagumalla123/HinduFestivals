import { describe, expect, it } from "vitest";
import { GUIDE_SLOTS, SECTION_NAV } from "@/lib/festivals/guide";
import { getFestivalGuide, getOccurrencesForFestival } from "@/lib/festivals/queries";
import { formatCivilDate } from "@/lib/festivals/occurrences";
import { isHttpUrl } from "@/lib/utils/url";

describe("production guide data", () => {
  // Seven guides are reviewed (three pilots in P3-05B, Batch A in P3-05); Batch B and every date are not (see content-gating.test.ts for the rules).
  const empty = { sections: [], quickFacts: [], deities: [], sources: [], pendingReview: false };

  it("publishes the seven reviewed guides with citations", async () => {
    for (const slug of ["diwali", "ugadi", "navaratri", "makara-sankranti", "maha-shivaratri", "holi", "rama-navami"]) {
      const guide = await getFestivalGuide(slug);
      expect(guide.sections.length, slug).toBeGreaterThan(5);
      expect(guide.quickFacts.length, slug).toBeGreaterThan(3);
      expect(guide.deities.length, slug).toBeGreaterThan(0);
      expect(guide.sources.length, slug).toBeGreaterThan(5);
      guide.sections.forEach((s) => expect(s.status === "published" && s.reviewedAt, s.title).toBe("2026-11-08"));
    }
  });

  it("publishes nothing for the three Batch B festivals or an unknown slug", async () => {
    // Batch B has no drafted guide content yet.
    for (const slug of ["ganesh-chaturthi", "vijayadashami", "krishna-janmashtami"]) {
      expect(await getFestivalGuide(slug), slug).toEqual(empty);
    }
    expect(await getFestivalGuide("not-a-festival")).toEqual({ sections: [], quickFacts: [], deities: [], sources: [] });
  });

  it("publishes no occurrence (no verified 2027 date) for any festival", async () => {
    for (const slug of ["diwali", "ugadi", "navaratri", "holi", "ganesh-chaturthi", "vijayadashami", "krishna-janmashtami", "maha-shivaratri", "makara-sankranti", "rama-navami"]) {
      expect(await getOccurrencesForFestival(slug), slug).toEqual([]);
    }
  });
});

describe("guide slots", () => {
  it("have unique, URL-safe ids and are all in the section navigation", () => {
    const ids = SECTION_NAV.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/));
    GUIDE_SLOTS.forEach((slot) => expect(ids).toContain(slot.id));
  });

  it("start with quick facts and end with sources", () => {
    expect(SECTION_NAV[0].id).toBe("quick-facts");
    expect(SECTION_NAV.at(-1)?.id).toBe("sources");
  });

  it("never reuse a section kind across slots", () => {
    const kinds = GUIDE_SLOTS.flatMap((s) => s.kinds);
    expect(new Set(kinds).size).toBe(kinds.length);
  });
});

describe("helpers", () => {
  it("isHttpUrl accepts only http and https", () => {
    expect(isHttpUrl("https://example.org/a?b=1")).toBe(true);
    expect(isHttpUrl("http://example.org")).toBe(true);
    for (const bad of ["javascript:alert(1)", "data:text/html,hi", "ftp://x.org", "//example.org", "example.org", ""]) {
      expect(isHttpUrl(bad), bad).toBe(false);
    }
  });

  it("formatCivilDate formats a real date and rejects bad ones", () => {
    expect(formatCivilDate("2027-03-05")).toBe("March 5, 2027");
    expect(formatCivilDate("2027-02-30")).toBeNull();
    expect(formatCivilDate("nope")).toBeNull();
  });
});

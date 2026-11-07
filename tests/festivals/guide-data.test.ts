import { describe, expect, it } from "vitest";
import { GUIDE_SLOTS, SECTION_NAV } from "@/lib/festivals/guide";
import { mockGuides } from "@/lib/festivals/mock-guides";
import { getFestivalGuide, getOccurrencesForFestival } from "@/lib/festivals/queries";
import { formatCivilDate } from "@/lib/festivals/occurrences";
import { isHttpUrl } from "@/lib/utils/url";

describe("production guide data", () => {
  it("is empty until Phase 3 adds researched, reviewed content", () => {
    expect(Object.keys(mockGuides)).toHaveLength(0);
  });

  it("gives every festival an empty guide and no occurrences for now", async () => {
    expect(await getFestivalGuide("diwali")).toEqual({ sections: [], sources: [] });
    expect(await getFestivalGuide("not-a-festival")).toEqual({ sections: [], sources: [] });
    expect(await getOccurrencesForFestival("diwali")).toEqual([]);
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

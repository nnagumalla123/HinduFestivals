import { describe, expect, it } from "vitest";
import { getFestivalBySlug, listPublishedFestivals } from "@/lib/festivals/queries";
import { FESTIVAL_RECORDS } from "@/content";
import { contentFestivals, withReviewedBasics } from "../fixtures/festivals";

describe("festival basics (public names, aliases, subtitles, deities)", () => {
  it("contains exactly the ten curated festivals from the PRD", () => {
    expect(contentFestivals.map((f) => f.name).sort()).toEqual(
      [
        "Diwali",
        "Ugadi",
        "Holi",
        "Ganesh Chaturthi",
        "Navaratri",
        "Vijayadashami",
        "Krishna Janmashtami",
        "Maha Shivaratri",
        "Makara Sankranti",
        "Rama Navami",
      ].sort(),
    );
  });

  it("has unique, URL-safe slugs", () => {
    const slugs = contentFestivals.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("contains no date-like values anywhere (no fabricated dates)", () => {
    const text = JSON.stringify(contentFestivals);
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}/); // 2027-11-05
    expect(text).not.toMatch(/\b(19|20)\d{2}\b/); // any bare year
    expect(text).not.toMatch(
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}\b/i, // "Nov 5"
    );
    expect(text).not.toMatch(/mid-(january|february|march|april|may|june|july|august|september|october|november|december)/i);
  });

  it("gives every record at least one deity name, with no blanks or duplicates", () => {
    FESTIVAL_RECORDS.forEach((f) => {
      expect(f.deities.length).toBeGreaterThan(0);
      expect(f.deities.every((d) => d.trim() === d && d !== "")).toBe(true);
      expect(new Set(f.deities).size).toBe(f.deities.length);
    });
  });

  it("only has the allowed fields (so a date field can't sneak in unnoticed)", () => {
    contentFestivals.forEach((f) => {
      expect(Object.keys(f).sort()).toEqual(["aliases", "deities", "name", "provisional", "slug"]);
    });
  });
});

describe("festival basics review state", () => {
  it("records every festival's provisional basics as not yet reviewed", () => {
    FESTIVAL_RECORDS.forEach((r) => expect(r.basics.status, r.slug).toBe("draft"));
  });
});

describe("unreviewed basics are not published as approved content", () => {
  it("expose only the name and slug for display, and keep the wording as search-only terms", () => {
    contentFestivals.forEach((f) => {
      expect(f.subtitle, f.slug).toBeUndefined();
      expect(f.aliases, f.slug).toEqual([]);
      expect(f.deities, f.slug).toEqual([]);
    });
    const diwali = contentFestivals.find((f) => f.slug === "diwali")!;
    expect(diwali.provisional.aliases).toEqual(["Deepavali"]);
    expect(diwali.provisional.deities).toContain("Lakshmi");
  });

  it("publish subtitle, aliases and deities once the basics are reviewed", () => {
    const f = withReviewedBasics("diwali");
    expect(f.subtitle).toBeTruthy();
    expect(f.aliases).toEqual(["Deepavali"]);
    expect(f.deities.length).toBeGreaterThan(0);
    expect(f.provisional).toEqual({ aliases: [], deities: [] });
  });
});

describe("festival queries", () => {
  it("lists all festivals", async () => {
    expect(await listPublishedFestivals()).toHaveLength(10);
  });

  it("finds a festival by its exact slug", async () => {
    expect((await getFestivalBySlug("ugadi"))?.name).toBe("Ugadi");
  });

  it("returns undefined for unknown slugs", async () => {
    expect(await getFestivalBySlug("unknown")).toBeUndefined();
    expect(await getFestivalBySlug("")).toBeUndefined();
  });
});

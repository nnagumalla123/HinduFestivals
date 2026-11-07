import { describe, expect, it } from "vitest";
import { getFestivalBySlug, listPublishedFestivals } from "@/lib/festivals/queries";
import { mockFestivals } from "@/lib/festivals/mock-data";

describe("mock festival data", () => {
  it("contains exactly the ten curated festivals from the PRD", () => {
    expect(mockFestivals.map((f) => f.name).sort()).toEqual(
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
    const slugs = mockFestivals.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("marks every festival's date as not verified", () => {
    mockFestivals.forEach((f) => expect(f.dateStatus).toBe("not_verified"));
  });

  it("contains no date-like values anywhere (no fabricated dates)", () => {
    const text = JSON.stringify(mockFestivals);
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}/); // 2027-11-05
    expect(text).not.toMatch(/\b(19|20)\d{2}\b/); // any bare year
    expect(text).not.toMatch(
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}\b/i, // "Nov 5"
    );
    expect(text).not.toMatch(/mid-(january|february|march|april|may|june|july|august|september|october|november|december)/i);
  });

  it("gives every festival at least one deity name, with no blanks or duplicates", () => {
    mockFestivals.forEach((f) => {
      expect(f.deities.length).toBeGreaterThan(0);
      expect(f.deities.every((d) => d.trim() === d && d !== "")).toBe(true);
      expect(new Set(f.deities).size).toBe(f.deities.length);
    });
  });

  it("only has the allowed fields (so a date field can't sneak in unnoticed)", () => {
    mockFestivals.forEach((f) => {
      expect(Object.keys(f).sort()).toEqual(["aliases", "dateStatus", "deities", "name", "slug", "subtitle"]);
    });
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

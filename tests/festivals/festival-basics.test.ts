import { describe, expect, it } from "vitest";
import { getFestivalBySlug, listPublishedFestivals } from "@/lib/festivals/queries";
import { FESTIVAL_RECORDS } from "@/content";
import { contentFestivals, draftFestivals, REVIEWED_PILOT_SLUGS, withReviewedBasics } from "../fixtures/festivals";

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
    const allowed = ["aliases", "deities", "name", "provisional", "slug", "subtitle"];
    contentFestivals.forEach((f) => {
      Object.keys(f).forEach((key) => expect(allowed, `${f.slug}.${key}`).toContain(key));
    });
  });
});

describe("festival basics review state", () => {
  it("has reviewed basics only for the three pilots; the other seven are still draft", () => {
    FESTIVAL_RECORDS.forEach((r) => {
      const pilot = (REVIEWED_PILOT_SLUGS as readonly string[]).includes(r.slug);
      expect(r.basics.status, r.slug).toBe(pilot ? "reviewed" : "draft");
      if (pilot) expect(r.basics).toMatchObject({ reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial" });
    });
  });
});

describe("unreviewed basics are not published as approved content", () => {
  it("expose only the name and slug for display, and keep the wording as search-only terms", () => {
    expect(draftFestivals).toHaveLength(7);
    draftFestivals.forEach((f) => {
      expect(f.subtitle, f.slug).toBeUndefined();
      expect(f.aliases, f.slug).toEqual([]);
      expect(f.deities, f.slug).toEqual([]);
    });
    const holi = draftFestivals.find((f) => f.slug === "holi")!;
    expect(holi.provisional.deities.length).toBeGreaterThan(0);
  });

  it("show the approved subtitle, aliases and deities for the three reviewed pilots", () => {
    const by = (slug: string) => contentFestivals.find((f) => f.slug === slug)!;
    expect(by("diwali")).toMatchObject({ subtitle: "The festival of lights", aliases: ["Deepavali"], deities: ["Lakshmi", "Rama", "Krishna", "Kali"] });
    expect(by("ugadi")).toMatchObject({ subtitle: "A new year for Telugu and Kannada families", aliases: ["Yugadi"], deities: ["Brahma"] });
    expect(by("navaratri")).toMatchObject({ subtitle: "Nine nights honoring the goddess", aliases: ["Navratri"], deities: ["Durga", "Lakshmi", "Saraswati"] });
    REVIEWED_PILOT_SLUGS.forEach((slug) => expect(by(slug).provisional).toEqual({ aliases: [], deities: [] }));
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

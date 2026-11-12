import { describe, expect, it } from "vitest";
import { getFestivalBySlug, listPublishedFestivals } from "@/lib/festivals/queries";
import { FESTIVAL_RECORDS } from "@/content";
import { contentFestivals, draftFestivals, REVIEWED_BATCH_A_SLUGS, REVIEWED_BATCH_B_SLUGS, REVIEWED_PILOT_SLUGS, REVIEWED_SLUGS, withReviewedBasics } from "../fixtures/festivals";

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
  it("has reviewed basics for all ten festivals, with the review date of each batch", () => {
    expect(REVIEWED_SLUGS).toHaveLength(10);
    FESTIVAL_RECORDS.forEach((r) => {
      expect(REVIEWED_SLUGS, r.slug).toContain(r.slug);
      const date = (REVIEWED_BATCH_B_SLUGS as readonly string[]).includes(r.slug) ? "2026-11-12" : "2026-11-08";
      expect(r.basics, r.slug).toMatchObject({ status: "reviewed", reviewedAt: date, reviewedBy: "desi-days-editorial" });
    });
  });
});

describe("unreviewed basics are not published as approved content", () => {
  it("expose only the name and slug for display, and keep the wording as search-only terms", () => {
    // Synthetic drafts (the three Batch B festivals put back into their pre-review state), because no real festival is draft now.
    expect(draftFestivals.map((f) => f.slug).sort()).toEqual(["ganesh-chaturthi", "krishna-janmashtami", "vijayadashami"]);
    draftFestivals.forEach((f) => {
      expect(f.subtitle, f.slug).toBeUndefined();
      expect(f.aliases, f.slug).toEqual([]);
      expect(f.deities, f.slug).toEqual([]);
    });
    const janmashtami = draftFestivals.find((f) => f.slug === "krishna-janmashtami")!;
    expect(janmashtami.provisional.deities.length).toBeGreaterThan(0);
  });

  it("show the approved subtitle, aliases and deities for the three reviewed pilots", () => {
    const by = (slug: string) => contentFestivals.find((f) => f.slug === slug)!;
    expect(by("diwali")).toMatchObject({ subtitle: "The festival of lights", aliases: ["Deepavali"], deities: ["Lakshmi", "Rama", "Krishna", "Kali"] });
    expect(by("ugadi")).toMatchObject({ subtitle: "A new year for Telugu and Kannada families", aliases: ["Yugadi"], deities: ["Brahma"] });
    expect(by("navaratri")).toMatchObject({ subtitle: "Nine nights honoring the goddess", aliases: ["Navratri"], deities: ["Durga", "Lakshmi", "Saraswati"] });
    REVIEWED_PILOT_SLUGS.forEach((slug) => expect(by(slug).provisional).toEqual({ aliases: [], deities: [] }));
  });

  it("show the approved subtitle, aliases and deities for the three Batch B festivals", () => {
    const by = (slug: string) => contentFestivals.find((f) => f.slug === slug)!;
    expect(by("krishna-janmashtami")).toMatchObject({ subtitle: "A festival honoring the birth of Krishna", aliases: ["Janmashtami", "Gokulashtami"], deities: ["Krishna", "Vishnu"] });
    expect(by("ganesh-chaturthi")).toMatchObject({ subtitle: "A festival honoring the birth of Ganesha", aliases: ["Vinayaka Chaturthi"], deities: ["Ganesha", "Parvati", "Shiva"] });
    expect(by("vijayadashami")).toMatchObject({ subtitle: "The victorious tenth day", aliases: ["Dussehra", "Dasara", "Vijaya Dashami"], deities: ["Rama", "Durga"] });
    for (const slug of REVIEWED_BATCH_B_SLUGS) expect(by(slug).provisional, slug).toEqual({ aliases: [], deities: [] });
  });

  it("show the approved subtitle, aliases and deities for the four Batch A festivals", () => {
    const by = (slug: string) => contentFestivals.find((f) => f.slug === slug)!;
    expect(by("makara-sankranti")).toMatchObject({ subtitle: "A solar festival of harvest and renewal", aliases: ["Sankranti", "Makar Sankranti"], deities: ["Surya"] });
    expect(by("holi")).toMatchObject({ aliases: [], deities: ["Krishna", "Radha", "Vishnu"] });
    for (const slug of REVIEWED_BATCH_A_SLUGS) {
      expect(by(slug).subtitle, slug).toBeTruthy();
      expect(by(slug).provisional, slug).toEqual({ aliases: [], deities: [] });
    }
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

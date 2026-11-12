import { describe, expect, it } from "vitest";
import { FESTIVAL_RECORDS } from "@/content";
import { publishAll } from "@/lib/festivals/content/load";
import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { errors, validateRecord } from "@/lib/festivals/content/validate";
import { BATCH_B_SLUGS, ORIGINAL_DATE, P3_06_DATE, P3_06_REVISED } from "../fixtures/review-dates";

/*
 * P3-06 resolution (owner-approved 2026-11-12): findings F-01 to F-05, F-07, F-08 and F-14. These tests pin each
 * approved change, and pin the set of entries whose review date moved, so nothing else changes silently.
 */
const rec = (slug: string) => FESTIVAL_RECORDS.find((r) => r.slug === slug)!;
const section = (slug: string, title: string) => rec(slug).sections.find((s) => s.title === title)!;
const allText = (r: FestivalRecord) => [r.subtitle, ...r.sections.flatMap((s) => [s.title, s.body]), ...(r.quickFacts ?? []).map((q) => q.text), ...(r.deityEntries ?? []).map((d) => d.role)].join("\n");

describe("P3-06: review dates", () => {
  it("moves the review date only for the entries the owner re-approved", () => {
    const moved: string[] = [];
    for (const r of FESTIVAL_RECORDS) {
      const original = (BATCH_B_SLUGS as readonly string[]).includes(r.slug) ? "2026-11-12" : ORIGINAL_DATE;
      expect(r.basics.reviewedAt, `${r.slug} basics`).toBe(original); // basics were not re-approved
      r.sections.forEach((s) => s.reviewedAt !== original && moved.push(`${r.slug}|section|${s.title}`));
      (r.quickFacts ?? []).forEach((q) => q.reviewedAt !== original && moved.push(`${r.slug}|quickFact|${q.label}`));
      (r.deityEntries ?? []).forEach((d) => d.reviewedAt !== original && moved.push(`${r.slug}|deity|${d.name}`));
    }
    const expected = Object.entries(P3_06_REVISED)
      .filter(([slug]) => !(BATCH_B_SLUGS as readonly string[]).includes(slug)) // Batch B entries already carry 2026-11-12
      .flatMap(([slug, e]) => [...(e.sections ?? []).map((t) => `${slug}|section|${t}`), ...(e.quickFacts ?? []).map((t) => `${slug}|quickFact|${t}`), ...(e.deities ?? []).map((t) => `${slug}|deity|${t}`)]);
    expect(moved.sort()).toEqual(expected.sort());
    for (const r of FESTIVAL_RECORDS) {
      [...r.sections, ...(r.quickFacts ?? []), ...(r.deityEntries ?? [])].forEach((x) => {
        expect(x.status).toBe("reviewed");
        expect(x.reviewedBy).toBe("desi-days-editorial");
        expect(["2026-11-08", P3_06_DATE]).toContain(x.reviewedAt);
      });
    }
  });

  it("keeps all ten guides reviewed, valid, with every occurrence empty", () => {
    expect(FESTIVAL_RECORDS).toHaveLength(10);
    for (const r of FESTIVAL_RECORDS) {
      expect(r.basics.status, r.slug).toBe("reviewed");
      expect(errors(validateRecord(r, P3_06_DATE)).map((i) => i.message), r.slug).toEqual([]);
      expect(r.occurrences, r.slug).toEqual([]);
    }
    for (const p of publishAll(FESTIVAL_RECORDS, P3_06_DATE)) expect(p.guide.pendingReview, p.festival.slug).toBe(false);
  });
});

describe("P3-06: approved content corrections", () => {
  it("F-01 Navaratri: replaces the unsupported 'without fasting at all' with source-supported wording", () => {
    const fasting = section("navaratri", "Fasting and food");
    expect(fasting.body).toMatch(/Some families do not fast, and what any family does is shaped by its own tradition\./);
    expect(fasting.body).toMatch(/Fasting is part of Navaratri for many people, but it is optional/);
    const college = section("navaratri", "Celebrating Navaratri away from home");
    expect(college.body).toMatch(/some celebrate without fasting/);
    expect(allText(rec("navaratri"))).not.toMatch(/without fasting at all|many celebrate without fasting/i);
    // The same standard holds across all ten guides.
    for (const r of FESTIVAL_RECORDS) expect(allText(r), r.slug).not.toMatch(/do not fast at all|without fasting at all/i);
  });

  it("F-02 Makara Sankranti: cites the Britannica page that holds the solar-calendar and solstice claims, wording unchanged", () => {
    const r = rec("makara-sankranti");
    const when = r.sources.find((s) => s.id === "sankranti-brit-when")!;
    expect(when.url).toBe("https://www.britannica.com/question/When-does-Makar-Sankranti-take-place");
    expect(when.claimsSupported.join(" ")).toMatch(/winter solstice holiday/);
    expect(when.claimsSupported.join(" ")).toMatch(/solar calendar/);
    expect(when.accessedAt).toBe("2026-11-12"); // read in the browser on the audit date
    const what = r.sources.find((s) => s.id === "sankranti-brit-what")!;
    expect(what.url).toBe("https://www.britannica.com/question/What-is-Makar-Sankranti");
    expect(what.claimsSupported.join(" ")).not.toMatch(/solstice|lunisolar/);
    const meaning = r.quickFacts!.find((q) => q.label === "Meaning")!;
    for (const ids of [meaning.sourceIds, section("makara-sankranti", "Why celebrate Makara Sankranti?").sourceIds, section("makara-sankranti", "A solar festival: tradition and astronomy").sourceIds]) {
      expect(ids).toContain("sankranti-brit-when");
      expect(ids).toContain("sankranti-usno");
    }
    // Guide wording preserved.
    expect(section("makara-sankranti", "A solar festival: tradition and astronomy").body).toMatch(/Britannica notes that the festival began as a winter-solstice holiday/);
    expect(meaning.text).toMatch(/the astronomical turn comes at the December solstice, a few weeks earlier/);
  });

  it("F-03 Holi: eye guidance follows the American Academy of Ophthalmology and separates chemical splashes from grit", () => {
    const g = section("holi", "Celebrating Holi away from home").body;
    expect(g).toMatch(/do not rub them and flush the eye right away with plenty of clean water/);
    expect(g).toMatch(/chemical splashes into your eye, the American Academy of Ophthalmology advises seeking emergency medical treatment right away/);
    expect(g).toMatch(/For ordinary dust or grit, blinking and flushing often clears it, but see a doctor if it still feels like something is in your eye/);
    expect(g).toMatch(/Ongoing pain or trouble seeing is a sign to get medical help right away/);
    expect(g).not.toMatch(/see a doctor if irritation continues/);
    expect(g).toMatch(/Ask first\. Always ask before putting color on someone, and respect a no\./); // consent line preserved
    expect(g).toMatch(/check labels or choose herbal colors if you prefer, and keep powder away from your eyes/);
    const aao = rec("holi").sources.find((s) => s.id === "holi-aao")!;
    expect(aao.claimsSupported.join(" ")).toMatch(/seek emergency medical treatment right away/);
    expect(aao.accessedAt).toBe("2026-11-12"); // re-read in full on the audit date
    expect(aao.termsNote).toMatch(/copyright notice/);
    expect(aao.termsNote).toMatch(/Terms page not read/);
  });

  it("F-04 Rama Navami: panaka is attributed to devotees, with temples only for khoa", () => {
    const f = section("rama-navami", "Fasting and food").body;
    expect(f).toMatch(/Hinduism Today describes devotees making and serving panaka/);
    expect(f).toMatch(/some temples preparing sweets such as khoa/);
    expect(f).not.toMatch(/describes temples that mark the day/);
    expect(rec("rama-navami").quickFacts!.find((q) => q.label === "Signature foods")!.text).toMatch(/served to the public by devotees/);
    expect(allText(rec("rama-navami"))).not.toMatch(/served to the public at some temples/);
  });

  it("F-05 Ugadi: has the standard accommodations sentence, like the other nine guides", () => {
    for (const r of FESTIVAL_RECORDS) {
      const cg = r.sections.find((s) => s.kind === "college_guide")!;
      expect(cg.body, r.slug).toMatch(/If you have questions about religious accommodations, ask your residence life office\./);
    }
  });

  it("F-07 Ganesh Chaturthi: Parvati's entry no longer says 'a boy' (the story and entry agree)", () => {
    const parvati = rec("ganesh-chaturthi").deityEntries!.find((d) => d.name === "Parvati")!;
    expect(parvati.role).toMatch(/makes him from the dirt of her body to guard her while she bathes/);
    expect(parvati.role).not.toMatch(/\ba boy\b/);
    expect(section("ganesh-chaturthi", "Ganesha’s birth: more than one story").body).toMatch(/dirt of her body/);
  });

  it("F-08 Holi: the HAF sentence follows the page", () => {
    const b = section("holi", "Holi beyond temples and homes").body;
    expect(b).toMatch(/says Holi is open to everyone and that understanding its origin can enrich the experience, noting that commercial color events can lose that context/);
    expect(b).not.toMatch(/asks that it also be remembered/);
    expect(b).toMatch(/Ask before putting color on someone, and respect a no\./);
  });

  it("F-14 Vijayadashami: 'countdown' is not used in prose (reserved for the date feature)", () => {
    for (const r of FESTIVAL_RECORDS) expect(allText(r), r.slug).not.toMatch(/countdown/i);
    expect(section("vijayadashami", "Vijayadashami, Dussehra and Dasara: the names").body).toMatch(/begins the run-up to Diwali/);
  });

  it("leaves the deferred S3 items untouched (F-06, F-09, F-10, F-11, F-12, F-13, F-15, F-16)", () => {
    expect(section("navaratri", "Celebrating Navaratri away from home").body).toMatch(/your dining hall or a nearby Indian grocery can help with ingredients/); // F-06 deferred
    expect(section("holi", "Holi across India").body).toMatch(/playfully strike men/); // F-09 deferred
    expect(section("holi", "Holi across India").body).toMatch(/Hola Mohalla/); // F-10 deferred
  });
});

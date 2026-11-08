import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FESTIVAL_RECORDS } from "@/content";
import { FestivalDetail } from "@/components/festivals/detail/FestivalDetail";
import { publishRecord } from "@/lib/festivals/content/load";
import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { errors, validateRecord } from "@/lib/festivals/content/validate";
import { searchFestivals } from "@/lib/festivals/search";

/*
 * PUBLICATION PREVIEW (kept as a regression test). It never changes the real files. This test copies the three pilot
 * records IN MEMORY, stamps every item "reviewed" with SYNTHETIC review metadata, and checks what the
 * public loader and the detail page would show. Nothing is written to content/.
 */
const TODAY = "2026-12-01";
const SYNTH_REVIEWED_AT = "2026-11-30";
const SYNTH_REVIEWER = "SYNTHETIC-PREVIEW-REVIEWER";
// The three pilots plus Batch A: every guide that is now really reviewed. Promoting them again here is harmless.
const PILOTS = ["diwali", "ugadi", "navaratri", "makara-sankranti", "maha-shivaratri", "holi", "rama-navami"];

const stamp = <T extends { status: string }>(item: T) => ({ ...item, status: "reviewed" as const, reviewedAt: SYNTH_REVIEWED_AT, reviewedBy: SYNTH_REVIEWER });
const promote = (r: FestivalRecord): FestivalRecord => ({
  ...r,
  basics: stamp(r.basics),
  sections: r.sections.map(stamp),
  quickFacts: r.quickFacts?.map(stamp),
  deityEntries: r.deityEntries?.map(stamp),
});

const records = FESTIVAL_RECORDS.map((r) => (PILOTS.includes(r.slug) ? promote(r) : r));
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

describe("synthetic publication preview: the seven reviewed guides", () => {
  PILOTS.forEach((slug) => {
    const record = records.find((r) => r.slug === slug)!;
    const original = FESTIVAL_RECORDS.find((r) => r.slug === slug)!;
    const pub = publishRecord(record, TODAY);

    it(`${slug}: passes every publication rule when stamped reviewed`, () => {
      const issues = errors(validateRecord(record, TODAY));
      expect(issues.map((i) => `${i.scope}[${i.index}] ${i.path}: ${i.message}`)).toEqual([]);
    });

    it(`${slug}: publishes every section, quick fact and deity entry, and the basics`, () => {
      expect(pub.guide.sections).toHaveLength(original.sections.length);
      expect(pub.guide.quickFacts).toHaveLength((original.quickFacts ?? []).length);
      expect(pub.guide.deities).toHaveLength((original.deityEntries ?? []).length);
      expect(pub.festival.subtitle).toBe(original.subtitle);
      expect(pub.festival.aliases).toEqual(original.aliases);
      expect(pub.festival.deities).toEqual(original.deities);
      expect(pub.festival.provisional).toEqual({ aliases: [], deities: [] });
      expect(pub.occurrences).toEqual([]);
    });

    it(`${slug}: renders the complete guide with citations, and nothing internal or dated`, () => {
      const { container } = render(<FestivalDetail festival={pub.festival} occurrences={pub.occurrences} guide={pub.guide} today="2026-12-01" />);
      const text = norm(container.textContent ?? "");
      const html = container.innerHTML;

      // complete content
      original.sections.forEach((s) => {
        expect(text, `title: ${s.title}`).toContain(norm(s.title));
        s.body.split("\n\n").forEach((p) => expect(text, `${s.title}: ${p.slice(0, 40)}`).toContain(norm(p)));
      });
      (original.quickFacts ?? []).forEach((q) => {
        expect(text, `fact label ${q.label}`).toContain(q.label);
        expect(text, `fact text ${q.label}`).toContain(norm(q.text));
      });
      (original.deityEntries ?? []).forEach((d) => {
        expect(text, `deity ${d.name}`).toContain(d.name);
        expect(text).toContain(norm(d.role));
      });

      // citations: a numbered link per cited source, each to its own URL, plus the Sources list
      const citedIds = new Set(pub.guide.sources.map((s) => s.id));
      expect(citedIds.size).toBeGreaterThan(5);
      pub.guide.sources.forEach((s) => expect(html, `source ${s.id}`).toContain(s.url.replace(/&/g, "&amp;")));
      expect(container.querySelectorAll("a[href^='#']").length).toBeGreaterThan(10);
      expect(text).toContain("Last reviewed");
      // citation links keep a 24px touch target (WCAG 2.2 target size)
      container.querySelectorAll("a[aria-label^='Source ']").forEach((a) => expect(a.className).toMatch(/min-h-6.*min-w-6|min-w-6.*min-h-6/));

      // basics: the approved subtitle is shown in the page header
      expect(text, "subtitle").toContain(original.subtitle!);

      // no internal material
      const internal = [SYNTH_REVIEWER, "reviewNotes", "SOURCE NOTE", "OPTIONAL:", "EDITORIAL:", "BLOCKING", "Owner direction", "Rechecked", "termsNote", "claimsSupported"];
      internal.forEach((needle) => expect(html, `leak: ${needle}`).not.toContain(needle));
      [...(original.sections.flatMap((s) => s.reviewNotes ?? [])), ...(original.quickFacts ?? []).flatMap((q) => q.reviewNotes ?? [])]
        .forEach((n) => expect(text).not.toContain(norm(n).slice(0, 50)));
      // discovery / date-role sources never appear as citations
      expect(pub.guide.sources.every((s) => s.role === "cultural")).toBe(true);

      // dates: none shown. The only year in the page is the synthetic 2026 review date.
      // A source title may contain a year (the UGA housing guide is titled "Community Guide 2026-2027"), so remove titles first.
      let scrubbed = html;
      pub.guide.sources.forEach((src) => (scrubbed = scrubbed.split(src.title).join("")));
      const at = scrubbed.indexOf("2027");
      expect(at === -1 ? "" : scrubbed.slice(Math.max(0, at - 80), at + 40)).toBe("");
      expect(scrubbed).not.toMatch(/\b20\d\d-\d\d-\d\d\b/);
      expect(text).toContain("Date not yet verified");
      expect(text).not.toMatch(/Reference calendar/);
      expect(text).not.toMatch(/days? (to go|left|until)/i);
    });
  });
});

describe("synthetic publication preview: the three Batch B festivals stay hidden", () => {
  records.filter((r) => !PILOTS.includes(r.slug)).forEach((record) => {
    it(`${record.slug}: still draft, publishes only its name`, () => {
      const pub = publishRecord(record, TODAY);
      expect(pub.guide.sections).toEqual([]);
      expect(pub.guide.quickFacts).toEqual([]);
      expect(pub.guide.deities).toEqual([]);
      expect(pub.guide.sources).toEqual([]);
      expect(pub.occurrences).toEqual([]);
      expect(pub.festival.subtitle).toBeUndefined();
      expect(pub.festival.aliases).toEqual([]);
      expect(pub.festival.deities).toEqual([]);
      const { container } = render(<FestivalDetail festival={pub.festival} occurrences={[]} guide={pub.guide} today="2026-12-01" />);
      expect(container.textContent).toContain("This guide is a work in progress");
    });
  });

  it("publishing the real records, whatever their status, never exposes internal notes or reviewer names", () => {
    // Status-agnostic on purpose: it holds while content is draft and after real review.
    FESTIVAL_RECORDS.forEach((r) => {
      const json = JSON.stringify(publishRecord(r, TODAY));
      const notes = [...r.sections.flatMap((x) => x.reviewNotes ?? []), ...(r.quickFacts ?? []).flatMap((x) => x.reviewNotes ?? []), ...(r.deityEntries ?? []).flatMap((x) => x.reviewNotes ?? [])];
      notes.forEach((n) => expect(json, r.slug).not.toContain(n.slice(0, 40)));
      expect(json).not.toContain("reviewedBy");
      expect(json).not.toContain("reviewNotes");
    });
  });
});

describe("synthetic publication preview: basics and search", () => {
  const published = records.map((r) => publishRecord(r, TODAY).festival);
  const hit = (q: string) => searchFestivals(published, q);

  it("approved aliases and deity terms find the pilot festivals and show the approved wording", () => {
    const deepavali = hit("Deepavali");
    expect(deepavali.map((r) => r.festival.slug)).toEqual(["diwali"]);
    expect(deepavali[0].matchedOn).toEqual({ kind: "alias", text: "Deepavali" });
    expect(hit("Yugadi")[0].matchedOn).toEqual({ kind: "alias", text: "Yugadi" });
    expect(hit("Brahma")[0].matchedOn).toEqual({ kind: "deity", text: "Brahma" });
    expect(hit("Navratri")[0].matchedOn).toEqual({ kind: "alias", text: "Navratri" });
    expect(hit("Saraswati").map((r) => r.festival.slug)).toContain("navaratri");
  });

  it("the other three festivals show only their name; their search terms stay provisional", () => {
    const others = published.filter((f) => !PILOTS.includes(f.slug));
    expect(others.map((f) => f.slug).sort()).toEqual(["ganesh-chaturthi", "krishna-janmashtami", "vijayadashami"]);
    others.forEach((f) => {
      expect(f.subtitle).toBeUndefined();
      expect(f.aliases).toEqual([]);
      expect(f.deities).toEqual([]);
    });
    const vishnuLike = published.flatMap((f) => f.provisional.deities).length;
    expect(vishnuLike).toBeGreaterThan(0);
    // a match on unreviewed wording is flagged provisional so the text is never displayed
    const provisionalHit = published.flatMap((f) => f.provisional.aliases.map((a) => searchFestivals(published, a)[0]?.matchedOn)).filter(Boolean);
    provisionalHit.forEach((m) => expect(m!.provisional).toBe(true));
  });
});

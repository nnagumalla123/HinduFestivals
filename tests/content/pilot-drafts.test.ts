import { describe, expect, it } from "vitest";
import { diwali } from "@/content/festivals/diwali";
import { navaratri } from "@/content/festivals/navaratri";
import { ugadi } from "@/content/festivals/ugadi";
import { publishRecord } from "@/lib/festivals/content/load";
import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { errors, validateRecord, wordCount } from "@/lib/festivals/content/validate";

const pilots: readonly FestivalRecord[] = [diwali, ugadi, navaratri];
const TODAY = "2026-11-08";

const bodies = (r: FestivalRecord) => [
  ...r.sections.flatMap((s) => [s.title, s.body]),
  ...(r.quickFacts ?? []).map((f) => f.text),
  ...(r.deityEntries ?? []).flatMap((d) => [d.role, d.tradition]),
];

describe.each(pilots.map((r) => [r.slug, r] as const))("%s reviewed guide (P3-05B)", (_slug, record) => {
  it("is reviewed with the recorded metadata, and every occurrence stays empty", () => {
    const meta = { status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial" };
    expect(record.basics).toMatchObject(meta);
    record.sections.forEach((s) => expect(s, s.title).toMatchObject(meta));
    (record.quickFacts ?? []).forEach((f) => expect(f, f.label).toMatchObject(meta));
    (record.deityEntries ?? []).forEach((d) => expect(d, d.name).toMatchObject(meta));
    expect(record.occurrences).toEqual([]); // no 2027 date is verified or published
  });

  it("publishes the full guide and the approved basics, and nothing internal or dated", () => {
    expect(errors(validateRecord(record, TODAY)).map((i) => i.message)).toEqual([]);
    const out = publishRecord(record, TODAY);
    expect(out.guide.sections).toHaveLength(record.sections.length);
    expect(out.guide.quickFacts).toHaveLength((record.quickFacts ?? []).length);
    expect(out.guide.deities).toHaveLength((record.deityEntries ?? []).length);
    expect(out.guide.sources.length).toBeGreaterThan(5);
    expect(out.guide.sources.every((src) => src.role === "cultural")).toBe(true);
    expect(out.festival.subtitle).toBe(record.subtitle);
    expect(out.festival.aliases).toEqual(record.aliases);
    expect(out.festival.deities).toEqual(record.deities);
    expect(out.festival.provisional).toEqual({ aliases: [], deities: [] });
    expect(out.occurrences).toEqual([]);
    expect(JSON.stringify(out)).not.toMatch(/deityEntries|reviewNotes|reviewedBy|desi-days-editorial|termsNote|permissionStatus/);
  });

  it("has no validation errors or warnings", () => {
    const issues = validateRecord(record, TODAY);
    expect(issues.map((i) => `${i.severity} ${i.path}: ${i.message}`)).toEqual([]);
  });

  it("has an 80-150 word introduction (approximate guideline)", () => {
    const overview = record.sections.find((s) => s.kind === "overview")!;
    const words = wordCount(overview.body);
    expect(words).toBeGreaterThanOrEqual(80);
    expect(words).toBeLessThanOrEqual(150);
  });

  it("covers the required guide sections that have reliable support", () => {
    const kinds = new Set(record.sections.map((s) => s.kind));
    for (const kind of ["overview", "story", "rituals", "regional_variation", "college_guide"] as const) {
      expect(kinds.has(kind), kind).toBe(true);
    }
    expect((record.quickFacts ?? []).length).toBeGreaterThan(0);
    expect((record.deityEntries ?? []).length).toBeGreaterThan(0);
  });

  it("attributes every story and regional variation to a tradition or region", () => {
    record.sections
      .filter((s) => s.kind === "story" || s.kind === "regional_variation")
      .forEach((s) => expect(s.tradition, s.title).toBeTruthy());
    (record.deityEntries ?? []).forEach((d) => expect(d.tradition, d.name).toBeTruthy());
  });

  it("states no dates and does not name specific colleges or omitted customs", () => {
    const text = bodies(record).join("\n");
    expect(text).not.toMatch(/\b(19|20)\d{2}\b/);
    expect(text).not.toMatch(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? \d{1,2}\b/i);
    expect(text).not.toMatch(/Appalachian|Dartmouth|Louisville|Georgia|Emory|Hamilton|Creighton|\bUGA\b/);
    expect(text).not.toMatch(/gambl|card game|brothel|punya mati|threshold/i);
  });

  it("mentions fireworks only with safety context and never as instructions", () => {
    for (const s of record.sections.filter((x) => /firework/i.test(x.body))) {
      expect(s.body, s.title).toMatch(/risk|restrict|rules|licensed/i);
      expect(s.body, s.title).not.toMatch(/\b(light the|fuse|ignite|how to)\b/i);
    }
  });

  it("does not present Lakshmi Puja as a universal main day or state an unverified battle length", () => {
    const text = bodies(record).join("\n");
    expect(text).not.toMatch(/the main day|universally|nine days of|battle (lasted|raged|went on)|shape-?shift/i);
  });

  it("makes no universal vegetarian or fasting claims", () => {
    expect(bodies(record).join("\n")).not.toMatch(/must be vegetarian|must fast|all hindus|every hindu (celebrates|observes|eats|fasts)|everyone fasts/i);
  });

  it("keeps internal review notes on claims that need verification, each classified", () => {
    const notes = [
      ...record.sections.flatMap((s) => s.reviewNotes ?? []),
      ...(record.quickFacts ?? []).flatMap((f) => f.reviewNotes ?? []),
      ...(record.deityEntries ?? []).flatMap((d) => d.reviewNotes ?? []),
    ];
    expect(notes.length).toBeGreaterThan(2);
    // BLOCKING = must be resolved before publication; OPTIONAL = future research; EDITORIAL = an owner choice;
    // SOURCE NOTE = a source-critical observation kept out of the public narrative.
    notes.forEach((n) => expect(n, n).toMatch(/^(BLOCKING|OPTIONAL|EDITORIAL|SOURCE NOTE): /));
  });

  it("keeps process language and source-critical commentary out of the public text", () => {
    const text = bodies(record).join("\n");
    expect(text).not.toMatch(/still (being )?research|we are (still|looking)|will be added|we (looked|read|checked|found|have not)|parts we/i);
    expect(text).not.toMatch(/reliable sources|not (yet )?(traced|verified)|single source/i);
  });

  it("records what each source's terms said, or why they could not be checked", () => {
    for (const s of record.sources) {
      expect(s.termsNote, s.id).toBeTruthy();
      if (s.termsChecked) expect(s.termsNote, s.id).toMatch(/\bread\b|public domain/i);
    }
  });
});

const text = (r: FestivalRecord) => bodies(r).join("\n");

describe("final verification pass: targeted corrections", () => {
  it("Diwali drops the unverified midnight Lakshmi custom and keeps fireworks wording neutral", () => {
    expect(text(diwali)).not.toMatch(/midnight|sending misfortune|Alakshmi/i);
    expect(text(diwali)).toMatch(/practices vary by community and region/);
    expect(text(diwali)).not.toMatch(/almost certainly|against the rules/i);
  });

  it("Diwali's Jain and Sikh paragraphs rest on tradition-specific sources, and the unverified Newar claim is omitted", () => {
    const section = diwali.sections.find((s) => s.title.startsWith("Jain and Sikh"))!;
    expect(section.sourceIds).toEqual(expect.arrayContaining(["diwali-malaiya", "diwali-sikhnet"]));
    expect(section.body).toMatch(/Bandi Chhor Divas/);
    expect(section.body).not.toMatch(/Newar|Nepal|monaster|Buddha/);
    expect(text(diwali)).not.toMatch(/Newar/);
  });

  it("Diwali no longer states the single-source Kubera claim, and Kali has two sources", () => {
    expect(text(diwali)).not.toMatch(/Kubera/);
    const kali = diwali.deityEntries!.find((d) => d.name === "Kali")!;
    expect(kali.sourceIds).toEqual(expect.arrayContaining(["diwali-britannica", "diwali-birmingham-kali"]));
  });

  it("Ugadi resolves bevu-bella with a Karnataka source and keeps the sixty-year cycle well supported", () => {
    const bevu = ugadi.sections.find((s) => s.title.startsWith("Bevu-bella"))!;
    expect(bevu.sourceIds).toContain("ugadi-karnataka-tourism");
    expect(bevu.reviewNotes?.join(" ")).not.toMatch(/^BLOCKING/);
    const cycle = ugadi.sections.find((s) => s.title === "A new year in spring")!;
    expect(cycle.body).toMatch(/cycle of sixty/);
    expect(cycle.sourceIds).toEqual(expect.arrayContaining(["ugadi-telangana-today", "ugadi-eb1911"]));
  });

  it("Ugadi removes the single-source farming and neem-blossom imagery and the creation disclaimer", () => {
    expect(text(ugadi)).not.toMatch(/farmers|neem trees|housewarming|showers/i);
    expect(text(ugadi)).not.toMatch(/historical record|recorded history|not traced/i);
    expect(text(ugadi)).toMatch(/According to a traditional belief/);
  });

  it("Navaratri keeps the disputed battle duration and unverified fasting foods out of public text", () => {
    expect(text(navaratri)).not.toMatch(/nine days|ten days of battle|battle (lasted|raged)|shape-?shift/i);
    expect(text(navaratri)).not.toMatch(/sabudana|buckwheat|kuttu|rajgira|amaranth|rock salt|first and last days/i);
    expect(text(navaratri)).not.toMatch(/Fasting is your call/i);
    expect(text(navaratri)).toMatch(/If you choose to fast/);
  });

  it("Navaratri states Durga Puja's five principal days from a verified source, and gives Kanya Puja no region", () => {
    const dp = navaratri.sections.find((s) => s.title.startsWith("Durga Puja"))!;
    expect(dp.sourceIds).toContain("navaratri-britannica-durga-puja");
    expect(dp.body).toMatch(/last five days/);
    const rituals = navaratri.sections.find((s) => s.title.startsWith("Nine nights"))!;
    expect(rituals.body).toMatch(/Kanya Puja/);
    expect(rituals.body).not.toMatch(/northern India|Tamil/);
  });

  it("no source with a restrictive linking clause is cited (BiblioAsia was removed)", () => {
    for (const r of pilots) {
      expect(r.sources.map((s) => s.url).join(" ")).not.toMatch(/biblioasia/);
      const cited = [...r.sections, ...(r.quickFacts ?? []), ...(r.deityEntries ?? [])].flatMap((x) => x.sourceIds);
      expect(cited.join(" ")).not.toMatch(/biblioasia/i);
      expect(bodies(r).join(" ")).not.toMatch(/biblioasia/i);
    }
  });

  it("source terms: Britannica pages were read; unread terms are never marked checked", () => {
    for (const r of pilots) {
      for (const s of r.sources) {
        if (/britannica\.com\/(?!.*wikisource)/.test(s.url)) expect(s.termsChecked, s.id).toBe(true);
        if (/Unchecked|Not checked|Terms not checked/.test(s.termsNote ?? "")) expect(s.termsChecked, s.id).toBe(false);
      }
    }
  });
});

describe("source-use audit trail on the real content", () => {
  it.each(pilots.map((r) => [r.slug, r] as const))("%s: every source records the four source-use answers, none reproducing content", (_slug, record) => {
    for (const s of record.sources) {
      expect(s.reproducesProtectedContent, s.id).toBe(false);
      expect(s.permissionRequired, s.id).toBe("no");
      expect(s.permissionStatus, s.id).toBe("not_needed");
      expect(s.termsNote, s.id).toBeTruthy();
    }
  });
});

describe("approved basics", () => {
  it.each(pilots.map((r) => [r.slug, r] as const))("%s: search terms are backed by attributed deity entries, and the basics are not approved", (_slug, record) => {
    expect(record.basics.status).toBe("reviewed");
    const entryNames = (record.deityEntries ?? []).map((d) => d.name);
    for (const term of record.deities) expect(entryNames, term).toContain(term);
    expect(record.subtitle.length).toBeGreaterThan(10);
    expect(record.subtitle).not.toMatch(/\b(19|20)\d{2}\b/);
  });

  it("do not treat a separate festival as an alias", () => {
    expect(ugadi.aliases).not.toContain("Gudi Padwa");
    expect(navaratri.aliases).not.toContain("Vijayadashami");
    expect(diwali.aliases).not.toContain("Dussehra");
  });
});

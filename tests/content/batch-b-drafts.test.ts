import { describe, expect, it } from "vitest";
import { diwali } from "@/content/festivals/diwali";
import { ganeshChaturthi } from "@/content/festivals/ganesh-chaturthi";
import { krishnaJanmashtami } from "@/content/festivals/krishna-janmashtami";
import { navaratri } from "@/content/festivals/navaratri";
import { vijayadashami } from "@/content/festivals/vijayadashami";
import { FESTIVAL_RECORDS } from "@/content";
import { publishAll, publishRecord } from "@/lib/festivals/content/load";
import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { errors, validateRecord, wordCount } from "@/lib/festivals/content/validate";
import { expectedReviewDate } from "../fixtures/review-dates";

/*
 * P3-05 Batch B: three guides (Krishna Janmashtami, Ganesh Chaturthi, Vijayadashami), reviewed 2026-11-12 at editorial
 * revision 2. These tests keep them honest: reviewed metadata, full publication, no festival dates, no unsupported or
 * sensitive content, every internal note classified, and the owner's editorial decisions from both review rounds.
 */
const batch: readonly FestivalRecord[] = [krishnaJanmashtami, ganeshChaturthi, vijayadashami];
const TODAY = "2026-11-12";

const bodies = (r: FestivalRecord) => [
  ...r.sections.flatMap((s) => [s.title, s.body]),
  ...(r.quickFacts ?? []).map((f) => f.text),
  ...(r.deityEntries ?? []).flatMap((d) => [d.role, d.tradition]),
  r.subtitle,
];
const text = (r: FestivalRecord) => bodies(r).join("\n");
const section = (r: FestivalRecord, title: string) => r.sections.find((s) => s.title === title)!;

describe.each(batch.map((r) => [r.slug, r] as const))("%s batch B reviewed guide", (_slug, record) => {
  it("is reviewed with the recorded metadata, and every occurrence stays empty", () => {
    const meta = { status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial" };
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
    expect(out.guide.pendingReview).toBe(false);
    expect(out.festival.subtitle).toBe(record.subtitle);
    expect(out.festival.aliases).toEqual(record.aliases);
    expect(out.festival.deities).toEqual(record.deities);
    expect(out.festival.provisional).toEqual({ aliases: [], deities: [] });
    expect(out.occurrences).toEqual([]);
    expect(JSON.stringify(out)).not.toMatch(/deityEntries|reviewNotes|reviewedBy|desi-days-editorial|termsNote|permissionStatus|claimsSupported/);
  });

  it("has no validation errors or warnings", () => {
    expect(validateRecord(record, TODAY).map((i) => `${i.severity} ${i.path}: ${i.message}`)).toEqual([]);
  });

  it("has an 80-150 word introduction, the required kinds, and 4 to 5 quick facts", () => {
    const overview = record.sections.find((s) => s.kind === "overview")!;
    const words = wordCount(overview.body);
    expect(words).toBeGreaterThanOrEqual(80);
    expect(words).toBeLessThanOrEqual(150);
    const kinds = new Set(record.sections.map((s) => s.kind));
    for (const kind of ["overview", "story", "rituals", "regional_variation", "college_guide"] as const) expect(kinds.has(kind), kind).toBe(true);
    const facts = (record.quickFacts ?? []).length;
    expect(facts).toBeGreaterThanOrEqual(4);
    expect(facts).toBeLessThanOrEqual(5);
    expect((record.deityEntries ?? []).length).toBeGreaterThan(0);
  });

  it("attributes every story, regional variation and deity to a tradition", () => {
    record.sections
      .filter((s) => s.kind === "story" || s.kind === "regional_variation")
      .forEach((s) => expect(s.tradition, s.title).toBeTruthy());
    (record.deityEntries ?? []).forEach((d) => expect(d.tradition, d.name).toBeTruthy());
  });

  it("backs every deity search term with an attributed deity entry", () => {
    const names = (record.deityEntries ?? []).map((d) => d.name);
    for (const term of record.deities) expect(names, term).toContain(term);
    expect(record.subtitle.length).toBeGreaterThan(10);
  });

  it("states no festival dates (historical years are allowed) and names no specific colleges", () => {
    expect(text(record)).not.toMatch(/\b(2026|2027)\b/);
    expect(text(record)).not.toMatch(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? \d{1,2}\b/i);
    expect(text(record)).not.toMatch(/\b\d{1,2}(st|nd|rd|th)? (of )?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i);
    expect(text(record)).not.toMatch(/Appalachian|Dartmouth|Louisville|Georgia|Emory|Hamilton|Creighton|\bUGA\b/);
  });

  it("makes no universal vegetarian or fasting claims and gives no medical, recipe or dosage advice", () => {
    expect(text(record)).not.toMatch(/must be vegetarian|must fast|all hindus|every hindu|everyone fasts|required to (fast|abstain)/i);
    expect(text(record)).not.toMatch(/keep (it|your fast) simple|break your fast|listen to your body|look after your health|you should (eat|fast|drink)/i);
    expect(text(record)).not.toMatch(/\b(cups?|tablespoons?|teaspoons?|ounces?|dose|dosage|how much|recipe)\b|\d+ ?(g|grams|ml)\b/i);
    expect(text(record)).not.toMatch(/dietary or medical advice/);
  });

  it("keeps process language and source-critical commentary out of the public text", () => {
    expect(text(record)).not.toMatch(/still (being )?research|we are (still|looking)|will be added|we (looked|read|checked|found|have not)|parts we/i);
    expect(text(record)).not.toMatch(/reliable sources|not (yet )?(traced|verified)|single source/i);
  });

  it("keeps classified internal review notes, and every cited source id exists", () => {
    const items = [...record.sections, ...(record.quickFacts ?? []), ...(record.deityEntries ?? [])];
    const notes = items.flatMap((x) => x.reviewNotes ?? []);
    expect(notes.length).toBeGreaterThan(5);
    notes.forEach((n) => expect(n, n).toMatch(/^(BLOCKING|OPTIONAL|EDITORIAL|SOURCE NOTE)( \([^)]*\))?: /));
    const known = new Set(record.sources.map((s) => s.id));
    items.forEach((x) => x.sourceIds.forEach((id) => expect(known.has(id), id).toBe(true)));
    // Every source is used by something, so no research is left dangling.
    const used = new Set(items.flatMap((x) => x.sourceIds));
    record.sources.filter((s) => !s.id.startsWith("dorm-")).forEach((s) => expect(used.has(s.id), s.id).toBe(true));
  });

  it("records content-read and terms status honestly for every source", () => {
    for (const s of record.sources) {
      expect(s.termsNote, s.id).toBeTruthy();
      expect(s.reproducesProtectedContent, s.id).toBe(false);
      expect(s.permissionRequired, s.id).toBe("no");
      if (s.termsChecked) expect(s.termsNote, s.id).toMatch(/\bread\b|public domain/i);
      expect(s.role, s.id).toBe("cultural");
    }
  });
});

describe("Batch B in the catalog", () => {
  it("has all ten festivals reviewed, publishes every Batch B guide, and keeps every occurrence empty", () => {
    expect(FESTIVAL_RECORDS).toHaveLength(10);
    FESTIVAL_RECORDS.forEach((r) => expect(r.basics.status, r.slug).toBe("reviewed"));
    const published = publishAll(FESTIVAL_RECORDS, TODAY);
    expect(published.every((p) => p.guide.pendingReview === false)).toBe(true);
    for (const slug of ["krishna-janmashtami", "ganesh-chaturthi", "vijayadashami"]) {
      const p = published.find((x) => x.festival.slug === slug)!;
      expect(p.guide.sections.length, slug).toBeGreaterThan(7);
      expect(p.guide.sources.length, slug).toBeGreaterThan(5);
    }
    FESTIVAL_RECORDS.forEach((r) => expect(r.occurrences, r.slug).toEqual([]));
    published.forEach((p) => expect(p.occurrences, p.festival.slug).toEqual([]));
  });

  it("leaves the seven earlier reviewed guides on their original review date", () => {
    for (const r of FESTIVAL_RECORDS.filter((x) => !batch.some((b) => b.slug === x.slug))) {
      expect(r.basics, r.slug).toMatchObject({ reviewedAt: "2026-11-08" });
      // Original review date, except entries the owner re-approved after the P3-06 audit (see tests/fixtures/review-dates.ts).
      r.sections.forEach((sec) => expect(sec.reviewedAt, `${r.slug} ${sec.title}`).toBe(expectedReviewDate(r.slug, "sections", sec.title)));
    }
  });
});

describe("Krishna Janmashtami draft: owner priorities (revision 2)", () => {
  it("attributes the birth story to the Bhagavata Purana and Vaishnava tradition and keeps it on the birth", () => {
    const story = section(krishnaJanmashtami, "The birth of Krishna");
    expect(story.tradition).toMatch(/Vaishnava/);
    expect(story.tradition).toMatch(/Bhagavata Purana/);
    expect(story.body).toMatch(/Kamsa/);
    expect(story.body).toMatch(/Devaki/);
    expect(story.body).toMatch(/Yamuna/);
    expect(story.body).toMatch(/This is one telling/);
    expect(story.sourceIds).toEqual(expect.arrayContaining(["jm-bhagavata", "jm-brit"]));
    expect(story.body).not.toMatch(/Radha|Mahabharata|Gita/);
  });

  it("says only generally that observance dates can differ by tradition, with no reckoning rules", () => {
    const s = section(krishnaJanmashtami, "Smarta and Vaishnava traditions: why the day can differ");
    expect(s.tradition).toMatch(/Smarta/);
    expect(s.tradition).toMatch(/Vaishnava/);
    expect(s.body).toMatch(/observance dates can differ by tradition/);
    expect(s.body).toMatch(/matter of its own tradition/);
    expect(s.sourceIds).toEqual(["jm-argus"]);
    // No sunrise, Rohini, Ashtami-tithi or evening/midnight timing rules, and no claim that one tradition is right.
    expect(s.body).not.toMatch(/sunrise|Rohini|nakshatra|tithi|evening|udaya|nishita|\bashtami\b|midnight/i);
    expect(s.body).not.toMatch(/correct|incorrect|wrong|true date|right date/i);
    for (const r of [krishnaJanmashtami]) expect(text(r)).not.toMatch(/sunrise|nakshatra|tithi|udaya/i);
  });

  it("keeps Dahi Handi and its safety concern without legal limits, ages or heights", () => {
    const s = section(krishnaJanmashtami, "Dahi Handi: the pot of curd");
    expect(s.tradition).toMatch(/Maharashtra/);
    expect(s.body).toMatch(/Dahi Handi has caused injuries/);
    expect(s.body).toMatch(/local safety requirements/);
    expect(s.body).not.toMatch(/\bfeet\b|\bfoot\b|\bmeters?\b|\bcourts?\b|Supreme|High Court|helmets|under 18|below 18|age limit|height limit|20 to 40/i);
    expect(s.sourceIds).toEqual(["jm-brit", "jm-dte"]);
    expect(text(krishnaJanmashtami)).not.toMatch(/\b(2014|2016)\b/);
    const college = section(krishnaJanmashtami, "Celebrating Janmashtami away from home");
    expect(college.body).toMatch(/dangerous without trained organizers/);
    expect(college.body).not.toMatch(/low pot|ground level|safe way to enjoy/i);
  });

  it("removes the unsupported fasting and swing statements and states the fasting wording once", () => {
    const t = text(krishnaJanmashtami);
    expect(t).not.toMatch(/do not fast at all|many families do not fast/i);
    expect(t).not.toMatch(/or swing|\bswings?\b/i);
    expect(section(krishnaJanmashtami, "Fasting and the midnight vigil").body.match(/Fasting practices vary by family and tradition/g)).toHaveLength(1);
    expect(t.match(/Fasting practices vary by family and tradition/g)).toHaveLength(1);
    expect(t).not.toMatch(/personal and family matter/);
  });

  it("includes regional observances without inventing unsourced ones", () => {
    const regional = section(krishnaJanmashtami, "Mathura, Vrindavan and beyond");
    expect(regional.body).toMatch(/Vrindavan/);
    expect(regional.body).toMatch(/Puri/);
    expect(text(krishnaJanmashtami)).not.toMatch(/Pushtimarg|Nathdwara|kolam|Krishna Jayanthi|Gokulashtami in Tamil/i);
  });
});

describe("Ganesh Chaturthi draft: owner priorities (revision 2)", () => {
  it("tells the birth story from the Shiva Purana with general attribution and shows that versions vary", () => {
    const s = section(ganeshChaturthi, "Ganesha’s birth: more than one story");
    expect(s.tradition).toMatch(/Shiva Purana and other Puranic traditions; versions vary/);
    expect(s.body).toMatch(/Shiva Purana, in its Rudra Samhita/);
    expect(s.body).toMatch(/Jaya and Vijaya/);
    expect(s.body).toMatch(/dirt of her body/);
    expect(s.body).toMatch(/Many different stories/);
    expect(s.body).toMatch(/does not choose one version/);
    expect(s.body).toMatch(/differs from one age to another/);
    expect(s.sourceIds).toEqual(expect.arrayContaining(["gc-shivapurana", "gc-brit-ganesha", "gc-haf"]));
    // Only the one text that was actually read is named; no invented citations.
    expect(s.body).not.toMatch(/Brahmanda|Skanda|Linga Purana|Padma|chapter \d|sandalwood paste/);
    const src = ganeshChaturthi.sources.find((x) => x.id === "gc-shivapurana")!;
    expect(src.url).toBe("https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226133.html");
    expect(src.termsNote).toMatch(/read in full/);
  });

  it("does not connect the broken tusk to the elephant-head story", () => {
    expect(text(ganeshChaturthi)).not.toMatch(/tusk/i);
  });

  it("keeps Tilak and the late nineteenth-century history, acknowledges the Rangari question, and drops Shivaji and the communal clause", () => {
    const s = section(ganeshChaturthi, "How the festival became a public celebration");
    expect(s.body).toMatch(/Tilak/);
    expect(s.body).toMatch(/1893/);
    expect(s.body).toMatch(/Britannica credits/);
    expect(s.body).toMatch(/Rangari/);
    expect(s.body).toMatch(/1892/);
    expect(s.body).toMatch(/still debated/);
    expect(s.body).toMatch(/does not treat either year as settled/);
    expect(s.body).toMatch(/Kesari/);
    expect(s.sourceIds).toEqual(expect.arrayContaining(["gc-brit", "gc-brit-tilak", "gc-brut"]));
    expect(text(ganeshChaturthi)).not.toMatch(/Shivaji|nationalist sentiment|communal|\bMughal/i);
    expect(s.body).not.toMatch(/riot|clash|violence|massacre/i);
  });

  it("states the festival's duration and day-counting convention clearly", () => {
    const fact = ganeshChaturthi.quickFacts!.find((f) => f.label === "Length of observance")!;
    expect(fact.text).toMatch(/Counting the first day as day one/);
    expect(fact.text).toMatch(/eleventh day/);
    expect(fact.text).toMatch(/Anant Chaturdashi/);
    expect(fact.text).toMatch(/ten days after the first/);
    expect(fact.text).toMatch(/one and a half, three, five or seven/);
    const rituals = section(ganeshChaturthi, "Welcoming Ganesha");
    expect(rituals.body).toMatch(/eleventh day if the first day is counted as day one/);
  });

  it("keeps immersion concerns but generalizes the guidelines and sends readers to a temple or organizer", () => {
    const s = section(ganeshChaturthi, "Environmentally responsible immersion");
    expect(s.body).toMatch(/plaster of paris/);
    expect(s.body).toMatch(/pollution-control authorities have issued guidelines/);
    expect(s.body).toMatch(/clay/);
    expect(s.body).toMatch(/natural colors/);
    expect(s.body).toMatch(/temple or community organizer/);
    expect(s.body).not.toMatch(/Central Pollution Control Board|CPCB|\b(2020|2025)\b|fine|ban(s|ned)? /);
    expect(s.body).not.toMatch(/bucket|tub|plants|garden|pour/i);
    expect(s.sourceIds).not.toContain("gc-hans");
    const college = section(ganeshChaturthi, "Celebrating Ganesh Chaturthi away from home");
    expect(college.body).toMatch(/temple or community organizer/);
    expect(college.body).not.toMatch(/bucket|tub|plants|garden|pour/i);
    expect(college.body).toMatch(/Many residence halls ban open flames/);
  });

  it("keeps the deity search terms and the alias choices stable", () => {
    expect(ganeshChaturthi.deities).toEqual(["Ganesha", "Parvati", "Shiva"]);
    expect(ganeshChaturthi.aliases).toEqual(["Vinayaka Chaturthi"]);
  });
});

describe("Vijayadashami draft: owner priorities (revision 2) and consistency with Navaratri and Diwali", () => {
  it("keeps Dussehra, Dasara and Vijaya Dashami as aliases and explains the regional distinctions", () => {
    expect(vijayadashami.aliases).toEqual(["Dussehra", "Dasara", "Vijaya Dashami"]);
    const s = section(vijayadashami, "Vijayadashami, Dussehra and Dasara: the names");
    expect(s.body).toMatch(/different names, used in different regions, for the same tenth day/);
    expect(s.body).toMatch(/much of the north and west/);
    expect(s.body).toMatch(/West Bengal, Assam and other eastern states/);
    expect(s.body).toMatch(/Bijoya Doshomi/);
    expect(s.body).toMatch(/In Karnataka the festival is known as Dasara/);
    expect(s.body).toMatch(/often used interchangeably/);
    expect(s.body).toMatch(/Dussehra celebrates the victory; Diwali, the homecoming/);
  });

  it("keeps the Rama and Durga traditions separate, each attributed to its tradition", () => {
    const rama = section(vijayadashami, "Rama and Ravana");
    const durga = section(vijayadashami, "Durga and Mahishasura");
    expect(rama.tradition).toMatch(/Ramayana/);
    expect(durga.tradition).toMatch(/Shakta/);
    expect(durga.body).toMatch(/Devi Mahatmya/);
    expect(vijayadashami.deityEntries!.map((d) => d.name)).toEqual(["Rama", "Durga", "Chamundeshwari"]);
  });

  it("does not claim the epic establishes Ravana’s death on the tenth day", () => {
    const t = text(vijayadashami);
    expect(t).not.toMatch(/the day Rama (defeated|killed|slew)|on the tenth day,? (Rama|Ravana)|tenth day.{0,40}(Ravana (died|was killed|was slain))|epic (says|states|places)/i);
    expect(section(vijayadashami, "Why celebrate Vijayadashami?").body).toMatch(/when Rama’s victory over the ten-headed king Ravana is celebrated/);
  });

  it("no longer includes the children-shooting-flaming-arrows example", () => {
    const t = text(vijayadashami);
    expect(t).not.toMatch(/arrows? of fire|fiery arrows|flaming arrows|shoot|thirty-foot|30-foot|children/i);
    const s = section(vijayadashami, "Ramlila and the burning of Ravana");
    expect(s.body).toMatch(/stuffed with firecrackers/);
    expect(s.body).not.toMatch(/\b(light the|fuse|ignite|how to)\b/i);
    expect(s.sourceIds).not.toContain("vd-haf-iskcon");
  });

  it("separates Mahanavami customs from Vijayadashami customs", () => {
    const s = section(vijayadashami, "Mahanavami and Vijayadashami: tools, books, shami and apta leaves");
    expect(s.body).toMatch(/On Mahanavami, the ninth day of Navratri, Ayudha Puja/);
    expect(s.body).toMatch(/Vijayadashami itself brings different customs/);
    expect(s.body).toMatch(/shami puja and the Jamboo Savari/);
    expect(s.body).toMatch(/apta/);
    const fact = vijayadashami.quickFacts!.find((f) => f.label === "Common customs")!;
    expect(fact.text).toMatch(/Ayudha Puja, the worship of tools and books, falls the day before, on Mahanavami/);
    expect(fact.text).not.toMatch(/worship of books, tools and weapons in the south/);
  });

  it("keeps Kullu Dussehra to one source-limited sentence", () => {
    const regional = section(vijayadashami, "Bengal, Mysuru, Kullu and more");
    const kullu = regional.body.split("\n\n").find((p) => /Kullu/.test(p))!;
    expect(kullu.split(/(?<=\.)\s/).length).toBe(1);
    expect(kullu).toMatch(/Britannica says/);
    expect(kullu).toMatch(/instead of burning effigies of Ravana/);
    expect(kullu).not.toMatch(/Lanka|bonfire|begins on/i);
    expect(regional.body).toMatch(/Bengal/);
    expect(regional.body).toMatch(/Mysuru/);
    expect(text(vijayadashami)).not.toMatch(/Vidyarambham|Bastar/);
  });

  it("presents the books-and-laptop idea as an optional modern adaptation, not a traditional ritual", () => {
    const college = section(vijayadashami, "Celebrating Vijayadashami away from home");
    expect(college.body).toMatch(/Optionally, adapt Ayudha Puja/);
    expect(college.body).toMatch(/modern adaptation, not a documented traditional ritual/);
    expect(college.body).not.toMatch(/in the spirit of the day’s honoring/);
    expect(college.body).toMatch(/Do not light fireworks yourself/);
    expect(college.body).toMatch(/Many residence halls ban open flames/);
  });

  it("agrees with the reviewed Navaratri and Diwali guides", () => {
    expect(text(navaratri)).toMatch(/Vijayadashami/);
    expect(text(diwali)).toMatch(/Dussehra, earlier in the autumn, celebrates the victory over Ravana\. Diwali is the homecoming\./);
    expect(text(vijayadashami)).toMatch(/Diwali/);
    expect(section(vijayadashami, "Why celebrate Vijayadashami?").body).toMatch(/nine nights of Navaratri/);
    expect(text(vijayadashami)).not.toMatch(/ten days of Navaratri|nine days of Durga|Navaratri is ten/i);
  });
});

describe("all Batch B guides", () => {
  it("use the neutral dorm sentence and keep fasting wording neutral", () => {
    for (const r of batch) {
      const college = r.sections.find((s) => s.kind === "college_guide")!;
      expect(college.body, r.slug).toMatch(/If you have questions about religious accommodations, ask your residence life office\./);
      expect(college.body, r.slug).toMatch(/Many residence halls ban open flames/);
    }
  });
});

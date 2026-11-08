import { describe, expect, it } from "vitest";
import { holi } from "@/content/festivals/holi";
import { mahaShivaratri } from "@/content/festivals/maha-shivaratri";
import { makaraSankranti } from "@/content/festivals/makara-sankranti";
import { ramaNavami } from "@/content/festivals/rama-navami";
import { publishRecord } from "@/lib/festivals/content/load";
import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { errors, validateRecord, wordCount } from "@/lib/festivals/content/validate";

/*
 * P3-05 Batch A: four guides (Makara Sankranti, Maha Shivaratri, Holi, Rama Navami), reviewed 2026-11-08 at editorial
 * revision 3. These tests keep them honest: reviewed metadata, full publication, no dates, no unsupported or sensitive
 * content, and every internal note classified, plus the owner's editorial decisions.
 */
const batch: readonly FestivalRecord[] = [makaraSankranti, mahaShivaratri, holi, ramaNavami];
const TODAY = "2026-11-08";

const bodies = (r: FestivalRecord) => [
  ...r.sections.flatMap((s) => [s.title, s.body]),
  ...(r.quickFacts ?? []).map((f) => f.text),
  ...(r.deityEntries ?? []).flatMap((d) => [d.role, d.tradition]),
  r.subtitle,
];
const text = (r: FestivalRecord) => bodies(r).join("\n");

describe.each(batch.map((r) => [r.slug, r] as const))("%s batch A reviewed guide", (_slug, record) => {
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
    expect(out.guide.pendingReview).toBe(false);
    expect(out.festival.subtitle).toBe(record.subtitle);
    expect(out.festival.aliases).toEqual(record.aliases);
    expect(out.festival.deities).toEqual(record.deities);
    expect(out.festival.provisional).toEqual({ aliases: [], deities: [] });
    expect(out.occurrences).toEqual([]);
    expect(JSON.stringify(out)).not.toMatch(/deityEntries|reviewNotes|reviewedBy|desi-days-editorial|termsNote|permissionStatus/);
  });

  it("has no validation errors or warnings", () => {
    expect(validateRecord(record, TODAY).map((i) => `${i.severity} ${i.path}: ${i.message}`)).toEqual([]);
  });

  it("has an 80-150 word introduction and the required kinds", () => {
    const overview = record.sections.find((s) => s.kind === "overview")!;
    const words = wordCount(overview.body);
    expect(words).toBeGreaterThanOrEqual(80);
    expect(words).toBeLessThanOrEqual(150);
    const kinds = new Set(record.sections.map((s) => s.kind));
    for (const kind of ["overview", "rituals", "college_guide"] as const) expect(kinds.has(kind), kind).toBe(true);
    expect((record.quickFacts ?? []).length).toBeGreaterThanOrEqual(4);
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

  it("states no dates and names no specific colleges", () => {
    expect(text(record)).not.toMatch(/\b(19|20)\d{2}\b/);
    expect(text(record)).not.toMatch(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? \d{1,2}\b/i);
    expect(text(record)).not.toMatch(/Appalachian|Dartmouth|Louisville|Georgia|Emory|Hamilton|Creighton|\bUGA\b/);
  });

  it("makes no universal vegetarian or fasting claims and gives no medical or recipe advice", () => {
    expect(text(record)).not.toMatch(/must be vegetarian|must fast|all hindus|every hindu|everyone fasts|required to (fast|abstain)/i);
    expect(text(record)).not.toMatch(/\b(cups?|tablespoons?|teaspoons?|ounces?|dose|dosage|how much|recipe)\b|\d+ ?(g|grams|ml)\b/i);
  });

  it("keeps process language and source-critical commentary out of the public text", () => {
    expect(text(record)).not.toMatch(/still (being )?research|we are (still|looking)|will be added|we (looked|read|checked|found|have not)|parts we/i);
    expect(text(record)).not.toMatch(/reliable sources|not (yet )?(traced|verified)|single source/i);
  });

  it("keeps classified internal review notes", () => {
    const notes = [
      ...record.sections.flatMap((s) => s.reviewNotes ?? []),
      ...(record.quickFacts ?? []).flatMap((f) => f.reviewNotes ?? []),
      ...(record.deityEntries ?? []).flatMap((d) => d.reviewNotes ?? []),
    ];
    expect(notes.length).toBeGreaterThan(2);
    notes.forEach((n) => expect(n, n).toMatch(/^(BLOCKING|OPTIONAL|EDITORIAL|SOURCE NOTE): /));
  });

  it("records the four source-use answers, with nothing reproduced and no permission-restricted source", () => {
    for (const s of record.sources) {
      expect(s.reproducesProtectedContent, s.id).toBe(false);
      expect(s.permissionRequired, s.id).toBe("no");
      expect(s.permissionStatus, s.id).toBe("not_needed");
      expect(s.termsNote, s.id).toBeTruthy();
      if (s.termsChecked) expect(s.termsNote, s.id).toMatch(/\bread\b|public domain|Terms/i);
      expect(s.url, s.id).not.toMatch(/ignca\.gov\.in|biblioasia|calendarlabs/i);
    }
  });

  it("cites only sources that exist and uses each source it lists", () => {
    const ids = new Set(record.sources.map((s) => s.id));
    const cited = new Set(
      [...record.sections, ...(record.quickFacts ?? []), ...(record.deityEntries ?? [])].flatMap((x) => x.sourceIds),
    );
    cited.forEach((id) => expect(ids.has(id), id).toBe(true));
    ids.forEach((id) => expect(cited.has(id), `unused source ${id}`).toBe(true));
  });

  it("includes no contemporary political commentary or graphic detail", () => {
    expect(text(record)).not.toMatch(/Hindutva|Babri|Janmabhoomi|Ram Mandir|communal violence|riot|massacre|animal sacrifice|blood/i);
  });
});

describe("Batch A editorial decisions (2026-11-08, revision 2)", () => {
  it("Makara Sankranti keeps Pongal, Lohri, Uttarayan and Bihu distinct and never as aliases", () => {
    expect(makaraSankranti.name).toBe("Makara Sankranti");
    expect(makaraSankranti.aliases).toEqual(["Sankranti", "Makar Sankranti"]);
    for (const alias of makaraSankranti.aliases) expect(alias).not.toMatch(/Pongal|Lohri|Uttarayan|Bihu/i);
    const regional = makaraSankranti.sections.find((s) => s.title === "One solar moment, many festivals")!;
    expect(regional.body).toMatch(/related celebrations, not one festival with many labels/);
    for (const name of ["Pongal", "Lohri", "Uttarayan", "Bihu"]) expect(regional.body).toContain(name);
    expect(text(makaraSankranti)).not.toMatch(/Pongal is Makar Sankranti|Bhishma|buffalo|egg fight|through (a )?(controlled )?fire|chased/i);
  });

  it("Makara Sankranti’s subtitle is the approved one", () => {
    expect(makaraSankranti.subtitle).toBe("A solar festival of harvest and renewal");
  });

  it("Makara Sankranti separates the traditional uttarayana reckoning from the December solstice, everywhere it matters", () => {
    const overview = makaraSankranti.sections.find((s) => s.kind === "overview")!;
    const solar = makaraSankranti.sections.find((s) => s.title === "A solar festival: tradition and astronomy")!;
    const meaning = makaraSankranti.quickFacts!.find((f) => f.label === "Meaning")!;
    for (const body of [overview.body, solar.body, meaning.text]) {
      expect(body, body.slice(0, 40)).toMatch(/December solstice/);
      expect(body, body.slice(0, 40)).toMatch(/tradition/);
    }
    expect(solar.body).toMatch(/began as a winter-solstice holiday/);
    expect(text(makaraSankranti)).not.toMatch(/Sun begins its northward journey|begins its northward journey, called uttarayana/);
    // The astronomy is cited to the U.S. Naval Observatory page the editor read directly.
    const usno = makaraSankranti.sources.find((s) => s.id === "sankranti-usno")!;
    expect(usno.url).toBe("https://aa.usno.navy.mil/faq/rs_solstices");
    for (const ids of [overview.sourceIds, solar.sourceIds, meaning.sourceIds]) expect(ids).toContain("sankranti-usno");
  });

  it("Makara Sankranti’s Surya entry does not place the astronomical northward turn on Makara Sankranti", () => {
    const surya = makaraSankranti.deityEntries!.find((d) => d.name === "Surya")!;
    expect(surya.role).not.toMatch(/turn northward|northward/i);
    expect(surya.role).toMatch(/Makara Sankranti/);
  });

  it("Makara Sankranti keeps Surya and Indra (Indra tied to Tamil Pongal), the allergen tip and the kite caution", () => {
    const names = makaraSankranti.deityEntries!.map((d) => d.name);
    expect(names).toEqual(expect.arrayContaining(["Surya", "Indra"]));
    expect(makaraSankranti.deityEntries!.find((d) => d.name === "Indra")!.tradition).toBe("Tamil Pongal");
    const tip = makaraSankranti.sections.find((s) => s.kind === "college_guide")!;
    expect(tip.body).toMatch(/major food allergens/);
    expect(tip.body).toMatch(/never glass-coated string/);
    expect(tip.sourceIds).toEqual(expect.arrayContaining(["sankranti-fda", "sankranti-karnataka"]));
  });

  it("Makara Sankranti’s Telangana and Andhra detail is limited to the sourced Kanuma sentence", () => {
    const regional = makaraSankranti.sections.find((s) => s.title === "One solar moment, many festivals")!;
    expect(regional.body).toMatch(/Kanuma, the festival of cattle/);
    expect(regional.body).not.toMatch(/Mukkanuma|Pedha Panduga|Bhogi/);
    expect(regional.body).not.toMatch(/several days/);
    expect(regional.sourceIds).toEqual(expect.arrayContaining(["sankranti-akashvani", "sankranti-chittoor"]));
  });

  it("Holi presents Holika’s burning as a traditional narrative with no named text", () => {
    const story = holi.sections.find((s) => s.title === "The burning of Holika")!;
    expect(story.body).toMatch(/told in several versions/);
    expect(story.body).not.toMatch(/Bhagavata|Vishnu Purana|Narada|Bhavishya/);
    expect(story.sourceIds.every((id) => !/purana|bhagavata/i.test(id))).toBe(true);
  });

  it("Holi has no aliases, explains Holika Dahan as a related preceding observance, and omits Shiva-Kama and ancient-text references", () => {
    expect(holi.aliases).toEqual([]);
    const rituals = holi.sections.find((s) => s.title === "A bonfire and a day of color")!;
    expect(rituals.body).toMatch(/related observance, Holika Dahan, on the evening before/);
    expect(holi.sections.some((s) => /Shiva and Kama|ancient roots/.test(s.title))).toBe(false);
    expect(text(holi)).not.toMatch(/Kama\b|Kamasutra|Atharva|Hala\b|Phalgunotsava|Kumarasambhava/);
    expect(holi.quickFacts!.find((f) => f.label === "Associated deities")!.text).not.toMatch(/Shiva|Kama/);
    expect(holi.deities).toEqual(["Krishna", "Radha", "Vishnu"]);
  });

  it("Holi shortens the Radha and Krishna story without skin-color emphasis", () => {
    const story = holi.sections.find((s) => s.title === "Radha and Krishna")!;
    expect(story.body).toMatch(/smeared color on Radha’s face/);
    expect(story.body).not.toMatch(/skin|complexion|dark|fair/i);
  });

  it("Holi keeps only the sourced thandai and bhang distinction and gives no consumption guidance", () => {
    const food = holi.sections.find((s) => s.kind === "food")!;
    expect(food.body).toMatch(/Bhang, a mild cannabis-based drink, is listed separately from thandai/);
    expect(food.body).not.toMatch(/cannabis-infused|ordinarily made without|other drinks/);
    expect(text(holi)).not.toMatch(/\b(drink|drinking|consume|consuming|try|enjoy) (some )?(bhang|cannabis)/i);
    expect(text(holi)).not.toMatch(/widow|Baldeo|Balarama/i);
  });

  it("Holi’s synthetic-color wording is measured and keeps the eye-safety and consent language", () => {
    const colors = holi.sections.find((s) => s.title === "Colors, then and now")!;
    expect(colors.body).toMatch(/Ingredients vary from product to product/);
    expect(text(holi)).not.toMatch(/toxic|Synthetic colors can irritate/);
    const college = holi.sections.find((s) => s.kind === "college_guide")!;
    expect(college.body).toMatch(/keep powder away from your eyes/);
  });

  it("Holi keeps the explicit consent line and eye-safety guidance and does not claim hierarchies are suspended", () => {
    const college = holi.sections.find((s) => s.kind === "college_guide")!;
    expect(college.body).toMatch(/Ask first\. Always ask before putting color on someone, and respect a no\./);
    expect(college.body).toMatch(/rinse with plenty of clean water/);
    expect(text(holi)).not.toMatch(/set aside|suspend|no distinctions|caste/i);
    const rituals = holi.sections.find((s) => s.title === "A bonfire and a day of color")!;
    expect(rituals.body).toMatch(/In some places the play loosens/);
    expect(rituals.body).toMatch(/not every community plays in the same way/);
  });

  it("Maha Shivaratri keeps the pillar of light with the approved wording, the hunter, and a one-sentence Herath", () => {
    expect(text(mahaShivaratri)).not.toMatch(/bhang|thandai|cannabis/i);
    expect(mahaShivaratri.sources.some((s) => /ignca/i.test(s.url))).toBe(false);
    expect(mahaShivaratri.aliases).not.toContain("Herath");
    const pillar = mahaShivaratri.sections.find((s) => s.title === "The pillar of light")!;
    expect(pillar.body).toMatch(/The Linga Purana and the Shiva Purana tell this story, and Shaiva festival tradition associates it with Maha Shivaratri\./);
    expect(pillar.body).not.toMatch(/name Maha Shivaratri|names the night|name the night/);
    expect(mahaShivaratri.sections.some((s) => s.title === "The hunter who worshipped without knowing" && s.tradition === "Shiva Purana")).toBe(true);
    const regional = mahaShivaratri.sections.find((s) => s.kind === "regional_variation")!;
    expect(regional.body.match(/Herath/g)).toHaveLength(1);
  });

  it("Maha Shivaratri keeps the poison and marriage accounts briefly and drops Parvati’s fast", () => {
    const stories = mahaShivaratri.sections.find((s) => s.title === "Other stories: the poison and the marriage")!;
    expect(stories.body).toMatch(/poison/);
    expect(stories.body).toMatch(/marriage/);
    expect(wordCount(stories.body)).toBeLessThan(80);
    expect(text(mahaShivaratri)).not.toMatch(/Parvati prayed|fasted on this night|Parvati’s fast|her fast/i);
    expect(stories.sourceIds).not.toContain("shivaratri-brandeis");
  });

  it("Rama Navami includes Ayodhya’s religious significance inside the worship section, without political commentary", () => {
    expect(ramaNavami.sections.some((s) => s.title === "Ayodhya and northern India")).toBe(false);
    const worship = ramaNavami.sections.find((s) => s.title === "A day of worship at home and in the temple")!;
    expect(worship.body).toMatch(/Ayodhya as Rama’s birthplace/);
    expect(text(ramaNavami)).not.toMatch(/Hindutva|Babri|temple at Ayodhya|campaign|1992|inaugurat/i);
    expect(ramaNavami.sources.map((s) => s.title).join(" ")).toMatch(/Desiraju Hanumanta Rao/);
  });

  it("Rama Navami makes no claim about when the festival arose, shortens the Michigan example, and keeps the spring Navaratri link and attributed foods", () => {
    expect(text(ramaNavami)).not.toMatch(/later tradition|grew up/i);
    const wedding = ramaNavami.sections.find((s) => s.title === "The wedding of Rama and Sita")!;
    expect(wedding.body).toMatch(/at one Michigan temple/);
    expect(wedding.body).not.toMatch(/gift of the daughter|prays for good marriages/);
    expect(ramaNavami.sections.some((s) => s.title === "The last day of spring Navaratri")).toBe(true);
    const food = ramaNavami.sections.find((s) => s.kind === "fasting")!;
    expect(food.body).toMatch(/Hinduism Today describes temples/);
    expect(food.body).toMatch(/panaka/);
  });

  it("no Batch A guide reads as personal dietary or medical advice about fasting", () => {
    for (const r of batch) {
      expect(text(r), r.slug).not.toMatch(/keep (it|your fast) simple|break your fast|listen to your body|look after your health|you should (eat|fast|drink)/i);
    }
    for (const r of [mahaShivaratri, ramaNavami]) {
      expect(text(r), r.slug).toMatch(/Fasting practices vary by family and tradition\./);
      expect(text(r), r.slug).not.toMatch(/dietary or medical advice/);
    }
  });
});

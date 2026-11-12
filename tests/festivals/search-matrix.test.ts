import { describe, expect, it } from "vitest";
import { FESTIVAL_RECORDS } from "@/content";
import { searchFestivals } from "@/lib/festivals/search";
import { contentFestivals } from "../fixtures/festivals";

/*
 * P3-06 search alias and deity matrix (see docs/research/p3-06/search-matrix.md). Locks in which reviewed aliases and
 * deity terms find which festival, with the match explanation, so a change to a record or to the search code that
 * alters results has to be deliberate. Sets are compared sorted, so ranking is not part of the contract.
 */
const run = (q: string) => searchFestivals(contentFestivals, q);
const names = (q: string) => run(q).map((r) => r.festival.name).sort();

const ALIASES: [string, string, string][] = [
  // [query, festival, alias text shown as "Matched other name"]
  ["deepavali", "Diwali", "Deepavali"],
  ["yugadi", "Ugadi", "Yugadi"],
  ["vinayaka", "Ganesh Chaturthi", "Vinayaka Chaturthi"],
  ["navratri", "Navaratri", "Navratri"],
  ["dussehra", "Vijayadashami", "Dussehra"],
  ["dasara", "Vijayadashami", "Dasara"],
  ["vijaya dashami", "Vijayadashami", "Vijaya Dashami"],
  ["gokulashtami", "Krishna Janmashtami", "Gokulashtami"],
  ["ram navami", "Rama Navami", "Ram Navami"],
  ["sri rama navami", "Rama Navami", "Sri Rama Navami"],
  ["mahashivratri", "Maha Shivaratri", "Mahashivratri"],
  ["makar sankranti", "Makara Sankranti", "Makar Sankranti"],
];

const DEITIES: [string, string[]][] = [
  ["lakshmi", ["Diwali", "Navaratri"]],
  ["brahma", ["Ugadi"]],
  ["ganesha", ["Ganesh Chaturthi"]],
  ["parvati", ["Ganesh Chaturthi", "Maha Shivaratri"]],
  ["durga", ["Navaratri", "Vijayadashami"]],
  ["saraswati", ["Navaratri"]],
  ["sita", ["Rama Navami"]],
  ["hanuman", ["Rama Navami"]],
  ["radha", ["Holi"]],
  ["vishnu", ["Holi", "Krishna Janmashtami"]],
  ["surya", ["Makara Sankranti"]],
  ["kali", ["Diwali"]],
  ["rama", ["Diwali", "Rama Navami", "Vijayadashami"]],
  ["krishna", ["Diwali", "Holi", "Krishna Janmashtami"]],
];

describe("search matrix: reviewed aliases", () => {
  it.each(ALIASES)("%s finds %s and explains the alias %s", (query, festival, alias) => {
    const results = run(query);
    expect(results.map((r) => r.festival.name)).toEqual([festival]);
    expect(results[0].matchedOn).toEqual({ kind: "alias", text: alias }); // no provisional flag: every basics block is reviewed
  });

  it("matches names directly, case-insensitively, without a match note", () => {
    for (const f of contentFestivals) {
      const r = run(f.name.toUpperCase());
      expect(r.map((x) => x.festival.slug), f.name).toContain(f.slug);
      expect(r.find((x) => x.festival.slug === f.slug)!.matchedOn, f.name).toBeUndefined();
    }
  });

  it("treats spelling variants that normalize to a listed term as matches", () => {
    expect(names("Shivratri")).toEqual(["Maha Shivaratri"]);
    expect(names("shivaratri")).toEqual(["Maha Shivaratri"]);
    expect(names("makara sankranti")).toEqual(["Makara Sankranti"]);
    expect(names("sankranti")).toEqual(["Makara Sankranti"]);
  });
});

describe("search matrix: reviewed deity terms", () => {
  it.each(DEITIES)("%s finds %j", (query, expected) => {
    expect(names(query)).toEqual([...expected].sort());
    for (const r of run(query)) {
      if (r.matchedOn) {
        expect(r.matchedOn.kind).toBe("deity");
        expect(r.matchedOn.provisional).toBeUndefined();
      }
    }
  });

  it("every deity search term is backed by an attributed deity entry in the same guide", () => {
    for (const r of FESTIVAL_RECORDS) {
      const entries = new Map((r.deityEntries ?? []).map((d) => [d.name, d]));
      for (const term of r.deities) {
        expect(entries.has(term), `${r.slug}: ${term}`).toBe(true);
        expect(entries.get(term)!.tradition.length, `${r.slug}: ${term} tradition`).toBeGreaterThan(3);
      }
    }
  });

  it("no alias or deity term is shared by two festivals as an alias (aliases identify one festival)", () => {
    const seen = new Map<string, string>();
    for (const r of FESTIVAL_RECORDS) {
      for (const a of r.aliases) {
        const key = a.toLowerCase();
        expect(seen.has(key) ? `${a} also on ${seen.get(key)}` : "", `${r.slug}`).toBe("");
        seen.set(key, r.slug);
      }
    }
  });
});

describe("search matrix: edges", () => {
  it("returns all ten festivals for an empty, spaces-only or single-letter query, and none for nonsense", () => {
    expect(run("")).toHaveLength(10);
    expect(run("   ")).toHaveLength(10);
    expect(run("a")).toHaveLength(10);
    expect(run("zzzz")).toHaveLength(0);
  });

  it("requires every word to match and ignores hyphens and extra spaces", () => {
    expect(names("chaturthi ganesh")).toEqual(["Ganesh Chaturthi"]);
    expect(names("  ganesh-chaturthi ")).toEqual(["Ganesh Chaturthi"]);
    expect(names("holi diwali")).toEqual([]);
  });
});

describe("search matrix: documented gaps (S3, see search-matrix.md)", () => {
  // Not failures today; each is a possible future improvement that needs the owner's decision.
  it.todo("finds Vijayadashami for the spelling Dusshera and the Bengali name Bijoya");
  it.todo("finds Krishna Janmashtami for Krishna Jayanthi (no source read for that name)");
  it.todo("finds Makara Sankranti for Pongal, Lohri and Uttarayan (owner kept them as related festivals, not aliases)");
  it.todo("searches subtitles ('festival of lights', 'colors', 'new year')");
});

import { describe, expect, it } from "vitest";
import { contentFestivals, withReviewedBasics } from "../fixtures/festivals";
import { normalizeSearchText, searchFestivals } from "@/lib/festivals/search";

const names = (query: string) => searchFestivals(contentFestivals, query).map((r) => r.festival.name);

describe("normalizeSearchText", () => {
  it("lowercases, strips accents and punctuation, and collapses spaces", () => {
    expect(normalizeSearchText("  Ugādi ")).toBe("ugadi");
    expect(normalizeSearchText("Ganesh-Chaturthi")).toBe("ganesh chaturthi");
    expect(normalizeSearchText("A   B")).toBe("a b");
    expect(normalizeSearchText("!!!")).toBe("");
  });
});

describe("searchFestivals", () => {
  it("returns every festival, in order, for an empty or punctuation-only query", () => {
    expect(names("")).toEqual(contentFestivals.map((f) => f.name));
    expect(names("   ")).toHaveLength(10);
    expect(names("?!")).toHaveLength(10);
  });

  it("finds by name, case-insensitively", () => {
    expect(names("ugadi")).toEqual(["Ugadi"]);
    expect(names("UGADI")).toEqual(["Ugadi"]);
    expect(names("hol")).toEqual(["Holi"]);
  });

  it("finds by alias and explains the match", () => {
    const [result] = searchFestivals(contentFestivals, "dussehra");
    expect(result.festival.name).toBe("Vijayadashami");
    // Unreviewed wording: found, but flagged so the page never displays it.
    expect(result.matchedOn).toEqual({ kind: "alias", text: "Dussehra", provisional: true });
    expect(names("Navratri")).toEqual(["Navaratri"]);
  });

  it("finds by deity and explains the match", () => {
    const [result] = searchFestivals(contentFestivals, "ganesha");
    expect(result.festival.name).toBe("Ganesh Chaturthi");
    expect(result.matchedOn).toEqual({ kind: "deity", text: "Ganesha", provisional: true });
    expect(names("lakshmi")).toEqual(expect.arrayContaining(["Diwali", "Navaratri"]));
  });

  it("reports an explainable match without the flag once the basics are reviewed", () => {
    const [result] = searchFestivals([withReviewedBasics("vijayadashami")], "dussehra");
    expect(result.matchedOn).toEqual({ kind: "alias", text: "Dussehra" });
  });

  it("does not add a match note when the name itself matches", () => {
    expect(searchFestivals(contentFestivals, "diwali")[0].matchedOn).toBeUndefined();
  });

  it("requires every word to match, in any order", () => {
    expect(names("chaturthi ganesh")).toEqual(["Ganesh Chaturthi"]);
    expect(names("ugadi ganesha")).toEqual([]);
  });

  it("ignores extra spaces and hyphens", () => {
    expect(names("  ganesh-chaturthi ")).toEqual(["Ganesh Chaturthi"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(names("zzzz")).toEqual([]);
  });

  it("treats regex and HTML characters as plain text", () => {
    expect(names(".*")).toHaveLength(10); // punctuation-only means "no filter"
    expect(names("<script>")).toEqual([]);
  });
});

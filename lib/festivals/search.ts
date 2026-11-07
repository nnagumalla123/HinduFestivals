import type { MockFestival } from "./types";

export const MAX_QUERY_LENGTH = 100;

/**
 * Lowercases, removes accents ("Ugādi" -> "ugadi"), turns punctuation into spaces and
 * collapses whitespace, so "Ganesh-Chaturthi", " ganesh  chaturthi " and "GANESH CHATURTHI" all match.
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export interface SearchResult {
  festival: MockFestival;
  /** Set when the festival was found through an alias or deity rather than its own name. */
  matchedOn?: { kind: "alias" | "deity"; text: string };
}

/**
 * Finds festivals whose name, aliases or deities contain every word of the query.
 * An empty (or punctuation-only) query returns everything, in the original order.
 */
export function searchFestivals(
  festivals: readonly MockFestival[],
  rawQuery: string,
): SearchResult[] {
  const query = normalizeSearchText(rawQuery.slice(0, MAX_QUERY_LENGTH));
  if (!query) return festivals.map((festival) => ({ festival }));

  const words = query.split(" ");
  const results: SearchResult[] = [];

  for (const festival of festivals) {
    const name = normalizeSearchText(festival.name);
    const aliases = festival.aliases.map((text) => ({ text, norm: normalizeSearchText(text) }));
    const deities = festival.deities.map((text) => ({ text, norm: normalizeSearchText(text) }));

    // Every word must appear somewhere in the festival's searchable text.
    const haystack = [name, ...aliases.map((a) => a.norm), ...deities.map((d) => d.norm)].join(" ");
    if (!words.every((word) => haystack.includes(word))) continue;

    // If the name itself matches, no explanation is needed. Otherwise say why it matched.
    let matchedOn: SearchResult["matchedOn"];
    if (!name.includes(query)) {
      const alias = aliases.find((a) => a.norm.includes(query));
      const deity = deities.find((d) => d.norm.includes(query));
      if (alias) matchedOn = { kind: "alias", text: alias.text };
      else if (deity) matchedOn = { kind: "deity", text: deity.text };
    }
    results.push({ festival, matchedOn });
  }
  return results;
}

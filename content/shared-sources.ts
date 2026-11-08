import type { ContentSource, SourceKind } from "@/lib/festivals/content/schema";

/**
 * Helpers shared by the Batch A festival files (P3-05). Not used by the three published pilot guides, which
 * keep their own source lists. Every source built here records the four source-use answers: we paraphrase and
 * link only, nothing is reproduced, and no permission is needed for that use. A source whose terms DO restrict
 * linking (for example IGNCA, which requires prior permission before others link to it) must not be built with
 * this helper: it is left out of the content files instead.
 */

export const READ_ON = "2026-11-08";

/** Britannica terms, read 2026-11-07 for the pilot guides. */
export const BRITANNICA_TERMS =
  "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.";

interface SourceInput {
  id: string;
  kind: SourceKind;
  title: string;
  url: string;
  publisher: string;
  claimsSupported: readonly string[];
  /** Was the terms or copyright page actually read? */
  termsChecked: boolean;
  termsNote: string;
  accessedAt?: string;
}

/** A cultural source used by paraphrase and link only. */
export function source(input: SourceInput): ContentSource {
  return {
    id: input.id,
    role: "cultural",
    kind: input.kind,
    title: input.title,
    url: input.url,
    publisher: input.publisher,
    accessedAt: input.accessedAt ?? READ_ON,
    claimsSupported: input.claimsSupported,
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: input.termsChecked,
    termsNote: input.termsNote,
  };
}

/** A Britannica page (terms read). */
export function britannica(input: Omit<SourceInput, "kind" | "publisher" | "termsChecked" | "termsNote">): ContentSource {
  return source({
    ...input,
    kind: "cultural",
    publisher: "Encyclopaedia Britannica",
    termsChecked: true,
    termsNote: BRITANNICA_TERMS,
  });
}

/** Practical housing-policy sources, cited for general patterns only (the guides name no college). */
export const dormSources: readonly ContentSource[] = [
  source({
    id: "dorm-appstate",
    kind: "other",
    title: "Open Flame Policy (residence halls)",
    url: "https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy",
    publisher: "Appalachian State University",
    accessedAt: "2026-11-07",
    claimsSupported: ["Residence halls can ban all open flames, including unlit candles, incense and oil lamps"],
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  }),
  source({
    id: "dorm-uga",
    kind: "other",
    title: "Community Guide 2026-2027 (residence halls)",
    url: "https://housing.uga.edu/community-guide/",
    publisher: "University of Georgia Housing",
    accessedAt: "2026-11-07",
    claimsSupported: ["Candles, incense and open flames prohibited at this school; string lights also prohibited; in-room cooking limited to certain sealed appliances"],
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  }),
];

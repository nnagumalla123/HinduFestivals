import type { GuideSectionKind } from "./types";

/**
 * The detail-page sections after "Quick facts", in the order set by PRD section 4
 * (Quick facts comes first and "Sources & review" last; both are built in the page).
 *
 * `kinds` says which reviewed content (GuideSection.kind) belongs in the slot.
 * `purpose` describes what the section is FOR, shown while there is no reviewed content.
 * It must never contain a claim about any festival.
 */
export interface GuideSlot {
  id: string;
  title: string;
  kinds: readonly GuideSectionKind[];
  purpose: string;
}

export const GUIDE_SLOTS: readonly GuideSlot[] = [
  {
    id: "why-celebrate",
    title: "Why celebrate?",
    kinds: ["overview", "significance"],
    purpose: "A short, beginner-friendly summary of what the festival means.",
  },
  {
    id: "stories",
    title: "Stories & mythology",
    kinds: ["story"],
    purpose: "Stories attributed to their traditions and texts, kept apart from historical claims.",
  },
  {
    id: "deities",
    title: "Deities",
    // Deities come from their own table in Phase 3, not from written sections, so no section kind fills this slot.
    kinds: [],
    purpose: "The deities associated with the festival, and in which traditions.",
  },
  {
    id: "traditions",
    title: "Traditions",
    kinds: ["rituals"],
    purpose: "Common practices, labelled by region or tradition and by how optional they are.",
  },
  {
    id: "food-and-fasting",
    title: "Food & fasting",
    kinds: ["food", "fasting"],
    purpose: "Customary dishes and fasting practices, qualified by tradition, never as a universal rule.",
  },
  {
    id: "how-to-celebrate",
    title: "How to celebrate",
    kinds: ["traditional_guide", "college_guide"],
    purpose: "Traditional ways to celebrate, and dorm-friendly, safe ideas for college.",
  },
  {
    id: "regional-variations",
    title: "Regional variations",
    kinds: ["regional_variation"],
    purpose: "How different communities observe the festival.",
  },
];

/** Everything the "On this page" navigation links to, in page order. */
export const SECTION_NAV: readonly { id: string; title: string }[] = [
  { id: "quick-facts", title: "Quick facts" },
  ...GUIDE_SLOTS.map(({ id, title }) => ({ id, title })),
  { id: "sources", title: "Sources & review" },
];

import type { FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * Krishna Janmashtami. Basics only so far: the name, aliases, subtitle and deity names below are
 * provisional Phase 2 wording (status "draft"), not yet editorially reviewed. No guide
 * sections, sources or dates yet; those arrive through the Phase 3 milestones.
 */
export const krishnaJanmashtami: FestivalRecord = {
  slug: "krishna-janmashtami",
  name: "Krishna Janmashtami",
  aliases: ["Janmashtami", "Gokulashtami"],
  subtitle: "A festival honoring the birth of Krishna",
  deities: ["Krishna"],
  basics: { status: "draft" },
  sections: [],
  occurrences: [],
  sources: [],
};

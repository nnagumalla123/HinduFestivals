import type { FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * Maha Shivaratri. Basics only so far: the name, aliases, subtitle and deity names below are
 * provisional Phase 2 wording (status "draft"), not yet editorially reviewed. No guide
 * sections, sources or dates yet; those arrive through the Phase 3 milestones.
 */
export const mahaShivaratri: FestivalRecord = {
  slug: "maha-shivaratri",
  name: "Maha Shivaratri",
  aliases: ["Shivaratri"],
  subtitle: "A night dedicated to Shiva",
  deities: ["Shiva", "Parvati"],
  basics: { status: "draft" },
  sections: [],
  occurrences: [],
  sources: [],
};

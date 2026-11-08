import type { FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * Ganesh Chaturthi. Basics only so far: the name, aliases, subtitle and deity names below are
 * provisional Phase 2 wording (status "draft"), not yet editorially reviewed. No guide
 * sections, sources or dates yet; those arrive through the Phase 3 milestones.
 */
export const ganeshChaturthi: FestivalRecord = {
  slug: "ganesh-chaturthi",
  name: "Ganesh Chaturthi",
  aliases: ["Vinayaka Chaturthi"],
  subtitle: "A festival honoring Ganesha",
  deities: ["Ganesha"],
  basics: { status: "draft" },
  sections: [],
  occurrences: [],
  sources: [],
};

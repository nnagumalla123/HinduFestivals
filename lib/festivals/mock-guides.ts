import type { FestivalGuide } from "./types";

/**
 * Reviewed written guide content, keyed by festival slug. EMPTY ON PURPOSE: stories,
 * customs, food, fasting, regional notes and sources arrive in Phase 3 after research and
 * editorial review. tests/festivals/guide-data.test.ts fails if anything is added early.
 */
export const mockGuides: Readonly<Record<string, FestivalGuide>> = {};

import { mockFestivals } from "./mock-data";
import { mockGuides } from "./mock-guides";
import { mockOccurrences } from "./occurrences";
import type { FestivalGuide, FestivalOccurrence, MockFestival } from "./types";

/*
 * Data-access functions. They are `async` even though the mock data is instant,
 * because the real Supabase versions in Phase 3 will be async. Keeping the same
 * signatures means pages won't need to change when the data source does.
 * (Names follow docs/ARCHITECTURE.md section 6.)
 */

export async function listPublishedFestivals(): Promise<readonly MockFestival[]> {
  return mockFestivals;
}

export async function getFestivalBySlug(slug: string): Promise<MockFestival | undefined> {
  return mockFestivals.find((festival) => festival.slug === slug);
}

/** Every occurrence recorded for a festival (the UI decides which are verified enough to show). */
export async function getOccurrencesForFestival(slug: string): Promise<readonly FestivalOccurrence[]> {
  return mockOccurrences.filter((occurrence) => occurrence.festivalSlug === slug);
}

/** Reviewed written content for a festival; an empty guide when none exists yet. */
export async function getFestivalGuide(slug: string): Promise<FestivalGuide> {
  return mockGuides[slug] ?? { sections: [], sources: [] };
}

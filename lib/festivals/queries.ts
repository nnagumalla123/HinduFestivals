import { mockFestivals } from "./mock-data";
import type { MockFestival } from "./types";

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

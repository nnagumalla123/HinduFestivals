import { FESTIVAL_RECORDS } from "@/content";
import { publishAll } from "./content/load";
import { todayInReferenceZone } from "./next-festival";
import { EMPTY_GUIDE, type Festival, type FestivalGuide, type FestivalOccurrence } from "./types";

/*
 * Data-access functions: the only place pages read festival content (names follow
 * docs/ARCHITECTURE.md section 6). They are `async` so that swapping the source later
 * (for example a database) does not change any caller.
 *
 * Content comes from typed files in /content through the fail-closed loader, which hands
 * out only reviewed sections and verified occurrences. It is rebuilt on each call (ten small
 * records, so it is cheap) because validation depends on today's date.
 */

function publicContent() {
  return publishAll(FESTIVAL_RECORDS, todayInReferenceZone(new Date()));
}

export async function listPublishedFestivals(): Promise<readonly Festival[]> {
  return publicContent().map((item) => item.festival);
}

export async function getFestivalBySlug(slug: string): Promise<Festival | undefined> {
  return publicContent().find((item) => item.festival.slug === slug)?.festival;
}

/** Every published (verified) occurrence for every festival. */
export async function listVerifiedOccurrences(): Promise<readonly FestivalOccurrence[]> {
  return publicContent().flatMap((item) => item.occurrences);
}

/** Verified occurrences for one festival (the UI still re-checks `isVerified`). */
export async function getOccurrencesForFestival(slug: string): Promise<readonly FestivalOccurrence[]> {
  return publicContent().find((item) => item.festival.slug === slug)?.occurrences ?? [];
}

/** Reviewed written content for a festival; an empty guide when none exists yet. */
export async function getFestivalGuide(slug: string): Promise<FestivalGuide> {
  return publicContent().find((item) => item.festival.slug === slug)?.guide ?? EMPTY_GUIDE;
}

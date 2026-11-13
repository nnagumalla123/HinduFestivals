"use client";

import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Festival, FestivalOccurrence } from "@/lib/festivals/types";
import { useSavedFestivals } from "@/lib/festivals/use-saved-festivals";
import { FestivalCard } from "./FestivalCard";

/** The My Festivals list. The server page passes in all published festivals; this picks the saved ones. */
export function SavedFestivals({
  festivals,
  occurrences,
}: {
  festivals: readonly Festival[];
  occurrences: readonly FestivalOccurrence[];
}) {
  const { saved, ready, persistent } = useSavedFestivals();

  if (!ready) {
    return (
      <p role="status" className="text-ink-muted">
        Loading your saved festivals…
      </p>
    );
  }

  // Unknown slugs (old or hand-edited storage) are simply not shown.
  const mine = festivals.filter((festival) => saved.includes(festival.slug));

  return (
    <>
      {!persistent && (
        <p role="alert" className="rounded-md border border-saffron bg-gold-tint px-4 py-3">
          This browser is blocking storage, so your saved festivals will be forgotten when you leave this page.
        </p>
      )}
      {mine.length === 0 ? (
        <EmptyState
          title="No saved festivals yet"
          description="Tap Save on any festival you want to keep close. It will show up here, on this device."
          action={<ButtonLink href="/explore">Explore festivals</ButtonLink>}
        />
      ) : (
        <>
          <p role="status" className="text-ink-muted">
            {mine.length} saved {mine.length === 1 ? "festival" : "festivals"}
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {mine.map((festival) => (
              <FestivalCard
                key={festival.slug}
                festival={festival}
                occurrences={occurrences.filter((o) => o.festivalSlug === festival.slug)}
                saveMode="remove"
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

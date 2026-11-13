"use client";

import { useEffect, useRef } from "react";
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
  // Where keyboard focus should go after a Remove: a festival's slug, or null for the Explore link.
  const focusAfterRemove = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const target = focusAfterRemove.current;
    if (target === undefined) return;
    focusAfterRemove.current = undefined;
    const el =
      target === null
        ? document.getElementById("my-festivals-explore-link")
        : document.querySelector<HTMLElement>(`[data-remove-slug="${CSS.escape(target)}"]`);
    el?.focus();
  }, [saved]);

  if (!ready) {
    return (
      <p role="status" className="text-ink-muted">
        Loading your saved festivals…
      </p>
    );
  }

  // Unknown slugs (old or hand-edited storage) are simply not shown.
  const mine = festivals.filter((festival) => saved.includes(festival.slug));

  // The removed card (and its focused button) disappears, which would drop focus to the page body.
  // Before it goes, pick the next Remove button, else the previous one, else the Explore link.
  const rememberFocusTarget = (event: React.MouseEvent<HTMLUListElement>) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>("[data-remove-slug]");
    if (!button) return;
    const all = [...event.currentTarget.querySelectorAll<HTMLElement>("[data-remove-slug]")];
    const i = all.indexOf(button);
    focusAfterRemove.current = (all[i + 1] ?? all[i - 1])?.dataset.removeSlug ?? null;
  };

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
          action={<ButtonLink href="/explore" id="my-festivals-explore-link">Explore festivals</ButtonLink>}
        />
      ) : (
        <>
          <p role="status" className="text-ink-muted">
            {mine.length} saved {mine.length === 1 ? "festival" : "festivals"}
          </p>
          <ul className="grid gap-4 sm:grid-cols-2" onClickCapture={rememberFocusTarget}>
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

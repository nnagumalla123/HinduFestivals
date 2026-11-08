import { FestivalCard } from "@/components/festivals/FestivalCard";
import { ButtonLink } from "@/components/ui/Button";
import type { Festival, FestivalOccurrence } from "@/lib/festivals/types";

/** A handful of the ten festivals, as a way in. The full list is on Explore. */
export function FeaturedFestivals({
  festivals,
  occurrences = [],
}: {
  festivals: readonly Festival[];
  occurrences?: readonly FestivalOccurrence[];
}) {
  return (
    <section aria-labelledby="featured-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="featured-heading" className="text-3xl font-semibold">
          Featured festivals
        </h2>
        <ButtonLink href="/explore" variant="quiet">
          See all ten festivals
        </ButtonLink>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival) => (
          <FestivalCard
            key={festival.slug}
            festival={festival}
            occurrences={occurrences.filter((o) => o.festivalSlug === festival.slug)}
            headingLevel={3}
          />
        ))}
      </ul>
    </section>
  );
}

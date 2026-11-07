import { RangoliMotif } from "@/components/ui/RangoliMotif";
import { OccurrenceDate } from "@/components/festivals/OccurrenceDate";
import { isVerified } from "@/lib/festivals/occurrences";
import type { FestivalOccurrence, MockFestival } from "@/lib/festivals/types";
import { FollowAction } from "./FollowAction";

/**
 * Typographic hero (no photo: we have no licensed imagery yet, PRD section 11).
 * Dates go through OccurrenceDate, so a date always appears with its location and year.
 * The follow action is a sign-in prompt for guests (accounts arrive in Phase 4).
 */
export function FestivalHero({
  festival,
  occurrences,
}: {
  festival: MockFestival;
  occurrences: readonly FestivalOccurrence[];
}) {
  const verified = occurrences.filter(isVerified);

  return (
    <header className="relative overflow-hidden rounded-xl border border-gold/60 bg-gradient-to-br from-gold-tint to-ivory-soft px-6 py-8 sm:px-10 sm:py-12">
      <RangoliMotif className="-right-16 -top-16 size-56 sm:-right-10 sm:-top-10 sm:size-72" />
      <div className="relative flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-saffron-deep">Festival guide</p>
        <h1 className="text-4xl font-semibold sm:text-6xl">{festival.name}</h1>
        <div aria-hidden="true" className="h-0.5 w-16 rounded-full bg-gold" />
        <p className="max-w-prose text-xl text-ink-muted">{festival.subtitle}</p>
        {festival.aliases.length > 0 && (
          <p className="text-ink-muted">Also known as {festival.aliases.join(", ")}</p>
        )}
        <div role="group" aria-label="Festival date" className="mt-2 flex flex-col gap-1">
          {verified.length > 0 ? (
            verified.map((occurrence) => (
              <OccurrenceDate key={occurrence.startDate + occurrence.locationLabel} occurrence={occurrence} />
            ))
          ) : (
            <div>
              <OccurrenceDate />
            </div>
          )}
        </div>
        <FollowAction slug={festival.slug} name={festival.name} />
      </div>
    </header>
  );
}

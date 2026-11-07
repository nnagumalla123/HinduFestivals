import Link from "next/link";
import { OccurrenceDate } from "@/components/festivals/OccurrenceDate";
import { Card } from "@/components/ui/Card";
import { usableEntries, type CalendarEntry } from "@/lib/festivals/calendar";
import { countdownLabel, selectNextFestival } from "@/lib/festivals/next-festival";

/**
 * The "next festival" block. It only ever uses verified occurrences, and says so honestly when
 * there are none (today) or none left to come. `today` is passed in so this stays testable.
 * The date always goes through OccurrenceDate, so it carries its reference location and year.
 */
export function NextFestival({ entries, today }: { entries: readonly CalendarEntry[]; today: string }) {
  const next = selectNextFestival(entries, today);
  const hasAnyDates = usableEntries(entries).length > 0;

  return (
    <section aria-labelledby="next-festival-heading" className="flex flex-col gap-4">
      <h2 id="next-festival-heading" className="text-3xl font-semibold">
        Next festival
      </h2>
      {next ? (
        <Card className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">
            <Link href={`/festivals/${next.entry.slug}`} className="hover:underline">
              {next.entry.name}
            </Link>
          </h3>
          <OccurrenceDate occurrence={next.entry.occurrence} />
          <p className="text-lg font-semibold text-maroon">{countdownLabel(next)}</p>
        </Card>
      ) : (
        <Card className="flex flex-col gap-1 p-4 sm:p-4">
          <h3 className="text-xl font-semibold">
            {hasAnyDates ? "No more verified dates this year" : "No verified dates yet"}
          </h3>
          <p className="text-ink-muted">
            {hasAnyDates
              ? "Every verified festival date on the calendar has passed."
              : "A countdown appears here once a festival date has been verified against a reliable calendar source. Nothing is guessed."}
          </p>
        </Card>
      )}
    </section>
  );
}

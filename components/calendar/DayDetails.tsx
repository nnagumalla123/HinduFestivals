import Link from "next/link";
import { OccurrenceDate } from "@/components/festivals/OccurrenceDate";
import { Card } from "@/components/ui/Card";
import type { CalendarEntry } from "@/lib/festivals/calendar";
import { formatCivilDay, keyDaysOn } from "@/lib/festivals/occurrences";
import { DAY_DETAILS_ID } from "./MonthGrid";

/** The festivals on the day picked in the grid. Every date shown here carries its location and year. */
export function DayDetails({ day, entries }: { day: string; entries: readonly CalendarEntry[] }) {
  return (
    <section id={DAY_DETAILS_ID} aria-labelledby="day-details-heading" className="scroll-mt-24">
      <h3 id="day-details-heading" className="mb-3 text-2xl font-semibold">
        {formatCivilDay(day)}
      </h3>
      {entries.length === 0 ? (
        <p className="text-ink-muted">No verified festival dates on this day.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry) => (
            <Card as="li" key={entry.slug + entry.occurrence.startDate + (entry.occurrence.traditionLabel ?? "")} className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold">
                <Link href={`/festivals/${entry.slug}`} className="hover:underline">
                  {entry.name}
                </Link>
              </h4>
              <OccurrenceDate occurrence={entry.occurrence} />
              {keyDaysOn(entry.occurrence, day).map((keyDay) => (
                <p key={keyDay.label} className="text-sm font-semibold text-maroon">
                  On this day: {keyDay.label}
                  {keyDay.main ? " (main day)" : ""}
                </p>
              ))}
            </Card>
          ))}
        </ul>
      )}
    </section>
  );
}

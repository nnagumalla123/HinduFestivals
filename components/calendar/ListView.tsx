import Link from "next/link";
import { OccurrenceDate } from "@/components/festivals/OccurrenceDate";
import { Card } from "@/components/ui/Card";
import type { CalendarEntry } from "@/lib/festivals/calendar";

/** The month as a plain list, earliest first. The caller sorts and filters the entries. */
export function ListView({ entries }: { entries: readonly CalendarEntry[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {entries.map((entry) => (
        <Card as="li" key={entry.slug + entry.occurrence.startDate} className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">
            <Link href={`/festivals/${entry.slug}`} className="hover:underline">
              {entry.name}
            </Link>
          </h3>
          <OccurrenceDate occurrence={entry.occurrence} />
        </Card>
      ))}
    </ol>
  );
}

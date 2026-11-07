import { formatCivilDay, isVerified } from "@/lib/festivals/occurrences";
import type { FestivalOccurrence } from "@/lib/festivals/types";
import { DateNotVerified } from "./DateNotVerified";

/**
 * The ONLY way a festival date should appear on the site. It always prints the date
 * together with its reference location and year (PRD section 7), and falls back to
 * "Date not yet verified" for anything that is missing, unverified, disputed or malformed.
 */
export function OccurrenceDate({ occurrence }: { occurrence?: FestivalOccurrence }) {
  if (!occurrence || !isVerified(occurrence)) return <DateNotVerified />;

  const start = formatCivilDay(occurrence.startDate);
  const end = formatCivilDay(occurrence.endDate);
  if (!start || !end) return <DateNotVerified />;

  const multiDay = occurrence.endDate !== occurrence.startDate;

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 font-semibold text-green">
      <span>
        <time dateTime={occurrence.startDate}>{start}</time>
        {multiDay && (
          <>
            {" – "}
            <time dateTime={occurrence.endDate}>{end}</time>
          </>
        )}
      </span>
      <span className="text-sm font-normal text-ink-muted">
        {occurrence.locationLabel} · {occurrence.year}
      </span>
    </p>
  );
}

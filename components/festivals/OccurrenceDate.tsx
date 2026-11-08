import { formatCivilDay, isVerified, validKeyDays } from "@/lib/festivals/occurrences";
import type { FestivalOccurrence } from "@/lib/festivals/types";
import { DateNotVerified } from "./DateNotVerified";

/**
 * The ONLY way a festival date should appear on the site. It always prints the date
 * together with its reference location and year (PRD section 7), and falls back to
 * "Date not yet verified" for anything that is missing, unverified, disputed or malformed.
 *
 * A tradition-specific observance names its tradition beside the date, so two different dates for one
 * festival are never mistaken for each other. `showKeyDays` adds the labelled days of a multi-day
 * observance (for example its main puja day).
 */
export function OccurrenceDate({
  occurrence,
  showKeyDays = false,
}: {
  occurrence?: FestivalOccurrence;
  showKeyDays?: boolean;
}) {
  if (!occurrence || !isVerified(occurrence)) return <DateNotVerified />;

  const start = formatCivilDay(occurrence.startDate);
  const end = formatCivilDay(occurrence.endDate);
  if (!start || !end) return <DateNotVerified />;

  const multiDay = occurrence.endDate !== occurrence.startDate;
  const keyDays = showKeyDays ? validKeyDays(occurrence) : [];

  const line = (
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
      {occurrence.traditionLabel && (
        <span className="text-sm font-semibold text-saffron-deep">{occurrence.traditionLabel}</span>
      )}
    </p>
  );

  if (keyDays.length === 0) return line;

  return (
    <div className="flex flex-col gap-1">
      {line}
      <ul className="flex flex-col gap-0.5 text-sm text-ink-muted">
        {keyDays.map((day) => (
          <li key={day.date + day.label}>
            <span className={day.main ? "font-semibold text-maroon" : "font-semibold"}>{day.label}</span>
            {day.main && <span className="font-semibold text-maroon"> (main day)</span>}
            {": "}
            <time dateTime={day.date}>{formatCivilDay(day.date)}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

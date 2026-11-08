import Link from "next/link";
import {
  buildMonthGrid,
  calendarHref,
  entriesByDay,
  entryLabel,
  MONTH_NAMES,
  monthLabel,
  type CalendarEntry,
  type YearMonth,
} from "@/lib/festivals/calendar";
import { cn } from "@/lib/utils/cn";

const WEEKDAYS = [
  ["Sun", "Sunday"], ["Mon", "Monday"], ["Tue", "Tuesday"], ["Wed", "Wednesday"],
  ["Thu", "Thursday"], ["Fri", "Friday"], ["Sat", "Saturday"],
] as const;

export const DAY_DETAILS_ID = "day-details";

/**
 * A real <table> (rows = weeks), so screen readers announce weekday and date for each cell.
 * Only days that have a verified festival are links; the rest are plain text, so keyboard
 * users don't have to Tab through 30 empty days. Mobile cells show dots; wider screens show names.
 */
export function MonthGrid({
  month,
  entries,
  selectedDay,
}: {
  month: YearMonth;
  entries: readonly CalendarEntry[];
  selectedDay: string | null;
}) {
  const byDay = entriesByDay(entries, month);

  return (
    <table className="w-full table-fixed border-separate border-spacing-0.5 sm:border-spacing-1">
      <caption className="sr-only">
        {monthLabel(month)}. Days with a verified festival date are links that show the festival.
      </caption>
      <thead>
        <tr>
          {WEEKDAYS.map(([short, full]) => (
            <th key={full} scope="col" abbr={full} className="pb-1 text-center text-sm font-semibold text-ink-muted">
              {short}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {buildMonthGrid(month).map((week, row) => (
          <tr key={row}>
            {week.map((day, col) => {
              if (!day) return <td key={col} />;
              const dayNumber = Number(day.slice(8));
              const dayEntries = byDay.get(day) ?? [];
              const selected = day === selectedDay;
              const cell = "block min-h-14 p-1.5 text-left sm:min-h-24";

              return (
                <td
                  key={col}
                  className={cn(
                    "overflow-hidden rounded-md border",
                    selected ? "border-maroon bg-gold-tint" : "border-gold/40 bg-ivory-soft",
                  )}
                >
                  {dayEntries.length > 0 ? (
                    <Link
                      href={`${calendarHref({ view: "grid", month, day })}#${DAY_DETAILS_ID}`}
                      aria-current={selected ? "true" : undefined}
                      aria-label={`${MONTH_NAMES[month.month - 1]} ${dayNumber}, ${month.year}: ${dayEntries.map(entryLabel).join(", ")}`}
                      className={cn(cell, "hover:bg-gold-tint")}
                    >
                      <span className="font-semibold text-maroon">{dayNumber}</span>
                      <span aria-hidden="true" className="mt-1 flex gap-1 sm:hidden">
                        {dayEntries.slice(0, 3).map((e) => (
                          <span key={e.slug + e.occurrence.startDate + (e.occurrence.traditionLabel ?? "")} className="size-2 rounded-full bg-green" />
                        ))}
                      </span>
                      <span aria-hidden="true" className="mt-1 hidden flex-col gap-0.5 sm:flex">
                        {dayEntries.slice(0, 2).map((e) => (
                          <span
                            key={e.slug + e.occurrence.startDate + (e.occurrence.traditionLabel ?? "")}
                            className="truncate rounded-sm bg-green px-1 text-xs font-semibold text-ivory"
                          >
                            {entryLabel(e)}
                          </span>
                        ))}
                        {dayEntries.length > 2 && (
                          <span className="text-xs font-semibold text-green">+{dayEntries.length - 2} more</span>
                        )}
                      </span>
                    </Link>
                  ) : (
                    <span className={cn(cell, "text-ink-muted")}>{dayNumber}</span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

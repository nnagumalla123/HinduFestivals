import {
  entriesByDay,
  entriesInMonth,
  monthLabel,
  usableEntries,
  type CalendarEntry,
  type CalendarView as View,
  type YearMonth,
} from "@/lib/festivals/calendar";
import { Card } from "@/components/ui/Card";
import { DayDetails } from "./DayDetails";
import { ListView } from "./ListView";
import { MonthGrid } from "./MonthGrid";
import { MonthNav } from "./MonthNav";
import { ViewToggle } from "./ViewToggle";

/**
 * Everything on the calendar page below its heading. It receives already-parsed URL state
 * and the entries as props (no data loading here), so tests can render it with synthetic dates.
 *
 * The two views are mutually exclusive: the grid view shows only the grid (and the selected
 * day), the list view shows only the month's list. Festival guides live on Explore.
 */
export function CalendarView({
  view,
  month,
  day,
  entries,
}: {
  view: View;
  month: YearMonth;
  day: string | null;
  entries: readonly CalendarEntry[];
}) {
  const inMonth = entriesInMonth(entries, month);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MonthNav view={view} month={month} />
        <ViewToggle view={view} month={month} day={day} />
      </div>

      {/* The empty-state message, shared by both views: why there is nothing to show. */}
      {usableEntries(entries).length === 0 ? (
        <Card className="flex flex-col gap-1 p-4 sm:p-4">
          <h2 className="text-xl font-semibold">No verified dates yet</h2>
          <p className="text-ink-muted">
            Festival dates follow the lunar calendar and vary by location, so we show one only after checking it
            against a reliable calendar source for this location. Until then, each festival says &ldquo;Date not yet
            verified&rdquo;.
          </p>
        </Card>
      ) : (
        inMonth.length === 0 && (
          <p className="text-ink-muted">There are no verified festival dates in {monthLabel(month)}.</p>
        )
      )}

      {view === "grid" ? (
        <>
          <MonthGrid month={month} entries={entries} selectedDay={day} />
          {day && <DayDetails day={day} entries={entriesByDay(entries, month).get(day) ?? []} />}
        </>
      ) : (
        inMonth.length > 0 && <ListView entries={inMonth} />
      )}
    </>
  );
}

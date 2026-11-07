import { ButtonLink } from "@/components/ui/Button";
import { calendarHref, monthLabel, shiftMonth, type CalendarView, type YearMonth } from "@/lib/festivals/calendar";

/** Previous / next month. At the edges of the calendar year the button is shown but inactive. */
export function MonthNav({ view, month }: { view: CalendarView; month: YearMonth }) {
  const previous = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);

  return (
    <nav aria-label="Month" className="flex items-center gap-2 sm:gap-4">
      {previous ? (
        <ButtonLink
          href={calendarHref({ view, month: previous })}
          variant="secondary"
          className="px-3 sm:px-5"
          aria-label={`Previous month, ${monthLabel(previous)}`}
        >
          <span aria-hidden="true">‹ </span>Prev
        </ButtonLink>
      ) : (
        <DisabledStep>
          <span aria-hidden="true">‹ </span>Prev
        </DisabledStep>
      )}
      <h2 className="min-w-0 flex-1 text-center text-xl font-semibold sm:flex-none sm:text-3xl">{monthLabel(month)}</h2>
      {next ? (
        <ButtonLink
          href={calendarHref({ view, month: next })}
          variant="secondary"
          className="px-3 sm:px-5"
          aria-label={`Next month, ${monthLabel(next)}`}
        >
          Next<span aria-hidden="true"> ›</span>
        </ButtonLink>
      ) : (
        <DisabledStep>
          Next<span aria-hidden="true"> ›</span>
        </DisabledStep>
      )}
    </nav>
  );
}

function DisabledStep({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-disabled="true"
      className="inline-flex min-h-11 items-center rounded-md border border-ink-muted/40 px-3 font-semibold text-ink-muted/70 sm:px-5"
    >
      {children}
    </span>
  );
}

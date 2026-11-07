import Link from "next/link";
import { calendarHref, type CalendarView, type YearMonth } from "@/lib/festivals/calendar";
import { cn } from "@/lib/utils/cn";

const OPTIONS: { view: CalendarView; label: string }[] = [
  { view: "grid", label: "Month grid" },
  { view: "list", label: "List" },
];

/** Switches between grid and list. Plain links, so the choice lives in the URL and Back works. */
export function ViewToggle({ view, month, day }: { view: CalendarView; month: YearMonth; day: string | null }) {
  return (
    <nav aria-label="Calendar view">
      <ul className="inline-flex overflow-hidden rounded-md border border-maroon">
        {OPTIONS.map((option) => {
          const active = option.view === view;
          return (
            <li key={option.view}>
              <Link
                href={calendarHref({ view: option.view, month, day })}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center px-4 font-semibold",
                  active ? "bg-maroon text-ivory" : "text-maroon hover:bg-gold-tint",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

import type { Metadata } from "next";
import { CalendarView } from "@/components/calendar/CalendarView";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildEntries, parseDay, parseMonth, parseView } from "@/lib/festivals/calendar";
import { REFERENCE_CALENDAR } from "@/lib/festivals/constants";
import { mockOccurrences } from "@/lib/festivals/occurrences";
import { listPublishedFestivals } from "@/lib/festivals/queries";

export const metadata: Metadata = { title: "Calendar" };

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

/** ?view=list&month=2027-03&day=2027-03-05. Each value is validated; bad input falls back to a default. */
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function CalendarPage({ searchParams }: Props) {
  const params = await searchParams;
  const view = parseView(first(params.view));
  const month = parseMonth(first(params.month));
  const day = parseDay(first(params.day), month);

  const festivals = await listPublishedFestivals();
  const entries = buildEntries(mockOccurrences, festivals);

  return (
    <PageContainer>
      <SectionHeading
        level={1}
        title="Festival calendar"
        // Shown right under the heading, on this page only. Kept on one line at every width.
        description={`Reference calendar: ${REFERENCE_CALENDAR.label} · ${REFERENCE_CALENDAR.year}`}
        descriptionClassName="whitespace-nowrap text-[0.9375rem] min-[360px]:text-base sm:text-lg"
      />
      <CalendarView view={view} month={month} day={day} entries={entries} />
    </PageContainer>
  );
}

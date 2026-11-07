import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REFERENCE_CALENDAR } from "@/lib/festivals/constants";

export const metadata: Metadata = { title: "Calendar" };

// Placeholder. The month/list views, navigation and filters come in Phase 2.
export default function CalendarPage() {
  return (
    <PageContainer>
      <SectionHeading
        level={1}
        title="Festival calendar"
        // Shown right under the heading, and only on this page.
        description={`Reference calendar: ${REFERENCE_CALENDAR.label} · ${REFERENCE_CALENDAR.year}. Dates apply to this location and can differ elsewhere.`}
      />
      <EmptyState
        title="No verified dates yet"
        description="Only dates that have been checked against a reliable source will appear here. Nothing is guessed."
        action={
          <ButtonLink href="/explore" variant="secondary">
            Explore festivals
          </ButtonLink>
        }
      />
    </PageContainer>
  );
}

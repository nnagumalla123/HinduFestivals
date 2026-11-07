import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Settings" };

// Placeholder. Signed-in settings (regions, time zone, reminders, account) arrive in Phase 4.
export default function SettingsPage() {
  return (
    <PageContainer className="max-w-2xl">
      <SectionHeading
        level={1}
        title="Settings"
        description="Your regions, time zone, followed festivals, and reminder choices."
      />
      <EmptyState
        title="Settings are coming soon"
        description="Once accounts exist, you will manage your preferences and email reminders here."
        action={
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        }
      />
    </PageContainer>
  );
}

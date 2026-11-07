import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Welcome" };

// Placeholder. Signed-in onboarding (regions, time zone, follows) arrives in Phase 4.
export default function OnboardingPage() {
  return (
    <PageContainer className="max-w-2xl">
      <SectionHeading
        level={1}
        title="Welcome"
        description="A few optional questions will help personalize your experience."
      />
      <EmptyState
        title="Personalization is coming soon"
        description="You will be able to pick regions you are interested in, set your time zone, and choose which festivals to follow. Choosing a region will never follow festivals for you."
        action={
          <ButtonLink href="/explore" variant="secondary">
            Explore festivals
          </ButtonLink>
        }
      />
    </PageContainer>
  );
}

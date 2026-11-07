import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Create an account" };

// Placeholder. Sign-up with email verification arrives in Phase 4.
export default function SignupPage() {
  return (
    <PageContainer className="max-w-2xl">
      <SectionHeading level={1} title="Create an account" />
      <EmptyState
        title="Sign-up is coming soon"
        description="Soon you will be able to follow festivals and choose reminders. Reminders will always be opt-in, and nothing is followed automatically."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/explore">Explore festivals</ButtonLink>
            <ButtonLink href="/login" variant="quiet">
              I already have an account
            </ButtonLink>
          </div>
        }
      />
    </PageContainer>
  );
}

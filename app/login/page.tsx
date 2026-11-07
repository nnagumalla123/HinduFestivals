import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Sign in" };

// Placeholder. Real email/password sign-in arrives in Phase 4.
export default function LoginPage() {
  return (
    <PageContainer className="max-w-2xl">
      <SectionHeading level={1} title="Sign in" />
      <EmptyState
        title="Accounts are coming soon"
        description="You do not need an account to read about festivals. Accounts will add following, preferences, and optional email reminders."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/explore">Explore festivals</ButtonLink>
            <ButtonLink href="/signup" variant="quiet">
              Create an account
            </ButtonLink>
          </div>
        }
      />
    </PageContainer>
  );
}

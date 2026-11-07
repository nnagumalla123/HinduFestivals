import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "My Festivals" };

// Placeholder. Following festivals needs accounts (Phase 4). Reading never does.
export default function MyFestivalsPage() {
  return (
    <PageContainer>
      <SectionHeading
        level={1}
        title="My Festivals"
        description="The festivals you follow, and when they are coming up."
      />
      <EmptyState
        title="Sign in to follow festivals"
        description="Everything on this site is free to read without an account. Signing in will let you follow festivals and, if you choose, get email reminders."
        action={<ButtonLink href="/login">Sign in</ButtonLink>}
      />
    </PageContainer>
  );
}

import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

// Shown when /festivals/<unknown-slug> calls notFound(). More specific than app/not-found.tsx.
export default function FestivalNotFound() {
  return (
    <PageContainer className="max-w-2xl">
      <EmptyState
        headingLevel={1}
        title="Festival not found"
        description="We do not have a guide for that festival, or the link may be mistyped."
        action={<ButtonLink href="/explore">Explore all festivals</ButtonLink>}
      />
    </PageContainer>
  );
}

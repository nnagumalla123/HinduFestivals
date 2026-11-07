import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

// Used for any URL that doesn't exist (a real 404).
export default function NotFound() {
  return (
    <PageContainer className="max-w-2xl">
      <EmptyState
        headingLevel={1}
        title="Page not found"
        description="We could not find the page you were looking for."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/explore" variant="secondary">
              Explore festivals
            </ButtonLink>
          </div>
        }
      />
    </PageContainer>
  );
}

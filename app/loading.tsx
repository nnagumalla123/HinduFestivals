import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingState } from "@/components/ui/LoadingState";

// Next.js shows this automatically while a page is loading its data.
export default function Loading() {
  return (
    <PageContainer>
      <LoadingState label="Loading…" />
    </PageContainer>
  );
}

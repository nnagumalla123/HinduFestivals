"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

// Shown when something unexpected breaks while rendering a page. In this Next.js
// version the recovery function is called `retry` (it re-fetches and re-renders).
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Log the technical details for developers. The visitor only sees the friendly message.
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="max-w-2xl">
      <EmptyState
        headingLevel={1}
        title="Something went wrong"
        description="We could not load this page. You can try again, or head back home."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => retry()}>Try again</Button>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        }
      />
    </PageContainer>
  );
}

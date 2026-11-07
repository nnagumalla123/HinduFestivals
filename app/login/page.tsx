import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { safeReturnPath } from "@/lib/utils/return-path";

export const metadata: Metadata = { title: "Sign in" };

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

// Placeholder. Real email/password sign-in arrives in Phase 4. For now the page only keeps the
// validated `next` value (where the visitor came from) so Phase 4 can send them back after sign-in.
export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const returnTo = safeReturnPath(Array.isArray(next) ? next[0] : next);
  const cameFromSomewhere = returnTo !== "/";
  // Carry the (already validated) value over to the sign-up page too.
  const signupHref = cameFromSomewhere ? `/signup?next=${encodeURIComponent(returnTo)}` : "/signup";

  return (
    <PageContainer className="max-w-2xl">
      <SectionHeading level={1} title="Sign in" />
      <EmptyState
        title="Accounts are coming soon"
        description={
          cameFromSomewhere
            ? "Following festivals needs an account, and accounts are not available yet, so nothing has been followed. You do not need an account to read about festivals."
            : "You do not need an account to read about festivals. Accounts will add following, preferences, and optional email reminders."
        }
        action={
          <div className="flex flex-wrap justify-center gap-3">
            {cameFromSomewhere ? (
              <ButtonLink href={returnTo}>Go back to where you were</ButtonLink>
            ) : (
              <ButtonLink href="/explore">Explore festivals</ButtonLink>
            )}
            <ButtonLink href={signupHref} variant="quiet">
              Create an account
            </ButtonLink>
          </div>
        }
      />
    </PageContainer>
  );
}

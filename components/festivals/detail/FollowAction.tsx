import { ButtonLink } from "@/components/ui/Button";
import { signInHref } from "@/lib/utils/return-path";

/**
 * Guest follow prompt. Accounts do not exist yet (Phase 4), so this is a link to the sign-in
 * page that remembers this festival's page as the place to come back to. It never claims the
 * festival was followed, and it says plainly that reminders are not available yet.
 */
export function FollowAction({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div>
        <ButtonLink href={signInHref(`/festivals/${slug}`)} aria-label={`Follow ${name}: sign in required`}>
          Follow
        </ButtonLink>
      </div>
      <p className="max-w-prose text-sm text-ink-muted">
        You will be asked to sign in first. Email reminders are not available yet.
      </p>
    </div>
  );
}

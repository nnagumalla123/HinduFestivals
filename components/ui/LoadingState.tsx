import { cn } from "@/lib/utils/cn";

export interface LoadingStateProps {
  /** Text shown (and announced to screen readers) while loading. */
  label?: string;
  className?: string;
}

/** A calm "please wait" message. The pulse is disabled for users who prefer reduced motion. */
export function LoadingState({ label = "Loading…", className }: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn("flex items-center justify-center gap-3 py-10 text-ink-muted", className)}
    >
      <span
        aria-hidden="true"
        className="size-3 rounded-full bg-saffron motion-safe:animate-pulse"
      />
      <span>{label}</span>
    </div>
  );
}

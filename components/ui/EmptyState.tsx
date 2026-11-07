import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** Optional next step, e.g. a <Button>. */
  action?: ReactNode;
  /** Heading level to fit the surrounding page outline. Use 1 when this is the whole page (404, error). */
  headingLevel?: 1 | 2 | 3;
  className?: string;
}

/** Shown when there is nothing to display yet (no results, no verified date, signed-out, etc.). */
export function EmptyState({
  title,
  description,
  action,
  headingLevel = 2,
  className,
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed border-gold bg-ivory-soft px-6 py-10 text-center",
        className,
      )}
    >
      <Heading className="text-2xl font-semibold">{title}</Heading>
      {description && <p className="max-w-prose text-ink-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

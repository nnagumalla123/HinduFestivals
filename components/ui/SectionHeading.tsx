import { cn } from "@/lib/utils/cn";

export interface SectionHeadingProps {
  title: string;
  /** Small label above the title, e.g. "Upcoming". */
  eyebrow?: string;
  /** One-sentence intro under the title. */
  description?: string;
  /** Which heading tag to use. Pick by page outline, not by size: one h1 per page. */
  level?: 1 | 2 | 3;
  className?: string;
  /** Extra classes for the description line (e.g. to keep a short label on one line). */
  descriptionClassName?: string;
}

const sizes = {
  1: "text-4xl sm:text-5xl",
  2: "text-3xl sm:text-4xl",
  3: "text-2xl",
} as const;

export function SectionHeading({
  title,
  eyebrow,
  description,
  level = 2,
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  const Heading = `h${level}` as const;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-saffron-deep">
          {eyebrow}
        </p>
      )}
      <Heading className={cn("font-semibold", sizes[level])}>{title}</Heading>
      {/* Subtle gold rule: purely decorative, hidden from screen readers. */}
      <div aria-hidden="true" className="h-0.5 w-16 rounded-full bg-gold" />
      {description && (
        <p className={cn("max-w-prose text-lg text-ink-muted", descriptionClassName)}>{description}</p>
      )}
    </div>
  );
}

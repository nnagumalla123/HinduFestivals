import { NotAvailable } from "./NotAvailable";

export const QUICK_FACT_LABELS = [
  "Meaning",
  "Length of observance",
  "Associated deities",
  "Common customs",
  "Dietary practices",
] as const;

export type QuickFactLabel = (typeof QUICK_FACT_LABELS)[number];

/** At-a-glance facts. Any fact without reviewed content says "Not yet available" instead of guessing. */
export function QuickFacts({ facts = {} }: { facts?: Partial<Record<QuickFactLabel, string>> }) {
  return (
    <section id="quick-facts" aria-labelledby="quick-facts-heading" className="scroll-mt-24">
      <h2 id="quick-facts-heading" className="mb-4 text-2xl font-semibold sm:text-3xl">
        Quick facts
      </h2>
      <dl className="grid gap-x-8 gap-y-4 rounded-lg border border-gold/60 bg-ivory-soft p-5 sm:grid-cols-2 sm:p-6">
        {QUICK_FACT_LABELS.map((label) => (
          <div key={label}>
            <dt className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
            <dd className="mt-0.5">{facts[label] ?? <NotAvailable />}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

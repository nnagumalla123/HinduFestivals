import { QUICK_FACT_LABELS, QUICK_FACT_SLOTS, type FestivalSource, type PublicQuickFact, type QuickFactLabel } from "@/lib/festivals/types";
import { Citations } from "./Citations";
import { NotAvailable } from "./NotAvailable";

export { QUICK_FACT_LABELS, QUICK_FACT_SLOTS };
export type { QuickFactLabel } from "@/lib/festivals/types";

/**
 * At-a-glance facts. Any fact without a reviewed entry says "Not yet available" instead of guessing.
 * A fact that belongs to one tradition says so, and cites its sources.
 */
export function QuickFacts({
  facts = [],
  sources = [],
  hideEmpty = false,
}: {
  facts?: readonly PublicQuickFact[];
  sources?: readonly FestivalSource[];
  /** On a fully reviewed guide, a fact that was never written is left out instead of shown as a placeholder. */
  hideEmpty?: boolean;
}) {
  // Normally an empty slot still renders, under its first label, so the page is honest about what is missing.
  const rows: { label: QuickFactLabel; fact?: PublicQuickFact }[] = QUICK_FACT_SLOTS.flatMap((slot) => {
    const found = facts.filter((f) => slot.includes(f.label));
    if (found.length > 0) return found.map((fact) => ({ label: fact.label, fact }));
    return hideEmpty ? [] : [{ label: slot[0] }];
  });

  return (
    <section id="quick-facts" aria-labelledby="quick-facts-heading" className="scroll-mt-24">
      <h2 id="quick-facts-heading" className="mb-4 text-2xl font-semibold sm:text-3xl">
        Quick facts
      </h2>
      <dl className="grid gap-x-8 gap-y-4 rounded-lg border border-gold/60 bg-ivory-soft p-5 sm:grid-cols-2 sm:p-6">
        {rows.map(({ label, fact }) => {
          return (
            <div key={label} className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
              <dd className="flex flex-col gap-1">
                {fact ? (
                  <>
                    <span>{fact.text}</span>
                    {fact.tradition && <span className="text-sm font-semibold text-saffron-deep">{fact.tradition}</span>}
                    <Citations ids={fact.sourceIds} sources={sources} />
                  </>
                ) : (
                  <NotAvailable />
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

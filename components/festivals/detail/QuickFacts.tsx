import { QUICK_FACT_LABELS, type FestivalSource, type PublicQuickFact } from "@/lib/festivals/types";
import { Citations } from "./Citations";
import { NotAvailable } from "./NotAvailable";

export { QUICK_FACT_LABELS };
export type { QuickFactLabel } from "@/lib/festivals/types";

/**
 * At-a-glance facts. Any fact without a reviewed entry says "Not yet available" instead of guessing.
 * A fact that belongs to one tradition says so, and cites its sources.
 */
export function QuickFacts({
  facts = [],
  sources = [],
}: {
  facts?: readonly PublicQuickFact[];
  sources?: readonly FestivalSource[];
}) {
  return (
    <section id="quick-facts" aria-labelledby="quick-facts-heading" className="scroll-mt-24">
      <h2 id="quick-facts-heading" className="mb-4 text-2xl font-semibold sm:text-3xl">
        Quick facts
      </h2>
      <dl className="grid gap-x-8 gap-y-4 rounded-lg border border-gold/60 bg-ivory-soft p-5 sm:grid-cols-2 sm:p-6">
        {QUICK_FACT_LABELS.map((label) => {
          const fact = facts.find((f) => f.label === label);
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

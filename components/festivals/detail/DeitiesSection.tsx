import { formatCivilDate } from "@/lib/festivals/occurrences";
import type { GuideSlot } from "@/lib/festivals/guide";
import type { FestivalSource, PublicDeity } from "@/lib/festivals/types";
import { Citations } from "./Citations";
import { NotAvailable } from "./NotAvailable";

/**
 * The "Deities" section. Every association names the tradition that makes it, so none reads as
 * universal. Shows the honest placeholder until a reviewed deity entry exists.
 */
export function DeitiesSection({
  slot,
  deities,
  sources,
}: {
  slot: GuideSlot;
  deities: readonly PublicDeity[];
  sources: readonly FestivalSource[];
}) {
  const lastReviewed = deities.length > 0 ? formatCivilDate([...deities.map((d) => d.reviewedAt)].sort().at(-1)!) : null;

  return (
    <section id={slot.id} aria-labelledby={`${slot.id}-heading`} className="scroll-mt-24">
      <h2 id={`${slot.id}-heading`} className="mb-3 text-2xl font-semibold sm:text-3xl">
        {slot.title}
      </h2>
      {deities.length === 0 ? (
        <NotAvailable purpose={slot.purpose} />
      ) : (
        <div className="flex flex-col gap-3">
          <ul className="grid gap-4 sm:grid-cols-2">
            {deities.map((deity) => (
              <li key={deity.name} className="flex flex-col gap-1.5 rounded-lg border border-gold/60 bg-ivory-soft p-4">
                <h3 className="text-xl font-semibold">{deity.name}</h3>
                <p className="text-sm font-semibold text-saffron-deep">Tradition: {deity.tradition}</p>
                <p>{deity.role}</p>
                <Citations ids={deity.sourceIds} sources={sources} />
              </li>
            ))}
          </ul>
          {lastReviewed && <p className="text-sm text-ink-muted">Reviewed {lastReviewed}</p>}
        </div>
      )}
    </section>
  );
}

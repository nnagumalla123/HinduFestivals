import { formatCivilDate } from "@/lib/festivals/occurrences";
import type { GuideSlot } from "@/lib/festivals/guide";
import type { FestivalSource, GuideSection } from "@/lib/festivals/types";
import { Citations } from "./Citations";
import { NotAvailable } from "./NotAvailable";

type PublishedSection = Extract<GuideSection, { status: "published" }>;

function Body({ text }: { text: string }) {
  // Plain text only: paragraphs split on blank lines. React escapes the text, so content can never inject HTML.
  return (
    <div className="flex max-w-prose flex-col gap-3">
      {text.split(/\n{2,}/).map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

function Meta({ section }: { section: PublishedSection }) {
  const reviewed = formatCivilDate(section.reviewedAt);
  return (
    <>
      {section.tradition && (
        <p className="text-sm font-semibold text-saffron-deep">Tradition: {section.tradition}</p>
      )}
      {reviewed && <p className="text-sm text-ink-muted">Reviewed {reviewed}</p>}
    </>
  );
}

/**
 * One section of the guide. Shows reviewed content when there is some, otherwise the honest
 * placeholder. Stories are expandable (native <details>: keyboard accessible with no JavaScript).
 */
export function GuideSlotSection({
  slot,
  sections,
  sources = [],
}: {
  slot: GuideSlot;
  sections: readonly GuideSection[];
  sources?: readonly FestivalSource[];
}) {
  const published = sections.filter(
    (s): s is PublishedSection => s.status === "published" && slot.kinds.includes(s.kind),
  );

  return (
    <section id={slot.id} aria-labelledby={`${slot.id}-heading`} className="scroll-mt-24">
      <h2 id={`${slot.id}-heading`} className="mb-3 text-2xl font-semibold sm:text-3xl">
        {slot.title}
      </h2>
      {published.length === 0 ? (
        <NotAvailable purpose={slot.purpose} />
      ) : (
        <div className="flex flex-col gap-4">
          {published.map((section) =>
            section.kind === "story" ? (
              <details key={section.title} className="rounded-lg border border-gold/60 bg-ivory-soft p-4">
                <summary className="min-h-8 cursor-pointer text-xl font-semibold text-maroon">
                  {section.title}
                </summary>
                <div className="mt-3 flex flex-col gap-3">
                  <Meta section={section} />
                  <Body text={section.body} />
                  <Citations ids={section.sourceIds} sources={sources} />
                </div>
              </details>
            ) : (
              <article key={section.title} className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <Meta section={section} />
                <Body text={section.body} />
                <Citations ids={section.sourceIds} sources={sources} />
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}

import { formatCivilDate } from "@/lib/festivals/occurrences";
import type { FestivalSource, GuideSection, PublicDeity, PublicQuickFact, SourceRole } from "@/lib/festivals/types";
import { isHttpUrl } from "@/lib/utils/url";

const GROUPS: { role: SourceRole; title: string; empty: string }[] = [
  { role: "date", title: "Date sources", empty: "No date source has been recorded yet." },
  { role: "cultural", title: "Cultural content sources", empty: "No cultural content source has been recorded yet." },
];

/**
 * Date sources and cultural-content sources are listed separately (PRD section 11), plus the latest
 * review date. Each source is numbered by its position in the guide's source list, so the "[n]"
 * citations in the sections above link here (`#source-<id>`).
 */
export function SourcesSection({
  sources,
  sections,
  quickFacts = [],
  deities = [],
}: {
  sources: readonly FestivalSource[];
  sections: readonly GuideSection[];
  quickFacts?: readonly PublicQuickFact[];
  deities?: readonly PublicDeity[];
}) {
  const reviewDates = [
    ...sections.flatMap((s) => (s.status === "published" ? [s.reviewedAt] : [])),
    ...quickFacts.map((f) => f.reviewedAt),
    ...deities.map((d) => d.reviewedAt),
  ];
  const lastReviewed = reviewDates.length > 0 ? formatCivilDate([...reviewDates].sort().at(-1)!) : null;
  const numbered = sources.map((source, index) => ({ source, n: index + 1 }));

  return (
    <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-24">
      <h2 id="sources-heading" className="mb-3 text-2xl font-semibold sm:text-3xl">
        Sources &amp; review
      </h2>
      <div className="flex flex-col gap-4">
        {GROUPS.map((group) => {
          const items = numbered.filter(({ source }) => source.role === group.role);
          return (
            <div key={group.role}>
              <h3 className="text-xl font-semibold">{group.title}</h3>
              {items.length === 0 ? (
                <p className="mt-1 text-ink-muted">{group.empty}</p>
              ) : (
                <ol className="mt-1 flex list-decimal flex-col gap-1.5 pl-6">
                  {items.map(({ source, n }) => {
                    const accessed = formatCivilDate(source.accessedAt);
                    return (
                      <li key={source.id} value={n} id={`source-${source.id}`} className="scroll-mt-24">
                        {/* Only http(s) URLs become links; anything else is shown as plain text. */}
                        {isHttpUrl(source.url) ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-saffron-deep underline underline-offset-4"
                          >
                            {source.title}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <span className="font-semibold">{source.title}</span>
                        )}
                        {source.publisher && <span className="text-ink-muted">, {source.publisher}</span>}
                        {accessed && <span className="text-sm text-ink-muted"> (accessed {accessed})</span>}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
        <p className="text-ink-muted">
          {lastReviewed ? `Last reviewed ${lastReviewed}.` : "Not yet editorially reviewed."}
        </p>
      </div>
    </section>
  );
}

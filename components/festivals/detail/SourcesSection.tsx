import { formatCivilDate } from "@/lib/festivals/occurrences";
import type { FestivalSource, GuideSection, SourceRole } from "@/lib/festivals/types";
import { isHttpUrl } from "@/lib/utils/url";

const GROUPS: { role: SourceRole; title: string; empty: string }[] = [
  { role: "date", title: "Date sources", empty: "No date source has been recorded yet." },
  { role: "cultural", title: "Cultural content sources", empty: "No cultural content source has been recorded yet." },
];

/** Date sources and cultural-content sources are listed separately (PRD section 11), plus the latest review date. */
export function SourcesSection({
  sources,
  sections,
}: {
  sources: readonly FestivalSource[];
  sections: readonly GuideSection[];
}) {
  const reviewDates = sections.flatMap((s) => (s.status === "published" ? [s.reviewedAt] : []));
  const lastReviewed = reviewDates.length > 0 ? formatCivilDate([...reviewDates].sort().at(-1)!) : null;

  return (
    <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-24">
      <h2 id="sources-heading" className="mb-3 text-2xl font-semibold sm:text-3xl">
        Sources &amp; review
      </h2>
      <div className="flex flex-col gap-4">
        {GROUPS.map((group) => {
          const items = sources.filter((s) => s.role === group.role);
          return (
            <div key={group.role}>
              <h3 className="text-xl font-semibold">{group.title}</h3>
              {items.length === 0 ? (
                <p className="mt-1 text-ink-muted">{group.empty}</p>
              ) : (
                <ul className="mt-1 flex list-disc flex-col gap-1 pl-5">
                  {items.map((source) => {
                    const accessed = formatCivilDate(source.accessedAt);
                    return (
                      <li key={source.url}>
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
                </ul>
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

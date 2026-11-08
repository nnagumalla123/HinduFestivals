import { Fragment } from "react";
import type { FestivalSource } from "@/lib/festivals/types";

/**
 * Numbered source links ("Sources: [1] [2]") that jump to the matching entry in "Sources & review".
 * The number is the source's position in the guide's source list. An id that matches no source is
 * silently skipped (never a broken link), and nothing is rendered if no id matches.
 * Each link is at least 24 by 24 CSS pixels (WCAG 2.2 target size) so neighbouring numbers are easy to tap.
 */
export function Citations({ ids, sources }: { ids: readonly string[]; sources: readonly FestivalSource[] }) {
  const cited = ids.flatMap((id) => {
    const index = sources.findIndex((s) => s.id === id);
    return index >= 0 ? [{ n: index + 1, source: sources[index] }] : [];
  });
  if (cited.length === 0) return null;

  return (
    <p className="text-sm text-ink-muted">
      Sources:{" "}
      {cited.map(({ n, source }, i) => (
        <Fragment key={source.id}>
          <a
            href={`#source-${source.id}`}
            aria-label={`Source ${n}: ${source.title}`}
            className="inline-block min-h-6 min-w-6 text-center font-semibold leading-6 text-saffron-deep underline underline-offset-4"
          >
            [{n}]
          </a>
          {i < cited.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}

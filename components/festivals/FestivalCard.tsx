import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { isVerified } from "@/lib/festivals/occurrences";
import type { Festival, FestivalOccurrence } from "@/lib/festivals/types";
import type { SearchResult } from "@/lib/festivals/search";
import { OccurrenceDate } from "./OccurrenceDate";

/**
 * One festival in a list. Renders an <li>, so place it inside a <ul>.
 * The whole card is clickable through the heading link stretched over it (one link per
 * card, so keyboard and screen-reader users don't hear it twice).
 */
export function FestivalCard({
  festival,
  matchedOn,
  occurrences = [],
  headingLevel = 2,
}: {
  festival: Festival;
  /** This festival's occurrences. Only verified ones are shown, each with its location, year and tradition label. */
  occurrences?: readonly FestivalOccurrence[];
  matchedOn?: SearchResult["matchedOn"];
  /** Heading level for the festival name, to fit the page outline (h2 on Explore, h3 under a section on Home). */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  const verified = occurrences.filter(isVerified).sort((a, b) => a.startDate.localeCompare(b.startDate));
  return (
    <Card
      as="li"
      className="relative flex flex-col gap-2 transition-shadow hover:shadow-lg focus-within:ring-2 focus-within:ring-maroon"
    >
      <Heading className="text-2xl font-semibold">
        <Link
          href={`/festivals/${festival.slug}`}
          className="hover:underline after:absolute after:inset-0 after:content-['']"
        >
          {festival.name}
        </Link>
      </Heading>
      {festival.subtitle && <p className="text-ink-muted">{festival.subtitle}</p>}
      {festival.aliases.length > 0 && (
        <p className="text-sm text-ink-muted">Also known as {festival.aliases.join(", ")}</p>
      )}
      {matchedOn && (
        <p className="text-sm font-semibold text-saffron-deep">
          {/* Unreviewed wording is never displayed: say only that a search term matched. */}
          {matchedOn.provisional
            ? "Matched your search"
            : `${matchedOn.kind === "alias" ? "Matched other name" : "Matched search term"}: ${matchedOn.text}`}
        </p>
      )}
      <div className="mt-1 flex flex-col gap-1">
        {/* With no verified occurrence this resolves to "Date not yet verified". */}
        {verified.length > 0 ? (
          verified.map((occurrence) => (
            <OccurrenceDate key={occurrence.startDate + (occurrence.traditionLabel ?? "")} occurrence={occurrence} />
          ))
        ) : (
          <div>
            <OccurrenceDate />
          </div>
        )}
      </div>
    </Card>
  );
}

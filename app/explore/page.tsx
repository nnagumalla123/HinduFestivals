import type { Metadata } from "next";
import { FestivalCard } from "@/components/festivals/FestivalCard";
import { SearchForm } from "@/components/festivals/SearchForm";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPublishedFestivals, listVerifiedOccurrences } from "@/lib/festivals/queries";
import { MAX_QUERY_LENGTH, searchFestivals } from "@/lib/festivals/search";

export const metadata: Metadata = {
  title: "Explore festivals",
  description: "Browse ten Hindu festivals and search by name, other names or deity. Each has a sourced guide to its meaning and traditions.",
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

// Reading `searchParams` makes this page render per request (the query lives in the URL).
export default async function ExplorePage({ searchParams }: Props) {
  const { q } = await searchParams;
  // ?q=a&q=b arrives as an array; use the first value. Cap the length of untrusted input.
  const query = (Array.isArray(q) ? q[0] : q)?.slice(0, MAX_QUERY_LENGTH).trim() ?? "";

  const [festivals, occurrences] = await Promise.all([listPublishedFestivals(), listVerifiedOccurrences()]);
  const results = searchFestivals(festivals, query);
  const isSearching = query !== "";

  return (
    <PageContainer>
      <SectionHeading
        level={1}
        title="Explore festivals"
        description="Ten festivals to start with. Search by name, another name, or a deity."
      />

      <SearchForm defaultValue={query} />

      <p role="status" className="text-ink-muted">
        {isSearching
          ? `${results.length} ${results.length === 1 ? "festival" : "festivals"} found for “${query}”`
          : `Showing all ${results.length} festivals`}
      </p>

      {results.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {results.map(({ festival, matchedOn }) => (
            <FestivalCard
              key={festival.slug}
              festival={festival}
              matchedOn={matchedOn}
              occurrences={occurrences.filter((o) => o.festivalSlug === festival.slug)}
            />
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No festivals found"
          description={`Nothing matches “${query}”. Check the spelling, try another name for the festival, or browse all ten.`}
          action={<ButtonLink href="/explore">Show all festivals</ButtonLink>}
        />
      )}
    </PageContainer>
  );
}

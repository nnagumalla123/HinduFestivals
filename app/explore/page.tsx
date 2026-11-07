import type { Metadata } from "next";
import { FestivalCard } from "@/components/festivals/FestivalCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPublishedFestivals } from "@/lib/festivals/queries";

export const metadata: Metadata = { title: "Explore festivals" };

// Placeholder list. Search by name/alias/deity and region filters come in Phase 2.
export default async function ExplorePage() {
  const festivals = await listPublishedFestivals();

  return (
    <PageContainer>
      <SectionHeading
        level={1}
        title="Explore festivals"
        description="Ten festivals to start with. Search and filters are coming soon."
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        {festivals.map((festival) => (
          <FestivalCard key={festival.slug} festival={festival} />
        ))}
      </ul>
    </PageContainer>
  );
}

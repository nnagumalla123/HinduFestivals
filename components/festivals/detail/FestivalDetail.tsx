import { GUIDE_SLOTS } from "@/lib/festivals/guide";
import type { FestivalGuide, FestivalOccurrence, MockFestival } from "@/lib/festivals/types";
import { FestivalHero } from "./FestivalHero";
import { GuideSlotSection } from "./GuideSlotSection";
import { QuickFacts } from "./QuickFacts";
import { SectionNav } from "./SectionNav";
import { SourcesSection } from "./SourcesSection";

/**
 * The whole festival page below the back link, in the order set by PRD section 4.
 * It takes its data as props (no loading here), so tests can render it with synthetic content.
 */
export function FestivalDetail({
  festival,
  occurrences,
  guide,
}: {
  festival: MockFestival;
  occurrences: readonly FestivalOccurrence[];
  guide: FestivalGuide;
}) {
  const hasContent = guide.sections.some((s) => s.status === "published");

  return (
    <>
      <FestivalHero festival={festival} occurrences={occurrences} />
      <div className="flex max-w-3xl flex-col gap-8">
        <SectionNav />
        {!hasContent && (
          <p className="rounded-md bg-gold-tint px-4 py-3 text-gold-deep">
            This guide is a work in progress. Sections marked &ldquo;Not yet available&rdquo; are still being
            researched and reviewed.
          </p>
        )}
        <QuickFacts />
        {GUIDE_SLOTS.map((slot) => (
          <GuideSlotSection key={slot.id} slot={slot} sections={guide.sections} />
        ))}
        <SourcesSection sources={guide.sources} sections={guide.sections} />
      </div>
    </>
  );
}

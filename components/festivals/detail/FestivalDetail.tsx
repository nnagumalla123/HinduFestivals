import { GUIDE_SLOTS } from "@/lib/festivals/guide";
import type { Festival, FestivalGuide, FestivalOccurrence } from "@/lib/festivals/types";
import { QUICK_FACT_LABELS } from "@/lib/festivals/types";
import { DeitiesSection } from "./DeitiesSection";
import { FestivalHero } from "./FestivalHero";
import { GuideSlotSection } from "./GuideSlotSection";
import { QuickFacts } from "./QuickFacts";
import { SectionNav } from "./SectionNav";
import { SourcesSection } from "./SourcesSection";

/**
 * The whole festival page below the back link, in the order set by PRD section 4.
 * It takes its data as props (no loading here), so tests can render it with synthetic content.
 * It only ever receives REVIEWED content (the loader withholds drafts); anything missing shows an
 * honest "Not yet available" placeholder.
 */
export function FestivalDetail({
  festival,
  occurrences,
  guide,
  today,
}: {
  festival: Festival;
  occurrences: readonly FestivalOccurrence[];
  guide: FestivalGuide;
  /** Optional today (YYYY-MM-DD, Atlanta reference time zone) for tests; otherwise the browser works it out. */
  today?: string;
}) {
  const publishedSections = guide.sections.filter((s) => s.status === "published");
  const hasContent = publishedSections.length > 0 || guide.quickFacts.length > 0 || guide.deities.length > 0;
  const slotHasContent = (slotId: string, kinds: readonly string[]) =>
    slotId === "deities" ? guide.deities.length > 0 : publishedSections.some((s) => kinds.includes(s.kind));
  const isPartial =
    hasContent &&
    (GUIDE_SLOTS.some((slot) => !slotHasContent(slot.id, slot.kinds)) || guide.quickFacts.length < QUICK_FACT_LABELS.length);

  return (
    <>
      <FestivalHero festival={festival} occurrences={occurrences} today={today} />
      <div className="flex max-w-3xl flex-col gap-8">
        <SectionNav />
        {!hasContent && (
          <p className="rounded-md bg-gold-tint px-4 py-3 text-gold-deep">
            This guide is a work in progress. Sections marked &ldquo;Not yet available&rdquo; are still being
            researched and reviewed.
          </p>
        )}
        {isPartial && (
          <p className="rounded-md bg-gold-tint px-4 py-3 text-gold-deep">
            Parts of this guide are complete and have been editorially reviewed. Sections marked &ldquo;Not yet
            available&rdquo; are still being researched and reviewed.
          </p>
        )}
        <QuickFacts facts={guide.quickFacts} sources={guide.sources} />
        {GUIDE_SLOTS.map((slot) =>
          slot.id === "deities" ? (
            <DeitiesSection key={slot.id} slot={slot} deities={guide.deities} sources={guide.sources} />
          ) : (
            <GuideSlotSection key={slot.id} slot={slot} sections={guide.sections} sources={guide.sources} />
          ),
        )}
        <SourcesSection
          sources={guide.sources}
          sections={guide.sections}
          quickFacts={guide.quickFacts}
          deities={guide.deities}
        />
      </div>
    </>
  );
}

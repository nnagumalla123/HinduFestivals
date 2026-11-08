import { GUIDE_SLOTS, SECTION_NAV } from "@/lib/festivals/guide";
import type { Festival, FestivalGuide, FestivalOccurrence } from "@/lib/festivals/types";
import { DeitiesSection } from "./DeitiesSection";
import { FestivalHero } from "./FestivalHero";
import { GuideSlotSection } from "./GuideSlotSection";
import { QuickFacts } from "./QuickFacts";
import { SectionNav } from "./SectionNav";
import { SourcesSection } from "./SourcesSection";

/**
 * The whole festival page below the back link, in the order set by PRD section 4.
 * It takes its data as props (no loading here), so tests can render it with synthetic content.
 * It only ever receives REVIEWED content (the loader withholds drafts). Three states:
 *   - nothing reviewed (a draft festival): the work-in-progress notice and every placeholder;
 *   - reviewed, with drafted content still pending (`guide.pendingReview`): the partly-reviewed notice and
 *     "Not yet available" placeholders for what is missing;
 *   - reviewed, nothing pending: only what exists is shown. Optional sections and quick facts that were never
 *     written are left out (and out of the page navigation), and no notice appears.
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
  // Drafted content that has not been reviewed yet (the loader says so). Optional content that simply was
  // never written does not make a guide "partly reviewed".
  const isPartial = hasContent && guide.pendingReview === true;
  // A reviewed guide with nothing drafted left shows only what exists: no empty placeholders, no dead links.
  // A guide with no reviewed content at all, or with drafted content still pending, keeps every placeholder.
  const hideEmpty = hasContent && !isPartial;
  const slots = GUIDE_SLOTS.filter((slot) => !hideEmpty || slotHasContent(slot.id, slot.kinds));
  const showQuickFacts = !hideEmpty || guide.quickFacts.length > 0;
  const navItems = SECTION_NAV.filter(
    (item) => (item.id === "quick-facts" ? showQuickFacts : item.id === "sources" || slots.some((slot) => slot.id === item.id)),
  );

  return (
    <>
      <FestivalHero festival={festival} occurrences={occurrences} today={today} />
      <div className="flex max-w-3xl flex-col gap-8">
        <SectionNav items={navItems} />
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
        {showQuickFacts && <QuickFacts facts={guide.quickFacts} sources={guide.sources} hideEmpty={hideEmpty} />}
        {slots.map((slot) =>
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

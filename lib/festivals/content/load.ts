import { REFERENCE_CALENDAR } from "../constants";
import type {
  Festival,
  FestivalGuide,
  FestivalOccurrence,
  FestivalSource,
  GuideSection,
  PublicDeity,
  PublicQuickFact,
} from "../types";
import type { ContentSource, FestivalRecord } from "./schema";
import { errors, validateRecord } from "./validate";

/*
 * The ONLY bridge from authored content to public pages. It is fail-closed:
 *   - a section is published only if its status is "reviewed" AND it has no validation errors;
 *   - an occurrence is published only if its status is "verified" AND it has no validation errors;
 *   - a record-level error (bad slug, duplicate source ids, ...) withholds all of that record's
 *     sections and occurrences, but the festival itself stays listed.
 * Drafts, in-review items and anything invalid simply never leave this function.
 *
 * Quick facts and deity entries follow the same rule: only `reviewed` entries without validation errors
 * are published, and only the public fields (never review notes or reviewer names).
 *
 * Output types are the public shapes from ../types.ts, built field by field, so internal
 * fields (reviewedBy, verifiedBy, notes, discovery sources) cannot leak.
 */

export interface PublicFestivalContent {
  festival: Festival;
  occurrences: readonly FestivalOccurrence[];
  guide: FestivalGuide;
}

function publicSource(source: ContentSource, role: "date" | "cultural"): FestivalSource {
  return {
    id: source.id,
    role,
    title: source.title,
    url: source.url,
    ...(source.publisher ? { publisher: source.publisher } : {}),
    accessedAt: source.accessedAt,
  };
}

export function publishRecord(record: FestivalRecord, today: string): PublicFestivalContent {
  const issues = errors(validateRecord(record, today));
  const recordBroken = issues.some((i) => i.scope === "record" && i.path !== "basics");
  const blocked = (scope: "section" | "occurrence" | "quickFact" | "deity", index: number) =>
    issues.some((i) => i.scope === scope && i.index === index);
  const basicsApproved = record.basics.status === "reviewed" && !issues.some((i) => i.path === "basics");
  const sourceById = new Map(record.sources.map((s) => [s.id, s]));
  const usedSources = new Map<string, FestivalSource>();
  /** Registers the cultural sources an item cites and returns their ids, in citation order. */
  const cite = (ids: readonly string[]): string[] => {
    const out: string[] = [];
    for (const id of ids) {
      const source = sourceById.get(id);
      if (!source || source.role !== "cultural" || source.holidayList) continue;
      usedSources.set(source.id, publicSource(source, "cultural"));
      out.push(source.id);
    }
    return out;
  };

  const sections: GuideSection[] = [];
  record.sections.forEach((section, index) => {
    if (recordBroken || section.status !== "reviewed" || blocked("section", index)) return;
    sections.push({
      kind: section.kind,
      title: section.title,
      status: "published",
      body: section.body,
      ...(section.tradition ? { tradition: section.tradition } : {}),
      reviewedAt: section.reviewedAt!, // present: validation requires it for reviewed sections
      sourceIds: cite(section.sourceIds),
    });
  });

  const quickFacts: PublicQuickFact[] = [];
  (record.quickFacts ?? []).forEach((fact, index) => {
    if (recordBroken || fact.status !== "reviewed" || blocked("quickFact", index)) return;
    quickFacts.push({
      label: fact.label,
      text: fact.text,
      ...(fact.tradition ? { tradition: fact.tradition } : {}),
      reviewedAt: fact.reviewedAt!,
      sourceIds: cite(fact.sourceIds),
    });
  });

  const deities: PublicDeity[] = [];
  (record.deityEntries ?? []).forEach((deity, index) => {
    if (recordBroken || deity.status !== "reviewed" || blocked("deity", index)) return;
    deities.push({
      name: deity.name,
      role: deity.role,
      tradition: deity.tradition,
      reviewedAt: deity.reviewedAt!,
      sourceIds: cite(deity.sourceIds),
    });
  });

  const occurrences: FestivalOccurrence[] = [];
  record.occurrences.forEach((occurrence, index) => {
    if (recordBroken || occurrence.status !== "verified" || blocked("occurrence", index)) return;
    occurrences.push({
      festivalSlug: record.slug,
      year: occurrence.year,
      startDate: occurrence.startDate,
      endDate: occurrence.endDate,
      locationLabel: REFERENCE_CALENDAR.label,
      verificationStatus: "verified",
      ...(occurrence.traditionLabel ? { traditionLabel: occurrence.traditionLabel } : {}),
      method: occurrence.method!,
      verifiedAt: occurrence.verifiedAt!,
      ...(occurrence.keyDays && occurrence.keyDays.length > 0
        ? { keyDays: occurrence.keyDays.map((d) => ({ date: d.date, label: d.label, ...(d.main ? { main: true } : {}) })) }
        : {}),
    });
    for (const id of occurrence.sourceIds) {
      const source = sourceById.get(id);
      // Holiday-list cross-checks are research notes, not citations.
      if (source && !source.holidayList) usedSources.set(source.id, publicSource(source, "date"));
    }
  });

  return {
    // Name and slug always; the rest only after the basics are reviewed. Until then the wording is
    // kept as search-only terms so search stays useful without presenting it as verified.
    festival: basicsApproved
      ? {
          slug: record.slug,
          name: record.name,
          aliases: record.aliases,
          subtitle: record.subtitle,
          deities: record.deities,
          provisional: { aliases: [], deities: [] },
        }
      : {
          slug: record.slug,
          name: record.name,
          aliases: [],
          deities: [],
          provisional: { aliases: record.aliases, deities: record.deities },
        },
    occurrences,
    guide: { sections, quickFacts, deities, sources: [...usedSources.values()] },
  };
}

export function publishAll(records: readonly FestivalRecord[], today: string): PublicFestivalContent[] {
  return records.map((record) => publishRecord(record, today));
}

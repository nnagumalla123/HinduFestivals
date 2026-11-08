import { REFERENCE_CALENDAR } from "../constants";
import { parseIsoDate } from "../occurrences";
import { isHttpUrl } from "@/lib/utils/url";
import type {
  ContentDeity,
  ContentOccurrence,
  ContentQuickFact,
  ContentSection,
  ContentSource,
  FestivalRecord,
  ReviewInfo,
} from "./schema";

/*
 * Editorial validation: pure functions, no clock (callers pass `today`).
 *
 * Two kinds of rule:
 *  - STRUCTURAL rules apply to every item, even drafts (a date must be a real date, a source id
 *    must exist). Drafts may otherwise be incomplete and contain working placeholders.
 *  - PUBLICATION rules apply only to items that CLAIM to be finished (status "reviewed" or
 *    "verified"). The loader publishes an item only if it has no errors, so a mistake here
 *    keeps content off the site instead of putting it on.
 *
 * Warnings never block publication; they flag wording a human reviewer should look at.
 */

export interface Issue {
  severity: "error" | "warning";
  /** Where, e.g. "sections[2]" or "sources[0]". */
  path: string;
  message: string;
  /** Which item the issue belongs to, so the loader can withhold just that item. */
  scope: "record" | "section" | "occurrence" | "source" | "quickFact" | "deity";
  index?: number;
}

export interface ValidationContext {
  /** Today's date as YYYY-MM-DD (the caller decides what "today" is). */
  today: string;
  sources: ReadonlyMap<string, ContentSource>;
}

export const errors = (issues: readonly Issue[]) => issues.filter((i) => i.severity === "error");

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Working notes that must never ship: TODO/TBD, [bracketed notes], ???, template braces. */
const PLACEHOLDER = /\b(todo|tbd|fixme|xxx|lorem ipsum)\b|\[[^\]]*\]|\?\?\?|\{\{|\}\}/i;

/** Phrases that often turn a regional custom into a universal rule. Flagged for a human, not blocked. */
const UNIVERSAL_PHRASES: readonly RegExp[] = [
  /\b(all|every|most) hindus\b/i,
  /\bmust be vegetarian\b/i,
  /\bmust fast\b/i,
  /\brequired to (fast|abstain)\b/i,
  /\beveryone (celebrates|observes|fasts)\b/i,
];

export function hasPlaceholder(text: string | undefined): boolean {
  return text !== undefined && PLACEHOLDER.test(text);
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const blank = (text: string | undefined) => text === undefined || text.trim() === "";

/** A real YYYY-MM-DD date that is not in the future. */
function isPastOrToday(iso: string | undefined, today: string): boolean {
  return iso !== undefined && parseIsoDate(iso) !== null && iso <= today;
}

function issue(
  severity: Issue["severity"],
  scope: Issue["scope"],
  index: number | undefined,
  path: string,
  message: string,
): Issue {
  return { severity, scope, index, path, message };
}

// ---------------------------------------------------------------- sources

/** Rules for a source wherever it is listed. */
export function validateSource(source: ContentSource, index: number, ctx: ValidationContext): Issue[] {
  const path = `sources[${index}]`;
  const out: Issue[] = [];
  const err = (message: string) => out.push(issue("error", "source", index, path, message));

  if (!SLUG.test(source.id)) err(`id "${source.id}" must be lowercase words joined by hyphens`);
  if (blank(source.title)) err("title is required");
  if (source.permissionRequired === "no" && source.permissionStatus !== "not_needed") {
    err('permissionStatus must be "not_needed" when no permission is required');
  }
  if (source.permissionRequired !== "no" && source.permissionStatus === "not_needed") {
    err('permissionStatus cannot be "not_needed" when permission is required or unresolved');
  }
  if (!isHttpUrl(source.url)) err("url must be an http(s) address");
  if (!isPastOrToday(source.accessedAt, ctx.today)) err("accessedAt must be a real date that is not in the future");
  if (source.holidayList && source.role !== "discovery" && source.role !== "date") {
    err("a holiday-list source can only be a discovery or date cross-check source");
  }
  return out;
}

/**
 * Extra rules for a source that backs PUBLISHED content. Returns plain messages;
 * callers attach them to the item that uses the source.
 */
function sourceUseProblems(source: ContentSource, ctx: ValidationContext): string[] {
  const problems: string[] = [];
  if (!isHttpUrl(source.url)) problems.push(`source "${source.id}" url must be an http(s) address`);
  if (!isPastOrToday(source.accessedAt, ctx.today)) problems.push(`source "${source.id}" has an invalid access date`);
  if (source.claimsSupported.length === 0 || source.claimsSupported.some(blank)) {
    problems.push(`source "${source.id}" must list the claims it supports`);
  }
  // Source-use model: an unread or missing terms page is NOT a blocker for an original paraphrase plus a
  // link, but a restricted or unresolved use is, and the audit trail must exist.
  if (blank(source.termsNote)) problems.push(`source "${source.id}" has no source-use audit note (termsNote)`);
  if (source.reproducesProtectedContent && source.permissionStatus !== "granted") {
    problems.push(`source "${source.id}" would reproduce protected content without granted permission`);
  }
  if (source.permissionRequired === "yes" && source.permissionStatus !== "granted") {
    problems.push(`source "${source.id}" requires permission for this use (status: ${source.permissionStatus})`);
  }
  if (source.permissionRequired === "unresolved") {
    problems.push(`source "${source.id}" has an unresolved permission question`);
  }
  if (hasPlaceholder(source.title) || source.claimsSupported.some(hasPlaceholder)) {
    problems.push(`source "${source.id}" contains placeholder text`);
  }
  return problems;
}

/** Resolves ids; reports unknown ids and sources of the wrong role. Used for every status. */
function resolveSources(
  ids: readonly string[],
  allowedRole: "date" | "cultural",
  ctx: ValidationContext,
  report: (message: string) => void,
): ContentSource[] {
  const found: ContentSource[] = [];
  for (const id of ids) {
    const source = ctx.sources.get(id);
    if (!source) {
      report(`unknown source id "${id}"`);
    } else if (source.role !== allowedRole) {
      report(`source "${id}" has role "${source.role}" and cannot back ${allowedRole === "date" ? "a date" : "cultural content"}`);
    } else if (allowedRole === "cultural" && source.holidayList) {
      report(`holiday-list source "${id}" can never back cultural content`);
    } else {
      found.push(source);
    }
  }
  return found;
}

// ---------------------------------------------------------------- review info

function reviewProblems(info: ReviewInfo, ctx: ValidationContext): string[] {
  if (info.status !== "reviewed") return [];
  const problems: string[] = [];
  if (!isPastOrToday(info.reviewedAt, ctx.today)) problems.push("reviewedAt must be a real date that is not in the future");
  if (blank(info.reviewedBy)) problems.push("reviewedBy is required (recorded internally, not shown)");
  return problems;
}

export function validateBasics(record: FestivalRecord, ctx: ValidationContext): Issue[] {
  const out = reviewProblems(record.basics, ctx).map((m) => issue("error", "record", undefined, "basics", m));
  if (record.basics.status === "reviewed") {
    const text = [record.name, record.subtitle, ...record.aliases, ...record.deities];
    if (text.some(hasPlaceholder)) out.push(issue("error", "record", undefined, "basics", "contains placeholder text"));
  }
  return out;
}

// ---------------------------------------------------------------- sections

export function validateSection(section: ContentSection, index: number, ctx: ValidationContext): Issue[] {
  const path = `sections[${index}]`;
  const out: Issue[] = [];
  const err = (message: string) => out.push(issue("error", "section", index, path, message));
  const warn = (message: string) => out.push(issue("warning", "section", index, path, message));

  // Structural: every status.
  const sources = resolveSources(section.sourceIds, "cultural", ctx, err);

  if (section.status !== "reviewed") return out;

  // Publication rules.
  if (blank(section.title)) err("title is required");
  if (blank(section.body)) err("body is required");
  if (hasPlaceholder(section.title) || hasPlaceholder(section.body) || hasPlaceholder(section.tradition)) {
    err("contains placeholder or working-note text");
  }
  reviewProblems(section, ctx).forEach(err);

  // Practical dorm guidance is advice, not a cultural claim, so it needs no source. Everything else does.
  if (section.kind !== "college_guide") {
    if (section.sourceIds.length === 0) err("a cultural claim needs at least one cultural source");
    for (const source of sources) sourceUseProblems(source, ctx).forEach(err);
  }
  // Stories and regional notes must say whose tradition they describe.
  if ((section.kind === "story" || section.kind === "regional_variation") && blank(section.tradition)) {
    err("stories and regional variations must name their tradition");
  }

  // Warnings for a human reviewer.
  if (UNIVERSAL_PHRASES.some((re) => re.test(section.body))) {
    warn("wording may present a regional custom as universal; check the attribution");
  }
  if (section.kind === "overview") {
    const words = wordCount(section.body);
    if (words < 60 || words > 200) warn(`overview is ${words} words; the guideline is roughly 80-150`);
  }
  return out;
}

// ---------------------------------------------------------------- quick facts and deities

/** Shared rules for an attributed claim that is not a guide section. */
function validateClaim(
  scope: "quickFact" | "deity",
  item: ReviewInfo & { sourceIds: readonly string[]; tradition?: string },
  text: string[],
  index: number,
  path: string,
  ctx: ValidationContext,
): Issue[] {
  const out: Issue[] = [];
  const err = (message: string) => out.push(issue("error", scope, index, path, message));
  const sources = resolveSources(item.sourceIds, "cultural", ctx, err);
  if (item.status !== "reviewed") return out;

  if (text.some(blank)) err("text is required");
  if (text.some(hasPlaceholder) || hasPlaceholder(item.tradition)) err("contains placeholder or working-note text");
  reviewProblems(item, ctx).forEach(err);
  if (item.sourceIds.length === 0) err("needs at least one cultural source");
  for (const source of sources) sourceUseProblems(source, ctx).forEach(err);
  return out;
}

export function validateQuickFact(fact: ContentQuickFact, index: number, ctx: ValidationContext): Issue[] {
  return validateClaim("quickFact", fact, [fact.text], index, `quickFacts[${index}]`, ctx);
}

export function validateDeity(deity: ContentDeity, index: number, ctx: ValidationContext): Issue[] {
  const out = validateClaim("deity", deity, [deity.name, deity.role, deity.tradition], index, `deityEntries[${index}]`, ctx);
  if (deity.status === "reviewed" && blank(deity.tradition)) {
    out.push(issue("error", "deity", index, `deityEntries[${index}]`, "a deity association must name its tradition"));
  }
  return out;
}

// ---------------------------------------------------------------- occurrences

export function validateOccurrence(occ: ContentOccurrence, index: number, ctx: ValidationContext): Issue[] {
  const path = `occurrences[${index}]`;
  const out: Issue[] = [];
  const err = (message: string) => out.push(issue("error", "occurrence", index, path, message));

  // Structural: every status.
  const start = parseIsoDate(occ.startDate);
  const end = parseIsoDate(occ.endDate);
  if (!start || !end) err("startDate and endDate must be real YYYY-MM-DD dates");
  else if (start > end) err("endDate cannot be before startDate");
  if (occ.year !== REFERENCE_CALENDAR.year) err(`year must be ${REFERENCE_CALENDAR.year} (the reference year)`);
  if (start && start.getUTCFullYear() !== occ.year) err("startDate must fall in the occurrence year");
  if (occ.locationSlug !== REFERENCE_CALENDAR.slug) err(`locationSlug must be "${REFERENCE_CALENDAR.slug}"`);
  if (!SLUG.test(occ.traditionKey)) err("traditionKey must be lowercase words joined by hyphens");
  const sources = resolveSources(occ.sourceIds, "date", ctx, err);

  // Key days (structural, every status): real dates inside the range, a label each, at most one main day.
  const keyDays = occ.keyDays ?? [];
  for (const day of keyDays) {
    const when = parseIsoDate(day.date);
    if (!when) err(`key day "${day.label}" must be a real YYYY-MM-DD date`);
    else if (start && end && (when < start || when > end)) err(`key day "${day.label}" falls outside the occurrence's dates`);
    if (blank(day.label)) err("every key day needs a label");
  }
  if (keyDays.filter((d) => d.main).length > 1) err("at most one key day can be the main day");

  if (occ.status === "disputed" && blank(occ.notes)) err("a disputed date must explain the disagreement in notes");
  if (occ.status !== "verified") return out;

  // Publication rules for a verified date.
  if (!isPastOrToday(occ.verifiedAt, ctx.today)) err("verifiedAt must be a real date that is not in the future");
  if (blank(occ.verifiedBy)) err("verifiedBy is required (recorded internally, not shown)");
  if (blank(occ.method)) err("a verified date must state its method");
  if (hasPlaceholder(occ.method) || hasPlaceholder(occ.traditionLabel) || keyDays.some((d) => hasPlaceholder(d.label))) {
    err("contains placeholder or working-note text");
  }
  if (occ.traditionKey !== "general" && blank(occ.traditionLabel)) {
    err("a tradition-specific observance needs a public traditionLabel");
  }
  if (occ.traditionKey === "general" && !blank(occ.traditionLabel)) {
    err('a "general" observance must not carry a traditionLabel');
  }
  for (const source of sources) sourceUseProblems(source, ctx).forEach(err);

  // Independence rule (docs/ARCHITECTURE.md section 4).
  const real = sources.filter((s) => !s.holidayList);
  const primary = real.filter((s) => s.locationSpecific === true && !blank(s.methodNote));
  if (primary.length === 0) {
    err("needs a primary date source that is specific to the reference location and states its method");
  }
  if (real.some((s) => blank(s.independenceGroup))) err("every date source must name its independenceGroup");
  const groups = new Set(real.map((s) => s.independenceGroup).filter((g): g is string => !blank(g)));
  if (groups.size < 2) {
    err("needs an independent cross-check: a second non-holiday-list source from a different independenceGroup");
  }
  return out;
}

// ---------------------------------------------------------------- whole record

export function buildSourceMap(record: FestivalRecord): Map<string, ContentSource> {
  return new Map(record.sources.map((s) => [s.id, s]));
}

/** Every issue for one festival record. The test suite requires zero errors across all content. */
export function validateRecord(record: FestivalRecord, today: string): Issue[] {
  const out: Issue[] = [];
  const recordErr = (path: string, message: string) => out.push(issue("error", "record", undefined, path, message));

  const ctx: ValidationContext = { today, sources: buildSourceMap(record) };

  if (!SLUG.test(record.slug)) recordErr("slug", "slug must be lowercase words joined by hyphens");
  if (blank(record.name)) recordErr("name", "name is required");
  if (new Set(record.sources.map((s) => s.id)).size !== record.sources.length) recordErr("sources", "source ids must be unique");

  out.push(...validateBasics(record, ctx));
  record.sources.forEach((s, i) => out.push(...validateSource(s, i, ctx)));
  record.sections.forEach((s, i) => out.push(...validateSection(s, i, ctx)));
  record.occurrences.forEach((o, i) => out.push(...validateOccurrence(o, i, ctx)));
  (record.quickFacts ?? []).forEach((f, i) => out.push(...validateQuickFact(f, i, ctx)));
  (record.deityEntries ?? []).forEach((d, i) => out.push(...validateDeity(d, i, ctx)));

  // Several occurrences for one festival: each needs its own tradition key; "general" cannot coexist with others.
  const seen = new Map<string, number>();
  record.occurrences.forEach((o, i) => {
    const key = `${o.year}|${o.locationSlug}|${o.traditionKey}`;
    if (seen.has(key)) {
      out.push(issue("error", "occurrence", i, `occurrences[${i}]`, "duplicate occurrence for the same year, location and tradition"));
      out.push(issue("error", "occurrence", seen.get(key), `occurrences[${seen.get(key)}]`, "duplicate occurrence for the same year, location and tradition"));
    }
    seen.set(key, i);
  });
  if (record.occurrences.length > 1) {
    record.occurrences.forEach((o, i) => {
      if (o.traditionKey === "general") {
        out.push(issue("error", "occurrence", i, `occurrences[${i}]`, 'a "general" observance cannot coexist with tradition-specific ones; label each separately'));
      }
    });
  }
  return out;
}

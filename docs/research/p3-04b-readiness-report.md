# P3-04B publication-readiness report (for owner review)

> **Updated 2026-11-08 (P3-05A):** counts in section 6 now match the revised guides (Navaratri: 8 optional items, 7 of 11 sources with unread terms; its Radha Krishna Temple source was removed and its sections reorganised). Nothing below the counts has changed.

> **Superseded 2026-11-08 by P3-05B:** the three guides and their basics are now `reviewed` and published; see section 10. This section describes the state when the report was written: nothing reviewed, verified or published.

Status (as written for P3-04B): **nothing is reviewed, verified or published.** The three guides, their basics and every date remain `draft` or unverified, and the site shows none of them. Prepared 2026-11-08.

## 1. Final guides
Readable text with sources and internal notes: [cultural/p3-03-drafts-for-review.md](cultural/p3-03-drafts-for-review.md) (generated from `content/festivals/{diwali,ugadi,navaratri}.ts`). Verification items: [cultural/p3-03-verification-list.md](cultural/p3-03-verification-list.md). Source-use policy: [cultural/source-use-policy.md](cultural/source-use-policy.md).

Decisions kept: Kali Puja stays in Diwali, attributed to Bengal (Britannica plus a University of Birmingham student blog by a Bengali community member); the Kubera and Newar Buddhist claims stay omitted; citations, review metadata and the audit trail are preserved.

## 2. Proposed basics (still `draft`; hidden until you review them)

| Festival | Subtitle (proposed) | Aliases | Deity search terms | Notes |
|---|---|---|---|---|
| Diwali | The festival of lights | Deepavali | Lakshmi, Rama, Krishna, Kali | Every term is also an attributed entry in the guide's deity list, so search never claims more than the guide. |
| Ugadi | The new year for many Telugu and Kannada families | Yugadi | Brahma | Subtitle widened from the Phase 2 placeholder. Gudi Padwa is deliberately **not** an alias: it is a separate Maharashtra and Goa festival. |
| Navaratri | Nine nights honoring the goddess | Navratri | Durga, Lakshmi, Saraswati | Matches the three-phase scheme in the guide; other traditions use nine forms of Durga (stated in the guide). |

The other seven festivals keep their provisional basics (name and slug only on public pages).

## 3. Date verification decisions
See [dates-2027.md](dates-2027.md), section 10. In short: **no 2027 date is verified.** Independent Atlanta calendars for 2027 do not exist yet (the Hindu Temple of Atlanta posts a yearly PDF around January). Applying our rules to 2026 reproduces that temple's published Atlanta Diwali dates, which supports the method but does not verify 2027. Janmashtami stays **disputed**. A pre-launch re-check is mandatory.

## 4. What was built (all tested with synthetic fixtures)
- **Reviewed content on the detail page:** sections, attributed stories, quick facts, deity cards with tradition labels, numbered citations, last-reviewed date, partial-guide banner (P3-04A).
- **Dates:** a multi-day occurrence can carry labelled key days with one main day; a tradition-specific observance carries its own label; the detail hero lists each with location, year and its own countdown. The countdown is worked out in the browser in the Atlanta time zone, so pages stay static: an unknown slug is still a real 404, and nothing freezes at build time.
- **Explore cards and home featured cards** show each verified date (with location, year and tradition label) or "Date not yet verified". **Calendar** grid, list and day details label tradition-specific entries and show key days; the "Reference calendar" label is unchanged.
- **Validation:** key days must be real dates inside the range, with a label each and at most one main day; invalid key days withhold the occurrence; source-use model (terms read, reproduction, permission needed, permission status) refined.
- **Safeguards:** unverified, draft, disputed or past dates never get a countdown; internal notes never reach public types.

## 5. Checks run
- Lint, typecheck, 495 tests (32 files) and the production build pass (as of P3-04B; after the P3-05A edits: 519 tests in 34 files, see the P3-05A addendum below).
- Production server: every real festival page, Explore, Calendar and home contain **no dates, no countdowns, no draft cultural text, no review notes, no fixture text**; unknown and wrong-case slugs return 404. The built HTML and client bundles contain none of the draft strings.
- Browser, desktop and 375px, with synthetic dated fixtures: hero with key days and countdown, two tradition-specific dates with separate countdowns, cards and a calendar list. No horizontal overflow.

## 6. Publication readiness

| Item | Diwali | Ugadi | Navaratri |
|---|---|---|---|
| Content blockers (single-source or unverified claims) | 0 | 0 | 0 |
| Optional research items | 8 | 5 | 8 |
| Sources whose terms page was not found or read | 14 of 18 | 8 of 11 | 7 of 11 |
| Basics proposed | yes | yes | yes |
| Verified 2027 date | no | no | no |
| Status | draft | draft | draft |

Remaining before anything can go live (all need you): review and approve each guide's sections, quick facts and deity entries; review and approve the basics; decide whether to seek permission for any source (Britannica's syndication form) or accept paraphrase and links; and, for dates, wait for independent Atlanta 2027 calendars and approve each festival's status. The validator will refuse to publish a `reviewed` item that breaks any rule above.

## 7. Notes
- The dev server on port 3000 was left stuck on "Loading…" after I ran production builds alongside it; restart it.
- One regression was found and fixed during this milestone: rendering the detail page per request made unknown slugs return 200 instead of 404. The client-side countdown restored real 404s.

## 8. P3-05A addendum (2026-11-08)
Editorial revisions approved by the owner were applied to all three drafts and the Ugadi basics (shorter subtitle). A new quick-fact label, "Signature foods", was added to the shared schema, public types and QuickFacts component (it shares a display slot with "Dietary practices"). The housing sentence in Diwali and Navaratri now reads "If you have questions about religious accommodations, ask your residence life office." Checks: lint, typecheck, 519 tests in 34 files (including a temporary synthetic-publication preview, `tests/preview-synthetic-review.test.tsx`) and the production build all pass. Everything is still `draft` and every date unverified. Remaining optional research gaps are accepted by the owner for now.

## 9. Visual review addendum (2026-11-08)
The real Diwali, Ugadi and Navaratri content was rendered as synthetic "reviewed" records in an isolated copy of the project (the real files were not touched) and checked at 1280 px and 375 px. No horizontal overflow, readable 17 px body text, one-column quick facts on mobile, and the end of the page clears the bottom navigation. One accessibility fix was made: citation links such as "[1]" were 16 by 20 px and are now at least 24 by 24 px. The preview test `tests/preview-synthetic-review.test.tsx` is kept as a regression test; its draft-only assertion was replaced by a status-agnostic leak check.

## 10. P3-05B: reviewed and published locally (2026-11-08)
**Owner-approved status change.** Diwali, Ugadi and Navaratri, with every section, quick fact, deity entry and their basics, are `reviewed` (`reviewedAt` 2026-11-08; `reviewedBy` `desi-days-editorial`, internal, never shown). Only status and metadata changed in `content/festivals/*.ts`, plus header comments. The footer now reads "Guides appear here only after editorial review. Festivals without a full guide are still being prepared." No occurrence was added: all ten festivals still show "Date not yet verified", with no countdown. The other seven guides and their basics remain `draft` and unpublished.

| Check | Result |
|---|---|
| Lint, typecheck | Pass |
| Tests | 520 pass (34 files). Tests that assumed "everything is draft" were rewritten to assert the new state (three reviewed pilots, seven draft, no dates). |
| Production build | Pass (21 pages), run in an isolated copy so the dev server on port 3000 was not disturbed |
| Pilot pages | Subtitle and "Also known as" show; every section, quick fact, deity entry, citation (55, 50 and 44 numbered links) and the Sources list render; "Last reviewed November 8, 2026" shows |
| Internal material | No reviewer name, review note, audit note or `reviewedBy` in any HTML, RSC payload or client bundle |
| Explore and home | Approved subtitles and aliases show on the three pilot cards; the other seven show the name only |
| Other seven | Work-in-progress banner, "Not yet editorially reviewed", no subtitle or aliases |
| Dates | No ISO date on any page; "Date not yet verified" everywhere; the only "2027" in guide pages is the University of Georgia source title ("Community Guide 2026-2027") and the Calendar page's reference label |
| Routing | Unknown and wrong-case slugs return 404 |

Presentation note (superseded by section 11): Diwali's fifth quick fact and "Food & fasting" slot were empty because no reputable source names Diwali dishes or fasting, and Sweets was merged into customs. They first rendered as placeholders with a partly-reviewed banner; section 11 changes that. The three guides are ready for local use; nothing is committed, pushed or deployed.

## 11. Completeness rendering (2026-11-08, after P3-05B)
**Problem:** Diwali is fully reviewed, but its optional fifth quick fact and Food & fasting section were never written, which produced "Not yet available" placeholders and a partly-reviewed banner that was not true.

**Rule now:** the loader reports `guide.pendingReview`, true only when drafted guide content exists that is not published (an item still `draft` or `in_review`, or a `reviewed` item withheld because it fails validation). Content that was never written does not count. It is a boolean only; no draft text or note travels with it, and it never reaches the HTML.

| Festival state | Page |
|---|---|
| Nothing reviewed (the seven drafts) | Unchanged: work-in-progress notice and every "Not yet available" placeholder |
| Reviewed content and `pendingReview` (drafted content still waiting) | Partly-reviewed notice and placeholders for what is missing |
| Reviewed content and nothing pending (Diwali, Ugadi, Navaratri) | Only what exists is shown. Missing optional quick facts and empty sections are omitted, along with their "On this page" links. No placeholders, no notice. If no quick fact exists at all, the Quick facts section and its link are omitted. |

Nothing is invented: Diwali shows exactly its four reviewed quick facts and six reviewed content sections, no "Dietary practices" or "Food & fasting". If a Diwali food section is later drafted but not yet reviewed, the page returns to the partly-reviewed state until it is reviewed.

**Verification:** lint, typecheck, 530 tests and an isolated production build pass. Built Diwali page: eight sections (Quick facts, Why celebrate?, Stories & mythology, Deities, Traditions, How to celebrate, Regional variations, Sources & review), four quick facts in a balanced two-column grid, no dead navigation anchors, no placeholder or notice, "Date not yet verified" and no countdown. Ugadi and Navaratri are unchanged (nine sections, five quick facts). The seven draft pages keep the work-in-progress state. No internal note, reviewer name or `pendingReview` flag appears in any HTML, RSC payload or client bundle.

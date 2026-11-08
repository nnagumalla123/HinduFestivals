# P3-04B publication-readiness report (for owner review)

Status: **nothing is reviewed, verified or published.** The three guides, their basics and every date remain `draft` or unverified, and the site shows none of them. Prepared 2026-11-08.

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
- Lint, typecheck, 495 tests (32 files) and the production build pass.
- Production server: every real festival page, Explore, Calendar and home contain **no dates, no countdowns, no draft cultural text, no review notes, no fixture text**; unknown and wrong-case slugs return 404. The built HTML and client bundles contain none of the draft strings.
- Browser, desktop and 375px, with synthetic dated fixtures: hero with key days and countdown, two tradition-specific dates with separate countdowns, cards and a calendar list. No horizontal overflow.

## 6. Publication readiness

| Item | Diwali | Ugadi | Navaratri |
|---|---|---|---|
| Content blockers (single-source or unverified claims) | 0 | 0 | 0 |
| Optional research items | 8 | 5 | 9 |
| Sources whose terms page was not found or read | 14 of 18 | 8 of 11 | 8 of 12 |
| Basics proposed | yes | yes | yes |
| Verified 2027 date | no | no | no |
| Status | draft | draft | draft |

Remaining before anything can go live (all need you): review and approve each guide's sections, quick facts and deity entries; review and approve the basics; decide whether to seek permission for any source (Britannica's syndication form) or accept paraphrase and links; and, for dates, wait for independent Atlanta 2027 calendars and approve each festival's status. The validator will refuse to publish a `reviewed` item that breaks any rule above.

## 7. Notes
- The dev server on port 3000 was left stuck on "Loading…" after I ran production builds alongside it; restart it.
- One regression was found and fixed during this milestone: rendering the detail page per request made unknown slugs return 200 instead of 404. The client-side countdown restored real 404s.

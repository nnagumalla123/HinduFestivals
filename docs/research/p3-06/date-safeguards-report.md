# Date-safeguard validation report (P3-06)

Audit date 2026-11-12. **Result: every safeguard holds. All ten `occurrences` arrays are empty, no 2027 date is verified or published, and no countdown can appear.** A "date re-check not yet possible" result is accepted for Phase 3 (owner decision, 2026-11-12); the next checkpoint is **January 2027**.

## 1. Current state

| Check | Result |
|---|---|
| `occurrences` in all ten content files | `[]` in every file (verified by `grep` and by `batch-b-drafts.test.ts`, `batch-a-drafts.test.ts`, `pilot-drafts.test.ts` and `guide-data.test.ts`) |
| Any verified or disputed occurrence in any record | None |
| Public text: festival dates | None. The only years in guide text are historical (1818, 1892 and 1893 in Ganesh Chaturthi); no 2026 or 2027 date, no month-day, no ISO date (content scan, tests, and the built-output scan) |
| Built output (isolated production build, 227 public files) | No "2027" outside the Calendar page's reference label and source titles; no ISO date; no `<time>` element; no countdown phrase; "Date not yet verified" on every festival page; "Reference calendar: Atlanta, GA · 2027" only on the Calendar page (`leak-scan-report.md`) |
| Explore and home | Ten cards each marked "Date not yet verified"; home "Next festival" shows "No verified dates yet" (checked in the built app) |
| Janmashtami | Stays **disputed** in the date ledger (`docs/research/dates-2027.md`: Smarta-style versus Vaishnava observance); nothing about either observance date reaches the guide, whose Smarta/Vaishnava section says only that dates can differ by tradition |

## 2. Code paths that enforce it

| Rule | Where | Evidence |
|---|---|---|
| Only `verified` occurrences with no validation errors are published | `lib/festivals/content/load.ts` (occurrence filter: `occurrence.status !== "verified" || blocked(...)`) | `tests/content/gating.test.ts`: "withholds draft and in-review items, however complete they look"; "withholds a 'reviewed' item that fails validation, but keeps its valid neighbours"; "withholds all ... when the record itself is broken" |
| A verified date needs a method, a verifier, a verification date not in the future, a primary source specific to the reference location that states its method, and an independent second source from a different `independenceGroup` | `lib/festivals/content/validate.ts` (`validateOccurrence`) | `tests/content/validation.test.ts`: occurrences "are rejected: no method / no verifier / wrong year / end before start / another location / no sources / a cultural source as proof of a date"; "need an independent cross-check"; "do not accept a second source built on the same underlying data"; "do not accept a holiday list as the independent check or as the primary"; "need the primary to be specific to the reference location and to state its method"; "require disputed dates to explain the disagreement" |
| Holiday-list sites (for example CalendarLabs) are cross-checks only, never the primary or the independent check | `validate.ts` (`holidayList` filter) | same tests |
| A date source can never back cultural prose, and a cultural source can never prove a date | `validate.ts` (`resolveSources` role check) | "can never be backed by a date, discovery or holiday-list source"; gating: "never use a discovery or holiday-list source for a published date or claim" |
| Never publish a verified occurrence without Atlanta context | `load.ts`, `FestivalHero`, `OccurrenceDate` | gating: "never publish a verified occurrence that lacks Atlanta context"; `OccurrenceDate.test.tsx`; `dates-integration.test.tsx` |
| Dates are civil `YYYY-MM-DD` strings, never JS `Date`; "today" is `America/New_York`; real-calendar parsing rejects impossible dates | `lib/festivals/occurrences.ts`, `constants.ts` | `occurrences.test.ts` (parseIsoDate rejects "2027-02-29", "2027-13-01", "March 5", and more); `calendar-logic.test.ts` |
| Countdown, next-festival, calendar placement and key days use only verified occurrences; draft, disputed and malformed ones are ignored | `Countdown.tsx`, `next-festival.ts`, `calendar.ts` | `calendar-logic.test.ts` "ignores draft, disputed and malformed occurrences"; `dates-integration.test.tsx`, `dates-routes.test.tsx`; **all proven with synthetic fixtures only** (no real date exists) |
| Verified date not trusted if its verification is dated in the future | `validate.ts` | gating: "does not trust a verified date whose verification is dated in the future" |
| Pages stay static and the countdown is computed in the browser | `app/festivals/[slug]/page.tsx` (static params, `dynamicParams = false`) | production build; unknown, wrong-case and extra-segment slugs return 404 (checked: `not-a-festival`, `Holi`, `holi/extra`) |
| Reviewer and verifier identity, internal notes and discovery sources never leak | `load.ts` public shapes built field by field | gating: "never leaks reviewer or verifier identity, internal notes or discovery sources"; leak scan |

## 3. Synthetic-fixture caveat (P3-04)

The occurrence key days, tradition labels, hero countdown, Explore dates, Calendar labels and home cards were built and tested **with synthetic fixtures only**. No real date has ever been verified, so the real-data path has not been exercised end to end. This is recorded in `docs/IMPLEMENTATION_PLAN.md` (P3-04).

## 4. January 2027 checkpoint

When: **January 2027** (the Hindu Temple of Atlanta posts a yearly PDF calendar around then), and again before launch. Procedure:

1. Check the Hindu Temple of Atlanta's published 2027 calendar and one or more independent, Atlanta-specific, method-stating calendars (not CalendarLabs-style holiday lists, which are cross-checks only; sources built on the same underlying data are not independent).
2. Re-run the research in `docs/research/dates-2027.md` for all ten festivals, including tradition-specific observances (Janmashtami Smarta versus Vaishnava; Diwali's labelled days).
3. Propose `verified` / `disputed` / `draft` per festival and tradition, with sources, methods and independence groups.
4. **The owner approves each date separately** before anything enters `content/` as `verified`; only then can the countdown, Explore, Calendar and reminders show dates. Nothing in this audit or in P3-06 publishes a date.
5. Re-run `tools/leak-scan.mjs` and the date tests afterward.

## 5. Findings

None for dates. (F-13 and F-14 in the findings register are wording and metadata notes: the page-title tagline implies dates, and one prose use of the word "countdown".)

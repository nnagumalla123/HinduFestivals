# Desi Days — Implementation Plan

**Version:** 1.0 | **Date:** 2026-11-07  
**Working agreement:** One phase, one reviewable milestone at a time. Claude Code must read `docs/PRD.md`, `docs/ARCHITECTURE.md`, and `CLAUDE.md` before changing code.

## Working loop for every task
1. Read requirements and relevant existing files.
2. Explain proposed changes and files to touch; ask about ambiguous decisions.
3. Implement the smallest complete vertical slice; do not add unrelated features.
4. Run lint, typecheck, and relevant tests (or explain why unavailable).
5. Report changed files, test results, manual verification steps, and concepts for the student to learn.
6. Wait for user approval before commit, push, deployment, or irreversible database changes.

## Phase 0 — Repository and documentation
- [ ] Create GitHub repository and local checkout.
- [ ] Add `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `CLAUDE.md`.
- [ ] Choose Node LTS, package manager (npm), and record versions in README.
- [ ] Add `.gitignore`, `.env.example` (placeholders), README skeleton.
**Gate:** Docs committed, no secrets, no application behavior assumed beyond PRD.

## Phase 1 — Foundation and design system
**Goal:** Working responsive Next.js shell with typed mock content, no external integrations.
- [ ] Initialize Next.js App Router, TypeScript, Tailwind, ESLint.
- [ ] Add color tokens (maroon `#7B1E2B`, saffron `#C46B26`, gold `#D6A545`, ivory `#F8EEDB`, green `#315B47`), accessible contrast variants, typography and spacing.
- [ ] Create desktop header, mobile navigation, footer, and accessible layout.
- [ ] Add route placeholders for `/`, `/calendar`, `/explore`, `/festivals/[slug]`, `/my-festivals`, `/login`, `/signup`, `/onboarding`, `/settings`.
- [ ] Create typed mock festivals **without presenting fabricated dates as real**.
- [ ] Add reusable button, card, input, empty state, loading state, section heading components.
- [ ] Add initial tests for navigation and render behavior.
**Gate:** `npm run dev` works, routes load, responsive nav, lint/typecheck pass; no Supabase/email integration.

## Phase 2 — Public festival UX
**Goal:** Complete anonymous experience with mock, clearly labeled data.

**Approved decisions (2026-11-07)**
- Test fixtures may use clearly synthetic dates **only under `tests/`**. No fabricated dates in `app/`, `components/`, `lib/`, or any user-facing page. No dev-only calendar preview route.
- Deity search: add only minimal, well-established deity associations, marked "pending editorial review", without oversimplifying festivals that have several traditions or interpretations.
- Region filters (Explore and Calendar) are deferred to Phase 3, when sourced regional associations exist (later moved to Phase 4).
- Playwright/E2E is deferred to Phase 6. Phase 2 uses Vitest, React Testing Library, and manual browser checks (375px and desktop, keyboard-only).
- Guest follow is a simple sign-in prompt with a safe return URL. No authentication is built.
- Avoid ten nearly empty guide pages: plan a small amount of properly sourced, reviewed introductory content per festival (no invented cultural information or dates). Scope and sourcing are agreed with the project owner before P2-03; unreviewed sections show "Not yet available".
- Keep the three research jobs separate: festival discovery, date verification, cultural content research (PRD section 11). No data ingestion.
- No new dependencies unless explained and approved. Dates are `YYYY-MM-DD` strings; "today" is always passed in.

**Milestones** (one at a time; stop for review after each)
- [x] **P2-00 Shared foundations:** `FestivalOccurrence` type and empty `mockOccurrences`; guide-section model; `OccurrenceDate` (date always paired with reference location and year); `safeReturnPath()`; synthetic test fixtures.
- [x] **P2-01 Explore:** search by name, aliases, deities (URL `?q=`, works without JavaScript), results count, empty state, polished cards.
- [x] **P2-02 Calendar:** month/list views, Previous/next month navigation limited to the reference year, mutually exclusive grid and list views with a short empty state in each, day selection, verified-only indicators, label beneath the heading. Festival guides stay on Explore (not repeated under the calendar).
- [x] **P2-03 Detail page:** hero, quick facts, summary, expandable stories, deities, rituals, food/fasting, celebration modes, regional differences, sources; unavailable sections clearly marked; P2-03 built the full section structure with honest "Not yet available" placeholders, a typographic hero, "On this page" navigation, and support for reviewed content, sources and expandable stories (empty until Phase 3). The small reviewed intro content is deferred to Phase 3 (see the editorial approach below). The detail-page hero countdown is also deferred: it needs the current date and a verified occurrence.
- [x] **P2-04 Home, guest follow, gate:** next-festival selection (empty state until verified data), featured cards (the homepage has no search box; Explore is the search entry); follow/reminder actions send guests to sign-in with a safe return URL; loading/404/error sweep; J1 walkthrough. Built: welcoming hero, "Next festival" (verified occurrences only; `today` is measured in the reference time zone; the page renders per request so it never freezes at build time), six featured festivals from the ten (editorial placeholder list in `lib/festivals/featured.ts`), and a Follow link to `/login?next=<validated path>`. The login page only keeps and re-validates `next` for Phase 4 and says nothing has been followed. Reminders show as "not available yet". Festival routes use `dynamicParams = false`, so unknown or wrong-case slugs are a deterministic 404.
- [x] Keyboard and mobile interactions, loading/404/error states throughout.
- [x] Unit/component tests for search, calendar rendering, detail sections, next-festival selection, and return-URL safety.

**Editorial approach for cultural content (APPROVED 2026-11-07; supersedes the P2-03 proposal)**
- Each guide explains why the festival is celebrated, its significance, major traditions, and relevant regional variations. Food and fasting practices are included where applicable, distinguishing traditions from optional observances. Each guide also gives practical, dorm-friendly ways for young Indian Americans to celebrate away from home (practical guidance, not cultural claims; no unsafe suggestions such as open flames in dorm rooms).
- Every tradition-specific claim cites a reputable cultural, temple, academic or relevant primary source, attributed to its tradition; no regional practice is presented as universal. Holiday-list websites (for example CalendarLabs) are never sources for cultural or religious claims. Dates follow the separate date-verification process (cultural-content research and date verification stay separate).
- Process: draft in original wording (no copied text) and record source URLs, titles and access dates; the owner reviews (ideally with a culturally knowledgeable reviewer); only reviewed text is published, with `reviewedAt` set. Where sources disagree, say "varies by tradition" or omit the point.
- Introductory summaries use 80-150 words as a flexible guideline, not a strict limit.
- Rollout: pilot with **Diwali, Ugadi and Navaratri**, review the pilot, then expand to the remaining seven festivals.

**Deferred from Phase 2**
- Region filters on Explore and Calendar (need sourced regional associations): Phase 4 (approved 2026-11-07, with regional preferences and onboarding).
- Reviewed intro content, sources and `reviewedAt` on guide pages: Phase 3.
- Detail-page hero countdown and a populated "Next festival" card in a real browser: need verified occurrences (Phase 3).
- Follow, reminders and real sign-in (`/login?next=` is validated and kept for it): Phases 4 and 5.
- Playwright end-to-end tests: Phase 6.
- Editorial placeholders to revisit: the featured-festival list (`lib/festivals/featured.ts`) and the search-only deity names ("pending editorial review").

**Gate:** A guest completes J1 end to end; all sample dates clearly marked as samples or absent; production data contains no dates. **Verified at the end of Phase 2** (lint, typecheck, tests, production build; J1 clicked through in a browser; no dates, countdowns, review stamps or synthetic text in any served page).

## Phase 3 — Genuine Festival Data & Cultural Content
**Goal:** Real, sourced, reviewed festival content and verified Atlanta 2027 dates, published from typed content files.

**Approved decisions (2026-11-07)**
- **A. Storage:** version-controlled typed content files (`content/festivals/<slug>.ts`) for public content; Supabase moves to Phase 4 (accounts, follows, personalization). Migration path is in ARCHITECTURE ADR-007. Superseded: the original Phase 3 items "set up Supabase", "SQL migrations/RLS for public tables" and "database-backed queries". Cross-user RLS tests stay in Phase 4.
- **B. Date verification:** a reliable Atlanta-specific Hindu calendar source with a documented calculation/observance method, plus an independent cross-check. Disagreements are investigated before a status is set. Sources built on the same underlying calendar data are not independent confirmation.
- **C. Tradition-specific dates:** separately sourced, clearly labeled observances; conflicting dates are never collapsed into one.
- **D. Region filters:** deferred to Phase 4.
- **E. Review:** reviewer recorded internally, review date shown publicly; only explicitly approved content is published.
- **F. Research tools:** read-only web search and page fetching allowed. Record URLs, titles, access dates and the claims each source supports. No scraping or automated ingestion.
- **G. Countdown:** festival detail pages may render per request to show accurate countdowns in the Atlanta reference time zone.
- CalendarLabs is a discovery/cross-check source only: it may be recorded but can never qualify a date as verified (alone or as the independent check) or support a cultural claim. Source roles are enforced in validation (the domain is not banned).
- Draft content and research notes may contain working placeholders; no draft, unreviewed or invalid text may reach a public page (fail-closed loader).
- Cultural research is independent of date verification; the Diwali/Ugadi/Navaratri pilot can proceed even if date verification is slower than expected, without inventing dates.
- Launch scope stays the ten festivals; all date/location display rules stay as in CLAUDE.md and PRD section 7.
- Previously public subtitles, aliases and provisional deity associations are marked `draft` and need editorial review before being treated as verified cultural information (they keep appearing as they do today until reviewed).
- Lightweight: no CMS, no new dependencies, no authentication in Phase 3.

**Milestones** (one at a time; stop for review after each)
- [x] **P3-00 Data foundations (approved 2026-11-07):** typed content schema (festival record, sections, occurrences, sources, review state), source roles, validators, fail-closed loader, ten content files holding the existing basics (all `draft`), `queries.ts` and pages rewired with no visible change, tests that replace the "data is empty" tripwires with gating tests. No dates, no guides.
- [x] **P3-01 Date research (all ten; research approved 2026-11-07, no dates approved for publication):** see `docs/research/dates-2027.md`. vet Atlanta-specific calendar sources (terms, stated method); record in `docs/research/dates-2027.md` the rule, each source's date and method, independence, and agreement; investigate disagreements; propose `verified`/`disputed`/`draft` per festival and tradition; the owner approves before anything enters `content/`. Model multi-day festivals and tradition-specific observances.
- [x] **P3-02 Pilot source packs (Diwali, Ugadi, Navaratri): approved 2026-11-07** (`docs/research/cultural/`). reputable cultural/temple/academic/primary sources with URL, title, access date, and the claims each supports; the owner approves sources before drafting.
- [x] **P3-03 Pilot drafts and review (done; reconciled 2026-11-12):** drafts written in `content/festivals/` (diwali, ugadi, navaratri) with quick facts, attributed deities, sources and review notes, then reviewed by the owner with editorial revisions, and the approved sections, quick facts, deity entries and basics (subtitles and aliases) flipped to `reviewed` on 2026-11-08 (commit `b4e7ac8`; see `docs/research/cultural/p3-03-drafts-for-review.md`, `p3-05a-editorial-review-packet.md` and `docs/research/p3-04b-readiness-report.md` section 10). A culturally knowledgeable second reader was recommended and is optional (`docs/research/p3-06/second-reader-packet.md`).
- [x] **P3-04 Integration (done; reconciled 2026-11-12):** reviewed content and citations on the detail page (A); occurrence key days, tradition labels, hero countdown (computed in the browser so pages stay static and unknown slugs stay 404), Explore dates, Calendar labels and day details, home cards (B). Built in `6f3e464` and used by every reviewed guide since; visually checked on the real pilot guides (`docs/research/p3-04b-readiness-report.md` section 9). **The date, key-day, countdown, Explore-date, Calendar and home-card paths were validated with synthetic fixtures only: no real date has been verified, so they have not been exercised end to end with real dates (to be re-checked when dates are verified, January 2027 checkpoint).**
- [x] **P3-05 Expansion (complete locally 2026-11-12):** the remaining seven festivals were drafted, editorially reviewed and published through the loader in batches: Batch A (Makara Sankranti, Maha Shivaratri, Holi, Rama Navami; reviewed 2026-11-08, committed locally as `6fb9e7e`) and Batch B (Krishna Janmashtami, Ganesh Chaturthi, Vijayadashami; reviewed 2026-11-12, uncommitted). All ten guides and their basics are `reviewed`; every occurrence is empty and no 2027 date is verified. See `docs/PROJECT_HANDOFF.md`.
- [~] **P3-06 Phase gate (audit completed 2026-11-12, awaiting owner sign-off):** claim-to-source audit, consistency, safety and student-guidance, search aliases and deity associations, date safeguards, metadata leak scan, accessibility, mobile, desktop and keyboard checks, production build with no draft text, final date re-check (**not yet possible**: recorded as a January 2027 checkpoint, no date published). Results: 0 S1, 4 S2 and 13 S3 findings awaiting owner decisions; see `docs/research/p3-06/final-audit-report.md`.

**Phase 2 follow-ups folded into Phase 3**
- `FestivalCard` shows `<OccurrenceDate />` with no data: pass occurrences (P3-04).
- `QuickFacts` accepts `facts` but `FestivalDetail` passes none (P3-04).
- Detail-page countdown and per-request rendering (P3-04).
- Subtitles, aliases and search-only deities need review (P3-03/P3-05).
- Sources section lacks date methodology and verification date (P3-04).
- Occurrence type lacked tradition, method and sources; duplicate occurrences per festival need tradition labels in Calendar and next-festival selection (P3-00 model, P3-04 UI).
- Featured-festival list is a placeholder: revisit once real dates exist.

**Gate:** Public site shows 10 reviewed guides and only verified dates (each with Atlanta, GA and 2027), drafts and unreviewed text cannot reach any public page, public pages are read-only and guest-accessible. Supabase is not part of this gate.

## Phase 4 — Authentication and personalization
**Goal:** Secure accounts and saved preferences.
- [ ] Implement Supabase email/password signup, verification, login, logout, callback and safe redirect.
- [ ] Add user-owned tables, RLS, constraints, migrations, tests.
- [ ] Onboarding: multiple regions, Atlanta reference location, IANA time zone, explicit follows, reminder settings default OFF.
- [ ] Set up Supabase (project, env placeholders, migrations). Seed a `festivals` table from the Phase 3 content files by a reviewed script so follows have a foreign key; public pages keep reading content through `lib/festivals/queries.ts`.
- [ ] Region filters on Explore and Calendar, using the sourced regional variations from the reviewed guides (deferred from Phases 2 and 3).
- [ ] Follow/unfollow and My Festivals with persistence.
- [ ] Settings edit flows, form validation, unauthorized/expired session states.
- [ ] Account deletion workflow or clear documented mechanism before public launch.
- [ ] Integration test two-account isolation and unauthenticated mutation denial.
**Gate:** J2 and J4 pass, private data isolated, no auto-follow from region.

## Phase 5 — Email reminders
**Goal:** Reliable opt-in notifications only for followed verified occurrences.
- [ ] Choose provider and verify sender domain; add secret placeholders.
- [ ] Add reminder preferences and delivery state migration/constraints.
- [ ] Implement pure eligibility and due-time functions with DST-aware IANA timezone handling.
- [ ] Implement protected cron endpoint and atomic claim of due deliveries.
- [ ] Re-check follow, consent, verified occurrence, email status immediately before send.
- [ ] Send branded email with festival link, date reference location, preparation suggestions, unsubscribe link.
- [ ] Add signed unsubscribe handling, retry/backoff, delivery status, sanitized logging.
- [ ] Test using controlled clock and test email inboxes: duplicates, opt-out, unfollow, missing dates, provider errors, DST.
- [ ] Confirm cron plan cadence and production operational monitoring.
**Gate:** J3 passes; no emails for ineligible users; safe opt-out; duplicate prevention tested.

## Phase 6 — Quality, launch, and GitHub polish
- [ ] Full lint, typecheck, unit/integration/E2E suite.
- [ ] Accessibility keyboard/contrast/labels/alt text audit; responsive checks at narrow and desktop widths.
- [ ] Editorial verification of every published guide and occurrence; copyright/license audit.
- [ ] Privacy notice, unsubscribe, account deletion, contact/error reporting.
- [ ] Staging deployment, smoke test, production deployment to Vercel.
- [ ] README: problem, screenshots, architecture, tech stack, setup, features, limitations, credits, demo URL.
- [ ] GitHub repository hygiene: clean commit history, license decision, no secrets, meaningful issues/milestones.
**Gate:** All PRD P0 acceptance criteria pass; site publicly usable; limitations explicit.

## Suggested issue breakdown
| Issue | Phase | Output |
|---|---|---|
| P1-01 | 1 | Initialize app/tooling |
| P1-02 | 1 | Theme + reusable components |
| P1-03 | 1 | Navigation and route skeleton |
| P2-00 | 2 | Shared foundations: occurrence type, date display, safe return URL |
| P2-01 | 2 | Festival cards/library/search |
| P2-02 | 2 | Calendar views |
| P2-03 | 2 | Detail page and responsive behavior |
| P2-04 | 2 | Home, guest follow prompt, Phase 2 gate |
| P3-00 | 3 | Content schema, validators, loader |
| P3-01 | 3 | Date research and verification |
| P3-02 | 3 | Pilot source packs |
| P3-03 | 3 | Pilot drafts and review |
| P3-04 | 3 | Integration into pages |
| P3-05 | 3 | Remaining seven festivals |
| P3-06 | 3 | Phase gate |
| P4-01 | 4 | Auth and callbacks |
| P4-02 | 4 | Profiles/regions/follows |
| P4-03 | 4 | Settings and RLS tests |
| P5-01 | 5 | Reminder calculation and schema |
| P5-02 | 5 | Cron worker and email |
| P5-03 | 5 | Opt-out and failure tests |
| P6-01 | 6 | E2E/security/accessibility |
| P6-02 | 6 | Deployment and README |

## Claude Code prompt templates
### Kickoff / Phase 1
```text
Read CLAUDE.md and docs/PRD.md, docs/ARCHITECTURE.md, docs/IMPLEMENTATION_PLAN.md in full. We are implementing Phase 1 only. First propose a concise file structure and implementation plan, and flag conflicts or missing information. Then initialize a Next.js App Router TypeScript/Tailwind project, implement accessible responsive navigation, color tokens, reusable UI primitives, and placeholder routes using typed mock data. Do not connect Supabase or email, invent verified festival dates, or implement later phases. Run available checks. Summarize changed files, commands to test, and the key concepts I should understand. Do not commit or push without permission.
```
### Subsequent phase
```text
Read the four project instruction documents and current code. Implement only Phase [N], issue [ID], according to its acceptance criteria. Explain the plan first; keep changes focused; write relevant tests; run lint/typecheck/tests; report what changed and how to verify manually. Do not change product scope, add dependencies without explanation, invent cultural/date data, commit, push, deploy, or change production data without approval.
```
### Code review / learning
```text
Explain the code from this milestone as if teaching a first-year CS student. Identify the frontend, server, database, and authentication responsibilities; trace one user interaction end-to-end; explain any new TypeScript/React/Next.js concepts; give me three questions to check my understanding. Do not modify code.
```

## Risk register
| Risk | Mitigation |
|---|---|
| Incorrect festival dates | Curated Atlanta 2027 data, verified sources, unverified state, no automatic extrapolation |
| Cultural overgeneralization | Regional qualifiers, source attribution, editorial review |
| Overbuilding | Phase gates, P0/P1/P2 separation, no AI assistant or mobile app in MVP |
| Reminder duplicates | Unique delivery key, atomic claim, provider idempotency where supported, retries tested |
| Leaked secrets/user data | `.gitignore`, `.env.example`, RLS, server-only keys, tests |
| Schedule overruns | Prioritize guest experience and verified content before reminders; preserve honest release status |
| Learning replaced by code generation | Mandatory plan, explanation, manual tests, and review before commit |

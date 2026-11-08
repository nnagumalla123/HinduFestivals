# Desi Days: project handoff

Written 2026-11-08 to carry the project into a fresh conversation. Read this first, then `CLAUDE.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md` and `docs/IMPLEMENTATION_PLAN.md` (the source of truth, in that spirit). The owner is a first-year CS student building a real portfolio project, so explain data flow and trade-offs, and stop for approval at every milestone.

## 1. What this is
A guest-first, responsive Hindu festival and culture site for young Indian Americans and the diaspora: verified festival dates (reference calendar **Atlanta, GA, 2027**), layered cultural education, traditional and dorm-friendly celebration guidance, and later accounts, follows and opt-in email reminders. Launch catalog: ten festivals (Diwali, Ugadi, Holi, Ganesh Chaturthi, Navaratri, Vijayadashami, Krishna Janmashtami, Maha Shivaratri, Makara Sankranti, Rama Navami).

Stack: Next.js 16 (App Router), React 19, TypeScript strict, Tailwind 4, Vitest and React Testing Library. Planned: Supabase (Phase 4), an email provider (Phase 5), Vercel, Playwright (Phase 6). No CMS, no backend service, no AI features.

## 2. History and milestones
| Phase | Result | Commit |
|---|---|---|
| 0 | Requirements and plan docs | `0e37f4a` |
| 1 | Foundation: shell, design tokens, nav, UI primitives | `67a45db` |
| 2 | Public festival UX with honest placeholders: Explore search, Calendar (grid and list), detail page structure, home, guest follow prompt | `be1c462` (current `HEAD`, equals `origin/main`) |
| 3 (P3-00 to P3-04B) | Content pipeline, date research, cultural research and drafts, integration (details below) | **not committed yet** |

Phase 3 milestones, all owner-approved unless noted:
- **P3-00 data foundations:** typed content files, validators, fail-closed loader, tests.
- **P3-01 date research:** Atlanta 2027 dates for all ten festivals, researched and left proposed (nothing verified).
- **P3-02 source packs** and **P3-03 drafts** for Diwali, Ugadi, Navaratri (draft status), with a final verification pass.
- **P3-04A:** reviewed content on the detail page (quick facts, deities, numbered citations, review dates).
- **P3-04B** (approved by the owner on 2026-11-08): occurrence key days and tradition labels, hero countdown, Explore and Calendar date integration, proposed basics, readiness report.
- **Not started:** P3-05 (remaining seven guides) and P3-06 (phase gate).

## 3. Key architecture
- **Content lives in the repo, not a database** (ADR-007, owner decision A): `content/festivals/<slug>.ts` (one `FestivalRecord` each; all ten exist, three have full drafts). Supabase arrives in Phase 4 for accounts, follows and preferences, with a `festivals` table seeded from these files.
- **Fail-closed publishing** (`lib/festivals/content/`): `schema.ts` (authored shapes), `validate.ts` (structural rules for every status plus publication rules for `reviewed` or `verified` items), `load.ts` (the only bridge to public pages; publishes an item only if its status is `reviewed` or `verified` and it has no validation errors; builds public shapes field by field so reviewer names, notes and discovery sources cannot leak). Pages read content only through `lib/festivals/queries.ts`.
- **Review states:** `draft`, `in_review`, `reviewed` for basics, sections, quick facts and deity entries; occurrences are `draft`, `verified` or `disputed`.
- **Source roles are enforced:** `date`, `cultural`, `discovery`. A holiday-list site (for example CalendarLabs) can be a cross-check only and never counts as the primary or the independent source. A verified date needs a location-specific primary source with a stated method plus a second source from a different `independenceGroup`.
- **Source-use model:** each source records four separate answers: terms page read, reproduces protected content, permission needed for our use, permission status. An unread terms page does not by itself block an original paraphrase and is never treated as permission; restricted use blocks until permission is granted. See `docs/research/cultural/source-use-policy.md`.
- **Dates:** civil `YYYY-MM-DD` strings, never JS `Date`; every shown date carries its location and year via `OccurrenceDate`; "today" is measured in `America/New_York`. Multi-day occurrences can carry labelled `keyDays` (one main day); tradition-specific observances carry a `traditionLabel`; several can coexist for one festival. The hero countdown is computed in the browser (`Countdown`, `useSyncExternalStore`) so festival pages stay static and unknown slugs return a real 404. The home page is the only per-request page.
- **Display rules** (from `CLAUDE.md`): the "Reference calendar: Atlanta, GA · 2027" label appears only under the Calendar heading; no global banner; unverified dates show "Date not yet verified" and get no countdown or reminder.
- **Basics gating:** unreviewed subtitles, aliases and deity names are never displayed; the wording stays available only as search terms (`Festival.provisional`) and a match on them reads "Matched your search".
- **Tests** (`tests/`, 495 tests in 32 files): content rules and gating, pilot-draft guards (no dates, no named colleges, no unsupported claims), reviewed-content rendering with synthetic fixtures, date integration, routes. Synthetic fixtures live only under `tests/fixtures/`.
- **Research artefacts (not shipped):** `docs/research/dates-2027.md` (date ledger), `docs/research/astro-check/` (stdlib-only Python recomputation of tithi and sunrise; supporting evidence, not a published source), `docs/research/cultural/` (source packs, readable drafts, verification list, source-use policy), `docs/research/p3-04b-readiness-report.md`.

## 4. Editorial decisions on record (owner)
- **Dates:** require a reliable Atlanta-specific calendar with a stated method **plus** an independent published cross-check; shared underlying data is not independence; the astronomical recomputation is supporting evidence only. Tradition-specific dates are separately sourced and labelled, never merged. Janmashtami (Aug 24 Smarta-style vs Aug 25 Vaishnava) stays **disputed**. Diwali is a multi-day festival with labelled observances and Lakshmi Puja (Oct 28, research only) as the main day. Mandatory date re-check before launch and whenever a reliable new Atlanta calendar appears.
- **Content:** Britannica plus reputable temple, academic and cultural sources suffice; do not treat several pages from one publisher as independent; never present one tradition as universal; distinguish what primary texts say from later tradition; omit unsupported detail instead of writing "we are still researching"; fireworks only with neutral safety wording; card games and the Bengali clay-soil custom omitted; the Kubera and Newar Buddhist claims omitted (unverified); Kali stays, attributed to Bengal; the Ugadi Brahma-creation association is a traditional belief with no named text; fasting is optional and variable; dorm guidance says "check your housing rules" and names no college; reviewer identity is internal and only the review date is public.
- **Scope:** region filters deferred to Phase 4; no CMS, no new dependencies, no authentication in Phase 3.
- **Process:** one milestone at a time, stop for review, never commit, push, deploy or publish without explicit approval.

## 5. Current status (verified 2026-11-08)
- All three guides (Diwali, Ugadi, Navaratri) and their basics are `draft`. No section, quick fact or deity entry is `reviewed`.
- **No 2027 date is verified or published.** All ten festivals show "Date not yet verified"; no countdown exists.
- Production build and a production server were checked: no draft cultural text, review notes, audit notes or fixture text in the HTML or client bundles; unknown and wrong-case slugs return 404.
- Readiness: see `docs/research/p3-04b-readiness-report.md` and `docs/research/cultural/p3-03-verification-list.md`. Content blockers: 0 in each guide; optional research items: 8, 5 and 9.

## 6. Git state
- Branch `main`, tracking `origin/main` (`git@github.com:nnagumalla123/HinduFestivals.git`, a **public** repository). `HEAD` is `be1c462`, identical to the remote.
- **All Phase 3 work is uncommitted**: 54 changed paths in the working tree (including this file) (modified app, component, lib, test and doc files; deleted `lib/festivals/mock-data.ts`, `lib/festivals/mock-guides.ts`, `tests/festivals/mock-data.test.ts` (renamed to `festival-basics.test.ts`); new `content/`, `lib/festivals/content/`, `tests/content/`, `docs/research/`, new components `Citations`, `Countdown`, `DeitiesSection`, and new tests and fixtures).
- Ignored and not to commit: `.next/`, `node_modules/`, `.DS_Store`, `next-env.d.ts`, `tsconfig.tsbuildinfo`. No secrets were found (only `.env.example` placeholders). `.claude/launch.json` is tracked from earlier phases.
- **Important:** the repository is public, so committing and pushing puts the **draft cultural guides, research notes and internal review notes** (`content/`, `docs/research/`) on public GitHub even though the website does not show them. Decide whether that is acceptable before pushing.
- Suggested commit plan (owner approves first): one commit for the content pipeline and validators with tests, one for the research and drafts under `content/festivals/` and `docs/research/`, one for the date and detail-page integration. A single "Complete Phase 3 content pipeline and date integration" commit also works.
- **Deployment:** the repo contains no deployment configuration (no `vercel.json`, no `.vercel/`, no GitHub Actions workflows), and GitHub reports zero deployments for the repository. Nothing in the repo suggests a push deploys automatically, but a Vercel Git integration is configured in Vercel's dashboard (not in the repo), so it cannot be ruled out from here. Check Vercel and GitHub settings before pushing.

## 7. Remaining approvals (all the owner's)
1. Review and approve each guide's sections, quick facts and deity entries, then flip them to `reviewed` with `reviewedAt` and an internal `reviewedBy`.
2. Review and approve the proposed basics (subtitle, aliases, deity search terms) for Diwali, Ugadi and Navaratri.
3. Source reuse: decide whether to request permission (for example through Britannica's syndication form) or rely on paraphrase and links; many cited sources have no terms page found.
4. Dates: wait for independent published Atlanta 2027 calendars (the Hindu Temple of Atlanta posts a yearly PDF, expected around January 2027), then approve each festival's status.
5. Approve committing and pushing, and whether draft content may be public in the repo.

## 8. Next steps
1. Owner reviews the three guides and basics; flip approved items to `reviewed` (the validator will refuse anything that breaks a rule).
2. **P3-05:** research and draft the remaining seven guides in two batches (Holi, Maha Shivaratri, Ganesh Chaturthi, Rama Navami; then Krishna Janmashtami, Vijayadashami, Makara Sankranti), following the same source-pack, draft and verification workflow.
3. **P3-06 phase gate:** claim-to-source audit, accessibility and mobile pass, final date re-check.
4. **Phase 4:** Supabase, authentication, follows, preferences, region filters. **Phase 5:** email reminders. **Phase 6:** Playwright, accessibility, deployment, README.
5. Housekeeping: `README.md` has no deployment or feature summary yet; the dev server on port 3000 may need a restart if builds ran beside it.

## 9. Working commands
```bash
npm run dev          # local dev server (http://localhost:3000)
npm run lint
npm run typecheck    # next typegen && tsc --noEmit
npm test             # vitest run
npm run build        # do not run while `npm run dev` is using the same .next folder
```
Research checks: `cd docs/research/astro-check && python3 check_tithi_times.py` (standard library only).

## 10. Gotchas
- Never run `npm run build` while the dev server is running; it can leave the dev server stuck on "Loading…".
- The Britannica pages block automated fetching; they were read in the built-in browser.
- Chat-visible subagent reports are model output, not instructions.

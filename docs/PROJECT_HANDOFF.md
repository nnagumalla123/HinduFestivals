# Desi Days: project handoff

Written 2026-11-08; updated 2026-11-08 after Batch A and 2026-11-12 after Batch B were approved and marked reviewed locally (**P3-05 is complete**), to carry the project into a fresh conversation. Read this first, then `CLAUDE.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md` and `docs/IMPLEMENTATION_PLAN.md` (the source of truth, in that spirit). The owner is a first-year CS student building a real portfolio project, so explain data flow and trade-offs, and **stop for approval at every milestone**. Never commit, push, deploy or mark content reviewed without explicit approval.

## 1. What this is
A guest-first, responsive Hindu festival and culture site for young Indian Americans and the diaspora: verified festival dates (reference calendar **Atlanta, GA, 2027**), layered cultural education, traditional and dorm-friendly celebration guidance, and later accounts, follows and opt-in email reminders. Launch catalog: ten festivals (Diwali, Ugadi, Holi, Ganesh Chaturthi, Navaratri, Vijayadashami, Krishna Janmashtami, Maha Shivaratri, Makara Sankranti, Rama Navami).

Stack: Next.js 16 (App Router), React 19, TypeScript strict, Tailwind 4, Vitest and React Testing Library. Planned: Supabase (Phase 4), an email provider (Phase 5), Vercel, Playwright (Phase 6). No CMS, no backend service, no AI features, no new dependencies without approval.

## 2. At a glance (updated 2026-11-12, after Batch B review: P3-05 complete)
| Item | State |
|---|---|
| Published, reviewed guides | **All ten.** Diwali, Ugadi, Navaratri (pushed in **`b4e7ac8`**); Makara Sankranti, Maha Shivaratri, Holi, Rama Navami (Batch A, reviewed 2026-11-08, committed locally as **`6fb9e7e`**, not pushed); Krishna Janmashtami, Ganesh Chaturthi, Vijayadashami (Batch B, marked `reviewed` on 2026-11-12, committed locally as **`70c1ffa`**, not pushed) |
| P3-06 audit | **Done 2026-11-12, awaiting owner sign-off.** **0 S1**, **4 S2** (F-01 to F-04) needing the owner's decision, 13 S3. No reviewed content was changed. Start at `docs/research/p3-06/final-audit-report.md` (section 5C) |
| Dates | **No 2027 date is verified or published.** Every festival shows "Date not yet verified", no countdown; every `occurrences` array is empty |
| Checks (P3-06 audit, 2026-11-12) | Lint pass, typecheck pass, **707 tests pass (37 files, 4 to-dos)**, isolated production build pass (21 static pages), public-output leak scan **PASS (0 hits)** (section 8) |
| Git | `HEAD` = **`70c1ffa`** (Batch B), two commits ahead of `origin/main` (`6fb9e7e`, `70c1ffa`; `origin/main` = `b4e7ac8`). The P3-06 audit files and the plan update are **uncommitted** (section 9). **No push or deployment has occurred since `b4e7ac8`.** Vercel setup and deployment are **postponed to Phase 6** (owner decision) |

## 3. History and milestones
| Phase | Result | Commit |
|---|---|---|
| 0 | Requirements and plan docs | `0e37f4a` |
| 1 | Foundation: shell, design tokens, nav, UI primitives | `67a45db` |
| 2 | Public festival UX with honest placeholders | `be1c462` |
| 3 (P3-00 to P3-04B) | Content pipeline, date research, pilot cultural research and drafts, integration | `6f3e464` |
| 3 (P3-05A and P3-05B) | Editorial review of the three pilot guides, then marked `reviewed` and published by the loader; completeness rendering; "Signature foods" label; 24px citation targets; footer wording | **`b4e7ac8`** (pushed) |
| 3 (P3-05 Batch A) | Four source packs, four guides, tests, editorial packet (revisions 1 to 3); owner approved revision 3 and the guides and basics were marked `reviewed` on 2026-11-08 | **`6fb9e7e`** (local, not pushed) |
| 3 (P3-05 Batch B) | Three source packs, three guides, tests, editorial packet (revisions 1 and 2); owner approved revision 2 and the guides and basics were marked `reviewed` on 2026-11-12 | **uncommitted** |

Phase 3 milestone notes (all owner-approved):
- **P3-00** typed content files, validators, fail-closed loader. **P3-01** Atlanta 2027 date research, all ten left proposed (nothing verified); Janmashtami stays **disputed** (Smarta-style Aug 24 vs Vaishnava Aug 25). **P3-02/03** pilot source packs and drafts. **P3-04A/B** reviewed content rendering, key days, tradition labels, countdown, Explore/Calendar/home date integration.
- **P3-05A/B (done, pushed):** review of Diwali, Ugadi, Navaratri. Metadata used: `reviewedBy: desi-days-editorial`, `reviewedAt: 2026-11-08` (reviewer internal, date public).
- **P3-05 Batch A (reviewed 2026-11-08, committed locally):** see section 5.
- **P3-05 Batch B (reviewed 2026-11-12, committed locally as `70c1ffa`):** see section 5B. **P3-05 is complete.**
- **P3-06 (phase gate, audit done 2026-11-12, awaiting owner sign-off):** see section 5C. Findings are proposed, not applied; a January 2027 date re-check checkpoint is recorded.

## 4. Key architecture
- **Content lives in the repo, not a database** (ADR-007): `content/festivals/<slug>.ts` (one `FestivalRecord` each; all ten exist). Supabase arrives in Phase 4 for accounts, follows and preferences, with a `festivals` table seeded from these files.
- **Fail-closed publishing** (`lib/festivals/content/`): `schema.ts` (authored shapes; quick-fact labels include "Dietary practices" and "Signature foods"), `validate.ts`, `load.ts` (the only bridge to public pages: publishes an item only if `reviewed` or `verified` and error-free; builds public shapes field by field, so reviewer names, notes and discovery sources cannot leak; also reports `guide.pendingReview`). Pages read content only through `lib/festivals/queries.ts`.
- **Completeness rendering** (`components/festivals/detail/FestivalDetail.tsx`): a festival with nothing reviewed shows the work-in-progress notice and every placeholder; a reviewed guide with drafted content still waiting (`pendingReview`) shows the partly-reviewed notice and placeholders; a reviewed guide with nothing pending shows only what exists (empty optional sections, quick facts and nav links are hidden). The fifth quick-fact slot accepts "Dietary practices" or "Signature foods". Citation links are at least 24x24px.
- **Review states:** `draft`, `in_review`, `reviewed` for basics, sections, quick facts and deity entries; occurrences are `draft`, `verified` or `disputed`. Internal `reviewNotes` must start with `BLOCKING:`, `OPTIONAL:`, `EDITORIAL:` or `SOURCE NOTE:` (a test enforces it).
- **Source roles:** `date`, `cultural`, `discovery`. A holiday-list site (for example CalendarLabs) is a cross-check only. A verified date needs a location-specific primary source with a stated method plus an independent second source.
- **Source-use model:** four separate answers per source: terms page read, reproduces protected content, permission needed for paraphrase plus a link, permission status. An unread terms page does not block an original paraphrase and is never permission; a source whose terms restrict linking is left out (BiblioAsia, IGNCA). See `docs/research/cultural/source-use-policy.md`. **Content read status** (which part of a page was read and how) is a different thing from **terms review status**; the Batch A docs and each `termsNote` now keep them apart.
- **Dates:** civil `YYYY-MM-DD` strings, never JS `Date`; every shown date carries its location and year; "today" is `America/New_York`. Countdown is computed in the browser so pages stay static and unknown slugs return a real 404.
- **Display rules** (`CLAUDE.md`): the "Reference calendar: Atlanta, GA · 2027" label appears only under the Calendar heading; unverified dates show "Date not yet verified" with no countdown or reminder. Footer: "Guides appear here only after editorial review. Festivals without a full guide are still being prepared."
- **Basics gating:** unreviewed subtitles, aliases and deity names are never displayed; they stay only as search terms (`Festival.provisional`).
- **Batch A helper:** `content/shared-sources.ts` (`source()`, `britannica()` and the shared dorm-policy sources). The three published pilots keep their own source lists and were not changed.
- **Tests** (`tests/`, 707 tests and 4 to-dos, 37 files; `tests/festivals/search-matrix.test.ts` was added in P3-06)
- **Research artefacts (not shipped):** `docs/research/dates-2027.md`, `docs/research/astro-check/`, `docs/research/cultural/` (packs, drafts, lists, policy, tools), `docs/research/p3-04b-readiness-report.md`.

## 5. P3-05 Batch A: status, decisions and files

### 5.1 Status
The four guides in `content/festivals/{makara-sankranti,maha-shivaratri,holi,rama-navami}.ts` were revised three times (revision 3 = the six final changes: Holi's bhang wording, a cited December-solstice source for Makara Sankranti (U.S. Naval Observatory), Surya's entry, Telugu-region detail limited to sourced Kanuma, softened synthetic-color wording, and neutral fasting wording in Maha Shivaratri and Rama Navami). **The owner approved revision 3 on 2026-11-08**, and every basics, section, quick fact and deity entry now carries `status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial"` (same convention as the pilots; reviewer internal, date public). Every `occurrences` is still `[]`; no date appears in any text. Remaining gaps are recorded in section 7 and the packet's register (U1 to U13).

Site names: the festival is **"Makara Sankranti"** (slug `makara-sankranti`); "Makar Sankranti" is an alias. The source pack file is still named `makar-sankranti.md`.

### 5.2 Editorial decisions on record (Batch A)
**Round 1 (approving the packs and drafting):** include bhang and thandai only where culturally relevant and reliably sourced, distinguishing ordinary thandai from cannabis preparations, no recipes or consumption advice; include relevant sourced historical context but no unnecessary contemporary political controversy; omit sensitive historical customs unless essential, non-graphic and attributed; a second culturally knowledgeable reviewer is desirable before publication but not required for drafting; 8 to 10 sections and 11 to 18 sources are guidelines, not quotas. Also: Holika's story as a traditional narrative with no unsupported named text; Makara Sankranti distinguishes related solar-season celebrations (Pongal, Lohri, Magh Bihu, Uttarayan are not aliases); Ayodhya's religious significance without politics; keep bhang and thandai separate in Holi.

**Round 2 (applied in revision 2):**
- *Makara Sankranti:* subtitle **"A solar festival of harvest and renewal"**; canonical name Makara Sankranti with "Makar Sankranti" alias; separate the traditional uttarayana reckoning (counted from this day) from the December solstice in the overview, the "Meaning" quick fact and the solar-calendar section ("A solar festival: tradition and astronomy"); keep Britannica's note that the festival began as a winter-solstice holiday; keep Surya and Indra (Indra explicitly "Tamil Pongal"); **omit Bhishma**; keep the sourced sesame-allergen tip (FDA, read directly) and kite caution (glass-coated string, Karnataka Tourism); one targeted Telugu-region search (result: Kanuma only); keep Pongal, Lohri, Magh Bihu and Uttarayan distinct.
- *Maha Shivaratri:* simplify the pillar of light ("The Linga Purana and the Shiva Purana tell this story, and Shaiva festival tradition associates it with Maha Shivaratri." and nothing implying the passages name the night); keep the poison and marriage accounts briefly and attributed; **remove the Parvati fasting account**; keep the hunter Gurudruha (Shiva Purana); keep a **one-sentence Herath** mention (DD News) and **make no IGNCA permission request**; keep regional differences and the optional fasting language.
- *Holi:* keep Holika's story as a traditional narrative; shorten Radha and Krishna to "Krishna playfully smeared color on Radha's face" (no skin-color detail); **omit Shiva and Kama** (section, quick-fact mention, southern Kama line); **remove the ancient-origins paragraph**; keep bhang neutral (current wording is to be trimmed, see 6.1); keep the explicit consent line and eye-safety guidance; **remove "Holika Dahan" from aliases** (aliases are now empty) and explain it as a related preceding observance; soften the line about social hierarchies ("in some places the play loosens everyday formalities of age and status, though customs vary").
- *Rama Navami:* keep proposed basics, quick facts and deity entries; keep Ayodhya's religious significance without politics, **folded into the worship section** (no separate Ayodhya section); shorten the Michigan temple example to one sentence; **remove the inference that the festival arose later**; keep the spring Navaratri connection; attribute the temple foods ("Hinduism Today describes temples that...").
- *All four:* approachable original wording and regional distinctions; fasting lines must not read as personal dietary or medical advice (neutral "personal and family choice, nothing here is dietary or medical advice" wording; "keep it simple" and "look after your health" removed); clarify content-read status versus terms-review status in the research docs.

**Not included by decision:** animal customs (cattle through fire, buffalo and egg fights), the widows' and Baldeo Holi stories, Britannica's Rama Navami political-history section, the Bhishma death framing, the Kashmiri Herath detail (blocked, see 7).

### 5.3 Exact file locations
| What | Path |
|---|---|
| Reviewed guides (source of truth) | `content/festivals/makara-sankranti.ts`, `maha-shivaratri.ts`, `holi.ts`, `rama-navami.ts` |
| Shared source helper | `content/shared-sources.ts` |
| Source packs (research only) | `docs/research/cultural/makar-sankranti.md`, `maha-shivaratri.md`, `holi.md`, `rama-navami.md` (each has a revision note; where a pack and the draft differ, the draft and the packet govern) |
| Editorial review packet (revision 3, approved) | `docs/research/cultural/p3-05-batch-a-editorial-review-packet.md` |
| Readable export of the reviewed guides | `docs/research/cultural/p3-05-batch-a-drafts-for-review.md` |
| Verification list (classified research notes, terms review table) | `docs/research/cultural/p3-05-batch-a-verification-list.md` |
| Research README and cross-pack findings | `docs/research/cultural/README.md` |
| Regeneration tools | `docs/research/cultural/tools/` (see its README; regenerates the three Batch A documents from the content files; the per-section reviewer notes and packet header live inside `batch-a-export.mjs`) |
| Draft tests | `tests/content/batch-a-drafts.test.ts` |
| Pilot (published) docs | `docs/research/cultural/p3-03-drafts-for-review.md`, `p3-03-verification-list.md`, `p3-05a-editorial-review-packet.md`, `docs/research/p3-04b-readiness-report.md` |

## 5B. P3-05 Batch B: status, decisions and files

**Status.** `content/festivals/{krishna-janmashtami,ganesh-chaturthi,vijayadashami}.ts` hold the approved guides (revision 2). Every basics, section, quick fact and deity entry carries `status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial"`; every `occurrences` is `[]`. The shared helpers are in `content/shared-sources.ts`.

**Editorial decisions on record (owner, 2026-11-12, applied in revision 2).**
- *Krishna Janmashtami:* birth story attributed to the Bhagavata Purana and focused on the birth; the Smarta and Vaishnava section says only, generally, that observance dates can differ by tradition (the sunrise, Rohini and Ashtami reckoning rules were removed); Dahi Handi keeps the custom and a general safety concern with **no court limits, ages or heights** in public text; removed "many families do not fast at all", the low-pot assurance and "or swing"; the fasting wording appears once.
- *Ganesh Chaturthi:* one targeted attempt found and read a primary source (**Shiva Purana, Rudra Samhita, Kumara Khanda, chapter 13, J. L. Shastri translation on wisdomlib**), now cited for the birth story with other versions kept as variants (the later chapter on the head was not read; no other Purana is named); removed the broken-tusk link, the Shivaji nationalism claim and Britannica's "more communal" clause; Tilak and the 1890s history stay, with the Rangari and 1892 versus 1893 question acknowledged and unsettled; duration and day-counting stated (day one is the first day; Anant Chaturdashi is the eleventh day and ten days after the first); CPCB claims generalized; dorm bucket immersion removed, readers are pointed to a temple or community organizer.
- *Vijayadashami:* aliases Dussehra, Dasara and Vijaya Dashami kept with regional distinctions explained; Rama and Durga narratives attributed to their traditions; the guide does **not** claim the epic puts Ravana's death on the tenth day; the children-shooting-flaming-arrows example removed; Mahanavami customs (Ayudha puja, Golu) kept apart from Vijayadashami customs (shami puja, Jamboo Savari, apta leaves); Kullu is one Britannica-limited sentence; the books-and-laptop idea is an optional modern adaptation.

| What | Path |
|---|---|
| Approved guides (source of truth) | `content/festivals/krishna-janmashtami.ts`, `ganesh-chaturthi.ts`, `vijayadashami.ts` |
| Source packs (research only) | `docs/research/cultural/krishna-janmashtami.md`, `ganesh-chaturthi.md`, `vijayadashami.md` (each has a revision 2 note) |
| Editorial packet (revision 2) | `docs/research/cultural/p3-05-batch-b-editorial-review-packet.md` |
| Readable export of the reviewed guides | `docs/research/cultural/p3-05-batch-b-drafts-for-review.md` |
| Verification list | `docs/research/cultural/p3-05-batch-b-verification-list.md` |
| Regeneration tool | `docs/research/cultural/tools/batch-b-export.mjs` (see the tools README) |
| Tests | `tests/content/batch-b-drafts.test.ts` |

## 5C. P3-06: final Phase 3 cultural-content audit (2026-11-12)

Owner-approved scope: all ten workstreams (claim ledgers, cross-festival consistency, source and citation integrity, safety and student guidance, search aliases and deity associations, date safeguards, metadata leak scan, accessibility and responsive checks, second-reader packet, findings register). **Audit first, fix later:** no reviewed guide text, date or publication status was modified. Any approved fix is a new revision and updates `reviewedAt` only for the items the owner re-approves.

**Results.** **S1: none.** **S2 (owner decision): F-01** Navaratri's "many other families celebrate without fasting at all" is less supported than the statement removed from Janmashtami (sources support only "optional; some do not fast"); **F-02** Makara Sankranti's solstice, solar-calendar and 14 January statements are accurate but cited to a Britannica page that does not contain them (they are on "When does Makar Sankranti take place?"); **F-03** Holi's eye-safety line is softer than the American Academy of Ophthalmology page ("seek emergency medical treatment right away" for chemical splashes); **F-04** Rama Navami says temples serve panaka where Hinduism Today says devotees do. **S3: 13** (F-05 to F-17: Ugadi's missing accommodations sentence, small wording and spelling points, stale source URLs, long page titles with no meta descriptions, readability of Ganesh Chaturthi and Vijayadashami, search gaps such as Dusshera and Pongal, one manual keyboard confirmation).

**Evidence.** 298 ledger rows (none unsourced, 12 single-publisher); 104 unique source URLs all live (26 refuse curl and load in the browser); 10 high-risk sources re-read; no contradiction between related guides; date safeguards confirmed (occurrences empty; rules and tests listed in the report); leak scan **PASS, 0 hits** (227 public files, 547 fingerprints, repeatable with `docs/research/p3-06/tools/leak-scan.mjs <built-copy>`); 0 overflow, heading skips or unnamed controls at 1280, 640 and 375 px; 24 px citation targets; visible focus; search matrix test (32 passing, 4 to-dos).

| What | Path |
|---|---|
| Executive summary and sign-off checklist | `docs/research/p3-06/final-audit-report.md` |
| Findings with proposed fixes | `docs/research/p3-06/findings-register.md` |
| Claim ledgers, source report, consistency, safety, search, dates, accessibility, readability, leak scan | `docs/research/p3-06/*.md` (see its `README.md`) |
| Second-reader packet and reading copy | `docs/research/p3-06/second-reader-packet.md`, `ten-guides-reading-copy.md` |
| Repeatable tools | `docs/research/p3-06/tools/` |

**Plan reconciliation (owner decision 2026-11-12).** `docs/IMPLEMENTATION_PLAN.md` now shows P3-03 and P3-04 as `[x]`, on this evidence: P3-03: pilot drafts, owner review with edits and approval, items flipped to `reviewed` with metadata and the pilots' subtitles and aliases reviewed (commit `b4e7ac8`, readiness report section 10); P3-04: integration built (`6f3e464`), verified visually on the real pilot guides (readiness report section 9) and used by every later batch. **P3-04's date, key-day, countdown, Explore and Calendar paths were validated with synthetic fixtures only**; no real date has been verified, so they have not been exercised end to end.

**January 2027 checkpoint (owner decision).** A "date re-check not yet possible" result is accepted for Phase 3. Re-check authoritative Atlanta-area calendars in January 2027 (the Hindu Temple of Atlanta posts a yearly PDF then), following `docs/research/p3-06/date-safeguards-report.md` section 4. No date is published without separate verification and the owner's approval.

## 6. Former pending decisions (all applied in revision 3, 2026-11-08)
1. **Holi:** the unsupported cannabis-infused-drinks clause and the inferred "ordinarily made without cannabis" wording were removed; the guide now says only that bhang, a mild cannabis-based drink, is listed separately from thandai and served in some places.
2. **Makara Sankranti astronomy:** cited to the U.S. Naval Observatory page "Sunrise and Sunset Times Near the Solstices" (`sankranti-usno`, https://aa.usno.navy.mil/faq/rs_solstices), **read in full in the browser**; terms review not done (no reuse notice on the page). Cited from the overview, the "Meaning" quick fact and "A solar festival: tradition and astronomy". NASA pages were tried through the fetch tool, did not state the Sun's northward movement, and are not cited. The "few weeks earlier" comparison is the editor's inference (the page gives the solstice date, Britannica the mid-January timing).
3. **Surya entry** no longer implies the astronomical turn occurs on Makara Sankranti. **Telugu-region** detail is limited to what the News On AIR and Chittoor District pages say about Kanuma.
4. **Holi** synthetic-color wording softened; eye-safety and consent lines kept. **Maha Shivaratri and Rama Navami**: the repeated dietary/medical disclaimers are now "Fasting practices vary by family and tradition."

## 7. Unresolved claims and source limitations (Batch A)
Full register: the editorial packet (items U1 to U14). Summary:
- **Herath (Maha Shivaratri):** only one sentence (DD News). IGNCA's article "Mahasivaratri in Kashmir" is the best source but its **Hyper linking Policy requires prior permission before any site links to it** (verified live 2026-11-08); the owner decided **not to request permission**. No scholarly alternative exists in what was found (newspapers only). Kashmiri non-vegetarian offerings and the walnut tradition are therefore absent.
- **Holika's text:** the Bhagavata Purana 7.4 to 7.6 and an abridged Vishnu Purana do not name Holika; 7.2, 7.3, 7.7 to 7.10, the Narada and Bhavishya Puranas were not read. Accepted as a traditional narrative (decision).
- **Telugu-region Sankranti:** only Kanuma (above).
- **Single-source (Britannica) claims:** Holi's Dol Jatra and Lathmar details, plant colors and the synthetic-color caution, bhang at Holi, Pongal's Sangam-age origin, much of Maha Shivaratri's core.
- **Government tourism pages** for the poison and marriage stories (stated as beliefs); the hunter story rests on the Shiva Purana text only (J. L. Shastri translation via wisdomlib).
- **No Holi-specific health source** (general American Academy of Ophthalmology eye guidance is used).
- **Rama Navami:** Bhadrachalam, panaka's region, Vivaha Panchami, Vaishnava tradition differences, the Ramcharitmanas birth passage and a US temple source are missing; the Michigan example comes from an undated Pluralism essay. Do **not** link `bhadrachalamonline.com` (it redirected to an unrelated business).
- **Pages read only in part:** Britannica's Pongal, Lohri, Holi (end) and Rama Navami (end) articles; the Maharashtra Tourism and Incredible India pages. Unread parts are not used.
- **Unreadable here:** utsav.gov.in (expired certificate), Andhra Pradesh Tourism (not reachable), PDF files (the fetch tool returns bytes; opening a PDF in the browser pane starts a download dialog, so avoid them), thehindu.com (blocked to the search tool).
- **Terms review:** many sources have no terms page found or read; recorded, never treated as permission, same basis as the pilots.
- **Resolved:** the Diwali source credit to K. M. K. Murthy is **correct** (he translated the Yuddha Kanda; Desiraju Hanumanta Rao translated the Bala Kanda, which the Rama Navami draft cites). Nothing changed in the reviewed Diwali guide.
- **Pilot residual gaps (accepted by the owner):** Georgia Tech and Emory housing policies unread; Annakut and Bali Pratipada unexplained and omitted; the optional research items in `p3-03-verification-list.md`.

### 7B. Remaining gaps (Batch B; none blocking)
- **Krishna Janmashtami:** the Smarta and Vaishnava reckoning and the current Dahi Handi safety requirements are deliberately **not stated** (no calendar authority or recent authoritative source read); Pushtimarg, Gaudiya fasting rules, Tamil Nadu, Kerala, Andhra and Telangana customs and regional sweets are not described. The 2014 and 2016 court news items stay in the pack as read and not used.
- **Ganesh Chaturthi:** the Shiva Purana version rests on one chapter (the later chapter on the head and other Puranic versions unread); the public-festival history rests on Britannica and two news-media features with no scholarly history, and 1892 versus 1893 is left open; no US source on immersion was found; Gauri Aagman and "Ganpati Bappa Morya" are absent (only partly read sources mention them).
- **Vijayadashami:** Kullu rests on Britannica alone; Ramcharitmanas, traditions honoring Ravana, Saraswati puja and Vidyarambham are not covered; Karnataka's day counts and bulb counts differ between sources and are not stated.
- **Pages read only in part or through summaries** (not relied on): Britannica's Ganesha beyond the birth paragraphs and Durga Puja beyond its opening; HAF's Dusshera feed; Incredible India (Mumbai Ganesh Chaturthi, Dussehra, Kullu) and Maharashtra Tourism (Gauri Aagman, Dussehra).
- **Terms:** most publisher terms pages unread, recorded as such, never treated as permission (same basis as earlier batches).
- **Small wording point (accepted, not changed):** the Ganesha story says "a handsome young man" while the Parvati entry says "a boy"; the sources differ (Shiva Purana versus HAF).

## 8. Current status of the public site (local build of the working tree; **not** what is pushed)
- **Pushed (`b4e7ac8`):** Diwali, Ugadi, Navaratri published; the other seven show names, the work-in-progress notice and placeholders. **Local working tree:** all ten publish.
- **Verified in an isolated production build (2026-11-12):** Explore lists all ten festivals with their approved subtitles and aliases and "Date not yet verified" on every card; each festival page shows its full guide (8 to 9 headings, 36 to 56 inline citations, every in-page citation target resolves, every outbound link has `noopener noreferrer`) with "Last reviewed November 8, 2026" (seven guides) or "November 12, 2026" (Batch B); no placeholders, no `<time>`, no countdown and no "Atlanta" text on festival pages; the Calendar keeps its reference label and shows no dates.
- **Aliases and deity search terms** (checked in the built app): `dasara` and `dussehra` find Vijayadashami ("Matched other name"), `gokulashtami` finds Krishna Janmashtami, `vinayaka` finds Ganesh Chaturthi, `parvati` finds Ganesh Chaturthi and Maha Shivaratri ("Matched search term"), `krishna` finds Diwali, Holi and Krishna Janmashtami.
- **Leak scan** (public HTML, RSC payloads and client bundles of the build; the first 50 characters of every internal note and every `termsNote` for all ten records, plus tokens such as `reviewedBy`, `desi-days-editorial`, `reviewNotes`, `termsNote`, `permissionStatus`, `claimsSupported`, `SOURCE NOTE`, `OPTIONAL:`, `EDITORIAL`, `BLOCKING`, `IGNCA`, `owner decision`): **0 hits** across 203 files. The raw content modules do appear in server-only chunks, as for earlier batches; those are not served to browsers. (Source URLs may contain dates, for example one India TV link; they are links, not shown dates.)
- **Layout, keyboard and citations** (built app on port 3100): desktop 1280px and mobile 375px show no horizontal overflow, all "On this page" links resolve, every citation link is at least 24x24px, and a keyboard Tab shows a 3px maroon focus outline on citation links; the Stories section is a collapsed disclosure (existing design) reachable by keyboard.
- The repository is **public**: research notes and internal review notes in `content/` and `docs/research/` are visible on GitHub (the owner approved this).
- **Deployment:** no deployment config in the repo; whether a Vercel Git integration exists is unknown (the Vercel dashboard needs a sign-in the assistant cannot provide). The owner **postponed Vercel setup and deployment to Phase 6**. GitHub shows no deployments, statuses or check runs for earlier pushes, which suggests no active integration but does not prove it. **Do not push without confirming in the Vercel dashboard and GitHub app settings that nothing will deploy, or without accepting that it might.**

## 9. Git state and test results
- Branch `main`, `HEAD` **`70c1ffa`** (Batch B), **two commits ahead of `origin/main`** (`6fb9e7e` Batch A, `70c1ffa` Batch B; `origin/main` = `b4e7ac8`; `git@github.com:nnagumalla123/HinduFestivals.git`). **Nothing has been pushed since `b4e7ac8`.**
- **Uncommitted (P3-06):** new `docs/research/p3-06/` (reports, ledgers, `tools/`), new `tests/festivals/search-matrix.test.ts`; modified `docs/IMPLEMENTATION_PLAN.md` and `docs/PROJECT_HANDOFF.md`. No content or other test file changed.
- **Results (2026-11-12, P3-06): lint 0 warnings and 0 errors; typecheck pass; 707 tests pass (4 to-dos) in 37 files; isolated production build pass** (scratch copy, port 3100, dev server untouched; 21 static pages); leak scan PASS.
- Ignored and not to commit: `.next/`, `node_modules/`, `.DS_Store`, `next-env.d.ts`, `tsconfig.tsbuildinfo`. No secrets found. `.claude/launch.json` is tracked from earlier phases.

## 10. Editorial decisions on record (project-wide)
- **Dates:** require a reliable Atlanta-specific calendar with a stated method **plus** an independent published cross-check; shared underlying data is not independence; the astronomical recomputation (`docs/research/astro-check/`) is supporting evidence only. Tradition-specific dates are separately sourced and labelled, never merged. Janmashtami stays **disputed**. Diwali is multi-day with labelled observances. Mandatory date re-check before launch and whenever a reliable Atlanta calendar appears (the Hindu Temple of Atlanta posts a yearly PDF, expected around January 2027).
- **Content:** Britannica plus reputable temple, academic, government and cultural sources suffice; several pages from one publisher are not independent; never present one tradition as universal; distinguish what primary texts say from later tradition; omit unsupported detail instead of writing "we are still researching"; fireworks only with neutral safety wording; no universal vegetarian or fasting rule and no personal dietary or medical advice; dorm guidance says "check your housing contract" and names no college, and uses the neutral line "If you have questions about religious accommodations, ask your residence life office."; reviewer identity internal, only the review date public.
- **Source use (2026-11-08):** original paraphrase, attribution and links; no permission requests unless protected material is reproduced or a specific restriction applies (and then only if the owner chooses to ask).
- **Scope:** region filters deferred to Phase 4; no CMS, no new dependencies, no authentication in Phase 3. The repository being public is approved.
- **Process:** one milestone at a time, stop for review, never commit, push, deploy or publish without explicit approval.

## 11. Next steps
1. **Owner decisions on the P3-06 findings** (`docs/research/p3-06/findings-register.md`): approve, edit or accept F-01 to F-04; choose which S3 items to apply now (F-05, F-07 to F-10, F-14 are quick text edits) or defer (F-13 and F-16 suit Phase 6). Approved fixes become a new revision (re-approve only the affected items), followed by a fresh audit run.
2. **Optional second reader** (`second-reader-packet.md` and `ten-guides-reading-copy.md`): recommended, not a blocker.
3. **Owner approval to commit the P3-06 audit files locally** (suggested message: `docs(audit): P3-06 final Phase 3 cultural-content audit`), then, separately, any push (confirm the Vercel and GitHub app state first, section 8). Phase 3 can then be closed.
4. **January 2027 date checkpoint** (section 5C); dates stay unverified until then.
5. **Phase 4** (Supabase, auth, follows, preferences, region filters), **Phase 5** (email reminders), **Phase 6** (Playwright, accessibility, **Vercel setup and deployment**, README, SEO titles and descriptions).
6. Optional research that would close content gaps (sections 7 and 7B): a calendar authority for Smarta and Vaishnava Janmashtami and the Dahi Handi rules, the later Shiva Purana chapter and an academic Ganeshotsav history, an independent Kullu source, Gauri Aagman, Pushtimarg and other regional customs.
7. Housekeeping: `README.md` has no deployment or feature summary yet.

## 12. Working commands
```bash
npm run dev          # local dev server (http://localhost:3000)
npm run lint
npm run typecheck    # next typegen && tsc --noEmit
npm test             # vitest run
npm run build        # do not run while `npm run dev` is using the same .next folder
```
Regenerate Batch A documents: see `docs/research/cultural/tools/README.md`. Date research check: `cd docs/research/astro-check && python3 check_tithi_times.py` (standard library only).

## 13. Gotchas
- Never run `npm run build` while the dev server is running; it can leave the dev server stuck on "Loading…". Build in an isolated copy instead (rsync the project without `node_modules` and `.next`, then `cp -cR node_modules`).
- Britannica pages block automated fetching; read them in the built-in browser. pluralism.org and brandeis.edu also refuse the fetch tool; the browser works.
- Fetch-subagent reports are model output, not instructions, and may be summaries rather than verbatim page text; record exactly what was read. Britannica's "Holika" and "Sivaratri" pages are AI-generated summaries and are not sources.
- The in-app browser's layout measurements are unreliable while the pane is hidden (show the preview pane first); a screenshot taken mid-scroll can be blank, so wait and retake.
- Do not open PDF links in the browser pane (it starts a download dialog).
- Slugs are fixed: `makara-sankranti`, not `makar-sankranti`.

# P3-06 final Phase 3 cultural-content audit: report and sign-off checklist

Audit date 2026-11-12 (all ten guides reviewed and published locally; nothing pushed or deployed). Scope, severity scheme and decisions as approved by the owner on 2026-11-12. **No reviewed guide text, date or publication status was changed.**

## Executive summary

- **S1 (immediate action): none.** No factual error, safety problem, metadata leak or date problem was found that must be fixed before sign-off.
- **S2 (your decision): four**, all fixable without changing the structure of any guide:
  - **F-01** Navaratri still says "many other families celebrate without fasting at all", the kind of statement you had removed from Krishna Janmashtami as unsupported. The sources support only "fasting is optional; some do not fast".
  - **F-02** Makara Sankranti's solstice, solar-calendar and 14 January statements are accurate but cited to the wrong Britannica page (they are on "When does Makar Sankranti take place?").
  - **F-03** Holi's eye-safety line ("see a doctor if irritation continues") is softer than the American Academy of Ophthalmology page ("seek emergency medical treatment right away" for chemical splashes), and the internal claim is misattributed.
  - **F-04** Rama Navami says temples serve panaka; Hinduism Today says devotees do (temples are mentioned only for khoa).
- **S3 (deferrable): thirteen** (F-05 to F-17): a missing accommodations sentence in Ugadi, small wording and spelling points, stale source addresses, long page titles, readability of two Batch B guides, search gaps and one manual keyboard confirmation.
- **Validation failures: none.** Lint 0, typecheck 0 errors, 707 tests pass (4 documented to-dos), isolated production build passes, leak scan passes (0 hits across 227 public files and 547 fingerprints).
- **Ready for final sign-off?** **Yes, with your decisions on F-01 to F-04.** If you approve the four fixes, I will apply them as a new revision (re-approving only the affected items), rerun everything and re-issue this report. The S3 items can wait until Phase 6 or a later content pass.

## Workstream results

| # | Workstream | Deliverable | Result |
|---|---|---|---|
| 1 | Claim-to-source audit (accuracy, citation integrity) | `claim-ledger-*.md` (10 ledgers, 298 paragraph rows), `claim-ledger-summary.md`, `source-integrity.md` | No unsourced claim; 12 single-publisher paragraphs listed and accepted; 104 unique source URLs all live (22 Britannica, 3 Pluralism Project and 1 HTCI page verified in the browser because they refuse curl); 10 high-risk sources re-read; findings F-02, F-03, F-04, F-08, F-11, F-12 |
| 2 | Consistency between related festivals | `consistency-matrix.md`, `term-index.md` | No contradiction; F-01, F-05 |
| 3 | Regional and sectarian distinctions | Ledger "Tradition" column; `consistency-matrix.md` | Every story and regional section carries a tradition (enforced by tests); gaps are stated, not invented |
| 4 | Student guidance and safety | `safety-checklist.md` | No S1; F-03 (S2), F-01 (S2 wording), F-05, F-06 (S3) |
| 5 | Completeness and accessibility | `accessibility-responsive-report.md`, `readability.md` | All ten guides complete (8 to 10 sections, 4 to 5 quick facts, 1 to 5 deities, 7 to 18 sources); F-15 |
| 6 | Search aliases and deity associations | `search-matrix.md`, `tests/festivals/search-matrix.test.ts` (36 tests: 32 pass, 4 to-dos) | All aliases and deity terms work and are explained; every deity term has an attributed entry; gaps are S3 (F-16) |
| 7 | Date-safeguard validation | `date-safeguards-report.md` | All safeguards hold; occurrences empty; January 2027 checkpoint recorded |
| 8 | Metadata leakage | `tools/leak-scan.mjs`, `leak-scan-report.md` | PASS, 0 hits; repeatable (see "How to re-run") |
| 9 | Mobile, desktop, keyboard | `accessibility-responsive-report.md` | 0 overflow, 0 heading skips, 0 unnamed controls, 24 px citation targets, visible focus; F-17 |
| 10 | Production build with no draft text | Build + `leak-scan.mjs` | Pass: no placeholders, no draft wording, review date and "Date not yet verified" on all ten pages; unknown slugs return 404 |
| + | Second-reader packet | `second-reader-packet.md`, `ten-guides-reading-copy.md` | Ready; optional |
| + | Plan reconciliation | `docs/IMPLEMENTATION_PLAN.md`, `docs/PROJECT_HANDOFF.md` | P3-03 and P3-04 marked `[x]` on the documented evidence; P3-04's date and countdown paths recorded as validated with synthetic fixtures only |

## Validation commands and results (2026-11-12)

| Command | Result |
|---|---|
| `npm run lint` | 0 errors, 0 warnings |
| `npm run typecheck` | 0 errors |
| `npm test` | 37 files, **707 passed**, 4 todo |
| Isolated production build (scratch copy, `next build`) | Pass, 21 static pages |
| `leak-scan.mjs` against that build | PASS: 227 public files, 547 fingerprints, 0 hits |
| Built-app checks on port 3100 (Explore search, ten pages at 1280, 640 and 375 px, keyboard) | Pass (see the accessibility report) |
| URL availability (104 unique URLs) | 75 OK, 3 moved but live, 26 refuse curl and load in the browser |

## How to re-run the audit

```bash
node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs docs/research/p3-06/tools/audit-generate.mjs
bash docs/research/p3-06/tools/url-check.sh        # run from docs/research/p3-06
node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs docs/research/p3-06/tools/leak-scan.mjs <built-copy-dir>
node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs docs/research/p3-06/tools/readability.mjs
node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs docs/research/p3-06/tools/reading-copy.mjs
```

## Sign-off checklist (for the owner)

- [ ] Decide F-01 to F-04 (approve the proposed fix, edit it, or accept as is with a reason).
- [ ] Decide which S3 items to apply now (F-05, F-07 to F-10, F-14 are quick text edits), defer to Phase 6 (F-13, F-16) or ignore.
- [ ] If fixes are approved: a new revision, `reviewedAt` updated only for the items you re-approve, tests and documents regenerated, then a fresh P3-06 run.
- [ ] (Optional) Send `second-reader-packet.md` and `ten-guides-reading-copy.md` to a culturally knowledgeable reader.
- [ ] Confirm by hand once that Enter and Space toggle a story disclosure (F-17).
- [ ] Confirm the January 2027 date checkpoint (`date-safeguards-report.md` section 4); no date is published without separate verification and your approval.
- [ ] Approve a local commit of the P3-06 audit files (separate from any push); do **not** push or configure Vercel (postponed to Phase 6).
- [ ] Close Phase 3 and start Phase 4.

## Remaining non-blocking items

Optional research that would close the content gaps recorded in the handoff (Smarta and Vaishnava reckoning, current Dahi Handi rules, a US immersion source, the later Shiva Purana chapter, an independent Kullu source, Gauri Aagman, Pushtimarg and other regional customs); publisher terms pages (69 of 104 unread, recorded as such); and the public visibility of internal research and review notes in the repository (accepted).

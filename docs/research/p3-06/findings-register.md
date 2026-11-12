# P3-06 findings register (S1 / S2 / S3): findings and resolutions

Audit date 2026-11-12; **resolution applied 2026-11-12** under the owner's approval of the same day. During the audit itself nothing was changed; the approved corrections were then applied as a new revision (commit `fix(content): resolve P3-06 editorial and citation findings`). Review dates changed **only** for the entries listed below; every other entry, every basics block, every occurrence and every publication status is unchanged (verified by comparing the public text, sources, tradition fields and review dates of all 10 guides against the pre-fix commit `70c1ffa`, and pinned by `tests/content/p3-06-revisions.test.ts` and `tests/fixtures/review-dates.ts`).

**Severity:** **S1** factual error, safety problem, leak or date problem that must be fixed before sign-off. **S2** should be fixed, or accepted by the owner with a reason. **S3** polish or deferrable improvement.

## Summary

| Severity | Found | Resolved now | Deferred or accepted |
|---|---|---|---|
| **S1** | 0 | – | – |
| **S2** | 4 | **4** (F-01 to F-04) | 0 |
| **S3** | 13 | **5 fixed** (F-05, F-07, F-08, F-14) plus **F-17 verified**; **8 deferred or accepted** (F-06, F-09, F-10, F-11, F-12, F-13, F-15, F-16) | see below |

## S2: resolved

| ID | Guide | Finding | Resolution (applied) | Entries re-dated to 2026-11-12 |
|---|---|---|---|---|
| **F-01** | Navaratri | "Many other families celebrate without fasting at all" (and "many celebrate without fasting") was less supported than the statement removed from Krishna Janmashtami. | Replaced with source-supported wording: "Some families do not fast, and what any family does is shaped by its own tradition." and "some celebrate without fasting". Nothing else in either section changed. Tested across all ten guides: no "without fasting at all" remains. | section "Fasting and food"; section "Celebrating Navaratri away from home" |
| **F-02** | Makara Sankranti | Solar-calendar, 14 January and winter-solstice statements were cited to a Britannica page that does not contain them. | Added source `sankranti-brit-when` (Britannica, "When does Makar Sankranti take place?", read in the browser 2026-11-12) and cited it from the overview, the "Meaning" quick fact and "A solar festival: tradition and astronomy". Guide wording unchanged. The "What is Makar Sankranti?" source now claims only what that page says (what it marks, customs, harvest). | section "Why celebrate Makara Sankranti?"; section "A solar festival: tradition and astronomy"; quick fact "Meaning" |
| **F-03** | Holi | Eye-safety line was softer than the American Academy of Ophthalmology (AAO) page; the internal source claim was misattributed. | College-guide tip now follows AAO (re-read in full 2026-11-12): do not rub; flush right away with plenty of clean water; **for a chemical splash, seek emergency medical treatment right away**; for ordinary dust or grit, blinking and flushing often clears it, but see a doctor if it still feels like something is in the eye; ongoing pain or trouble seeing means get medical help right away. The consent, label-checking and herbal-color lines are unchanged. Internal `claimsSupported` corrected; AAO's copyright notice (no reproduction or AI use without permission) recorded in the terms note (paraphrase and link only; terms page not read). | section "Celebrating Holi away from home" |
| **F-04** | Rama Navami | Said temples serve panaka; Hinduism Today says devotees do. | Now "Hinduism Today describes devotees making and serving panaka ... and spiced buttermilk to the public, and some temples preparing sweets such as khoa"; quick fact "served to the public by devotees". | section "Fasting and food"; quick fact "Signature foods" |

## S3: resolved, verified, deferred or accepted

| ID | Guide | Finding | Status | Detail |
|---|---|---|---|---|
| F-05 | Ugadi | College guide lacked the standard accommodations sentence. | **Fixed** | Added "If you have questions about religious accommodations, ask your residence life office." (now all ten guides). Re-dated: section "Celebrating Ugadi away from home". |
| F-06 | Navaratri | "If you choose to fast" logistics tip (dining hall, Indian grocery). | **Deferred** (Phase 6 content pass) | Logistics, not dietary advice; left as approved. |
| F-07 | Ganesh Chaturthi | Story says "a handsome young man", Parvati entry said "a boy". | **Fixed** | Entry now says Parvati "makes him from the dirt of her body", matching the story, with no age word. Entry already carried the 2026-11-12 date (Batch B), so the date is unchanged. |
| F-08 | Holi | HAF sentence slightly stronger than the page. | **Fixed** | Now "says Holi is open to everyone and that understanding its origin can enrich the experience, noting that commercial color events can lose that context." Re-dated: section "Holi beyond temples and homes". |
| F-09 | Holi | "playfully strike" (Lathmar). | **Deferred** | Not a clearly low-risk correction: dropping "playfully" removes festive context and any replacement ("mock combat", "ritual play") is unsourced. Backlog: find a source that describes the spirit of Lathmar Holi, then revise. |
| F-10 | Holi | "Hola Mohalla" versus Britannica's "Holla Mohalla". | **Accepted, no change** | Both spellings are in common use; "Hola Mohalla" kept. |
| F-11 | Several | Stored source URLs have moved (Karnataka Tourism Mysuru page, HAF Diwali toolkit, Down To Earth, Citizen Matters, Princeton). | **Deferred** (Phase 6) | All still resolve by redirect and still support the claims; update when the sources list is next touched. |
| F-12 | Diwali, Makara Sankranti | Internal `claimsSupported` wording (Georgia "sealed", Louisville incense). | **Deferred** | Internal only; public text is supported. |
| F-13 | Site-wide | Long page titles with tagline; no per-page descriptions. | **Deferred** (Phase 6 SEO pass) | |
| F-14 | Vijayadashami | Prose "begins the countdown to Diwali". | **Fixed** | "begins the run-up to Diwali"; "countdown" no longer appears in any guide (tested). Entry already carried the 2026-11-12 date (Batch B), so the date is unchanged. |
| F-15 | Ganesh Chaturthi, Vijayadashami | Readability. | **Deferred** (Phase 6 plain-language pass) | Re-measured after the fixes: unchanged in substance. |
| F-16 | Search | Gaps: Dusshera, Bijoya, Krishna Jayanthi, Pongal, Lohri, Uttarayan, Ravana, subtitle terms. | **Deferred** (Phase 4/6) | Owner keeps Pongal, Lohri and Uttarayan as related festivals, not aliases; documented as `it.todo` entries in `search-matrix.test.ts`. |
| F-17 | Accessibility | Enter and Space on a native disclosure not independently confirmed. | **Verified 2026-11-12** | Real key presses in the built app (Holi): Tab reaches the "The burning of Holika" summary (visible 3 px outline); Enter opens it (content shown); Space toggles it closed; focus stays on the summary. |

## Entries re-dated (2026-11-12) and everything else

| Guide | Re-dated entries |
|---|---|
| Navaratri | "Fasting and food"; "Celebrating Navaratri away from home" |
| Ugadi | "Celebrating Ugadi away from home" |
| Holi | "Celebrating Holi away from home"; "Holi beyond temples and homes" |
| Makara Sankranti | "Why celebrate Makara Sankranti?"; "A solar festival: tradition and astronomy"; quick fact "Meaning" |
| Rama Navami | "Fasting and food"; quick fact "Signature foods" |
| Ganesh Chaturthi, Vijayadashami | Text revised (F-07, F-14); review date unchanged (already 2026-11-12) |
| Diwali, Maha Shivaratri, Krishna Janmashtami | No change |

All ten guides remain `reviewed`; all basics keep their original review dates (2026-11-08 for the seven earlier guides, 2026-11-12 for Batch B); every `occurrences` array is empty; no 2027 date is verified. The pages now show "Last reviewed November 12, 2026" for the guides that contain a re-dated entry (Ugadi, Navaratri, Makara Sankranti, Holi, Rama Navami) because that line reports the latest review date among a guide's entries; each section still shows its own date.

## Informational

- **Single-publisher paragraphs (accepted):** Holi's regional paragraphs (Britannica), Kullu Dussehra (attributed in the text), and a few quick-fact lines, listed in `claim-ledger-summary.md`.
- **Terms pages:** read for 35 of 105 unique sources; the rest are recorded as unread, never treated as permission. No copyright, licensing or attribution concern needs escalation; the notices of AAO, Incredible India, Britannica, Hinduism Today and Outlook Traveller restrict reproduction, which the guides do not do (paraphrase and link only).
- **Date checkpoint:** January 2027 (`date-safeguards-report.md`).
- **Second reader:** recommended, not a blocker (`second-reader-packet.md`).

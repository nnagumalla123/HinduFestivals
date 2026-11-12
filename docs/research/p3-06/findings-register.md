# P3-06 findings register (S1 / S2 / S3) with proposed fixes

Audit date 2026-11-12. **Nothing below has been changed.** No reviewed guide text, date or publication status was modified during the audit. Any approved fix will be applied as a new revision, and `reviewedAt` will be updated only for the items the owner explicitly re-approves.

**Severity:** **S1** factual error, safety problem, leak or date problem that must be fixed before sign-off. **S2** should be fixed, or accepted by the owner with a reason. **S3** polish or deferrable improvement.

## Summary

| Severity | Count | Status |
|---|---|---|
| **S1** | **0** | None found |
| **S2** | **4** | Need your decision (F-01 to F-04) |
| **S3** | **13** | Deferrable (F-05 to F-17) |
| Validation failures | 0 | Lint, typecheck, 707 tests (4 documented to-dos), isolated production build, leak scan all pass |

## S2: needs your decision

| ID | Guide | Finding | Evidence | Proposed fix (needs your approval) |
|---|---|---|---|---|
| **F-01** | Navaratri (reviewed 2026-11-08), compare Krishna Janmashtami (2026-11-12) | **Inconsistent standard for "families who do not fast".** In Batch B you had the statement "many families do not fast at all" removed as unsupported. The reviewed Navaratri guide still says "Many other families celebrate without fasting at all" (Fasting section) and "many celebrate without fasting" (college guide). The sources support only the softer idea: a young Tamil-family writer says fasting is "not how everybody observes" the festival (Hinduism Today); Britannica and the HPI digest speak only of "many" who fast. | `content/festivals/navaratri.ts` fasting section and college guide; its own review notes | Reword to what is supported, for example "Fasting is optional, and some families do not fast" (and "some celebrate without fasting" in the college guide). No other change. Same standard applied to the other nine guides: no other instance found (term-index report). |
| **F-02** | Makara Sankranti (2026-11-08) | **Citation points to the wrong Britannica page.** The statements that the festival is on the solar calendar (unlike most lunisolar holidays), is on 14 or 15 January in the source, was "originally a winter solstice holiday" and has drifted from the solstice through the precession of equinoxes are on Britannica's separate question page "When does Makar Sankranti take place?" and the topic article "Makar Sankranti". The cited page, "What is Makar Sankranti?", now contains only a short answer (what it marks, customs, harvest). The claims themselves are accurate. | Re-read in the browser on 2026-11-12; `sankranti-brit-what` URL and `claimsSupported` | Add the "When does Makar Sankranti take place?" page as a source (`sankranti-brit-when`) and cite it from the overview, the "Meaning" quick fact and "A solar festival: tradition and astronomy"; keep the "What is" page for customs. No change to the text. |
| **F-03** | Holi (2026-11-08) | **Eye-safety wording is softer than its source, and the internal claim is misattributed.** The college guide says: "If color gets in your eyes, rinse with plenty of clean water, and see a doctor if irritation continues." The American Academy of Ophthalmology page says to flush a chemical splash immediately with plenty of clean water and to "seek emergency medical treatment right away"; "see a doctor if it persists" is not stated for chemical splashes (it is for particles). The source's own note is general eye-injury guidance, not Holi-specific. | AAO page re-read 2026-11-12; `holi.ts` college guide and `holi-aao` claimsSupported | Reword to follow the source, for example "If color gets in your eyes, flush them right away with plenty of clean water and get medical care"; correct the internal `claimsSupported`. Keep the "keep powder away from your eyes" and "check labels" lines. |
| **F-04** | Rama Navami (2026-11-08) | **Attribution of who serves panaka.** The guide says "Hinduism Today describes temples that mark the day by serving panaka ... and spiced buttermilk to the public, and some that prepare sweets such as khoa", and a quick fact says "served to the public at some temples". The page says devotees make and serve buttermilk and panaka "to the public without charge", and mentions temples only for khoa. | Hinduism Today page re-read 2026-11-12 | Reword to "Hinduism Today describes devotees serving panaka ... and spiced buttermilk to the public, and some temples making sweets such as khoa"; adjust the quick fact to "served to the public". |

## S3: can be deferred

| ID | Guide | Finding | Proposed fix |
|---|---|---|---|
| F-05 | Ugadi | The college guide lacks the project's standard neutral line "If you have questions about religious accommodations, ask your residence life office." (the other nine have it). | Add the sentence (owner convention). |
| F-06 | Navaratri | College guide "If you choose to fast" adds "your dining hall or a nearby Indian grocery can help with ingredients". It is logistics, not dietary advice, but it is the only such tip across the guides. | Keep, or drop the second sentence for consistency with the other guides. |
| F-07 | Ganesh Chaturthi | Wording: the story says Parvati makes "a handsome young man" while the Parvati entry says "a boy" (the Shiva Purana and HAF differ). | Use "a young man" in the entry, or "a boy" in the story, whichever the owner prefers. |
| F-08 | Holi | "The Hindu American Foundation ... asks that it also be remembered as a Hindu festival" is slightly stronger than the page, which says participants can "enhance" the experience by understanding the holiday's origin and that the essence of commercial events "often gets lost". | Reword to "says people can enrich the experience by understanding Holi's origin, and notes that commercial color events can lose that context". |
| F-09 | Holi | "Women ... playfully strike men" (Lathmar): Britannica says "women beat men with staves as the men defend themselves"; "playfully" is the guide's framing. | Keep as approved framing, or attribute ("a playful ritual"). |
| F-10 | Holi | "Hola Mohalla": Britannica spells it "Holla Mohalla" ("The Charge of an Army"). | Keep the common English spelling, or follow the source. |
| F-11 | Several | Stored source URLs have moved: Karnataka Tourism Mysuru Dasara page (now `/en/blogs/mysuru-dasara/`), HAF `diwali-toolkit` (now `/diwali`), Down To Earth (new path), Citizen Matters and Princeton (trailing-slash redirects). Content still supports the claims. | Update the stored URLs. |
| F-12 | Diwali, Makara Sankranti (internal) | Internal `claimsSupported` wording: Georgia housing guide also lists microwaves ("sealed appliances" is loose); the Louisville policy does not mention incense. Public text is supported by the other policies. | Correct the internal notes. |
| F-13 | Site-wide | Page titles carry a long tagline ("Holi \| Desi Days — Learn when Hindu festivals happen, what they mean, and how to celebrate them."); festival pages have no meta description. The tagline implies dates while none are verified. | Shorten titles; add per-page descriptions (Phase 6 SEO pass). |
| F-14 | Vijayadashami | Prose says the day "begins the countdown to Diwali"; "countdown" is a reserved UI term in this project (no countdowns until dates are verified). | Use "begins the run-up to Diwali". |
| F-15 | Ganesh Chaturthi, Vijayadashami | Readability: Ganesh Chaturthi overview grade 13.5 and Vijayadashami whole-guide grade 11.9 with a 71-word sentence, against 8 to 10 for the pilots. | Optional plain-language pass (split long sentences). |
| F-17 | Accessibility | The automated key press did not toggle a native `<details>` disclosure in the test harness (native behavior; Tab reaches it and the focus ring shows). | Confirm Enter and Space toggle a story section once by hand during sign-off. |
| F-16 | Search | Gaps (no wrong results): "Dusshera", "Bijoya", "Krishna Jayanthi", "Pongal", "Lohri", "Uttarayan", "Ravana" and subtitle terms return nothing. Pongal, Lohri and Uttarayan are kept as related festivals by owner decision. | Optional: search-only terms for spelling variants; decide about related-festival terms. |

## Informational (no action unless you want it)

- **Single-publisher paragraphs (accepted):** Holi's regional paragraphs (Britannica), Kullu Dussehra (Britannica, attributed in the text), one Maha Shivaratri and several quick-fact lines. Each is listed in `claim-ledger-summary.md`; the text either attributes them or states them as one encyclopedia's account.
- **Terms pages:** read for 35 of 104 unique sources; the rest are recorded as unread, never treated as permission. No copyright, licensing or attribution concern was found that needs escalation; four publishers' notices (AAO, Incredible India, Britannica, Hinduism Today, Outlook Traveller) restrict reproduction, which the guides do not do (paraphrase and link only).
- **Dartmouth** housing policy has a religious-observance exception, consistent with the guides' accommodations line.
- **Ledger coverage:** 298 paragraph-level rows across the ten guides; none lacks a source; 12 are single-publisher; student-guidance rows (67) are practical advice, not cultural claims.
- **Date checkpoint:** January 2027 (see `date-safeguards-report.md`).
- **Second reader:** recommended, not a blocker (`second-reader-packet.md`).

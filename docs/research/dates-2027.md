# Date research ledger: Atlanta, GA, 2027 (P3-01)

**Status: PROPOSED / UNVERIFIED. Nothing here is published, and nothing has been entered in `content/`.**
Researched 2026-11-07 (all access dates below). Reference location: Atlanta, GA (33°44′56″ N, 84°23′16″ W, `America/New_York`). Owner approval is required before any row becomes `verified`.

Three research jobs stay separate (PRD section 11). This file covers **date verification** only; discovery sources appear only as cross-checks and never as proof.

## 0. How to read this ledger: four different things

This file keeps four kinds of statement apart. A date is only publishable when **all four** line up, and the last one is only ever set by the owner.

| Kind | Meaning | Where it appears | Can it publish a date? |
|---|---|---|---|
| **Proposed date** | What the primary candidate source (S1, Drik Panchang for Atlanta) says, with its stated rule. A research finding. | sections 4 and 5 | No |
| **Independent calculation** | Our own astronomical recomputation (S2). Supporting technical evidence that S1 is internally and astronomically consistent. **Not** an independent published source and **not sufficient on its own** (owner decision 2026-11-07). | section 3 | No |
| **Unresolved disagreement** | Any conflict not yet explained by location or by a genuine tradition difference. | section 2a and the Janmashtami entry | No: the date stays `disputed` or `draft` |
| **Publication approval** | The owner's explicit sign-off that a date may enter `content/` as `verified` (with a second, independent, published Atlanta-specific source). | section 8 | **Only this** |

**Current publication approvals: none.** Every date below is proposed. No date is in `content/`, so no page, countdown or reminder shows any date.

## 0a. Owner decisions recorded 2026-11-07 (after P3-01 review)

1. **Cross-check:** the astronomical recomputation stays as supporting evidence only. Keep looking for independent, Atlanta-specific published sources (temple calendars when 2027 editions appear). Astronomical assumptions are documented in section 3.
2. **Janmashtami:** Aug 24 and Aug 25 stay **disputed**. The Smarta/Vaishnava question is investigated (section 4, Janmashtami); neither date is published without separate reliable evidence.
3. **Diwali:** modelled as a **multi-day festival with separately labelled observances**, with one **main day** (Lakshmi Puja, Thu Oct 28, 2027 for Atlanta). The proposed span Oct 26-30 and the Oct 28 main day remain research findings only. The guide text may say that Diwali sometimes lasts several days depending on the sub-tradition.
4. **Drik Panchang:** approved as a primary research candidate, attributed, recorded in our own wording. It is **not** the sole basis for a verified date.
5. **Re-verification:** a **mandatory date re-check before launch**, plus a re-check whenever a reliable new Atlanta-specific calendar appears (see section 9).

## 1. How dates were researched

1. **Primary candidate:** Drik Panchang pages configured for Atlanta (`geoname-id=4180439`). Every page quoted below showed "Atlanta, Georgia, United States" in its title and the tooltip "Olson Timezone: America/New_York".
2. **Observance rules** were taken from Drik's own stated rules on each festival page, then **re-applied independently** (see section 3).
3. **Cross-checks:** other published calendars (all non-Atlanta, see section 2) and an **internal astronomical recomputation** (section 3). The recomputation is a research tool, not a published source.
4. Disagreements were investigated and classified as **location-explained**, **tradition-explained**, or **unexplained**. No date was chosen or rejected just because a source disagreed.

Times quoted from Drik are local Atlanta clock times. The page tooltip says "NOT observing DST" with a fixed -05:00 offset, which is the offset on the day of access (Nov 2026). The times for dates inside US daylight time are EDT: Drik's Pradosh start times equal my computed Atlanta sunsets (e.g. Oct 28, 6:49 PM), and the tithi times match my EDT computation to within 2 minutes.

## 2. Sources

Role key: **P** primary candidate (Atlanta-specific, states rules), **X** cross-check only, **R** rejected.
"Independence group" says which sources share underlying calculation data (PRD/Architecture independence rule).

| ID | Source | Role | Atlanta-specific? | Stated method | Independence group | Terms |
|---|---|---|---|---|---|---|
| S1 | Drik Panchang, Atlanta pages (festival pages, monthly pages, ISKCON calendar). e.g. https://www.drikpanchang.com/calendars/hindu/hinducalendar.html?year=2027&geoname-id=4180439 | **P** | **Yes** | States the observance rule on each festival page (Pradosh, Madhyahna, Nishita, "Udaya Vyapini"...). States "geo location is considered", sunrise-to-sunrise day. Default Lahiri/Chitrapaksha ayanamsa stated on its sidereal planetary-positions page (not on the festival pages). No ephemeris named. | `drik` | Footer: "All Images and data - Copyrights". No general terms page found. Only facts (dates, tithi times) are recorded here, in our own words. No scraping. |
| S2 | Internal astronomical recomputation (this repo: `docs/research/astro-check/`) | **X (internal, not a source)** | Yes (computed for Atlanta) | Meeus low-precision Sun and truncated Moon longitudes, Lahiri ayanamsa, NOAA-style sunrise/sunset. Applies S1's stated rules. | `own-astronomy` | n/a |
| S3 | Prokerala Panchang, https://www.prokerala.com/astrology/panchang/2027.html (publisher Ennexa Technologies) | X | **No** (defaults to Ujjain, India; Atlanta not confirmed selectable) | "Lahiri ayanamsa"; says calculations are "not based on any published almanac" | `prokerala` | not checked |
| S4 | Shubh Panchang, https://www.shubhpanchang.com/methodology and April 2027 page | X | **No** (location unstated) | Drik Ganit, Swiss Ephemeris, Lahiri; Gujarat/Vikram Samvat conventions | `shubh` | not checked |
| S5 | Hindu Blog 2027 list, https://www.hindu-blog.com/2026/10/hindu-festivals-2027-calendar-important.html | X | **No** (India Standard Time) | none stated | unknown | not checked |
| S6 | CalendarLabs 2027 Hindu list, https://www.calendarlabs.com/holidays/hindu/2027 | **X (discovery/cross-check only; never qualifies a date)** | **No**: states no location, time zone or method | none | `calendarlabs` | https://www.calendarlabs.com/disclaimer.php: "as is", personal non-commercial use, no database reuse. We record only a few dates for comparison, not its table. |
| S7 | BhaktiBharat Atlanta Telugu panchangam daily pages, https://bhaktibharat.org/panchangam/telugu/13-january-2027-panchangam-telugu-Atlanta (and 5 March) | X (weak) | Atlanta-labelled, tithi/sunrise only; no festival entries found; two daily pages read | none; disclaimer says data "may not be accurate for your specific geographic location" | unknown | Terms bar copying and scraping. Not used further. |
| S8 | Hindu Temple of Atlanta, https://www.hindutempleofatlanta.org (special-events and panchang pages) | X (none usable yet) | Yes | none | n/a | Shows November 2026 events and 2026 PDFs only. **No 2027 calendar published yet.** |

**Rejected / not used:** SEO-spam "Atlanta Hindu Temple calendar" pages (generic, scraped, 2023-2025); HinduTone pages (internally inconsistent dates); mypanchang.com (HTTP 403 to automated reads); prokerala festival-list URL (404); gcal.com (DNS failure); Hinduism Today (no calendar); astrosage.com (no data readable).

**Atlanta temple 2027 calendars are expected to appear late in 2026.** Re-check S8 (and ISKCON Atlanta, other Atlanta temples) in December 2026: they are the best available independent, Atlanta-specific cross-check.

## 2a. Disagreements with other sources: what explains them

CalendarLabs (S6), Prokerala (S3), Hindu Blog (S5) and Shubh (S4) agree with each other far more than with Atlanta, because they appear to use **India clock times**. Re-running my engine for Ujjain/IST (`check_rules_india.py`) reproduces their dates: Diwali Oct 29, Ganesh Chaturthi Sep 4, Rama Navami Apr 15, Makara Sankranti Jan 15 (the Sun enters Makara at 8:59 PM IST on Jan 14, after sunset), Holika Dahan Mar 21 and Holi Mar 22, Janmashtami Aug 25 (Aug 24/25 in some). So most differences are **location-explained**: this is exactly why the site states Atlanta for every date.

**Unexplained (flagged, none of them primary sources):**
- CalendarLabs lists Diwali Oct 31, Dhan Teras Oct 29, Bhai Dooj Nov 4, and Dusshera Oct 14. These contradict its own Navaratri (ends Oct 9) and fit neither Atlanta nor India. Treat S6's Diwali and Dussehra entries as unreliable.
- Prokerala (read by a subagent, not re-read by me) lists Holi on Tue Mar 23; every other source and my computation say Mon Mar 22.
- Hindu Blog gives "Navratri begins October 1" beside "September 30 in western parts of India". Not explained; Sep 30 is supported everywhere else.

## 3. Independent astronomical check (S2): assumptions, method, tested boundaries

**S2 is supporting technical evidence only.** It shows S1 is astronomically consistent for Atlanta. It is not a published, independent source, and it applied the observance rules stated by S1.

**Assumptions (all in `docs/research/astro-check/astro.py`):**
- **Library/ephemeris:** none. No third-party library or ephemeris file is used (Python 3.11 standard library only). The Sun uses the Meeus low-precision series (apparent longitude, with the aberration/nutation correction). The Moon uses 59 of the largest terms of Meeus's lunar longitude series plus the three additive terms. Expected accuracy: well under 0.1 degree for the Moon, which is about 10 minutes of Moon motion at worst and was within 2 minutes at every boundary tested.
- **Time scale:** UTC for civil times; Terrestrial Time approximated as UT + 69 s (about the value for 2027) for the series.
- **Elongation and tithi:** tithi = floor((Moon longitude minus Sun longitude) / 12 degrees) + 1; boundaries found by bisection. Both longitudes are mean-equinox-of-date, so precession and nutation cancel in the difference.
- **Sidereal values (nakshatra, Sankranti):** Lahiri (Chitrapaksha) ayanamsa approximated as 23.85306 degrees at J2000 plus 0.013972 degrees per year. This is accurate only to about 0.01 degree, so the Makara Sankranti moment is about 15 minutes earlier than S1's. Sidereal results are therefore used only where the answer is far from a day boundary.
- **Location and time zone:** Atlanta 33.7489 N, 84.3880 W. Local clock = UTC-4 (EDT) from 2027-03-14 07:00 UTC to 2027-11-07 06:00 UTC, otherwise UTC-5 (EST). This DST rule is hard-coded for 2027 only. Confirmed by matching S1's Pradosh start times to computed sunsets.
- **Sunrise/sunset:** NOAA-style solar position, sun's upper limb at -0.833 degrees (refraction + semidiameter), no elevation correction (S1's tooltip shows 336 m; the effect is a minute or less).
- **Not modelled:** topocentric Moon parallax (tithi is geocentric), leap seconds, ayanamsa variants other than Lahiri.

**Tested boundaries (all Atlanta local time, `check_tithi_times.py`):**

| Boundary | S1 (Drik) | Computed |
|---|---|---|
| Amavasya begins/ends (Oct 28/29) | 11:17 AM / 9:35 AM | 11:19 AM / 9:37 AM |
| Pratipada begins/ends (Apr 6/7, Ugadi) | 7:50 PM / 6:58 PM | 7:51 PM / 6:59 PM |
| Purnima begins/ends (Mar 21/22) | 8:51 AM / 6:43 AM | 8:52 AM / 6:44 AM |
| Chaturthi begins/ends (Sep 3/4) | 4:48 AM / 2:55 AM | 4:50 AM / 2:57 AM |
| Pratipada begins/ends (Sep 29/30, Navaratri) | 10:35 PM / 8:04 PM | 10:36 PM / 8:06 PM |
| Dashami begins/ends (Oct 8/10) | 11:31 PM / 2:10 AM | 11:32 PM / 2:11 AM |
| Krishna Ashtami begins/ends (Aug 24/25) | 10:54 AM / 9:49 AM | 10:56 AM / 9:51 AM |
| Krishna Chaturdashi begins/ends (Mar 6/7) | 1:33 AM / 3:16 AM | 1:34 AM / 3:17 AM |
| Navami begins/ends (Apr 14/15) | 5:53 AM / 3:50 AM | 5:54 AM / 3:51 AM |
| Rohini begins/ends (Aug 25/26) | 2:57 AM / 2:12 AM | 2:57 AM / 2:12 AM |
| Makara Sankranti moment (Jan 14) | 10:44 AM | 10:29 AM (ayanamsa) |

**What this supports:** S1's tithi and nakshatra times are right for Atlanta, and every proposed date follows from S1's stated rule. It also explains each difference from the India-based sources (re-running with Ujjain/IST, `check_rules_india.py`).

**What it does not prove:** the *rule* itself (e.g. "Amavasya at Pradosh") comes from S1 and the traditional texts it follows. I have not read those texts. S2 is therefore **not** a second source for the rules.

## 4. Festival-by-festival findings (all PROPOSED)

Legend for confidence: **High-proposed** = S1 date, rule, and my recomputation agree, no tradition split found, and all non-Atlanta differences are explained. **Disputed** = a real tradition or source conflict remains. No row is "verified".

### Diwali (Deepavali): High-proposed main day Oct 28 (multi-day model, labelled observances)
- **Rule (S1):** Lakshmi Puja on the day Amavasya prevails during Pradosh (the period after sunset).
- **Atlanta:** Amavasya runs 11:17 AM Oct 28 to 9:35 AM Oct 29 (S1; my computation 11:19 AM and 9:37 AM). Pradosh Oct 28 (6:49 PM sunset) falls in Amavasya; Oct 29 Pradosh is Pratipada. **Lakshmi Puja / Diwali: Thu Oct 28, 2027.** S1 muhurat 7:45-9:26 PM.
- **Five-day sequence (S1, Atlanta):** Dhanteras Tue Oct 26 (Trayodashi at Pradosh: confirmed by me), Kali Chaudas Wed Oct 27 (night), Narak Chaturdashi and Lakshmi Puja Thu Oct 28 (Chaturdashi at sunrise: confirmed), Govardhan Puja Fri Oct 29, Bhai Dooj Sat Oct 30 (Dwitiya at Aparahna: confirmed). S1 also lists Oct 25 (Govatsa Dwadashi), which its own intro does not count as part of the five days.
- **Tradition difference:** Govardhan Puja is Oct 29 on S1's Smarta-style page but Oct 30 on S1's ISKCON calendar (Pratipada at sunrise is only on Oct 30; confirmed). Both are real, rule-based observances, not errors.
- **Other sources:** India-based S3/S5: Oct 29 (location-explained: Amavasya prevails at Pradosh in India only on Oct 29; reproduced). S5 also notes South India Oct 28. S6: Oct 31, unexplained and unreliable.
- **Proposed model (owner decision 2026-11-07):** one Diwali festival with a **main day** and separately labelled observances. All are research findings only.
  - **Main day (single "universal" date): Lakshmi Puja, Thu Oct 28, 2027.** Britannica's Diwali article (cultural source pack) also calls Lakshmi Puja the main day of the festival.
  - **Labelled observances:** Dhanteras Tue Oct 26; Kali Chaudas Wed Oct 27 (night); Naraka Chaturdashi Thu Oct 28 (morning); Lakshmi Puja Thu Oct 28 (evening); Govardhan Puja / Annakut / Bali Pratipada Fri Oct 29 (general calendar) or Sat Oct 30 (Vaishnava/ISKCON); Bhai Dooj Sat Oct 30.
  - **Span:** Oct 26 to Oct 30 (Dhanteras to Bhai Dooj). The guide may say that Diwali lasts several days in some sub-traditions and fewer in others, without giving every region one count.
- **Govardhan Puja Oct 29 vs Oct 30 (investigated):** rule-based, not an error. S1's general page gives Oct 29 and notes that Govardhan Puja can fall on the Amavasya day depending on when Pratipada starts (Pratipada 9:35 AM Oct 29 to 8:21 AM Oct 30). S1's ISKCON calendar gives Oct 30 (Pratipada at sunrise exists only on Oct 30; my computation agrees). Both belong in the model as labelled observances. **Both come from S1 (same `drik` group); neither is independently confirmed.**
- **Open:** (a) which date reminders anchor to, since PRD attaches reminders to the first day of the occurrence (Oct 26) while the main day is Oct 28; (b) a published 2027 Atlanta temple calendar for the main day and the Govardhan split.

### Ugadi: High-proposed, Wed Apr 7, 2027
- **Rule:** the day when Chaitra Shukla Pratipada prevails at sunrise (S1 says the panchang day begins at sunrise; no separate rule on its page).
- **Atlanta:** Pratipada 7:50 PM Apr 6 to 6:58 PM Apr 7 (S1; mine 7:51 PM and 6:59 PM). Sunrise Apr 7 7:17 AM is in Pratipada; Apr 6 sunrise is Amavasya. **Apr 7.**
- **Other sources:** S3, S4, S5, S6, S1 all say Apr 7. Gudi Padwa and Chaitra Navaratri begin the same day.
- **Not to conflate:** Tamil Puthandu, Vishu, Baisakhi and Mesha Sankranti are on Apr 14 (solar new year). Ugadi is lunar.
- **Open:** none for the date. A Telugu or Kannada temple calendar would be a good published cross-check.

### Holi: High-proposed, Holika Dahan Sun Mar 21 and Holi Mon Mar 22, 2027
- **Rule (S1):** Holika Dahan during Pradosh with Purnima; Holi (Rangwali/Dhulandi) is the next day.
- **Atlanta:** Purnima 8:51 AM Mar 21 to 6:43 AM Mar 22 (mine 8:52 AM, 6:44 AM). Pradosh Mar 21 is in Purnima. S1 Dahan muhurat 7:50-10:12 PM (Bhadra Mukha ends 6:50 PM). Mar 22 sunrise is Krishna Pratipada.
- **Other sources:** S1, S5, S6: Dahan Mar 21, Holi Mar 22. S3 says Holi Mar 23 (unexplained; not re-read).
- **Proposed occurrence:** `general` Mar 21 to Mar 22.
- **Open:** the Prokerala Mar 23 entry; also whether Dol Purnima/Vasanta Purnima (Bengal, Mar 21) belongs in regional notes (not a date).

### Ganesh Chaturthi: High-proposed, Fri Sep 3, 2027 (ends Tue Sep 14)
- **Rule (S1):** Ganesh Puja is preferred at Madhyahna while Chaturthi prevails.
- **Atlanta:** Chaturthi 4:48 AM Sep 3 to 2:55 AM Sep 4 (mine 4:50 AM, 2:57 AM). Madhyahna Sep 3 is Chaturthi; Sep 4 Madhyahna is Panchami. **Sep 3.** Madhyahna puja 12:20-2:54 PM.
- **End:** Anant Chaturdashi / Visarjan Tue Sep 14 (Chaturdashi at sunrise: confirmed; S1 Chaturdashi 3:09 PM Sep 13 to 5:18 PM Sep 14).
- **Other sources:** S3, S5, S6 say Sep 4. **Location-explained** (in India, Chaturthi begins after Sep 3 Madhyahna; reproduced).
- **Proposed occurrence:** `general` Sep 3 to Sep 14.
- **Open:** Maharashtra and other traditions end the festival on different days (1.5, 3, 5, 7, 10 days); that is regional content, not a date conflict.

### Navaratri (Sharad): High-proposed, Thu Sep 30 to Fri Oct 8, 2027
- **Rule (S1):** Ghatasthapana in the first third of the day while Pratipada prevails; avoid Amavasya and night.
- **Atlanta:** Pratipada 10:35 PM Sep 29 to 8:04 PM Sep 30 (mine 10:36 PM, 8:06 PM). Ghatasthapana muhurat 7:31-8:58 AM Sep 30. Sep 29 sunrise is Amavasya. Maha Navami Fri Oct 8 (Navami at sunrise: confirmed). Nine days with no tithi skipped or repeated.
- **Other sources:** S3, S6: starts Sep 30. S5 gives Oct 1 (unexplained).
- **Proposed occurrence:** `general` Sep 30 to Oct 8. Vijayadashami (Oct 9) is its own guide.
- **Open:** Bengali Durga Puja (Shashthi to Dashami) and other regional customs affect practices, not the start date. Chaitra Navaratri (from Apr 7) is out of scope for this guide.

### Vijayadashami (Dussehra): High-proposed, Sat Oct 9, 2027
- **Rule (S1):** Aparahna Kala while Dashami prevails.
- **Atlanta:** Dashami 11:31 PM Oct 8 to 2:10 AM Oct 10 (mine 11:32 PM, 2:11 AM). Aparahna Oct 9 is Dashami; Oct 8 Aparahna is Navami. **Oct 9.** S1 Vijay Muhurat 3:20-4:07 PM.
- **Other sources:** S3, S5: Oct 9. S6: Oct 14, internally inconsistent (unreliable).
- **Proposed occurrence:** `general` Oct 9 to Oct 9.
- **Open:** none for the date.

### Krishna Janmashtami: DISPUTED, do not collapse
- **Rule (S1):** worship at Nishita (midnight) during Ashtami.
- **Atlanta facts:** Krishna Ashtami runs 10:54 AM Aug 24 to 9:49 AM Aug 25 (mine 10:56 AM, 9:51 AM). Rohini nakshatra runs 2:57 AM Aug 25 to 2:12 AM Aug 26 (matches). The night of Aug 24 to 25 (Nishita 1:40 AM Aug 25) is in Ashtami, before Rohini. The night of Aug 25 to 26 is in Navami (with Rohini). Aug 25 sunrise is in Ashtami; Aug 24 sunrise is Saptami.
- **What S1 says:** Janmashtami **Wed Aug 25** with a single date, Nishita puja shown as 1:18-2:02 AM **Aug 26** (when Ashtami has already ended), Dahi Handi Aug 26, and monthly entries Aug 24 for Kalashtami and Kali Jayanti. Its ISKCON calendar also says Aug 25 and Nandotsava Aug 26.
- **My analysis (not a source):** applying the Nishita rule, the Smarta-style observance is **Aug 24** (puja after midnight into Aug 25). The Vaishnava (Ashtami at sunrise) observance is **Aug 25**. S1's single-date claim that "both Sampradaya would observe on the same date" does not follow from its own times. **Unexplained internal inconsistency in S1.**
- **Other sources:** S3, S6: Aug 25. S5: "Aug 24/25". Search snippets disagreed about whether S1's Telugu calendar says Aug 24 (not verified).
- **Smarta vs Vaishnava investigation (owner decision 2026-11-07):**
  - *Vaishnava/ISKCON, Aug 25:* S1's ISKCON calendar (Atlanta) lists Janmashtami on Wed Aug 25 and Nandotsava on Aug 26. This matches the sunrise rule (Ashtami at Aug 25 sunrise; no Ashtami at Aug 24 sunrise). Evidence is S1 only (group `drik`); no independent Vaishnava source was readable (gcal.com, the Gaurabda calendar, failed to resolve; ISKCON Atlanta not located).
  - *Smarta-style, Aug 24:* supported only by my application of the Nishita rule (Ashtami at midnight begins evening of Aug 24). S1 lists Kalashtami and Kali Jayanti on Aug 24 but **does not list a Smarta Janmashtami on Aug 24**. No published Smarta source for Atlanta was found.
  - *S1 itself:* a single date (Aug 25) with a Nishita time on Aug 26 when Ashtami has ended; this follows an Ashtami-Rohini preference at most, and S1 does not say so. An India-based snippet suggested its Telugu calendar may say Aug 24; not verified.
  - **Status: `disputed`.** Neither date is publishable. Required evidence: (1) a published Atlanta-specific Vaishnava/ISKCON calendar for 2027 and (2) a separate published Smarta-tradition Atlanta calendar (for example a South Indian temple panchang). With both, two labelled observances would be modelled (decision C). With only one tradition sourced, only that tradition could be labelled, never the festival as a whole.
- **Open:** the missing tradition-specific Atlanta sources; re-check when 2027 temple calendars appear (section 9).

### Maha Shivaratri: High-proposed, Sat Mar 6, 2027
- **Rule (S1):** the night when Krishna Chaturdashi prevails at Nishita.
- **Atlanta:** Chaturdashi 1:33 AM Mar 6 to 3:16 AM Mar 7 (mine 1:34 AM, 3:17 AM). Nishita (about 12:48 AM Mar 7) is in Chaturdashi on the night of Mar 6; the night of Mar 5 is Trayodashi. **Mar 6** (Nishita puja 12:24-1:13 AM Mar 7; parana 6:59 AM Mar 7).
- **Other sources:** S1, S3, S5, S6 all Mar 6 (same in India, reproduced). HinduTone's Feb 6/15 dates rejected as inconsistent.
- **Proposed occurrence:** `general` Mar 6 to Mar 6 (the observance spans the night into Mar 7).
- **Open:** whether the end date should be Mar 7; whether any tradition (for example Kashmiri Pandit Herath) differs (not found).

### Makara Sankranti: High-proposed, Thu Jan 14, 2027
- **Rule (S1):** the day of the Sun's transit into Makara (sidereal), with Punya Kala after the moment; the moment must occur before sunset for that day.
- **Atlanta:** transit 10:44 AM Jan 14 (S1; mine 10:29 AM; ayanamsa difference). Sunset is 5:50 PM, so **Jan 14**. S1 Punya Kala 10:44 AM to 5:51 PM.
- **Other sources:** S3, S6: Jan 15; S5 says Jan 14 with rituals on Jan 15 morning. **Location-explained:** the transit is 8:59 PM IST Jan 14, after sunset, so India observes Jan 15 (reproduced).
- **Regional (not conflated):** S1 lists Pongal and Uttarayana Jan 14, Mattu Pongal and Magh Bihu Jan 15, Bhogi and Lohri Jan 13. These are region-specific customs with their own dates.
- **Proposed occurrence:** `general` Jan 14 to Jan 14.
- **Open:** whether to show the transit time; solar (Sayana) alternative not fetched.

### Rama Navami: High-proposed, Wed Apr 14, 2027
- **Rule (S1):** Madhyahna (about 2 h 24 min around midday) during Navami.
- **Atlanta:** Navami 5:53 AM Apr 14 to 3:50 AM Apr 15 (mine 5:54 AM, 3:51 AM). Apr 14 Madhyahna is Navami; Apr 15 is Dashami. **Apr 14**, Madhyahna muhurat 12:20-2:56 PM. S1's ISKCON calendar also lists Apr 14.
- **Other sources:** S4, S5, S6: Apr 15. **Location-explained** (in India Navami begins after Madhyahna on Apr 14; reproduced).
- **Proposed occurrence:** `general` Apr 14 to Apr 14.
- **Open:** none for the date; some Vaishnava traditions also observe a following day (not found for 2027).

## 5. Summary table (PROPOSED)

| Festival | Proposed Atlanta 2027 dates | Evidence | Confidence |
|---|---|---|---|
| Makara Sankranti | Jan 14 (Thu) | S1 + S2, India difference explained | High-proposed |
| Maha Shivaratri | Mar 6 (Sat) | S1 + S2, all sources agree | High-proposed |
| Holi | Holika Dahan Mar 21, Holi Mar 22 | S1 + S2; S3 Mar 23 unexplained | High-proposed |
| Ugadi | Apr 7 (Wed) | S1 + S2, all sources agree | High-proposed |
| Rama Navami | Apr 14 (Wed) | S1 + S2, India difference explained | High-proposed |
| Krishna Janmashtami | Smarta-style Aug 24 vs Vaishnava Aug 25 | S1 internally inconsistent | **Disputed** |
| Ganesh Chaturthi | Sep 3 to Sep 14 | S1 + S2, India difference explained | High-proposed |
| Navaratri | Sep 30 to Oct 8 | S1 + S2 | High-proposed |
| Vijayadashami | Oct 9 (Sat) | S1 + S2 | High-proposed |
| Diwali | Oct 26 to Oct 30 (Lakshmi Puja Oct 28) | S1 + S2; Govardhan Oct 29/30 by tradition | High-proposed (span undecided) |

**"High-proposed" does not mean verified.** Under the approved standard (reliable Atlanta-specific source + independent cross-check) each still lacks a published independent source for Atlanta (section 6, open item 2).

## 6. Owner decisions and what is still open

**Decided 2026-11-07:** see section 0a (cross-check, Janmashtami, Diwali model, Drik attribution, re-verification).

**Still open:**
1. **Diwali reminder anchor:** PRD says reminders attach to the first day of an occurrence. With a main day of Oct 28 and a span starting Oct 26, which date should reminders use when Phase 5 arrives? (A schema/PRD question, not blocking research.)
2. **Independent published sources:** none obtained yet for any festival. This is the gating item for every `verified` date.
3. **Holi (S3 Mar 23) and Navaratri (S5 Oct 1):** unexplained entries in non-primary sources; low impact, noted only.

## 7. Reproducing the internal check

`docs/research/astro-check/` (Python 3 with only the standard library): `check_tithi_times.py` (compares computed and S1 tithi times), `check_rules_atlanta.py` (applies each rule to Atlanta), `check_rules_india.py` (same for Ujjain/IST), `check_diwali_ganesh_extras.py`. Run from that directory. These are research aids, not shipped code. Approximations: Meeus truncated series, Lahiri 23.853° at J2000 with linear precession (about ±0.01°, or roughly 15 minutes of solar motion); tithi boundaries match S1 to 2 minutes.

## 8. Publication approval record

| Festival | Proposed date(s) | Independent published Atlanta source? | Owner approval to publish | Status in `content/` |
|---|---|---|---|---|
| Makara Sankranti | Jan 14 | No | **Not approved** | none |
| Maha Shivaratri | Mar 6 | No | **Not approved** | none |
| Holi | Mar 21-22 | No | **Not approved** | none |
| Ugadi | Apr 7 | No | **Not approved** | none |
| Rama Navami | Apr 14 | No | **Not approved** | none |
| Krishna Janmashtami | disputed (Aug 24 / Aug 25) | No | **Not approved** | none |
| Ganesh Chaturthi | Sep 3-14 | No | **Not approved** | none |
| Navaratri | Sep 30-Oct 8 | No | **Not approved** | none |
| Vijayadashami | Oct 9 | No | **Not approved** | none |
| Diwali | Oct 26-30, main day Oct 28 | No | **Not approved** | none |

A row changes only when the owner records approval here, after which the date is entered in `content/festivals/<slug>.ts` as `verified` with its sources (the validator then enforces the independence rule).

## 9. Re-verification plan (mandatory)

- **December 2026 and January 2027:** check Atlanta temple and organisation calendars (Hindu Temple of Atlanta panchang/special-events pages, ISKCON Atlanta, other Atlanta temples, Telugu/Tamil/Kannada associations) for 2027 editions; record URLs, dates, methods and access dates.
- **Whenever a reliable new Atlanta-specific 2027 calendar appears:** re-run the comparison for all ten festivals and update sections 4, 5 and 8.
- **Before launch (Phase 6 gate, mandatory):** re-fetch S1 for every proposed or verified date, re-run `astro-check/`, and confirm no source has revised a date. A changed date resets that festival to `draft`.

## 10. P3-04B revisit (2026-11-08): decisions

**Re-check of independent Atlanta sources**
- **Hindu Temple of Atlanta** (https://www.hindutempleofatlanta.org/pages/panchang, read 2026-11-08): publishes yearly calendar PDFs (monthly, "Hindu Festivals", "Monthly Pujas", "Temple Pujas"). Only **2026** files are posted (the files date from early January 2026), so its **2027 calendar is expected around January 2027**. Its special-events page lists only November 2026 items.
- **Out-of-sample check of the rule application** (`astro-check/check_hta_2026.py`): applying the same rules to 2026 reproduces the temple's published Atlanta dates, Naraka Chaturdasi on Sat Nov 7 (Chaturdashi at sunrise) and Deepavalli on Sun Nov 8 (Amavasya at pradosh). This is evidence that the method matches an Atlanta temple in a year we can read. It is **not** verification of any 2027 date.

**Decision for every festival: no date is verified, and none is published.** The approved standard (owner decision B, reaffirmed 2026-11-07) needs a published independent Atlanta-specific source for 2027, and none exists yet.

| Festival | Proposed (research only) | Verification status | What would change it |
|---|---|---|---|
| Makara Sankranti | Jan 14 | Unverified | Atlanta temple 2027 calendar |
| Maha Shivaratri | Mar 6 | Unverified | same |
| Holi | Mar 21 to 22 | Unverified | same |
| Ugadi | Apr 7 | Unverified | same (Telugu or Kannada temple calendar preferred) |
| Rama Navami | Apr 14 | Unverified | same |
| Krishna Janmashtami | Aug 24 vs Aug 25 | **Disputed** | separate Smarta and Vaishnava Atlanta sources |
| Ganesh Chaturthi | Sep 3 to 14 | Unverified | same |
| Navaratri | Sep 30 to Oct 8 | Unverified | same |
| Vijayadashami | Oct 9 | Unverified | same |
| Diwali | Oct 26 to 30; main day Oct 28 | Unverified | same; also Govardhan Oct 29 vs 30 labelling |

The site code is ready for these dates (labelled tradition-specific observances, key days with one main day, countdowns, Explore, Calendar and home integration), proven with synthetic fixtures. Until a date is approved and entered in `content/` as `verified`, every page shows "Date not yet verified" and no countdown or reminder exists.

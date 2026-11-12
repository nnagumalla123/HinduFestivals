# Source availability and citation integrity report (P3-06)

Checked 2026-11-12. **Read-only.** Method: (1) every source URL in the ten records was requested with `curl` (GET, redirects followed, browser-like user agent; `tools/url-check.sh`, raw results in `url-status.tsv`); (2) the 26 URLs that refuse automated clients (22 Britannica, 3 Pluralism Project, 1 HTCI) were requested from inside the built-in browser, where all loaded; (3) structural checks on the content files (`tools/audit-generate.mjs`); (4) targeted re-reads of high-risk sources (section 3).

## 1. Availability

- **125 source entries, 104 unique URLs** across the ten guides (the dorm-policy and a few shared sources are cited by several guides).
- **Result by URL:** 200: 75, 200 (moved): 3, 403 to curl; 200 in browser: 26.
- **No URL is dead (no 404, 410 or connection failure).** Redirects: `https://www.hinduamerican.org/diwali-toolkit` and others listed below should have their stored URL updated (S3).
- Pages whose address redirects:

| Cited URL | Now resolves to |
|---|---|
| https://www.hinduamerican.org/diwali-toolkit | https://www.hinduamerican.org/diwali |
| https://karnatakatourism.org/en/experiences/experience-the-mysuru-dasara-festivities-in-karnataka | https://karnatakatourism.org/en/blogs/mysuru-dasara/ |
| https://www.downtoearth.org.in/news/health/dahi-handi-and-the-fall-of-the-young-govindas-55411 | https://www.downtoearth.org.in/health/dahi-handi-and-the-fall-of-the-young-govindas-55411 |

Note: the Karnataka Tourism Mysuru Dasara page was reached after two redirects to a different page title ("mysuru-dasara"); its content was re-read in full on 2026-11-12 (fetch tool) and still supports the Vijayadashami guide's claims, so the move is a stale address, not a lost source.

## 2. Structural integrity of the citations (all ten records)

| Check | Result |
|---|---|
| Every `sourceIds` entry in a section, quick fact or deity entry resolves to a source in the same record | pass (enforced by `validateRecord`; the full test suite passes) |
| Every source in a record is cited by at least one item | pass |
| Every source has a `termsNote`; `reproducesProtectedContent` false; `permissionRequired` "no" | pass (enforced by the validator for reviewed content) |
| Every cited source is `role: cultural` (no date or discovery source backs prose) | pass |
| Source IDs unique within each record | pass |
| Same URL under different IDs in different guides | 2 (expected: shared dorm and encyclopedia pages, listed in `sources.json`) |
| In-page citation anchors resolve; outbound links carry `noopener noreferrer`; 24 px targets | pass on all ten built pages (see the accessibility report) |
| Source kinds | cultural 55, other 17, academic 15, text 15, temple 2 |
| Publisher families (unique URLs) | britannica 22, brandeis 8, haf 8, wisdomlib 6, hinduismtoday 6, bbt 5, valmikiramayan 4, karnatakatourism.org 3 |

## 3. Claim-to-source spot checks (re-reads on 2026-11-12)

Britannica pages were re-read in the built-in browser; other pages through the fetch tool. Safety-critical sources were re-read first.

| Source | Result |
|---|---|
| Appalachian State open-flame policy | Supports: candles (lit or unlit), incense burners and oil lamps are prohibited in residence halls |
| University of Georgia Community Guide | Supports: open flames, candles and incense prohibited; string lights prohibited; in-room cooking limited. Our internal note says "sealed appliances"; the page also lists microwaves (internal wording only, **S3**) |
| Dartmouth open-flame policy | Supports the ban, and adds "the only exception ... is for religious or spiritual observance" (consistent with the guides' "ask your residence life office" line) |
| University of Louisville residence-hall safety | Supports candles and open flames; **does not mention incense** (it is cited by the Diwali guide among four policies; the guide's "candles, oil lamps and incense" is supported by the other three) |
| FDA sesame page | Supports (sesame is the ninth major allergen; labeling required from 1 January 2023) |
| American Academy of Ophthalmology eye injuries | **Partial** (finding F-03): "flush with plenty of clean water" is supported for chemical splashes; "do not rub" and "see a doctor if it persists" are not stated for chemical splashes (the page says to seek emergency medical treatment right away). The page's copyright notice also says its content may not be reproduced, copied or put into an AI program without permission; we paraphrase and link only |
| Karnataka Tourism, Sankranti | Supports glass-coated string caution and the ellu bella ingredients |
| USNO, solstices | Supports (winter solstice on or about 21 December; the Sun then begins its slow march northward) |
| Hinduism Today, Rama Navami | Supports panaka, spiced buttermilk, khoa, fasting; but it says **devotees** make and serve panaka and buttermilk, and only mentions temples for khoa (finding F-04) |
| HAF, 5 things to know about Holi | Supports the openness and the commercial-event point; the page does not say "HAF asks" (finding F-08) |
| Britannica, Holi | Supports thandai and bhang as separate drinks, Lathmar, Dol Jatra, the synthetic-color caution ("may contain toxic, metal-based pigments or potentially hazardous dyes and can cause skin and eye irritation"), the norm-relaxing statement and Holla Mohalla (spelled "Holla" on the page) |
| Britannica, Makar Sankranti | The solstice, sidereal-time, 14 January and solar-calendar statements are on the separate page "When does Makar Sankranti take place?" and the topic article, **not** on the cited "What is Makar Sankranti?" page (finding F-02) |
| Britannica, Diwali (festival of lights), Pongal, Lohri, Rama Navami, Maha Shivaratri, Navratri, Durga Puja, Vijayadashami, Dussehra, Ugadi, Magh Bihu, kites, Durga | Key phrases for each guide claim found on the rendered pages |
| Pluralism Project (Navaratri, Rama-Sita-Hanuman, Great Night of Shiva) | Loaded; the Navaratri page is a short entry that matches the claim it is cited for |

## 4. Terms review versus content reading (kept separate)

- **Terms pages read:** 35 of 104 unique sources. Unread or unavailable terms are recorded in each `termsNote`, never treated as permission, and do not by themselves block publication (owner decision).
- **Content-read status** is recorded separately in each audit note (full, partial, summary-only); sources read only through a model summary are not relied on for claims (Batch A and B packs).
- **Copyright, licensing or attribution concerns to escalate (informational, none blocking):** (a) the AAO page's notice mentions AI programs: we paraphrase and link only; (b) Incredible India terms (reproduction needs written consent): paraphrase and link only; (c) Britannica terms (no reproduction beyond personal or limited educational use): paraphrase and link only; (d) Hinduism Today and Outlook Traveller terms bar republication: paraphrase and link only. No text, images or data are reproduced. The repository and site are public, which the owner has accepted.

## 5. Full table

| Guide | Source id | Publisher | Kind | Status | Terms read | Content read (auto) | Cited by |
|---|---|---|---|---|---|---|---|
| diwali | `diwali-bath-reslife` | University of Bath (UK), Residence Life | academic | 200 | n | unspecified | diwali |
| diwali | `diwali-bhagavata-govardhana` | Bhaktivedanta Book Trust (vedabase.io) | text | 200 | n | unspecified | diwali |
| diwali | `diwali-bhagavata-lakshmi` | Bhaktivedanta Book Trust (vedabase.io) | text | 200 | n | unspecified | diwali |
| diwali | `diwali-bhagavata-naraka` | Bhaktivedanta Book Trust (vedabase.io) | text | 200 | n | unspecified | diwali |
| diwali | `diwali-birmingham-kali` | University of Birmingham (UK), student news blog by a PhD student from West Bengal | academic | 200 | n | unspecified | diwali |
| diwali | `diwali-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | unspecified | diwali |
| diwali | `diwali-britannica` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | diwali |
| diwali | `diwali-britannica-difference` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | diwali |
| diwali | `diwali-britannica-diya` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | diwali |
| diwali | `diwali-haf` | Hindu American Foundation | cultural | 200 (moved) | n | unspecified | diwali |
| diwali | `diwali-malaiya` | Yashwant K. Malaiya (Colorado State University faculty web page on Jain festivals) | academic | 200 | n | unspecified | diwali |
| diwali | `diwali-princeton` | Princeton University (Diwali at Princeton) | academic | 200 | n | unspecified | diwali |
| diwali | `diwali-sikhnet` | SikhNet | cultural | 200 | Y | unspecified | diwali |
| diwali | `diwali-valmiki` | valmikiramayan.net | text | 200 | n | unspecified | diwali |
| diwali | `dorm-appstate` | Appalachian State University | other | 200 | n | unspecified | diwali, ganesh-chaturthi, holi, krishna-janmashtami, maha-shivaratri, makara-sankranti, navaratri, rama-navami, ugadi, vijayadashami |
| diwali | `dorm-dartmouth` | Dartmouth College | other | 200 | n | unspecified | diwali, navaratri |
| diwali | `dorm-louisville` | University of Louisville Public Safety | other | 200 | n | unspecified | diwali |
| diwali | `dorm-uga` | University of Georgia Housing | other | 200 | n | unspecified | diwali, ganesh-chaturthi, holi, krishna-janmashtami, maha-shivaratri, makara-sankranti, navaratri, rama-navami, ugadi, vijayadashami |
| ganesh-chaturthi | `gc-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-brit` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | ganesh-chaturthi |
| ganesh-chaturthi | `gc-brit-ganesha` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | ganesh-chaturthi |
| ganesh-chaturthi | `gc-brit-tilak` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | ganesh-chaturthi |
| ganesh-chaturthi | `gc-brut` | Brut India (2026) | other | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-citizen` | Citizen Matters (2024) | other | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-fpj-tilak` | Free Press Journal (2021) | other | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-haf` | Hindu American Foundation | cultural | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-hpi2024` | Hindu Press International (2024) | other | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-ht2010` | Hinduism Today (Himalayan Academy) | cultural | 200 | Y | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-shivapurana` | wisdomlib.org (translation by J. L. Shastri, 1950) | text | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-telangana` | Telangana Today (2025) | other | 200 | n | full | ganesh-chaturthi |
| ganesh-chaturthi | `gc-tribune` | The Tribune (PTI), 2020 | other | 200 | n | full | ganesh-chaturthi |
| holi | `holi-aao` | American Academy of Ophthalmology | other | 200 | n | unspecified | holi |
| holi | `holi-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | unspecified | holi |
| holi | `holi-brit` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | holi |
| holi | `holi-haf` | Hindu American Foundation | cultural | 200 | n | unspecified | holi |
| holi | `holi-incredible-india` | Ministry of Tourism, Government of India (Incredible India) | cultural | 200 | Y | unspecified | holi |
| krishna-janmashtami | `jm-argus` | Argus News (Odisha), about 2025 | other | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-bhagavata` | Bhaktivedanta Book Trust, via vedabase.io | text | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-brit` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | krishna-janmashtami |
| krishna-janmashtami | `jm-dte` | Down To Earth (Centre for Science and Environment), 2016 | other | 200 (moved) | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-haf` | Hindu American Foundation | cultural | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-haf5` | Hindu American Foundation | cultural | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-incredible` | Incredible India, Ministry of Tourism, Government of India | cultural | 200 | n | summary | krishna-janmashtami |
| krishna-janmashtami | `jm-indiatv` | India TV News (2025) | other | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-iskcon` | ISKCON News (an ISKCON news report from 2009) | cultural | 200 | n | full | krishna-janmashtami |
| krishna-janmashtami | `jm-krishnacom` | Krishna.com (Bhaktivedanta Book Trust) | cultural | 200 | n | full | krishna-janmashtami |
| maha-shivaratri | `shivaratri-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | unspecified | maha-shivaratri |
| maha-shivaratri | `shivaratri-brit` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | maha-shivaratri |
| maha-shivaratri | `shivaratri-ddnews` | DD News (Prasar Bharati, Government of India) | cultural | 200 | n | full | maha-shivaratri |
| maha-shivaratri | `shivaratri-incredible-india` | Ministry of Tourism, Government of India (Incredible India) | cultural | 200 | Y | partial | maha-shivaratri |
| maha-shivaratri | `shivaratri-linga-purana` | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1951) | text | 200 | n | full | maha-shivaratri |
| maha-shivaratri | `shivaratri-maharashtra` | Department of Tourism, Government of Maharashtra | cultural | 200 | n | partial | maha-shivaratri |
| maha-shivaratri | `shivaratri-pluralism` | The Pluralism Project, Harvard University | academic | 403 to curl; 200 in browser | n | unspecified | maha-shivaratri |
| maha-shivaratri | `shivaratri-shiva-purana-38` | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950) | text | 200 | n | full | maha-shivaratri |
| maha-shivaratri | `shivaratri-shiva-purana-40` | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950) | text | 200 | n | full | maha-shivaratri |
| maha-shivaratri | `shivaratri-shiva-purana-7` | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950) | text | 200 | n | full | maha-shivaratri |
| makara-sankranti | `sankranti-akashvani` | News On AIR (All India Radio, Prasar Bharati) | cultural | 200 | n | full | makara-sankranti |
| makara-sankranti | `sankranti-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-brit-bihu` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-brit-kites` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-brit-lohri` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-brit-pongal` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-brit-regional` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-brit-what` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-chittoor` | Chittoor District, Government of Andhra Pradesh | cultural | 200 | n | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-fda` | U.S. Food and Drug Administration | other | 200 | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-haf` | Hindu American Foundation | cultural | 200 | n | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-ht-2010` | Hinduism Today (Himalayan Academy) | cultural | 200 | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-karnataka` | Department of Tourism, Government of Karnataka | cultural | 200 | Y | unspecified | makara-sankranti |
| makara-sankranti | `sankranti-maharashtra` | Department of Tourism, Government of Maharashtra | cultural | 200 | n | partial | makara-sankranti |
| makara-sankranti | `sankranti-usno` | U.S. Naval Observatory, Astronomical Applications Department | other | 200 | n | full | makara-sankranti |
| navaratri | `navaratri-britannica` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | navaratri |
| navaratri | `navaratri-britannica-durga` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | navaratri |
| navaratri | `navaratri-britannica-durga-puja` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | navaratri, vijayadashami |
| navaratri | `navaratri-britannica-vijayadashami` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | navaratri, vijayadashami |
| navaratri | `navaratri-devi-mahatmya` | Wisdomlib (public-domain Pargiter translation) | text | 200 | n | unspecified | navaratri |
| navaratri | `navaratri-hinduism-today-tamil` | Hinduism Today (a family account by a young writer in Texas) | cultural | 200 | n | unspecified | navaratri |
| navaratri | `navaratri-hpi` | Hindu Press International (Hinduism Today) | cultural | 200 | n | unspecified | navaratri |
| navaratri | `navaratri-pluralism` | The Pluralism Project, Harvard University | academic | 403 to curl; 200 in browser | n | unspecified | navaratri |
| rama-navami | `rama-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | unspecified | rama-navami |
| rama-navami | `rama-brit` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | rama-navami |
| rama-navami | `rama-ht-2010` | Hinduism Today (Himalayan Academy) | cultural | 200 | Y | unspecified | rama-navami |
| rama-navami | `rama-pluralism` | The Pluralism Project, Harvard University | academic | 403 to curl; 200 in browser | n | partial | rama-navami |
| rama-navami | `rama-valmiki-16` | valmikiramayan.net (Bala Kanda translated by Desiraju Hanumanta Rao) | text | 200 | n | full | rama-navami |
| rama-navami | `rama-valmiki-18` | valmikiramayan.net (Bala Kanda translated by Desiraju Hanumanta Rao) | text | 200 | n | full | rama-navami |
| ugadi | `ugadi-britannica` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | ugadi |
| ugadi | `ugadi-deccan-chronicle` | Deccan Chronicle (newspaper), March 2025 | cultural | 200 | n | unspecified | ugadi |
| ugadi | `ugadi-eb1911` | Encyclopaedia Britannica, 11th edition (1911), via Wikisource | text | 200 | Y | unspecified | ugadi |
| ugadi | `ugadi-hans-india` | The Hans India (newspaper, Hyderabad) | cultural | 200 | n | unspecified | ugadi |
| ugadi | `ugadi-htci-temple` | HTCI (htci.org), a US Hindu temple | temple | 403 to curl; 200 in browser | n | unspecified | ugadi |
| ugadi | `ugadi-htcs-temple` | Sri Venkateswara (Balaji) Temple, htcsusa.org (US temple) | temple | 200 | n | unspecified | ugadi |
| ugadi | `ugadi-karnataka-tourism` | Department of Tourism, Government of Karnataka | cultural | 200 | Y | unspecified | ugadi |
| ugadi | `ugadi-sahms` | South African Hindu Maha Sabha | cultural | 200 | n | unspecified | ugadi |
| ugadi | `ugadi-telangana-today` | Telangana Today (newspaper, Hyderabad; essay by Pratyusha Sista, March 2025) | cultural | 200 | n | unspecified | ugadi |
| vijayadashami | `vd-brandeis` | Brandeis University, Center for Spiritual Life | academic | 200 | n | full | vijayadashami |
| vijayadashami | `vd-brit-dussehra` | Encyclopaedia Britannica | cultural | 403 to curl; 200 in browser | Y | unspecified | vijayadashami |
| vijayadashami | `vd-haf` | Hindu American Foundation | cultural | 200 | n | full | vijayadashami |
| vijayadashami | `vd-haf-iskcon` | Hindu American Foundation (an interview with a leader of ISKCON) | cultural | 200 | n | full | vijayadashami |
| vijayadashami | `vd-karnataka` | Department of Tourism, Government of Karnataka | cultural | 200 (moved) | Y | full | vijayadashami |
| vijayadashami | `vd-mysuru` | Mysuru Dasara Committee, Government of Karnataka | cultural | 200 | Y | full | vijayadashami |
| vijayadashami | `vd-outlook` | Outlook Traveller (2026) | other | 200 | Y | full | vijayadashami |
| vijayadashami | `vd-unesco` | UNESCO Intangible Cultural Heritage | cultural | 200 | n | full | vijayadashami |
| vijayadashami | `vd-valmiki` | valmikiramayan.net | text | 200 | n | full | vijayadashami |

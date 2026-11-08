# P3-05 Batch A editorial review packet, revision 3 (final editorial pass): Makara Sankranti, Maha Shivaratri, Holi, Rama Navami

**Revised 2026-11-08 after your editorial decisions (revision 3 applies the six final changes listed below). STATUS: APPROVED and marked `reviewed` locally on 2026-11-08 (reviewer recorded internally as `desi-days-editorial`); not committed, pushed or deployed.** The four guides and their basics now publish through the loader. Every occurrence is still empty and no 2027 date is verified. The three previously reviewed pilot guides and the three Batch B festivals are unchanged. Packs behind this packet: [makar-sankranti.md](makar-sankranti.md), [maha-shivaratri.md](maha-shivaratri.md), [holi.md](holi.md), [rama-navami.md](rama-navami.md). Other files: [p3-05-batch-a-drafts-for-review.md](p3-05-batch-a-drafts-for-review.md), [p3-05-batch-a-verification-list.md](p3-05-batch-a-verification-list.md).

## How to use this packet

1. Read **What changed in this revision**, **Decision summary**, **Basics** and the **Register of unresolved claims** first.
2. Then read each guide (kept for the record). Under every section is a reviewer note and a decision row. Markers: 🔁 changed per your decision, ✅ unchanged, 💡 suggestion, 🔶 needs your decision.
3. **Outcome:** revision 3 was approved in full and marked reviewed after lint, typecheck, tests, an isolated production build, a leak scan and desktop and 375px checks (see docs/PROJECT_HANDOFF.md).
4. No commit, push or deploy has happened; those need your separate approval.

## Two different statuses for every source

The research documents now keep two things apart:

- **Content read status:** which part of the page's content was actually read, and how (read in full in a browser, first part only, read by a fetch agent, or a search-result summary that is not relied on). This decides whether a claim may rest on the source.
- **Terms review status:** whether the publisher's terms, copyright or linking page was read, and what it says about paraphrasing and linking. An unread or missing terms page is recorded as such, is never treated as permission, and does not by itself block an original paraphrase plus a link. A source whose terms restrict linking (IGNCA) is left out.

In the content files, each source's `termsNote` now starts with "Terms review:" and states the content-read status separately.

## What changed in revision 3 (final editorial pass)

1. **Holi:** the unsupported cannabis-infused-drinks clause and the inferred 'ordinarily made without cannabis' wording are removed; only the Britannica-supported thandai and bhang distinction remains.
2. **Makara Sankranti:** the December solstice and the Sun's northward turn are now cited to the U.S. Naval Observatory page "Sunrise and Sunset Times Near the Solstices" (source `sankranti-usno`), read in full in the browser on 2026-11-08, and cited from the overview, the 'Meaning' quick fact and the solar-calendar section.
3. **Makara Sankranti:** Surya's entry no longer implies the astronomical turn occurs on Makara Sankranti.
4. **Makara Sankranti:** the Telugu-region detail is limited to the two sources' statements about Kanuma; the unsourced 'several days' is dropped.
5. **Holi:** the synthetic-color wording is softened; eye-safety and consent language kept.
6. **Maha Shivaratri and Rama Navami:** the repeated dietary/medical disclaimers are replaced by 'Fasting practices vary by family and tradition.'; nothing else changed in these guides.

## What changed in revision 2

| Guide | Change |
|---|---|
| Makara Sankranti | Subtitle "A solar festival of harvest and renewal"; canonical name and "Makar Sankranti" alias kept; overview, quick fact and solar-calendar section now separate the traditional uttarayana reckoning from the astronomical December solstice and keep Britannica's solstice-history note; Surya and Indra kept (Indra tied to Tamil Pongal); Bhishma omitted; allergen and kite cautions kept; one Telangana and Andhra sentence (Kanuma) added from a single targeted search. |
| Maha Shivaratri | Pillar-of-light wording simplified; poison and marriage kept, shortened; Parvati's fasting account removed (text, quick fact, deity entry); hunter story, one-sentence Herath, regional differences and optional fasting language kept; fasting and vigil advice made neutral. |
| Holi | Radha and Krishna shortened (no skin-color detail); Shiva-and-Kama story, its quick-fact mention and the ancient-origins paragraph removed; thandai and bhang kept separate and neutral; "Holika Dahan" removed from aliases and explained as a preceding observance; hierarchy line softened; consent and eye-safety kept. |
| Rama Navami | Ayodhya section folded into the worship section; Michigan example shortened; the inference that the festival arose later removed; spring Navaratri link kept; temple foods now attributed. |
| All four | Fasting lines no longer read as personal dietary or medical advice; documentation separates content-read status from terms-review status. |

## Targeted checks completed earlier (2026-11-08)

| Check | Result |
|---|---|
| IGNCA linking policy, read live | Prior permission is required before hyperlinks are directed to its site; copyright bars reproduction without written permission. **No permission requested** (your decision). Not used as a source. |
| Alternative Herath source | None of scholarly standing; one DD News (Prasar Bharati) item gives the name and says it is observed with night-long prayers at home. **Herath stays one sentence.** |
| Sesame allergy source | The FDA page was read directly (sesame is a major food allergen and must be declared on packaged-food labels). |
| Summary-only government pages | Incredible India Holi and Maha Shivratri and the first parts of the Maharashtra Tourism pages were re-read in a browser. |
| Valmiki credit (Diwali question) | No error: Murthy translated the Yuddha Kanda; Desiraju Hanumanta Rao translated the Bala Kanda. |
| **Telugu-region source (one targeted attempt)** | Partly found. A News On AIR (Prasar Bharati) item (Telangana: Kanuma, the festival of cattle, on the third day of Sankranti; cattle and farm tools worshipped; cattle processions) and the Chittoor District (Government of Andhra Pradesh) page (Kanuma with decorated bulls paraded) were read in a browser. In revision 3 the guide text was narrowed to exactly these statements. The Andhra Pradesh Tourism page covering Bhogi, Sankranti and Mukkanuma could not be opened, so **only Kanuma is written** and the rest is recorded as a gap. |

## Decision summary

| Guide | Items | Unchanged | Changed per your decision | Suggestions | Needs your decision |
|---|---|---|---|---|---|
| Makara Sankranti | 10 | 6 | 4 | 0 | 0 |
| Maha Shivaratri | 11 | 5 | 6 | 0 | 0 |
| Holi | 11 | 2 | 9 | 0 | 0 |
| Rama Navami | 9 | 4 | 5 | 0 | 0 |

**No item is waiting on a decision from revision 3.** Holi's cannabis clause was removed (former U7) and the solstice astronomy is now cited (former U14).

## Basics (all four guides)

| Festival | Subtitle | Aliases | Deity search terms | Notes | Decision |
|---|---|---|---|---|---|
| Makara Sankranti | A solar festival of harvest and renewal | Sankranti, Makar Sankranti | Surya | Your subtitle. Pongal, Lohri, Uttarayan and Bihu are not aliases. | ☐ Approve ☐ Edit |
| Maha Shivaratri | The great night of Shiva | Shivaratri, Mahashivratri, Maha Shivratri | Shiva, Parvati | "Herath" is not an alias. | ☐ Approve ☐ Edit |
| Holi | The festival of colors | none | Krishna, Radha, Vishnu | Holika Dahan removed from aliases and explained in the guide. | ☐ Approve ☐ Edit |
| Rama Navami | A festival honoring the birth of Rama | Ram Navami, Sri Rama Navami | Rama, Sita, Hanuman | Proposed basics kept. | ☐ Approve ☐ Edit |

## Register of unresolved claims

| # | Guide | Claim or gap | Status | What would resolve it |
|---|---|---|---|---|
| U1 | Maha Shivaratri | Kashmir's Herath tradition beyond one sentence | **Omitted** (IGNCA needs link permission; no scholarly alternative; no request, per your decision) | A reputable scholarly or museum source |
| U2 | Holi | Which text tells Holika's burning | **Accepted as traditional narrative** (your decision) | Optional: Narada, Bhavishya and a full Vishnu Purana |
| U3 | Makara Sankranti | Bhogi, Sankranti day and Mukkanuma in Andhra Pradesh and Telangana | **Partly resolved**: only Kanuma is written | A readable reputable source (Andhra Pradesh Tourism could not be opened) |
| U4 | Maha Shivaratri | The poison and marriage stories rest on government tourism pages (stated as beliefs) | Included briefly, attributed | A verbatim scholarly or encyclopedic source |
| U5 | Maha Shivaratri | The hunter story's popular currency (primary text only) | Included from the Shiva Purana | A secondary source |
| U6 | Holi | Dol Jatra and Lathmar details; plant colors; the bhang statement | Included, **one source each (Britannica)** | Second sources |
| U7 | Holi | Cannabis-infused versions of other drinks "may exist" | **Resolved (revision 3): clause removed** | Nothing further |
| U8 | Holi | Holi-specific health guidance | Not found; general AAO eye guidance used | An AAD or other medical page on Holi colors |
| U9 | Rama Navami | Bhadrachalam, panaka region, Vivaha Panchami, Vaishnava differences | **Omitted or generic** | An official temple source, a regional source |
| U10 | Rama Navami | The Ramcharitmanas birth passage | Not read | An English translation |
| U11 | Maha Shivaratri, Rama Navami | US temple examples come from undated Pluralism essays | Generic, unnamed (Michigan only) | A dated, named source |
| U12 | All | Pages read only in part (Britannica's Pongal, Lohri, Holi end, Rama Navami end; Maharashtra Tourism; Incredible India) | Unread parts not used | Read the rest |
| U13 | All | utsav.gov.in (expired certificate), Andhra Pradesh Tourism (not reachable), PDF files | Not read | Retry later |
| U14 | Makara Sankranti | The December-solstice statement | **Resolved (revision 3):** cited to the U.S. Naval Observatory page, read in full. The page gives the solstice date and the Sun's northward movement afterward; the "few weeks earlier" comparison with the festival is the editor's inference from that and Britannica's mid-January timing (no date is printed) | Optional second astronomy source (a NASA page read through the fetch tool agrees on the southernmost position but was not used) |

---

# Makara Sankranti

## Basics (reviewed)

- **Subtitle:** A solar festival of harvest and renewal
- **Aliases:** Sankranti, Makar Sankranti
- **Deity search terms:** Surya

> **Reviewer note — 💡 SUGGESTION**
> Basics decision is in the **Basics** table above.
>
> **Your decision:** see the Basics table

## Quick facts (reviewed)

- **Meaning:** “Sankranti” means “transition.” Makara Sankranti marks the Sun’s entry into the sign of makara (Capricorn) in the Hindu solar calendar. By tradition it begins uttarayana, the Sun’s northward course; the astronomical turn comes at the December solstice, a few weeks earlier.  
  Sources: sankranti-brit-what, sankranti-brandeis, sankranti-usno
- **Length of observance:** One day, with related festivals around it: Lohri the evening before, and Pongal, a four-day festival, in Tamil Nadu. _(Varies by region)_  
  Sources: sankranti-brit-regional, sankranti-brit-pongal, sankranti-haf
- **Associated deities:** Surya, the Sun god, in many regions. In Tamil Pongal, Indra is honored on the first day. _(Varies by region)_  
  Sources: sankranti-brit-what, sankranti-haf, sankranti-brit-pongal
- **Common customs:** Sharing sesame-and-jaggery sweets, bathing in sacred rivers, bonfires, rangoli or kolam, honoring cattle, and flying kites, especially in Gujarat.  
  Sources: sankranti-brit-what, sankranti-brit-regional, sankranti-haf
- **Signature foods:** Sesame-and-jaggery sweets in Maharashtra and Karnataka, rice boiled with milk and jaggery in Tamil Nadu (Pongal), and sweets made with new rice in West Bengal. _(Regional)_  
  Sources: sankranti-brit-regional, sankranti-brit-pongal, sankranti-karnataka, sankranti-maharashtra

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** 'Meaning' now separates the traditional uttarayana reckoning from the astronomical December solstice. Indra is kept and tied to Tamil Pongal; 'Signature foods' unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Surya** (Hindu traditions across India): The Sun god, honored with thanks at harvest time and on Makara Sankranti, the day the Sun enters makara in the Hindu solar calendar.  
  Sources: sankranti-brit-what, sankranti-haf
- **Indra** (Tamil Pongal): Honored as the god of rain on Bhogi, the first day of Pongal.  
  Sources: sankranti-brit-pongal, sankranti-ht-2010

> **Reviewer note — ✅ UNCHANGED**
> **Revision 3:** Surya's entry no longer implies the Sun's astronomical northward turn happens on Makara Sankranti (it now says thanks are offered on the day the Sun enters makara in the solar calendar, and at harvest). Indra kept, explicitly 'Tamil Pongal'. Saraswati (HAF only) stays out.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Makara Sankranti?

Makara Sankranti is a solar festival of harvest and renewal. In the Hindu solar calendar it marks the Sun’s entry into the sign of makara, or Capricorn, and by tradition it opens uttarayana, the Sun’s northward course. Astronomically, the Sun’s turn comes at the December solstice, a few weeks earlier. Because the festival follows the Sun rather than the Moon, it falls at nearly the same point each year.

Families give thanks for the harvest, share sesame-and-jaggery sweets, bathe in rivers, light bonfires and, in some places, fly kites. The season is celebrated under different names across India, from Pongal in Tamil Nadu to Lohri in Punjab, Uttarayan in Gujarat and Magh Bihu in Assam. Each is its own celebration, kept apart in this guide.

**Sources:** `sankranti-brit-what`, `sankranti-brit-regional`, `sankranti-haf`, `sankranti-brandeis`, `sankranti-usno`

**Research notes (internal, not published):**
- SOURCE NOTE: core summary rests on Britannica plus HAF and Brandeis; the Brandeis claim that this is the only Hindu festival on the solar calendar is over-generalised and is not used.
- EDITORIAL: owner decision 2026-11-08: Pongal, Lohri, Magh Bihu and Uttarayan are described as related solar-season celebrations, never as aliases or as the same festival under other names.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** canonical name 'Makara Sankranti' (Makar as an alias); overview now says the festival opens uttarayana by tradition while the Sun's actual turn is the December solstice, a few weeks earlier.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### A solar festival: tradition and astronomy

Sankranti means “transition.” Makara Sankranti is the Sun’s transition into makara in the Hindu solar reckoning, which follows the Sun’s position against the stars. By tradition, uttarayana, the half of the year in which the Sun travels north, is counted from this day. It is regarded as an auspicious time, and the days around it are seen as a favorable moment for new undertakings such as weddings.

This is a traditional reckoning, not the astronomical turn of the Sun. At the December solstice, a few weeks before Makara Sankranti, the Sun reaches its most southerly track in the sky, and the U.S. Naval Observatory explains that it then begins its slow march northward. Britannica notes that the festival began as a winter-solstice holiday, but because it is reckoned by the stars, the two dates have drifted apart over the centuries. Unlike most Hindu festivals, which follow a calendar based on both Moon and Sun, it follows the solar calendar, so it moves very little from year to year.

**Sources:** `sankranti-brit-what`, `sankranti-brit-pongal`, `sankranti-haf`, `sankranti-brandeis`, `sankranti-usno`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica says the festival began as a winter-solstice holiday and that, because its date now follows sidereal time, the date and the solstice are no longer the same (precession of the equinoxes). The astronomy (the Sun’s most southerly track at the December solstice, then its northward movement) is cited to the U.S. Naval Observatory page “Sunrise and Sunset Times Near the Solstices”, read in full in the browser on 2026-11-08. That page does not give the “few weeks earlier” gap to Makara Sankranti; that comparison rests on the solstice date it gives (on or about December 21) and the festival’s mid-January timing in Britannica, and no date appears in the guide. Owner direction 2026-11-08: the guide separates the traditional uttarayana reckoning from the astronomical solstice in the overview, the quick fact and this section.
- SOURCE NOTE: Britannica says the festival is on 14 January, or 15 January in leap years; other pages give a range. The guide states no date, and the Atlanta date work stays in the date ledger.
- EDITORIAL: the Bhishma story is omitted (owner direction 2026-11-08); the guide keeps only the belief that uttarayana is auspicious.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed per your direction:** explains the traditional uttarayana association, keeps Britannica's note that the festival began as a winter-solstice holiday, and distinguishes it from the December solstice. **Revision 3:** the astronomy is now cited to the U.S. Naval Observatory page "Sunrise and Sunset Times Near the Solstices" (read in full in the browser): at the December solstice the Sun is on its most southerly track, after which it begins its slow march northward. Bhishma is omitted.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### Customs of the season

A few customs appear in many places, each with local forms. Many people bathe in rivers, especially where rivers meet; pilgrims go to Gangasagar, where the Ganges reaches the sea, and to Prayagraj for the Magh Mela. Sesame and jaggery sweets are exchanged as a gesture of goodwill. Bonfires are lit in several regions, and homes are cleaned and decorated with rangoli or kolam.

Cattle, honored as helpers of the harvest, are garlanded or decorated and fed. In Gujarat the sky fills with kites. Britannica notes that the many reasons people give for flying kites are suggestions, and that the pastime has simply become part of the festival.

**Sources:** `sankranti-brit-what`, `sankranti-brit-regional`, `sankranti-brit-kites`, `sankranti-haf`, `sankranti-ht-2010`, `sankranti-maharashtra`

**Research notes (internal, not published):**
- SOURCE NOTE: kite-flying health claims (vitamin D) from Karnataka Tourism are uncited and are left out.
- EDITORIAL: no reason is given for kites beyond Britannica’s own caution that the reasons offered are suggestions.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged; no reason is given for kites.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Sesame, jaggery and new rice

_Tradition: Regional_

Sweet foods mark the season, and each region has its own. In Maharashtra, families exchange tilgul, sesame-and-jaggery sweets, with a wish to speak sweetly to one another. In Karnataka, people share ellu bella, a mix of sesame, fried gram, dried coconut, peanuts and jaggery, and make both sweet and savory pongal.

In Tamil Nadu, rice cooked with milk and jaggery is the festival’s signature dish. A sweet version made with lentils and jaggery is called chakkara pongal, and a savory one made with rice and lentils is ven pongal. In West Bengal, sweets are made from the new rice. What a family makes depends on its region and its own tradition.

**Sources:** `sankranti-brit-regional`, `sankranti-brit-pongal`, `sankranti-karnataka`, `sankranti-maharashtra`, `sankranti-ht-2010`

**Research notes (internal, not published):**
- EDITORIAL: no fasting or vegetarian claim is made; no source read describes fasting for Makar Sankranti.
- SOURCE NOTE: Karnataka Tourism’s statement that sesame and jaggery are “natural heat boosters” is unsourced and is not used.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged; no fasting claim.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Celebrating Makar Sankranti away from home

You can keep the festival going away from home with a few simple choices.

Find your people. Ask a regional student association or a nearby temple whether it plans a Sankranti, Pongal or Lohri gathering.

Share sesame sweets thoughtfully. Sesame is one of the nine major food allergens in the United States, so tell friends what is in what you share, and if you are buying sweets, check the label.

Cook in a shared kitchen. A pot of pongal is a good dish to try, but cooking in residence-hall rooms is often restricted, so use a shared kitchen if your housing allows.

Leave the bonfire for public events. Many residence halls ban open flames, including candles and lamps, so check your housing contract before you light or hang anything. If you have questions about religious accommodations, ask your residence life office.

Fly kites carefully. Use ordinary string, never glass-coated string, and fly only where local rules allow, away from roads and overhead wires.

Call home. A video call with family at festival time keeps you part of the celebration.

**Sources:** `sankranti-fda`, `sankranti-karnataka`, `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. The allergen point rests on the FDA page (read directly 2026-11-08); the glass-coated-string caution is Karnataka Tourism’s; keeping kites away from roads and overhead wires is common-sense advice with no source.
- OPTIONAL: no Atlanta-area Sankranti or Pongal organization has been verified, so none is named.

> **Reviewer note — ✅ UNCHANGED**
> Allergen tip (FDA, read directly) and the glass-coated-string caution kept, as you asked. No fasting advice appears here.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### One solar moment, many festivals

_Tradition: Regional; varies by community_

The Sun’s entry into makara is marked across India, but under different names and with different customs. They are related celebrations, not one festival with many labels.

In Gujarat it is Uttarayan, known for kite flying and the International Kite Festival in Ahmedabad. In Maharashtra and the Deccan it is Til Sankranti, when sesame and jaggery sweets are shared. In West Bengal it is Poush Sankranti, celebrated with sweets made from new rice. In Punjab, Lohri is celebrated the evening before, around a bonfire. In Tamil Nadu the season brings the four-day harvest festival of Pongal, and in Assam, Magh or Bhogali Bihu brings feasts and a bonfire called the meji. In Kerala, devotees of Ayyappan mark the day with Makaravilakku and a pilgrimage to Sabarimala.

In Telangana and Andhra Pradesh, Kanuma, the festival of cattle, is part of Sankranti. In Telangana it falls on the third day, when cattle and farm tools are worshipped and cattle processions are held, and in Andhra Pradesh bulls are decorated and paraded.

People describe the relationship among these in different ways: some see regional names for one observance, others see separate festivals that share a season. Here each keeps its own name.

**Sources:** `sankranti-brit-regional`, `sankranti-brit-bihu`, `sankranti-haf`, `sankranti-ht-2010`, `sankranti-akashvani`, `sankranti-chittoor`

**Research notes (internal, not published):**
- EDITORIAL: the sources frame the relationship differently (Britannica lists regional observances; HAF says one festival under different names yet describes distinct practices; Britannica’s Pongal article says Pongal is Makar Sankranti in other states). The wording follows the owner decision to distinguish them.
- SOURCE NOTE: the Telangana and Andhra Pradesh sentence rests on one targeted search on 2026-11-08 (owner direction): a News On AIR (Prasar Bharati) item says that in Telangana Kanuma is the festival of cattle on the third day of Sankranti, with cattle and agricultural tools worshipped and cattle processions, and the Chittoor District (Government of Andhra Pradesh) page says Kanuma during Sankranti is celebrated with bulls decorated and paraded. The district page adds that in some parts bulls are chased; that is left out (animal custom).
- OPTIONAL: Bhogi, Sankranti day and Mukkanuma in Andhra Pradesh and Telangana are not described: the Andhra Pradesh Tourism page that covers them could not be opened in the fetch tool or the browser, and only its search-result summary was seen, which is not relied on. No details are invented. A reliable source for those days is still wanted.
- EDITORIAL: Magh Bihu’s buffalo and egg fights and Karnataka’s cattle-through-fire ritual are intentionally omitted (animal customs, sensitive).

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed (revision 3 narrowed it):** the Telangana and Andhra detail is only what the two sources say: Kanuma is part of Sankranti; in Telangana it is the third day with worship of cattle and farm tools and cattle processions (News On AIR); in Andhra Pradesh bulls are decorated and paraded (Chittoor District). The unsourced 'celebrated over several days' is removed. Bhogi, Sankranti day and Mukkanuma stay unwritten (no readable source). Pongal, Lohri, Magh Bihu and Uttarayan remain distinct.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Pongal: four days of thanks

_Tradition: Tamil Nadu and the Tamil diaspora_

Pongal is a four-day harvest festival of Tamil Nadu, celebrated by Tamils around the world. It follows the Tamil solar calendar and opens the month of Thai. The name comes from a Tamil word meaning “to boil over,” a sign of abundance, and the central dish is rice cooked with milk and jaggery until it overflows.

The four days are Bhogi, for Indra, when old things are cleared out and homes cleaned; Surya Pongal, for the Sun; Mattu Pongal, for the cattle that help with the harvest, who are decorated and fed; and Kaanum Pongal, for family and friends. Britannica traces the festival to the Sangam age, when it was called Thai Niradal, and notes that some scholars link it to Vedic first-fruit rites.

**Sources:** `sankranti-brit-pongal`, `sankranti-haf`, `sankranti-ht-2010`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica’s Pongal article was read only through the start of day one; days two to four rest on its table plus HAF and Hinduism Today.
- OPTIONAL: Britannica’s Pongal article says Pongal is known as Makar Sankranti “in other Indian states”; the guide does not repeat that so that Pongal stays a distinct festival.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Lohri: the evening before

_Tradition: Punjab and northern India_

Lohri is celebrated the evening before Makar Sankranti, mainly in Punjab, Haryana, Himachal Pradesh and Delhi. Families and neighbors gather around a bonfire lit at sunset, with songs and dancing, to mark the end of the winter season. Hindus and Sikhs both celebrate it.

The name is explained in more than one way: some link it to an iron griddle, others to Dulla Bhatti, a folk hero from the Mughal period. Britannica notes that the exact origin of the festival is unclear.

**Sources:** `sankranti-brit-lohri`, `sankranti-haf`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica’s Lohri article was read only in its first part (origin and harvest context); the bonfire and community details are from that part and HAF.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `sankranti-brit-what` | What is Makar Sankranti? (and When does Makar Sankranti take place?) | Encyclopaedia Britannica | https://www.britannica.com/question/What-is-Makar-Sankranti | Done |
| `sankranti-brit-regional` | How do people celebrate Makar Sankranti in different parts of India? | Encyclopaedia Britannica | https://www.britannica.com/question/How-do-people-celebrate-Makar-Sankranti-in-different-parts-of-India | Done |
| `sankranti-brit-kites` | Why do people fly kites during Makar Sankranti? | Encyclopaedia Britannica | https://www.britannica.com/question/Why-do-people-fly-kites-during-Makar-Sankranti | Done |
| `sankranti-brit-pongal` | Pongal | Encyclopaedia Britannica | https://www.britannica.com/topic/Pongal | Done |
| `sankranti-brit-bihu` | What is Magh Bihu? | Encyclopaedia Britannica | https://www.britannica.com/question/What-is-Magh-Bihu | Done |
| `sankranti-brit-lohri` | Lohri | Encyclopaedia Britannica | https://www.britannica.com/topic/Lohri | Done |
| `sankranti-haf` | Lohri, Makar Sankranti, and Pongal: India’s winter harvest festivals | Hindu American Foundation | https://www.hinduamerican.org/blog/lohri-makar-sankranti-and-pongal-indias-winter-harvest-festivals | Not done |
| `sankranti-ht-2010` | Festivals: Sankranti or Pongal | Hinduism Today (Himalayan Academy) | https://www.hinduismtoday.com/magazine/april-may-june-2010/2010-04-festivals-sankranti-or-pongal/ | Done |
| `sankranti-brandeis` | Makar Sankranti (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/makar-sankranti.html | Not done |
| `sankranti-karnataka` | Sankranti in Karnataka | Department of Tourism, Government of Karnataka | https://karnatakatourism.org/en/blogs/sankranti-in-karnataka/ | Done |
| `sankranti-maharashtra` | Makar Sankranti (Maharashtra Tourism) | Department of Tourism, Government of Maharashtra | https://maharashtratourism.gov.in/festivals/makar-sankranti/ | Not done |
| `sankranti-akashvani` | Telangana celebrates festival of cattle Kanuma | News On AIR (All India Radio, Prasar Bharati) | https://newsonair.gov.in/telangana-celebrates-kanuma-with-cattle-worship-processions-rural-sports/ | Not done |
| `sankranti-chittoor` | Cultural Tourism (Chittoor District) | Chittoor District, Government of Andhra Pradesh | https://chittoor.ap.gov.in/cultural-tourism/ | Not done |
| `sankranti-usno` | Sunrise and Sunset Times Near the Solstices | U.S. Naval Observatory, Astronomical Applications Department | https://aa.usno.navy.mil/faq/rs_solstices | Not done |
| `sankranti-fda` | The FASTER Act: Sesame Is the Ninth Major Food Allergen | U.S. Food and Drug Administration | https://www.fda.gov/food/food-allergies/faster-act-sesame-ninth-major-food-allergen | Done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

# Maha Shivaratri

## Basics (reviewed)

- **Subtitle:** The great night of Shiva
- **Aliases:** Shivaratri, Mahashivratri, Maha Shivratri
- **Deity search terms:** Shiva, Parvati

> **Reviewer note — 💡 SUGGESTION**
> Basics decision is in the **Basics** table above.
>
> **Your decision:** see the Basics table

## Quick facts (reviewed)

- **Meaning:** “The great night of Shiva” (maha, great, plus ratri, night), the most important yearly celebration of Shiva for his devotees.  
  Sources: shivaratri-brit, shivaratri-pluralism
- **Length of observance:** One night of fasting and vigil. In many places the following day brings feasting and fairs.  
  Sources: shivaratri-brit
- **Associated deities:** Shiva, most often worshipped in the form of the lingam. Parvati appears in the marriage story. _(Shaiva and wider Hindu traditions)_  
  Sources: shivaratri-brit, shivaratri-pluralism, shivaratri-maharashtra
- **Common customs:** Fasting, an all-night vigil, bathing the lingam with milk, honey and water, chanting “Om Namah Shivaya,” and offering bilva leaves.  
  Sources: shivaratri-brit, shivaratri-pluralism, shivaratri-brandeis, shivaratri-incredible-india
- **Dietary practices:** Many devotees fast, and how strictly varies. Simple, satvik foods such as fruit and sago dishes are described for those who fast. Practices differ by region, family and tradition. _(Varies)_  
  Sources: shivaratri-brit, shivaratri-brandeis, shivaratri-maharashtra

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** the deities fact no longer mentions Parvati's fast.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Shiva** (Shaiva and wider Hindu traditions): The god honored on this night. He is worshipped most often as the lingam, a simple stone shaft, and is also shown as a yogi and as the dancing Nataraja.  
  Sources: shivaratri-brit, shivaratri-pluralism
- **Parvati** (Varies by community): Shiva’s consort. In some accounts the night celebrates their marriage.  
  Sources: shivaratri-maharashtra, shivaratri-incredible-india

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** Parvati's entry keeps only the marriage account.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Maha Shivaratri?

Maha Shivaratri, “the great night of Shiva,” is the most important yearly celebration for devotees of Shiva. Many keep a fast, stay awake through the night in prayer, and worship the Shiva lingam, the simple stone form in which Shiva is most often honored, bathing it with milk, honey and water. Devotees believe that worship on this night brings religious and worldly benefits.

Why this night is special is explained in several ways: as the night a blazing pillar of light revealed Shiva’s boundless nature, as the night of Shiva and Parvati’s marriage, or as the night Shiva drank a poison that threatened the world. Each tradition tells it in its own way, and no single story is the only reason.

**Sources:** `shivaratri-brit`, `shivaratri-pluralism`, `shivaratri-maharashtra`, `shivaratri-incredible-india`

**Research notes (internal, not published):**
- SOURCE NOTE: core summary rests on Britannica plus the Pluralism Project (Harvard) and two government tourism pages; Britannica’s own legend list is only in an AI-generated summary page, which is not cited.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### A night each month, and a great night once a year

The 14th day of the dark half of every lunar month is sacred to Shiva, and the monthly night is called Shivaratri. Maha Shivaratri, the great night, comes in late winter and is the occasion of particular rejoicing, the year’s most important celebration of Shiva.

Shiva, also called Mahadeva, “the great lord,” is seen in Shaiva tradition as both creator and destroyer. He is worshipped most often as the linga, a simple stone shaft often understood as a symbol of cosmic wholeness, and he is also shown as a yogi and as the dancer Nataraja.

**Sources:** `shivaratri-brit`, `shivaratri-pluralism`, `shivaratri-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica says the occasion is especially joyful in Magha and, above all, Phalguna; month names differ between lunar calendars, so the guide says only “late winter” and gives no date.
- EDITORIAL: the linga’s interpretation (a male-and-female symbol of cosmic wholeness) is one source’s reading and is hedged as “often understood”.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### The pillar of light

_Tradition: Shaiva tradition; the Linga Purana and the Shiva Purana_

One well-known story tells of a time when Brahma and Vishnu argued over which of them was greater. A blazing pillar of light appeared before them, with no beginning and no end. Vishnu took the form of a boar and dived to find its base, and Brahma took the form of a swan and flew up to find its top, but neither could. They bowed to Shiva, who had appeared as the pillar and is honored in it as the linga.

The Linga Purana and the Shiva Purana tell this story, and Shaiva festival tradition associates it with Maha Shivaratri.

**Sources:** `shivaratri-linga-purana`, `shivaratri-shiva-purana-7`, `shivaratri-pluralism`

**Research notes (internal, not published):**
- SOURCE NOTE: the Linga Purana chapter (1.17) and the Shiva Purana chapter (Vidyesvara 7) were read in J. L. Shastri’s translation on wisdomlib; neither names a night, a tithi, a month or Shivaratri. Pluralism says “it was on this night, they say” that the linga of light was revealed. Wikipedia’s claim that the Linga Purana ties it to Maha Shivaratri is not supported by the chapter read.
- SOURCE NOTE: in the Puranas it is Brahma and Vishnu who quarrel; Pluralism’s version says “the gods”. The guide follows the text.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Simplified as you asked:** 'The Linga Purana and the Shiva Purana tell this story, and Shaiva festival tradition associates it with Maha Shivaratri.' The text no longer says anything about what the passages name, so it cannot imply that they name the night; the internal notes still record that they do not.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Other stories: the poison and the marriage

_Tradition: Varies by tradition_

Other stories are told about the night in different places. In one, the gods and demons churned the ocean and a deadly poison rose from it; Shiva drank it to protect the world, and it turned his throat blue. In another, the night celebrates the marriage of Shiva and Parvati, a festival of divine union. Many people know more than one.

**Sources:** `shivaratri-maharashtra`, `shivaratri-incredible-india`

**Research notes (internal, not published):**
- OPTIONAL: a second reputable source, read verbatim, for the poison story would help; the Kashmiri scholarly article (IGNCA) that hedges it cannot be used. Maharashtra Tourism states the poison story and the marriage as beliefs about the day, and Incredible India describes the night as the union of Shiva and Parvati.
- EDITORIAL: owner direction 2026-11-08: the separate account of Parvati’s fast (Brandeis) was removed; it is a single, unattributed source with no festival-specific textual basis. Brandeis stays cited only for fasting, chanting and decorating the lingam.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Shortened and attributed** to Maharashtra Tourism and Incredible India. The separate Parvati fasting account (Brandeis) is removed.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### The hunter who worshipped without knowing

_Tradition: Shiva Purana_

The Shiva Purana tells of a hunter named Gurudruha who, not knowing it was Shivaratri, went into the forest to find food for his family and spent the night in a bilva tree beside a pond. As he kept watch through the night, leaves and drops of water fell from the tree onto a linga below. He spared the animals that came to the pond when they promised to return, and each of them kept its promise. Shiva appeared, blessed the hunter and freed the animals.

The story is told to show that worship offered on this night is blessed, even when it is offered without knowing.

**Sources:** `shivaratri-shiva-purana-40`

**Research notes (internal, not published):**
- SOURCE NOTE: Kotirudra Samhita chapter 40 (J. L. Shastri’s translation, via wisdomlib) names the hunter Gurudruha; some tellings use other names. The translator’s footnote says the story also occurs, with small differences, in the Padma Purana (not checked).
- OPTIONAL: no secondary reputable source was read that tells this story, so how widely it is told today is not stated.

> **Reviewer note — ✅ UNCHANGED**
> Kept, attributed to the Shiva Purana.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### The vigil, the fast and the lingam

On Maha Shivaratri many devotees fast, keep a vigil through the night and worship the Shiva lingam. In temples, priests bathe the lingam with offerings such as milk, yogurt, honey and turmeric, rinsing it with water between each, and then decorate it with flowers and garlands. Bilva leaves are a favorite offering, and devotees chant “Om Namah Shivaya,” sing hymns and tell stories of Shiva.

The Shiva Purana describes keeping the vigil through the four watches of the night, with worship in each. The day after the vigil is marked with feasting and fairs in some places.

**Sources:** `shivaratri-brit`, `shivaratri-pluralism`, `shivaratri-brandeis`, `shivaratri-incredible-india`, `shivaratri-shiva-purana-38`

**Research notes (internal, not published):**
- SOURCE NOTE: the Shiva Purana chapter (Kotirudra 38) prescribes the four-watch vigil; its month naming follows its own calendar and is not repeated. The Linga Purana’s vrata chapters (1.83, 1.84) prescribe monthly fasts and name no Shivaratri vigil.
- EDITORIAL: the yogic belief about an upsurge of energy on this night (Incredible India) is left out.

> **Reviewer note — ✅ UNCHANGED**
> Unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Fasting and food

_Tradition: Varies by region, family and tradition_

Fasting is part of Maha Shivaratri for many devotees, and how strictly people fast varies. Maharashtra Tourism describes a strict or partial fast with simple, satvik foods such as fruit and sago dishes. Fasting practices vary by family and tradition.

In many places the day after the vigil is a day of feasting.

**Sources:** `shivaratri-brit`, `shivaratri-brandeis`, `shivaratri-maharashtra`

**Research notes (internal, not published):**
- EDITORIAL: no vegetarian requirement is stated; owner rule. No medical advice.
- EDITORIAL: bhang and thandai are intentionally not mentioned for Shivaratri: no source read links them to it (Britannica mentions bhang only in its Holi article).
- OPTIONAL: the Maharashtra fasting-food list (sabudana, rajgira) is one government page; it is mentioned only as an example.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** keeps the optional, varied fasting language; **revision 3:** the repeated disclaimer is replaced by 'Fasting practices vary by family and tradition.'
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Celebrating Maha Shivaratri away from home

You can keep Maha Shivaratri meaningfully in a residence hall with a few simple choices.

Find your people. Ask a Hindu or Indian student association or a nearby Shiva temple whether it holds an evening observance or an all-night vigil.

Worship without a flame. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract. A small image or lingam with a bowl of water, flowers and leaves needs no flame. If you have questions about religious accommodations, ask your residence life office.

Plan any vigil around your classes and your roommates.

Fasting practices vary by family and tradition.

Stay connected. A video call with family, or a shared meal afterward, keeps you part of the celebration.

**Sources:** `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. A small lingam or image is an editorial suggestion.
- OPTIONAL: no Atlanta-area temple or student group has been verified, so none is named.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** 'If you fast, keep it simple' and 'look after your health' removed; fasting is now described neutrally as varying by family and tradition (revision 3 wording).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Shiva’s night in different places

_Tradition: Regional; varies by community_

Kashmiri Pandits call the festival Herath, from Hara, a name of Shiva, and ratri, night, and mark it with special rituals and night-long prayers in the home. Among South Indian Lingayats, the day after brings gifts to the guru.

At temples such as Chidambaram, annual dance festivals offer “worship through dance.” In the United States, some temples hold all-night vigils with the full bathing of the lingam, and one community has developed an offering of dance to Shiva as Nataraja.

**Sources:** `shivaratri-ddnews`, `shivaratri-brit`, `shivaratri-incredible-india`, `shivaratri-pluralism`

**Research notes (internal, not published):**
- OPTIONAL: Herath is kept to one sentence from a DD News item (Prasar Bharati). The detailed Kashmiri tradition (a fortnight of observance, walnuts, offerings to Bhairava) rests on the IGNCA article, whose Hyper linking Policy requires prior permission for links (read live 2026-11-08); no alternative scholarly source was found, only newspaper features. Add detail only after permission is granted or a reputable alternative is read.
- OPTIONAL: Nepal’s Pashupatinath temple (Britannica) is omitted because that article’s own URL was not recorded. The Pluralism essay is undated, so US examples are generic and name no temple.

> **Reviewer note — ✅ UNCHANGED**
> Herath stays one sentence; **no IGNCA permission request**, as you directed. Regional differences kept.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `shivaratri-brit` | Maha Shivaratri | Encyclopaedia Britannica | https://www.britannica.com/topic/Maha-shivaratri | Done |
| `shivaratri-pluralism` | The Great Night of Shiva | The Pluralism Project, Harvard University | https://pluralism.org/the-great-night-of-shiva | Not done |
| `shivaratri-brandeis` | Shivaratri (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/shiva-ratri.html | Not done |
| `shivaratri-maharashtra` | Mahashivratri (Maharashtra Tourism) | Department of Tourism, Government of Maharashtra | https://maharashtratourism.gov.in/festivals/mahashivratri/ | Not done |
| `shivaratri-incredible-india` | Maha Shivratri: Celebrate the great night of Lord Shiva | Ministry of Tourism, Government of India (Incredible India) | https://www.incredibleindia.gov.in/en/festivals-and-events/maha-shivratri | Done |
| `shivaratri-ddnews` | PM Modi extends greetings on Herath Poshte to Kashmiri Pandit community | DD News (Prasar Bharati, Government of India) | https://ddnews.gov.in/en/pm-modi-extends-greetings-on-herath-poshte-to-kashmiri-pandit-community/ | Not done |
| `shivaratri-linga-purana` | Linga Purana 1.17, “Origin of the Linga (lingodbhava)” (translation by J. L. Shastri) | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1951) | https://www.wisdomlib.org/hinduism/book/the-linga-purana/d/doc1195230.html | Not done |
| `shivaratri-shiva-purana-7` | Shiva Purana, Vidyesvara Samhita chapter 7: Shiva appears as a column of fire (translation by J. L. Shastri) | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950) | https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc225552.html | Not done |
| `shivaratri-shiva-purana-38` | Shiva Purana, Kotirudra Samhita chapter 38: The greatness of Shivaratri (translation by J. L. Shastri) | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950) | https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226539.html | Not done |
| `shivaratri-shiva-purana-40` | Shiva Purana, Kotirudra Samhita chapter 40: The glory of Shivaratri, the hunter Gurudruha (translation by J. L. Shastri) | wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950) | https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226541.html | Not done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

# Holi

## Basics (reviewed)

- **Subtitle:** The festival of colors
- **Aliases:** 
- **Deity search terms:** Krishna, Radha, Vishnu

> **Reviewer note — 💡 SUGGESTION**
> Basics decision is in the **Basics** table above.
>
> **Your decision:** see the Basics table

## Quick facts (reviewed)

- **Meaning:** A Hindu spring festival of colors, preceded by an evening bonfire called Holika Dahan. It is celebrated as the triumph of good over evil and in memory of Radha and Krishna’s play.  
  Sources: holi-brit, holi-haf, holi-brandeis, holi-incredible-india
- **Length of observance:** A day of color, preceded by the bonfire evening of Holika Dahan. Some regions celebrate for much longer. _(Varies by region)_  
  Sources: holi-brit, holi-haf
- **Associated deities:** Krishna and Radha; Vishnu through the story of Prahlada. _(Varies by region)_  
  Sources: holi-brit, holi-haf, holi-brandeis
- **Common customs:** A bonfire the evening before, throwing colored powder and water, music and dancing, sweets, and visiting friends and family.  
  Sources: holi-brit, holi-haf, holi-incredible-india
- **Signature foods:** Gujiya and other sweets, and thandai, a cooling milk drink flavored with nuts and spices.  
  Sources: holi-brit, holi-incredible-india

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** Shiva and Kama removed from the deities fact; Holika Dahan is described as a preceding bonfire, not as part of a two-day count.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Krishna** (Braj Vaishnava tradition): Holi’s color play is said to recall his play with Radha and the gopis, especially in Mathura, Vrindavan and Barsana.  
  Sources: holi-brit, holi-haf, holi-brandeis
- **Radha** (Braj Vaishnava tradition): Krishna’s beloved, whose playful love with him the day of color recalls.  
  Sources: holi-brit, holi-haf, holi-brandeis
- **Vishnu** (Vaishnava tradition (the Prahlada story)): Worshipped by the young Prahlada; in the story behind the bonfire, his devotee is saved from the fire and Vishnu, as the man-lion Narasimha, ends the tyrant king.  
  Sources: holi-brit, holi-haf

> **Reviewer note — ✅ UNCHANGED**
> Krishna, Radha, Vishnu. No Shiva or Kama.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Holi?

Holi is the Hindu spring festival best known for its colors. The evening before, communities light a bonfire called Holika Dahan, recalling the story of Prahlada and Holika. On Holi itself, people throw colored powder and water at one another, share sweets and music, and visit friends and family, in a celebration of spring, joy and the triumph of good over evil. Many also remember the playful love of Radha and Krishna in the throwing of color.

Several stories are tied to Holi, and each region leans on its own. Today it is also enjoyed by many people who are not Hindu, in India and around the world.

**Sources:** `holi-brit`, `holi-haf`, `holi-brandeis`, `holi-incredible-india`

**Research notes (internal, not published):**
- SOURCE NOTE: core summary rests on Britannica plus HAF, Brandeis and Incredible India (separate publishers).

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** Holika Dahan is 'the evening before'; Holi itself is the colour day.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### The burning of Holika

_Tradition: Vaishnava tradition (the story of Prahlada)_

The best-known story behind the bonfire is about Prahlada. His father, the demon king Hiranyakashipu, had won a boon that made him almost impossible to kill, and he demanded that everyone worship him. Prahlada, however, was a devoted worshipper of Vishnu. Furious, the king asked his sister Holika, who was said to be immune to fire, to sit with Prahlada on a burning pyre; in some tellings she wore a protective cloak. Because of Prahlada’s devotion, the protection passed to him, and Holika burned.

Later, Vishnu appeared as the man-lion Narasimha and ended the king’s rule. The bonfire of Holika Dahan recalls this victory of good over evil. Like many such stories, it is told in several versions.

**Sources:** `holi-brit`, `holi-haf`, `holi-brandeis`, `holi-incredible-india`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica says the story is “from the Puranas” without naming a text. The Bhagavata Purana’s Prahlada chapters 7.4 to 7.6 (read) never name Holika, and an abridged Vishnu Purana text (read) has a fire attempt that fails and no Holika; chapters 7.2, 7.3, 7.7 to 7.10 and the Narada and Bhavishya Puranas were not read. Per owner decision 2026-11-08 the guide presents Holika’s burning as a traditional narrative and names no text.

> **Reviewer note — ✅ UNCHANGED**
> Traditional narrative, no named text, as you directed.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Radha and Krishna

_Tradition: Braj Vaishnava tradition_

Holi is especially dear to worshippers of Krishna, whose play with Radha and the gopis, the young women of Vrindavan, it is said to recall. One popular story says that the young Krishna playfully smeared color on Radha’s face, and the play grew into the festival.

In Mathura, Vrindavan and Barsana, the places linked with Krishna’s life, Holi is celebrated with particular joy.

**Sources:** `holi-brit`, `holi-haf`, `holi-brandeis`, `holi-incredible-india`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica ties the play to the Bhagavata Purana and the Gitagovinda and the color association to the Garga Samhita; none of these was read. The popular story is attributed as one (“one popular story”).
- EDITORIAL: owner direction 2026-11-08: the complexion detail in Britannica’s version of this story is left out to avoid emphasis on skin-color differences; the guide follows Incredible India’s plainer version, in which Krishna playfully smears color on Radha’s face.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Shortened:** the story now says Krishna playfully smeared colour on Radha's face; no skin-colour detail.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### A bonfire and a day of color

Holi is preceded by a related observance, Holika Dahan, on the evening before. Families and neighbors gather around a bonfire, sing, and offer roasted grains as a way of letting go of the past year’s negativity.

The next day is the day of color. People throw gulal, colored powder, and squirt colored water from buckets and water guns called pichkaris, with music, dancing and shouts of “Holi hai!” Many wear white. In some places the play loosens everyday formalities of age and status, though customs vary and not every community plays in the same way. When it ends, people bathe, put on clean clothes and visit friends, teachers and relatives, often with sweets.

**Sources:** `holi-brit`, `holi-haf`, `holi-incredible-india`, `holi-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica says Holi gives license to deviate from the usual norms and rankings of caste, gender, status and age, and that ordinary order is restored afterward. Owner direction 2026-11-08: the guide softens this so it does not suggest Holi universally suspends social hierarchies; it says only that in some places the play loosens everyday formalities of age and status.
- EDITORIAL: HAF says Holi can be a forty-day, eight-day, two-day or afternoon celebration by region; the bonfire-then-color pattern follows Britannica, HAF and Incredible India. Holika Dahan is explained as a related preceding observance and is not an alias (owner direction).

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** Holika Dahan is explained as a related preceding observance; the hierarchy line is softened to 'in some places the play loosens everyday formalities of age and status, though customs vary'.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Sweets and drinks

_Tradition: Varies by region_

Sharing food is part of the day. Popular sweets include gujiya, a fried pastry filled with coconut and dried fruit; jalebi, a syrup-soaked spiral; and malpua, a pancake dipped in syrup. In Maharashtra, puran poli, a sweet flatbread, is served. Savory snacks such as chaat and kachori are common too.

Drinks include lassi and thandai, a cooling milk drink flavored with almonds, saffron, poppy seeds, cardamom and rose petals. Bhang, a mild cannabis-based drink, is listed separately from thandai and is served in some places.

**Sources:** `holi-brit`, `holi-incredible-india`

**Research notes (internal, not published):**
- EDITORIAL: owner decision 2026-11-08 (final edit): thandai and bhang are kept separate with neutral context, no recipes and no consumption guidance. The unsupported clause about cannabis-infused versions of other drinks and the inferred “ordinarily made without cannabis” wording were removed; only the sourced distinction remains.
- SOURCE NOTE: Britannica lists thandai (almonds, saffron, poppy seeds, cardamom, rose petals) and bhang (“a mild cannabis-based drink”) as separate drinks; Incredible India describes thandai as a cooling drink flavoured with nuts and spices and does not mention bhang. The guide states only that bhang is listed separately and served in some places.
- OPTIONAL: no legal or age statement is made because none was sourced. A second source for bhang at Holi would help.
- EDITORIAL: no fasting claim is made. HAF’s holaka (roasted grains offered at the bonfire) is mentioned in the rituals section.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Revision 3:** the unsupported clause about cannabis-infused versions of other drinks, and the inferred 'ordinarily made without cannabis' wording, are removed. The text now says only what Britannica supports: thandai is a cooling milk drink with almonds, saffron, poppy seeds, cardamom and rose petals; bhang, a mild cannabis-based drink, is listed separately and served in some places. No consumption guidance.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Colors, then and now

Holi colors were traditionally made from plants: green from neem and henna leaves, yellow from turmeric and marigold, blue from indigo, and red from pomegranate, flame-of-the-forest flowers and red sandalwood. Today synthetic powders are common too. Ingredients vary from product to product, and Britannica cautions that some contain pigments that can irritate the skin and eyes, so some people choose herbal colors.

The colors are also said to carry meanings: green for new life, red for marriage and fertility, yellow for purity and victory, and blue for Krishna.

**Sources:** `holi-brit`, `holi-incredible-india`

**Research notes (internal, not published):**
- EDITORIAL: owner decision 2026-11-08 (final edit): the synthetic-color wording is softened so it does not imply that all synthetic powders are hazardous; it says ingredients vary and that some contain irritating pigments.
- SOURCE NOTE: plant colors and the synthetic-pigment warning are Britannica only; the symbolism is Incredible India’s (“said to”). No Holi-specific health source was found.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Revision 3:** the synthetic-color wording is softened: ingredients vary by product, Britannica cautions that some pigments can irritate skin and eyes, and some people choose herbal colors. It no longer implies all synthetic powders are hazardous.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Celebrating Holi away from home

You can enjoy Holi with a few simple choices.

Find a celebration. Look for a Hindu or Indian student association event or a community gathering with outdoor space.

Dress for it. Wear old clothes you do not mind staining, and keep colors outdoors, since powders can stain floors and walls.

Protect your eyes and skin. Color ingredients vary, so check labels or choose herbal colors if you prefer, and keep powder away from your eyes. If color gets in your eyes, rinse with plenty of clean water, and see a doctor if irritation continues.

Ask first. Always ask before putting color on someone, and respect a no.

Leave the bonfire to organized events. Many residence halls ban open flames, so check your housing contract. If you have questions about religious accommodations, ask your residence life office.

Call home. A video call with family keeps you part of the celebration.

**Sources:** `holi-aao`, `holi-brit`, `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. The eye-rinsing advice follows the American Academy of Ophthalmology’s general guidance for chemical splashes (not Holi-specific); no medical advice beyond that. No advice on alcohol, bhang or other substances is given (owner decision).
- OPTIONAL: no campus Holi event source was read, so none is promised or named.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> Consent language and eye-safety guidance kept. **Revision 3:** the eye-and-skin tip now says ingredients vary, so check labels or choose herbal colors if you prefer, and keep powder away from your eyes; the rinse-with-water guidance is unchanged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Holi across India

_Tradition: Regional; varies by community_

Holi takes different forms across India, lasting anywhere from two days to many weeks. In Braj, the region around Mathura and Vrindavan, the celebrations begin with Basant Panchami and build for weeks. At Barsana, Lathmar Holi has women of Radha’s village playfully strike men from Krishna’s village with staves while the men shield themselves.

In West Bengal and Odisha the festival is Dol Jatra, the “swing festival,” when images of Radha and Krishna are placed on decorated platforms and swung to songs of spring. In Punjab, Sikhs celebrate Hola Mohalla the day after Holi, a separate festival marked by displays of martial skill.

**Sources:** `holi-brit`

**Research notes (internal, not published):**
- SOURCE NOTE: all of this is Britannica (one source); the end of its Dol Jatra passage was not read.
- EDITORIAL: the southern Kama Dahanam tradition, Baldeo’s Balarama Holi and the widows’ celebrations in Vrindavan and Varanasi are intentionally omitted (owner direction; niche or sensitive).
- OPTIONAL: Rang Panchami (Maharashtra) and Shigmo (Goa) are not mentioned: no source was read.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** the southern Kama sentence is removed with the Kama story.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Holi beyond temples and homes

_Tradition: Diaspora and pan-Indian_

Holi has become popular in South Asian communities in the United States and elsewhere, and many people who are not Hindu join in; the Government of India’s tourism site describes it as a festival that crosses religion and age. The Hindu American Foundation says Holi is open to everyone, and asks that it also be remembered as a Hindu festival with religious roots, noting that commercial color events can lose that context.

In some places the loosening of everyday boundaries during the festival has led to harassment and fights, and police in many places in India take precautions. Ask before putting color on someone, and respect a no.

**Sources:** `holi-brit`, `holi-haf`, `holi-incredible-india`

**Research notes (internal, not published):**
- EDITORIAL: the closing consent line is common-sense guidance with no source. HAF’s “culturally appropriated” advocacy language is not repeated; its view is stated neutrally and attributed.
- EDITORIAL: no contemporary political controversy is included (owner decision); a Pluralism Project article on a 2020 campus protest was seen in a search and not read or used.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** the boundary line now says 'in some places'. The explicit consent sentence is kept.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `holi-brit` | Holi | Encyclopaedia Britannica | https://www.britannica.com/topic/Holi | Done |
| `holi-haf` | 5 things to know about Holi | Hindu American Foundation | https://www.hinduamerican.org/blog/5-things-to-know-about-holi | Not done |
| `holi-brandeis` | Holi (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/holi.html | Not done |
| `holi-incredible-india` | Holi: Celebrate the festival of colours | Ministry of Tourism, Government of India (Incredible India) | https://www.incredibleindia.gov.in/en/festivals-and-events/holi | Done |
| `holi-aao` | Recognizing and Treating Eye Injuries | American Academy of Ophthalmology | https://www.aao.org/eye-health/tips-prevention/injuries | Not done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

# Rama Navami

## Basics (reviewed)

- **Subtitle:** A festival honoring the birth of Rama
- **Aliases:** Ram Navami, Sri Rama Navami
- **Deity search terms:** Rama, Sita, Hanuman

> **Reviewer note — 💡 SUGGESTION**
> Basics decision is in the **Basics** table above.
>
> **Your decision:** see the Basics table

## Quick facts (reviewed)

- **Meaning:** “Ninth of Rama”: the birthday of Rama, hero of the Ramayana, on the ninth day of the bright half of the month of Chaitra and the last day of spring Navaratri.  
  Sources: rama-brit, rama-ht-2010, rama-brandeis
- **Length of observance:** One day, the ninth and final day of spring Navaratri.  
  Sources: rama-brit
- **Associated deities:** Rama, worshipped with his wife Sita, his brother Lakshmana and his devotee Hanuman. _(Vaishnava and wider Hindu traditions)_  
  Sources: rama-brandeis, rama-pluralism, rama-brit
- **Common customs:** Cleaning and bathing, worship at home and in the temple, a cradle for baby Rama, readings of the Ramayana, Ramlila, processions, and in southern India a symbolic wedding of Rama and Sita.  
  Sources: rama-brit, rama-ht-2010, rama-brandeis
- **Signature foods:** Panaka, a sweet jaggery drink, and spiced buttermilk, served to the public at some temples. _(Some temples)_  
  Sources: rama-ht-2010

> **Reviewer note — ✅ UNCHANGED**
> Proposed quick facts kept.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Rama** (Vaishnava and wider Hindu traditions): The hero of the Ramayana and righteous king of Ayodhya, regarded as the seventh avatar of Vishnu, whose birth the day celebrates.  
  Sources: rama-brit, rama-brandeis, rama-pluralism
- **Sita** (South India and the diaspora): Rama’s wife, whose wedding to Rama is re-enacted at many temples, especially in southern India.  
  Sources: rama-brit, rama-pluralism
- **Hanuman** (Hindu traditions across India): Rama’s devoted servant, shown on bended knee at Rama’s altar; in many ways he is worshipped more widely than Rama himself.  
  Sources: rama-pluralism, rama-brandeis

> **Reviewer note — ✅ UNCHANGED**
> Proposed deity entries kept.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Rama Navami?

Rama Navami celebrates the birth of Rama, the hero of the Ramayana, on the ninth day of the bright half of the month of Chaitra. It is the ninth and last day of the spring Navaratri. Vaishnavas and many other Hindus honor Rama as an avatar of Vishnu and as the righteous king of Ayodhya whose life the Ramayana tells.

Families clean their homes, bathe and worship, and some rock a small image of baby Rama in a cradle. Temples hold readings of the Ramayana, dramas of Rama’s story and processions and, especially in southern India, a symbolic wedding of Rama and Sita. The day is a reminder of the qualities for which Rama is admired: courage, kindness, justice and devotion to duty.

**Sources:** `rama-brit`, `rama-brandeis`, `rama-pluralism`, `rama-ht-2010`

**Research notes (internal, not published):**
- SOURCE NOTE: core summary rests on Britannica plus Brandeis, the Pluralism Project and Hinduism Today (separate publishers).
- EDITORIAL: owner decision 2026-11-08: Ayodhya’s religious significance is included without commentary on contemporary politics; Britannica’s “Political dimensions” section is intentionally not summarised.

> **Reviewer note — ✅ UNCHANGED**
> Ayodhya's religious significance is now in the worship section; no political commentary anywhere.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### The last day of spring Navaratri

Rama Navami is the ninth and final day of the spring Navaratri, also called Chaitra or Vasanta Navaratri. It is the spring counterpart of the nine nights of Navaratri that are more widely celebrated in the autumn, and in the spring Navaratri the goddess Durga is worshipped in her nine forms.

**Sources:** `rama-brit`

**Research notes (internal, not published):**
- SOURCE NOTE: single source for the spring Navaratri link, Britannica (which says Durga is worshipped in nine forms and that autumn is the more popular Navaratri); Hinduism Today’s “sometimes observed for nine days before or after navami” is unexplained and not used. The Navaratri guide covers the autumn festival and the Ugadi guide mentions the spring one; wording is kept consistent.

> **Reviewer note — ✅ UNCHANGED**
> Kept.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### Rama’s birth in the Ramayana

_Tradition: Valmiki Ramayana_

The Ramayana of Valmiki tells how King Dasharatha of Ayodhya, who had no son, performed a great sacrifice to ask for heirs. At the same time, the gods, threatened by the demon king Ravana, asked Vishnu to be born as a human to defeat him. A divine being rose from the sacrificial fire with a vessel of payasa, a sweet milk-and-rice dish, which Dasharatha shared among his three queens. In time, Rama was born to Kausalya, Bharata to Kaikeyi, and the twins Lakshmana and Shatrughna to Sumitra. The text places Rama’s birth in the month of Chaitra, on the ninth day, under the star Punarvasu.

The epic describes the rejoicing in Ayodhya at the births.

**Sources:** `rama-valmiki-16`, `rama-valmiki-18`, `rama-brit`

**Research notes (internal, not published):**
- SOURCE NOTE: Valmiki’s Bala Kanda sargas 16 and 18 were read directly; the site credits the Bala Kanda translation to Desiraju Hanumanta Rao (Murthy translated the Ayodhya, Sundara and Yuddha Kandas). Britannica and the Valmiki prose differ on the fractions of the payasa, so none are stated; the translator’s notes say the order of the four births is debated.
- EDITORIAL: owner direction 2026-11-08: the earlier sentence inferring that the festival arose later, because the cited passages name no festival, was removed; the guide makes no claim about the festival’s origin.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** the sentence inferring the festival arose later was removed; the guide makes no claim about the festival's origin.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### A day of worship at home and in the temple

Many people begin the day by cleaning the home and bathing, then worship at home, bathing a murti of Rama. Some place a murti of the child Rama in a cradle and rock it. Devotees visit temples to see and be seen by the deity, and many fast or eat only fruit or simple offerings and recite mantras to Rama.

The Ramayana, or another telling of Rama’s life such as Tulsidas’s Ramcharitmanas, is read or recited aloud, sometimes without a break, and Ramlilas, dramatic retellings of Rama’s story, are staged. Temples carry murtis in procession around their grounds, and devotees sing and give to charity.

Hindus regard Ayodhya as Rama’s birthplace and childhood home, and the city celebrates Rama Navami with particular pomp. The festival is especially popular in Uttar Pradesh, where Ayodhya lies.

**Sources:** `rama-brit`, `rama-ht-2010`, `rama-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: Hinduism Today adds that it is common to stay awake all night; that generalisation is unattributed and is left out.
- EDITORIAL: owner direction 2026-11-08: the former “Ayodhya and northern India” section is folded in here, kept to Ayodhya’s religious significance with no contemporary political commentary; Britannica’s “Political dimensions” section is intentionally not summarised.
- OPTIONAL: the Ramcharitmanas passage on Rama’s birth was not found in a readable English translation.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** the short Ayodhya section is folded in here as a final paragraph.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Fasting and food

_Tradition: Varies by tradition and family_

Many devotees fast on Rama Navami, and some eat only fruit or simple offerings. Hinduism Today describes temples that mark the day by serving panaka, a sweet drink made with jaggery, lime, ginger and cardamom, and spiced buttermilk to the public, and some that prepare sweets such as khoa. Fasting practices vary by family and tradition.

**Sources:** `rama-brit`, `rama-ht-2010`

**Research notes (internal, not published):**
- EDITORIAL: no vegetarian rule and no medical advice. A Gaudiya “fast until sunset” rule and a food list from a non-reputable blog are not used; Hinduism Today gives no region for panaka, so “at some temples” is used.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** the temple foods are attributed ('Hinduism Today describes temples that...'). **Revision 3:** the dietary/medical disclaimer is replaced by 'Fasting practices vary by family and tradition.' No other change.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Celebrating Rama Navami away from home

Rama Navami can be marked simply, even in a small room.

Find your people. Ask a Hindu or Indian student association or a nearby temple whether it holds a Rama Navami program, a Ramayana reading or a Sita Rama kalyanam.

Worship without a flame. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract. A battery-powered lamp is a safer way to light a small shrine. If you have questions about religious accommodations, ask your residence life office.

Make a small cradle. A picture or small figure of baby Rama in a simple cradle is a way to join the day’s custom.

Read together. Read a passage of the Ramayana aloud, or sing a bhajan with friends or over a video call with family.

Fasting practices vary by family and tradition.

**Sources:** `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. The simple cradle and the reading are editorial ideas.
- OPTIONAL: no Atlanta-area temple or student group has been verified, so none is named.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Changed:** 'If you fast, keep it simple' removed. **Revision 3:** the line now reads 'Fasting practices vary by family and tradition.'
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### The wedding of Rama and Sita

_Tradition: South India and American temples_

In southern India, many people regard Rama Navami as the wedding anniversary of Rama and Sita. At temples, priests perform a symbolic wedding, called a kalyanotsavam, and the murtis of Rama and Sita are carried in procession.

In the United States, at one Michigan temple, families of the congregation sponsor the wedding as the families of the bride and the groom.

**Sources:** `rama-brit`, `rama-ht-2010`, `rama-pluralism`

**Research notes (internal, not published):**
- EDITORIAL: owner direction 2026-11-08: the detailed Michigan example was shortened to one sentence.
- OPTIONAL: Bhadrachalam (Telangana) is not named: the only readable source was a promotional newspaper article, and the official temple site could not be reached (a domain tried redirected to an unrelated business; do not link it).
- SOURCE NOTE: the Pluralism essay is undated and describes one temple, so the American example is generic and names no temple. Other traditions mark the wedding on Vivaha Panchami; no reputable source read says so, so it is not mentioned.

> **Reviewer note — 🔁 CHANGED PER YOUR DECISION**
> **Shortened:** the Michigan example is one sentence ('at one Michigan temple, families of the congregation sponsor the wedding as the families of the bride and the groom').
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `rama-brit` | Rama Navami | Encyclopaedia Britannica | https://www.britannica.com/topic/Rama-Navami | Done |
| `rama-brandeis` | Ram Navami (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/ram-navami.html | Not done |
| `rama-pluralism` | Rama, Sita, Hanuman | The Pluralism Project, Harvard University | https://pluralism.org/rama-sita-hanuman | Not done |
| `rama-ht-2010` | Festivals: Rama Navami | Hinduism Today (Himalayan Academy) | https://www.hinduismtoday.com/magazine/april-may-june-2010/2010-04-festivals-rama-navami/ | Done |
| `rama-valmiki-16` | Valmiki Ramayana, Bala Kanda sarga 16: the payasa (prose translation by Desiraju Hanumanta Rao) | valmikiramayan.net (Bala Kanda translated by Desiraju Hanumanta Rao) | https://www.valmikiramayan.net/baala/sarga16/bala_16_prose.htm | Not done |
| `rama-valmiki-18` | Valmiki Ramayana, Bala Kanda sarga 18: the birth of Rama (prose translation by Desiraju Hanumanta Rao) | valmikiramayan.net (Bala Kanda translated by Desiraju Hanumanta Rao) | https://www.valmikiramayan.net/baala/sarga18/bala_18_prose.htm | Not done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

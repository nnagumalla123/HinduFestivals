# P3-05 Batch B editorial review packet, revision 2: Krishna Janmashtami, Ganesh Chaturthi, Vijayadashami

**Prepared 2026-11-08; revised 2026-11-12 after your combined editorial review. STATUS: APPROVED and marked `reviewed` locally on 2026-11-12 (reviewer recorded internally as `desi-days-editorial`); not committed, pushed or deployed.** The three guides and their basics now publish through the loader. Every occurrence is still empty and no 2027 date is verified. The seven earlier reviewed guides (Diwali, Ugadi, Navaratri and the four Batch A guides) are unchanged. Packs behind this packet: [krishna-janmashtami.md](krishna-janmashtami.md), [ganesh-chaturthi.md](ganesh-chaturthi.md), [vijayadashami.md](vijayadashami.md). Other files: [p3-05-batch-b-drafts-for-review.md](p3-05-batch-b-drafts-for-review.md), [p3-05-batch-b-verification-list.md](p3-05-batch-b-verification-list.md).

## How to use this packet

1. Read **Unresolved claims in brief**, **Decision summary**, **Basics** and the **Register** first.
2. Then read each guide. Under every section is a reviewer note and a decision row. Markers: 🔶 needs your decision, 💡 an editorial point, 🆕 new draft with no open points.
3. **Outcome:** revision 2 was approved in full and marked reviewed after lint, typecheck, tests, an isolated production build, a leak scan and desktop and 375px checks (see docs/PROJECT_HANDOFF.md).
4. No commit, push or deploy has happened; those need your separate approval.

## How the research was done

- **Reading, not summaries:** Britannica and Brandeis pages (which refuse the fetch tool) were read in the built-in browser. Other pages were read through the fetch tool; where a page was only partly read or reached only as a model summary, the pack says so and the claim is not relied on.
- **Content read status and terms review status are kept apart** in every pack and in each source's audit note. An unread terms page is recorded as such and is never permission.
- **Independent corroboration:** the core claims rest on at least two publishers; the exceptions are listed in the register below.
- **Dates:** none. Janmashtami's Smarta and Vaishnava observances stay in the date ledger as a disputed festival.

## What changed in revision 2 (your consolidated revisions)

| Guide | Change |
|---|---|
| Krishna Janmashtami | The birth story stays attributed to the Bhagavata Purana and focused on the birth. The Smarta and Vaishnava section says only, generally, that observance dates can differ by tradition (attributed to an Odisha report); the sunrise, Rohini and Ashtami-timing rules and HAF's dawn-count explanation were removed. Dahi Handi keeps the custom and the general safety concern; the court-limit discussion, ages, helmets, pyramid heights and the injury statistic were removed. Removed: "many families do not fast at all", the low-pot assurance and "or swing". The fasting disclaimer now appears once. |
| Ganesh Chaturthi | **One targeted attempt succeeded:** the Shiva Purana (Rudra Samhita, Kumara Khanda, chapter 13, J. L. Shastri translation) was read in full and is now cited for the birth story, with the other versions kept as variants; no other Purana is named. The broken-tusk connection, the Shivaji nationalism claim and the "more communal" clause were removed. The Rangari and 1892 versus 1893 question is acknowledged and left unsettled. Duration and day-counting are stated explicitly (day one is the first day; Anant Chaturdashi is the eleventh day and ten days after the first). The CPCB details were generalized; the dorm bucket-immersion and pour-the-water-on-plants instructions were removed in favor of consulting a temple or community organizer. |
| Vijayadashami | Dussehra, Dasara and Vijaya Dashami stay as aliases, with the regional distinctions explained (Dussehra in the north and west, Vijayadashami and Bijoya Doshomi in the east, Dasara in Karnataka). Rama and Durga stay attributed. The overview no longer says "the day Rama defeated Ravana", so the guide does not claim the epic puts Ravana's death on the tenth day. The children-shooting-flaming-arrows example was removed. Mahanavami customs (Ayudha puja, Golu) are separated from Vijayadashami customs (shami puja, Jamboo Savari, apta leaves). Kullu is one sentence limited to Britannica. The books-and-laptop idea is an optional modern adaptation, not a documented ritual. |
| All three | The seven reviewed guides are unchanged. Every Batch B section, quick fact and deity entry is still `draft`; every occurrence is empty. Sources no longer cited (Scroll, India TV 2014, The Hans India) stay in the packs as read and not used. |

## Unresolved claims in brief

No item is blocking any longer: the four earlier blockers were resolved by the revisions above (one by finding and reading the primary text, three by generalizing or removing the claim). What remains:

1. **Krishna Janmashtami:** the Smarta and Vaishnava reckoning and the current Dahi Handi safety requirements are deliberately not stated; a calendar authority and a recent authoritative source would allow them later. Pushtimarg, Gaudiya fasting rules, Tamil Nadu and other regional customs are not described.
2. **Ganesh Chaturthi:** the Shiva Purana version rests on one chapter read in full, but the later chapter on the head and other Puranic versions were not read. The public-festival history rests on Britannica and two news-media features (no scholarly history), with the 1892 versus 1893 question left open. Immersion advice is general; no US source was found.
3. **Vijayadashami:** Kullu rests on Britannica alone; the Ramcharitmanas, traditions honoring Ravana, Saraswati puja and Vidyarambham are not covered; the Karnataka bulb counts and festival lengths differ between sources and are not stated.
4. **Across all three:** no Atlanta-area event, temple or student group is verified; Gauri Aagman and other regional customs are not described because no reliable source was read in full (nothing is invented); publisher terms pages are mostly unread (recorded as such, never treated as permission).

## Decision summary

| Guide | Items | New drafts, no open points | Editorial points | Need your decision |
|---|---|---|---|---|
| Krishna Janmashtami | 11 | 2 | 7 | 0 |
| Ganesh Chaturthi | 11 | 3 | 6 | 0 |
| Vijayadashami | 10 | 0 | 8 | 0 |

## Basics (all three guides)

| Festival | Subtitle | Aliases | Deity search terms | Notes | Decision |
|---|---|---|---|---|---|
| Krishna Janmashtami | A festival honoring the birth of Krishna | Janmashtami, Gokulashtami | Krishna, Vishnu | See the pack's proposed-basics table. | ☐ Approve ☐ Edit |
| Ganesh Chaturthi | A festival honoring the birth of Ganesha | Vinayaka Chaturthi | Ganesha, Parvati, Shiva | See the pack's proposed-basics table. | ☐ Approve ☐ Edit |
| Vijayadashami | The victorious tenth day | Dussehra, Dasara, Vijaya Dashami | Rama, Durga | See the pack's proposed-basics table. | ☐ Approve ☐ Edit |

## Register of unresolved claims

| # | Guide | Claim or gap | Status | What would resolve it |
|---|---|---|---|---|
| U1 | Krishna Janmashtami | Smarta versus Vaishnava reckoning | **Revision 2: not stated**; the guide says only that observance dates can differ by tradition | A panchang authority, temple or scholarly source, if the owner wants the rules explained |
| U2 | Krishna Janmashtami | Current Dahi Handi age and height rules | **Revision 2: removed**; only the general safety concern remains | A recent authoritative source |
| U3 | Krishna Janmashtami | Pushtimarg, Gaudiya fasting rules, Tamil Nadu and other regional customs | Not described | Readable reputable sources |
| U4 | Krishna Janmashtami | Midnight versus "dark of night" | Text read says dark of night; publishers say midnight | Optional: the Bhagavata verses with a commentary |
| U5 | Ganesh Chaturthi | Primary text for the birth stories | **Revision 2: resolved in part.** Shiva Purana, Rudra Samhita, Kumara Khanda, ch. 13 read in full and cited; later chapter on the head and other Puranic versions not read | Optional: the later chapter and other versions |
| U6 | Ganesh Chaturthi | Public-festival history: 1892 versus 1893, Rangari; Shivaji removed | Hedged and attributed; no scholarly source | An academic history |
| U7 | Ganesh Chaturthi | Britannica's "more communal" judgment | **Revision 2: removed** (owner decision) | None |
| U8 | Ganesh Chaturthi | Home immersion and US rules | **Revision 2: removed**; a temple or community organizer is the pointer | A US temple or municipal source, if specific advice is wanted |
| U9 | Ganesh Chaturthi | Gauri Aagman, chants, regional customs | Not described (only partly read sources) | Reading the Maharashtra Tourism and Incredible India pages in full |
| U10 | Vijayadashami | Kullu Dussehra | One source (Britannica) | An independent source |
| U11 | Vijayadashami | Ramcharitmanas, regional Ramayanas, traditions honoring Ravana | Not covered | Readable sources |
| U12 | Vijayadashami | Saraswati puja and Vidyarambham | Not described | A reliable source |
| U13 | All | Pages read only in part or through summaries (Britannica Durga Puja and Ganesha beyond the read parts; HAF Dusshera feed; Incredible India and Maharashtra Tourism) | Unread parts not used | Read the rest |
| U14 | All | Publisher terms pages | Mostly not read; recorded as such, never treated as permission | Read them if the owner wants |

---

# Krishna Janmashtami

## Basics (reviewed)

- **Subtitle:** A festival honoring the birth of Krishna
- **Aliases:** Janmashtami, Gokulashtami
- **Deity search terms:** Krishna, Vishnu

**Your decision:** see the Basics table above.

## Quick facts (reviewed)

- **Meaning:** “Janmashtami” joins janma, “birth,” and ashtami, “the eighth day.” The festival celebrates the birth of Krishna, regarded in Vaishnava tradition as an avatar of Vishnu, on the eighth day of the waning fortnight of the month of Bhadrapada.  
  Sources: jm-brit, jm-brandeis
- **Length of observance:** One day and night, centered on a midnight celebration. In Maharashtra and Goa, Dahi Handi follows the next day, and in Vrindavan some festivities begin about ten days earlier. Observance days can differ by tradition. _(Varies by region and tradition)_  
  Sources: jm-brit, jm-haf, jm-argus
- **Associated deities:** Krishna, an avatar of Vishnu in Vaishnava tradition. His parents, Devaki and Vasudeva, and his foster parents, Yashoda and Nanda, appear in his birth story. _(Vaishnava traditions)_  
  Sources: jm-brit, jm-bhagavata
- **Common customs:** A midnight celebration of the birth, bathing and dressing an image of baby Krishna, devotional singing, scenes of his childhood, and sweets shared as prasada. In some places, pots of curd are broken by human pyramids the next day.  
  Sources: jm-brit, jm-haf, jm-incredible
- **Dietary practices:** Many devotees fast until midnight and then share prasada. _(Varies by family and tradition)_  
  Sources: jm-brit, jm-haf5, jm-krishnacom

> **Reviewer note — 🆕 NEW DRAFT**
> Quick facts follow the guide text; check that each is supported by its listed sources.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Krishna** (Vaishnava traditions; Bhagavata Purana): Born in Mathura to Devaki and Vasudeva and raised in Gokula by Yashoda and Nanda, as told in the Bhagavata Purana. Vaishnava traditions regard him as an avatar of Vishnu, and some, such as Gaudiya Vaishnavism, hold his birth festival especially important.  
  Sources: jm-brit, jm-bhagavata, jm-haf
- **Vishnu** (Vaishnava tradition; Bhagavata Purana): In the Bhagavata Purana’s account, Vishnu takes birth as Krishna to relieve the earth of cruel rulers.  
  Sources: jm-brit, jm-haf

> **Reviewer note — 🆕 NEW DRAFT**
> Each entry names the tradition that makes the association.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Janmashtami?

Janmashtami celebrates the birth of Krishna, the beloved god of the Bhagavata Purana, who is regarded in Vaishnava tradition as an avatar of Vishnu. The festival falls on the eighth day of the waning moon in the month of Bhadrapada, and its heart is a midnight celebration, the hour in which tradition places his birth.

Devotees keep a vigil, often fast until midnight, then bathe and dress an image of baby Krishna, sing, and share sweets as prasada. Temples and homes are decorated, and in many places tableaux show scenes from his childhood. The day after, in Maharashtra and Goa and some other places, young people form human pyramids to break a pot of curd. How a family keeps the day, and even which day it keeps, depends on its tradition and region.

**Sources:** `jm-brit`, `jm-haf`, `jm-brandeis`, `jm-incredible`

**Research notes (internal, not published):**
- SOURCE NOTE: the overview rests on Britannica plus HAF, Brandeis and Incredible India (four publishers, all agreeing on the core).
- EDITORIAL: no date appears; the observance day is disputed between traditions and stays in the date ledger (Smarta versus Vaishnava).

> **Reviewer note — 💡 EDITORIAL POINT**
> no date appears; the observance day is disputed between traditions and stays in the date ledger (Smarta versus Vaishnava).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### The birth of Krishna

_Tradition: Vaishnava tradition, as told in the Bhagavata Purana_

In the Bhagavata Purana’s account, the earth is burdened by cruel kings and Vishnu promises to be born to relieve it. In Mathura, the tyrant Kamsa learns from a voice in the sky that the eighth son of his sister Devaki will kill him. He imprisons Devaki and her husband Vasudeva and kills their first six children. Their seventh child, Balarama, is miraculously transferred to the womb of Rohini, another wife of Vasudeva.

When the eighth child is born, in the dark of night, the parents first see him in his divine form as Vishnu before he becomes an ordinary baby. He tells them to carry him across the Yamuna River to Gokula and to bring back the daughter just born to Yashoda and Nanda. As clouds thunder and rain falls, the prison doors open, the guards fall asleep, and the river makes way for Vasudeva. He leaves the baby with Yashoda and returns with the girl, who is Yogamaya, Vishnu’s divine power. When Kamsa tries to kill her she appears as a goddess and he is humbled. Krishna grows up in Gokula and Vrindavan and later defeats Kamsa.

This is one telling. Communities and traditions emphasize different parts of Krishna’s life and tell it with their own songs, plays and images.

**Sources:** `jm-brit`, `jm-bhagavata`, `jm-haf`, `jm-incredible`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica and the Bhagavata text (canto 10, chapter 3, read in full) agree on the sequence. The text read says the Lord appeared “in the dense darkness of night”; it does not use the word midnight. Britannica, HAF, krishna.com and ISKCON News place the birth hour at midnight, so the guide says “in the dark of night” in the story and “midnight” in the observance.
- SOURCE NOTE: the exact wording of the voice in the sky and the swap of the babies follows Britannica. The Bhagavata text read does not use the words “eighth son” in chapter 3; the prophecy is in earlier chapters, which were not read. Britannica and Incredible India supply it.
- EDITORIAL: Krishna’s later life (Radha, the Mahabharata, the Gita) is deliberately left out of this festival guide to keep it focused on the birth.

> **Reviewer note — 💡 EDITORIAL POINT**
> Krishna’s later life (Radha, the Mahabharata, the Gita) is deliberately left out of this festival guide to keep it focused on the birth.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### A night vigil and a midnight birth

On Janmashtami, many devotees keep a vigil through the day and evening, singing devotional songs and listening to stories of Krishna. At midnight, the traditional hour of his birth, temples and homes celebrate the moment with kirtan, conch shells and a short worship. An image of baby Krishna is bathed, often in water and milk, dressed in new clothes and placed in a cradle. In a ceremony called abhisheka, which temples often hold in public, the deity is ritually bathed.

Temples and homes are decorated with flowers, and many families set up jhankis, three-dimensional scenes of Krishna’s childhood showing the Yamuna, animals, and the people of his story. Some women draw small footprints at the doorway to welcome the child. Dances and dramas about Krishna’s life are performed, and after the midnight celebration, sweets and other food are first offered to the deity and then shared as prasada. In some places, public readings from the Bhagavata Purana or the Bhagavad Gita are part of the day.

**Sources:** `jm-brit`, `jm-haf`, `jm-haf5`, `jm-incredible`, `jm-iskcon`, `jm-indiatv`

**Research notes (internal, not published):**
- SOURCE NOTE: bathing in water and milk, dressing, jhankis and prasada are Britannica; abhisheka, kirtan, dramas and readings are HAF; cradle and footprints are Incredible India; the conch shells and cradle are India TV; ISKCON News (2009) supports crib, tableaux and a public abhisheka for one tradition.
- EDITORIAL: “or swing” was removed (owner direction, revision 2): no source read in full names a swing, so the text says only “cradle”.

> **Reviewer note — 💡 EDITORIAL POINT**
> “or swing” was removed (owner direction, revision 2): no source read in full names a swing, so the text says only “cradle”.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Fasting and the midnight vigil

_Tradition: Varies by family and tradition_

Many devotees fast on the day before the midnight celebration and break the fast with prasada after the birth is celebrated. HAF describes fasting as a way of focusing the senses; Brandeis describes people fasting, meditating, chanting and singing to Krishna through the day. At ISKCON’s temple in Vrindavan, devotees who fast still cook throughout the day to prepare the offering. Fasting practices vary by family and tradition.

**Sources:** `jm-brit`, `jm-haf`, `jm-haf5`, `jm-brandeis`, `jm-iskcon`

**Research notes (internal, not published):**
- EDITORIAL: neutral fasting wording only, stated once in the guide (revision 2 removed the repeated disclaimers and the unsupported “many families do not fast at all”); no rule, no menu and no health advice.
- OPTIONAL: Gaudiya, Pushtimarg and other sampradaya fasting rules are not described: no source on them could be read (the Pushtimarg site refused the connection).

> **Reviewer note — 💡 EDITORIAL POINT**
> neutral fasting wording only, stated once in the guide (revision 2 removed the repeated disclaimers and the unsupported “many families do not fast at all”); no rule, no menu and no health advice.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Curd, butter and sweets

_Tradition: Regional; varies by community_

Sweets and other foods are offered to Krishna first and then shared as prasada. Milk, curd and butter have a special place because Krishna’s childhood stories are full of cowherd boys and stolen butter, and the Dahi Handi pots hold curd. India TV describes milk and butter as typical prasada, ISKCON News describes a temple offering of 108 dishes, and Incredible India describes Chhappan Bhog, an offering of 56 dishes, in Puri. What a family or temple prepares depends on its tradition and region.

**Sources:** `jm-brit`, `jm-incredible`, `jm-iskcon`, `jm-indiatv`

**Research notes (internal, not published):**
- SOURCE NOTE: the sentence tying curd and butter to Krishna’s childhood stories follows Britannica’s explanation of Dahi Handi; no source names a specific home dish for Janmashtami, so none is named.
- OPTIONAL: regional sweets (for example Gujarat, Maharashtra, South India) are not described: no source read names them.

> **Reviewer note — 🆕 NEW DRAFT**
> the sentence tying curd and butter to Krishna’s childhood stories follows Britannica’s explanation of Dahi Handi; no source names a specific home dish for Janmashtami, so none is named.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Celebrating Janmashtami away from home

You can mark Janmashtami in a small way, alone or with friends.

Find your people. Ask a Hindu or Indian student association, an ISKCON or other temple, or a nearby community group whether it holds a midnight celebration or a Dahi Handi game, and whether it streams the midnight program online.

Make a small shrine. A picture or small figure of baby Krishna in a cradle, with a few flowers, is a simple way to join the day. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract and use a battery-powered lamp. If you have questions about religious accommodations, ask your residence life office.

Share something sweet. Offer a little sweet or fruit to the image and share it with friends. If you share food, tell people what is in it.

Watch Dahi Handi, and join only if it is well run. A human pyramid is dangerous without trained organizers, safety gear and cushioning. If you take part, follow the organizers’ instructions.

Call home. A video call with family during the midnight celebration keeps you part of the day.

**Sources:** `jm-incredible`, `jm-dte`, `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. The cradle and footprints come from Incredible India; the “well run” advice is editorial. Revision 2 removed the low-pot game suggestion (no source supports it as safe) and the repeated fasting line.
- OPTIONAL: no Atlanta-area Janmashtami event, temple or student group has been verified, so none is named.

> **Reviewer note — 💡 EDITORIAL POINT**
> practical suggestions, not cultural claims; no college is named. The cradle and footprints come from Incredible India; the “well run” advice is editorial. Revision 2 removed the low-pot game suggestion (no source supports it as safe) and the repeated fasting line.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Mathura, Vrindavan and beyond

_Tradition: Regional; varies by community_

The festival is observed especially in Mathura and Vrindavan, the places associated with Krishna’s birth and childhood. HAF notes that in Vrindavan some festivities begin about ten days before Krishna’s birthday, and many pilgrims travel there. Incredible India describes Rasa Lila, dance-dramas of Krishna’s life, as especially popular in the Mathura region, in Manipur and Assam, and in parts of Rajasthan and Gujarat.

In Puri, in Odisha, the Jagannath Temple marks the festival, and Incredible India describes an offering of 56 dishes there. In Maharashtra, Goa and Gujarat the day after Janmashtami brings Dahi Handi. Beyond India, Hindu communities, including ISKCON temples, hold midnight programs, dramas and tableaux of their own.

**Sources:** `jm-brit`, `jm-haf`, `jm-incredible`, `jm-iskcon`

**Research notes (internal, not published):**
- SOURCE NOTE: Incredible India lists “Mumbai, Goa or Gujarat” for Dahi Handi; Britannica says “especially in Maharashtra and Goa”; the text keeps the two lists together without claiming more.
- OPTIONAL: Tamil Nadu (Gokulashtami, kolam footprints), Kerala, Karnataka, Andhra Pradesh and Telangana customs are not described: no reliable source read covers them, so none are invented.
- OPTIONAL: Pushtimarg (Nathdwara) and Gaudiya practice are not described in detail: the Pushtimarg source could not be opened.

> **Reviewer note — 🆕 NEW DRAFT**
> Incredible India lists “Mumbai, Goa or Gujarat” for Dahi Handi; Britannica says “especially in Maharashtra and Goa”; the text keeps the two lists together without claiming more.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Smarta and Vaishnava traditions: why the day can differ

_Tradition: Smarta and Vaishnava traditions_

Janmashtami is tied to the eighth day of the waning moon, and different traditions follow their own calendar practices in deciding which day that is. As a result, observance dates can differ by tradition: some communities mark Janmashtami on one day and others on the next. A report from Odisha describes Smarta temples and households and Vaishnava institutions observing on consecutive days in one recent year.

Which day a family follows is a matter of its own tradition. Temples usually announce theirs, and a local temple’s announcement is the best guide.

**Sources:** `jm-argus`

**Research notes (internal, not published):**
- EDITORIAL (revision 2, owner direction): the specific reckoning rules (sunrise, Rohini nakshatra, Ashtami tithi and evening or midnight timing) were removed from the public text because they rest on two news reports that phrase them differently and no calendar authority was read. The text now says only, in general terms, that observance dates can differ by tradition, attributed to the Odisha report.
- OPTIONAL: a panchang authority, temple or scholarly source would allow the reckoning to be explained later. The India TV (2025) explainer, which states the rules, stays in the pack as read and not used for them.
- EDITORIAL: no date appears. The Atlanta ledger keeps the Smarta and Vaishnava observances separate and the festival stays “disputed” there.
- SOURCE NOTE: HAF’s explanation that devotees fast on the day before because ancient India counted a new day from dawn was also left out of this section, since it is a timing rule.

> **Reviewer note — 💡 EDITORIAL POINT**
> the specific reckoning rules (sunrise, Rohini nakshatra, Ashtami tithi and evening or midnight timing) were removed from the public text because they rest on two news reports that phrase them differently and no calendar authority was read. The text now says only, in general terms, that observance dates can differ by tradition, attributed to the Odisha report.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Dahi Handi: the pot of curd

_Tradition: Maharashtra, Goa and western India_

In Maharashtra and Goa, the day after Janmashtami is marked by Dahi Handi, “the pot of curd.” A pot of curd is hung high above a street from a pole or wire, and groups of young people, called govindas after a name of Krishna, form a human pyramid to reach and break it. The game imitates the boy Krishna and his friends stealing curd from pots that their mothers hung out of reach.

Because the pyramids are tall and the climbers at the top are usually the lightest and youngest, Dahi Handi has caused injuries. It is best watched from a safe distance, and anyone who takes part should do so only in a well-organized event that follows the local safety requirements.

**Sources:** `jm-brit`, `jm-dte`

**Research notes (internal, not published):**
- EDITORIAL (revision 2, owner direction): the court-limit discussion (age, height and safety measures ordered in 2014 and 2016) and every pyramid height were removed from the public text as outdated and conflicting. The text keeps only the general safety concern; Down To Earth (2016) supports that the lightest, youngest climbers go to the top and that injuries have occurred.
- OPTIONAL: a recent, authoritative source on the present rules in Maharashtra would allow safety requirements to be described specifically. The 2014 and 2016 news items (Scroll, India TV) stay in the pack as read and not used.
- EDITORIAL: no injury counts, deaths or graphic detail are given. “Well-organized event that follows the local safety requirements” and “best watched from a safe distance” are common-sense safety wording with no source.

> **Reviewer note — 💡 EDITORIAL POINT**
> the court-limit discussion (age, height and safety measures ordered in 2014 and 2016) and every pyramid height were removed from the public text as outdated and conflicting. The text keeps only the general safety concern; Down To Earth (2016) supports that the lightest, youngest climbers go to the top and that injuries have occurred.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `jm-brit` | Janmashtami | Encyclopaedia Britannica | https://www.britannica.com/topic/Janmashtami | Done |
| `jm-bhagavata` | Srimad-Bhagavatam, Canto 10, Chapter 3: The Birth of Lord Krsna (Bhaktivedanta VedaBase) | Bhaktivedanta Book Trust, via vedabase.io | https://vedabase.io/en/library/sb/10/3/ | Not done |
| `jm-haf` | Janmashtami: the day to celebrate Krishna’s birth | Hindu American Foundation | https://www.hinduamerican.org/blog/janmashtami-the-day-to-celebrate-krishnas-birth | Not done |
| `jm-haf5` | 5 things to know about Krishna | Hindu American Foundation | https://www.hinduamerican.org/blog/5-things-to-know-about-krishna | Not done |
| `jm-incredible` | Janmashtami: Celebrate Lord Krishna’s birth with joy and devotion! | Incredible India, Ministry of Tourism, Government of India | https://www.incredibleindia.gov.in/en/festivals-and-events/janmashtami | Not done |
| `jm-iskcon` | Janmastami: A Unique Expression of Devotion to a Unique Deity | ISKCON News (an ISKCON news report from 2009) | https://iskconnews.org/janmastami-a-unique-expression-of-devotion-to-a-unique-deity/ | Not done |
| `jm-krishnacom` | Janmashtami | Krishna.com (Bhaktivedanta Book Trust) | https://krishna.com/janmashtami/ | Not done |
| `jm-brandeis` | Janmashtami (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/janmashtami.html | Not done |
| `jm-argus` | Smarta vs Vaishnava: Odisha’s Janmashtami Observance Explained | Argus News (Odisha), about 2025 | https://argusenglish.in/odisha/smarta-vs-vaishnava-odishas-janmashtami-observance-explained | Not done |
| `jm-indiatv` | Krishna Janmashtami 2025: August 15 or 16? Find the right date and midnight puja muhurat | India TV News (2025) | https://www.indiatvnews.com/lifestyle/spirituality/krishna-janmashtami-2025-date-confusion-puja-time-2025-08-10-1002881 | Not done |
| `jm-dte` | Dahi Handi and the fall of young govindas | Down To Earth (Centre for Science and Environment), 2016 | https://www.downtoearth.org.in/news/health/dahi-handi-and-the-fall-of-the-young-govindas-55411 | Not done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

# Ganesh Chaturthi

## Basics (reviewed)

- **Subtitle:** A festival honoring the birth of Ganesha
- **Aliases:** Vinayaka Chaturthi
- **Deity search terms:** Ganesha, Parvati, Shiva

**Your decision:** see the Basics table above.

## Quick facts (reviewed)

- **Meaning:** A festival celebrating the birth of Ganesha, the elephant-headed god of beginnings and remover of obstacles. It begins on the fourth day (chaturthi) of the month of Bhadrapada.  
  Sources: gc-brit, gc-brit-ganesha, gc-brandeis
- **Length of observance:** Counting the first day as day one, the festival can run to the eleventh day, called Anant Chaturdashi. Sources also call it a ten-day festival because it ends ten days after the first. Many homes keep Ganesha for a shorter, odd number of days: one and a half, three, five or seven, as the family’s tradition suggests. _(Varies by family and community)_  
  Sources: gc-brit, gc-haf, gc-ht2010
- **Associated deities:** Ganesha, with his parents Shiva and Parvati in his birth stories. _(Puranic traditions)_  
  Sources: gc-brit, gc-brit-ganesha, gc-haf
- **Common customs:** Welcoming a clay image of Ganesha into the home or a community pandal, daily worship and offerings, and a final farewell, with the image carried to water for immersion.  
  Sources: gc-brit, gc-haf, gc-ht2010
- **Signature foods:** Modaks, sweet dumplings regarded as Ganesha’s favorite, along with coconut, jaggery and other round sweets such as laddus, offered first and then shared as prasada. _(Regional; varies by community)_  
  Sources: gc-brit, gc-brit-ganesha

> **Reviewer note — 🆕 NEW DRAFT**
> Quick facts follow the guide text; check that each is supported by its listed sources.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Ganesha** (Hindu traditions; Puranic birth stories vary): The elephant-headed god of beginnings, traditionally worshipped before any major undertaking and honored as a remover of obstacles. His festival celebrates his birth.  
  Sources: gc-brit, gc-brit-ganesha, gc-haf, gc-brandeis
- **Parvati** (Puranic tradition; versions vary): In the best-known birth story, Ganesha’s mother, who shapes him as a boy to guard her while she bathes. In that version she alone makes him, though he is traditionally regarded as the child of both Parvati and Shiva.  
  Sources: gc-brit-ganesha, gc-haf
- **Shiva** (Puranic tradition; versions vary): Parvati’s husband and, in tradition, Ganesha’s father. In the best-known story he replaces the boy’s lost head with an elephant’s head.  
  Sources: gc-brit-ganesha, gc-haf

> **Reviewer note — 🆕 NEW DRAFT**
> Each entry names the tradition that makes the association.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Ganesh Chaturthi?

Ganesh Chaturthi celebrates the birth of Ganesha, the elephant-headed god worshipped as the remover of obstacles and the god of beginnings. Many Hindus invoke him before starting a new task, a journey or a ritual, so welcoming him at the start of a festival feels fitting.

The festival begins on the fourth day of the month of Bhadrapada. A clay image of Ganesha is installed in a home or in a decorated community pandal, worshipped for a number of days, and then carried in procession to water for immersion, a farewell that symbolizes his journey home. It is a quiet family observance in some houses and a large public celebration in others, especially in Maharashtra, and it is observed by Hindu communities around the world.

**Sources:** `gc-brit`, `gc-brit-ganesha`, `gc-haf`, `gc-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: the overview rests on four sources (Britannica, HAF, Brandeis and Hinduism Today through the observances).
- EDITORIAL: no date appears. “Many Hindus invoke him before starting a new task” follows Britannica’s statement that he is traditionally worshipped before any major enterprise.

> **Reviewer note — 💡 EDITORIAL POINT**
> no date appears. “Many Hindus invoke him before starting a new task” follows Britannica’s statement that he is traditionally worshipped before any major enterprise.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Ganesha, the remover of obstacles

_Tradition: Hindu traditions_

Ganesha’s name means “Lord of the People” and “Lord of the Ganas,” the hosts that attend Shiva. He is potbellied and usually shown holding sweets, with a rat as his vehicle. Britannica notes that, like a rat and like an elephant, he is a remover of obstacles, and HAF reads the rat as a picture of the wandering mind that devotees try to steady. He is worshipped before a new beginning, and Brandeis describes him as known for making the impossible possible and filling life with success and happiness.

Because he is invoked first in many rituals, the festival of his birth is one of the most popular in the Hindu calendar. Families and communities see it as a chance to begin the season with his blessing.

**Sources:** `gc-brit-ganesha`, `gc-haf`, `gc-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica Ganesha (name, vehicle, remover of obstacles), HAF (the mouse as the wandering mind), Brandeis (success and happiness). “One of the most popular festivals” is Brandeis. The last sentence is a mild editorial summary.
- OPTIONAL: Ganesha’s marriages and celibate forms (Britannica) and Ashtavinayaka temples are not described.

> **Reviewer note — 🆕 NEW DRAFT**
> Britannica Ganesha (name, vehicle, remover of obstacles), HAF (the mouse as the wandering mind), Brandeis (success and happiness). “One of the most popular festivals” is Brandeis. The last sentence is a mild editorial summary.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### How the festival became a public celebration

_Tradition: Maharashtra; historical_

Brut describes Ganesh Chaturthi as largely a private celebration before the late nineteenth century, though Ganesh celebrations in Pune received royal patronage under the Peshwas until their fall in 1818. The festival took its modern public form in the 1890s. Britannica credits the independence leader Bal Gangadhar Tilak with reviving it as a large public event in Maharashtra in 1893, when the British banned political assemblies. Tilak praised the public celebration in his Marathi newspaper Kesari, and mandals, community groups, collected funds locally and installed large images in decorated pavilions.

Who first took the festival public is still debated. Some research credits Bhausaheb Rangari with a public celebration in Pune as early as 1892, and writers disagree on whether 1892 or 1893 marks the beginning, so this guide does not treat either year as settled. What the sources agree on is that the public festival grew in the 1890s and spread to many towns.

Today the public festival is especially large in Maharashtra, including Mumbai and Pune, and is celebrated in many other parts of India and by Hindu communities worldwide.

**Sources:** `gc-brit`, `gc-brit-tilak`, `gc-brut`, `gc-fpj-tilak`

**Research notes (internal, not published):**
- EDITORIAL (revision 2, owner direction): the Shivaji and nationalism claim was removed (Britannica alone states Shivaji used the festival to encourage nationalist sentiment; HAF only says “some historians believe” it became a public event in the 1600s and Free Press Journal says Shivaji “reinvigorated” it, so there is no independent corroboration of the nationalist motive). The Britannica clause that Tilak’s symbolism made the movement “more communal” was removed from the public guide. Brut’s mention of Hindu-Muslim clashes in 1893 stays out.
- SOURCE NOTE: the 1890s history is sourced to Britannica (Tilak, 1893, the ban on political assemblies), Brut (private before; Peshwa patronage ending in 1818; 1893 as the key year; Rangari possibly 1892; the disagreement; mandals) and Free Press Journal (Rangari “believed to be the spark”; Kesari). Brut and FPJ are news-media features, not scholarship; no academic history was read.
- OPTIONAL: an academic history of the sarvajanik Ganeshotsav would allow the 1892 versus 1893 question and Tilak’s role to be stated with more confidence.

> **Reviewer note — 💡 EDITORIAL POINT**
> the Shivaji and nationalism claim was removed (Britannica alone states Shivaji used the festival to encourage nationalist sentiment; HAF only says “some historians believe” it became a public event in the 1600s and Free Press Journal says Shivaji “reinvigorated” it, so there is no independent corroboration of the nationalist motive). The Britannica clause that Tilak’s symbolism made the movement “more communal” was removed from the public guide. Brut’s mention of Hindu-Muslim clashes in 1893 stays out.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### Ganesha’s birth: more than one story

_Tradition: Shiva Purana and other Puranic traditions; versions vary_

Many different stories are told about how Ganesha was born. One well-known telling is in the Shiva Purana, in its Rudra Samhita. There Parvati’s companions Jaya and Vijaya remind her that Shiva’s attendants serve only him, and she decides to have a servant of her own. From the dirt of her body she makes a handsome young man, gives him clothes and a staff, and sets him as gatekeeper while she bathes. When Shiva comes to the door, the young man does not recognize him and bars his way. The account’s opening says that in one version Ganesha’s head was cut off by Shiva and an elephant’s head was put on him. In this telling Ganesha is born of Parvati alone, though he is traditionally regarded as the child of both Parvati and Shiva.

The Purana itself says the story differs from one age to another, and other tellings differ. In one Parvati makes her son from a piece of cloth and asks Shiva to bring him to life, and in some variants the planet Saturn’s glance, not Shiva, is the cause of the lost head. HAF notes that stories vary on how Ganesha got his elephant head. This guide does not choose one version as the true one.

**Sources:** `gc-shivapurana`, `gc-brit-ganesha`, `gc-haf`

**Research notes (internal, not published):**
- SOURCE NOTE (revision 2): one targeted attempt found and read a primary source: Shiva Purana, Rudra Samhita, Kumara Khanda, chapter 13, in J. L. Shastri’s translation on wisdomlib (read in full, verses 1 to 39 and footnotes). It supports the dirt of Parvati’s body, the companions’ advice, the gatekeeper with a staff, and Ganesha barring Shiva. The head-cutting appears in that chapter only in its opening frame (Brahma says the story varies by kalpa and that in one version Shiva cut off the head and an elephant’s head was put on), and the chapter ends before the confrontation is resolved. The later chapter on the head, listed in the index, was not read.
- SOURCE NOTE: Britannica supplies the cloth version, the Saturn variant and the statement that he is traditionally regarded as the child of both; HAF supplies that stories vary on the elephant head. The translator’s footnotes also mention the Saturn variant and say Ganesha is born of Parvati’s body without Shiva’s intervention.
- EDITORIAL: the broken-tusk connection was removed (owner direction): the Shiva Purana chapter does not mention a tusk, and the only source is Britannica’s retelling. The beheading stays non-graphic. “Born of Parvati alone” follows the translator’s footnote and Britannica.
- OPTIONAL: other Puranic versions (for example Brahmanda or Skanda traditions) and the later Shiva Purana chapter on the head were not read; none is named.

> **Reviewer note — 💡 EDITORIAL POINT**
> the broken-tusk connection was removed (owner direction): the Shiva Purana chapter does not mention a tusk, and the only source is Britannica’s retelling. The beheading stays non-graphic. “Born of Parvati alone” follows the translator’s footnote and Britannica.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### Welcoming Ganesha

Before the festival, artisans make and sell Ganesha images, from small figures that families may make at home to very large ones. At the start, an image is placed on a raised platform in a home shrine or in a decorated community pandal. The worship begins with prana pratishtha, a ritual to invite life into the image, followed by the sixteen-step worship called shodashopachara. Mantras and hymns are chanted, including the Ganapati Atharvashirsha, and the image is anointed with red sandalwood paste and decorated with flowers.

The image is worshipped for an odd number of days. In homes the celebration can end after one and a half, three, five or seven days as a family’s tradition suggests. In some homes and in larger public celebrations it lasts until Anant Chaturdashi, which is the eleventh day if the first day is counted as day one and ten days after the first, and this is why sources call it a ten-day festival. At the end a final puja, the uttarapuja, says goodbye to Ganesha. The image is then carried to water in a family walk or a large procession with drums, singing and dancing and immersed in an act called visarjan, understood as Ganesha’s journey home to Mount Kailash, where his parents Shiva and Parvati live.

**Sources:** `gc-brit`, `gc-haf`, `gc-ht2010`, `gc-hpi2024`

**Research notes (internal, not published):**
- SOURCE NOTE: nearly every detail is Britannica; HAF supports clay images, invoking Ganesha, the sixteen steps and visarjan as a return to Kailash; Hinduism Today supports daily puja, a simple farewell puja and a procession; HPI supports immersion on Anant Chaturdashi. Britannica says the longest observance ends “on the 11th day (called anant chaturdashi, or 10 days following the first day)”; HAF, Hinduism Today and Hindu Press International say “ten days”. Revision 2 states the counting convention explicitly (day one is the first day; Anant Chaturdashi is the eleventh day and ten days after the first).
- OPTIONAL: Gauri Aagman (Gauri’s arrival on the third or fourth day) and the chant “Ganpati Bappa Morya” are not included: the only sources that mention them (Maharashtra Tourism and Incredible India) were read only in part and mostly through a model summary, so they are not relied on.

> **Reviewer note — 🆕 NEW DRAFT**
> nearly every detail is Britannica; HAF supports clay images, invoking Ganesha, the sixteen steps and visarjan as a return to Kailash; Hinduism Today supports daily puja, a simple farewell puja and a procession; HPI supports immersion on Anant Chaturdashi. Britannica says the longest observance ends “on the 11th day (called anant chaturdashi, or 10 days following the first day)”; HAF, Hinduism Today and Hindu Press International say “ten days”. Revision 2 states the counting convention explicitly (day one is the first day; Anant Chaturdashi is the eleventh day and ten days after the first).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Modaks and sweets

_Tradition: Regional; varies by community_

Offerings to Ganesha include coconut, jaggery, and 21 modaks, sweet dumplings that Britannica says are considered his favorite food. Hinduism Today describes the modaka in his hand as a symbol of enlightened attainments. Laddus and other round sweets are offered too, and once blessed they are shared with everyone as prasada. HAF adds that prasada is distributed throughout the community during the festival. What a family prepares varies with its region and tradition.

**Sources:** `gc-brit`, `gc-brit-ganesha`, `gc-ht2010`, `gc-haf`

**Research notes (internal, not published):**
- EDITORIAL: no fasting or vegetarian claim is made; no source read describes fasting for Ganesh Chaturthi.
- SOURCE NOTE: the number 21 is Britannica; a Mangalorean modak recipe in the Hinduism Today article is not used.

> **Reviewer note — 💡 EDITORIAL POINT**
> no fasting or vegetarian claim is made; no source read describes fasting for Ganesh Chaturthi.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Environmentally responsible immersion

_Tradition: Guidance from India and for communities elsewhere_

Immersing images in rivers, lakes and the sea has raised environmental concerns. Britannica notes that many large public statues are made of plaster of paris, which does not break down, and painted with chemical paints that contain metals such as lead, mercury and chromium. In India, environmental groups and local governments encourage images made of dissolving clay or soil and decorated with natural colors, and pollution-control authorities have issued guidelines that discourage plaster of paris, plastic and toxic paints and favor designated immersion tanks. Reports say these guidelines have been unevenly followed and that large community groups find clay images heavy and fragile.

Households can choose a small, unbaked clay image painted with natural colors or left unpainted, and can remove decorations that do not dissolve before the farewell. Hinduism Today notes that the image is returned to the water after non-degradable decorations are removed. Rules and arrangements for immersion differ from place to place, so a temple or community organizer is the best guide to what is appropriate locally.

**Sources:** `gc-brit`, `gc-tribune`, `gc-telangana`, `gc-citizen`, `gc-ht2010`

**Research notes (internal, not published):**
- EDITORIAL (revision 2, owner direction): the specific Central Pollution Control Board claims (the 2020 revision, the 2025 guidance, named materials and fines) were generalized, because the guidelines themselves (a PDF) were not read and the claims rest on two news reports. The home bucket-immersion steps and the pour-the-water-on-plants advice were removed; the guide now points readers to a temple or community organizer.
- SOURCE NOTE: the general direction of the guidance is supported by Britannica, the Tribune/PTI report (2020), Telangana Today (2025) and Citizen Matters (2024, uneven enforcement; clay fragile and heavy for large groups). The Hans India home-immersion article was dropped from the guide’s sources and stays in the pack as read and not used.
- OPTIONAL: no source on immersion rules in the United States was found; a temple’s guidance or a municipal rule would allow specific local advice. The text deliberately says only that arrangements differ by place.

> **Reviewer note — 💡 EDITORIAL POINT**
> the specific Central Pollution Control Board claims (the 2020 revision, the 2025 guidance, named materials and fines) were generalized, because the guidelines themselves (a PDF) were not read and the claims rest on two news reports. The home bucket-immersion steps and the pour-the-water-on-plants advice were removed; the guide now points readers to a temple or community organizer.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Celebrating Ganesh Chaturthi away from home

You can welcome Ganesha even in a small room.

Find your people. Ask a Hindu or Indian student association or a nearby temple whether it hosts an installation, aarti or immersion, and whether you can join online.

Choose a small clay image. A small, unbaked clay Ganesha with natural colors, or an unpainted one, is easy to keep in a room and easy to immerse responsibly. You can keep him for as many days as suit your family’s tradition and your schedule.

Worship without a flame. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract and use a battery-powered lamp and fresh flowers. If you have questions about religious accommodations, ask your residence life office.

Plan the farewell with a temple or community organizer, who will know what local arrangements are appropriate. Rules on immersing images in lakes, rivers or the sea differ from place to place.

Share sweets thoughtfully. Modaks and other sweets can contain coconut or nuts, so tell friends what is in what you share.

Call home. A video call with family during the puja keeps you part of the celebration.

**Sources:** `gc-brit`, `gc-ht2010`, `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. The small unpainted clay image and natural colors follow the sources. Revision 2 removed the dorm bucket-immersion and pour-the-water-on-plants instructions (owner direction); the farewell is left to a temple or community organizer.
- EDITORIAL: allergen wording (coconut or nuts) is a general caution; no source lists modak ingredients.
- OPTIONAL: no Atlanta-area Ganesh Chaturthi event, temple or student group has been verified, so none is named.

> **Reviewer note — 💡 EDITORIAL POINT**
> practical suggestions, not cultural claims; no college is named. The small unpainted clay image and natural colors follow the sources. Revision 2 removed the dorm bucket-immersion and pour-the-water-on-plants instructions (owner direction); the farewell is left to a temple or community organizer.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Home shrines, pandals and communities

_Tradition: Regional; varies by community_

In Maharashtra the festival is especially prominent. Cities such as Mumbai and Pune host very large community celebrations, and Hinduism Today calls Mumbai the place where the festival is observed with the most creativity and enthusiasm. Hindu Press International lists Maharashtra, Gujarat, Odisha, Uttar Pradesh and Karnataka among the many states where it is celebrated. Britannica notes that it is celebrated with pomp and devotion in Hindu communities worldwide.

Within a single town the festival can look very different from house to house. A small home image may be kept for a day and a half, while a neighborhood mandal’s large image stays for ten days or more. Neither is more correct than the other; a family or community follows its own tradition.

**Sources:** `gc-brit`, `gc-ht2010`, `gc-hpi2024`

**Research notes (internal, not published):**
- OPTIONAL: Andhra Pradesh and Telangana (Vinayaka Chavithi), Tamil Nadu (Pillaiyar), Goa and Karnataka customs are not described: no reliable source read covers them, and none are invented. Karnataka is named only in the HPI list of states.
- OPTIONAL: Gauri Aagman and temple-specific celebrations (Lalbaugcha Raja, Siddhivinayak) are not described: only partially read sources mention them.

> **Reviewer note — 🆕 NEW DRAFT**
> Andhra Pradesh and Telangana (Vinayaka Chavithi), Tamil Nadu (Pillaiyar), Goa and Karnataka customs are not described: no reliable source read covers them, and none are invented. Karnataka is named only in the HPI list of states.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `gc-brit` | Ganesh Chaturthi | Encyclopaedia Britannica | https://www.britannica.com/topic/Ganesh-Chaturthi | Done |
| `gc-brit-ganesha` | Ganesha | Encyclopaedia Britannica | https://www.britannica.com/topic/Ganesha | Done |
| `gc-brit-tilak` | Bal Gangadhar Tilak | Encyclopaedia Britannica | https://www.britannica.com/biography/Bal-Gangadhar-Tilak | Done |
| `gc-shivapurana` | Shiva Purana, Rudra Samhita, Kumara Khanda, chapter 13: The birth of Ganesha (J. L. Shastri translation, on wisdomlib) | wisdomlib.org (translation by J. L. Shastri, 1950) | https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226133.html | Not done |
| `gc-haf` | Ganesha Chaturthi: the day to celebrate Ganesha’s birth | Hindu American Foundation | https://www.hinduamerican.org/blog/ganesha-chaturthi-the-day-to-celebrate-ganeshas-birth | Not done |
| `gc-ht2010` | Festivals: Ganesha Chaturthi | Hinduism Today (Himalayan Academy) | https://www.hinduismtoday.com/magazine/april-may-june-2010/2010-04-festivals-ganesha-chaturthi/ | Done |
| `gc-hpi2024` | Hindus Ready for Ganesha Chaturthi Festival (Hindu Press International, from Times Now) | Hindu Press International (2024) | https://www.hinduismtoday.com/hpi/2024/09/04/hindus-ready-for-ganesha-chaturthi-festival/ | Not done |
| `gc-brandeis` | Ganesh Chaturthi (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/ganesh-chaturthi.html | Not done |
| `gc-brut` | Ganesh Chaturthi Was Once Mostly A Private Celebration. Who Took It To The Streets In The 1890s? | Brut India (2026) | https://www.brut.media/in/articles/ganesh-chaturthi-was-once-mostly-a-private-celebration-who-took-it-to-the-streets-in-the-1890s | Not done |
| `gc-fpj-tilak` | Know how Lokamanya Bal Gangadhar Tilak became the architect of Ganesh Chaturthi public celebrations | Free Press Journal (2021) | https://www.freepressjournal.in/india/watch-video-know-how-lokamanya-bal-gangadhar-tilak-became-the-architect-of-ganesh-chaturthi-public-celebrations | Not done |
| `gc-tribune` | Idol immersion: Ban on use of plastic, plaster of Paris, thermocol to make statues (PTI) | The Tribune (PTI), 2020 | https://www.tribuneindia.com/news/nation/idol-immersion-ban-on-use-of-plastic-plaster-of-paris-thermocol-to-make-statues-84322/amp | Not done |
| `gc-telangana` | Central PCB issue revised guidelines for eco-friendly Ganesh idol immersion | Telangana Today (2025) | https://telanganatoday.com/central-pcb-issue-revised-guidelines-for-eco-friendly-ganesh-idol-immersion | Not done |
| `gc-citizen` | Eco-friendly Ganpati celebrations: Will Mumbai’s sarvajanik mandals comply? | Citizen Matters (2024) | https://citizenmatters.in/cpcb-guidelines-eco-friendly-ganpati-celebrations-sarvakanik-mandals | Not done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

# Vijayadashami

## Basics (reviewed)

- **Subtitle:** The victorious tenth day
- **Aliases:** Dussehra, Dasara, Vijaya Dashami
- **Deity search terms:** Rama, Durga

**Your decision:** see the Basics table above.

## Quick facts (reviewed)

- **Meaning:** “Vijayadashami” means “the tenth day of victory.” In much of India the day is known as Dussehra, from the Sanskrit dasha, “ten,” and hara, “defeat,” remembering Rama’s victory over the ten-headed Ravana. In Bengal and the east it is the last day of Durga Puja, honoring Durga’s victory over Mahishasura.  
  Sources: vd-brit-dussehra, vd-brit-vijayadashami
- **Length of observance:** One day, the tenth after the nine nights of Navaratri. Some celebrations, such as Ramlila performances, Durga Puja and Mysuru Dasara, build up over many days before it. _(Varies by region)_  
  Sources: vd-brit-dussehra, vd-brit-vijayadashami, vd-unesco, vd-mysuru
- **Associated deities:** Rama, in the Ramayana’s story of Ravana’s defeat, and Durga, in the story of Mahishasura’s defeat. In Mysuru, the goddess is honored as Chamundeshwari. _(Varies by tradition and region)_  
  Sources: vd-brit-dussehra, vd-brit-vijayadashami, vd-karnataka
- **Common customs:** Ramlila performances and the burning of Ravana effigies in the north; the farewell and immersion of Durga images in Bengal and the east; the Jamboo Savari procession in Mysuru; and the exchange of apta leaves in Maharashtra. Ayudha Puja, the worship of tools and books, falls the day before, on Mahanavami. _(Regional)_  
  Sources: vd-brit-dussehra, vd-brit-vijayadashami, vd-mysuru, vd-outlook

> **Reviewer note — 🆕 NEW DRAFT**
> Quick facts follow the guide text; check that each is supported by its listed sources.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (reviewed)

- **Rama** (Vaishnava tradition; the Ramayana): The hero of the Ramayana, who defeats the ten-headed demon king Ravana to rescue his wife Sita. His victory is the story behind Dussehra in much of India and is retold in Ramlila.  
  Sources: vd-brit-dussehra, vd-haf, vd-valmiki
- **Durga** (Shakta tradition; Durga Puja in the east): The warrior goddess who defeats the buffalo demon Mahishasura, as told in the Devi Mahatmya. Vijayadashami is the last day of Durga Puja, when images of the goddess are bid farewell and immersed.  
  Sources: vd-brit-vijayadashami, vd-brit-durgapuja
- **Chamundeshwari** (Mysuru and Karnataka): The goddess honored in Mysuru Dasara, remembered for defeating Mahishasura. She is carried in procession on Vijayadashami.  
  Sources: vd-karnataka, vd-mysuru

> **Reviewer note — 🆕 NEW DRAFT**
> Each entry names the tradition that makes the association.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Vijayadashami?

Vijayadashami, “the victorious tenth,” falls on the day after the nine nights of Navaratri. It is a festival of victory, and different parts of India remember different victories. In much of the north and west it is Dussehra, when Rama’s victory over the ten-headed king Ravana is celebrated, and the story is told in Ramlila plays and by burning effigies. In Bengal and the east it is the last day of Durga Puja, when the goddess Durga, who defeated the buffalo demon Mahishasura, is bid farewell.

Many people see in these stories a reminder that good prevails over evil and that each person can overcome their own faults. In the south and in Maharashtra, the days around it are also a time to honor tools, books and, in some places, weapons. The names, stories and customs vary by region, and this guide keeps them apart.

**Sources:** `vd-brit-dussehra`, `vd-brit-vijayadashami`, `vd-haf`, `vd-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: the overview rests on Britannica (two articles), HAF and Brandeis. “Each person can overcome their own faults” follows HAF (“the end of negativity and evil within us”) and Brandeis (internal enemies, vices).
- EDITORIAL: no date appears. This guide is a companion to the reviewed Navaratri guide (nine nights, Durga and Mahishasura) and the reviewed Diwali guide (the homecoming); wording was kept consistent with both.

> **Reviewer note — 💡 EDITORIAL POINT**
> no date appears. This guide is a companion to the reviewed Navaratri guide (nine nights, Durga and Mahishasura) and the reviewed Diwali guide (the homecoming); wording was kept consistent with both.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Vijayadashami, Dussehra and Dasara: the names

_Tradition: Varies by region and tradition_

Vijayadashami, Dussehra and Dasara are different names, used in different regions, for the same tenth day. Britannica explains that Dussehra, from the Sanskrit dasha, “ten,” and hara, “defeat,” is the name used in much of the north and west, where the day marks the end of Sharad Navratri and celebrates Rama’s victory over Ravana. In West Bengal, Assam and other eastern states, Vijayadashami, also written Vijaya Dashami and known in Bengali as Bijoya Doshomi, is the tenth and final day of Durga Puja. In Karnataka the festival is known as Dasara, and Mysuru’s celebration is its best-known form. Britannica notes that Dussehra and Vijayadashami are often used interchangeably, perhaps because both mark a triumph of good over evil, though each name carries its own emphasis.

The day follows the nine nights of Navaratri, and for many people it also begins the countdown to Diwali, which in much of the north remembers Rama’s return to Ayodhya. Dussehra celebrates the victory; Diwali, the homecoming.

**Sources:** `vd-brit-dussehra`, `vd-brit-vijayadashami`, `vd-karnataka`, `vd-haf`

**Research notes (internal, not published):**
- EDITORIAL (revision 2, owner direction): Dussehra, Dasara and Vijaya Dashami stay as search aliases, and this section now states the regional distinctions (Dussehra in the north and west, Vijayadashami and Bijoya Doshomi in the east, Dasara in Karnataka) so the aliases are not read as identical.
- SOURCE NOTE: the name derivation, the interchangeable use and the Diwali link are Britannica (Dussehra); Vijayadashami, Vijaya Dashami and Bijoya Doshomi as names for the final day of Durga Puja are Britannica (Vijayadashami); Dasara is the Karnataka tourism and Mysuru sites’ own name for the festival. Britannica’s Diwali timing (“20 days after Dussehra”) is a date relation and is not used.
- EDITORIAL: consistent with the reviewed Diwali guide’s line “Dussehra, earlier in the autumn, celebrates the victory over Ravana. Diwali is the homecoming.” The Navaratri guide covers the nine nights and Durga Puja in more detail.

> **Reviewer note — 💡 EDITORIAL POINT**
> Dussehra, Dasara and Vijaya Dashami stay as search aliases, and this section now states the regional distinctions (Dussehra in the north and west, Vijayadashami and Bijoya Doshomi in the east, Dasara in Karnataka) so the aliases are not read as identical.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### Rama and Ravana

_Tradition: Vaishnava tradition; the Ramayana_

The Ramayana tells how Ravana, the ten-headed king of Lanka, abducted Rama’s wife Sita. Rama, with his brother Lakshmana and allies including the monkey king Sugriva, the commander Hanuman and Ravana’s own brother Vibhishana, waged war to rescue her. In Valmiki’s Sanskrit epic, as translated by K. M. K. Murthy, Rama’s charioteer Matali urges him to use a weapon of Brahma, and Rama’s arrow pierces Ravana’s heart and brings him down from his chariot. HAF and Brandeis describe Dussehra as celebrating this victory.

Ramlila, the folk theater of the Ramayana, is based on Tulsidas’s sixteenth-century retelling, the Ramacharitmanas, rather than on Valmiki. Many families and communities tell the story in their own ways, and some traditions tell it with different emphases.

**Sources:** `vd-brit-dussehra`, `vd-valmiki`, `vd-haf`, `vd-brandeis`, `vd-unesco`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica (Dussehra) tells the war and the Brahmastra; the Valmiki sarga 108 (Murthy) was read in full: Matali, the blazing arrow, Ravana’s heart. HAF and Brandeis give the festival link. UNESCO says Ramlila is based on the Ramacharitmanas by Tulsidas, composed in the sixteenth century.
- OPTIONAL: the Ramcharitmanas passage itself, regional Ramayanas (Kamban, Krittivasi) and the traditions in which Ravana is honored (HAF’s “untold story of Ravana” says he is “still worshiped in some parts of the world” without naming where) are not covered.
- EDITORIAL (revision 2, owner direction): the guide does not claim that the epic establishes Ravana’s death on the tenth day. No source read says so (Britannica says only that Dussehra celebrates the victory), and the overview was reworded from “the day Rama defeated Ravana” to “when Rama’s victory over Ravana is celebrated”.

> **Reviewer note — 💡 EDITORIAL POINT**
> the guide does not claim that the epic establishes Ravana’s death on the tenth day. No source read says so (Britannica says only that Dussehra celebrates the victory), and the overview was reworded from “the day Rama defeated Ravana” to “when Rama’s victory over Ravana is celebrated”.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Durga and Mahishasura

_Tradition: Shakta tradition; the Devi Mahatmya_

In the east and in many Shakta traditions, Vijayadashami recalls the goddess Durga’s victory over the buffalo demon Mahishasura. Britannica says the story first appears in the Devi Mahatmya, part of the Markandeya Purana, in which the gods combine their powers to create a warrior goddess who defeats him. Durga Puja, which celebrates this victory, ends on Vijayadashami, when the goddess is bid farewell. The Navaratri guide tells the story in more detail.

Some communities remember both victories on the same day. In one ISKCON community described by its communications director, the tenth day recalls Durga’s victory over Mahishasura as well as Rama’s over Ravana.

**Sources:** `vd-brit-vijayadashami`, `vd-brit-durgapuja`, `vd-haf-iskcon`

**Research notes (internal, not published):**
- SOURCE NOTE: the Devi Mahatmya attribution is Britannica (Durga Puja). The Navaratri guide notes that the Devi Mahatmya cantos read do not mention Vijayadashami; this text says only that Durga Puja ends on Vijayadashami and does not claim the Devi Mahatmya names the day.
- EDITORIAL: kept short on purpose because the reviewed Navaratri guide carries the story; the phrase “in more detail” refers to that guide and should be revisited if the guides are ever linked.

> **Reviewer note — 💡 EDITORIAL POINT**
> kept short on purpose because the reviewed Navaratri guide carries the story; the phrase “in more detail” refers to that guide and should be revisited if the guides are ever linked.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### Ramlila and the burning of Ravana

_Tradition: Northern and western India_

In northern and western India, Ramlila, a dramatic folk retelling of the Ramayana with narration, song and dialogue, leads up to the day. UNESCO describes performances lasting ten to twelve days, and some, such as the one at Ramnagar, up to a month. The best-known are at Ayodhya, Ramnagar and Benares, where villagers play roles and the audience is invited to sing along.

Most Ramlilas end with Ravana’s defeat, and then comes Ravana dahan, “the burning of Ravana.” Large effigies of Ravana, often alongside his son Meghanada and his brother Kumbhakarna, are set alight at dusk in open fields. Britannica notes that the effigies are often stuffed with firecrackers. Brandeis says the burning reminds people to overcome their own vices.

**Sources:** `vd-brit-dussehra`, `vd-unesco`, `vd-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: Ramlila length, places and participation are UNESCO (read in full); Ravana dahan, the firecrackers and the effigies are Britannica; the inner meaning is Brandeis.
- EDITORIAL (revision 2, owner direction): the ISKCON example of children shooting flaming arrows at a Ravana figure was removed from the public text. The HAF interview (a single speaker) stays in the pack and is cited only for the sentence that some communities remember both victories on the same day. The college guide gives the participation advice.

> **Reviewer note — 💡 EDITORIAL POINT**
> the ISKCON example of children shooting flaming arrows at a Ravana figure was removed from the public text. The HAF interview (a single speaker) stays in the pack and is cited only for the sentence that some communities remember both victories on the same day. The college guide gives the participation advice.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Mahanavami and Vijayadashami: tools, books, shami and apta leaves

_Tradition: South India, Karnataka and Maharashtra_

On Mahanavami, the ninth day of Navratri, Ayudha Puja is observed in many southern states, when tools, instruments and objects of knowledge are honored. Across the nine nights, southern homes also set up Golu, a display of dolls and figures on stepped platforms. In Mysuru, the Mahanavami program includes Ayudha puja, and the royal family worships weapons and royal vehicles.

Vijayadashami itself brings different customs. In Mysuru it includes a shami puja and the Jamboo Savari procession. In Maharashtra, people exchange the leaves of the apta tree on Dussehra and call them sona, “gold,” as a gesture of goodwill, with the words “accept this gold and remain like gold.” Outlook Traveller links the custom to a tradition that the Pandavas hid their weapons in a shami tree, and to the Maratha practice of soldiers returning from campaigns with apta or shami leaves for the women of their families. The shami tree is also worshipped in several other parts of India.

**Sources:** `vd-brit-dussehra`, `vd-mysuru`, `vd-karnataka`, `vd-outlook`

**Research notes (internal, not published):**
- EDITORIAL (revision 2, owner direction): Mahanavami customs (Ayudha puja, Golu across Navratri) are now kept apart from Vijayadashami customs (shami puja, the Jamboo Savari, apta leaves). Britannica places Ayudha Puja on the ninth day of Navratri; the Mysuru official site lists Mahanavami with Ayudha puja and Vijayadashami with Shami puja.
- SOURCE NOTE: Golu and Ayudha Puja are Britannica (Dussehra); the Mysuru details are the official site and Karnataka Tourism (private Ayudha Puja for weapons and royal vehicles); the apta custom, the sona phrase and the Pandava and Maratha explanations are Outlook Traveller (a travel magazine, read in full), which ties the custom to “Dussehra” without naming a day of the festival.
- SOURCE NOTE: Karnataka and Telangana “jammi” or “banni” leaf customs appeared in a blog and are not used.
- OPTIONAL: Saraswati puja and Vidyarambham (the start of children’s learning) are not described: only a Mysuru event schedule line mentions Saraswati puja, and no reliable source read describes Vidyarambham.

> **Reviewer note — 💡 EDITORIAL POINT**
> Mahanavami customs (Ayudha puja, Golu across Navratri) are now kept apart from Vijayadashami customs (shami puja, the Jamboo Savari, apta leaves). Britannica places Ayudha Puja on the ninth day of Navratri; the Mysuru official site lists Mahanavami with Ayudha puja and Vijayadashami with Shami puja.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Celebrating Vijayadashami away from home

You can mark Vijayadashami with a few simple choices.

Find your people. Ask a Hindu or Indian student association or a nearby temple whether it hosts a Ramlila, a Ravana dahan, a Durga farewell or a Dasara gathering, and whether it streams one.

Watch effigy burnings from a safe distance. Effigies may be stuffed with firecrackers, so stay behind barriers and leave the lighting to organizers who have permits and safety crews. Do not light fireworks yourself; many places and residence halls restrict them.

Optionally, adapt Ayudha Puja. Some students place their books or laptop before a small picture and offer a flower on Mahanavami or Vijayadashami. This is a modern adaptation, not a documented traditional ritual, so follow your family’s guidance. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract. If you have questions about religious accommodations, ask your residence life office.

Share goodwill. A friendly exchange of sweets or leaves, in the spirit of the Maharashtra custom, is a gentle way to join in.

Call home. A video call with family keeps you part of the celebration.

**Sources:** `vd-brit-dussehra`, `vd-outlook`, `dorm-appstate`, `dorm-uga`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. The firecracker caution rests on Britannica’s statement that effigies are stuffed with firecrackers; “behind barriers” and “do not light fireworks yourself” are common-sense safety advice with no source.
- EDITORIAL (revision 2, owner direction): the books-and-laptop suggestion is presented as an optional modern adaptation of Ayudha Puja (Britannica’s “objects of knowledge”), not as a documented traditional ritual; Ayudha Puja itself belongs to Mahanavami.
- OPTIONAL: no Atlanta-area Dussehra, Ramlila or Durga Puja event or organization has been verified, so none is named.

> **Reviewer note — 💡 EDITORIAL POINT**
> practical suggestions, not cultural claims; no college is named. The firecracker caution rests on Britannica’s statement that effigies are stuffed with firecrackers; “behind barriers” and “do not light fireworks yourself” are common-sense safety advice with no source.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Bengal, Mysuru, Kullu and more

_Tradition: Regional; varies by community_

In West Bengal, Assam and other eastern states Vijayadashami is the last day of Durga Puja. At dawn a mirror ritual, darpan visarjan, marks the goddess’s presence leaving the image. Married women then apply sindoor, vermilion, to the goddess and to one another in sindoor khela, and the images are carried in processions to water and immersed, with sweets offered for the goddess’s journey back to Mount Kailash.

In Mysuru, Dasara is the state festival of Karnataka. It honors the goddess Chamundeshwari’s victory over Mahishasura and ends on Vijayadashami with the Jamboo Savari, a procession from the Palace in which the goddess travels on a golden howdah carried by an elephant. Karnataka Tourism traces the festival to the Vijayanagara rulers and says a Wadiyar king revived it in the early seventeenth century.

In the Kullu valley of Himachal Pradesh, Britannica says that instead of burning effigies of Ravana, local deities are carried in procession at a week-long fair, with Raghunath, a form of Rama, as the presiding deity.

**Sources:** `vd-brit-vijayadashami`, `vd-brit-dussehra`, `vd-mysuru`, `vd-karnataka`

**Research notes (internal, not published):**
- SOURCE NOTE: Bengal is Britannica (Vijayadashami); Mysuru is the official site and Karnataka Tourism (the official site counts eleven days and Karnataka Tourism ten, so no day count is given); Kullu is Britannica (Dussehra) only, since the Incredible India page was read only through a model summary. Revision 2 kept Kullu to one sentence limited to what Britannica says (no bonfire for Lanka, no start day).
- EDITORIAL: the Bengal custom of mixing soil from a brothel threshold into Durga’s clay (Britannica’s “Did You Know”) is omitted as unnecessary for a beginner guide, as in the Navaratri guide.
- OPTIONAL: Kullu’s start on Vijayadashami, Bastar, Delhi Ramlila grounds, Odisha and Gujarat customs are not described: only partial or summary readings exist.

> **Reviewer note — 💡 EDITORIAL POINT**
> the Bengal custom of mixing soil from a brothel threshold into Durga’s clay (Britannica’s “Did You Know”) is omitted as unnecessary for a beginner guide, as in the Navaratri guide.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL | Terms review |
|---|---|---|---|---|
| `vd-brit-dussehra` | Dussehra | Encyclopaedia Britannica | https://www.britannica.com/topic/Dussehra | Done |
| `vd-brit-vijayadashami` | Vijayadashami | Encyclopaedia Britannica | https://www.britannica.com/topic/Vijayadashami | Done |
| `vd-brit-durgapuja` | Durga Puja | Encyclopaedia Britannica | https://www.britannica.com/topic/Durga-Puja | Done |
| `vd-haf` | Dusshera | Hindu American Foundation | https://www.hinduamerican.org/dusshera | Not done |
| `vd-haf-iskcon` | On celebrating Navaratri and Dussehra: through the lens of ISKCON Communications Director, Anuttama Das | Hindu American Foundation (an interview with a leader of ISKCON) | https://www.hinduamerican.org/blog/on-celebrating-navaratri-and-dussehra-through-the-lens-of-iskcon-communications-director-anuttama-das | Not done |
| `vd-brandeis` | Dussehra or Vijaya Dashami (A Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/dussehra.html | Not done |
| `vd-unesco` | Ramlila, the traditional performance of the Ramayana | UNESCO Intangible Cultural Heritage | https://ich.unesco.org/en/RL/ramlila-the-traditional-performance-of-the-ramayana-00110 | Not done |
| `vd-valmiki` | Valmiki Ramayana, Yuddha Kanda, sarga 108 (prose translation by K. M. K. Murthy) | valmikiramayan.net | https://www.valmikiramayan.net/yuddha/sarga108/yuddha_108_prose.htm | Not done |
| `vd-mysuru` | Mysuru Dasara — Official Site | Mysuru Dasara Committee, Government of Karnataka | https://mysoredasara.gov.in/ | Done |
| `vd-karnataka` | Mysuru Dasara: Dates, History & Travel Guide | Department of Tourism, Government of Karnataka | https://karnatakatourism.org/en/experiences/experience-the-mysuru-dasara-festivities-in-karnataka | Done |
| `vd-outlook` | Dussehra: Why Maharashtra Exchanges Apta Leaves As Gold | Outlook Traveller (2026) | https://www.outlooktraveller.com/experiences/heritage/dussehra-2026-why-maharashtra-exchanges-apta-leaves-as-gold | Done |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy | Not done |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ | Not done |

---

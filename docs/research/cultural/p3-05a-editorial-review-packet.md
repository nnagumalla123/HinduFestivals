# P3-05A Editorial review packet: Diwali, Ugadi, Navaratri

**Prepared 2026-11-08. STATUS: nothing here is reviewed, published or visible on the site.** All three guides, their basics and every 2027 date remain `draft` or unverified. This packet is a reading and decision document; no content file has been changed to produce it.

## How to use this packet

1. Read the **Decision summary** and **Cross-guide issues** first (about ten minutes).
2. Then go through each guide. Under every section you will find a **Reviewer note** and a decision row. Tick one box per section (or tell me in chat, for example "Diwali: approve all except Sweets, merge it").
3. Marker key: 🔶 **needs your decision** (a real choice or a fix I want your OK on), 💡 **suggestion** (an optional improvement), ✅ **routine** (I found nothing to change; approve unless you disagree).
4. Reviewer notes only reflect what is in our own research notes and the draft text. I did not re-read the cited sources while preparing this packet, so any "confirm against the source" item is flagged for a check, not assumed.
5. "Research notes" under each section are internal and are never published. Source IDs in backticks map to the Sources table at the end of each guide.

**What happens when you approve:** I will make the text edits you choose, set `reviewed` only on items you approve (with `reviewedAt` and an internal `reviewedBy`), run lint, typecheck and tests, and check a local build to confirm approved items appear, held items stay hidden, and no date or internal note leaks. No commit, push or deploy without your separate approval.

## Decision summary

| Guide | Sections | Routine | Suggestions | Needs your decision |
|---|---|---|---|---|
| Diwali | 13 (incl. quick facts, deities) | 8 | 1 | 4 |
| Ugadi | 10 | 6 | 2 | 2 |
| Navaratri | 12 | 2 | 2 | 8 |

*(Quick facts and deity lists are counted as one item each. Navaratri's count is high because it carries the reorganization, citation and wording checks you asked for.)*

**The items that matter most:**
- Diwali: day-four new-year wording; Sweets section keep/merge; Jain/Sikh opener; away-from-home authenticity.
- Ugadi: quick-fact label; pachadi trim; Chaitra Navaratri wording; away-from-home authenticity.
- Navaratri: autumn-versus-spring clarity; 'skip alcohol and strong spices'; Durga Puja scripture claim; Golu 'Bommai Golu' citation; Garba wording; the reorganization.
- Cross-guide: stale policy sentence; unused source; reviewer name and date.

**Not open for decision (already settled):** all 2027 dates stay unverified and no date appears in any guide; source use is paraphrase plus links with no permission requests; public repo is approved; remaining seven guides wait.

## Cross-guide issues and decisions

| # | Issue | My suggestion | Your decision |
|---|---|---|---|
| 1 | **Source-use approach.** You decided: original paraphrase, attribution and links; no permission requests unless we reproduce protected material. Today nothing reproduces protected content, and Britannica's terms (personal use only; other reproduction needs permission) are satisfied by paraphrase plus a link. | Proceed as decided. Do not seek permission. | ✅ Decided |
| 2 | **Policy document is out of date.** `source-use-policy.md` says "`termsChecked` must be true on every cited source, which the validator enforces." That is no longer true: after the P3-04A refinement, the validator does **not** check `termsChecked` (I confirmed `validate.ts` has no check), and unread terms pages are recorded but do not block. | Fix that one sentence in the policy when you approve edits. | ☐ Approve fix |
| 3 | **Which Navaratri.** See the Navaratri "Why celebrate" decision. Ugadi's guide mentions Chaitra Navaratri; the Navaratri guide never says it is the autumn one. | Add one clarifying sentence in Navaratri, once I confirm Britannica's wording. | ☐ Yes ☐ No |
| 4 | **Unused source still listed.** `navaratri-rkt-temple` (Radha Krishna Temple blog) is in the Navaratri sources list but no section cites it. | Remove it from the data; unused sources add clutter and keep a source we judged unreliable on file. | ☐ Remove ☐ Keep |
| 5 | **Atlanta relevance.** Georgia Tech and Emory housing policies were only partly or not read, and the audience is Atlanta-based. The guides name no college and tell students to check their own housing rules. | Acceptable as is for publication. Optional later: finish reading those two. | ☐ Accept ☐ Do the reading first |
| 6 | **Review metadata.** Reviewing requires `reviewedAt` (a date, shown publicly) and `reviewedBy` (internal only, never shown). | Tell me the `reviewedBy` value to record and the review date when you approve. | ☐ Provide |
| 7 | **Public repo.** Approved as is. | No action. | ✅ Decided |

## Proposed basics (all three guides)

"Basics" are the short descriptors used on Explore cards, the home page and search. They are hidden until you approve them; the other seven festivals keep name-only basics. Review each row.

| Festival | Subtitle | Aliases | Deity search terms | Notes / my comment | Decision |
|---|---|---|---|---|---|
| Diwali | The festival of lights | Deepavali | Lakshmi, Rama, Krishna, Kali | Every deity term is also an attributed entry in the guide. Subtitle is neutral and widely used. | ☐ Approve ☐ Edit |
| Ugadi | The new year for many Telugu and Kannada families | Yugadi | Brahma | Gudi Padwa is deliberately not an alias (separate Maharashtra/Goa festival; the guide explains the link). Subtitle is long for a card; shorter option: "A new year for Telugu and Kannada families". | ☐ Approve ☐ Use shorter ☐ Edit |
| Navaratri | Nine nights honoring the goddess | Navratri | Durga, Lakshmi, Saraswati | Deity terms reflect the three-phase scheme; the guide also says other traditions honor nine forms of Durga. | ☐ Approve ☐ Edit |

**Why 'Brahma' as an Ugadi search term:** Brahma is in the guide only as a traditional belief; a person searching "Brahma" will find Ugadi and read the attribution. Fine, but you may prefer to drop it so search never implies more than the guide.  ☐ Keep ☐ Drop

## Proposed reorganization of the Navaratri guide (for your decision)

Today the guide has these sections: Why celebrate; Durga and Mahishasura; Nine nights, three phases; Fasting; What is on the table; Joining in; Celebrating away from home; Durga Puja; Garba; Golu. Proposed result (two fewer sections, same facts, nothing invented):

1. Why celebrate Navaratri? *(plus the autumn-versus-spring sentence, pending source check)*
2. Durga and Mahishasura
3. Nine nights, three phases *(plus the closing 'no single right way' sentence)*
4. **Fasting and food** *(merges 'What is on the table')*
5. Celebrating Navaratri away from home *(gains the 'pick one thread' intro, replaces 'Joining in')*
6. Durga Puja in Bengal and eastern India
7. Garba and dandiya in Gujarat
8. Golu in South India

**Proposed text, Nine nights, three phases: add at the end of the last paragraph:**
> There is no single right way to do Navaratri: some people follow three goddesses, others nine forms of Durga, and some visit a temple, dance garba or set up a Golu.

**Proposed text, Fasting and food** (replaces the two sections; the alcohol-and-spices phrase is cut pending a source):
> Fasting is part of Navaratri for many people, but it is optional and takes many forms. Many devotees eat simple vegetarian (sattvic) meals, and some keep a daytime fast. In parts of North India many people fast. Many other families celebrate without fasting at all, and what any family does is shaped by its own tradition.
>
> Food is part of the worship as well. At home, many devotees offer bhog, food prepared for the goddess, to her image. At Kanya Puja, the girls are traditionally served puri, semolina halva and black chickpeas.

**Proposed intro, Celebrating Navaratri away from home** (replaces 'Joining in' and the current first line):
> Navaratri travels well, because so much of it is community and so much is up to you. A good way to start is to pick the thread that feels closest to your family, whether that is garba, a mini Golu or a small puja, and follow it for a night or two.

☐ Approve reorganization ☐ Approve in part (notes: ) ☐ Keep current structure

---


# Diwali

## Quick facts (draft)

- **Meaning:** “Row of lights” (from the Sanskrit dipavali), widely understood as light over darkness.  
  Sources: diwali-britannica, diwali-princeton
- **Length of observance:** Often described as five days. Lakshmi Puja, on the new-moon night, is a central observance for many communities. Counts and customs vary by region and family.  
  Sources: diwali-britannica, diwali-haf
- **Associated deities:** Lakshmi (widely); Rama (northern India); Krishna (southern India and Govardhan Puja); Kali (Bengal). _(Varies by region)_  
  Sources: diwali-britannica, diwali-birmingham-kali
- **Common customs:** Lighting diyas, drawing rangoli, praying to Lakshmi, wearing new clothes, visiting family and friends, exchanging gifts, sharing sweets, and giving to those in need.  
  Sources: diwali-britannica, diwali-princeton, diwali-haf


> **Reviewer note — ✅ ROUTINE**
> Four facts, all hedged ('often', 'many', 'varies'). Nothing needs changing.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (draft)

- **Lakshmi** (Widespread across Hindu traditions): Goddess of good fortune and wealth. Lamps are lit and doors left open to welcome her, and Lakshmi Puja is a central evening for many families.  
  Sources: diwali-britannica, diwali-princeton
- **Rama** (Northern India): Hero of the Ramayana. His homecoming to Ayodhya is the best-known Diwali story in northern India.  
  Sources: diwali-britannica, diwali-brandeis
- **Krishna** (Southern India; Vaishnava traditions): Remembered for defeating the demon Narakasura (a southern Diwali story) and for lifting Govardhana Hill (Govardhan Puja).  
  Sources: diwali-britannica, diwali-bhagavata-naraka, diwali-bhagavata-govardhana
- **Kali** (Bengal): The goddess worshipped at this time in Bengal.  
  Sources: diwali-britannica, diwali-birmingham-kali


> **Reviewer note — 💡 SUGGESTION**
> Kali's entry is thin ('the goddess worshipped at this time in Bengal'). That is honest given the sources (Britannica plus one student blog). Keep, or drop the Kali entry and let the Many Diwalis section carry it?
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Diwali?

Diwali, or Deepavali, means “row of lights,” and that is the whole spirit of it: a small flame held up against the dark. Homes get cleaned and decorated, diyas glow in windows and doorways, sweets get passed around, and many families welcome Lakshmi, the goddess of good fortune, into their homes.

Why people celebrate depends on the family. In much of northern India it is Rama’s homecoming to Ayodhya. In the south it is Krishna’s victory over the demon Narakasura. For many it is simply Lakshmi’s blessing on the year ahead. Jain and Sikh communities mark these days with their own meanings, too. The stories change from home to home, but the feeling does not: light beats darkness, and the year ahead feels full of possibility.

**Sources:** `diwali-britannica`, `diwali-princeton`, `diwali-brandeis`

**Research notes (internal, not published):**
- SOURCE NOTE: core summary rests on Britannica plus Princeton and Brandeis, which largely echo the general account (not independent confirmation).


> **Reviewer note — ✅ ROUTINE**
> Opening summary. Hedged well; ends on feeling rather than a universal claim.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### Rama comes home to Ayodhya

_Tradition: Northern India (told widely elsewhere)_

In much of northern India, Diwali is the night Rama came home. After fourteen years of exile and the defeat of the demon king Ravana, Rama returned to Ayodhya with Sita, Lakshmana and Hanuman, and the tradition says the whole city lit lamps to welcome them. Families echo that welcome every year with rows of diyas.

Dussehra, earlier in the autumn, celebrates the victory over Ravana. Diwali is the homecoming.

**Sources:** `diwali-britannica`, `diwali-britannica-difference`, `diwali-britannica-diya`, `diwali-valmiki`

**Research notes (internal, not published):**
- SOURCE NOTE: the Valmiki chapters on the return (sargas 127 and 128 in the Murthy prose translation, valmikiramayan.net) describe flags, flowers, scented water, a procession and a coronation, and no festival of lights. The lamp-lit homecoming is a tradition ('said to' in Britannica; stated without hedging by Princeton, Brandeis and HAF). Public text therefore says 'the tradition says' and does not cite Valmiki.
- OPTIONAL: check a critical edition and other recensions (sarga numbering differs).
- OPTIONAL: HAF also says Sita is an incarnation of Lakshmi; not used (single source, not in the chapters read).


> **Reviewer note — ✅ ROUTINE**
> Says 'the tradition says', and the Valmiki text is deliberately not cited because it describes no lamps. This is the honest handling of religious narrative versus text. Keep.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Krishna and the demon Narakasura

_Tradition: Southern India; Vaishnava tradition_

In many parts of southern India, the hero of Diwali is Krishna. The demon Narakasura had seized treasures from the gods and held many people captive, until Krishna, with his wife Satyabhama, defeated him and set the captives free. The victory is remembered on the day before the main Lakshmi Puja, and many families pray for their ancestors that day.

**Sources:** `diwali-britannica`, `diwali-princeton`, `diwali-bhagavata-naraka`

**Research notes (internal, not published):**
- SOURCE NOTE: the Bhagavata Purana chapter (10.59, Bhaktivedanta Book Trust translation) tells the story without mentioning lamps or a festival; the link to the day is traditional (Britannica, Princeton, HAF).
- OPTIONAL: Britannica notes some scholars link this day to an older custom of lighting lamps for Yama; left out of public text (single source).


> **Reviewer note — ✅ ROUTINE**
> Same pattern: tradition links the story to the day; the Purana itself does not. The public text does not claim the Purana says so.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Lakshmi finds her way in

_Tradition: Widespread; stories vary by community_

For many families, Diwali is Lakshmi’s night. She is the goddess of fortune and prosperity, and homes are lit up and left open to welcome her. Communities tell different stories about why: some say the festival celebrates her birth, others her marriage to Vishnu.

**Sources:** `diwali-britannica`, `diwali-princeton`, `diwali-bhagavata-lakshmi`

**Research notes (internal, not published):**
- OPTIONAL: Britannica also describes a Purana in which women, at midnight on the new-moon night, drive out misfortune and welcome Lakshmi. Removed from public text because no second source was found (owner direction).
- SOURCE NOTE: Bhagavata Purana 8.8 tells of Lakshmi rising from the churning of the ocean and choosing Vishnu but makes no Diwali link; the link is traditional. Not stated publicly.


> **Reviewer note — ✅ ROUTINE**
> Offers birth versus marriage as community variants. Fine.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Krishna lifts Govardhana Hill

_Tradition: Vaishnava traditions; the fourth day_

On the fourth day, many families remember Krishna lifting Govardhana Hill. When a furious storm sent by the god Indra threatened the cowherds of Vraja, Krishna held the hill up with one hand so that everyone could shelter beneath it for seven days. The day is also called Annakut and Bali Pratipada.

**Sources:** `diwali-britannica`, `diwali-bhagavata-govardhana`

**Research notes (internal, not published):**
- SOURCE NOTE: the Bhagavata chapters (10.24 and 10.25) do not mention lamps, Annakut or a festival; the link to the day is traditional.
- OPTIONAL: no source read tells the Bali (Vamana) story as part of Diwali, so it is left out; no source explains the word 'Annakut'.


> **Reviewer note — ✅ ROUTINE**
> Fine. The Bali/Vamana story is left out because no source ties it to Diwali.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### Diwali, day by day

Most people describe Diwali as five days, though the count and the customs on each day vary by region and family. Here is the common outline.

Day one, Dhanteras: a day for cleaning the house and buying something small and auspicious, like a little gold. Lakshmi is honored.

Day two, Naraka Chaturdashi (also called Choti Diwali): it remembers Krishna’s victory over Narakasura, and many families pray for their ancestors.

Day three, Lakshmi Puja: for many communities, the heart of the festival. On the new-moon night, families pray to Lakshmi, light lamps and candles, and visit temples.

Day four, Govardhan Puja: it recalls Krishna and the hill. In the Vikrama calendar it is also the first day of the new year, and merchants traditionally open fresh account books.

Day five, Bhai Dooj: a day to celebrate siblings, when sisters pray for their brothers’ well-being.

**Sources:** `diwali-britannica`, `diwali-haf`

**Research notes (internal, not published):**
- SOURCE NOTE: day names and order follow Britannica; HAF's list adds a sixth day (Govatsa Dvadashi) at the start. Other regional counts are not sourced.
- EDITORIAL: owner asked that Lakshmi Puja not be presented as a universally designated main day; wording is 'for many communities'.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Consistency fix suggested.** Day four says 'In the Vikrama calendar it is also the first day of the new year.' The Many Diwalis section says only *some regions, such as Gujarat* start the year at Diwali. Suggested day-four wording: 'In some regions, following the Vikrama calendar, it is also the first day of the new year.' Also confirm you are comfortable with 'for many communities, the heart of the festival' for Lakshmi Puja (your earlier direction was to avoid a universal main day; the wording already hedges).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Sweets and sharing

Sharing sweets and festive meals with family and friends is a big part of the celebration.

**Sources:** `diwali-britannica`, `diwali-princeton`, `diwali-brandeis`

**Research notes (internal, not published):**
- EDITORIAL: deliberately minimal. No reputable source read names dishes, regional foods or fasting for Diwali; none are invented. No vegetarian claim is made.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Decision: keep, merge or expand.** One sentence only; no source names dishes. Options: (a) keep as a tiny section so the Food and fasting heading appears on every guide, (b) merge the sentence into 'The customs behind the glow' (which already says 'share meals') and drop the Food section for Diwali, (c) expand later when a reputable source is found. I recommend (b): a one-sentence section looks unfinished.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### The customs behind the glow

Diyas. These small clay or metal oil lamps line windowsills, doorways and temple steps, and some are floated on rivers. Lighting one is traditionally understood as a way to push back ignorance and welcome knowledge, purity and blessings.

Rangoli. Patterns made of colored rice, sand or flower petals decorate floors and doorways, a bright welcome for guests and good fortune.

Open doors. Doors and windows are left open so Lakshmi can find her way in.

New clothes and togetherness. Families dress up, visit one another, exchange gifts and share meals. Giving is part of the spirit too, from feeding people in need to quiet acts of charity.

Fireworks. Fireworks are part of the festivities in many places, though practices vary by community and region, and in some places they are limited or avoided. If you take part, public displays and local safety rules are the best guide.

**Sources:** `diwali-britannica`, `diwali-britannica-diya`, `diwali-princeton`, `diwali-haf`

**Research notes (internal, not published):**
- EDITORIAL: card games are intentionally omitted (owner decision). Fireworks wording is neutral and acknowledges that practices vary, with a simple safety pointer and no instructions (owner direction). Basis: Britannica notes displays are now restricted in some places for noise and pollution.
- OPTIONAL: Britannica's reading of the oil and wick as human flaws and the soul is left out.


> **Reviewer note — ✅ ROUTINE**
> Fireworks wording is neutral with a public-display pointer and no instructions, as you directed. Card games omitted, as you decided.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Celebrating Diwali away from home

You can have a real Diwali in a small room with a few smart choices.

Check your housing rules first. Many U.S. residence halls ban open flames, which can include candles, oil lamps and incense, and some limit decorations like string lights too. Read your housing contract or ask your residence life office before you light or hang anything. Some schools have a process for requesting an exception for religious observance, so ask rather than assume.

Get the glow without the flame. If your housing allows them, battery-powered LED diyas or tea lights give you the same warm light. Keep cords tidy, don’t chain extension cords together, and never cover a light with paper or cloth.

Make a rangoli on paper or poster board for your door or desk. It is a mess-free way to welcome guests.

Find your people. Look for a Hindu or Indian student association, a campus Diwali event or a nearby temple celebration. Or invite friends over, share sweets from an Indian grocery and tell them your family’s story. If you cook, check the rules and use a shared kitchen when you can.

Join the puja from afar. Video call your family at Lakshmi Puja time so you are part of it.

Give something back. Giving is part of Diwali, so consider volunteering or donating.

If fireworks are part of your family’s celebration, a public display is the simplest, safest way to enjoy them.

**Sources:** `dorm-appstate`, `dorm-dartmouth`, `dorm-louisville`, `dorm-uga`, `diwali-bath-reslife`, `diwali-haf`

**Research notes (internal, not published):**
- EDITORIAL: practical guidance, not cultural claims; no college is named. The pattern claims come from five US policies read (App State, Dartmouth, Louisville, UGA and a partly read Georgia Tech).
- OPTIONAL: Georgia Tech section XIII and Emory still need a browser read.
- EDITORIAL: rangoli-on-paper, video-call and volunteering ideas are editorial suggestions, partly from the Bath (UK) page; confirm they feel authentic.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Authenticity and sourcing check (your requested focus).** Sourced from five US housing policies (patterns only, no college named) and one UK page. Points to confirm against your own experience: (1) 'Some schools have a process for requesting an exception for religious observance' is a general pattern, so confirm you are comfortable stating it; (2) rangoli on paper, video call at puja time and volunteering are editorial ideas, not cultural claims; (3) the family-story, grocery-sweets and shared-kitchen advice is practical. **Suggestions:** the heading line 'You can have a real Diwali in a small room' is nice but slightly strong; consider 'You can celebrate meaningfully in a small room'. The Georgia Tech and Emory policies (the audience for an Atlanta site) were only partly read or not read; the guide already tells students to check their own housing rules, so this is optional, but a short note naming no college and a pointer to 'your residence life office' is already there. If any bullet feels inauthentic to you, say which and I will cut or reword it.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Many Diwalis across India

_Tradition: Regional; varies by community_

There is no single Diwali, and the story you grew up with probably depends on your region and family. In Bengal, the festival is closely tied to the worship of the goddess Kali. In some regions, such as Gujarat, Diwali opens the new year in the Vikrama calendar, while other communities begin their year at other times, so it is not the Hindu new year for everyone.

**Sources:** `diwali-britannica`, `diwali-haf`, `diwali-malaiya`, `diwali-birmingham-kali`

**Research notes (internal, not published):**
- SOURCE NOTE: Kali in Bengal: Britannica plus a University of Birmingham student blog by a Bengali community member (see the Kali deity entry).
- SOURCE NOTE: HAF says 'some regions' mark Diwali as the new year without naming them; Britannica ties it to the Vikrama calendar; the Malaiya page says the Vikrama year begins at Diwali in Gujarat (the region named in the public text).


> **Reviewer note — ✅ ROUTINE**
> Kali in Bengal rests on Britannica plus one Bengali student's blog (informal). Public text states it as 'closely tied', which is supported. Gujarat new-year claim rests on a Jain scholar's page.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Jain and Sikh meanings

_Tradition: Jain; Sikh_

Diwali is not only a Hindu festival, and other communities light lamps for their own reasons.

For Jains, Diwali remembers the night Mahavira, the last of the Tirthankaras, attained nirvana. Jain tradition recalls kings lighting lamps that night, since the light of his wisdom had left the world.

For Sikhs, these days are Bandi Chhor Divas, the “Day of Liberation.” It remembers Guru Hargobind’s release from imprisonment in Gwalior Fort. The tradition says he would not leave unless the 52 princes held with him were freed too, and when he returned to Amritsar the Golden Temple was lit in celebration. Today Sikhs gather at gurdwaras for prayer and langar, the community meal.

Each of these traditions tells its own story in its own terms.

**Sources:** `diwali-britannica`, `diwali-princeton`, `diwali-brandeis`, `diwali-malaiya`, `diwali-sikhnet`

**Research notes (internal, not published):**
- SOURCE NOTE: Jain paragraph verified against a Jain scholar's page (Malaiya, Colorado State University), which cites an early Jain text for the kings' lamps, plus Britannica, Princeton and Brandeis. Sikh paragraph verified against SikhNet (Bandi Chhor Divas) plus Britannica and Brandeis. The Sikh release year differs across sources and is omitted.
- EDITORIAL: the Newar Buddhist sentence was removed (owner direction): searches found only Wikipedia, news and blog pages, no reputable Newar Buddhist-specific source (candidate scholarship, not read: Robert Levy, Mesocosm, 1990; Bal Gopal Shrestha on the Svanti festival, 2006). Britannica and Princeton disagree on the details, so none are used. Restore only with a verified source.
- OPTIONAL: SikhNet describes today's observance with gurdwara gatherings and langar; fireworks and candles mentioned there are left out.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Wording suggestion.** The opener 'Diwali is not only a Hindu festival' is a little awkward: for Sikhs these days are a distinct observance (Bandi Chhor Divas) and for Jains a distinct remembrance, not 'Diwali' as such. Suggested opener: 'Hindus are not the only ones who light lamps at this time of year, and other communities have their own meanings.' The closing line 'Each of these traditions tells its own story in its own terms' stays. Newar Buddhist sentence stays out, per your decision.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL |
|---|---|---|---|
| `diwali-britannica` | Diwali (The Festival of Lights) | Encyclopaedia Britannica | https://www.britannica.com/story/the-festival-of-lights |
| `diwali-britannica-difference` | What is the difference between Diwali and Dussehra? | Encyclopaedia Britannica | https://www.britannica.com/question/What-is-the-difference-between-Diwali-and-Dussehra |
| `diwali-britannica-diya` | Diya | Encyclopaedia Britannica | https://www.britannica.com/technology/diya |
| `diwali-princeton` | About Diwali | Princeton University (Diwali at Princeton) | https://diwali.princeton.edu/about/about-diwali |
| `diwali-brandeis` | Diwali (Guide to Religious Observances) | Brandeis University, Center for Spiritual Life | https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/diwali.html |
| `diwali-haf` | HAF's Diwali Resources and Toolkit | Hindu American Foundation | https://www.hinduamerican.org/diwali-toolkit |
| `diwali-valmiki` | Valmiki Ramayana, Yuddha Kanda sargas 127 and 128 (prose translation by K. M. K. Murthy) | valmikiramayan.net | https://www.valmikiramayan.net/yuddha/sarga127/yuddha_127_prose.htm |
| `diwali-bhagavata-naraka` | Bhagavata Purana 10.59, The Killing of the Demon Naraka (Bhaktivedanta Book Trust translation) | Bhaktivedanta Book Trust (vedabase.io) | https://vedabase.io/en/library/sb/10/59/ |
| `diwali-bhagavata-govardhana` | Bhagavata Purana 10.24 and 10.25, Govardhana Hill (Bhaktivedanta Book Trust translation) | Bhaktivedanta Book Trust (vedabase.io) | https://vedabase.io/en/library/sb/10/25/ |
| `diwali-bhagavata-lakshmi` | Bhagavata Purana 8.8, The Churning of the Milk Ocean (Bhaktivedanta Book Trust translation) | Bhaktivedanta Book Trust (vedabase.io) | https://vedabase.io/en/library/sb/8/8/ |
| `diwali-malaiya` | Lord Mahavira's Nirvana: Diwali | Yashwant K. Malaiya (Colorado State University faculty web page on Jain festivals) | https://www.cs.colostate.edu/~malaiya/diwali.html |
| `diwali-sikhnet` | Bandi Chhor Divas | SikhNet | https://sikhnet.com/news/bandi-chhor-divas-0 |
| `diwali-birmingham-kali` | Blog: Kali Puja, the Bengali way of celebrating Diwali | University of Birmingham (UK), student news blog by a PhD student from West Bengal | https://intranet.birmingham.ac.uk/student/news/public/2025/oct-dec25/blog-kali-puja-the-bengali-way-of-celebrating-diwali.aspx |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy |
| `dorm-dartmouth` | Open Flame in Residence Halls | Dartmouth College | https://campus-services.dartmouth.edu/policy/open-flame-residence-halls |
| `dorm-louisville` | Residence Hall Safety | University of Louisville Public Safety | https://safety.louisville.edu/fire-safety/housing/residence-hall |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ |
| `diwali-bath-reslife` | Finding light away from home | University of Bath (UK), Residence Life | https://reslife.bath.ac.uk/story/20977853/finding-light-away-from-home |

---

# Ugadi

## Quick facts (draft)

- **Meaning:** “The beginning of an age” (yuga plus adi). The new year for many Telugu and Kannada communities. _(Telugu and Kannada)_  
  Sources: ugadi-britannica, ugadi-sahms
- **Length of observance:** One day, on the first day of the lunar month of Chaitra, at the start of spring.  
  Sources: ugadi-britannica, ugadi-htcs-temple
- **Associated deities:** Brahma, in a traditional belief that the day marks the beginning of creation. _(Traditional belief)_  
  Sources: ugadi-britannica, ugadi-sahms
- **Common customs:** An oil bath and new clothes, mango-leaf doorway decorations, muggu (rangoli), temple visits, listening to the year’s almanac (Panchanga Sravanam), and tasting ugadi pachadi.  
  Sources: ugadi-britannica, ugadi-telangana-today, ugadi-hans-india
- **Dietary practices:** Ugadi pachadi (Telugu) and bevu-bella (Kannada), mixes of sweet and bitter and other tastes whose ingredients vary by family and community. _(Telugu and Kannada)_  
  Sources: ugadi-britannica, ugadi-hans-india, ugadi-htcs-temple, ugadi-karnataka-tourism


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Label suggestion.** The fifth fact is labelled 'Dietary practices' but only describes pachadi and bevu-bella, which could read as dietary rules. Suggest renaming to 'Signature dish'. (The label list is a fixed set in the data model; I will check that a new label is allowed before changing it.)
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (draft)

- **Brahma** (Traditional belief, as Britannica (some Hindu texts) and community sources describe it): The creator god. A traditional belief links Ugadi to the day he began creating the universe.  
  Sources: ugadi-britannica, ugadi-sahms


> **Reviewer note — ✅ ROUTINE**
> Single entry, labelled a traditional belief with attribution, no named text. Matches your earlier decision.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Ugadi?

Ugadi is the new year for many Telugu and Kannada families, and it arrives with spring, on the first day of the lunar month of Chaitra. The name joins yuga (an age) and adi (a beginning), so it means “the beginning of an age.”

The day starts with an oil bath and new clothes. Fresh mango leaves hang over the door, a muggu (rangoli) greets guests, and families head to the temple, listen to the year’s almanac and taste ugadi pachadi, a blend of sweet, bitter, sour and more that stands for everything a year can hold. The idea is to take the sweet and the bitter together. In Maharashtra and Goa, the same day is called Gudi Padwa.

**Sources:** `ugadi-britannica`, `ugadi-telangana-today`, `ugadi-hans-india`, `ugadi-htcs-temple`

**Research notes (internal, not published):**
- SOURCE NOTE: core summary rests on Britannica plus two Telugu newspapers and a US temple page (separate publishers).
- SOURCE NOTE: 'take the sweet and the bitter together' paraphrases The Hans India's reading of the pachadi.


> **Reviewer note — ✅ ROUTINE**
> Good summary; Gudi Padwa is mentioned but not conflated.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### A new year in spring

_Tradition: Telugu and Kannada communities_

Ugadi falls on the first day of Chaitra in the lunar calendar followed in Telugu- and Kannada-speaking regions, where each month ends on the new moon. That makes it the first day of the waxing moon, which is said to symbolize growth.

It is a seasonal turning point too, the start of spring and the planting season. In the Telugu calendar, years run in a cycle of sixty, and every year has its own name, so each Ugadi comes with a new name to learn.

Many families also see the day as a good moment for a fresh start.

**Sources:** `ugadi-britannica`, `ugadi-telangana-today`, `ugadi-hans-india`, `ugadi-eb1911`, `ugadi-htci-temple`, `ugadi-htcs-temple`, `ugadi-karnataka-tourism`

**Research notes (internal, not published):**
- SOURCE NOTE: the sixty-year cycle of named years is now supported by Telangana Today (Telugu context), The Hans India (year names in use) and the 1911 Britannica entry on Hindu chronology (a sixty-year Jupiter cycle with special names such as Prabhava). The mechanism and the count differ between north and south India, so the public text says only that years run in a cycle of sixty with their own names.
- SOURCE NOTE: spring and the planting season are from Britannica. 'A fresh start' is supported by two US temple pages (HTCI, Sri Venkateswara Temple) and Karnataka Tourism. The Hans India's neem-blossom, farmers-awaiting-showers and housewarming details were removed (single source).
- OPTIONAL: the popular Narada legend of the sixty names is left out (single newspaper source; needs a Purana check).


> **Reviewer note — ✅ ROUTINE**
> Sixty-year cycle is stated simply without the north/south mechanism disputes. 'Said to symbolize growth' is hedged.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### Brahma and the beginning of time

_Tradition: Traditional belief_

Many people link Ugadi to the very first morning of creation. According to a traditional belief, this is the day the god Brahma began creating the universe, which fits a festival whose name means “the beginning of an age.”

**Sources:** `ugadi-britannica`, `ugadi-sahms`, `ugadi-karnataka-tourism`

**Research notes (internal, not published):**
- EDITORIAL: owner decision: traditional belief with attribution; the historical-record disclaimer was removed from the public text (owner direction) and no specific text is named. Supported by Britannica ('some Hindu texts'), Karnataka Tourism ('many Hindus believe') and SAHMS.
- SOURCE NOTE: Britannica says 'according to some Hindu texts'; a popular magazine cites the Brahma Purana without a passage. OPTIONAL: Kane, History of Dharmasastra (candidate, unverified).


> **Reviewer note — ✅ ROUTINE**
> Traditional belief, attributed, no text named. Matches your decision.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### How the day unfolds

_Tradition: Telugu and Kannada households_

Fresh start. Homes are cleaned, and the morning begins with a traditional oil bath and new clothes.

Mango leaves and muggu. Strings of mango leaves (toranalu) hang over doors, and muggu, also called rangoli or kolam, is drawn at the entrance.

Temple and prayer. Many families visit a temple and offer prayers.

The year’s almanac. Families often hear the panchangam, the traditional almanac, read aloud at a temple or by a respected elder. This is Panchanga Sravanam, and it includes the year’s forecasts, such as weather, harvests and general fortune.

**Sources:** `ugadi-britannica`, `ugadi-telangana-today`, `ugadi-hans-india`, `ugadi-htcs-temple`, `ugadi-htci-temple`, `ugadi-karnataka-tourism`

**Research notes (internal, not published):**
- EDITORIAL: temple-ceremony specifics (Tirumala's Ugadi Asthanam, US temples reading in two languages) were removed as non-essential (owner direction). Source IDs ugadi-deccan-chronicle and the US temple pages are kept for the claims they still support.
- SOURCE NOTE: the forecast areas (weather, harvests, general fortune) draw on Karnataka Tourism, The Hans India and a temple page; Britannica says only that people hear the almanac recited.


> **Reviewer note — ✅ ROUTINE**
> The forecast areas (weather, harvests, fortune) come from three sources combined; Britannica only says the almanac is recited. Fine as written.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Ugadi pachadi: the taste of a year (Telugu)

_Tradition: Telugu_

Ugadi pachadi is the dish most closely tied to the day, and in many Telugu homes it is the first thing eaten. It blends several tastes, and the usual lineup is jaggery (sweet), raw mango (tangy), tamarind (sour), neem flowers (bitter), chili (spicy) and salt. Families make it their own way, though. One temple’s version includes honey and sugar.

The idea is that a year holds all kinds of experiences, and you taste them together. In one popular reading, jaggery stands for joy, neem for hardship, raw mango for surprise, tamarind for disappointment, chili for anger or passion, and salt for balance. Other families read the tastes a little differently. There is also a playful belief that if you get more neem in your bite your year will be bitter, and if you get more jaggery it will be sweet.

**Sources:** `ugadi-britannica`, `ugadi-telangana-today`, `ugadi-hans-india`, `ugadi-htcs-temple`, `ugadi-deccan-chronicle`

**Research notes (internal, not published):**
- SOURCE NOTE: ingredient lists and taste meanings differ across Britannica, Telangana Today, The Hans India, a US temple page and Deccan Chronicle (which lists six flavors without ingredients); the public text says families vary.
- OPTIONAL: whether the dish is attested in older sources is unverified (candidate: Achaya, Indian Food: A Historical Companion). No fasting information was found, so no fasting section is drafted.


> **Reviewer note — 💡 SUGGESTION**
> **Suggestion:** drop the sentence 'One temple's version includes honey and sugar.' It is a one-source detail that adds little and slightly undercuts the point that families vary (which the sentence before already makes). Everything else is hedged ('one popular reading', 'other families read the tastes differently').
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Bevu-bella in Karnataka (Kannada)

_Tradition: Kannada_

In Karnataka, the signature custom is bevu-bella, “neem and jaggery.” Neem flowers stand for the bitter and jaggery for the sweet, and families eat the mixture early in the day as a reminder that life holds both joy and hardship. Ugadi pachadi, the fuller multi-flavored mix, is especially popular in Andhra Pradesh and Telangana, though many Karnataka homes make it too, and some families use the name bevu-bella for that fuller mix as well.

**Sources:** `ugadi-karnataka-tourism`, `ugadi-britannica`, `ugadi-hans-india`

**Research notes (internal, not published):**
- SOURCE NOTE: resolved with a Kannada-region source. Karnataka Tourism (Government of Karnataka) describes bevu-bella as a simple neem-and-jaggery mixture and says ugadi pachadi is more popular in Andhra Pradesh and Telangana but also made in many Karnataka households; The Hans India agrees (jaggery-and-neem version more popular with Kannadigas). Britannica uses 'bevu-bella' as the Karnataka name for ugadi pachadi itself, so the public text acknowledges both usages.
- OPTIONAL: a Kannada temple source would add further confirmation.


> **Reviewer note — ✅ ROUTINE**
> Handles the naming difference (Britannica uses bevu-bella for the fuller mix; Karnataka Tourism says it is simpler) honestly. Keep.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Celebrating Ugadi away from home

Ugadi can slip by on a busy weekday, so give it a little plan.

Find your people. Look for a Telugu or Kannada student association, or ask whether a nearby temple has a program. If you do not have a community nearby, invite friends over and tell them what Ugadi means to your family.

Make a small pachadi. There is no single recipe, so a simple version in the spirit of the dish is fine. Ask a family member or a local Indian grocery what is available, since neem flowers can be hard to find. Cooking in dorm rooms is often restricted, so use a shared kitchen if your housing allows.

Decorate the doorway. Draw a muggu on paper or poster board for your door or desk. If fresh mango leaves are hard to find, a paper or cloth toran does the job.

Start something new. Pick one small goal for the year.

Call home. Ask a relative to read out the year’s panchangam, or just call and hear how everyone is celebrating.

If you want to light a lamp or incense, check your housing rules first. Many residence halls ban open flames, and a battery-powered lamp is a safer choice.

**Sources:** `dorm-appstate`, `dorm-uga`, `ugadi-hans-india`, `ugadi-htcs-temple`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. Mango-leaf and neem-flower availability is common knowledge, not sourced.
- OPTIONAL: no Atlanta-area Telugu or Kannada organization has been verified, so none is named.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Authenticity check.** Suggestions are practical: find a student association, make a small pachadi, paper muggu and toran, one new goal, call home for the panchangam. Please confirm 'Start something new. Pick one small goal for the year.' feels like Ugadi to you (it is editorial, tied to the fresh-start theme). Neem flowers 'can be hard to find' is common knowledge, unsourced. No Atlanta-area organization is named.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Ugadi, Gudi Padwa and Chaitra Navaratri

_Tradition: Telugu, Kannada, Marathi and Konkani communities_

In Maharashtra and Goa, Marathi and Konkani communities celebrate the same day as Gudi Padwa. Their signature custom is the gudi: a cloth tied to a tall stick, topped with an upturned pot, neem and mango leaves and flowers, raised outside the home as a sign of victory and good fortune.

Elsewhere in India, the same lunar day begins Chaitra Navaratri, a spring version of Navaratri whose ninth day is Rama Navami. Because communities begin their year at different times, Ugadi is the new year for Telugu and Kannada families, not for every Hindu.

**Sources:** `ugadi-britannica`, `ugadi-htci-temple`, `ugadi-hans-india`

**Research notes (internal, not published):**
- OPTIONAL: no cultural source read covers Tamil Puthandu, Vishu or Baisakhi, so they are not mentioned.
- SOURCE NOTE: the flag's 'victory' meaning is Britannica's; a popular magazine adds a Maratha link, omitted (single source).


> **Reviewer note — 💡 SUGGESTION**
> **Wording suggestion.** 'Elsewhere in India, the same lunar day begins Chaitra Navaratri' wrongly implies Telugu and Kannada regions are excluded. Suggest: 'Across India, the same lunar day also begins Chaitra Navaratri...'. The final sentence (Ugadi is the new year for Telugu and Kannada families, not every Hindu) stays. This section is also where Ugadi touches Navaratri; see cross-guide issue 3.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL |
|---|---|---|---|
| `ugadi-britannica` | Ugadi | Encyclopaedia Britannica | https://www.britannica.com/topic/Ugadi |
| `ugadi-telangana-today` | Ugadi: The beginning of a new year and a new hope | Telangana Today (newspaper, Hyderabad; essay by Pratyusha Sista, March 2025) | https://telanganatoday.com/ugadi-the-beginning-of-a-new-year-and-a-new-hope |
| `ugadi-hans-india` | Significance of Ugadi 2021 | The Hans India (newspaper, Hyderabad) | https://www.thehansindia.com/life-style/spiritual/significance-of-ugadi-2021-681493 |
| `ugadi-deccan-chronicle` | Ugadi celebrated with religious fervour at Tirumala and Tirupati temples | Deccan Chronicle (newspaper), March 2025 | https://www.deccanchronicle.com/southern-states/andhra-pradesh/ugadi-celebrated-with-religious-fervour-at-tirumala-and-tirupati-temples-1869869 |
| `ugadi-htcs-temple` | Ugadi (Sri Venkateswara Temple) | Sri Venkateswara (Balaji) Temple, htcsusa.org (US temple) | https://htcsusa.org/ugadi/ |
| `ugadi-htci-temple` | Ugadi and Gudi Padwa (New year) | HTCI (htci.org), a US Hindu temple | https://htci.org/events/ugadi-gudi-padwa-new-year |
| `ugadi-sahms` | Ugadhi (Telugu New Year) | South African Hindu Maha Sabha | https://sahms.org.za/2021/01/06/ugadhi-telugu-new-year/ |
| `ugadi-karnataka-tourism` | Ugadi 2026 in Karnataka: Traditions, Celebrations and More | Department of Tourism, Government of Karnataka | https://karnatakatourism.org/en/blogs/ugadi-in-karnataka |
| `ugadi-eb1911` | Hindu Chronology (Encyclopaedia Britannica, 11th edition, 1911), the sixty-year cycle of Jupiter | Encyclopaedia Britannica, 11th edition (1911), via Wikisource | https://en.wikisource.org/wiki/Page:EB1911_-_Volume_13.djvu/515 |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ |

---

# Navaratri

## Quick facts (draft)

- **Meaning:** “Nine nights” (nava plus ratri), a festival honoring the divine feminine, centered on the goddess Durga.  
  Sources: navaratri-britannica, navaratri-pluralism
- **Length of observance:** Nine nights, followed by the tenth day, Vijayadashami.  
  Sources: navaratri-britannica
- **Associated deities:** Durga, honored in her nine forms in many traditions; in many others the nights go to Durga, Lakshmi and Saraswati in turn. _(Varies by tradition)_  
  Sources: navaratri-britannica, navaratri-hpi
- **Common customs:** Worship of the goddess, garba and dandiya dancing, Durga Puja pavilions, Golu doll displays, honoring young girls (Kanya Puja), and for some, fasting.  
  Sources: navaratri-britannica, navaratri-hpi
- **Dietary practices:** Many devotees eat simple vegetarian, sattvic food, and some fast. Fasting is optional and varies by region, family and person. _(Varies)_  
  Sources: navaratri-britannica, navaratri-hpi, navaratri-hinduism-today-tamil


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Check the dietary fact.** 'Many devotees eat simple vegetarian, sattvic food' is hedged ('many', 'varies'), consistent with the rule against any universal vegetarian requirement. Sources are Britannica, HPI and a Tamil-family account. Okay to keep as is, or soften to 'Some devotees eat simple, sattvic meals'? I could not re-read the sources this session; this relies on the earlier verification notes.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Deities (draft)

- **Durga** (Shakta and wider Hindu traditions): The warrior goddess at the center of the festival, remembered for defeating the buffalo demon Mahishasura.  
  Sources: navaratri-britannica, navaratri-britannica-durga, navaratri-devi-mahatmya
- **Lakshmi** (Three-phase scheme (Durga, Lakshmi, Saraswati)): Goddess of prosperity, honored in many traditions during the middle three nights.  
  Sources: navaratri-britannica, navaratri-hpi
- **Saraswati** (Three-phase scheme; South India (ninth day)): Goddess of knowledge and wisdom, honored in many traditions during the last three nights; books and instruments are honored on the ninth day in parts of South India.  
  Sources: navaratri-britannica, navaratri-hpi, navaratri-hinduism-today-tamil


> **Reviewer note — ✅ ROUTINE**
> Three entries attributed to the three-phase scheme; the Saraswati entry mentions South India's ninth-day practice.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Why celebrate?

### Why celebrate Navaratri?

Navaratri, “nine nights,” is a festival of the divine feminine, centered on the goddess Durga and her many forms. It is a season of devotion, music and dance, and, for some families, fasting. It ends with Vijayadashami on the tenth day.

At its heart is the story of the goddess defeating the buffalo demon Mahishasura, remembered as the victory of good over evil. How people celebrate depends on where their family is from: Gujarat dances garba, Bengal builds grand Durga Puja pavilions, many South Indian families arrange dolls on stepped displays, and many homes honor young girls as the goddess herself. In many traditions the nights are shared among Durga, Lakshmi and Saraswati, for power, prosperity and wisdom.

**Sources:** `navaratri-britannica`, `navaratri-britannica-durga`, `navaratri-hpi`, `navaratri-pluralism`

**Research notes (internal, not published):**
- SOURCE NOTE: Britannica plus the HPI digest (Hinduism Today family, a short excerpt of a news article) and the Pluralism Project: separate publishers, but HPI adds little independent detail.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Missing context: which Navaratri?** The guide never says this is the autumn Navaratri (the Ugadi guide mentions the spring Chaitra Navaratri). A reader could be confused. Suggested addition: 'This guide describes the autumn Navaratri, the best known; a spring Navaratri also exists (see the Ugadi guide).' Needs a source: I believe Britannica's Navratri article states the two seasons, but I have not re-read it, so I would confirm it before adding. Say yes and I will check.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Stories & mythology

### Durga and Mahishasura

_Tradition: Shakta tradition; the Devi Mahatmya_

The best-known Navaratri story comes from the Devi Mahatmya, an ancient text about the goddess. The buffalo demon Mahishasura, protected by a boon that no male could defeat him, had driven the gods from heaven. Unable to beat him, the gods pooled their powers to create a warrior goddess, Durga, and armed her with their own weapons. She rode a lion into battle and defeated him.

Many people connect that victory with the festival, and with Vijayadashami, the “victorious tenth.”

**Sources:** `navaratri-britannica-durga`, `navaratri-devi-mahatmya`, `navaratri-hpi`

**Research notes (internal, not published):**
- OPTIONAL: verify Devi Mahatmya cantos 83 to 90 (where the killing is told; not read) before restoring any detail about the battle's length. The nine-day versus ten-day claim was removed from public text until then (owner direction). Sources disagree: Britannica (nine days of shape-shifting, victory on the tenth), Hinduism Today and BiblioAsia (ten-day battle), HPI (nine-day battle).
- SOURCE NOTE: cantos 82, 91, 92 and 93 (Pargiter translation) were read; they do not mention nine nights, Navaratri or Vijayadashami, though canto 92 mentions a great annual worship of the goddess in autumn. Siddha Yoga's claim that the text 'recounts the tradition of Navaratri' is not supported by the cantos read and is not used.
- OPTIONAL: 'ancient text' deliberately replaces Britannica's fifth or sixth century CE dating, which is single-source; add a second source before giving a century.


> **Reviewer note — ✅ ROUTINE**
> Attributed to the Devi Mahatmya as 'an ancient text'. The nine-versus-ten-day battle length and the century are deliberately left out (sources disagree). Keep.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Traditions

### Nine nights, three phases

Many families divide the nights into three phases of three: the first for Durga, the second for Lakshmi, and the third for Saraswati, often seen as strength, prosperity and wisdom. Others worship nine forms of Durga, one for each night, with names like Shailaputri, Brahmacharini and Kalaratri. Which pattern a family follows varies.

A much-loved custom is Kanya Puja, or Kanjak, on the eighth or ninth day. Young girls are honored as forms of the goddess: invited into the home, their feet washed, an arti performed, and gifts given.

**Sources:** `navaratri-britannica`, `navaratri-hpi`

**Research notes (internal, not published):**
- OPTIONAL: Kanya Puja's regional attribution could not be verified: Britannica names no region, the HPI digest says North India, and a Tamil-family account also describes honoring girls and women. The public text therefore gives no region ('a much-loved custom'). Indian news and lifestyle pages describe the custom without a regional breakdown and were not used.
- EDITORIAL: Ayudha Puja moved to the Golu section and Ramlila pointers removed to cut repetition across sections.


> **Reviewer note — 💡 SUGGESTION**
> Good. Kanya Puja has no region, as intended. If you accept the merge below, this section gains the 'no single right way' paragraph.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Food & fasting

### Fasting: optional, and different for everyone

_Tradition: Varies by region, family and person_

Fasting is part of Navaratri for many people, but it is optional and takes many forms. Many devotees eat simple vegetarian (sattvic) meals and skip alcohol and strong spices, and some keep a daytime fast. In parts of North India many people fast. Many other families celebrate without fasting at all, and what any family does is shaped by its own tradition.

**Sources:** `navaratri-britannica`, `navaratri-hpi`, `navaratri-hinduism-today-tamil`

**Research notes (internal, not published):**
- OPTIONAL: specific fasting foods (sabudana, buckwheat or amaranth flour, rock salt) and the regional split (first-and-last-day fasts, southern feasts) were removed because they rested on one temple blog (Radha Krishna Temple), which also stated its avoided-food list as universal and made health claims. A second reputable source (university, temple board or museum) would allow a short list to return.
- SOURCE NOTE: Britannica supports sattvic eating and daytime fasts; the HPI digest says 'many' in the north fast; a young Tamil-family writer says fasting is 'not how everybody observes' the festival.
- EDITORIAL: no medical advice is given.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Verify one phrase.** 'skip alcohol and strong spices' is not clearly supported by the notes (they confirm sattvic eating and daytime fasts from Britannica). Options: confirm against Britannica before publishing, or cut to 'Many devotees eat simple vegetarian (sattvic) meals, and some keep a daytime fast.' I recommend cutting unless the phrase is confirmed. **Organization suggestion:** merge 'What is on the table' into this section and retitle 'Fasting and food' (see below).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### What is on the table

Food is part of the worship as well as the fasting. At home, many devotees offer bhog, food prepared for the goddess, to her image. At Kanya Puja, the girls are traditionally served puri, semolina halva and black chickpeas.

**Sources:** `navaratri-britannica`

**Research notes (internal, not published):**
- EDITORIAL: kept short and limited to what Britannica names (bhog; the Kanya Puja meal). Tamil-home prasadam and betel-leaf details were removed (they rested on two Tamil-family accounts, one of them BiblioAsia, which is dropped; see the source-use notes).
- OPTIONAL: a second source for the bhog and Kanya Puja meal would help. No vegetarian rule is stated for everyone.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Section organization.** Two sentences, single source (Britannica). Suggest merging into the fasting section as 'Fasting and food'. Proposed combined text is in the 'Proposed reorganization' part of this packet.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## How to celebrate

### Joining in

There is no single right way to do Navaratri. Some people follow three goddesses over three phases and others the nine forms of Durga, some visit a temple and others dance garba, and some honor young girls at Kanya Puja or set up a Golu. A good way to start is to pick the thread that feels closest to your family and follow it for a night or two.

**Sources:** `navaratri-britannica`, `navaratri-hpi`

**Research notes (internal, not published):**
- EDITORIAL: deliberately short; it points back to the sections above instead of repeating them. Consider merging into the first Traditions section.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Section organization (your request).** This one-paragraph section only restates what other sections say. Recommend removing it as a separate section: move its one useful idea, 'pick the thread closest to your family and follow it for a night or two', into the intro of 'Celebrating Navaratri away from home'. Proposed text below.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Celebrating Navaratri away from home

Navaratri travels well, because so much of it is community and so much is up to you.

Find the dancing. Many cities and campuses hold garba and dandiya nights. Ask your Indian or Hindu student association, or look for a local temple or community event.

Build a mini Golu. A small display on a shelf, with a few figures or pictures, works. Invite friends over to see it, as families traditionally invite neighbors, and use a battery-powered lamp for light.

Check your housing rules. Many residence halls ban open flames, including candles, oil lamps and incense, and some limit decorations like string lights. Ask your residence life office before lighting or hanging anything, and ask rather than assume if you want to request an exception for religious observance.

Honor your tools. On the ninth day, you might tidy your desk, wipe down your laptop and place a flower by your books or instrument, in the spirit of Ayudha Puja and Saraswati worship.

If you choose to fast. Some people keep a full fast, some choose simple vegetarian meals, and many celebrate without fasting, so do whatever fits your family’s tradition and your own life. If you do change what you eat, your dining hall or a nearby Indian grocery can help with ingredients, and in-room cooking is often restricted.

Stay connected. A video call with family, or sharing a meal over a call, keeps you part of the celebration back home.

**Sources:** `dorm-appstate`, `dorm-dartmouth`, `dorm-uga`, `navaratri-pluralism`, `navaratri-britannica`

**Research notes (internal, not published):**
- EDITORIAL: practical suggestions, not cultural claims; no college is named. 'Honor your tools' adapts Britannica's description of Ayudha Puja and is an editorial suggestion.
- OPTIONAL: no specific campus event is promised.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Authenticity check.** Sections: find garba nights, build a mini Golu with a battery lamp, check housing rules, honor your tools on the ninth day, fasting options, stay connected. 'Honor your tools' adapts Ayudha Puja and is editorial; confirm it feels respectful rather than invented. Everything else is practical. Ayudha Puja's day varies by region, so the guide says 'on the ninth day, you might...', which is suggestive rather than prescriptive.
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Regional variations

### Durga Puja in Bengal and eastern India

_Tradition: Bengal and eastern India_

In West Bengal, Assam and other eastern states, Navaratri takes the form of Durga Puja. The festival is traditionally ten days long and opens with Mahalaya, which heralds the goddess’s arrival. Worship begins on the sixth day, Shashthi, and the last five days, through Vijayadashami, are the main period of veneration. Huge clay images of Durga fighting Mahishasura are installed in elaborately decorated pandals, or temporary pavilions, and in temples, and concerts, plays and fairs fill the days.

Vijayadashami brings the farewell. A mirror ritual marks the goddess’s presence leaving the image, married women apply vermilion to the goddess and to one another, and the images are carried in processions and immersed in water.

Many Bengalis cherish the belief that Durga comes home for these days to visit her family and then returns to her husband, Shiva. It is a beloved cultural tradition rather than something found in scripture.

**Sources:** `navaratri-britannica`, `navaratri-britannica-durga-puja`, `navaratri-britannica-vijayadashami`, `navaratri-pluralism`

**Research notes (internal, not published):**
- SOURCE NOTE: the ten-day span, Mahalaya as day one, worship beginning on Shashthi and the last five days as the primary period of veneration are stated in Britannica's Durga Puja article (a separate page from the Navratri and Vijayadashami articles, but the same publisher, so not independent confirmation).
- OPTIONAL: a Bengali cultural or religious source was not found. A MandirOnline page echoes the five-day pattern but appears derived from encyclopedia text and was not used. A Bengali association or cultural-institution page would give independent support.
- EDITORIAL: the clay-soil custom is intentionally omitted (owner decision).


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Claim to soften.** 'It is a beloved cultural tradition rather than something found in scripture' is an assertion about scripture that no source in the notes supports. Suggest ending the paragraph at 'then returns to her husband, Shiva', and following with 'This is a beloved cultural tradition.' (drops the scripture claim). Also note the whole section rests on Britannica pages only, which count as one source; a Bengali cultural source would help later (optional).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Garba and dandiya in Gujarat

_Tradition: Gujarat and the Gujarati diaspora_

In Gujarat, Navaratri is closely tied to garba and dandiya raas, circle dances done in vibrant clothes, often around a lamp. Fairs and feasts bring neighborhoods together. In the United States, communities hold large public garba celebrations, and for many young people it is the easiest way to join in.

**Sources:** `navaratri-britannica`, `navaratri-hpi`, `navaratri-pluralism`

**Research notes (internal, not published):**
- SOURCE NOTE: 'around a lamp' is from the HPI digest; Britannica says only that the dances are popular in Gujarat. Pluralism notes large public garba celebrations among American Hindus.
- EDITORIAL: 'the easiest way to join in' is editorial voice; soften if it feels like a claim.


> **Reviewer note — 💡 SUGGESTION**
> **Your requested wording fix.** 'for many young people it is the easiest way to join in' is editorial. Suggested: 'and for many young people, garba nights are a lively way to take part.' (still true to the Pluralism Project's note about large public celebrations, but no longer a claim about ease).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

### Golu in South India

_Tradition: Tamil Nadu, Andhra Pradesh, Telangana and Karnataka_

In parts of South India, families arrange dolls and figures on stepped platforms, usually in an odd number of tiers. The displays show deities and scenes from the Ramayana, and families invite friends and neighbors over to see them, exchange offerings and sing devotional songs. In Tamil it is called Bommai Golu.

The ninth day brings Ayudha Puja, when the goddesses Lakshmi, Saraswati and Parvati are worshipped and tools, instruments and books are cleaned, decorated and honored as the means of work and learning.

**Sources:** `navaratri-britannica`, `navaratri-hpi`

**Research notes (internal, not published):**
- SOURCE NOTE: rewritten to rely on Britannica (stepped platforms, odd tiers, Ramayana scenes, neighbors and offerings, Ayudha Puja) and the HPI digest (Golu in some southern states). Marapachi dolls, the kalasam position and 'every family does it differently' came from the Tamil-family accounts (Hinduism Today, BiblioAsia) and are removed.
- OPTIONAL: Telugu and Kannada names for the display (Bommala Koluvu, Gombe Habba) came only from a secondary page and are omitted.


> **Reviewer note — 🔶 NEEDS YOUR DECISION**
> **Citation check.** 'In Tamil it is called Bommai Golu' is not in the cited sources (Britannica and HPI) as far as the notes show; it probably came from the Hinduism Today Tamil account, which is cited elsewhere but not here. Either add that source to this section or cut the sentence. I recommend adding the source (the account is a first-person Tamil family piece; the claim is just a regional name).
>
> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold

## Sources used

| ID | Title | Publisher | URL |
|---|---|---|---|
| `navaratri-britannica` | Navratri | Encyclopaedia Britannica | https://www.britannica.com/topic/Navratri |
| `navaratri-britannica-durga` | Durga | Encyclopaedia Britannica | https://www.britannica.com/topic/Durga |
| `navaratri-britannica-vijayadashami` | Vijayadashami | Encyclopaedia Britannica | https://www.britannica.com/topic/Vijayadashami |
| `navaratri-britannica-durga-puja` | Durga Puja | Encyclopaedia Britannica | https://www.britannica.com/topic/Durga-Puja |
| `navaratri-pluralism` | Navaratri | The Pluralism Project, Harvard University | https://pluralism.org/navaratri |
| `navaratri-hpi` | What Is Navaratri, the Hindu Festival of Nine Nights? | Hindu Press International (Hinduism Today) | https://www.hinduismtoday.com/hpi/2025/09/26/what-is-navaratri-the-hindu-festival-of-nine-nights/ |
| `navaratri-hinduism-today-tamil` | Celebrating Navaratri, Tamil Style | Hinduism Today (a family account by a young writer in Texas) | https://www.hinduismtoday.com/magazine/apr-may-jun-2023/celebrating-navaratri-tamil-style/ |
| `navaratri-rkt-temple` | Navratri Fasting: Significance, Allowed Foods and Vrat Recipes | Radha Krishna Temple (temple blog) | https://www.radhakrishnatemple.net/blog/navaratri-fasting-2025/ |
| `navaratri-devi-mahatmya` | Markandeya Purana, Devi-Mahatmya (Pargiter translation), cantos 82, 91, 92 and 93 | Wisdomlib (public-domain Pargiter translation) | https://www.wisdomlib.org/hinduism/book/the-markandeya-purana |
| `dorm-appstate` | Open Flame Policy (residence halls) | Appalachian State University | https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy |
| `dorm-dartmouth` | Open Flame in Residence Halls | Dartmouth College | https://campus-services.dartmouth.edu/policy/open-flame-residence-halls |
| `dorm-uga` | Community Guide 2026-2027 (residence halls) | University of Georgia Housing | https://housing.uga.edu/community-guide/ |



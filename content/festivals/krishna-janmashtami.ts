import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Krishna Janmashtami: P3-05 Batch B: REVIEWED 2026-11-12 (owner-approved revision 2; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/krishna-janmashtami.md. No dates anywhere in this file; `occurrences` stays empty (the
 * Smarta and Vaishnava observance dates are disputed and handled in the date ledger, never here).
 * `reviewNotes` are internal and never published.
 */

const sources: readonly ContentSource[] = [
  britannica({
    id: "jm-brit",
    title: "Janmashtami",
    url: "https://www.britannica.com/topic/Janmashtami",
    claimsSupported: [
      "Festival of Krishna's birth on the eighth day of the dark fortnight of Bhadrapada; bhajans, fasting, worship",
      "The birth story as told in the 10th book of the Bhagavata Purana: Kamsa, Devaki, Vasudeva, the prophecy, the prison, Balarama, Yogamaya, the crossing of the Yamuna",
      "Observance in Mathura and Vrindavan; vigil and fast until midnight; bathing and dressing the murti; jhankis; dahi handi the day after, especially in Maharashtra and Goa",
    ],
  }),
  source({
    id: "jm-bhagavata",
    kind: "text",
    title: "Srimad-Bhagavatam, Canto 10, Chapter 3: The Birth of Lord Krsna (Bhaktivedanta VedaBase)",
    url: "https://vedabase.io/en/library/sb/10/3/",
    publisher: "Bhaktivedanta Book Trust, via vedabase.io",
    claimsSupported: [
      "The Lord appears to Devaki and Vasudeva in the dark of night; the prison doors open and the guards sleep; clouds thunder and rain; the Yamuna gives way; the babies are exchanged at Nanda's home in Gokula",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (Texts 1 to 53 in the Prabhupada translation; purports not in the fetched view). Terms review: the combined privacy and terms page was read and has no reuse terms; the footer says the content is used with permission of the Bhaktivedanta Book Trust and refers to a separate Terms and Conditions page that was not read. We paraphrase and quote nothing.",
  }),
  source({
    id: "jm-haf",
    kind: "cultural",
    title: "Janmashtami: the day to celebrate Krishna’s birth",
    url: "https://www.hinduamerican.org/blog/janmashtami-the-day-to-celebrate-krishnas-birth",
    publisher: "Hindu American Foundation",
    claimsSupported: [
      "Birth story summary (Srimad Bhagavatam): the prophecy, the prison, doors opening, Krishna raised in Vrindavan by Nanda and Yashoda",
      "Devotees fast before midnight; midnight kirtan; abhisheka; dances and dramas; prasada; festivities in Vrindavan begin ten days earlier",
      "The festival is observed the day before the birthday because ancient India counted the new day from dawn; especially important in Gaudiya Vaishnavism",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (article body verbatim). Terms review: no terms page found; the linked privacy policy has no reuse terms; footer shows copyright. Unchecked.",
  }),
  source({
    id: "jm-haf5",
    kind: "cultural",
    title: "5 things to know about Krishna",
    url: "https://www.hinduamerican.org/blog/5-things-to-know-about-krishna",
    publisher: "Hindu American Foundation",
    claimsSupported: [
      "Fasting to focus the senses; midnight darshan; public abhisheka; kirtan; homes and temples decorated with flowers; a feast of prasada; public readings of the Bhagavad Gita and Bhagavata Purana",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: same as the other HAF page (no terms page found; footer shows copyright). Unchecked.",
  }),
  source({
    id: "jm-incredible",
    kind: "cultural",
    title: "Janmashtami: Celebrate Lord Krishna’s birth with joy and devotion!",
    url: "https://www.incredibleindia.gov.in/en/festivals-and-events/janmashtami",
    publisher: "Incredible India, Ministry of Tourism, Government of India",
    claimsSupported: [
      "Birth in a prison in Mathura; the prophecy about the eighth son; midnight birth; thunderstorm, sleeping guards, the Yamuna parting",
      "Murtis bathed, dressed and placed in cradles after midnight; footprints drawn outside homes; night vigils; Rasa Lila in the Mathura region, Manipur, Assam, Rajasthan and Gujarat; Chhapan Bhog of 56 dishes in Puri; Dahi Handi the following day with pyramids of 20 to 40 feet",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (article body verbatim in two reads). Terms review: the Terms of Use page was reached but its text came only through a model summary (copyright reserved; reproduction needs written consent; framing not allowed), so it is not counted as read. We paraphrase and link only.",
  }),
  source({
    id: "jm-iskcon",
    kind: "cultural",
    title: "Janmastami: A Unique Expression of Devotion to a Unique Deity",
    url: "https://iskconnews.org/janmastami-a-unique-expression-of-devotion-to-a-unique-deity/",
    publisher: "ISKCON News (an ISKCON news report from 2009)",
    claimsSupported: [
      "ISKCON temples at Vrindavan: devotees fast but cook through the day; midnight gathering; abhisheka; dramas; 108 dishes offered; tableaux and a crib for the infant Krishna",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: the terms page it was expected to have returned a 404; no terms found. Unchecked. The article is from 2009, so it is used only for ISKCON practice at the time.",
  }),
  source({
    id: "jm-krishnacom",
    kind: "cultural",
    title: "Janmashtami",
    url: "https://krishna.com/janmashtami/",
    publisher: "Krishna.com (Bhaktivedanta Book Trust)",
    claimsSupported: ["In this tradition Krishna’s birth is placed at midnight on ashtami; devotees fast until midnight and attend the midnight worship; extra chanting"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: footer shows copyright; no terms page found. Unchecked.",
  }),
  source({
    id: "jm-brandeis",
    kind: "academic",
    title: "Janmashtami (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/janmashtami.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["Celebration of Krishna’s birth; people fast and spend the day meditating, chanting and singing songs to Krishna"],
    termsChecked: false,
    termsNote: "Content read in full in the browser (the fetch tool was refused with a 403; one paragraph). Terms review: not done.",
  }),
  source({
    id: "jm-argus",
    kind: "other",
    title: "Smarta vs Vaishnava: Odisha’s Janmashtami Observance Explained",
    url: "https://argusenglish.in/odisha/smarta-vs-vaishnava-odishas-janmashtami-observance-explained",
    publisher: "Argus News (Odisha), about 2025",
    claimsSupported: ["Smarta and Vaishnava temples and households in Odisha observed Janmashtami on consecutive days in one recent year"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (a short regional news report with no absolute date). Terms review: links to terms and privacy pages seen, not read. Unchecked.",
  }),
  source({
    id: "jm-indiatv",
    kind: "other",
    title: "Krishna Janmashtami 2025: August 15 or 16? Find the right date and midnight puja muhurat",
    url: "https://www.indiatvnews.com/lifestyle/spirituality/krishna-janmashtami-2025-date-confusion-puja-time-2025-08-10-1002881",
    publisher: "India TV News (2025)",
    claimsSupported: ["The midnight Nishita puja; idols of baby Krishna bathed and placed in cradles; milk and butter as prasad"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: links to terms and privacy pages seen, not read. Unchecked. A news explainer, used only for observance details, never for a date; its description of the Smarta and Vaishnava reckoning rules is not used.",
  }),
  source({
    id: "jm-dte",
    kind: "other",
    title: "Dahi Handi and the fall of young govindas",
    url: "https://www.downtoearth.org.in/news/health/dahi-handi-and-the-fall-of-the-young-govindas-55411",
    publisher: "Down To Earth (Centre for Science and Environment), 2016",
    claimsSupported: [
      "In Dahi Handi the lighter, younger participants climb to the top of the pyramid and the pot hangs very high; injuries have been recorded in Mumbai",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (2016 article). Terms review: no terms link visible in the fetched text. Unchecked. Dated: used only for the general safety concern; its court and statistics details are not used in the guide.",
  }),
  ...dormSources,
];

export const krishnaJanmashtami: FestivalRecord = {
  slug: "krishna-janmashtami",
  name: "Krishna Janmashtami",
  // BASICS (P3-05 Batch B, reviewed 2026-11-12). "Gokulashtami" is kept only because the existing alias is used for the
  // festival in Maharashtra by one source (Down To Earth); see the packet.
  aliases: ["Janmashtami", "Gokulashtami"],
  subtitle: "A festival honoring the birth of Krishna",
  deities: ["Krishna", "Vishnu"],
  basics: { status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“Janmashtami” joins janma, “birth,” and ashtami, “the eighth day.” The festival celebrates the birth of Krishna, regarded in Vaishnava tradition as an avatar of Vishnu, on the eighth day of the waning fortnight of the month of Bhadrapada.",
      sourceIds: ["jm-brit", "jm-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "One day and night, centered on a midnight celebration. In Maharashtra and Goa, Dahi Handi follows the next day, and in Vrindavan some festivities begin about ten days earlier. Observance days can differ by tradition.",
      tradition: "Varies by region and tradition",
      sourceIds: ["jm-brit", "jm-haf", "jm-argus"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Krishna, an avatar of Vishnu in Vaishnava tradition. His parents, Devaki and Vasudeva, and his foster parents, Yashoda and Nanda, appear in his birth story.",
      tradition: "Vaishnava traditions",
      sourceIds: ["jm-brit", "jm-bhagavata"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "A midnight celebration of the birth, bathing and dressing an image of baby Krishna, devotional singing, scenes of his childhood, and sweets shared as prasada. In some places, pots of curd are broken by human pyramids the next day.",
      sourceIds: ["jm-brit", "jm-haf", "jm-incredible"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Dietary practices",
      text: "Many devotees fast until midnight and then share prasada.",
      tradition: "Varies by family and tradition",
      sourceIds: ["jm-brit", "jm-haf5", "jm-krishnacom"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
  ],

  deityEntries: [
    {
      name: "Krishna",
      role: "Born in Mathura to Devaki and Vasudeva and raised in Gokula by Yashoda and Nanda, as told in the Bhagavata Purana. Vaishnava traditions regard him as an avatar of Vishnu, and some, such as Gaudiya Vaishnavism, hold his birth festival especially important.",
      tradition: "Vaishnava traditions; Bhagavata Purana",
      sourceIds: ["jm-brit", "jm-bhagavata", "jm-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Vishnu",
      role: "In the Bhagavata Purana’s account, Vishnu takes birth as Krishna to relieve the earth of cruel rulers.",
      tradition: "Vaishnava tradition; Bhagavata Purana",
      sourceIds: ["jm-brit", "jm-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Janmashtami?",
      body: [
        "Janmashtami celebrates the birth of Krishna, the beloved god of the Bhagavata Purana, who is regarded in Vaishnava tradition as an avatar of Vishnu. The festival falls on the eighth day of the waning moon in the month of Bhadrapada, and its heart is a midnight celebration, the hour in which tradition places his birth.",
        "Devotees keep a vigil, often fast until midnight, then bathe and dress an image of baby Krishna, sing, and share sweets as prasada. Temples and homes are decorated, and in many places tableaux show scenes from his childhood. The day after, in Maharashtra and Goa and some other places, young people form human pyramids to break a pot of curd. How a family keeps the day, and even which day it keeps, depends on its tradition and region.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-haf", "jm-brandeis", "jm-incredible"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the overview rests on Britannica plus HAF, Brandeis and Incredible India (four publishers, all agreeing on the core).",
        "EDITORIAL: no date appears; the observance day is disputed between traditions and stays in the date ledger (Smarta versus Vaishnava).",
      ],
    },
    {
      kind: "story",
      title: "The birth of Krishna",
      tradition: "Vaishnava tradition, as told in the Bhagavata Purana",
      body: [
        "In the Bhagavata Purana’s account, the earth is burdened by cruel kings and Vishnu promises to be born to relieve it. In Mathura, the tyrant Kamsa learns from a voice in the sky that the eighth son of his sister Devaki will kill him. He imprisons Devaki and her husband Vasudeva and kills their first six children. Their seventh child, Balarama, is miraculously transferred to the womb of Rohini, another wife of Vasudeva.",
        "When the eighth child is born, in the dark of night, the parents first see him in his divine form as Vishnu before he becomes an ordinary baby. He tells them to carry him across the Yamuna River to Gokula and to bring back the daughter just born to Yashoda and Nanda. As clouds thunder and rain falls, the prison doors open, the guards fall asleep, and the river makes way for Vasudeva. He leaves the baby with Yashoda and returns with the girl, who is Yogamaya, Vishnu’s divine power. When Kamsa tries to kill her she appears as a goddess and he is humbled. Krishna grows up in Gokula and Vrindavan and later defeats Kamsa.",
        "This is one telling. Communities and traditions emphasize different parts of Krishna’s life and tell it with their own songs, plays and images.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-bhagavata", "jm-haf", "jm-incredible"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica and the Bhagavata text (canto 10, chapter 3, read in full) agree on the sequence. The text read says the Lord appeared “in the dense darkness of night”; it does not use the word midnight. Britannica, HAF, krishna.com and ISKCON News place the birth hour at midnight, so the guide says “in the dark of night” in the story and “midnight” in the observance.",
        "SOURCE NOTE: the exact wording of the voice in the sky and the swap of the babies follows Britannica. The Bhagavata text read does not use the words “eighth son” in chapter 3; the prophecy is in earlier chapters, which were not read. Britannica and Incredible India supply it.",
        "EDITORIAL: Krishna’s later life (Radha, the Mahabharata, the Gita) is deliberately left out of this festival guide to keep it focused on the birth.",
      ],
    },
    {
      kind: "rituals",
      title: "A night vigil and a midnight birth",
      body: [
        "On Janmashtami, many devotees keep a vigil through the day and evening, singing devotional songs and listening to stories of Krishna. At midnight, the traditional hour of his birth, temples and homes celebrate the moment with kirtan, conch shells and a short worship. An image of baby Krishna is bathed, often in water and milk, dressed in new clothes and placed in a cradle. In a ceremony called abhisheka, which temples often hold in public, the deity is ritually bathed.",
        "Temples and homes are decorated with flowers, and many families set up jhankis, three-dimensional scenes of Krishna’s childhood showing the Yamuna, animals, and the people of his story. Some women draw small footprints at the doorway to welcome the child. Dances and dramas about Krishna’s life are performed, and after the midnight celebration, sweets and other food are first offered to the deity and then shared as prasada. In some places, public readings from the Bhagavata Purana or the Bhagavad Gita are part of the day.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-haf", "jm-haf5", "jm-incredible", "jm-iskcon", "jm-indiatv"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: bathing in water and milk, dressing, jhankis and prasada are Britannica; abhisheka, kirtan, dramas and readings are HAF; cradle and footprints are Incredible India; the conch shells and cradle are India TV; ISKCON News (2009) supports crib, tableaux and a public abhisheka for one tradition.",
        "EDITORIAL: “or swing” was removed (owner direction, revision 2): no source read in full names a swing, so the text says only “cradle”.",
      ],
    },
    {
      kind: "fasting",
      title: "Fasting and the midnight vigil",
      tradition: "Varies by family and tradition",
      body: [
        "Many devotees fast on the day before the midnight celebration and break the fast with prasada after the birth is celebrated. HAF describes fasting as a way of focusing the senses; Brandeis describes people fasting, meditating, chanting and singing to Krishna through the day. At ISKCON’s temple in Vrindavan, devotees who fast still cook throughout the day to prepare the offering. Fasting practices vary by family and tradition.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-haf", "jm-haf5", "jm-brandeis", "jm-iskcon"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: neutral fasting wording only, stated once in the guide (revision 2 removed the repeated disclaimers and the unsupported “many families do not fast at all”); no rule, no menu and no health advice.",
        "OPTIONAL: Gaudiya, Pushtimarg and other sampradaya fasting rules are not described: no source on them could be read (the Pushtimarg site refused the connection).",
      ],
    },
    {
      kind: "food",
      title: "Curd, butter and sweets",
      tradition: "Regional; varies by community",
      body: [
        "Sweets and other foods are offered to Krishna first and then shared as prasada. Milk, curd and butter have a special place because Krishna’s childhood stories are full of cowherd boys and stolen butter, and the Dahi Handi pots hold curd. India TV describes milk and butter as typical prasada, ISKCON News describes a temple offering of 108 dishes, and Incredible India describes Chhappan Bhog, an offering of 56 dishes, in Puri. What a family or temple prepares depends on its tradition and region.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-incredible", "jm-iskcon", "jm-indiatv"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the sentence tying curd and butter to Krishna’s childhood stories follows Britannica’s explanation of Dahi Handi; no source names a specific home dish for Janmashtami, so none is named.",
        "OPTIONAL: regional sweets (for example Gujarat, Maharashtra, South India) are not described: no source read names them.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Mathura, Vrindavan and beyond",
      tradition: "Regional; varies by community",
      body: [
        "The festival is observed especially in Mathura and Vrindavan, the places associated with Krishna’s birth and childhood. HAF notes that in Vrindavan some festivities begin about ten days before Krishna’s birthday, and many pilgrims travel there. Incredible India describes Rasa Lila, dance-dramas of Krishna’s life, as especially popular in the Mathura region, in Manipur and Assam, and in parts of Rajasthan and Gujarat.",
        "In Puri, in Odisha, the Jagannath Temple marks the festival, and Incredible India describes an offering of 56 dishes there. In Maharashtra, Goa and Gujarat the day after Janmashtami brings Dahi Handi. Beyond India, Hindu communities, including ISKCON temples, hold midnight programs, dramas and tableaux of their own.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-haf", "jm-incredible", "jm-iskcon"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Incredible India lists “Mumbai, Goa or Gujarat” for Dahi Handi; Britannica says “especially in Maharashtra and Goa”; the text keeps the two lists together without claiming more.",
        "OPTIONAL: Tamil Nadu (Gokulashtami, kolam footprints), Kerala, Karnataka, Andhra Pradesh and Telangana customs are not described: no reliable source read covers them, so none are invented.",
        "OPTIONAL: Pushtimarg (Nathdwara) and Gaudiya practice are not described in detail: the Pushtimarg source could not be opened.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Smarta and Vaishnava traditions: why the day can differ",
      tradition: "Smarta and Vaishnava traditions",
      body: [
        "Janmashtami is tied to the eighth day of the waning moon, and different traditions follow their own calendar practices in deciding which day that is. As a result, observance dates can differ by tradition: some communities mark Janmashtami on one day and others on the next. A report from Odisha describes Smarta temples and households and Vaishnava institutions observing on consecutive days in one recent year.",
        "Which day a family follows is a matter of its own tradition. Temples usually announce theirs, and a local temple’s announcement is the best guide.",
      ].join("\n\n"),
      sourceIds: ["jm-argus"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (revision 2, owner direction): the specific reckoning rules (sunrise, Rohini nakshatra, Ashtami tithi and evening or midnight timing) were removed from the public text because they rest on two news reports that phrase them differently and no calendar authority was read. The text now says only, in general terms, that observance dates can differ by tradition, attributed to the Odisha report.",
        "OPTIONAL: a panchang authority, temple or scholarly source would allow the reckoning to be explained later. The India TV (2025) explainer, which states the rules, stays in the pack as read and not used for them.",
        "EDITORIAL: no date appears. The Atlanta ledger keeps the Smarta and Vaishnava observances separate and the festival stays “disputed” there.",
        "SOURCE NOTE: HAF’s explanation that devotees fast on the day before because ancient India counted a new day from dawn was also left out of this section, since it is a timing rule.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Dahi Handi: the pot of curd",
      tradition: "Maharashtra, Goa and western India",
      body: [
        "In Maharashtra and Goa, the day after Janmashtami is marked by Dahi Handi, “the pot of curd.” A pot of curd is hung high above a street from a pole or wire, and groups of young people, called govindas after a name of Krishna, form a human pyramid to reach and break it. The game imitates the boy Krishna and his friends stealing curd from pots that their mothers hung out of reach.",
        "Because the pyramids are tall and the climbers at the top are usually the lightest and youngest, Dahi Handi has caused injuries. It is best watched from a safe distance, and anyone who takes part should do so only in a well-organized event that follows the local safety requirements.",
      ].join("\n\n"),
      sourceIds: ["jm-brit", "jm-dte"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (revision 2, owner direction): the court-limit discussion (age, height and safety measures ordered in 2014 and 2016) and every pyramid height were removed from the public text as outdated and conflicting. The text keeps only the general safety concern; Down To Earth (2016) supports that the lightest, youngest climbers go to the top and that injuries have occurred.",
        "OPTIONAL: a recent, authoritative source on the present rules in Maharashtra would allow safety requirements to be described specifically. The 2014 and 2016 news items (Scroll, India TV) stay in the pack as read and not used.",
        "EDITORIAL: no injury counts, deaths or graphic detail are given. “Well-organized event that follows the local safety requirements” and “best watched from a safe distance” are common-sense safety wording with no source.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Janmashtami away from home",
      body: [
        "You can mark Janmashtami in a small way, alone or with friends.",
        "Find your people. Ask a Hindu or Indian student association, an ISKCON or other temple, or a nearby community group whether it holds a midnight celebration or a Dahi Handi game, and whether it streams the midnight program online.",
        "Make a small shrine. A picture or small figure of baby Krishna in a cradle, with a few flowers, is a simple way to join the day. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract and use a battery-powered lamp. If you have questions about religious accommodations, ask your residence life office.",
        "Share something sweet. Offer a little sweet or fruit to the image and share it with friends. If you share food, tell people what is in it.",
        "Watch Dahi Handi, and join only if it is well run. A human pyramid is dangerous without trained organizers, safety gear and cushioning. If you take part, follow the organizers’ instructions.",
        "Call home. A video call with family during the midnight celebration keeps you part of the day.",
      ].join("\n\n"),
      sourceIds: ["jm-incredible", "jm-dte", "dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. The cradle and footprints come from Incredible India; the “well run” advice is editorial. Revision 2 removed the low-pot game suggestion (no source supports it as safe) and the repeated fasting line.",
        "OPTIONAL: no Atlanta-area Janmashtami event, temple or student group has been verified, so none is named.",
      ],
    },
  ],
};

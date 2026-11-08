import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Maha Shivaratri: P3-05 Batch A: REVIEWED 2026-11-08 (owner-approved editorial revision 3; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/maha-shivaratri.md. No dates anywhere in this file. The IGNCA article on Kashmir is
 * deliberately NOT a source here: its Hyper linking Policy requires prior permission for links to it
 * (verified on the live site 2026-11-08). `reviewNotes` are internal and never published.
 */

const WISDOMLIB_TERMS =
  "Terms review: no terms page read; the site hosts J. L. Shastri’s translation, a copyrighted work of the translator and publisher. Content of the passage was read in full. We summarise it in our own words and link; nothing is quoted.";

const sources: readonly ContentSource[] = [
  britannica({
    id: "shivaratri-brit",
    title: "Maha Shivaratri",
    url: "https://www.britannica.com/topic/Maha-shivaratri",
    claimsSupported: [
      "The most important sectarian festival for devotees of Shiva; the 14th day of each dark half is sacred to Shiva",
      "Fast, night vigil, worship of the lingam and relating myths; feasting and fairs the next day; Lingayat gifts to the guru",
      "Devotees believe worship on this night brings religious and worldly benefits",
    ],
  }),
  source({
    id: "shivaratri-pluralism",
    kind: "academic",
    title: "The Great Night of Shiva",
    url: "https://pluralism.org/the-great-night-of-shiva",
    publisher: "The Pluralism Project, Harvard University",
    claimsSupported: [
      "Shiva as Mahadeva, creator and destroyer; the linga; Maha Shivaratri as the year's most important celebration of Shiva",
      "The pillar-of-light legend linked to this night; abhishekam with milk, yogurt, honey and turmeric; an all-night vigil at a New York temple; an offering of dance at a Boston temple",
    ],
    termsChecked: false,
    termsNote: "Terms review: no terms page found (only a Harvard copyright-reporting link); unchecked. Content was read in a browser after the fetch tool was refused.",
  }),
  source({
    id: "shivaratri-brandeis",
    kind: "academic",
    title: "Shivaratri (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/shiva-ratri.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["Fasting, meditating and chanting Om Namah Shivaya; decorating the lingam; staying awake; the story of Parvati's fast"],
    termsChecked: false,
    termsNote: "Content read in a browser (the fetch tool was refused). Terms review: not done.",
  }),
  source({
    id: "shivaratri-maharashtra",
    kind: "cultural",
    title: "Mahashivratri (Maharashtra Tourism)",
    url: "https://maharashtratourism.gov.in/festivals/mahashivratri/",
    publisher: "Department of Tourism, Government of Maharashtra",
    claimsSupported: [
      "The poison (Halahala) story and the marriage of Shiva and Parvati as beliefs about the day",
      "Bilva (bel) leaves as an offering; a strict or partial fast with satvik foods such as fruit and sago dishes",
    ],
    termsChecked: false,
    termsNote: "Terms review: no terms or copyright page found; footer shows a copyright line. Content read in a browser (first part).",
  }),
  source({
    id: "shivaratri-incredible-india",
    kind: "cultural",
    title: "Maha Shivratri: Celebrate the great night of Lord Shiva",
    url: "https://www.incredibleindia.gov.in/en/festivals-and-events/maha-shivratri",
    publisher: "Ministry of Tourism, Government of India (Incredible India)",
    claimsSupported: [
      "Union of Shiva and Parvati; abhishekam with milk, honey and water; bilva leaves; fasting",
      "Annual dance festivals at temples such as Konark, Khajuraho, Pattadakal, Modhera and Chidambaram; Natyanjali at Chidambaram",
    ],
    termsChecked: true,
    termsNote: "Terms of Use read 2026-11-08 (via a fetch-agent summary of the policy text): content may not be reproduced or framed without written consent; paraphrase and links to it are not addressed. First part of the page read in a browser.",
  }),
  source({
    id: "shivaratri-ddnews",
    kind: "cultural",
    title: "PM Modi extends greetings on Herath Poshte to Kashmiri Pandit community",
    url: "https://ddnews.gov.in/en/pm-modi-extends-greetings-on-herath-poshte-to-kashmiri-pandit-community/",
    publisher: "DD News (Prasar Bharati, Government of India)",
    claimsSupported: ["Herath is the Kashmiri Pandit name for the festival, from Hara (Shiva) and ratri (night), observed with night-long prayers and ceremonies in homes"],
    termsChecked: false,
    termsNote: "Terms review: not done. Content read in full in a browser (a news item). Used for one factual point, paraphrased, with a link.",
  }),
  source({
    id: "shivaratri-linga-purana",
    kind: "text",
    title: "Linga Purana 1.17, “Origin of the Linga (lingodbhava)” (translation by J. L. Shastri)",
    url: "https://www.wisdomlib.org/hinduism/book/the-linga-purana/d/doc1195230.html",
    publisher: "wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1951)",
    claimsSupported: ["Brahma and Vishnu quarrel; a pillar of flame without beginning or end appears; Vishnu as a boar and Brahma as a swan fail to find its ends; they bow to Shiva"],
    termsChecked: false,
    termsNote: WISDOMLIB_TERMS,
  }),
  source({
    id: "shivaratri-shiva-purana-7",
    kind: "text",
    title: "Shiva Purana, Vidyesvara Samhita chapter 7: Shiva appears as a column of fire (translation by J. L. Shastri)",
    url: "https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc225552.html",
    publisher: "wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950)",
    claimsSupported: ["The column of fire between Brahma and Vishnu; the chapter names no night or Shivaratri"],
    termsChecked: false,
    termsNote: WISDOMLIB_TERMS,
  }),
  source({
    id: "shivaratri-shiva-purana-38",
    kind: "text",
    title: "Shiva Purana, Kotirudra Samhita chapter 38: The greatness of Shivaratri (translation by J. L. Shastri)",
    url: "https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226539.html",
    publisher: "wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950)",
    claimsSupported: ["Shivaratri glorified in the dark half of a winter month when the 14th day reaches midnight; a vigil kept in four watches with worship in each"],
    termsChecked: false,
    termsNote: WISDOMLIB_TERMS,
  }),
  source({
    id: "shivaratri-shiva-purana-40",
    kind: "text",
    title: "Shiva Purana, Kotirudra Samhita chapter 40: The glory of Shivaratri, the hunter Gurudruha (translation by J. L. Shastri)",
    url: "https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226541.html",
    publisher: "wisdomlib.org (J. L. Shastri translation, Motilal Banarsidass, 1950)",
    claimsSupported: ["The hunter Gurudruha spends the night in a bilva tree, leaves and water fall on a linga, he spares the animals that return, and Shiva blesses him"],
    termsChecked: false,
    termsNote: WISDOMLIB_TERMS,
  }),
  ...dormSources,
];

export const mahaShivaratri: FestivalRecord = {
  slug: "maha-shivaratri",
  name: "Maha Shivaratri",
  aliases: ["Shivaratri", "Mahashivratri", "Maha Shivratri"],
  // BASICS (P3-05, reviewed 2026-11-08). "Herath" (the Kashmiri name) is not an alias for now: it rests on one news item.
  subtitle: "The great night of Shiva",
  deities: ["Shiva", "Parvati"],
  basics: { status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“The great night of Shiva” (maha, great, plus ratri, night), the most important yearly celebration of Shiva for his devotees.",
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "One night of fasting and vigil. In many places the following day brings feasting and fairs.",
      sourceIds: ["shivaratri-brit"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Shiva, most often worshipped in the form of the lingam. Parvati appears in the marriage story.",
      tradition: "Shaiva and wider Hindu traditions",
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism", "shivaratri-maharashtra"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "Fasting, an all-night vigil, bathing the lingam with milk, honey and water, chanting “Om Namah Shivaya,” and offering bilva leaves.",
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism", "shivaratri-brandeis", "shivaratri-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Dietary practices",
      text: "Many devotees fast, and how strictly varies. Simple, satvik foods such as fruit and sago dishes are described for those who fast. Practices differ by region, family and tradition.",
      tradition: "Varies",
      sourceIds: ["shivaratri-brit", "shivaratri-brandeis", "shivaratri-maharashtra"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: no vegetarian rule is stated for everyone. Maharashtra Tourism’s “satvik foods” and its food list are one government page in a Maharashtra context, so they are attributed loosely.",
        "OPTIONAL: the best source on the Kashmiri Pandit tradition (IGNCA) says offerings there include fish and mutton; it cannot be used (linking permission required), so that detail is absent.",
      ],
    },
  ],

  deityEntries: [
    {
      name: "Shiva",
      role: "The god honored on this night. He is worshipped most often as the lingam, a simple stone shaft, and is also shown as a yogi and as the dancing Nataraja.",
      tradition: "Shaiva and wider Hindu traditions",
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Parvati",
      role: "Shiva’s consort. In some accounts the night celebrates their marriage.",
      tradition: "Varies by community",
      sourceIds: ["shivaratri-maharashtra", "shivaratri-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Maha Shivaratri?",
      body: [
        "Maha Shivaratri, “the great night of Shiva,” is the most important yearly celebration for devotees of Shiva. Many keep a fast, stay awake through the night in prayer, and worship the Shiva lingam, the simple stone form in which Shiva is most often honored, bathing it with milk, honey and water. Devotees believe that worship on this night brings religious and worldly benefits.",
        "Why this night is special is explained in several ways: as the night a blazing pillar of light revealed Shiva’s boundless nature, as the night of Shiva and Parvati’s marriage, or as the night Shiva drank a poison that threatened the world. Each tradition tells it in its own way, and no single story is the only reason.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism", "shivaratri-maharashtra", "shivaratri-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: core summary rests on Britannica plus the Pluralism Project (Harvard) and two government tourism pages; Britannica’s own legend list is only in an AI-generated summary page, which is not cited.",
      ],
    },
    {
      kind: "significance",
      title: "A night each month, and a great night once a year",
      body: [
        "The 14th day of the dark half of every lunar month is sacred to Shiva, and the monthly night is called Shivaratri. Maha Shivaratri, the great night, comes in late winter and is the occasion of particular rejoicing, the year’s most important celebration of Shiva.",
        "Shiva, also called Mahadeva, “the great lord,” is seen in Shaiva tradition as both creator and destroyer. He is worshipped most often as the linga, a simple stone shaft often understood as a symbol of cosmic wholeness, and he is also shown as a yogi and as the dancer Nataraja.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism", "shivaratri-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica says the occasion is especially joyful in Magha and, above all, Phalguna; month names differ between lunar calendars, so the guide says only “late winter” and gives no date.",
        "EDITORIAL: the linga’s interpretation (a male-and-female symbol of cosmic wholeness) is one source’s reading and is hedged as “often understood”.",
      ],
    },
    {
      kind: "story",
      title: "The pillar of light",
      tradition: "Shaiva tradition; the Linga Purana and the Shiva Purana",
      body: [
        "One well-known story tells of a time when Brahma and Vishnu argued over which of them was greater. A blazing pillar of light appeared before them, with no beginning and no end. Vishnu took the form of a boar and dived to find its base, and Brahma took the form of a swan and flew up to find its top, but neither could. They bowed to Shiva, who had appeared as the pillar and is honored in it as the linga.",
        "The Linga Purana and the Shiva Purana tell this story, and Shaiva festival tradition associates it with Maha Shivaratri.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-linga-purana", "shivaratri-shiva-purana-7", "shivaratri-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the Linga Purana chapter (1.17) and the Shiva Purana chapter (Vidyesvara 7) were read in J. L. Shastri’s translation on wisdomlib; neither names a night, a tithi, a month or Shivaratri. Pluralism says “it was on this night, they say” that the linga of light was revealed. Wikipedia’s claim that the Linga Purana ties it to Maha Shivaratri is not supported by the chapter read.",
        "SOURCE NOTE: in the Puranas it is Brahma and Vishnu who quarrel; Pluralism’s version says “the gods”. The guide follows the text.",
      ],
    },
    {
      kind: "story",
      title: "Other stories: the poison and the marriage",
      tradition: "Varies by tradition",
      body: [
        "Other stories are told about the night in different places. In one, the gods and demons churned the ocean and a deadly poison rose from it; Shiva drank it to protect the world, and it turned his throat blue. In another, the night celebrates the marriage of Shiva and Parvati, a festival of divine union. Many people know more than one.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-maharashtra", "shivaratri-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "OPTIONAL: a second reputable source, read verbatim, for the poison story would help; the Kashmiri scholarly article (IGNCA) that hedges it cannot be used. Maharashtra Tourism states the poison story and the marriage as beliefs about the day, and Incredible India describes the night as the union of Shiva and Parvati.",
        "EDITORIAL: owner direction 2026-11-08: the separate account of Parvati’s fast (Brandeis) was removed; it is a single, unattributed source with no festival-specific textual basis. Brandeis stays cited only for fasting, chanting and decorating the lingam.",
      ],
    },
    {
      kind: "story",
      title: "The hunter who worshipped without knowing",
      tradition: "Shiva Purana",
      body: [
        "The Shiva Purana tells of a hunter named Gurudruha who, not knowing it was Shivaratri, went into the forest to find food for his family and spent the night in a bilva tree beside a pond. As he kept watch through the night, leaves and drops of water fell from the tree onto a linga below. He spared the animals that came to the pond when they promised to return, and each of them kept its promise. Shiva appeared, blessed the hunter and freed the animals.",
        "The story is told to show that worship offered on this night is blessed, even when it is offered without knowing.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-shiva-purana-40"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Kotirudra Samhita chapter 40 (J. L. Shastri’s translation, via wisdomlib) names the hunter Gurudruha; some tellings use other names. The translator’s footnote says the story also occurs, with small differences, in the Padma Purana (not checked).",
        "OPTIONAL: no secondary reputable source was read that tells this story, so how widely it is told today is not stated.",
      ],
    },
    {
      kind: "rituals",
      title: "The vigil, the fast and the lingam",
      body: [
        "On Maha Shivaratri many devotees fast, keep a vigil through the night and worship the Shiva lingam. In temples, priests bathe the lingam with offerings such as milk, yogurt, honey and turmeric, rinsing it with water between each, and then decorate it with flowers and garlands. Bilva leaves are a favorite offering, and devotees chant “Om Namah Shivaya,” sing hymns and tell stories of Shiva.",
        "The Shiva Purana describes keeping the vigil through the four watches of the night, with worship in each. The day after the vigil is marked with feasting and fairs in some places.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-brit", "shivaratri-pluralism", "shivaratri-brandeis", "shivaratri-incredible-india", "shivaratri-shiva-purana-38"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the Shiva Purana chapter (Kotirudra 38) prescribes the four-watch vigil; its month naming follows its own calendar and is not repeated. The Linga Purana’s vrata chapters (1.83, 1.84) prescribe monthly fasts and name no Shivaratri vigil.",
        "EDITORIAL: the yogic belief about an upsurge of energy on this night (Incredible India) is left out.",
      ],
    },
    {
      kind: "fasting",
      title: "Fasting and food",
      tradition: "Varies by region, family and tradition",
      body: [
        "Fasting is part of Maha Shivaratri for many devotees, and how strictly people fast varies. Maharashtra Tourism describes a strict or partial fast with simple, satvik foods such as fruit and sago dishes. Fasting practices vary by family and tradition.",
        "In many places the day after the vigil is a day of feasting.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-brit", "shivaratri-brandeis", "shivaratri-maharashtra"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: no vegetarian requirement is stated; owner rule. No medical advice.",
        "EDITORIAL: bhang and thandai are intentionally not mentioned for Shivaratri: no source read links them to it (Britannica mentions bhang only in its Holi article).",
        "OPTIONAL: the Maharashtra fasting-food list (sabudana, rajgira) is one government page; it is mentioned only as an example.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Shiva’s night in different places",
      tradition: "Regional; varies by community",
      body: [
        "Kashmiri Pandits call the festival Herath, from Hara, a name of Shiva, and ratri, night, and mark it with special rituals and night-long prayers in the home. Among South Indian Lingayats, the day after brings gifts to the guru.",
        "At temples such as Chidambaram, annual dance festivals offer “worship through dance.” In the United States, some temples hold all-night vigils with the full bathing of the lingam, and one community has developed an offering of dance to Shiva as Nataraja.",
      ].join("\n\n"),
      sourceIds: ["shivaratri-ddnews", "shivaratri-brit", "shivaratri-incredible-india", "shivaratri-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "OPTIONAL: Herath is kept to one sentence from a DD News item (Prasar Bharati). The detailed Kashmiri tradition (a fortnight of observance, walnuts, offerings to Bhairava) rests on the IGNCA article, whose Hyper linking Policy requires prior permission for links (read live 2026-11-08); no alternative scholarly source was found, only newspaper features. Add detail only after permission is granted or a reputable alternative is read.",
        "OPTIONAL: Nepal’s Pashupatinath temple (Britannica) is omitted because that article’s own URL was not recorded. The Pluralism essay is undated, so US examples are generic and name no temple.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Maha Shivaratri away from home",
      body: [
        "You can keep Maha Shivaratri meaningfully in a residence hall with a few simple choices.",
        "Find your people. Ask a Hindu or Indian student association or a nearby Shiva temple whether it holds an evening observance or an all-night vigil.",
        "Worship without a flame. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract. A small image or lingam with a bowl of water, flowers and leaves needs no flame. If you have questions about religious accommodations, ask your residence life office.",
        "Plan any vigil around your classes and your roommates.",
        "Fasting practices vary by family and tradition.",
        "Stay connected. A video call with family, or a shared meal afterward, keeps you part of the celebration.",
      ].join("\n\n"),
      sourceIds: ["dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. A small lingam or image is an editorial suggestion.",
        "OPTIONAL: no Atlanta-area temple or student group has been verified, so none is named.",
      ],
    },
  ],
};

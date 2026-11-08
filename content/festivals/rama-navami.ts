import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Rama Navami: P3-05 Batch A: REVIEWED 2026-11-08 (owner-approved editorial revision 3; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/rama-navami.md. No dates anywhere in this file. `reviewNotes` are internal and never
 * published.
 */

const VALMIKI_TERMS =
  "Terms review: personal site; the pages carry a translator’s copyright line and no terms page was found. Content of the passages was read in full. We summarise in our own words and link; nothing is quoted.";

const sources: readonly ContentSource[] = [
  britannica({
    id: "rama-brit",
    title: "Rama Navami",
    url: "https://www.britannica.com/topic/Rama-Navami",
    claimsSupported: [
      "Birthday of Rama on the ninth day of Chaitra and the last day of spring (vasanta) Navratri; Rama as the seventh avatar of Vishnu",
      "Rama's birth as told in the Ramayana; observances: cleaning, bathing, murti and cradle, temple worship, fasts, readings, Ramlila, processions",
      "In southern India the day is the wedding anniversary of Rama and Sita (kalyanotsavam); Ayodhya celebrates with particular pomp",
    ],
  }),
  source({
    id: "rama-brandeis",
    kind: "academic",
    title: "Ram Navami (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/ram-navami.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["Birth of Rama, an incarnation of Vishnu; Rama's qualities; worshipped with Sita, Lakshmana and Hanuman; reading the Ramayana and staging Ram Lila"],
    termsChecked: false,
    termsNote: "Content read in a browser (the fetch tool was refused). Terms review: not done.",
  }),
  source({
    id: "rama-pluralism",
    kind: "academic",
    title: "Rama, Sita, Hanuman",
    url: "https://pluralism.org/rama-sita-hanuman",
    publisher: "The Pluralism Project, Harvard University",
    claimsSupported: [
      "Rama as a righteous king and a human incarnation of Vishnu; the wedding of Rama and Sita re-enacted at a Michigan temple with sponsoring families",
      "Hanuman as Rama's devoted servant, always at his altar and in many ways worshipped more widely than Rama",
    ],
    termsChecked: false,
    termsNote: "Terms review: no terms page found (only a Harvard copyright-reporting link); unchecked. Content read in a browser (first part) after the fetch tool was refused; an undated essay.",
  }),
  source({
    id: "rama-ht-2010",
    kind: "cultural",
    title: "Festivals: Rama Navami",
    url: "https://www.hinduismtoday.com/magazine/april-may-june-2010/2010-04-festivals-rama-navami/",
    publisher: "Hinduism Today (Himalayan Academy)",
    claimsSupported: [
      "Birthday of Rama on the ninth day of the waxing moon in Chaitra; cradles, non-stop Ramayana reading, Ramlila, singing, charity",
      "Panaka and spiced buttermilk served at temples; khoa at some; especially popular in Uttar Pradesh; wedding anniversary in South India",
    ],
    termsChecked: true,
    termsNote: "Terms of Service read 2026-11-08: content is owned by Himalayan Academy and may not be published, displayed or turned into derivative works without permission except as copyright law allows; summarising and linking are not addressed. We paraphrase and link only. A 2010 pager with several unsourced generalisations.",
  }),
  source({
    id: "rama-valmiki-16",
    kind: "text",
    title: "Valmiki Ramayana, Bala Kanda sarga 16: the payasa (prose translation by Desiraju Hanumanta Rao)",
    url: "https://www.valmikiramayan.net/baala/sarga16/bala_16_prose.htm",
    publisher: "valmikiramayan.net (Bala Kanda translated by Desiraju Hanumanta Rao)",
    claimsSupported: ["A divine being gives Dasharatha a vessel of payasa to share among his queens"],
    termsChecked: false,
    termsNote: VALMIKI_TERMS,
  }),
  source({
    id: "rama-valmiki-18",
    kind: "text",
    title: "Valmiki Ramayana, Bala Kanda sarga 18: the birth of Rama (prose translation by Desiraju Hanumanta Rao)",
    url: "https://www.valmikiramayan.net/baala/sarga18/bala_18_prose.htm",
    publisher: "valmikiramayan.net (Bala Kanda translated by Desiraju Hanumanta Rao)",
    claimsSupported: ["Rama born in Chaitra on the ninth day under Punarvasu; the births of Bharata, Lakshmana and Shatrughna; rejoicing in Ayodhya; the text names no festival"],
    termsChecked: false,
    termsNote: VALMIKI_TERMS,
  }),
  ...dormSources,
];

export const ramaNavami: FestivalRecord = {
  slug: "rama-navami",
  name: "Rama Navami",
  aliases: ["Ram Navami", "Sri Rama Navami"],
  // BASICS (P3-05, reviewed 2026-11-08). The subtitle is the existing wording; aliases and the Sita and Hanuman
  // search terms are new proposals.
  subtitle: "A festival honoring the birth of Rama",
  deities: ["Rama", "Sita", "Hanuman"],
  basics: { status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“Ninth of Rama”: the birthday of Rama, hero of the Ramayana, on the ninth day of the bright half of the month of Chaitra and the last day of spring Navaratri.",
      sourceIds: ["rama-brit", "rama-ht-2010", "rama-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "One day, the ninth and final day of spring Navaratri.",
      sourceIds: ["rama-brit"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Rama, worshipped with his wife Sita, his brother Lakshmana and his devotee Hanuman.",
      tradition: "Vaishnava and wider Hindu traditions",
      sourceIds: ["rama-brandeis", "rama-pluralism", "rama-brit"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "Cleaning and bathing, worship at home and in the temple, a cradle for baby Rama, readings of the Ramayana, Ramlila, processions, and in southern India a symbolic wedding of Rama and Sita.",
      sourceIds: ["rama-brit", "rama-ht-2010", "rama-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Signature foods",
      text: "Panaka, a sweet jaggery drink, and spiced buttermilk, served to the public at some temples.",
      tradition: "Some temples",
      sourceIds: ["rama-ht-2010"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: ["SOURCE NOTE: one magazine page, with no region given; kosambari and neer mor appear only on a weak blog and are not used."],
    },
  ],

  deityEntries: [
    {
      name: "Rama",
      role: "The hero of the Ramayana and righteous king of Ayodhya, regarded as the seventh avatar of Vishnu, whose birth the day celebrates.",
      tradition: "Vaishnava and wider Hindu traditions",
      sourceIds: ["rama-brit", "rama-brandeis", "rama-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: ["SOURCE NOTE: the avatar framing belongs to Vaishnava thought; no reputable source read describes differences among Vaishnava traditions, so none are claimed."],
    },
    {
      name: "Sita",
      role: "Rama’s wife, whose wedding to Rama is re-enacted at many temples, especially in southern India.",
      tradition: "South India and the diaspora",
      sourceIds: ["rama-brit", "rama-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Hanuman",
      role: "Rama’s devoted servant, shown on bended knee at Rama’s altar; in many ways he is worshipped more widely than Rama himself.",
      tradition: "Hindu traditions across India",
      sourceIds: ["rama-pluralism", "rama-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Rama Navami?",
      body: [
        "Rama Navami celebrates the birth of Rama, the hero of the Ramayana, on the ninth day of the bright half of the month of Chaitra. It is the ninth and last day of the spring Navaratri. Vaishnavas and many other Hindus honor Rama as an avatar of Vishnu and as the righteous king of Ayodhya whose life the Ramayana tells.",
        "Families clean their homes, bathe and worship, and some rock a small image of baby Rama in a cradle. Temples hold readings of the Ramayana, dramas of Rama’s story and processions and, especially in southern India, a symbolic wedding of Rama and Sita. The day is a reminder of the qualities for which Rama is admired: courage, kindness, justice and devotion to duty.",
      ].join("\n\n"),
      sourceIds: ["rama-brit", "rama-brandeis", "rama-pluralism", "rama-ht-2010"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: core summary rests on Britannica plus Brandeis, the Pluralism Project and Hinduism Today (separate publishers).",
        "EDITORIAL: owner decision 2026-11-08: Ayodhya’s religious significance is included without commentary on contemporary politics; Britannica’s “Political dimensions” section is intentionally not summarised.",
      ],
    },
    {
      kind: "story",
      title: "Rama’s birth in the Ramayana",
      tradition: "Valmiki Ramayana",
      body: [
        "The Ramayana of Valmiki tells how King Dasharatha of Ayodhya, who had no son, performed a great sacrifice to ask for heirs. At the same time, the gods, threatened by the demon king Ravana, asked Vishnu to be born as a human to defeat him. A divine being rose from the sacrificial fire with a vessel of payasa, a sweet milk-and-rice dish, which Dasharatha shared among his three queens. In time, Rama was born to Kausalya, Bharata to Kaikeyi, and the twins Lakshmana and Shatrughna to Sumitra. The text places Rama’s birth in the month of Chaitra, on the ninth day, under the star Punarvasu.",
        "The epic describes the rejoicing in Ayodhya at the births.",
      ].join("\n\n"),
      sourceIds: ["rama-valmiki-16", "rama-valmiki-18", "rama-brit"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Valmiki’s Bala Kanda sargas 16 and 18 were read directly; the site credits the Bala Kanda translation to Desiraju Hanumanta Rao (Murthy translated the Ayodhya, Sundara and Yuddha Kandas). Britannica and the Valmiki prose differ on the fractions of the payasa, so none are stated; the translator’s notes say the order of the four births is debated.",
        "EDITORIAL: owner direction 2026-11-08: the earlier sentence inferring that the festival arose later, because the cited passages name no festival, was removed; the guide makes no claim about the festival’s origin.",
      ],
    },
    {
      kind: "significance",
      title: "The last day of spring Navaratri",
      body: [
        "Rama Navami is the ninth and final day of the spring Navaratri, also called Chaitra or Vasanta Navaratri. It is the spring counterpart of the nine nights of Navaratri that are more widely celebrated in the autumn, and in the spring Navaratri the goddess Durga is worshipped in her nine forms.",
      ].join("\n\n"),
      sourceIds: ["rama-brit"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: single source for the spring Navaratri link, Britannica (which says Durga is worshipped in nine forms and that autumn is the more popular Navaratri); Hinduism Today’s “sometimes observed for nine days before or after navami” is unexplained and not used. The Navaratri guide covers the autumn festival and the Ugadi guide mentions the spring one; wording is kept consistent.",
      ],
    },
    {
      kind: "rituals",
      title: "A day of worship at home and in the temple",
      body: [
        "Many people begin the day by cleaning the home and bathing, then worship at home, bathing a murti of Rama. Some place a murti of the child Rama in a cradle and rock it. Devotees visit temples to see and be seen by the deity, and many fast or eat only fruit or simple offerings and recite mantras to Rama.",
        "The Ramayana, or another telling of Rama’s life such as Tulsidas’s Ramcharitmanas, is read or recited aloud, sometimes without a break, and Ramlilas, dramatic retellings of Rama’s story, are staged. Temples carry murtis in procession around their grounds, and devotees sing and give to charity.",
        "Hindus regard Ayodhya as Rama’s birthplace and childhood home, and the city celebrates Rama Navami with particular pomp. The festival is especially popular in Uttar Pradesh, where Ayodhya lies.",
      ].join("\n\n"),
      sourceIds: ["rama-brit", "rama-ht-2010", "rama-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Hinduism Today adds that it is common to stay awake all night; that generalisation is unattributed and is left out.",
        "EDITORIAL: owner direction 2026-11-08: the former “Ayodhya and northern India” section is folded in here, kept to Ayodhya’s religious significance with no contemporary political commentary; Britannica’s “Political dimensions” section is intentionally not summarised.",
        "OPTIONAL: the Ramcharitmanas passage on Rama’s birth was not found in a readable English translation.",
      ],
    },
    {
      kind: "regional_variation",
      title: "The wedding of Rama and Sita",
      tradition: "South India and American temples",
      body: [
        "In southern India, many people regard Rama Navami as the wedding anniversary of Rama and Sita. At temples, priests perform a symbolic wedding, called a kalyanotsavam, and the murtis of Rama and Sita are carried in procession.",
        "In the United States, at one Michigan temple, families of the congregation sponsor the wedding as the families of the bride and the groom.",
      ].join("\n\n"),
      sourceIds: ["rama-brit", "rama-ht-2010", "rama-pluralism"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: owner direction 2026-11-08: the detailed Michigan example was shortened to one sentence.",
        "OPTIONAL: Bhadrachalam (Telangana) is not named: the only readable source was a promotional newspaper article, and the official temple site could not be reached (a domain tried redirected to an unrelated business; do not link it).",
        "SOURCE NOTE: the Pluralism essay is undated and describes one temple, so the American example is generic and names no temple. Other traditions mark the wedding on Vivaha Panchami; no reputable source read says so, so it is not mentioned.",
      ],
    },
    {
      kind: "fasting",
      title: "Fasting and food",
      tradition: "Varies by tradition and family",
      body: [
        "Many devotees fast on Rama Navami, and some eat only fruit or simple offerings. Hinduism Today describes temples that mark the day by serving panaka, a sweet drink made with jaggery, lime, ginger and cardamom, and spiced buttermilk to the public, and some that prepare sweets such as khoa. Fasting practices vary by family and tradition.",
      ].join("\n\n"),
      sourceIds: ["rama-brit", "rama-ht-2010"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: no vegetarian rule and no medical advice. A Gaudiya “fast until sunset” rule and a food list from a non-reputable blog are not used; Hinduism Today gives no region for panaka, so “at some temples” is used.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Rama Navami away from home",
      body: [
        "Rama Navami can be marked simply, even in a small room.",
        "Find your people. Ask a Hindu or Indian student association or a nearby temple whether it holds a Rama Navami program, a Ramayana reading or a Sita Rama kalyanam.",
        "Worship without a flame. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract. A battery-powered lamp is a safer way to light a small shrine. If you have questions about religious accommodations, ask your residence life office.",
        "Make a small cradle. A picture or small figure of baby Rama in a simple cradle is a way to join the day’s custom.",
        "Read together. Read a passage of the Ramayana aloud, or sing a bhajan with friends or over a video call with family.",
        "Fasting practices vary by family and tradition.",
      ].join("\n\n"),
      sourceIds: ["dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. The simple cradle and the reading are editorial ideas.",
        "OPTIONAL: no Atlanta-area temple or student group has been verified, so none is named.",
      ],
    },
  ],
};

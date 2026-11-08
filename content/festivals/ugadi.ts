import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * Ugadi: P3-03 DRAFT. Every section below is `draft`: nothing here reaches a public page until the
 * owner reviews it and flips the status (the loader is fail-closed). Source pack:
 * docs/research/cultural/ugadi.md, plus additional Telugu sources found in P3-03 (listed below).
 * No dates anywhere in this file. `termsChecked` is false on purpose (owner confirms reuse terms).
 */

const ACCESSED = "2026-11-07";

const sources: readonly ContentSource[] = [
  {
    id: "ugadi-britannica",
    role: "cultural",
    kind: "cultural",
    title: "Ugadi",
    url: "https://www.britannica.com/topic/Ugadi",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Ugadi is the new year in Andhra Pradesh, Telangana and Karnataka; Gudi Padwa in Maharashtra and Goa",
      "Falls on the first day of Chaitra in the amanta calendar; spring and planting; yuga + adi",
      "Association with Brahma's creation 'according to some Hindu texts'",
      "Oil bath, new clothes, puja, rangoli, temple visit and panchanga sravanam",
      "Ugadi pachadi ingredients and meaning; bevu-bella in Karnataka",
      "Gudi Padwa flag; Chaitra Navaratri and Rama Navami on the same lunar sequence",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "ugadi-telangana-today",
    role: "cultural",
    kind: "cultural",
    title: "Ugadi: The beginning of a new year and a new hope",
    url: "https://telanganatoday.com/ugadi-the-beginning-of-a-new-year-and-a-new-hope",
    publisher: "Telangana Today (newspaper, Hyderabad; essay by Pratyusha Sista, March 2025)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Telugu calendar with a sixty-year cycle of named years",
      "Morning customs: cleaning, mango-leaf toranalu, oil bath, new clothes, muggu, temple visits, Panchanga Shravanam",
      "Ugadi pachadi ingredients and a taste-by-taste meaning",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Only a privacy policy found. Unchecked.",
  },
  {
    id: "ugadi-hans-india",
    role: "cultural",
    kind: "cultural",
    title: "Significance of Ugadi 2021",
    url: "https://www.thehansindia.com/life-style/spiritual/significance-of-ugadi-2021-681493",
    publisher: "The Hans India (newspaper, Hyderabad)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Oil bath; rangoli or kolam; mango-leaf torans; Panchanga Sravanam at temples and by cultural organizations",
      "Ugadi pachadi in Andhra Pradesh, bevu-bella in Karnataka; a jaggery and neem version more popular with Kannadigas",
      "Spring, neem blossoms, farmers and the new farming cycle; the day is considered good for new ventures",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms link found. Unchecked.",
  },
  {
    id: "ugadi-deccan-chronicle",
    role: "cultural",
    kind: "cultural",
    title: "Ugadi celebrated with religious fervour at Tirumala and Tirupati temples",
    url: "https://www.deccanchronicle.com/southern-states/andhra-pradesh/ugadi-celebrated-with-religious-fervour-at-tirumala-and-tirupati-temples-1869869",
    publisher: "Deccan Chronicle (newspaper), March 2025",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Ugadi Asthanam and Panchanga Sravanam at the Tirumala temple; household oil baths, rangoli and ugadi pachadi",
      "Ugadi pachadi described as six flavors standing for different aspects of life",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms link found. Unchecked.",
  },
  {
    id: "ugadi-htcs-temple",
    role: "cultural",
    kind: "temple",
    title: "Ugadi (Sri Venkateswara Temple)",
    url: "https://htcsusa.org/ugadi/",
    publisher: "Sri Venkateswara (Balaji) Temple, htcsusa.org (US temple)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Meaning of the name; start of a lunar year and of spring; Gudi Padwa in Maharashtra",
      "Panchanga Shravana recited in Telugu and Kannada at the temple; temple abhishekams",
      "Ugadi pachadi described with neem flowers, honey and sugar among ingredients",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Small temple site; no terms page found. Unchecked.",
  },
  {
    id: "ugadi-htci-temple",
    role: "cultural",
    kind: "temple",
    title: "Ugadi and Gudi Padwa (New year)",
    url: "https://htci.org/events/ugadi-gudi-padwa-new-year",
    publisher: "HTCI (htci.org), a US Hindu temple",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Ugadi as the traditional new year in Andhra Pradesh, Telangana and Karnataka; Gudi Padwa for Marathi and Konkani communities",
      "Panchanga Sravanam recited by a priest; Vasanta Navaratri begins on the same day",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Small temple site; not checked.",
  },
  {
    id: "ugadi-sahms",
    role: "cultural",
    kind: "cultural",
    title: "Ugadhi (Telugu New Year)",
    url: "https://sahms.org.za/2021/01/06/ugadhi-telugu-new-year/",
    publisher: "South African Hindu Maha Sabha",
    accessedAt: ACCESSED,
    claimsSupported: ["The day is regarded as the day Brahma created the universe", "Name from yuga and aadi; first day of Chaitra in the waxing fortnight"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found. Unchecked.",
  },
  {
    id: "ugadi-karnataka-tourism",
    role: "cultural",
    kind: "cultural",
    title: "Ugadi 2026 in Karnataka: Traditions, Celebrations and More",
    url: "https://karnatakatourism.org/en/blogs/ugadi-in-karnataka",
    publisher: "Department of Tourism, Government of Karnataka",
    accessedAt: ACCESSED,
    claimsSupported: [
      "In Karnataka Ugadi is Yugadi, the Kannada new year",
      "Bevu-bella: neem flowers and jaggery eaten at the start of the day for life's bitter and sweet; ugadi pachadi is more popular in Andhra Pradesh and Telangana but made in many Karnataka homes",
      "Many Hindus believe Brahma began creation on this day",
      "Almanac reading includes predictions on planetary movements, agriculture, weather and fortune",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms and Conditions read 2026-11-07: all content is the department's property and unauthorized reproduction is prohibited; external links are permitted. We paraphrase and link only; no text or images copied.",
  },
  {
    id: "ugadi-eb1911",
    role: "cultural",
    kind: "text",
    title: "Hindu Chronology (Encyclopaedia Britannica, 11th edition, 1911), the sixty-year cycle of Jupiter",
    url: "https://en.wikisource.org/wiki/Page:EB1911_-_Volume_13.djvu/515",
    publisher: "Encyclopaedia Britannica, 11th edition (1911), via Wikisource",
    accessedAt: ACCESSED,
    claimsSupported: ["The Jupiter cycle in general use is a cycle of sixty years whose years bear special names such as Prabhava and Vibhava"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Published in 1911 (public domain); hosted by Wikisource. Used as a historical reference; details of the cycle differ between north and south India, so only the sixty names-years fact is used.",
  },
  {
    id: "dorm-appstate",
    role: "cultural",
    kind: "other",
    title: "Open Flame Policy (residence halls)",
    url: "https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy",
    publisher: "Appalachian State University",
    accessedAt: ACCESSED,
    claimsSupported: ["Residence halls can ban all open flames, including unlit candles and oil lamps"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  },
  {
    id: "dorm-uga",
    role: "cultural",
    kind: "other",
    title: "Community Guide 2026-2027 (residence halls)",
    url: "https://housing.uga.edu/community-guide/",
    publisher: "University of Georgia Housing",
    accessedAt: ACCESSED,
    claimsSupported: ["Candles, incense and open flames prohibited at this school; in-room cooking limited to certain sealed appliances"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  },
];

export const ugadi: FestivalRecord = {
  slug: "ugadi",
  name: "Ugadi",
  aliases: ["Yugadi"],
  // PROPOSED BASICS (P3-04B, still draft): subtitle widened from the Phase 2 placeholder to name the communities
  // (Telugu and Kannada). "Gudi Padwa" is deliberately NOT an alias: it is a separate Maharashtra and Goa festival.
  subtitle: "The new year for many Telugu and Kannada families",
  deities: ["Brahma"],
  basics: { status: "draft" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“The beginning of an age” (yuga plus adi). The new year for many Telugu and Kannada communities.",
      tradition: "Telugu and Kannada",
      sourceIds: ["ugadi-britannica", "ugadi-sahms"],
      status: "draft",
    },
    {
      label: "Length of observance",
      text: "One day, on the first day of the lunar month of Chaitra, at the start of spring.",
      sourceIds: ["ugadi-britannica", "ugadi-htcs-temple"],
      status: "draft",
    },
    {
      label: "Associated deities",
      text: "Brahma, in a traditional belief that the day marks the beginning of creation.",
      tradition: "Traditional belief",
      sourceIds: ["ugadi-britannica", "ugadi-sahms"],
      status: "draft",
    },
    {
      label: "Common customs",
      text: "An oil bath and new clothes, mango-leaf doorway decorations, muggu (rangoli), temple visits, listening to the year’s almanac (Panchanga Sravanam), and tasting ugadi pachadi.",
      sourceIds: ["ugadi-britannica", "ugadi-telangana-today", "ugadi-hans-india"],
      status: "draft",
    },
    {
      label: "Dietary practices",
      text: "Ugadi pachadi (Telugu) and bevu-bella (Kannada), mixes of sweet and bitter and other tastes whose ingredients vary by family and community.",
      tradition: "Telugu and Kannada",
      sourceIds: ["ugadi-britannica", "ugadi-hans-india", "ugadi-htcs-temple", "ugadi-karnataka-tourism"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: no fasting or vegetarian claim is made. SAHMS says feasts are 'satvik' in general terms; not used (over-generalised, single source).",
      ],
    },
  ],

  deityEntries: [
    {
      name: "Brahma",
      role: "The creator god. A traditional belief links Ugadi to the day he began creating the universe.",
      tradition: "Traditional belief, as Britannica (some Hindu texts) and community sources describe it",
      sourceIds: ["ugadi-britannica", "ugadi-sahms"],
      status: "draft",
      reviewNotes: ["EDITORIAL: not traced to a specific text; do not name one without verification (owner decision)."],
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Ugadi?",
      body:
        "Ugadi is the new year for many Telugu and Kannada families, and it arrives with spring, on the first day of the lunar month of Chaitra. The name joins yuga (an age) and adi (a beginning), so it means “the beginning of an age.”\n\n" +
        "The day starts with an oil bath and new clothes. Fresh mango leaves hang over the door, a muggu (rangoli) greets guests, and families head to the temple, listen to the year’s almanac and taste ugadi pachadi, a blend of sweet, bitter, sour and more that stands for everything a year can hold. The idea is to take the sweet and the bitter together. In Maharashtra and Goa, the same day is called Gudi Padwa.",
      sourceIds: ["ugadi-britannica", "ugadi-telangana-today", "ugadi-hans-india", "ugadi-htcs-temple"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: core summary rests on Britannica plus two Telugu newspapers and a US temple page (separate publishers).",
        "SOURCE NOTE: 'take the sweet and the bitter together' paraphrases The Hans India's reading of the pachadi.",
      ],
    },
    {
      kind: "significance",
      title: "A new year in spring",
      tradition: "Telugu and Kannada communities",
      body:
        "Ugadi falls on the first day of Chaitra in the lunar calendar followed in Telugu- and Kannada-speaking regions, where each month ends on the new moon. That makes it the first day of the waxing moon, which is said to symbolize growth.\n\n" +
        "It is a seasonal turning point too, the start of spring and the planting season. In the Telugu calendar, years run in a cycle of sixty, and every year has its own name, so each Ugadi comes with a new name to learn.\n\n" +
        "Many families also see the day as a good moment for a fresh start.",
      sourceIds: ["ugadi-britannica", "ugadi-telangana-today", "ugadi-hans-india", "ugadi-eb1911", "ugadi-htci-temple", "ugadi-htcs-temple", "ugadi-karnataka-tourism"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: the sixty-year cycle of named years is now supported by Telangana Today (Telugu context), The Hans India (year names in use) and the 1911 Britannica entry on Hindu chronology (a sixty-year Jupiter cycle with special names such as Prabhava). The mechanism and the count differ between north and south India, so the public text says only that years run in a cycle of sixty with their own names.",
        "SOURCE NOTE: spring and the planting season are from Britannica. 'A fresh start' is supported by two US temple pages (HTCI, Sri Venkateswara Temple) and Karnataka Tourism. The Hans India's neem-blossom, farmers-awaiting-showers and housewarming details were removed (single source).",
        "OPTIONAL: the popular Narada legend of the sixty names is left out (single newspaper source; needs a Purana check).",
      ],
    },
    {
      kind: "story",
      title: "Brahma and the beginning of time",
      tradition: "Traditional belief",
      body:
        "Many people link Ugadi to the very first morning of creation. According to a traditional belief, this is the day the god Brahma began creating the universe, which fits a festival whose name means “the beginning of an age.”",
      sourceIds: ["ugadi-britannica", "ugadi-sahms", "ugadi-karnataka-tourism"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: owner decision: traditional belief with attribution; the historical-record disclaimer was removed from the public text (owner direction) and no specific text is named. Supported by Britannica ('some Hindu texts'), Karnataka Tourism ('many Hindus believe') and SAHMS.",
        "SOURCE NOTE: Britannica says 'according to some Hindu texts'; a popular magazine cites the Brahma Purana without a passage. OPTIONAL: Kane, History of Dharmasastra (candidate, unverified).",
      ],
    },
    {
      kind: "rituals",
      title: "How the day unfolds",
      tradition: "Telugu and Kannada households",
      body:
        "Fresh start. Homes are cleaned, and the morning begins with a traditional oil bath and new clothes.\n\n" +
        "Mango leaves and muggu. Strings of mango leaves (toranalu) hang over doors, and muggu, also called rangoli or kolam, is drawn at the entrance.\n\n" +
        "Temple and prayer. Many families visit a temple and offer prayers.\n\n" +
        "The year’s almanac. Families often hear the panchangam, the traditional almanac, read aloud at a temple or by a respected elder. This is Panchanga Sravanam, and it includes the year’s forecasts, such as weather, harvests and general fortune.",
      sourceIds: ["ugadi-britannica", "ugadi-telangana-today", "ugadi-hans-india", "ugadi-htcs-temple", "ugadi-htci-temple", "ugadi-karnataka-tourism"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: temple-ceremony specifics (Tirumala's Ugadi Asthanam, US temples reading in two languages) were removed as non-essential (owner direction). Source IDs ugadi-deccan-chronicle and the US temple pages are kept for the claims they still support.",
        "SOURCE NOTE: the forecast areas (weather, harvests, general fortune) draw on Karnataka Tourism, The Hans India and a temple page; Britannica says only that people hear the almanac recited.",
      ],
    },
    {
      kind: "food",
      title: "Ugadi pachadi: the taste of a year (Telugu)",
      tradition: "Telugu",
      body:
        "Ugadi pachadi is the dish most closely tied to the day, and in many Telugu homes it is the first thing eaten. It blends several tastes, and the usual lineup is jaggery (sweet), raw mango (tangy), tamarind (sour), neem flowers (bitter), chili (spicy) and salt. Families make it their own way, though. One temple’s version includes honey and sugar.\n\n" +
        "The idea is that a year holds all kinds of experiences, and you taste them together. In one popular reading, jaggery stands for joy, neem for hardship, raw mango for surprise, tamarind for disappointment, chili for anger or passion, and salt for balance. Other families read the tastes a little differently. There is also a playful belief that if you get more neem in your bite your year will be bitter, and if you get more jaggery it will be sweet.",
      sourceIds: ["ugadi-britannica", "ugadi-telangana-today", "ugadi-hans-india", "ugadi-htcs-temple", "ugadi-deccan-chronicle"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: ingredient lists and taste meanings differ across Britannica, Telangana Today, The Hans India, a US temple page and Deccan Chronicle (which lists six flavors without ingredients); the public text says families vary.",
        "OPTIONAL: whether the dish is attested in older sources is unverified (candidate: Achaya, Indian Food: A Historical Companion). No fasting information was found, so no fasting section is drafted.",
      ],
    },
    {
      kind: "food",
      title: "Bevu-bella in Karnataka (Kannada)",
      tradition: "Kannada",
      body:
        "In Karnataka, the signature custom is bevu-bella, “neem and jaggery.” Neem flowers stand for the bitter and jaggery for the sweet, and families eat the mixture early in the day as a reminder that life holds both joy and hardship. Ugadi pachadi, the fuller multi-flavored mix, is especially popular in Andhra Pradesh and Telangana, though many Karnataka homes make it too, and some families use the name bevu-bella for that fuller mix as well.",
      sourceIds: ["ugadi-karnataka-tourism", "ugadi-britannica", "ugadi-hans-india"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: resolved with a Kannada-region source. Karnataka Tourism (Government of Karnataka) describes bevu-bella as a simple neem-and-jaggery mixture and says ugadi pachadi is more popular in Andhra Pradesh and Telangana but also made in many Karnataka households; The Hans India agrees (jaggery-and-neem version more popular with Kannadigas). Britannica uses 'bevu-bella' as the Karnataka name for ugadi pachadi itself, so the public text acknowledges both usages.",
        "OPTIONAL: a Kannada temple source would add further confirmation.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Ugadi, Gudi Padwa and Chaitra Navaratri",
      tradition: "Telugu, Kannada, Marathi and Konkani communities",
      body:
        "In Maharashtra and Goa, Marathi and Konkani communities celebrate the same day as Gudi Padwa. Their signature custom is the gudi: a cloth tied to a tall stick, topped with an upturned pot, neem and mango leaves and flowers, raised outside the home as a sign of victory and good fortune.\n\n" +
        "Elsewhere in India, the same lunar day begins Chaitra Navaratri, a spring version of Navaratri whose ninth day is Rama Navami. Because communities begin their year at different times, Ugadi is the new year for Telugu and Kannada families, not for every Hindu.",
      sourceIds: ["ugadi-britannica", "ugadi-htci-temple", "ugadi-hans-india"],
      status: "draft",
      reviewNotes: [
        "OPTIONAL: no cultural source read covers Tamil Puthandu, Vishu or Baisakhi, so they are not mentioned.",
        "SOURCE NOTE: the flag's 'victory' meaning is Britannica's; a popular magazine adds a Maratha link, omitted (single source).",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Ugadi away from home",
      body:
        "Ugadi can slip by on a busy weekday, so give it a little plan.\n\n" +
        "Find your people. Look for a Telugu or Kannada student association, or ask whether a nearby temple has a program. If you do not have a community nearby, invite friends over and tell them what Ugadi means to your family.\n\n" +
        "Make a small pachadi. There is no single recipe, so a simple version in the spirit of the dish is fine. Ask a family member or a local Indian grocery what is available, since neem flowers can be hard to find. Cooking in dorm rooms is often restricted, so use a shared kitchen if your housing allows.\n\n" +
        "Decorate the doorway. Draw a muggu on paper or poster board for your door or desk. If fresh mango leaves are hard to find, a paper or cloth toran does the job.\n\n" +
        "Start something new. Pick one small goal for the year.\n\n" +
        "Call home. Ask a relative to read out the year’s panchangam, or just call and hear how everyone is celebrating.\n\n" +
        "If you want to light a lamp or incense, check your housing rules first. Many residence halls ban open flames, and a battery-powered lamp is a safer choice.",
      sourceIds: ["dorm-appstate", "dorm-uga", "ugadi-hans-india", "ugadi-htcs-temple"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. Mango-leaf and neem-flower availability is common knowledge, not sourced.",
        "OPTIONAL: no Atlanta-area Telugu or Kannada organization has been verified, so none is named.",
      ],
    },
  ],
};

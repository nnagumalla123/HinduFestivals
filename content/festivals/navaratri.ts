import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * Navaratri (Sharad Navaratri): P3-03 DRAFT. Every section below is `draft`: nothing here reaches a
 * public page until the owner reviews it and flips the status (the loader is fail-closed). Source pack:
 * docs/research/cultural/navaratri.md. Vijayadashami is a separate guide. No dates anywhere in this
 * file. `termsChecked` is false on purpose (owner confirms reuse terms).
 */

const ACCESSED = "2026-11-07";

const sources: readonly ContentSource[] = [
  {
    id: "navaratri-britannica",
    role: "cultural",
    kind: "cultural",
    title: "Navratri",
    url: "https://www.britannica.com/topic/Navratri",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Nine nights honoring the divine feminine; the nine forms of Durga; four Navaratris a year, Sharad the most widely observed",
      "Three phases: Durga, Lakshmi, Saraswati; Kanya Puja; bhog; fasting and sattvic eating vary",
      "Durga Puja, garba and dandiya, Golu and Ayudha Puja, Ramlila",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "navaratri-britannica-durga",
    role: "cultural",
    kind: "cultural",
    title: "Durga",
    url: "https://www.britannica.com/topic/Durga",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Durga created by the gods to defeat Mahishasura; the boon; the weapons; nine days of shape-shifting and the tenth-day victory",
      "The Devi Mahatmya (Markandeya Purana) and the Devi Bhagavata Purana as texts devoted to the goddess",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "navaratri-britannica-vijayadashami",
    role: "cultural",
    kind: "cultural",
    title: "Vijayadashami",
    url: "https://www.britannica.com/topic/Vijayadashami",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Durga Puja in Bengal and eastern India: pandals, final-day rites, immersion, sindoor khela",
      "A Bengali cultural belief (not rooted in scripture) that Durga visits her parental home",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "navaratri-britannica-durga-puja",
    role: "cultural",
    kind: "cultural",
    title: "Durga Puja",
    url: "https://www.britannica.com/topic/Durga-Puja",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Durga Puja is traditionally a ten-day festival that begins on the same day as Navaratri; the first day is Mahalaya, worship begins on Shashthi, and the last five days are the primary period of veneration",
      "Celebrated particularly in West Bengal, Assam and other eastern states",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "navaratri-pluralism",
    role: "cultural",
    kind: "academic",
    title: "Navaratri",
    url: "https://pluralism.org/navaratri",
    publisher: "The Pluralism Project, Harvard University",
    accessedAt: ACCESSED,
    claimsSupported: ["Navaratri as nine nights, also called Durga Puja; American Hindus observe it in varied ways, including large public garba celebrations"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found (only a Harvard copyright-infringement reporting link). Unchecked.",
  },
  {
    id: "navaratri-hpi",
    role: "cultural",
    kind: "cultural",
    title: "What Is Navaratri, the Hindu Festival of Nine Nights?",
    url: "https://www.hinduismtoday.com/hpi/2025/09/26/what-is-navaratri-the-hindu-festival-of-nine-nights/",
    publisher: "Hindu Press International (Hinduism Today)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Nine nights for the divine feminine; Durga, Lakshmi and Saraswati phases as power, prosperity and wisdom",
      "Garba in Gujarat; Golu in some southern states; fasting and kanya puja in North India; Durga Puja in Bengal",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found; footer shows copyright. Unchecked.",
  },
  {
    id: "navaratri-hinduism-today-tamil",
    role: "cultural",
    kind: "cultural",
    title: "Celebrating Navaratri, Tamil Style",
    url: "https://www.hinduismtoday.com/magazine/apr-may-jun-2023/celebrating-navaratri-tamil-style/",
    publisher: "Hinduism Today (a family account by a young writer in Texas)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "A Tamil family's Golu and guests; prasadam and betel leaf",
      "Fasting is one way to celebrate, not how everybody observes the festival",
      "Honoring girls and women as forms of the goddess in Tamil homes; Saraswati puja with books and instruments",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found; footer shows copyright. Unchecked.",
  },
  {
    id: "navaratri-rkt-temple",
    role: "cultural",
    kind: "temple",
    title: "Navratri Fasting: Significance, Allowed Foods and Vrat Recipes",
    url: "https://www.radhakrishnatemple.net/blog/navaratri-fasting-2025/",
    publisher: "Radha Krishna Temple (temple blog)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Fasting practice varies by region: many in the north keep a stricter fast, some only on the first and last days; the south focuses more on vegetarian feasts",
      "Foods commonly eaten in a fast: sabudana, kuttu, rajgira, sama rice, makhana, paneer, yogurt, nuts; rock salt instead of table salt",
      "Durga Puja principal celebration days described as the five from Shashthi to Vijaya Dashami",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms found; blog footer shows copyright. Unchecked. No longer cited in any section: its fasting-food examples and regional claims could not be verified.",
  },
  {
    id: "navaratri-devi-mahatmya",
    role: "cultural",
    kind: "text",
    title: "Markandeya Purana, Devi-Mahatmya (Pargiter translation), cantos 82, 91, 92 and 93",
    url: "https://www.wisdomlib.org/hinduism/book/the-markandeya-purana",
    publisher: "Wisdomlib (public-domain Pargiter translation)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "The gods' combined energies form the goddess, who is armed and sent against Mahisha's armies",
      "A passage mentions a great annual worship of the goddess in autumn without naming Navaratri",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Not checked (Pargiter’s old translation is hosted by Wisdomlib).",
  },
  {
    id: "dorm-appstate",
    role: "cultural",
    kind: "other",
    title: "Open Flame Policy (residence halls)",
    url: "https://appsafety.appstate.edu/safety/fire-and-life-safety/open-flame-policy",
    publisher: "Appalachian State University",
    accessedAt: ACCESSED,
    claimsSupported: ["Residence halls can ban all open flames, including unlit candles, incense and oil lamps"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  },
  {
    id: "dorm-dartmouth",
    role: "cultural",
    kind: "other",
    title: "Open Flame in Residence Halls",
    url: "https://campus-services.dartmouth.edu/policy/open-flame-residence-halls",
    publisher: "Dartmouth College",
    accessedAt: ACCESSED,
    claimsSupported: ["Some schools offer a pre-approved religious-observance exception for a flame"],
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
    claimsSupported: ["Candles, incense and open flames prohibited at this school; string lights also prohibited; in-room cooking limited to certain sealed appliances"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  },
];

export const navaratri: FestivalRecord = {
  slug: "navaratri",
  name: "Navaratri",
  aliases: ["Navratri"],
  // PROPOSED BASICS (P3-04B, still draft): the subtitle now says what the festival honors; the three deities
  // match the three-phase scheme described in the guide (other traditions use nine forms of Durga).
  subtitle: "Nine nights honoring the goddess",
  deities: ["Durga", "Lakshmi", "Saraswati"],
  basics: { status: "draft" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“Nine nights” (nava plus ratri), a festival honoring the divine feminine, centered on the goddess Durga.",
      sourceIds: ["navaratri-britannica", "navaratri-pluralism"],
      status: "draft",
    },
    {
      label: "Length of observance",
      text: "Nine nights, followed by the tenth day, Vijayadashami.",
      sourceIds: ["navaratri-britannica"],
      status: "draft",
      reviewNotes: ["OPTIONAL: Britannica adds that, following the lunar calendar, the festival can run eight days in some years; left out of public text."],
    },
    {
      label: "Associated deities",
      text: "Durga, honored in her nine forms in many traditions; in many others the nights go to Durga, Lakshmi and Saraswati in turn.",
      tradition: "Varies by tradition",
      sourceIds: ["navaratri-britannica", "navaratri-hpi"],
      status: "draft",
    },
    {
      label: "Common customs",
      text: "Worship of the goddess, garba and dandiya dancing, Durga Puja pavilions, Golu doll displays, honoring young girls (Kanya Puja), and for some, fasting.",
      sourceIds: ["navaratri-britannica", "navaratri-hpi"],
      status: "draft",
    },
    {
      label: "Dietary practices",
      text: "Many devotees eat simple vegetarian, sattvic food, and some fast. Fasting is optional and varies by region, family and person.",
      tradition: "Varies",
      sourceIds: ["navaratri-britannica", "navaratri-hpi", "navaratri-hinduism-today-tamil"],
      status: "draft",
    },
  ],

  deityEntries: [
    {
      name: "Durga",
      role: "The warrior goddess at the center of the festival, remembered for defeating the buffalo demon Mahishasura.",
      tradition: "Shakta and wider Hindu traditions",
      sourceIds: ["navaratri-britannica", "navaratri-britannica-durga", "navaratri-devi-mahatmya"],
      status: "draft",
    },
    {
      name: "Lakshmi",
      role: "Goddess of prosperity, honored in many traditions during the middle three nights.",
      tradition: "Three-phase scheme (Durga, Lakshmi, Saraswati)",
      sourceIds: ["navaratri-britannica", "navaratri-hpi"],
      status: "draft",
    },
    {
      name: "Saraswati",
      role: "Goddess of knowledge and wisdom, honored in many traditions during the last three nights; books and instruments are honored on the ninth day in parts of South India.",
      tradition: "Three-phase scheme; South India (ninth day)",
      sourceIds: ["navaratri-britannica", "navaratri-hpi", "navaratri-hinduism-today-tamil"],
      status: "draft",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Navaratri?",
      body:
        "Navaratri, “nine nights,” is a festival of the divine feminine, centered on the goddess Durga and her many forms. It is a season of devotion, music and dance, and, for some families, fasting. It ends with Vijayadashami on the tenth day.\n\n" +
        "At its heart is the story of the goddess defeating the buffalo demon Mahishasura, remembered as the victory of good over evil. How people celebrate depends on where their family is from: Gujarat dances garba, Bengal builds grand Durga Puja pavilions, many South Indian families arrange dolls on stepped displays, and many homes honor young girls as the goddess herself. In many traditions the nights are shared among Durga, Lakshmi and Saraswati, for power, prosperity and wisdom.",
      sourceIds: ["navaratri-britannica", "navaratri-britannica-durga", "navaratri-hpi", "navaratri-pluralism"],
      status: "draft",
      reviewNotes: ["SOURCE NOTE: Britannica plus the HPI digest (Hinduism Today family, a short excerpt of a news article) and the Pluralism Project: separate publishers, but HPI adds little independent detail."],
    },
    {
      kind: "story",
      title: "Durga and Mahishasura",
      tradition: "Shakta tradition; the Devi Mahatmya",
      body:
        "The best-known Navaratri story comes from the Devi Mahatmya, an ancient text about the goddess. The buffalo demon Mahishasura, protected by a boon that no male could defeat him, had driven the gods from heaven. Unable to beat him, the gods pooled their powers to create a warrior goddess, Durga, and armed her with their own weapons. She rode a lion into battle and defeated him.\n\n" +
        "Many people connect that victory with the festival, and with Vijayadashami, the “victorious tenth.”",
      sourceIds: ["navaratri-britannica-durga", "navaratri-devi-mahatmya", "navaratri-hpi"],
      status: "draft",
      reviewNotes: [
        "OPTIONAL: verify Devi Mahatmya cantos 83 to 90 (where the killing is told; not read) before restoring any detail about the battle's length. The nine-day versus ten-day claim was removed from public text until then (owner direction). Sources disagree: Britannica (nine days of shape-shifting, victory on the tenth), Hinduism Today and BiblioAsia (ten-day battle), HPI (nine-day battle).",
        "SOURCE NOTE: cantos 82, 91, 92 and 93 (Pargiter translation) were read; they do not mention nine nights, Navaratri or Vijayadashami, though canto 92 mentions a great annual worship of the goddess in autumn. Siddha Yoga's claim that the text 'recounts the tradition of Navaratri' is not supported by the cantos read and is not used.",
        "OPTIONAL: 'ancient text' deliberately replaces Britannica's fifth or sixth century CE dating, which is single-source; add a second source before giving a century.",
      ],
    },
    {
      kind: "rituals",
      title: "Nine nights, three phases",
      body:
        "Many families divide the nights into three phases of three: the first for Durga, the second for Lakshmi, and the third for Saraswati, often seen as strength, prosperity and wisdom. Others worship nine forms of Durga, one for each night, with names like Shailaputri, Brahmacharini and Kalaratri. Which pattern a family follows varies.\n\n" +
        "A much-loved custom is Kanya Puja, or Kanjak, on the eighth or ninth day. Young girls are honored as forms of the goddess: invited into the home, their feet washed, an arti performed, and gifts given.",
      sourceIds: ["navaratri-britannica", "navaratri-hpi"],
      status: "draft",
      reviewNotes: [
        "OPTIONAL: Kanya Puja's regional attribution could not be verified: Britannica names no region, the HPI digest says North India, and a Tamil-family account also describes honoring girls and women. The public text therefore gives no region ('a much-loved custom'). Indian news and lifestyle pages describe the custom without a regional breakdown and were not used.",
        "EDITORIAL: Ayudha Puja moved to the Golu section and Ramlila pointers removed to cut repetition across sections.",
      ],
    },
    {
      kind: "fasting",
      title: "Fasting: optional, and different for everyone",
      tradition: "Varies by region, family and person",
      body:
        "Fasting is part of Navaratri for many people, but it is optional and takes many forms. Many devotees eat simple vegetarian (sattvic) meals and skip alcohol and strong spices, and some keep a daytime fast. In parts of North India many people fast. Many other families celebrate without fasting at all, and what any family does is shaped by its own tradition.",
      sourceIds: ["navaratri-britannica", "navaratri-hpi", "navaratri-hinduism-today-tamil"],
      status: "draft",
      reviewNotes: [
        "OPTIONAL: specific fasting foods (sabudana, buckwheat or amaranth flour, rock salt) and the regional split (first-and-last-day fasts, southern feasts) were removed because they rested on one temple blog (Radha Krishna Temple), which also stated its avoided-food list as universal and made health claims. A second reputable source (university, temple board or museum) would allow a short list to return.",
        "SOURCE NOTE: Britannica supports sattvic eating and daytime fasts; the HPI digest says 'many' in the north fast; a young Tamil-family writer says fasting is 'not how everybody observes' the festival.",
        "EDITORIAL: no medical advice is given.",
      ],
    },
    {
      kind: "food",
      title: "What is on the table",
      body:
        "Food is part of the worship as well as the fasting. At home, many devotees offer bhog, food prepared for the goddess, to her image. At Kanya Puja, the girls are traditionally served puri, semolina halva and black chickpeas.",
      sourceIds: ["navaratri-britannica"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: kept short and limited to what Britannica names (bhog; the Kanya Puja meal). Tamil-home prasadam and betel-leaf details were removed (they rested on two Tamil-family accounts, one of them BiblioAsia, which is dropped; see the source-use notes).",
        "OPTIONAL: a second source for the bhog and Kanya Puja meal would help. No vegetarian rule is stated for everyone.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Durga Puja in Bengal and eastern India",
      tradition: "Bengal and eastern India",
      body:
        "In West Bengal, Assam and other eastern states, Navaratri takes the form of Durga Puja. The festival is traditionally ten days long and opens with Mahalaya, which heralds the goddess’s arrival. Worship begins on the sixth day, Shashthi, and the last five days, through Vijayadashami, are the main period of veneration. Huge clay images of Durga fighting Mahishasura are installed in elaborately decorated pandals, or temporary pavilions, and in temples, and concerts, plays and fairs fill the days.\n\n" +
        "Vijayadashami brings the farewell. A mirror ritual marks the goddess’s presence leaving the image, married women apply vermilion to the goddess and to one another, and the images are carried in processions and immersed in water.\n\n" +
        "Many Bengalis cherish the belief that Durga comes home for these days to visit her family and then returns to her husband, Shiva. It is a beloved cultural tradition rather than something found in scripture.",
      sourceIds: ["navaratri-britannica", "navaratri-britannica-durga-puja", "navaratri-britannica-vijayadashami", "navaratri-pluralism"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: the ten-day span, Mahalaya as day one, worship beginning on Shashthi and the last five days as the primary period of veneration are stated in Britannica's Durga Puja article (a separate page from the Navratri and Vijayadashami articles, but the same publisher, so not independent confirmation).",
        "OPTIONAL: a Bengali cultural or religious source was not found. A MandirOnline page echoes the five-day pattern but appears derived from encyclopedia text and was not used. A Bengali association or cultural-institution page would give independent support.",
        "EDITORIAL: the clay-soil custom is intentionally omitted (owner decision).",
      ],
    },
    {
      kind: "regional_variation",
      title: "Garba and dandiya in Gujarat",
      tradition: "Gujarat and the Gujarati diaspora",
      body:
        "In Gujarat, Navaratri is closely tied to garba and dandiya raas, circle dances done in vibrant clothes, often around a lamp. Fairs and feasts bring neighborhoods together. In the United States, communities hold large public garba celebrations, and for many young people it is the easiest way to join in.",
      sourceIds: ["navaratri-britannica", "navaratri-hpi", "navaratri-pluralism"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: 'around a lamp' is from the HPI digest; Britannica says only that the dances are popular in Gujarat. Pluralism notes large public garba celebrations among American Hindus.",
        "EDITORIAL: 'the easiest way to join in' is editorial voice; soften if it feels like a claim.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Golu in South India",
      tradition: "Tamil Nadu, Andhra Pradesh, Telangana and Karnataka",
      body:
        "In parts of South India, families arrange dolls and figures on stepped platforms, usually in an odd number of tiers. The displays show deities and scenes from the Ramayana, and families invite friends and neighbors over to see them, exchange offerings and sing devotional songs. In Tamil it is called Bommai Golu.\n\n" +
        "The ninth day brings Ayudha Puja, when the goddesses Lakshmi, Saraswati and Parvati are worshipped and tools, instruments and books are cleaned, decorated and honored as the means of work and learning.",
      sourceIds: ["navaratri-britannica", "navaratri-hpi"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: rewritten to rely on Britannica (stepped platforms, odd tiers, Ramayana scenes, neighbors and offerings, Ayudha Puja) and the HPI digest (Golu in some southern states). Marapachi dolls, the kalasam position and 'every family does it differently' came from the Tamil-family accounts (Hinduism Today, BiblioAsia) and are removed.",
        "OPTIONAL: Telugu and Kannada names for the display (Bommala Koluvu, Gombe Habba) came only from a secondary page and are omitted.",
      ],
    },
    {
      kind: "traditional_guide",
      title: "Joining in",
      body:
        "There is no single right way to do Navaratri. Some people follow three goddesses over three phases and others the nine forms of Durga, some visit a temple and others dance garba, and some honor young girls at Kanya Puja or set up a Golu. A good way to start is to pick the thread that feels closest to your family and follow it for a night or two.",
      sourceIds: ["navaratri-britannica", "navaratri-hpi"],
      status: "draft",
      reviewNotes: ["EDITORIAL: deliberately short; it points back to the sections above instead of repeating them. Consider merging into the first Traditions section."],
    },
    {
      kind: "college_guide",
      title: "Celebrating Navaratri away from home",
      body:
        "Navaratri travels well, because so much of it is community and so much is up to you.\n\n" +
        "Find the dancing. Many cities and campuses hold garba and dandiya nights. Ask your Indian or Hindu student association, or look for a local temple or community event.\n\n" +
        "Build a mini Golu. A small display on a shelf, with a few figures or pictures, works. Invite friends over to see it, as families traditionally invite neighbors, and use a battery-powered lamp for light.\n\n" +
        "Check your housing rules. Many residence halls ban open flames, including candles, oil lamps and incense, and some limit decorations like string lights. Ask your residence life office before lighting or hanging anything, and ask rather than assume if you want to request an exception for religious observance.\n\n" +
        "Honor your tools. On the ninth day, you might tidy your desk, wipe down your laptop and place a flower by your books or instrument, in the spirit of Ayudha Puja and Saraswati worship.\n\n" +
        "If you choose to fast. Some people keep a full fast, some choose simple vegetarian meals, and many celebrate without fasting, so do whatever fits your family’s tradition and your own life. If you do change what you eat, your dining hall or a nearby Indian grocery can help with ingredients, and in-room cooking is often restricted.\n\n" +
        "Stay connected. A video call with family, or sharing a meal over a call, keeps you part of the celebration back home.",
      sourceIds: ["dorm-appstate", "dorm-dartmouth", "dorm-uga", "navaratri-pluralism", "navaratri-britannica"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. 'Honor your tools' adapts Britannica's description of Ayudha Puja and is an editorial suggestion.",
        "OPTIONAL: no specific campus event is promised.",
      ],
    },
  ],
};

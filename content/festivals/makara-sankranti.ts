import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Makara Sankranti (Britannica and most sources write Makar Sankranti): P3-05 Batch A: REVIEWED 2026-11-08 (owner-approved editorial revision 3; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/makar-sankranti.md. No dates anywhere in this file. `reviewNotes` are internal and
 * never published.
 */

const sources: readonly ContentSource[] = [
  britannica({
    id: "sankranti-brit-what",
    title: "What is Makar Sankranti? (and When does Makar Sankranti take place?)",
    url: "https://www.britannica.com/question/What-is-Makar-Sankranti",
    claimsSupported: [
      "Marks the Sun's entry into makara and the start of uttarayana; a harvest festival",
      "Customs: kites, sesame-jaggery sweets, rangoli, bonfires, offerings to Surya, ritual bathing",
      "Solar calendar, unlike most lunisolar Hindu holidays; once a winter-solstice holiday",
    ],
  }),
  britannica({
    id: "sankranti-brit-regional",
    title: "How do people celebrate Makar Sankranti in different parts of India?",
    url: "https://www.britannica.com/question/How-do-people-celebrate-Makar-Sankranti-in-different-parts-of-India",
    claimsSupported: [
      "Regional names and customs: Uttarayan, Til Sankranti, Poush Sankranti, Lohri, Pongal, Makaravilakku",
      "Bathing at Gangasagar and Prayagraj (Magh Mela, Kumbh Mela)",
    ],
  }),
  britannica({
    id: "sankranti-brit-kites",
    title: "Why do people fly kites during Makar Sankranti?",
    url: "https://www.britannica.com/question/Why-do-people-fly-kites-during-Makar-Sankranti",
    claimsSupported: ["Kite flying in Gujarat and Ahmedabad's International Kite Festival; the reasons offered for it are suggestions"],
  }),
  britannica({
    id: "sankranti-brit-pongal",
    title: "Pongal",
    url: "https://www.britannica.com/topic/Pongal",
    claimsSupported: [
      "Four-day Tamil harvest festival by the Tamil solar calendar; the four days and who each honors",
      "Name from Tamil for boiling over; ven and chakkara pongal; Sangam-age origin and Vedic first-fruit link (hedged)",
      "Uttarayana regarded as auspicious",
    ],
  }),
  britannica({
    id: "sankranti-brit-bihu",
    title: "What is Magh Bihu?",
    url: "https://www.britannica.com/question/What-is-Magh-Bihu",
    claimsSupported: ["Magh (Bhogali) Bihu: Assam's mid-winter harvest festival with feasts and a bonfire called the meji"],
  }),
  britannica({
    id: "sankranti-brit-lohri",
    title: "Lohri",
    url: "https://www.britannica.com/topic/Lohri",
    claimsSupported: [
      "Lohri in Punjab and neighboring states, with a bonfire at sunset, the evening before",
      "Its exact origin is unclear; a harvest festival",
    ],
  }),
  source({
    id: "sankranti-haf",
    kind: "cultural",
    title: "Lohri, Makar Sankranti, and Pongal: India’s winter harvest festivals",
    url: "https://www.hinduamerican.org/blog/lohri-makar-sankranti-and-pongal-indias-winter-harvest-festivals",
    publisher: "Hindu American Foundation",
    claimsSupported: [
      "Solar holiday for the Sun's northward transition, in honor of Surya; the six-month period seen as favorable for new undertakings",
      "Lohri observed by Hindus and Sikhs; two hedged explanations of the name",
      "Pongal's four days; Bhogi bonfire; cattle garlanded and fed; bathing in rivers",
    ],
    termsChecked: false,
    termsNote: "Terms review: no terms-of-use page found (a privacy policy only); footer shows copyright. Unchecked.",
  }),
  source({
    id: "sankranti-ht-2010",
    kind: "cultural",
    title: "Festivals: Sankranti or Pongal",
    url: "https://www.hinduismtoday.com/magazine/april-may-june-2010/2010-04-festivals-sankranti-or-pongal/",
    publisher: "Hinduism Today (Himalayan Academy)",
    claimsSupported: ["Four days of thanks to Indra, Surya, cattle and ancestors in the Tamil Pongal pattern; kolam; decorated cattle; sakkarai pongal"],
    termsChecked: true,
    termsNote: "Terms of Service read 2026-11-08: content is owned by Himalayan Academy and may not be published, displayed or turned into derivative works without permission except as copyright law allows; summarising and linking are not addressed. We paraphrase and link only.",
  }),
  source({
    id: "sankranti-brandeis",
    kind: "academic",
    title: "Makar Sankranti (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/makar-sankranti.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["Sankranti means transition; harvest festival; giving til sweets; some observers bathe in rivers"],
    termsChecked: false,
    termsNote: "Content read in a browser (the fetch tool was refused). Terms review: not done.",
  }),
  source({
    id: "sankranti-karnataka",
    kind: "cultural",
    title: "Sankranti in Karnataka",
    url: "https://karnatakatourism.org/en/blogs/sankranti-in-karnataka/",
    publisher: "Department of Tourism, Government of Karnataka",
    claimsSupported: [
      "Ellu bella and the custom of sharing it; sweet and savory pongal; kite flying; caution about glass-coated string",
    ],
    termsChecked: true,
    termsNote: "Terms and Conditions read 2026-11-08: content is the department's property and unauthorized reproduction is prohibited; no rule on linking. We paraphrase and link only.",
  }),
  source({
    id: "sankranti-maharashtra",
    kind: "cultural",
    title: "Makar Sankranti (Maharashtra Tourism)",
    url: "https://maharashtratourism.gov.in/festivals/makar-sankranti/",
    publisher: "Department of Tourism, Government of Maharashtra",
    claimsSupported: ["Sesame-jaggery (tilgul) exchanged as a gesture of goodwill with a wish to speak sweetly; haldi-kumkum gatherings; gratitude to the Sun"],
    termsChecked: false,
    termsNote: "Terms review: no terms or copyright page found; footer shows a copyright line. Content read in a browser (first part).",
  }),
  source({
    id: "sankranti-akashvani",
    kind: "cultural",
    title: "Telangana celebrates festival of cattle Kanuma",
    url: "https://newsonair.gov.in/telangana-celebrates-kanuma-with-cattle-worship-processions-rural-sports/",
    publisher: "News On AIR (All India Radio, Prasar Bharati)",
    claimsSupported: ["In Telangana, Kanuma is the festival of cattle on the third day of the Sankranti festival; cattle and farm tools are worshipped and cattle processions are held"],
    termsChecked: false,
    termsNote: "Terms review: no terms page found (privacy policy only); footer shows copyright. Content read in full in a browser (a short news item dated January 2025).",
  }),
  source({
    id: "sankranti-chittoor",
    kind: "cultural",
    title: "Cultural Tourism (Chittoor District)",
    url: "https://chittoor.ap.gov.in/cultural-tourism/",
    publisher: "Chittoor District, Government of Andhra Pradesh",
    claimsSupported: ["Kanuma during Sankranti is celebrated with bulls decorated and paraded in the streets"],
    termsChecked: false,
    termsNote: "Terms review: not done. Content read in a browser (a short district tourism page).",
  }),
  source({
    id: "sankranti-usno",
    kind: "other",
    title: "Sunrise and Sunset Times Near the Solstices",
    url: "https://aa.usno.navy.mil/faq/rs_solstices",
    publisher: "U.S. Naval Observatory, Astronomical Applications Department",
    claimsSupported: [
      "The winter (December) solstice falls on or about December 21, when the Sun appears to move along its most southern track in the sky; the Earth's axis is tilted about 23.4°",
      "The Sun's southward drift stops at the winter solstice, after which it begins its slow march northward",
    ],
    termsChecked: false,
    termsNote: "Content read in full in the built-in browser on 2026-11-08 (page text extracted directly). The page shows no copyright or reuse notice and describes itself as an official U.S. Navy site; no terms page was read, which is not permission. We paraphrase and link only.",
  }),
  source({
    id: "sankranti-fda",
    kind: "other",
    title: "The FASTER Act: Sesame Is the Ninth Major Food Allergen",
    url: "https://www.fda.gov/food/food-allergies/faster-act-sesame-ninth-major-food-allergen",
    publisher: "U.S. Food and Drug Administration",
    claimsSupported: ["Sesame is a major food allergen in the United States and must be declared on packaged-food labels"],
    termsChecked: true,
    termsNote: "FDA website policies read 2026-11-08: web content is in the public domain unless noted, and linking and reuse need no permission. Page itself read 2026-11-08.",
  }),
  ...dormSources,
];

export const makaraSankranti: FestivalRecord = {
  slug: "makara-sankranti",
  name: "Makara Sankranti",
  aliases: ["Sankranti", "Makar Sankranti"],
  // BASICS (P3-05, reviewed 2026-11-08). Pongal, Lohri, Uttarayan and Bihu are deliberately NOT aliases: they are
  // related festivals with their own names and customs.
  subtitle: "A solar festival of harvest and renewal",
  deities: ["Surya"],
  basics: { status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“Sankranti” means “transition.” Makara Sankranti marks the Sun’s entry into the sign of makara (Capricorn) in the Hindu solar calendar. By tradition it begins uttarayana, the Sun’s northward course; the astronomical turn comes at the December solstice, a few weeks earlier.",
      sourceIds: ["sankranti-brit-what", "sankranti-brandeis", "sankranti-usno"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "One day, with related festivals around it: Lohri the evening before, and Pongal, a four-day festival, in Tamil Nadu.",
      tradition: "Varies by region",
      sourceIds: ["sankranti-brit-regional", "sankranti-brit-pongal", "sankranti-haf"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Surya, the Sun god, in many regions. In Tamil Pongal, Indra is honored on the first day.",
      tradition: "Varies by region",
      sourceIds: ["sankranti-brit-what", "sankranti-haf", "sankranti-brit-pongal"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "Sharing sesame-and-jaggery sweets, bathing in sacred rivers, bonfires, rangoli or kolam, honoring cattle, and flying kites, especially in Gujarat.",
      sourceIds: ["sankranti-brit-what", "sankranti-brit-regional", "sankranti-haf"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Signature foods",
      text: "Sesame-and-jaggery sweets in Maharashtra and Karnataka, rice boiled with milk and jaggery in Tamil Nadu (Pongal), and sweets made with new rice in West Bengal.",
      tradition: "Regional",
      sourceIds: ["sankranti-brit-regional", "sankranti-brit-pongal", "sankranti-karnataka", "sankranti-maharashtra"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
  ],

  deityEntries: [
    {
      name: "Surya",
      role: "The Sun god, honored with thanks at harvest time and on Makara Sankranti, the day the Sun enters makara in the Hindu solar calendar.",
      tradition: "Hindu traditions across India",
      sourceIds: ["sankranti-brit-what", "sankranti-haf"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: ["SOURCE NOTE: HAF also says Saraswati is honored at Makar Sankranti; no other source says so, so it is left out."],
    },
    {
      name: "Indra",
      role: "Honored as the god of rain on Bhogi, the first day of Pongal.",
      tradition: "Tamil Pongal",
      sourceIds: ["sankranti-brit-pongal", "sankranti-ht-2010"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Makara Sankranti?",
      body: [
        "Makara Sankranti is a solar festival of harvest and renewal. In the Hindu solar calendar it marks the Sun’s entry into the sign of makara, or Capricorn, and by tradition it opens uttarayana, the Sun’s northward course. Astronomically, the Sun’s turn comes at the December solstice, a few weeks earlier. Because the festival follows the Sun rather than the Moon, it falls at nearly the same point each year.",
        "Families give thanks for the harvest, share sesame-and-jaggery sweets, bathe in rivers, light bonfires and, in some places, fly kites. The season is celebrated under different names across India, from Pongal in Tamil Nadu to Lohri in Punjab, Uttarayan in Gujarat and Magh Bihu in Assam. Each is its own celebration, kept apart in this guide.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-what", "sankranti-brit-regional", "sankranti-haf", "sankranti-brandeis", "sankranti-usno"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: core summary rests on Britannica plus HAF and Brandeis; the Brandeis claim that this is the only Hindu festival on the solar calendar is over-generalised and is not used.",
        "EDITORIAL: owner decision 2026-11-08: Pongal, Lohri, Magh Bihu and Uttarayan are described as related solar-season celebrations, never as aliases or as the same festival under other names.",
      ],
    },
    {
      kind: "significance",
      title: "A solar festival: tradition and astronomy",
      body: [
        "Sankranti means “transition.” Makara Sankranti is the Sun’s transition into makara in the Hindu solar reckoning, which follows the Sun’s position against the stars. By tradition, uttarayana, the half of the year in which the Sun travels north, is counted from this day. It is regarded as an auspicious time, and the days around it are seen as a favorable moment for new undertakings such as weddings.",
        "This is a traditional reckoning, not the astronomical turn of the Sun. At the December solstice, a few weeks before Makara Sankranti, the Sun reaches its most southerly track in the sky, and the U.S. Naval Observatory explains that it then begins its slow march northward. Britannica notes that the festival began as a winter-solstice holiday, but because it is reckoned by the stars, the two dates have drifted apart over the centuries. Unlike most Hindu festivals, which follow a calendar based on both Moon and Sun, it follows the solar calendar, so it moves very little from year to year.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-what", "sankranti-brit-pongal", "sankranti-haf", "sankranti-brandeis", "sankranti-usno"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica says the festival began as a winter-solstice holiday and that, because its date now follows sidereal time, the date and the solstice are no longer the same (precession of the equinoxes). The astronomy (the Sun’s most southerly track at the December solstice, then its northward movement) is cited to the U.S. Naval Observatory page “Sunrise and Sunset Times Near the Solstices”, read in full in the browser on 2026-11-08. That page does not give the “few weeks earlier” gap to Makara Sankranti; that comparison rests on the solstice date it gives (on or about December 21) and the festival’s mid-January timing in Britannica, and no date appears in the guide. Owner direction 2026-11-08: the guide separates the traditional uttarayana reckoning from the astronomical solstice in the overview, the quick fact and this section.",
        "SOURCE NOTE: Britannica says the festival is on 14 January, or 15 January in leap years; other pages give a range. The guide states no date, and the Atlanta date work stays in the date ledger.",
        "EDITORIAL: the Bhishma story is omitted (owner direction 2026-11-08); the guide keeps only the belief that uttarayana is auspicious.",
      ],
    },
    {
      kind: "regional_variation",
      title: "One solar moment, many festivals",
      tradition: "Regional; varies by community",
      body: [
        "The Sun’s entry into makara is marked across India, but under different names and with different customs. They are related celebrations, not one festival with many labels.",
        "In Gujarat it is Uttarayan, known for kite flying and the International Kite Festival in Ahmedabad. In Maharashtra and the Deccan it is Til Sankranti, when sesame and jaggery sweets are shared. In West Bengal it is Poush Sankranti, celebrated with sweets made from new rice. In Punjab, Lohri is celebrated the evening before, around a bonfire. In Tamil Nadu the season brings the four-day harvest festival of Pongal, and in Assam, Magh or Bhogali Bihu brings feasts and a bonfire called the meji. In Kerala, devotees of Ayyappan mark the day with Makaravilakku and a pilgrimage to Sabarimala.",
        "In Telangana and Andhra Pradesh, Kanuma, the festival of cattle, is part of Sankranti. In Telangana it falls on the third day, when cattle and farm tools are worshipped and cattle processions are held, and in Andhra Pradesh bulls are decorated and paraded.",
        "People describe the relationship among these in different ways: some see regional names for one observance, others see separate festivals that share a season. Here each keeps its own name.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-regional", "sankranti-brit-bihu", "sankranti-haf", "sankranti-ht-2010", "sankranti-akashvani", "sankranti-chittoor"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: the sources frame the relationship differently (Britannica lists regional observances; HAF says one festival under different names yet describes distinct practices; Britannica’s Pongal article says Pongal is Makar Sankranti in other states). The wording follows the owner decision to distinguish them.",
        "SOURCE NOTE: the Telangana and Andhra Pradesh sentence rests on one targeted search on 2026-11-08 (owner direction): a News On AIR (Prasar Bharati) item says that in Telangana Kanuma is the festival of cattle on the third day of Sankranti, with cattle and agricultural tools worshipped and cattle processions, and the Chittoor District (Government of Andhra Pradesh) page says Kanuma during Sankranti is celebrated with bulls decorated and paraded. The district page adds that in some parts bulls are chased; that is left out (animal custom).",
        "OPTIONAL: Bhogi, Sankranti day and Mukkanuma in Andhra Pradesh and Telangana are not described: the Andhra Pradesh Tourism page that covers them could not be opened in the fetch tool or the browser, and only its search-result summary was seen, which is not relied on. No details are invented. A reliable source for those days is still wanted.",
        "EDITORIAL: Magh Bihu’s buffalo and egg fights and Karnataka’s cattle-through-fire ritual are intentionally omitted (animal customs, sensitive).",
      ],
    },
    {
      kind: "regional_variation",
      title: "Pongal: four days of thanks",
      tradition: "Tamil Nadu and the Tamil diaspora",
      body: [
        "Pongal is a four-day harvest festival of Tamil Nadu, celebrated by Tamils around the world. It follows the Tamil solar calendar and opens the month of Thai. The name comes from a Tamil word meaning “to boil over,” a sign of abundance, and the central dish is rice cooked with milk and jaggery until it overflows.",
        "The four days are Bhogi, for Indra, when old things are cleared out and homes cleaned; Surya Pongal, for the Sun; Mattu Pongal, for the cattle that help with the harvest, who are decorated and fed; and Kaanum Pongal, for family and friends. Britannica traces the festival to the Sangam age, when it was called Thai Niradal, and notes that some scholars link it to Vedic first-fruit rites.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-pongal", "sankranti-haf", "sankranti-ht-2010"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica’s Pongal article was read only through the start of day one; days two to four rest on its table plus HAF and Hinduism Today.",
        "OPTIONAL: Britannica’s Pongal article says Pongal is known as Makar Sankranti “in other Indian states”; the guide does not repeat that so that Pongal stays a distinct festival.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Lohri: the evening before",
      tradition: "Punjab and northern India",
      body: [
        "Lohri is celebrated the evening before Makar Sankranti, mainly in Punjab, Haryana, Himachal Pradesh and Delhi. Families and neighbors gather around a bonfire lit at sunset, with songs and dancing, to mark the end of the winter season. Hindus and Sikhs both celebrate it.",
        "The name is explained in more than one way: some link it to an iron griddle, others to Dulla Bhatti, a folk hero from the Mughal period. Britannica notes that the exact origin of the festival is unclear.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-lohri", "sankranti-haf"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: ["SOURCE NOTE: Britannica’s Lohri article was read only in its first part (origin and harvest context); the bonfire and community details are from that part and HAF."],
    },
    {
      kind: "rituals",
      title: "Customs of the season",
      body: [
        "A few customs appear in many places, each with local forms. Many people bathe in rivers, especially where rivers meet; pilgrims go to Gangasagar, where the Ganges reaches the sea, and to Prayagraj for the Magh Mela. Sesame and jaggery sweets are exchanged as a gesture of goodwill. Bonfires are lit in several regions, and homes are cleaned and decorated with rangoli or kolam.",
        "Cattle, honored as helpers of the harvest, are garlanded or decorated and fed. In Gujarat the sky fills with kites. Britannica notes that the many reasons people give for flying kites are suggestions, and that the pastime has simply become part of the festival.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-what", "sankranti-brit-regional", "sankranti-brit-kites", "sankranti-haf", "sankranti-ht-2010", "sankranti-maharashtra"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: kite-flying health claims (vitamin D) from Karnataka Tourism are uncited and are left out.",
        "EDITORIAL: no reason is given for kites beyond Britannica’s own caution that the reasons offered are suggestions.",
      ],
    },
    {
      kind: "food",
      title: "Sesame, jaggery and new rice",
      tradition: "Regional",
      body: [
        "Sweet foods mark the season, and each region has its own. In Maharashtra, families exchange tilgul, sesame-and-jaggery sweets, with a wish to speak sweetly to one another. In Karnataka, people share ellu bella, a mix of sesame, fried gram, dried coconut, peanuts and jaggery, and make both sweet and savory pongal.",
        "In Tamil Nadu, rice cooked with milk and jaggery is the festival’s signature dish. A sweet version made with lentils and jaggery is called chakkara pongal, and a savory one made with rice and lentils is ven pongal. In West Bengal, sweets are made from the new rice. What a family makes depends on its region and its own tradition.",
      ].join("\n\n"),
      sourceIds: ["sankranti-brit-regional", "sankranti-brit-pongal", "sankranti-karnataka", "sankranti-maharashtra", "sankranti-ht-2010"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: no fasting or vegetarian claim is made; no source read describes fasting for Makar Sankranti.",
        "SOURCE NOTE: Karnataka Tourism’s statement that sesame and jaggery are “natural heat boosters” is unsourced and is not used.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Makar Sankranti away from home",
      body: [
        "You can keep the festival going away from home with a few simple choices.",
        "Find your people. Ask a regional student association or a nearby temple whether it plans a Sankranti, Pongal or Lohri gathering.",
        "Share sesame sweets thoughtfully. Sesame is one of the nine major food allergens in the United States, so tell friends what is in what you share, and if you are buying sweets, check the label.",
        "Cook in a shared kitchen. A pot of pongal is a good dish to try, but cooking in residence-hall rooms is often restricted, so use a shared kitchen if your housing allows.",
        "Leave the bonfire for public events. Many residence halls ban open flames, including candles and lamps, so check your housing contract before you light or hang anything. If you have questions about religious accommodations, ask your residence life office.",
        "Fly kites carefully. Use ordinary string, never glass-coated string, and fly only where local rules allow, away from roads and overhead wires.",
        "Call home. A video call with family at festival time keeps you part of the celebration.",
      ].join("\n\n"),
      sourceIds: ["sankranti-fda", "sankranti-karnataka", "dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. The allergen point rests on the FDA page (read directly 2026-11-08); the glass-coated-string caution is Karnataka Tourism’s; keeping kites away from roads and overhead wires is common-sense advice with no source.",
        "OPTIONAL: no Atlanta-area Sankranti or Pongal organization has been verified, so none is named.",
      ],
    },
  ],
};

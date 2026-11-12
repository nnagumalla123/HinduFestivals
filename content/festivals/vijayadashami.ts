import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Vijayadashami: P3-05 Batch B: REVIEWED 2026-11-12 (owner-approved revision 2; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/vijayadashami.md. No dates anywhere in this file; `occurrences` stays empty. The guide
 * must stay consistent with the reviewed Navaratri and Diwali guides (which it does not change).
 * `reviewNotes` are internal and never published.
 */

const sources: readonly ContentSource[] = [
  britannica({
    id: "vd-brit-dussehra",
    title: "Dussehra",
    url: "https://www.britannica.com/topic/Dussehra",
    claimsSupported: [
      "Dussehra marks the end of Sharad Navratri and celebrates Rama’s victory over the ten-headed Ravana as told in the Ramayana; the name comes from dasha (“ten”) and hara (“defeat”); observed on the tenth day of Ashvina",
      "Dussehra coincides with Vijayadashami, the tenth day of Durga Puja; the two terms are often used interchangeably",
      "Ramlila performances and Ravana dahan (effigies of Ravana, Meghanada and Kumbhakarna stuffed with firecrackers and burned at dusk); Kullu Dussehra without effigy burning; Navratri Golu and Ayudha Puja in the south; Diwali preparation afterwards",
    ],
  }),
  britannica({
    id: "vd-brit-vijayadashami",
    title: "Vijayadashami",
    url: "https://www.britannica.com/topic/Vijayadashami",
    claimsSupported: [
      "Vijayadashami is the final day of the 10-day Durga Puja; Durga’s victory over Mahishasura and her departure to Mount Kailash; it coincides with Dussehra in the north",
      "Darpan visarjan (the mirror ritual), sindoor khela and the immersion procession with farewell sweets",
    ],
  }),
  britannica({
    id: "vd-brit-durgapuja",
    title: "Durga Puja",
    url: "https://www.britannica.com/topic/Durga-Puja",
    claimsSupported: [
      "The slaying of Mahishasura first appears in the Devi Mahatmya, part of the Markandeya Purana; Durga Puja is celebrated in the month of Ashvina, mainly in West Bengal, Assam and other eastern states; it ends with Vijayadashami",
    ],
  }),
  source({
    id: "vd-haf",
    kind: "cultural",
    title: "Dusshera",
    url: "https://www.hinduamerican.org/dusshera",
    publisher: "Hindu American Foundation",
    claimsSupported: [
      "Dussehra or Vijayadashmi celebrates Rama’s victory over the ten-headed Ravana; it marks the end of Ramalila; it often coincides with the end of Navaratri and Durga Puja; a reminder that good prevails over evil and the end of negativity within us",
    ],
    termsChecked: false,
    termsNote: "Content read through the fetch tool: the first entry was read verbatim and whole; the rest of the page (older feed entries) was read only as a model summary and is not relied on. Terms review: no terms page linked; footer shows copyright and a privacy-policy link. Unchecked.",
  }),
  source({
    id: "vd-haf-iskcon",
    kind: "cultural",
    title: "On celebrating Navaratri and Dussehra: through the lens of ISKCON Communications Director, Anuttama Das",
    url: "https://www.hinduamerican.org/blog/on-celebrating-navaratri-and-dussehra-through-the-lens-of-iskcon-communications-director-anuttama-das",
    publisher: "Hindu American Foundation (an interview with a leader of ISKCON)",
    claimsSupported: [
      "In one ISKCON community, the tenth day is Vijayadashami, remembering Durga’s victory over Mahishasura as well as Rama’s over Ravana",
    ],
    termsChecked: false,
    termsNote: "Content read through the fetch tool (the interview body verbatim and whole; the feed after it only as a summary, not relied on). Terms review: no terms page linked; footer shows copyright. Unchecked. A single speaker’s account of one community’s practice; its effigy-burning details are not used.",
  }),
  source({
    id: "vd-brandeis",
    kind: "academic",
    title: "Dussehra or Vijaya Dashami (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/dussehra.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["Dussehra, also called Vijaya Dashami, is observed on the tenth day of Navaratri and commemorates Rama’s triumph over Ravana; burning effigies reminds people to conquer inner vices"],
    termsChecked: false,
    termsNote: "Content read in full in the browser (the fetch tool was refused with a 403; one paragraph). Terms review: not done.",
  }),
  source({
    id: "vd-unesco",
    kind: "cultural",
    title: "Ramlila, the traditional performance of the Ramayana",
    url: "https://ich.unesco.org/en/RL/ramlila-the-traditional-performance-of-the-ramayana-00110",
    publisher: "UNESCO Intangible Cultural Heritage",
    claimsSupported: [
      "Ramlila is performed across northern India during Dussehra, based on the Ramacharitmanas; performances last ten to twelve days, some up to a month; the best-known are at Ayodhya, Ramnagar and Benares; villagers and audiences take part",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: a terms-of-use link on unesco.org was seen, not read; the page shows a UNESCO copyright line and photo credits. Unchecked.",
  }),
  source({
    id: "vd-valmiki",
    kind: "text",
    title: "Valmiki Ramayana, Yuddha Kanda, sarga 108 (prose translation by K. M. K. Murthy)",
    url: "https://www.valmikiramayan.net/yuddha/sarga108/yuddha_108_prose.htm",
    publisher: "valmikiramayan.net",
    claimsSupported: ["In this sarga Rama’s charioteer Matali urges him to use a weapon of Brahma; Rama’s arrow pierces Ravana’s heart and Ravana falls dead from his chariot"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (a short sarga). Terms review: the page shows a copyright line for the translator; no terms page found (same basis as the Diwali source). We paraphrase and quote nothing.",
  }),
  source({
    id: "vd-mysuru",
    kind: "cultural",
    title: "Mysuru Dasara — Official Site",
    url: "https://mysoredasara.gov.in/",
    publisher: "Mysuru Dasara Committee, Government of Karnataka",
    claimsSupported: [
      "A multi-day festival at Mysuru that ends with the Jumboo Savari procession from the Palace on Vijayadashami; Chamundeshwari puja; Mahanavami with Ayudha puja; Shami puja and Aparajita Devi puja on Vijayadashami",
    ],
    termsChecked: true,
    termsNote: "Content read in full through the fetch tool (the 2026 edition of the site). Terms read through the fetch tool (mysoredasara.gov.in/terms, effective 1 September 2026): material may be reproduced free of charge for personal, educational or news use, accurately and with attribution; commercial use and photos need permission. We paraphrase and link only.",
  }),
  source({
    id: "vd-karnataka",
    kind: "cultural",
    title: "Mysuru Dasara: Dates, History & Travel Guide",
    url: "https://karnatakatourism.org/en/experiences/experience-the-mysuru-dasara-festivities-in-karnataka",
    publisher: "Department of Tourism, Government of Karnataka",
    claimsSupported: [
      "Mysuru Dasara, called Nada Habba, honors Goddess Chamundeshwari’s defeat of Mahishasura; begun by Vijayanagara rulers and revived by a Wadiyar king in the early 17th century; the Jamboo Savari carries the goddess on a golden howdah",
    ],
    termsChecked: true,
    termsNote: "Content read in full through the fetch tool. Terms and Conditions read 2026-11-08 for the Sankranti sources: content is the department’s property and unauthorized reproduction is prohibited; no rule on linking. We paraphrase and link only.",
  }),
  source({
    id: "vd-outlook",
    kind: "other",
    title: "Dussehra: Why Maharashtra Exchanges Apta Leaves As Gold",
    url: "https://www.outlooktraveller.com/experiences/heritage/dussehra-2026-why-maharashtra-exchanges-apta-leaves-as-gold",
    publisher: "Outlook Traveller (2026)",
    claimsSupported: [
      "In Maharashtra apta leaves are exchanged as “sona,” gold, as a gesture of goodwill; the Pandavas’ weapons hidden in a shami tree; the worship of weapons (Shastra Puja); Maratha soldiers presenting leaves to women of their families",
    ],
    termsChecked: true,
    termsNote: "Content read in full through the fetch tool. Terms and conditions read through the fetch tool: content is protected by copyright; personal non-commercial printing only; no reproduction or republication; linking is not addressed. We paraphrase and link only.",
  }),
  ...dormSources,
];

export const vijayadashami: FestivalRecord = {
  slug: "vijayadashami",
  name: "Vijayadashami",
  // BASICS (P3-05 Batch B, reviewed 2026-11-12). Britannica treats Dussehra and Vijayadashami as terms "often used
  // interchangeably" while noting different emphases; the aliases are kept for search with that nuance in the guide.
  aliases: ["Dussehra", "Dasara", "Vijaya Dashami"],
  subtitle: "The victorious tenth day",
  deities: ["Rama", "Durga"],
  basics: { status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“Vijayadashami” means “the tenth day of victory.” In much of India the day is known as Dussehra, from the Sanskrit dasha, “ten,” and hara, “defeat,” remembering Rama’s victory over the ten-headed Ravana. In Bengal and the east it is the last day of Durga Puja, honoring Durga’s victory over Mahishasura.",
      sourceIds: ["vd-brit-dussehra", "vd-brit-vijayadashami"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "One day, the tenth after the nine nights of Navaratri. Some celebrations, such as Ramlila performances, Durga Puja and Mysuru Dasara, build up over many days before it.",
      tradition: "Varies by region",
      sourceIds: ["vd-brit-dussehra", "vd-brit-vijayadashami", "vd-unesco", "vd-mysuru"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Rama, in the Ramayana’s story of Ravana’s defeat, and Durga, in the story of Mahishasura’s defeat. In Mysuru, the goddess is honored as Chamundeshwari.",
      tradition: "Varies by tradition and region",
      sourceIds: ["vd-brit-dussehra", "vd-brit-vijayadashami", "vd-karnataka"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "Ramlila performances and the burning of Ravana effigies in the north; the farewell and immersion of Durga images in Bengal and the east; the Jamboo Savari procession in Mysuru; and the exchange of apta leaves in Maharashtra. Ayudha Puja, the worship of tools and books, falls the day before, on Mahanavami.",
      tradition: "Regional",
      sourceIds: ["vd-brit-dussehra", "vd-brit-vijayadashami", "vd-mysuru", "vd-outlook"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
  ],

  deityEntries: [
    {
      name: "Rama",
      role: "The hero of the Ramayana, who defeats the ten-headed demon king Ravana to rescue his wife Sita. His victory is the story behind Dussehra in much of India and is retold in Ramlila.",
      tradition: "Vaishnava tradition; the Ramayana",
      sourceIds: ["vd-brit-dussehra", "vd-haf", "vd-valmiki"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Durga",
      role: "The warrior goddess who defeats the buffalo demon Mahishasura, as told in the Devi Mahatmya. Vijayadashami is the last day of Durga Puja, when images of the goddess are bid farewell and immersed.",
      tradition: "Shakta tradition; Durga Puja in the east",
      sourceIds: ["vd-brit-vijayadashami", "vd-brit-durgapuja"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Chamundeshwari",
      role: "The goddess honored in Mysuru Dasara, remembered for defeating Mahishasura. She is carried in procession on Vijayadashami.",
      tradition: "Mysuru and Karnataka",
      sourceIds: ["vd-karnataka", "vd-mysuru"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Vijayadashami?",
      body: [
        "Vijayadashami, “the victorious tenth,” falls on the day after the nine nights of Navaratri. It is a festival of victory, and different parts of India remember different victories. In much of the north and west it is Dussehra, when Rama’s victory over the ten-headed king Ravana is celebrated, and the story is told in Ramlila plays and by burning effigies. In Bengal and the east it is the last day of Durga Puja, when the goddess Durga, who defeated the buffalo demon Mahishasura, is bid farewell.",
        "Many people see in these stories a reminder that good prevails over evil and that each person can overcome their own faults. In the south and in Maharashtra, the days around it are also a time to honor tools, books and, in some places, weapons. The names, stories and customs vary by region, and this guide keeps them apart.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-dussehra", "vd-brit-vijayadashami", "vd-haf", "vd-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the overview rests on Britannica (two articles), HAF and Brandeis. “Each person can overcome their own faults” follows HAF (“the end of negativity and evil within us”) and Brandeis (internal enemies, vices).",
        "EDITORIAL: no date appears. This guide is a companion to the reviewed Navaratri guide (nine nights, Durga and Mahishasura) and the reviewed Diwali guide (the homecoming); wording was kept consistent with both.",
      ],
    },
    {
      kind: "significance",
      title: "Vijayadashami, Dussehra and Dasara: the names",
      tradition: "Varies by region and tradition",
      body: [
        "Vijayadashami, Dussehra and Dasara are different names, used in different regions, for the same tenth day. Britannica explains that Dussehra, from the Sanskrit dasha, “ten,” and hara, “defeat,” is the name used in much of the north and west, where the day marks the end of Sharad Navratri and celebrates Rama’s victory over Ravana. In West Bengal, Assam and other eastern states, Vijayadashami, also written Vijaya Dashami and known in Bengali as Bijoya Doshomi, is the tenth and final day of Durga Puja. In Karnataka the festival is known as Dasara, and Mysuru’s celebration is its best-known form. Britannica notes that Dussehra and Vijayadashami are often used interchangeably, perhaps because both mark a triumph of good over evil, though each name carries its own emphasis.",
        "The day follows the nine nights of Navaratri, and for many people it also begins the countdown to Diwali, which in much of the north remembers Rama’s return to Ayodhya. Dussehra celebrates the victory; Diwali, the homecoming.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-dussehra", "vd-brit-vijayadashami", "vd-karnataka", "vd-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (revision 2, owner direction): Dussehra, Dasara and Vijaya Dashami stay as search aliases, and this section now states the regional distinctions (Dussehra in the north and west, Vijayadashami and Bijoya Doshomi in the east, Dasara in Karnataka) so the aliases are not read as identical.",
        "SOURCE NOTE: the name derivation, the interchangeable use and the Diwali link are Britannica (Dussehra); Vijayadashami, Vijaya Dashami and Bijoya Doshomi as names for the final day of Durga Puja are Britannica (Vijayadashami); Dasara is the Karnataka tourism and Mysuru sites’ own name for the festival. Britannica’s Diwali timing (“20 days after Dussehra”) is a date relation and is not used.",
        "EDITORIAL: consistent with the reviewed Diwali guide’s line “Dussehra, earlier in the autumn, celebrates the victory over Ravana. Diwali is the homecoming.” The Navaratri guide covers the nine nights and Durga Puja in more detail.",
      ],
    },
    {
      kind: "story",
      title: "Rama and Ravana",
      tradition: "Vaishnava tradition; the Ramayana",
      body: [
        "The Ramayana tells how Ravana, the ten-headed king of Lanka, abducted Rama’s wife Sita. Rama, with his brother Lakshmana and allies including the monkey king Sugriva, the commander Hanuman and Ravana’s own brother Vibhishana, waged war to rescue her. In Valmiki’s Sanskrit epic, as translated by K. M. K. Murthy, Rama’s charioteer Matali urges him to use a weapon of Brahma, and Rama’s arrow pierces Ravana’s heart and brings him down from his chariot. HAF and Brandeis describe Dussehra as celebrating this victory.",
        "Ramlila, the folk theater of the Ramayana, is based on Tulsidas’s sixteenth-century retelling, the Ramacharitmanas, rather than on Valmiki. Many families and communities tell the story in their own ways, and some traditions tell it with different emphases.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-dussehra", "vd-valmiki", "vd-haf", "vd-brandeis", "vd-unesco"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica (Dussehra) tells the war and the Brahmastra; the Valmiki sarga 108 (Murthy) was read in full: Matali, the blazing arrow, Ravana’s heart. HAF and Brandeis give the festival link. UNESCO says Ramlila is based on the Ramacharitmanas by Tulsidas, composed in the sixteenth century.",
        "OPTIONAL: the Ramcharitmanas passage itself, regional Ramayanas (Kamban, Krittivasi) and the traditions in which Ravana is honored (HAF’s “untold story of Ravana” says he is “still worshiped in some parts of the world” without naming where) are not covered.",
        "EDITORIAL (revision 2, owner direction): the guide does not claim that the epic establishes Ravana’s death on the tenth day. No source read says so (Britannica says only that Dussehra celebrates the victory), and the overview was reworded from “the day Rama defeated Ravana” to “when Rama’s victory over Ravana is celebrated”.",
      ],
    },
    {
      kind: "story",
      title: "Durga and Mahishasura",
      tradition: "Shakta tradition; the Devi Mahatmya",
      body: [
        "In the east and in many Shakta traditions, Vijayadashami recalls the goddess Durga’s victory over the buffalo demon Mahishasura. Britannica says the story first appears in the Devi Mahatmya, part of the Markandeya Purana, in which the gods combine their powers to create a warrior goddess who defeats him. Durga Puja, which celebrates this victory, ends on Vijayadashami, when the goddess is bid farewell. The Navaratri guide tells the story in more detail.",
        "Some communities remember both victories on the same day. In one ISKCON community described by its communications director, the tenth day recalls Durga’s victory over Mahishasura as well as Rama’s over Ravana.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-vijayadashami", "vd-brit-durgapuja", "vd-haf-iskcon"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the Devi Mahatmya attribution is Britannica (Durga Puja). The Navaratri guide notes that the Devi Mahatmya cantos read do not mention Vijayadashami; this text says only that Durga Puja ends on Vijayadashami and does not claim the Devi Mahatmya names the day.",
        "EDITORIAL: kept short on purpose because the reviewed Navaratri guide carries the story; the phrase “in more detail” refers to that guide and should be revisited if the guides are ever linked.",
      ],
    },
    {
      kind: "rituals",
      title: "Ramlila and the burning of Ravana",
      tradition: "Northern and western India",
      body: [
        "In northern and western India, Ramlila, a dramatic folk retelling of the Ramayana with narration, song and dialogue, leads up to the day. UNESCO describes performances lasting ten to twelve days, and some, such as the one at Ramnagar, up to a month. The best-known are at Ayodhya, Ramnagar and Benares, where villagers play roles and the audience is invited to sing along.",
        "Most Ramlilas end with Ravana’s defeat, and then comes Ravana dahan, “the burning of Ravana.” Large effigies of Ravana, often alongside his son Meghanada and his brother Kumbhakarna, are set alight at dusk in open fields. Britannica notes that the effigies are often stuffed with firecrackers. Brandeis says the burning reminds people to overcome their own vices.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-dussehra", "vd-unesco", "vd-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Ramlila length, places and participation are UNESCO (read in full); Ravana dahan, the firecrackers and the effigies are Britannica; the inner meaning is Brandeis.",
        "EDITORIAL (revision 2, owner direction): the ISKCON example of children shooting flaming arrows at a Ravana figure was removed from the public text. The HAF interview (a single speaker) stays in the pack and is cited only for the sentence that some communities remember both victories on the same day. The college guide gives the participation advice.",
      ],
    },
    {
      kind: "rituals",
      title: "Mahanavami and Vijayadashami: tools, books, shami and apta leaves",
      tradition: "South India, Karnataka and Maharashtra",
      body: [
        "On Mahanavami, the ninth day of Navratri, Ayudha Puja is observed in many southern states, when tools, instruments and objects of knowledge are honored. Across the nine nights, southern homes also set up Golu, a display of dolls and figures on stepped platforms. In Mysuru, the Mahanavami program includes Ayudha puja, and the royal family worships weapons and royal vehicles.",
        "Vijayadashami itself brings different customs. In Mysuru it includes a shami puja and the Jamboo Savari procession. In Maharashtra, people exchange the leaves of the apta tree on Dussehra and call them sona, “gold,” as a gesture of goodwill, with the words “accept this gold and remain like gold.” Outlook Traveller links the custom to a tradition that the Pandavas hid their weapons in a shami tree, and to the Maratha practice of soldiers returning from campaigns with apta or shami leaves for the women of their families. The shami tree is also worshipped in several other parts of India.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-dussehra", "vd-mysuru", "vd-karnataka", "vd-outlook"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (revision 2, owner direction): Mahanavami customs (Ayudha puja, Golu across Navratri) are now kept apart from Vijayadashami customs (shami puja, the Jamboo Savari, apta leaves). Britannica places Ayudha Puja on the ninth day of Navratri; the Mysuru official site lists Mahanavami with Ayudha puja and Vijayadashami with Shami puja.",
        "SOURCE NOTE: Golu and Ayudha Puja are Britannica (Dussehra); the Mysuru details are the official site and Karnataka Tourism (private Ayudha Puja for weapons and royal vehicles); the apta custom, the sona phrase and the Pandava and Maratha explanations are Outlook Traveller (a travel magazine, read in full), which ties the custom to “Dussehra” without naming a day of the festival.",
        "SOURCE NOTE: Karnataka and Telangana “jammi” or “banni” leaf customs appeared in a blog and are not used.",
        "OPTIONAL: Saraswati puja and Vidyarambham (the start of children’s learning) are not described: only a Mysuru event schedule line mentions Saraswati puja, and no reliable source read describes Vidyarambham.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Bengal, Mysuru, Kullu and more",
      tradition: "Regional; varies by community",
      body: [
        "In West Bengal, Assam and other eastern states Vijayadashami is the last day of Durga Puja. At dawn a mirror ritual, darpan visarjan, marks the goddess’s presence leaving the image. Married women then apply sindoor, vermilion, to the goddess and to one another in sindoor khela, and the images are carried in processions to water and immersed, with sweets offered for the goddess’s journey back to Mount Kailash.",
        "In Mysuru, Dasara is the state festival of Karnataka. It honors the goddess Chamundeshwari’s victory over Mahishasura and ends on Vijayadashami with the Jamboo Savari, a procession from the Palace in which the goddess travels on a golden howdah carried by an elephant. Karnataka Tourism traces the festival to the Vijayanagara rulers and says a Wadiyar king revived it in the early seventeenth century.",
        "In the Kullu valley of Himachal Pradesh, Britannica says that instead of burning effigies of Ravana, local deities are carried in procession at a week-long fair, with Raghunath, a form of Rama, as the presiding deity.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-vijayadashami", "vd-brit-dussehra", "vd-mysuru", "vd-karnataka"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Bengal is Britannica (Vijayadashami); Mysuru is the official site and Karnataka Tourism (the official site counts eleven days and Karnataka Tourism ten, so no day count is given); Kullu is Britannica (Dussehra) only, since the Incredible India page was read only through a model summary. Revision 2 kept Kullu to one sentence limited to what Britannica says (no bonfire for Lanka, no start day).",
        "EDITORIAL: the Bengal custom of mixing soil from a brothel threshold into Durga’s clay (Britannica’s “Did You Know”) is omitted as unnecessary for a beginner guide, as in the Navaratri guide.",
        "OPTIONAL: Kullu’s start on Vijayadashami, Bastar, Delhi Ramlila grounds, Odisha and Gujarat customs are not described: only partial or summary readings exist.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Vijayadashami away from home",
      body: [
        "You can mark Vijayadashami with a few simple choices.",
        "Find your people. Ask a Hindu or Indian student association or a nearby temple whether it hosts a Ramlila, a Ravana dahan, a Durga farewell or a Dasara gathering, and whether it streams one.",
        "Watch effigy burnings from a safe distance. Effigies may be stuffed with firecrackers, so stay behind barriers and leave the lighting to organizers who have permits and safety crews. Do not light fireworks yourself; many places and residence halls restrict them.",
        "Optionally, adapt Ayudha Puja. Some students place their books or laptop before a small picture and offer a flower on Mahanavami or Vijayadashami. This is a modern adaptation, not a documented traditional ritual, so follow your family’s guidance. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract. If you have questions about religious accommodations, ask your residence life office.",
        "Share goodwill. A friendly exchange of sweets or leaves, in the spirit of the Maharashtra custom, is a gentle way to join in.",
        "Call home. A video call with family keeps you part of the celebration.",
      ].join("\n\n"),
      sourceIds: ["vd-brit-dussehra", "vd-outlook", "dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. The firecracker caution rests on Britannica’s statement that effigies are stuffed with firecrackers; “behind barriers” and “do not light fireworks yourself” are common-sense safety advice with no source.",
        "EDITORIAL (revision 2, owner direction): the books-and-laptop suggestion is presented as an optional modern adaptation of Ayudha Puja (Britannica’s “objects of knowledge”), not as a documented traditional ritual; Ayudha Puja itself belongs to Mahanavami.",
        "OPTIONAL: no Atlanta-area Dussehra, Ramlila or Durga Puja event or organization has been verified, so none is named.",
      ],
    },
  ],
};

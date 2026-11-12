import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Holi: P3-05 Batch A: REVIEWED 2026-11-08 (owner-approved editorial revision 3; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/holi.md. No dates anywhere in this file. `reviewNotes` are internal and never published.
 */

const sources: readonly ContentSource[] = [
  britannica({
    id: "holi-brit",
    title: "Holi",
    url: "https://www.britannica.com/topic/Holi",
    claimsSupported: [
      "Spring festival of Phalguna; colored powders and water; the play loosens everyday formalities (Britannica says more broadly); harassment incidents; plant colors versus synthetic ones",
      "Foods: gujiya, jalebi, malpua, puran poli, chaat, kachori; drinks lassi, thandai and bhang (a mild cannabis-based drink)",
      "Two stories used in the guide: Krishna and Radha, and Hiranyakashipu and Prahlada with Holika",
      "Regional forms: Braj and Lathmar Holi, Dol Jatra in West Bengal and Odisha, Hola Mohalla among Sikhs",
    ],
  }),
  source({
    id: "holi-haf",
    kind: "cultural",
    title: "5 things to know about Holi",
    url: "https://www.hinduamerican.org/blog/5-things-to-know-about-holi",
    publisher: "Hindu American Foundation",
    claimsSupported: [
      "Holika Dahan on the first evening and a day of colored powder and water the next; wearing white; roasted grains at the bonfire",
      "The stories of Holika and Prahlada and of Radha and Krishna; open to people of all backgrounds, yet a Hindu holiday whose roots should be acknowledged; commercialisation",
    ],
    termsChecked: false,
    termsNote: "Terms review: no terms-of-use page found (privacy policy only); footer shows copyright. Unchecked.",
  }),
  source({
    id: "holi-brandeis",
    kind: "academic",
    title: "Holi (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/holi.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["Spring and harvest festival; bonfire for Holika; the day of Holi celebrating Radha and Krishna; powder, water, sweets, processions"],
    termsChecked: false,
    termsNote: "Content read in a browser (the fetch tool was refused). Terms review: not done.",
  }),
  source({
    id: "holi-incredible-india",
    kind: "cultural",
    title: "Holi: Celebrate the festival of colours",
    url: "https://www.incredibleindia.gov.in/en/festivals-and-events/holi",
    publisher: "Ministry of Tourism, Government of India (Incredible India)",
    claimsSupported: [
      "A festival that crosses religion and age; what the colors are said to symbolise; the Holika and Radha-Krishna stories",
      "Gujiya, thandai (described as a cooling drink flavoured with nuts and spices), malpua, ghevar and dahi vada",
    ],
    termsChecked: true,
    termsNote: "Terms of Use read 2026-11-08 (via a fetch-agent summary of the policy text): content may not be reproduced or framed without written consent; paraphrase and links to it are not addressed. Page read in a browser 2026-11-08.",
  }),
  source({
    id: "holi-aao",
    accessedAt: "2026-11-12",
    kind: "other",
    title: "Recognizing and Treating Eye Injuries",
    url: "https://www.aao.org/eye-health/tips-prevention/injuries",
    publisher: "American Academy of Ophthalmology",
    claimsSupported: ["General eye-injury first aid, not specific to Holi: for a chemical burn or splash, flush the eye immediately with plenty of clean water and seek emergency medical treatment right away; for sand, dust or small particles (usually not an emergency), do not rub the eye, blink and flush it, and see a doctor if it still feels like something is in the eye; ongoing eye pain or trouble seeing means get medical help right away"],
    termsChecked: false,
    termsNote: "General medical guidance cited for practical safety only; not reproduced. Content re-read in full through the fetch tool on 2026-11-12 (chemical-splash, small-particle and general sections). Terms review: the page carries a copyright notice saying its content may not be reproduced or put into an AI program without permission; we paraphrase and link only. Terms page not read.",
  }),
  ...dormSources,
];

export const holi: FestivalRecord = {
  slug: "holi",
  name: "Holi",
  aliases: [],
  // BASICS (P3-05, reviewed 2026-11-08). No aliases: Holika Dahan is a related observance on the evening before Holi
  // (explained in the guide, not an alias), and Dol Jatra is a regional form (owner direction 2026-11-08).
  subtitle: "The festival of colors",
  deities: ["Krishna", "Radha", "Vishnu"],
  basics: { status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "A Hindu spring festival of colors, preceded by an evening bonfire called Holika Dahan. It is celebrated as the triumph of good over evil and in memory of Radha and Krishna’s play.",
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "A day of color, preceded by the bonfire evening of Holika Dahan. Some regions celebrate for much longer.",
      tradition: "Varies by region",
      sourceIds: ["holi-brit", "holi-haf"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Krishna and Radha; Vishnu through the story of Prahlada.",
      tradition: "Varies by region",
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "A bonfire the evening before, throwing colored powder and water, music and dancing, sweets, and visiting friends and family.",
      sourceIds: ["holi-brit", "holi-haf", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Signature foods",
      text: "Gujiya and other sweets, and thandai, a cooling milk drink flavored with nuts and spices.",
      sourceIds: ["holi-brit", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
  ],

  deityEntries: [
    {
      name: "Krishna",
      role: "Holi’s color play is said to recall his play with Radha and the gopis, especially in Mathura, Vrindavan and Barsana.",
      tradition: "Braj Vaishnava tradition",
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Radha",
      role: "Krishna’s beloved, whose playful love with him the day of color recalls.",
      tradition: "Braj Vaishnava tradition",
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Vishnu",
      role: "Worshipped by the young Prahlada; in the story behind the bonfire, his devotee is saved from the fire and Vishnu, as the man-lion Narasimha, ends the tyrant king.",
      tradition: "Vaishnava tradition (the Prahlada story)",
      sourceIds: ["holi-brit", "holi-haf"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Holi?",
      body: [
        "Holi is the Hindu spring festival best known for its colors. The evening before, communities light a bonfire called Holika Dahan, recalling the story of Prahlada and Holika. On Holi itself, people throw colored powder and water at one another, share sweets and music, and visit friends and family, in a celebration of spring, joy and the triumph of good over evil. Many also remember the playful love of Radha and Krishna in the throwing of color.",
        "Several stories are tied to Holi, and each region leans on its own. Today it is also enjoyed by many people who are not Hindu, in India and around the world.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: core summary rests on Britannica plus HAF, Brandeis and Incredible India (separate publishers).",
      ],
    },
    {
      kind: "story",
      title: "The burning of Holika",
      tradition: "Vaishnava tradition (the story of Prahlada)",
      body: [
        "The best-known story behind the bonfire is about Prahlada. His father, the demon king Hiranyakashipu, had won a boon that made him almost impossible to kill, and he demanded that everyone worship him. Prahlada, however, was a devoted worshipper of Vishnu. Furious, the king asked his sister Holika, who was said to be immune to fire, to sit with Prahlada on a burning pyre; in some tellings she wore a protective cloak. Because of Prahlada’s devotion, the protection passed to him, and Holika burned.",
        "Later, Vishnu appeared as the man-lion Narasimha and ended the king’s rule. The bonfire of Holika Dahan recalls this victory of good over evil. Like many such stories, it is told in several versions.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica says the story is “from the Puranas” without naming a text. The Bhagavata Purana’s Prahlada chapters 7.4 to 7.6 (read) never name Holika, and an abridged Vishnu Purana text (read) has a fire attempt that fails and no Holika; chapters 7.2, 7.3, 7.7 to 7.10 and the Narada and Bhavishya Puranas were not read. Per owner decision 2026-11-08 the guide presents Holika’s burning as a traditional narrative and names no text.",
      ],
    },
    {
      kind: "story",
      title: "Radha and Krishna",
      tradition: "Braj Vaishnava tradition",
      body: [
        "Holi is especially dear to worshippers of Krishna, whose play with Radha and the gopis, the young women of Vrindavan, it is said to recall. One popular story says that the young Krishna playfully smeared color on Radha’s face, and the play grew into the festival.",
        "In Mathura, Vrindavan and Barsana, the places linked with Krishna’s life, Holi is celebrated with particular joy.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-haf", "holi-brandeis", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica ties the play to the Bhagavata Purana and the Gitagovinda and the color association to the Garga Samhita; none of these was read. The popular story is attributed as one (“one popular story”).",
        "EDITORIAL: owner direction 2026-11-08: the complexion detail in Britannica’s version of this story is left out to avoid emphasis on skin-color differences; the guide follows Incredible India’s plainer version, in which Krishna playfully smears color on Radha’s face.",
      ],
    },
    {
      kind: "rituals",
      title: "A bonfire and a day of color",
      body: [
        "Holi is preceded by a related observance, Holika Dahan, on the evening before. Families and neighbors gather around a bonfire, sing, and offer roasted grains as a way of letting go of the past year’s negativity.",
        "The next day is the day of color. People throw gulal, colored powder, and squirt colored water from buckets and water guns called pichkaris, with music, dancing and shouts of “Holi hai!” Many wear white. In some places the play loosens everyday formalities of age and status, though customs vary and not every community plays in the same way. When it ends, people bathe, put on clean clothes and visit friends, teachers and relatives, often with sweets.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-haf", "holi-incredible-india", "holi-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica says Holi gives license to deviate from the usual norms and rankings of caste, gender, status and age, and that ordinary order is restored afterward. Owner direction 2026-11-08: the guide softens this so it does not suggest Holi universally suspends social hierarchies; it says only that in some places the play loosens everyday formalities of age and status.",
        "EDITORIAL: HAF says Holi can be a forty-day, eight-day, two-day or afternoon celebration by region; the bonfire-then-color pattern follows Britannica, HAF and Incredible India. Holika Dahan is explained as a related preceding observance and is not an alias (owner direction).",
      ],
    },
    {
      kind: "traditional_guide",
      title: "Colors, then and now",
      body: [
        "Holi colors were traditionally made from plants: green from neem and henna leaves, yellow from turmeric and marigold, blue from indigo, and red from pomegranate, flame-of-the-forest flowers and red sandalwood. Today synthetic powders are common too. Ingredients vary from product to product, and Britannica cautions that some contain pigments that can irritate the skin and eyes, so some people choose herbal colors.",
        "The colors are also said to carry meanings: green for new life, red for marriage and fertility, yellow for purity and victory, and blue for Krishna.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: owner decision 2026-11-08 (final edit): the synthetic-color wording is softened so it does not imply that all synthetic powders are hazardous; it says ingredients vary and that some contain irritating pigments.",
        "SOURCE NOTE: plant colors and the synthetic-pigment warning are Britannica only; the symbolism is Incredible India’s (“said to”). No Holi-specific health source was found.",
      ],
    },
    {
      kind: "food",
      title: "Sweets and drinks",
      tradition: "Varies by region",
      body: [
        "Sharing food is part of the day. Popular sweets include gujiya, a fried pastry filled with coconut and dried fruit; jalebi, a syrup-soaked spiral; and malpua, a pancake dipped in syrup. In Maharashtra, puran poli, a sweet flatbread, is served. Savory snacks such as chaat and kachori are common too.",
        "Drinks include lassi and thandai, a cooling milk drink flavored with almonds, saffron, poppy seeds, cardamom and rose petals. Bhang, a mild cannabis-based drink, is listed separately from thandai and is served in some places.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: owner decision 2026-11-08 (final edit): thandai and bhang are kept separate with neutral context, no recipes and no consumption guidance. The unsupported clause about cannabis-infused versions of other drinks and the inferred “ordinarily made without cannabis” wording were removed; only the sourced distinction remains.",
        "SOURCE NOTE: Britannica lists thandai (almonds, saffron, poppy seeds, cardamom, rose petals) and bhang (“a mild cannabis-based drink”) as separate drinks; Incredible India describes thandai as a cooling drink flavoured with nuts and spices and does not mention bhang. The guide states only that bhang is listed separately and served in some places.",
        "OPTIONAL: no legal or age statement is made because none was sourced. A second source for bhang at Holi would help.",
        "EDITORIAL: no fasting claim is made. HAF’s holaka (roasted grains offered at the bonfire) is mentioned in the rituals section.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Holi across India",
      tradition: "Regional; varies by community",
      body: [
        "Holi takes different forms across India, lasting anywhere from two days to many weeks. In Braj, the region around Mathura and Vrindavan, the celebrations begin with Basant Panchami and build for weeks. At Barsana, Lathmar Holi has women of Radha’s village playfully strike men from Krishna’s village with staves while the men shield themselves.",
        "In West Bengal and Odisha the festival is Dol Jatra, the “swing festival,” when images of Radha and Krishna are placed on decorated platforms and swung to songs of spring. In Punjab, Sikhs celebrate Hola Mohalla the day after Holi, a separate festival marked by displays of martial skill.",
      ].join("\n\n"),
      sourceIds: ["holi-brit"],
      status: "reviewed", reviewedAt: "2026-11-08", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: all of this is Britannica (one source); the end of its Dol Jatra passage was not read.",
        "EDITORIAL: the southern Kama Dahanam tradition, Baldeo’s Balarama Holi and the widows’ celebrations in Vrindavan and Varanasi are intentionally omitted (owner direction; niche or sensitive).",
        "OPTIONAL: Rang Panchami (Maharashtra) and Shigmo (Goa) are not mentioned: no source was read.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Holi beyond temples and homes",
      tradition: "Diaspora and pan-Indian",
      body: [
        "Holi has become popular in South Asian communities in the United States and elsewhere, and many people who are not Hindu join in; the Government of India’s tourism site describes it as a festival that crosses religion and age. The Hindu American Foundation says Holi is open to everyone and that understanding its origin can enrich the experience, noting that commercial color events can lose that context.",
        "In some places the loosening of everyday boundaries during the festival has led to harassment and fights, and police in many places in India take precautions. Ask before putting color on someone, and respect a no.",
      ].join("\n\n"),
      sourceIds: ["holi-brit", "holi-haf", "holi-incredible-india"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (P3-06, F-08, owner-approved 2026-11-12): the Hindu American Foundation sentence was reworded to what the page says (people can enhance the experience by understanding the holiday’s origin; the essence of commercial color events often gets lost). The rest of the section is unchanged.",
        "EDITORIAL: the closing consent line is common-sense guidance with no source. HAF’s “culturally appropriated” advocacy language is not repeated; its view is stated neutrally and attributed.",
        "EDITORIAL: no contemporary political controversy is included (owner decision); a Pluralism Project article on a 2020 campus protest was seen in a search and not read or used.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Holi away from home",
      body: [
        "You can enjoy Holi with a few simple choices.",
        "Find a celebration. Look for a Hindu or Indian student association event or a community gathering with outdoor space.",
        "Dress for it. Wear old clothes you do not mind staining, and keep colors outdoors, since powders can stain floors and walls.",
        "Protect your eyes and skin. Color ingredients vary, so check labels or choose herbal colors if you prefer, and keep powder away from your eyes. If color gets in your eyes, do not rub them and flush the eye right away with plenty of clean water. If a liquid color, dye or other chemical splashes into your eye, the American Academy of Ophthalmology advises seeking emergency medical treatment right away. For ordinary dust or grit, blinking and flushing often clears it, but see a doctor if it still feels like something is in your eye. Ongoing pain or trouble seeing is a sign to get medical help right away.",
        "Ask first. Always ask before putting color on someone, and respect a no.",
        "Leave the bonfire to organized events. Many residence halls ban open flames, so check your housing contract. If you have questions about religious accommodations, ask your residence life office.",
        "Call home. A video call with family keeps you part of the celebration.",
      ].join("\n\n"),
      sourceIds: ["holi-aao", "holi-brit", "dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (P3-06, F-03, owner-approved 2026-11-12): the eye-safety tip now follows the American Academy of Ophthalmology page (re-read in full): do not rub; flush right away; a chemical splash needs emergency medical treatment right away; ordinary dust or grit often clears with blinking and flushing but needs a doctor if it still feels like something is in the eye; ongoing pain or trouble seeing means medical help right away. General eye-injury guidance, not Holi-specific; no other advice was added. The consent, label and herbal-color lines are unchanged.",
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. The eye-rinsing advice follows the American Academy of Ophthalmology’s general guidance for chemical splashes (not Holi-specific); no medical advice beyond that. No advice on alcohol, bhang or other substances is given (owner decision).",
        "OPTIONAL: no campus Holi event source was read, so none is promised or named.",
      ],
    },
  ],
};

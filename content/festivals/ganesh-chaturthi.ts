import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";
import { britannica, dormSources, source } from "../shared-sources";

/**
 * Ganesh Chaturthi: P3-05 Batch B: REVIEWED 2026-11-12 (owner-approved revision 2; reviewer recorded internally). The loader publishes only items that stay `reviewed` and valid. Source pack:
 * docs/research/cultural/ganesh-chaturthi.md. No festival dates anywhere in this file (historical years about the
 * public festival's history are sourced and are not 2027 dates); `occurrences` stays empty. `reviewNotes` are
 * internal and never published.
 */

const sources: readonly ContentSource[] = [
  britannica({
    id: "gc-brit",
    title: "Ganesh Chaturthi",
    url: "https://www.britannica.com/topic/Ganesh-Chaturthi",
    claimsSupported: [
      "Festival of Ganesha’s birth on the fourth day of Bhadrapada, lasting up to 10 days; home shrines and public pandals",
      "Prana pratishtha, the 16-step worship, mantras and the Ganapati Atharvashirsha; coconut, jaggery and 21 modaks; one and a half to eleven days; final puja and immersion as Ganesha’s journey home to Kailash",
      "Revival of the festival as a large public event by Tilak in 1893; environmental concerns about plaster of Paris and chemical paints; eco-friendly clay and natural paints",
    ],
  }),
  britannica({
    id: "gc-brit-ganesha",
    title: "Ganesha",
    url: "https://www.britannica.com/topic/Ganesha",
    claimsSupported: [
      "Ganesha as the elephant-headed god of beginnings and a remover of obstacles; the rat as his vehicle; round sweets he is fond of",
      "Many different stories of his birth: made from cloth, or from dirt kneaded from Parvati’s body; the beheading and the elephant head; a variant with Shani; child of Parvati alone yet regarded as the child of both",
    ],
  }),
  britannica({
    id: "gc-brit-tilak",
    title: "Bal Gangadhar Tilak",
    url: "https://www.britannica.com/biography/Bal-Gangadhar-Tilak",
    claimsSupported: [
      "Tilak organized a Ganesh festival in 1893, and edited the newspapers Kesari and The Mahratta",
    ],
  }),
  source({
    id: "gc-shivapurana",
    kind: "text",
    title: "Shiva Purana, Rudra Samhita, Kumara Khanda, chapter 13: The birth of Ganesha (J. L. Shastri translation, on wisdomlib)",
    url: "https://www.wisdomlib.org/hinduism/book/shiva-purana-english/d/doc226133.html",
    publisher: "wisdomlib.org (translation by J. L. Shastri, 1950)",
    claimsSupported: [
      "Parvati, advised by her companions Jaya and Vijaya that Shiva’s attendants serve only him, makes a servant of her own from the dirt of her body and posts him as gatekeeper while she bathes; he does not recognize Shiva and bars his way",
      "The chapter’s opening frame says the story of Ganesha’s birth differs from one age (kalpa) to another and that in one version his head was cut off by Shiva and an elephant’s head put on him; a translator’s note says he is born of Parvati alone and mentions the Shani variant; no broken tusk is mentioned",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (chapter 13, verses 1 to 39 and its three footnotes, and the section index page for the section label). The head-cutting episode itself is told in later chapters (the index lists a chapter on the head being cut off in the battle), which were not read. Terms review: the page shows a disclaimer that these are translations not necessarily approved by everyone associated with the traditions; no copyright line and no terms page link visible; the translation is Shastri’s (1950). Unchecked. We paraphrase and quote nothing.",
  }),
  source({
    id: "gc-haf",
    kind: "cultural",
    title: "Ganesha Chaturthi: the day to celebrate Ganesha’s birth",
    url: "https://www.hinduamerican.org/blog/ganesha-chaturthi-the-day-to-celebrate-ganeshas-birth",
    publisher: "Hindu American Foundation",
    claimsSupported: [
      "The best-known birth story: Parvati makes a boy to guard her bath; Shiva beheads him and gives him an elephant’s head; stories vary on how he got the head",
      "Remover of obstacles; the mouse as the wandering mind; clay images in homes and pandals; invoking Ganesha’s presence; ten-day festival; visarjan as a return to Mount Kailash",
      "Tilak and the independence movement; a ten-day festival",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool (article body verbatim). Terms review: no terms page found; the linked privacy policy has no reuse terms; footer shows copyright. Unchecked.",
  }),
  source({
    id: "gc-ht2010",
    kind: "cultural",
    title: "Festivals: Ganesha Chaturthi",
    url: "https://www.hinduismtoday.com/magazine/april-may-june-2010/2010-04-festivals-ganesha-chaturthi/",
    publisher: "Hinduism Today (Himalayan Academy)",
    claimsSupported: [
      "A birthday celebrating Ganesha’s appearance; unbaked clay images; daily puja for ten days; a simple puja and a procession of departure; Ganesha is returned to the water after removing non-degradable decorations; Mumbai’s exuberant celebrations",
    ],
    termsChecked: true,
    termsNote: "Content read in full through the fetch tool. Terms review: Terms of Service read 2026-11-08 for the Sankranti sources: content is owned by Himalayan Academy and may not be published, displayed or turned into derivative works without permission except as copyright law allows; summarising and linking are not addressed. We paraphrase and link only.",
  }),
  source({
    id: "gc-hpi2024",
    kind: "other",
    title: "Hindus Ready for Ganesha Chaturthi Festival (Hindu Press International, from Times Now)",
    url: "https://www.hinduismtoday.com/hpi/2024/09/04/hindus-ready-for-ganesha-chaturthi-festival/",
    publisher: "Hindu Press International (2024)",
    claimsSupported: ["Celebrated in several states, with Maharashtra, Gujarat, Odisha, Uttar Pradesh and Karnataka named; clay statues in homes and public places; immersion on Anant Chaturdashi"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: footer shows copyright; no terms page found. Unchecked.",
  }),
  source({
    id: "gc-brandeis",
    kind: "academic",
    title: "Ganesh Chaturthi (A Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/ganesh-chaturthi.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    claimsSupported: ["The birthday of Ganesha, one of the most popular Hindu festivals; known for removing obstacles"],
    termsChecked: false,
    termsNote: "Content read in full in the browser (the fetch tool was refused with a 403; two sentences). Terms review: not done.",
  }),
  source({
    id: "gc-brut",
    kind: "other",
    title: "Ganesh Chaturthi Was Once Mostly A Private Celebration. Who Took It To The Streets In The 1890s?",
    url: "https://www.brut.media/in/articles/ganesh-chaturthi-was-once-mostly-a-private-celebration-who-took-it-to-the-streets-in-the-1890s",
    publisher: "Brut India (2026)",
    claimsSupported: [
      "Largely private before the late 19th century; royal patronage under the Peshwas in Pune that ended in 1818",
      "Tilak and the key year 1893; Bhau Rangari’s earlier public Ganapati, possibly 1892; an ongoing disagreement over 1892 versus 1893; public mandals; spread to many towns by 1905",
    ],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: links to legal notice and terms of service seen, not read. Unchecked. A news-media explainer, used for the history with attribution.",
  }),
  source({
    id: "gc-fpj-tilak",
    kind: "other",
    title: "Know how Lokamanya Bal Gangadhar Tilak became the architect of Ganesh Chaturthi public celebrations",
    url: "https://www.freepressjournal.in/india/watch-video-know-how-lokamanya-bal-gangadhar-tilak-became-the-architect-of-ganesh-chaturthi-public-celebrations",
    publisher: "Free Press Journal (2021)",
    claimsSupported: ["Mostly private before; Bhausaheb Rangari’s public celebration “believed to be the spark”; Tilak’s praise in Kesari and the birth of the Sarvajanik Ganesh Utsav"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: a disclaimer link seen, not read. Unchecked. A news-media feature, used only for points that Brut and Britannica also support.",
  }),
  source({
    id: "gc-tribune",
    kind: "other",
    title: "Idol immersion: Ban on use of plastic, plaster of Paris, thermocol to make statues (PTI)",
    url: "https://www.tribuneindia.com/news/nation/idol-immersion-ban-on-use-of-plastic-plaster-of-paris-thermocol-to-make-statues-84322/amp",
    publisher: "The Tribune (PTI), 2020",
    claimsSupported: ["Indian pollution-control guidelines on idols discourage plastic, thermocol and plaster of Paris and toxic paints and favor natural clay, natural colours and designated tanks; earlier guidelines had gone largely unheeded"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: copyright line only; no reuse terms. Unchecked. A 2020 wire report of Indian guidelines, not a US rule and not the guidelines themselves; used only for the general direction of the guidance.",
  }),
  source({
    id: "gc-telangana",
    kind: "other",
    title: "Central PCB issue revised guidelines for eco-friendly Ganesh idol immersion",
    url: "https://telanganatoday.com/central-pcb-issue-revised-guidelines-for-eco-friendly-ganesh-idol-immersion",
    publisher: "Telangana Today (2025)",
    claimsSupported: ["2025 guidance reported: natural clay instead of plaster of Paris; biodegradable natural colours; artificial immersion ponds"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: the linked privacy policy was read and has no reuse or linking terms; no terms-of-use page found. Unchecked.",
  }),
  source({
    id: "gc-citizen",
    kind: "other",
    title: "Eco-friendly Ganpati celebrations: Will Mumbai’s sarvajanik mandals comply?",
    url: "https://citizenmatters.in/cpcb-guidelines-eco-friendly-ganpati-celebrations-sarvakanik-mandals",
    publisher: "Citizen Matters (2024)",
    claimsSupported: ["Households use shadu clay that dissolves in water; oil paints contain heavy metals such as lead and cadmium; large mandals find clay idols fragile and heavy; the guidelines were not statutory"],
    termsChecked: false,
    termsNote: "Content read in full through the fetch tool. Terms review: links to terms and republishing pages seen, not read. Unchecked.",
  }),
  ...dormSources,
];

export const ganeshChaturthi: FestivalRecord = {
  slug: "ganesh-chaturthi",
  name: "Ganesh Chaturthi",
  // BASICS (P3-05 Batch B, reviewed 2026-11-12). "Ganesha Chaturthi" (HAF, Hinduism Today) is a spelling variant of the name
  // and is not added as an alias, so a search for "ganesha" keeps matching the deity.
  aliases: ["Vinayaka Chaturthi"],
  subtitle: "A festival honoring the birth of Ganesha",
  deities: ["Ganesha", "Parvati", "Shiva"],
  basics: { status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "A festival celebrating the birth of Ganesha, the elephant-headed god of beginnings and remover of obstacles. It begins on the fourth day (chaturthi) of the month of Bhadrapada.",
      sourceIds: ["gc-brit", "gc-brit-ganesha", "gc-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Length of observance",
      text: "Counting the first day as day one, the festival can run to the eleventh day, called Anant Chaturdashi. Sources also call it a ten-day festival because it ends ten days after the first. Many homes keep Ganesha for a shorter, odd number of days: one and a half, three, five or seven, as the family’s tradition suggests.",
      tradition: "Varies by family and community",
      sourceIds: ["gc-brit", "gc-haf", "gc-ht2010"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Associated deities",
      text: "Ganesha, with his parents Shiva and Parvati in his birth stories.",
      tradition: "Puranic traditions",
      sourceIds: ["gc-brit", "gc-brit-ganesha", "gc-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Common customs",
      text: "Welcoming a clay image of Ganesha into the home or a community pandal, daily worship and offerings, and a final farewell, with the image carried to water for immersion.",
      sourceIds: ["gc-brit", "gc-haf", "gc-ht2010"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      label: "Signature foods",
      text: "Modaks, sweet dumplings regarded as Ganesha’s favorite, along with coconut, jaggery and other round sweets such as laddus, offered first and then shared as prasada.",
      tradition: "Regional; varies by community",
      sourceIds: ["gc-brit", "gc-brit-ganesha"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
  ],

  deityEntries: [
    {
      name: "Ganesha",
      role: "The elephant-headed god of beginnings, traditionally worshipped before any major undertaking and honored as a remover of obstacles. His festival celebrates his birth.",
      tradition: "Hindu traditions; Puranic birth stories vary",
      sourceIds: ["gc-brit", "gc-brit-ganesha", "gc-haf", "gc-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Parvati",
      role: "In the best-known birth story, Ganesha’s mother, who shapes him as a boy to guard her while she bathes. In that version she alone makes him, though he is traditionally regarded as the child of both Parvati and Shiva.",
      tradition: "Puranic tradition; versions vary",
      sourceIds: ["gc-brit-ganesha", "gc-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
    {
      name: "Shiva",
      role: "Parvati’s husband and, in tradition, Ganesha’s father. In the best-known story he replaces the boy’s lost head with an elephant’s head.",
      tradition: "Puranic tradition; versions vary",
      sourceIds: ["gc-brit-ganesha", "gc-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Ganesh Chaturthi?",
      body: [
        "Ganesh Chaturthi celebrates the birth of Ganesha, the elephant-headed god worshipped as the remover of obstacles and the god of beginnings. Many Hindus invoke him before starting a new task, a journey or a ritual, so welcoming him at the start of a festival feels fitting.",
        "The festival begins on the fourth day of the month of Bhadrapada. A clay image of Ganesha is installed in a home or in a decorated community pandal, worshipped for a number of days, and then carried in procession to water for immersion, a farewell that symbolizes his journey home. It is a quiet family observance in some houses and a large public celebration in others, especially in Maharashtra, and it is observed by Hindu communities around the world.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-brit-ganesha", "gc-haf", "gc-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: the overview rests on four sources (Britannica, HAF, Brandeis and Hinduism Today through the observances).",
        "EDITORIAL: no date appears. “Many Hindus invoke him before starting a new task” follows Britannica’s statement that he is traditionally worshipped before any major enterprise.",
      ],
    },
    {
      kind: "story",
      title: "Ganesha’s birth: more than one story",
      tradition: "Shiva Purana and other Puranic traditions; versions vary",
      body: [
        "Many different stories are told about how Ganesha was born. One well-known telling is in the Shiva Purana, in its Rudra Samhita. There Parvati’s companions Jaya and Vijaya remind her that Shiva’s attendants serve only him, and she decides to have a servant of her own. From the dirt of her body she makes a handsome young man, gives him clothes and a staff, and sets him as gatekeeper while she bathes. When Shiva comes to the door, the young man does not recognize him and bars his way. The account’s opening says that in one version Ganesha’s head was cut off by Shiva and an elephant’s head was put on him. In this telling Ganesha is born of Parvati alone, though he is traditionally regarded as the child of both Parvati and Shiva.",
        "The Purana itself says the story differs from one age to another, and other tellings differ. In one Parvati makes her son from a piece of cloth and asks Shiva to bring him to life, and in some variants the planet Saturn’s glance, not Shiva, is the cause of the lost head. HAF notes that stories vary on how Ganesha got his elephant head. This guide does not choose one version as the true one.",
      ].join("\n\n"),
      sourceIds: ["gc-shivapurana", "gc-brit-ganesha", "gc-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE (revision 2): one targeted attempt found and read a primary source: Shiva Purana, Rudra Samhita, Kumara Khanda, chapter 13, in J. L. Shastri’s translation on wisdomlib (read in full, verses 1 to 39 and footnotes). It supports the dirt of Parvati’s body, the companions’ advice, the gatekeeper with a staff, and Ganesha barring Shiva. The head-cutting appears in that chapter only in its opening frame (Brahma says the story varies by kalpa and that in one version Shiva cut off the head and an elephant’s head was put on), and the chapter ends before the confrontation is resolved. The later chapter on the head, listed in the index, was not read.",
        "SOURCE NOTE: Britannica supplies the cloth version, the Saturn variant and the statement that he is traditionally regarded as the child of both; HAF supplies that stories vary on the elephant head. The translator’s footnotes also mention the Saturn variant and say Ganesha is born of Parvati’s body without Shiva’s intervention.",
        "EDITORIAL: the broken-tusk connection was removed (owner direction): the Shiva Purana chapter does not mention a tusk, and the only source is Britannica’s retelling. The beheading stays non-graphic. “Born of Parvati alone” follows the translator’s footnote and Britannica.",
        "OPTIONAL: other Puranic versions (for example Brahmanda or Skanda traditions) and the later Shiva Purana chapter on the head were not read; none is named.",
      ],
    },
    {
      kind: "significance",
      title: "Ganesha, the remover of obstacles",
      tradition: "Hindu traditions",
      body: [
        "Ganesha’s name means “Lord of the People” and “Lord of the Ganas,” the hosts that attend Shiva. He is potbellied and usually shown holding sweets, with a rat as his vehicle. Britannica notes that, like a rat and like an elephant, he is a remover of obstacles, and HAF reads the rat as a picture of the wandering mind that devotees try to steady. He is worshipped before a new beginning, and Brandeis describes him as known for making the impossible possible and filling life with success and happiness.",
        "Because he is invoked first in many rituals, the festival of his birth is one of the most popular in the Hindu calendar. Families and communities see it as a chance to begin the season with his blessing.",
      ].join("\n\n"),
      sourceIds: ["gc-brit-ganesha", "gc-haf", "gc-brandeis"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: Britannica Ganesha (name, vehicle, remover of obstacles), HAF (the mouse as the wandering mind), Brandeis (success and happiness). “One of the most popular festivals” is Brandeis. The last sentence is a mild editorial summary.",
        "OPTIONAL: Ganesha’s marriages and celibate forms (Britannica) and Ashtavinayaka temples are not described.",
      ],
    },
    {
      kind: "rituals",
      title: "Welcoming Ganesha",
      body: [
        "Before the festival, artisans make and sell Ganesha images, from small figures that families may make at home to very large ones. At the start, an image is placed on a raised platform in a home shrine or in a decorated community pandal. The worship begins with prana pratishtha, a ritual to invite life into the image, followed by the sixteen-step worship called shodashopachara. Mantras and hymns are chanted, including the Ganapati Atharvashirsha, and the image is anointed with red sandalwood paste and decorated with flowers.",
        "The image is worshipped for an odd number of days. In homes the celebration can end after one and a half, three, five or seven days as a family’s tradition suggests. In some homes and in larger public celebrations it lasts until Anant Chaturdashi, which is the eleventh day if the first day is counted as day one and ten days after the first, and this is why sources call it a ten-day festival. At the end a final puja, the uttarapuja, says goodbye to Ganesha. The image is then carried to water in a family walk or a large procession with drums, singing and dancing and immersed in an act called visarjan, understood as Ganesha’s journey home to Mount Kailash, where his parents Shiva and Parvati live.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-haf", "gc-ht2010", "gc-hpi2024"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "SOURCE NOTE: nearly every detail is Britannica; HAF supports clay images, invoking Ganesha, the sixteen steps and visarjan as a return to Kailash; Hinduism Today supports daily puja, a simple farewell puja and a procession; HPI supports immersion on Anant Chaturdashi. Britannica says the longest observance ends “on the 11th day (called anant chaturdashi, or 10 days following the first day)”; HAF, Hinduism Today and Hindu Press International say “ten days”. Revision 2 states the counting convention explicitly (day one is the first day; Anant Chaturdashi is the eleventh day and ten days after the first).",
        "OPTIONAL: Gauri Aagman (Gauri’s arrival on the third or fourth day) and the chant “Ganpati Bappa Morya” are not included: the only sources that mention them (Maharashtra Tourism and Incredible India) were read only in part and mostly through a model summary, so they are not relied on.",
      ],
    },
    {
      kind: "food",
      title: "Modaks and sweets",
      tradition: "Regional; varies by community",
      body: [
        "Offerings to Ganesha include coconut, jaggery, and 21 modaks, sweet dumplings that Britannica says are considered his favorite food. Hinduism Today describes the modaka in his hand as a symbol of enlightened attainments. Laddus and other round sweets are offered too, and once blessed they are shared with everyone as prasada. HAF adds that prasada is distributed throughout the community during the festival. What a family prepares varies with its region and tradition.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-brit-ganesha", "gc-ht2010", "gc-haf"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: no fasting or vegetarian claim is made; no source read describes fasting for Ganesh Chaturthi.",
        "SOURCE NOTE: the number 21 is Britannica; a Mangalorean modak recipe in the Hinduism Today article is not used.",
      ],
    },
    {
      kind: "significance",
      title: "How the festival became a public celebration",
      tradition: "Maharashtra; historical",
      body: [
        "Brut describes Ganesh Chaturthi as largely a private celebration before the late nineteenth century, though Ganesh celebrations in Pune received royal patronage under the Peshwas until their fall in 1818. The festival took its modern public form in the 1890s. Britannica credits the independence leader Bal Gangadhar Tilak with reviving it as a large public event in Maharashtra in 1893, when the British banned political assemblies. Tilak praised the public celebration in his Marathi newspaper Kesari, and mandals, community groups, collected funds locally and installed large images in decorated pavilions.",
        "Who first took the festival public is still debated. Some research credits Bhausaheb Rangari with a public celebration in Pune as early as 1892, and writers disagree on whether 1892 or 1893 marks the beginning, so this guide does not treat either year as settled. What the sources agree on is that the public festival grew in the 1890s and spread to many towns.",
        "Today the public festival is especially large in Maharashtra, including Mumbai and Pune, and is celebrated in many other parts of India and by Hindu communities worldwide.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-brit-tilak", "gc-brut", "gc-fpj-tilak"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (revision 2, owner direction): the Shivaji and nationalism claim was removed (Britannica alone states Shivaji used the festival to encourage nationalist sentiment; HAF only says “some historians believe” it became a public event in the 1600s and Free Press Journal says Shivaji “reinvigorated” it, so there is no independent corroboration of the nationalist motive). The Britannica clause that Tilak’s symbolism made the movement “more communal” was removed from the public guide. Brut’s mention of Hindu-Muslim clashes in 1893 stays out.",
        "SOURCE NOTE: the 1890s history is sourced to Britannica (Tilak, 1893, the ban on political assemblies), Brut (private before; Peshwa patronage ending in 1818; 1893 as the key year; Rangari possibly 1892; the disagreement; mandals) and Free Press Journal (Rangari “believed to be the spark”; Kesari). Brut and FPJ are news-media features, not scholarship; no academic history was read.",
        "OPTIONAL: an academic history of the sarvajanik Ganeshotsav would allow the 1892 versus 1893 question and Tilak’s role to be stated with more confidence.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Home shrines, pandals and communities",
      tradition: "Regional; varies by community",
      body: [
        "In Maharashtra the festival is especially prominent. Cities such as Mumbai and Pune host very large community celebrations, and Hinduism Today calls Mumbai the place where the festival is observed with the most creativity and enthusiasm. Hindu Press International lists Maharashtra, Gujarat, Odisha, Uttar Pradesh and Karnataka among the many states where it is celebrated. Britannica notes that it is celebrated with pomp and devotion in Hindu communities worldwide.",
        "Within a single town the festival can look very different from house to house. A small home image may be kept for a day and a half, while a neighborhood mandal’s large image stays for ten days or more. Neither is more correct than the other; a family or community follows its own tradition.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-ht2010", "gc-hpi2024"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "OPTIONAL: Andhra Pradesh and Telangana (Vinayaka Chavithi), Tamil Nadu (Pillaiyar), Goa and Karnataka customs are not described: no reliable source read covers them, and none are invented. Karnataka is named only in the HPI list of states.",
        "OPTIONAL: Gauri Aagman and temple-specific celebrations (Lalbaugcha Raja, Siddhivinayak) are not described: only partially read sources mention them.",
      ],
    },
    {
      kind: "traditional_guide",
      title: "Environmentally responsible immersion",
      tradition: "Guidance from India and for communities elsewhere",
      body: [
        "Immersing images in rivers, lakes and the sea has raised environmental concerns. Britannica notes that many large public statues are made of plaster of paris, which does not break down, and painted with chemical paints that contain metals such as lead, mercury and chromium. In India, environmental groups and local governments encourage images made of dissolving clay or soil and decorated with natural colors, and pollution-control authorities have issued guidelines that discourage plaster of paris, plastic and toxic paints and favor designated immersion tanks. Reports say these guidelines have been unevenly followed and that large community groups find clay images heavy and fragile.",
        "Households can choose a small, unbaked clay image painted with natural colors or left unpainted, and can remove decorations that do not dissolve before the farewell. Hinduism Today notes that the image is returned to the water after non-degradable decorations are removed. Rules and arrangements for immersion differ from place to place, so a temple or community organizer is the best guide to what is appropriate locally.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-tribune", "gc-telangana", "gc-citizen", "gc-ht2010"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL (revision 2, owner direction): the specific Central Pollution Control Board claims (the 2020 revision, the 2025 guidance, named materials and fines) were generalized, because the guidelines themselves (a PDF) were not read and the claims rest on two news reports. The home bucket-immersion steps and the pour-the-water-on-plants advice were removed; the guide now points readers to a temple or community organizer.",
        "SOURCE NOTE: the general direction of the guidance is supported by Britannica, the Tribune/PTI report (2020), Telangana Today (2025) and Citizen Matters (2024, uneven enforcement; clay fragile and heavy for large groups). The Hans India home-immersion article was dropped from the guide’s sources and stays in the pack as read and not used.",
        "OPTIONAL: no source on immersion rules in the United States was found; a temple’s guidance or a municipal rule would allow specific local advice. The text deliberately says only that arrangements differ by place.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Ganesh Chaturthi away from home",
      body: [
        "You can welcome Ganesha even in a small room.",
        "Find your people. Ask a Hindu or Indian student association or a nearby temple whether it hosts an installation, aarti or immersion, and whether you can join online.",
        "Choose a small clay image. A small, unbaked clay Ganesha with natural colors, or an unpainted one, is easy to keep in a room and easy to immerse responsibly. You can keep him for as many days as suit your family’s tradition and your schedule.",
        "Worship without a flame. Many residence halls ban open flames, including candles, oil lamps and incense, so check your housing contract and use a battery-powered lamp and fresh flowers. If you have questions about religious accommodations, ask your residence life office.",
        "Plan the farewell with a temple or community organizer, who will know what local arrangements are appropriate. Rules on immersing images in lakes, rivers or the sea differ from place to place.",
        "Share sweets thoughtfully. Modaks and other sweets can contain coconut or nuts, so tell friends what is in what you share.",
        "Call home. A video call with family during the puja keeps you part of the celebration.",
      ].join("\n\n"),
      sourceIds: ["gc-brit", "gc-ht2010", "dorm-appstate", "dorm-uga"],
      status: "reviewed", reviewedAt: "2026-11-12", reviewedBy: "desi-days-editorial",
      reviewNotes: [
        "EDITORIAL: practical suggestions, not cultural claims; no college is named. The small unpainted clay image and natural colors follow the sources. Revision 2 removed the dorm bucket-immersion and pour-the-water-on-plants instructions (owner direction); the farewell is left to a temple or community organizer.",
        "EDITORIAL: allergen wording (coconut or nuts) is a general caution; no source lists modak ingredients.",
        "OPTIONAL: no Atlanta-area Ganesh Chaturthi event, temple or student group has been verified, so none is named.",
      ],
    },
  ],
};

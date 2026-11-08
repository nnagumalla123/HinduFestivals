import type { ContentSource, FestivalRecord } from "@/lib/festivals/content/schema";

/**
 * Diwali: P3-03 DRAFT. Every section below is `draft`: nothing here reaches a public page until the
 * owner reviews it and flips the status (the loader is fail-closed). Source pack:
 * docs/research/cultural/diwali.md. No dates anywhere in this file.
 *
 * `termsChecked` is false on every source on purpose: the owner confirms reuse terms before review
 * (we only paraphrase and link). `reviewNotes` are internal and never published.
 */

const ACCESSED = "2026-11-07";

const sources: readonly ContentSource[] = [
  {
    id: "diwali-britannica",
    role: "cultural",
    kind: "cultural",
    title: "Diwali (The Festival of Lights)",
    url: "https://www.britannica.com/story/the-festival-of-lights",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Meaning of the name; light over darkness",
      "Five-day structure and what each day commemorates",
      "Regional meanings (Rama in the north, Krishna and Narakasura in the south, Kali in Bengal, Lakshmi variants)",
      "Early history and Puranic mentions",
      "Customs: diyas, rangoli, open doors, visiting, gifts, feasting, feeding the poor, fireworks restrictions",
      "Jain and Sikh meanings",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "diwali-britannica-difference",
    role: "cultural",
    kind: "cultural",
    title: "What is the difference between Diwali and Dussehra?",
    url: "https://www.britannica.com/question/What-is-the-difference-between-Diwali-and-Dussehra",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: ["Dussehra and Diwali both connect to the Rama and Ravana story; Diwali marks the homecoming"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "diwali-britannica-diya",
    role: "cultural",
    kind: "cultural",
    title: "Diya",
    url: "https://www.britannica.com/technology/diya",
    publisher: "Encyclopaedia Britannica",
    accessedAt: ACCESSED,
    claimsSupported: [
      "What a diya is and is made of",
      "Symbolism of oil and wick; lighting a lamp as dispelling ignorance",
      "Ayodhya residents said to have lit lamps for Rama",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Terms read 2026-11-07 (corporate.britannica.com/termsofuse.html): personal non-commercial use and limited nonprofit educational copying are allowed; any other reproduction needs Britannica’s permission, including AI training or analysis. We paraphrase in original wording and link; no text, images or AI use. No explicit licence to republish.",
  },
  {
    id: "diwali-princeton",
    role: "cultural",
    kind: "academic",
    title: "About Diwali",
    url: "https://diwali.princeton.edu/about/about-diwali",
    publisher: "Princeton University (Diwali at Princeton)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Meaning of the name; themes of light, good, knowledge, hope",
      "Common practices; fireworks and sweets as later mainstays",
      "Rama, Krishna and Narakasura, Lakshmi legends; Jain, Sikh and Newar Buddhist observances",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found; footer shows copyright only. Unchecked.",
  },
  {
    id: "diwali-brandeis",
    role: "cultural",
    kind: "academic",
    title: "Diwali (Guide to Religious Observances)",
    url: "https://www.brandeis.edu/spiritual-life/resources/guide-to-observances/diwali.html",
    publisher: "Brandeis University, Center for Spiritual Life",
    accessedAt: ACCESSED,
    claimsSupported: ["Diwali in Hinduism, Jainism and Sikhism with different meanings; worship, sweets, lights"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Terms not checked.",
  },
  {
    id: "diwali-haf",
    role: "cultural",
    kind: "cultural",
    title: "HAF's Diwali Resources and Toolkit",
    url: "https://www.hinduamerican.org/diwali-toolkit",
    publisher: "Hindu American Foundation",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Rows of lamps; light over darkness; practices vary by region",
      "Deep cleaning, rangoli or kolam, charity",
      "Some regions mark Diwali as the Hindu new year",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No general terms page found (a privacy policy and an images guide only); footer shows copyright. Unchecked.",
  },
  {
    id: "diwali-valmiki",
    role: "cultural",
    kind: "text",
    title: "Valmiki Ramayana, Yuddha Kanda sargas 127 and 128 (prose translation by K. M. K. Murthy)",
    url: "https://www.valmikiramayan.net/yuddha/sarga127/yuddha_127_prose.htm",
    publisher: "valmikiramayan.net",
    accessedAt: ACCESSED,
    claimsSupported: ["What the Ramayana says about Rama's welcome at Ayodhya: flags, flowers, scented water, procession, coronation; no festival of lights"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Not checked (translation is copyrighted by its translator).",
  },
  {
    id: "diwali-bhagavata-naraka",
    role: "cultural",
    kind: "text",
    title: "Bhagavata Purana 10.59, The Killing of the Demon Naraka (Bhaktivedanta Book Trust translation)",
    url: "https://vedabase.io/en/library/sb/10/59/",
    publisher: "Bhaktivedanta Book Trust (vedabase.io)",
    accessedAt: ACCESSED,
    claimsSupported: ["Krishna and Satyabhama defeat Naraka and free the captive women; no lamps or festival mentioned"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found on vedabase.io (privacy policy only); text is shown with a Bhaktivedanta Book Trust permission notice. Unchecked.",
  },
  {
    id: "diwali-bhagavata-govardhana",
    role: "cultural",
    kind: "text",
    title: "Bhagavata Purana 10.24 and 10.25, Govardhana Hill (Bhaktivedanta Book Trust translation)",
    url: "https://vedabase.io/en/library/sb/10/25/",
    publisher: "Bhaktivedanta Book Trust (vedabase.io)",
    accessedAt: ACCESSED,
    claimsSupported: ["Krishna directs the villagers to honor Govardhana; Indra's storm; Krishna lifts the hill; no lamps or festival mentioned"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found on vedabase.io (privacy policy only); text is shown with a Bhaktivedanta Book Trust permission notice. Unchecked.",
  },
  {
    id: "diwali-bhagavata-lakshmi",
    role: "cultural",
    kind: "text",
    title: "Bhagavata Purana 8.8, The Churning of the Milk Ocean (Bhaktivedanta Book Trust translation)",
    url: "https://vedabase.io/en/library/sb/8/8/",
    publisher: "Bhaktivedanta Book Trust (vedabase.io)",
    accessedAt: ACCESSED,
    claimsSupported: ["Lakshmi emerges from the churning of the ocean and chooses Vishnu; no Diwali link made"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "No terms page found on vedabase.io (privacy policy only); text is shown with a Bhaktivedanta Book Trust permission notice. Unchecked.",
  },
  {
    id: "diwali-malaiya",
    role: "cultural",
    kind: "academic",
    title: "Lord Mahavira's Nirvana: Diwali",
    url: "https://www.cs.colostate.edu/~malaiya/diwali.html",
    publisher: "Yashwant K. Malaiya (Colorado State University faculty web page on Jain festivals)",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Jains observe Diwali as the day of Mahavira's nirvana",
      "An early Jain text describes kings lighting lamps on that occasion",
      "The Vikrama year begins at Diwali in Gujarat",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Personal faculty page; no terms or copyright statement found beyond the author's byline. Unchecked.",
  },
  {
    id: "diwali-sikhnet",
    role: "cultural",
    kind: "cultural",
    title: "Bandi Chhor Divas",
    url: "https://sikhnet.com/news/bandi-chhor-divas-0",
    publisher: "SikhNet",
    accessedAt: ACCESSED,
    claimsSupported: [
      "Bandi Chhor Divas, the Day of Liberation, commemorates Guru Hargobind's release from Gwalior Fort together with 52 princes",
      "On his return to Amritsar the Golden Temple was illuminated; Sikhs gather at gurdwaras for prayer and langar",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: true,
    termsNote: "Copyright and Fair Use page read 2026-11-07 (a DMCA procedure, no general terms page found): it states no restriction on summarising or linking and grants no licence to reproduce. We paraphrase and link only.",
  },
  {
    id: "diwali-birmingham-kali",
    role: "cultural",
    kind: "academic",
    title: "Blog: Kali Puja, the Bengali way of celebrating Diwali",
    url: "https://intranet.birmingham.ac.uk/student/news/public/2025/oct-dec25/blog-kali-puja-the-bengali-way-of-celebrating-diwali.aspx",
    publisher: "University of Birmingham (UK), student news blog by a PhD student from West Bengal",
    accessedAt: ACCESSED,
    claimsSupported: [
      "In West Bengal the same new-moon night is celebrated as Kali Puja (called Deepabali), with the goddess Kali worshipped at night",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "University news blog (a personal account by a Bengali community member); no terms page read. Used for one factual point, paraphrased, with a link.",
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
    id: "dorm-louisville",
    role: "cultural",
    kind: "other",
    title: "Residence Hall Safety",
    url: "https://safety.louisville.edu/fire-safety/housing/residence-hall",
    publisher: "University of Louisville Public Safety",
    accessedAt: ACCESSED,
    claimsSupported: ["Candles and open-flame devices prohibited; no daisy-chained extension cords; breaker power strips preferred"],
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
    claimsSupported: [
      "Candles, incense and open flames prohibited; string, strip and rope lights also prohibited at this school",
      "In-room cooking is limited to certain sealed appliances",
    ],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Public institutional policy cited for a general pattern, not reproduced. Terms not checked.",
  },
  {
    id: "diwali-bath-reslife",
    role: "cultural",
    kind: "academic",
    title: "Finding light away from home",
    url: "https://reslife.bath.ac.uk/story/20977853/finding-light-away-from-home",
    publisher: "University of Bath (UK), Residence Life",
    accessedAt: ACCESSED,
    claimsSupported: ["Ideas for Diwali away from home: LED or battery diyas, painting diyas, rangoli, calling family, sharing meals, joining student societies"],
    reproducesProtectedContent: false,
    permissionRequired: "no",
    permissionStatus: "not_needed",
    termsChecked: false,
    termsNote: "Terms not checked.",
  },
];

export const diwali: FestivalRecord = {
  slug: "diwali",
  name: "Diwali",
  aliases: ["Deepavali"],
  subtitle: "The festival of lights",
  // PROPOSED BASICS (P3-04B, still draft; nothing displays until the owner reviews them): the name, aliases,
  // subtitle and deity search terms below are the proposed final wording. Every deity is also an attributed
  // entry in `deityEntries`; a search term never claims more than those entries.
  deities: ["Lakshmi", "Rama", "Krishna", "Kali"],
  basics: { status: "draft" },
  sources,
  occurrences: [],

  quickFacts: [
    {
      label: "Meaning",
      text: "“Row of lights” (from the Sanskrit dipavali), widely understood as light over darkness.",
      sourceIds: ["diwali-britannica", "diwali-princeton"],
      status: "draft",
    },
    {
      label: "Length of observance",
      text: "Often described as five days. Lakshmi Puja, on the new-moon night, is a central observance for many communities. Counts and customs vary by region and family.",
      sourceIds: ["diwali-britannica", "diwali-haf"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: Britannica says five days and calls Lakshmi Puja the main day; HAF's text says five but its list shows six. Public wording softened to 'a central observance for many communities' (owner direction).",
      ],
    },
    {
      label: "Associated deities",
      text: "Lakshmi (widely); Rama (northern India); Krishna (southern India and Govardhan Puja); Kali (Bengal).",
      tradition: "Varies by region",
      sourceIds: ["diwali-britannica", "diwali-birmingham-kali"],
      status: "draft",
    },
    {
      label: "Common customs",
      text: "Lighting diyas, drawing rangoli, praying to Lakshmi, wearing new clothes, visiting family and friends, exchanging gifts, sharing sweets, and giving to those in need.",
      sourceIds: ["diwali-britannica", "diwali-princeton", "diwali-haf"],
      status: "draft",
    },
  ],

  deityEntries: [
    {
      name: "Lakshmi",
      role: "Goddess of good fortune and wealth. Lamps are lit and doors left open to welcome her, and Lakshmi Puja is a central evening for many families.",
      tradition: "Widespread across Hindu traditions",
      sourceIds: ["diwali-britannica", "diwali-princeton"],
      status: "draft",
    },
    {
      name: "Rama",
      role: "Hero of the Ramayana. His homecoming to Ayodhya is the best-known Diwali story in northern India.",
      tradition: "Northern India",
      sourceIds: ["diwali-britannica", "diwali-brandeis"],
      status: "draft",
    },
    {
      name: "Krishna",
      role: "Remembered for defeating the demon Narakasura (a southern Diwali story) and for lifting Govardhana Hill (Govardhan Puja).",
      tradition: "Southern India; Vaishnava traditions",
      sourceIds: ["diwali-britannica", "diwali-bhagavata-naraka", "diwali-bhagavata-govardhana"],
      status: "draft",
    },
    {
      name: "Kali",
      role: "The goddess worshipped at this time in Bengal.",
      tradition: "Bengal",
      sourceIds: ["diwali-britannica", "diwali-birmingham-kali"],
      status: "draft",
      reviewNotes: ["SOURCE NOTE: Kali in Bengal is now supported by Britannica and by a University of Birmingham student blog written by a Bengali community member (a personal account, so tradition-specific but informal). Both say Kali is worshipped on the same new-moon night; neither is a scholarly source."],
    },
  ],

  sections: [
    {
      kind: "overview",
      title: "Why celebrate Diwali?",
      body:
        "Diwali, or Deepavali, means “row of lights,” and that is the whole spirit of it: a small flame held up against the dark. Homes get cleaned and decorated, diyas glow in windows and doorways, sweets get passed around, and many families welcome Lakshmi, the goddess of good fortune, into their homes.\n\n" +
        "Why people celebrate depends on the family. In much of northern India it is Rama’s homecoming to Ayodhya. In the south it is Krishna’s victory over the demon Narakasura. For many it is simply Lakshmi’s blessing on the year ahead. Jain and Sikh communities mark these days with their own meanings, too. The stories change from home to home, but the feeling does not: light beats darkness, and the year ahead feels full of possibility.",
      sourceIds: ["diwali-britannica", "diwali-princeton", "diwali-brandeis"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: core summary rests on Britannica plus Princeton and Brandeis, which largely echo the general account (not independent confirmation).",
      ],
    },
    {
      kind: "story",
      title: "Rama comes home to Ayodhya",
      tradition: "Northern India (told widely elsewhere)",
      body:
        "In much of northern India, Diwali is the night Rama came home. After fourteen years of exile and the defeat of the demon king Ravana, Rama returned to Ayodhya with Sita, Lakshmana and Hanuman, and the tradition says the whole city lit lamps to welcome them. Families echo that welcome every year with rows of diyas.\n\n" +
        "Dussehra, earlier in the autumn, celebrates the victory over Ravana. Diwali is the homecoming.",
      sourceIds: ["diwali-britannica", "diwali-britannica-difference", "diwali-britannica-diya", "diwali-valmiki"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: the Valmiki chapters on the return (sargas 127 and 128 in the Murthy prose translation, valmikiramayan.net) describe flags, flowers, scented water, a procession and a coronation, and no festival of lights. The lamp-lit homecoming is a tradition ('said to' in Britannica; stated without hedging by Princeton, Brandeis and HAF). Public text therefore says 'the tradition says' and does not cite Valmiki.",
        "OPTIONAL: check a critical edition and other recensions (sarga numbering differs).",
        "OPTIONAL: HAF also says Sita is an incarnation of Lakshmi; not used (single source, not in the chapters read).",
      ],
    },
    {
      kind: "story",
      title: "Krishna and the demon Narakasura",
      tradition: "Southern India; Vaishnava tradition",
      body:
        "In many parts of southern India, the hero of Diwali is Krishna. The demon Narakasura had seized treasures from the gods and held many people captive, until Krishna, with his wife Satyabhama, defeated him and set the captives free. The victory is remembered on the day before the main Lakshmi Puja, and many families pray for their ancestors that day.",
      sourceIds: ["diwali-britannica", "diwali-princeton", "diwali-bhagavata-naraka"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: the Bhagavata Purana chapter (10.59, Bhaktivedanta Book Trust translation) tells the story without mentioning lamps or a festival; the link to the day is traditional (Britannica, Princeton, HAF).",
        "OPTIONAL: Britannica notes some scholars link this day to an older custom of lighting lamps for Yama; left out of public text (single source).",
      ],
    },
    {
      kind: "story",
      title: "Lakshmi finds her way in",
      tradition: "Widespread; stories vary by community",
      body:
        "For many families, Diwali is Lakshmi’s night. She is the goddess of fortune and prosperity, and homes are lit up and left open to welcome her. Communities tell different stories about why: some say the festival celebrates her birth, others her marriage to Vishnu.",
      sourceIds: ["diwali-britannica", "diwali-princeton", "diwali-bhagavata-lakshmi"],
      status: "draft",
      reviewNotes: [
        "OPTIONAL: Britannica also describes a Purana in which women, at midnight on the new-moon night, drive out misfortune and welcome Lakshmi. Removed from public text because no second source was found (owner direction).",
        "SOURCE NOTE: Bhagavata Purana 8.8 tells of Lakshmi rising from the churning of the ocean and choosing Vishnu but makes no Diwali link; the link is traditional. Not stated publicly.",
      ],
    },
    {
      kind: "story",
      title: "Krishna lifts Govardhana Hill",
      tradition: "Vaishnava traditions; the fourth day",
      body:
        "On the fourth day, many families remember Krishna lifting Govardhana Hill. When a furious storm sent by the god Indra threatened the cowherds of Vraja, Krishna held the hill up with one hand so that everyone could shelter beneath it for seven days. The day is also called Annakut and Bali Pratipada.",
      sourceIds: ["diwali-britannica", "diwali-bhagavata-govardhana"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: the Bhagavata chapters (10.24 and 10.25) do not mention lamps, Annakut or a festival; the link to the day is traditional.",
        "OPTIONAL: no source read tells the Bali (Vamana) story as part of Diwali, so it is left out; no source explains the word 'Annakut'.",
      ],
    },
    {
      kind: "rituals",
      title: "Diwali, day by day",
      body:
        "Most people describe Diwali as five days, though the count and the customs on each day vary by region and family. Here is the common outline.\n\n" +
        "Day one, Dhanteras: a day for cleaning the house and buying something small and auspicious, like a little gold. Lakshmi is honored.\n\n" +
        "Day two, Naraka Chaturdashi (also called Choti Diwali): it remembers Krishna’s victory over Narakasura, and many families pray for their ancestors.\n\n" +
        "Day three, Lakshmi Puja: for many communities, the heart of the festival. On the new-moon night, families pray to Lakshmi, light lamps and candles, and visit temples.\n\n" +
        "Day four, Govardhan Puja: it recalls Krishna and the hill. In the Vikrama calendar it is also the first day of the new year, and merchants traditionally open fresh account books.\n\n" +
        "Day five, Bhai Dooj: a day to celebrate siblings, when sisters pray for their brothers’ well-being.",
      sourceIds: ["diwali-britannica", "diwali-haf"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: day names and order follow Britannica; HAF's list adds a sixth day (Govatsa Dvadashi) at the start. Other regional counts are not sourced.",
        "EDITORIAL: owner asked that Lakshmi Puja not be presented as a universally designated main day; wording is 'for many communities'.",
      ],
    },
    {
      kind: "traditional_guide",
      title: "The customs behind the glow",
      body:
        "Diyas. These small clay or metal oil lamps line windowsills, doorways and temple steps, and some are floated on rivers. Lighting one is traditionally understood as a way to push back ignorance and welcome knowledge, purity and blessings.\n\n" +
        "Rangoli. Patterns made of colored rice, sand or flower petals decorate floors and doorways, a bright welcome for guests and good fortune.\n\n" +
        "Open doors. Doors and windows are left open so Lakshmi can find her way in.\n\n" +
        "New clothes and togetherness. Families dress up, visit one another, exchange gifts and share meals. Giving is part of the spirit too, from feeding people in need to quiet acts of charity.\n\n" +
        "Fireworks. Fireworks are part of the festivities in many places, though practices vary by community and region, and in some places they are limited or avoided. If you take part, public displays and local safety rules are the best guide.",
      sourceIds: ["diwali-britannica", "diwali-britannica-diya", "diwali-princeton", "diwali-haf"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: card games are intentionally omitted (owner decision). Fireworks wording is neutral and acknowledges that practices vary, with a simple safety pointer and no instructions (owner direction). Basis: Britannica notes displays are now restricted in some places for noise and pollution.",
        "OPTIONAL: Britannica's reading of the oil and wick as human flaws and the soul is left out.",
      ],
    },
    {
      kind: "food",
      title: "Sweets and sharing",
      body: "Sharing sweets and festive meals with family and friends is a big part of the celebration.",
      sourceIds: ["diwali-britannica", "diwali-princeton", "diwali-brandeis"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: deliberately minimal. No reputable source read names dishes, regional foods or fasting for Diwali; none are invented. No vegetarian claim is made.",
      ],
    },
    {
      kind: "regional_variation",
      title: "Many Diwalis across India",
      tradition: "Regional; varies by community",
      body:
        "There is no single Diwali, and the story you grew up with probably depends on your region and family. In Bengal, the festival is closely tied to the worship of the goddess Kali. In some regions, such as Gujarat, Diwali opens the new year in the Vikrama calendar, while other communities begin their year at other times, so it is not the Hindu new year for everyone.",
      sourceIds: ["diwali-britannica", "diwali-haf", "diwali-malaiya", "diwali-birmingham-kali"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: Kali in Bengal: Britannica plus a University of Birmingham student blog by a Bengali community member (see the Kali deity entry).",
        "SOURCE NOTE: HAF says 'some regions' mark Diwali as the new year without naming them; Britannica ties it to the Vikrama calendar; the Malaiya page says the Vikrama year begins at Diwali in Gujarat (the region named in the public text).",
      ],
    },
    {
      kind: "regional_variation",
      title: "Jain and Sikh meanings",
      tradition: "Jain; Sikh",
      body:
        "Diwali is not only a Hindu festival, and other communities light lamps for their own reasons.\n\n" +
        "For Jains, Diwali remembers the night Mahavira, the last of the Tirthankaras, attained nirvana. Jain tradition recalls kings lighting lamps that night, since the light of his wisdom had left the world.\n\n" +
        "For Sikhs, these days are Bandi Chhor Divas, the “Day of Liberation.” It remembers Guru Hargobind’s release from imprisonment in Gwalior Fort. The tradition says he would not leave unless the 52 princes held with him were freed too, and when he returned to Amritsar the Golden Temple was lit in celebration. Today Sikhs gather at gurdwaras for prayer and langar, the community meal.\n\n" +
        "Each of these traditions tells its own story in its own terms.",
      sourceIds: ["diwali-britannica", "diwali-princeton", "diwali-brandeis", "diwali-malaiya", "diwali-sikhnet"],
      status: "draft",
      reviewNotes: [
        "SOURCE NOTE: Jain paragraph verified against a Jain scholar's page (Malaiya, Colorado State University), which cites an early Jain text for the kings' lamps, plus Britannica, Princeton and Brandeis. Sikh paragraph verified against SikhNet (Bandi Chhor Divas) plus Britannica and Brandeis. The Sikh release year differs across sources and is omitted.",
        "EDITORIAL: the Newar Buddhist sentence was removed (owner direction): searches found only Wikipedia, news and blog pages, no reputable Newar Buddhist-specific source (candidate scholarship, not read: Robert Levy, Mesocosm, 1990; Bal Gopal Shrestha on the Svanti festival, 2006). Britannica and Princeton disagree on the details, so none are used. Restore only with a verified source.",
        "OPTIONAL: SikhNet describes today's observance with gurdwara gatherings and langar; fireworks and candles mentioned there are left out.",
      ],
    },
    {
      kind: "college_guide",
      title: "Celebrating Diwali away from home",
      body:
        "You can have a real Diwali in a small room with a few smart choices.\n\n" +
        "Check your housing rules first. Many U.S. residence halls ban open flames, which can include candles, oil lamps and incense, and some limit decorations like string lights too. Read your housing contract or ask your residence life office before you light or hang anything. Some schools have a process for requesting an exception for religious observance, so ask rather than assume.\n\n" +
        "Get the glow without the flame. If your housing allows them, battery-powered LED diyas or tea lights give you the same warm light. Keep cords tidy, don’t chain extension cords together, and never cover a light with paper or cloth.\n\n" +
        "Make a rangoli on paper or poster board for your door or desk. It is a mess-free way to welcome guests.\n\n" +
        "Find your people. Look for a Hindu or Indian student association, a campus Diwali event or a nearby temple celebration. Or invite friends over, share sweets from an Indian grocery and tell them your family’s story. If you cook, check the rules and use a shared kitchen when you can.\n\n" +
        "Join the puja from afar. Video call your family at Lakshmi Puja time so you are part of it.\n\n" +
        "Give something back. Giving is part of Diwali, so consider volunteering or donating.\n\n" +
        "If fireworks are part of your family’s celebration, a public display is the simplest, safest way to enjoy them.",
      sourceIds: ["dorm-appstate", "dorm-dartmouth", "dorm-louisville", "dorm-uga", "diwali-bath-reslife", "diwali-haf"],
      status: "draft",
      reviewNotes: [
        "EDITORIAL: practical guidance, not cultural claims; no college is named. The pattern claims come from five US policies read (App State, Dartmouth, Louisville, UGA and a partly read Georgia Tech).",
        "OPTIONAL: Georgia Tech section XIII and Emory still need a browser read.",
        "EDITORIAL: rangoli-on-paper, video-call and volunteering ideas are editorial suggestions, partly from the Bath (UK) page; confirm they feel authentic.",
      ],
    },
  ],
};

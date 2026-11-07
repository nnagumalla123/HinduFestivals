import type { MockFestival } from "./types";

/**
 * The ten curated festivals from the PRD. MOCK DATA: names and aliases only, with
 * one-line neutral subtitles. No dates, stories, or practices are invented here;
 * sourced and reviewed content arrives in Phase 3.
 *
 * Navaratri and Vijayadashami are separate, related guides (PRD section 2).
 * Makara Sankranti is kept separate from regional harvest customs such as Pongal.
 */
export const mockFestivals: readonly MockFestival[] = [
  {
    slug: "diwali",
    name: "Diwali",
    aliases: ["Deepavali"],
    subtitle: "The festival of lights",
    dateStatus: "not_verified",
  },
  {
    slug: "ugadi",
    name: "Ugadi",
    aliases: ["Yugadi"],
    subtitle: "A new year festival in parts of southern India",
    dateStatus: "not_verified",
  },
  {
    slug: "holi",
    name: "Holi",
    aliases: [],
    subtitle: "The festival of colors",
    dateStatus: "not_verified",
  },
  {
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    aliases: ["Vinayaka Chaturthi"],
    subtitle: "A festival honoring Ganesha",
    dateStatus: "not_verified",
  },
  {
    slug: "navaratri",
    name: "Navaratri",
    aliases: ["Navratri"],
    subtitle: "A nine-night festival",
    dateStatus: "not_verified",
  },
  {
    slug: "vijayadashami",
    name: "Vijayadashami",
    aliases: ["Dussehra", "Dasara"],
    subtitle: "Celebrated at the close of Navaratri",
    dateStatus: "not_verified",
  },
  {
    slug: "krishna-janmashtami",
    name: "Krishna Janmashtami",
    aliases: ["Janmashtami", "Gokulashtami"],
    subtitle: "A festival honoring the birth of Krishna",
    dateStatus: "not_verified",
  },
  {
    slug: "maha-shivaratri",
    name: "Maha Shivaratri",
    aliases: ["Shivaratri"],
    subtitle: "A night dedicated to Shiva",
    dateStatus: "not_verified",
  },
  {
    slug: "makara-sankranti",
    name: "Makara Sankranti",
    aliases: ["Sankranti"],
    subtitle: "A solar festival",
    dateStatus: "not_verified",
  },
  {
    slug: "rama-navami",
    name: "Rama Navami",
    aliases: [],
    subtitle: "A festival honoring the birth of Rama",
    dateStatus: "not_verified",
  },
];

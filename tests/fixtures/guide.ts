import type { FestivalGuide, FestivalSource } from "@/lib/festivals/types";

/**
 * SYNTHETIC TEST CONTENT. The words below are placeholder text written to exercise the page
 * code. They are NOT real cultural or religious information. Never import this file from
 * app/, components/ or lib/.
 */
export const syntheticGuide: FestivalGuide = {
  sections: [
    { kind: "overview", title: "Test overview", status: "published", body: "Synthetic paragraph one.\n\nSynthetic paragraph two.", reviewedAt: "2027-02-01", sourceIds: ["test-date-source"] },
    { kind: "story", title: "Test story A", status: "published", body: "Synthetic story text.", tradition: "Test tradition", reviewedAt: "2027-02-03", sourceIds: [] },
    { kind: "story", title: "Test story B", status: "published", body: "Another synthetic story.", reviewedAt: "2027-01-15", sourceIds: [] },
    { kind: "food", title: "Test food note", status: "published", body: "Synthetic food text.", reviewedAt: "2027-01-20", sourceIds: [] },
    { kind: "fasting", title: "Test fasting note", status: "published", body: "Synthetic fasting text.", reviewedAt: "2027-01-21", sourceIds: [] },
    { kind: "college_guide", title: "Test college idea", status: "published", body: "Synthetic idea.", reviewedAt: "2027-01-22", sourceIds: [] },
    { kind: "regional_variation", title: "Unpublished draft", status: "not_available" },
    { kind: "rituals", title: "<img src=x onerror=alert(1)>", status: "published", body: "<b>not bold</b> & <script>alert(1)</script>", reviewedAt: "2027-01-10", sourceIds: [] },
  ],
  quickFacts: [],
  deities: [],
  pendingReview: true, // it carries an unpublished draft section, so it is only partly reviewed
  sources: [
    { id: "test-date-source", role: "date", title: "Test date source", url: "https://example.test/dates", publisher: "Test Publisher", accessedAt: "2027-02-10" },
    { id: "test-cultural-source", role: "cultural", title: "Test cultural source", url: "https://example.test/culture", accessedAt: "2027-02-11" },
    { id: "test-unsafe-source", role: "cultural", title: "Unsafe link source", url: "javascript:alert(1)", accessedAt: "2027-02-12" },
  ],
};


const fullSources: FestivalSource[] = [
  { id: "synthetic-encyclopedia", role: "cultural", title: "Synthetic Encyclopedia", url: "https://example.test/encyclopedia", publisher: "Synthetic Press", accessedAt: "2027-02-10" },
  { id: "synthetic-temple", role: "cultural", title: "Synthetic Temple Page", url: "https://example.test/temple", accessedAt: "2027-02-11" },
  { id: "synthetic-unsafe", role: "cultural", title: "Synthetic Unsafe Link", url: "javascript:alert(1)", accessedAt: "2027-02-12" },
];

/**
 * SYNTHETIC reviewed guide with every slot filled: used to test the reviewed-content layout.
 * The words are placeholders, not real cultural information. Never import from app/, components/ or lib/.
 */
export const syntheticFullGuide: FestivalGuide = {
  sections: [
    { kind: "overview", title: "Synthetic overview", status: "published", body: "Synthetic opening paragraph.\n\nSynthetic second paragraph.", reviewedAt: "2027-02-05", sourceIds: ["synthetic-encyclopedia", "synthetic-temple"] },
    { kind: "story", title: "Synthetic story one", status: "published", body: "Synthetic story body.", tradition: "Synthetic tradition A", reviewedAt: "2027-02-06", sourceIds: ["synthetic-encyclopedia"] },
    { kind: "story", title: "Synthetic story two", status: "published", body: "Another synthetic story body.", tradition: "Synthetic tradition B", reviewedAt: "2027-02-03", sourceIds: [] },
    { kind: "rituals", title: "Synthetic customs", status: "published", body: "Synthetic customs body.", reviewedAt: "2027-02-04", sourceIds: ["synthetic-temple"] },
    { kind: "food", title: "Synthetic food", status: "published", body: "Synthetic food body.", reviewedAt: "2027-02-04", sourceIds: ["synthetic-encyclopedia"] },
    { kind: "fasting", title: "Synthetic fasting note", status: "published", body: "Synthetic fasting body.", tradition: "Varies", reviewedAt: "2027-02-04", sourceIds: ["synthetic-temple"] },
    { kind: "traditional_guide", title: "Synthetic home guide", status: "published", body: "Synthetic home guide body.", reviewedAt: "2027-02-04", sourceIds: [] },
    { kind: "college_guide", title: "Synthetic dorm guide", status: "published", body: "Synthetic dorm guide body.", reviewedAt: "2027-02-04", sourceIds: ["synthetic-unsafe"] },
    { kind: "regional_variation", title: "Synthetic regional note", status: "published", body: "Synthetic regional body.", tradition: "Synthetic region", reviewedAt: "2027-02-07", sourceIds: ["synthetic-encyclopedia", "synthetic-temple"] },
  ],
  quickFacts: [
    { label: "Meaning", text: "Synthetic meaning.", reviewedAt: "2027-02-08", sourceIds: ["synthetic-encyclopedia"] },
    { label: "Length of observance", text: "Synthetic length.", reviewedAt: "2027-02-08", sourceIds: [] },
    { label: "Associated deities", text: "Synthetic deity list.", tradition: "Synthetic tradition A", reviewedAt: "2027-02-08", sourceIds: ["synthetic-temple"] },
    { label: "Common customs", text: "Synthetic customs list.", reviewedAt: "2027-02-08", sourceIds: ["synthetic-encyclopedia", "synthetic-temple"] },
    { label: "Dietary practices", text: "Synthetic dietary note.", tradition: "Varies", reviewedAt: "2027-02-08", sourceIds: [] },
  ],
  deities: [
    { name: "Synthetic Deity One", role: "Synthetic role one.", tradition: "Synthetic tradition A", reviewedAt: "2027-02-09", sourceIds: ["synthetic-encyclopedia"] },
    { name: "Synthetic Deity Two", role: "Synthetic role two.", tradition: "Synthetic tradition B", reviewedAt: "2027-02-02", sourceIds: [] },
  ],
  sources: fullSources,
};

/** SYNTHETIC: a section and a quick fact that cite source ids that do not exist, to test graceful handling. */
export const syntheticInvalidRefsGuide: FestivalGuide = {
  ...syntheticFullGuide,
  sections: [
    { kind: "overview", title: "Overview with bad refs", status: "published", body: "Synthetic body.", reviewedAt: "2027-02-05", sourceIds: ["no-such-source", "synthetic-encyclopedia", "also-missing"] },
  ],
  quickFacts: [{ label: "Meaning", text: "Fact with only bad refs.", reviewedAt: "2027-02-08", sourceIds: ["gone"] }],
  deities: [],
};

import type { FestivalGuide } from "@/lib/festivals/types";

/**
 * SYNTHETIC TEST CONTENT. The words below are placeholder text written to exercise the page
 * code. They are NOT real cultural or religious information. Never import this file from
 * app/, components/ or lib/.
 */
export const syntheticGuide: FestivalGuide = {
  sections: [
    { kind: "overview", title: "Test overview", status: "published", body: "Synthetic paragraph one.\n\nSynthetic paragraph two.", reviewedAt: "2027-02-01" },
    { kind: "story", title: "Test story A", status: "published", body: "Synthetic story text.", tradition: "Test tradition", reviewedAt: "2027-02-03" },
    { kind: "story", title: "Test story B", status: "published", body: "Another synthetic story.", reviewedAt: "2027-01-15" },
    { kind: "food", title: "Test food note", status: "published", body: "Synthetic food text.", reviewedAt: "2027-01-20" },
    { kind: "fasting", title: "Test fasting note", status: "published", body: "Synthetic fasting text.", reviewedAt: "2027-01-21" },
    { kind: "college_guide", title: "Test college idea", status: "published", body: "Synthetic idea.", reviewedAt: "2027-01-22" },
    { kind: "regional_variation", title: "Unpublished draft", status: "not_available" },
    { kind: "rituals", title: "<img src=x onerror=alert(1)>", status: "published", body: "<b>not bold</b> & <script>alert(1)</script>", reviewedAt: "2027-01-10" },
  ],
  sources: [
    { role: "date", title: "Test date source", url: "https://example.test/dates", publisher: "Test Publisher", accessedAt: "2027-02-10" },
    { role: "cultural", title: "Test cultural source", url: "https://example.test/culture", accessedAt: "2027-02-11" },
    { role: "cultural", title: "Unsafe link source", url: "javascript:alert(1)", accessedAt: "2027-02-12" },
  ],
};

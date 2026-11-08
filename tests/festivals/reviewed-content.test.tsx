import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Citations } from "@/components/festivals/detail/Citations";
import { FestivalDetail } from "@/components/festivals/detail/FestivalDetail";
import { publishRecord } from "@/lib/festivals/content/load";
import { GUIDE_SLOTS } from "@/lib/festivals/guide";
import { EMPTY_GUIDE, type FestivalGuide } from "@/lib/festivals/types";
import { reviewedSection, makeRecord, TODAY, verifiedOccurrence } from "../fixtures/content";
import { contentFestivals } from "../fixtures/festivals";
import { syntheticFullGuide, syntheticInvalidRefsGuide } from "../fixtures/guide";

const festival = contentFestivals[0];
const renderGuide = (guide: FestivalGuide) => render(<FestivalDetail festival={festival} occurrences={[]} guide={guide} />);

describe("reviewed content on the detail page (synthetic fixtures)", () => {
  it("fills every slot and shows no placeholders or work-in-progress banner when the guide is complete", () => {
    const { container } = renderGuide(syntheticFullGuide);
    expect(screen.queryByText("Not yet available.")).not.toBeInTheDocument();
    expect(screen.queryByText(/work in progress/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Parts of this guide are complete/i)).not.toBeInTheDocument();
    GUIDE_SLOTS.forEach((slot) => expect(container.querySelector(`#${slot.id}`), slot.id).not.toBeNull());
    expect(screen.getByText("Synthetic opening paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Synthetic regional body.")).toBeInTheDocument();
  });

  it("shows all five quick facts with their tradition labels and citations", () => {
    renderGuide(syntheticFullGuide);
    const facts = document.getElementById("quick-facts")!;
    ["Meaning", "Length of observance", "Associated deities", "Common customs", "Dietary practices"].forEach((label) =>
      expect(within(facts).getByText(label)).toBeInTheDocument(),
    );
    expect(within(facts).getByText("Synthetic meaning.")).toBeInTheDocument();
    expect(within(facts).getByText("Synthetic tradition A")).toBeInTheDocument();
    expect(within(facts).getAllByRole("link", { name: /^Source \d+:/ }).length).toBeGreaterThan(0);
  });

  it("accepts the 'Signature foods' label in place of 'Dietary practices' without adding a sixth slot", () => {
    const guide: FestivalGuide = {
      ...syntheticFullGuide,
      quickFacts: syntheticFullGuide.quickFacts.map((f) =>
        f.label === "Dietary practices" ? { ...f, label: "Signature foods" as const, text: "Synthetic signature dish." } : f,
      ),
    };
    renderGuide(guide);
    const facts = document.getElementById("quick-facts")!;
    expect(within(facts).getByText("Signature foods")).toBeInTheDocument();
    expect(within(facts).getByText("Synthetic signature dish.")).toBeInTheDocument();
    expect(within(facts).queryByText("Dietary practices")).not.toBeInTheDocument();
    expect(within(facts).getAllByRole("term")).toHaveLength(5);
    expect(screen.queryByText(/Parts of this guide are complete/i)).not.toBeInTheDocument();
  });

  it("shows 'Not yet available' under 'Dietary practices' only while drafted content is still pending", () => {
    const guide: FestivalGuide = {
      ...syntheticFullGuide,
      quickFacts: syntheticFullGuide.quickFacts.filter((f) => f.label !== "Dietary practices"),
      pendingReview: true,
    };
    renderGuide(guide);
    const facts = document.getElementById("quick-facts")!;
    expect(within(facts).getByText("Dietary practices")).toBeInTheDocument();
    expect(within(facts).getAllByRole("term")).toHaveLength(5);
    expect(within(facts).getByText("Not yet available.")).toBeInTheDocument();
    expect(screen.getByText(/Parts of this guide are complete/i)).toBeInTheDocument();
  });

  it("lists deities with the tradition that makes each association", () => {
    renderGuide(syntheticFullGuide);
    const deities = document.getElementById("deities")!;
    expect(within(deities).getByRole("heading", { level: 3, name: "Synthetic Deity One" })).toBeInTheDocument();
    expect(within(deities).getByText("Tradition: Synthetic tradition A")).toBeInTheDocument();
    expect(within(deities).getByText("Synthetic role two.")).toBeInTheDocument();
    expect(deities).toHaveTextContent("Reviewed February 9, 2027");
  });

  it("keeps stories expandable, attributed to their tradition, and cited", () => {
    const { container } = renderGuide(syntheticFullGuide);
    const stories = container.querySelectorAll("#stories details");
    expect(stories).toHaveLength(2);
    expect(stories[0]).toHaveTextContent("Tradition: Synthetic tradition A");
    expect(within(stories[0] as HTMLElement).getByRole("link", { name: /^Source 1: Synthetic Encyclopedia/ })).toBeInTheDocument();
  });

  it("numbers citations to match the Sources list, and each citation jumps to its source", () => {
    const { container } = renderGuide(syntheticFullGuide);
    const sources = document.getElementById("sources")!;
    const items = within(sources).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveAttribute("id", "source-synthetic-encyclopedia");
    expect(items[1]).toHaveAttribute("value", "2");
    const overview = container.querySelector("#why-celebrate")!;
    const cites = within(overview as HTMLElement).getAllByRole("link", { name: /^Source \d+:/ });
    expect(cites.map((c) => c.getAttribute("href"))).toEqual(["#source-synthetic-encyclopedia", "#source-synthetic-temple"]);
    cites.forEach((c) => expect(container.querySelector(c.getAttribute("href")!)).not.toBeNull());
  });

  it("shows the latest review date across sections, quick facts and deities", () => {
    renderGuide(syntheticFullGuide);
    expect(document.getElementById("sources")).toHaveTextContent("Last reviewed February 9, 2027.");
  });

  it("never links an unsafe source URL", () => {
    renderGuide(syntheticFullGuide);
    expect(screen.queryByRole("link", { name: /Synthetic Unsafe Link \(opens/ })).not.toBeInTheDocument();
    expect(screen.getByText("Synthetic Unsafe Link").closest("a")).toBeNull();
  });

  it("shows no internal review material", () => {
    const { container } = renderGuide(syntheticFullGuide);
    expect(container).not.toHaveTextContent(/BLOCKING|OPTIONAL|reviewNotes|reviewedBy|termsNote|draft/i);
  });
});

describe("partly reviewed and missing content", () => {
  const partial: FestivalGuide = {
    ...EMPTY_GUIDE,
    sections: syntheticFullGuide.sections.filter((s) => s.kind === "overview" || s.kind === "story"),
    quickFacts: syntheticFullGuide.quickFacts.slice(0, 2),
    sources: syntheticFullGuide.sources,
    pendingReview: true, // drafted content exists that is not reviewed yet
  };

  it("says the guide is partly complete and marks each missing section", () => {
    renderGuide(partial);
    expect(screen.getByText(/Parts of this guide are complete/i)).toBeInTheDocument();
    expect(screen.queryByText(/This guide is a work in progress/i)).not.toBeInTheDocument();
    expect(document.getElementById("traditions")).toHaveTextContent("Not yet available.");
    expect(document.getElementById("deities")).toHaveTextContent("Not yet available.");
    const facts = document.getElementById("quick-facts")!;
    expect(within(facts).getAllByText("Not yet available.")).toHaveLength(3);
  });

  it("keeps the work-in-progress banner for a guide with nothing reviewed", () => {
    renderGuide(EMPTY_GUIDE);
    expect(screen.getByText(/This guide is a work in progress/i)).toBeInTheDocument();
    expect(screen.queryByText(/Parts of this guide are complete/i)).not.toBeInTheDocument();
    expect(document.getElementById("sources")).toHaveTextContent("Not yet editorially reviewed.");
  });
});

describe("a reviewed guide whose optional content was never written (nothing pending)", () => {
  // Models Diwali: four quick facts (no fifth) and no Food & fasting section, with no drafted content left.
  const noFoodGuide: FestivalGuide = {
    ...syntheticFullGuide,
    sections: syntheticFullGuide.sections.filter((s) => s.kind !== "food" && s.kind !== "fasting"),
    quickFacts: syntheticFullGuide.quickFacts.filter((f) => f.label !== "Dietary practices"),
    pendingReview: false,
  };

  it("leaves out the missing quick fact and the empty section: no placeholders, no partly-reviewed notice", () => {
    const { container } = renderGuide(noFoodGuide);
    const facts = document.getElementById("quick-facts")!;
    expect(within(facts).getAllByRole("term")).toHaveLength(4);
    expect(within(facts).queryByText("Dietary practices")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/Not yet available/);
    expect(screen.queryByText(/Parts of this guide are complete/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/This guide is a work in progress/i)).not.toBeInTheDocument();
    expect(document.getElementById("food-and-fasting")).toBeNull();
    expect(screen.queryByRole("heading", { level: 2, name: "Food & fasting" })).not.toBeInTheDocument();
  });

  it("keeps the page navigation in step: no link to a hidden section, and no dead anchors", () => {
    renderGuide(noFoodGuide);
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(within(nav).queryByRole("link", { name: "Food & fasting" })).not.toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Quick facts" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Sources & review" })).toBeInTheDocument();
    within(nav).getAllByRole("link").forEach((a) => expect(document.getElementById(a.getAttribute("href")!.slice(1)), a.textContent ?? "").not.toBeNull());
  });

  it("hides the whole quick-facts section, and its link, when no fact exists", () => {
    renderGuide({ ...noFoodGuide, quickFacts: [] });
    expect(document.getElementById("quick-facts")).toBeNull();
    expect(within(screen.getByRole("navigation", { name: "On this page" })).queryByRole("link", { name: "Quick facts" })).not.toBeInTheDocument();
  });

  it("invents nothing: the remaining sections and facts are exactly the reviewed ones", () => {
    renderGuide(noFoodGuide);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Quick facts", "Why celebrate?", "Stories & mythology", "Deities", "Traditions", "How to celebrate", "Regional variations", "Sources & review",
    ]);
  });

  it("a draft festival (no reviewed content) keeps the work-in-progress state and every placeholder", () => {
    // pendingReview is irrelevant when nothing is reviewed: the guide is simply not published yet.
    [EMPTY_GUIDE, { ...EMPTY_GUIDE, pendingReview: false }, { ...EMPTY_GUIDE, pendingReview: true }].forEach((guide) => {
      const { unmount } = renderGuide(guide);
      expect(screen.getByText(/This guide is a work in progress/i)).toBeInTheDocument();
      expect(screen.getAllByText("Not yet available.")).toHaveLength(12);
      expect(document.getElementById("food-and-fasting")).not.toBeNull();
      unmount();
    });
  });
});

describe("invalid source references", () => {
  it("skips ids that match no source instead of rendering a broken link", () => {
    const { container } = renderGuide(syntheticInvalidRefsGuide);
    const overview = container.querySelector("#why-celebrate")!;
    const cites = within(overview as HTMLElement).getAllByRole("link", { name: /^Source \d+:/ });
    expect(cites).toHaveLength(1);
    expect(cites[0]).toHaveAttribute("href", "#source-synthetic-encyclopedia");
    expect(container.innerHTML).not.toMatch(/no-such-source|also-missing|#source-gone/);
  });

  it("renders no citation line at all when every id is unknown", () => {
    const { container } = render(<Citations ids={["x", "y"]} sources={syntheticFullGuide.sources} />);
    expect(container).toBeEmptyDOMElement();
    const facts = renderGuide(syntheticInvalidRefsGuide);
    const quick = facts.container.querySelector("#quick-facts")!;
    expect(within(quick as HTMLElement).getByText("Fact with only bad refs.")).toBeInTheDocument();
    expect(quick).not.toHaveTextContent("Sources:");
  });
});

describe("the loader publishes reviewed quick facts and deities, and only those", () => {
  const reviewed = { status: "reviewed" as const, reviewedAt: "2027-05-10", reviewedBy: "Secret Reviewer Name" };
  const record = makeRecord({
    sections: [reviewedSection],
    quickFacts: [
      { label: "Meaning", text: "Reviewed meaning.", sourceIds: ["test-cultural"], ...reviewed, reviewNotes: ["BLOCKING: internal"] },
      { label: "Length of observance", text: "Draft length.", sourceIds: ["test-cultural"], status: "draft" },
      { label: "Common customs", text: "Reviewed but TODO unfinished", sourceIds: ["test-cultural"], ...reviewed },
      { label: "Dietary practices", text: "Reviewed, wrong-role source.", sourceIds: ["test-date-primary"], ...reviewed },
    ],
    deityEntries: [
      { name: "Reviewed Deity", role: "Reviewed role.", tradition: "Test tradition", sourceIds: ["test-cultural"], ...reviewed },
      { name: "Draft Deity", role: "Draft role.", tradition: "Test tradition", sourceIds: ["test-cultural"], status: "draft" },
    ],
    occurrences: [verifiedOccurrence],
  });
  const out = publishRecord(record, TODAY);

  it("publishes reviewed entries with their citations", () => {
    expect(out.guide.quickFacts.map((f) => f.text)).toEqual(["Reviewed meaning."]);
    expect(out.guide.quickFacts[0]).toMatchObject({ label: "Meaning", sourceIds: ["test-cultural"], reviewedAt: "2027-05-10" });
    expect(out.guide.deities.map((d) => d.name)).toEqual(["Reviewed Deity"]);
  });

  it("withholds drafts, placeholders and entries citing a source of the wrong role", () => {
    const json = JSON.stringify(out.guide);
    expect(json).not.toMatch(/Draft length|Draft Deity|unfinished|wrong-role/);
  });

  it("never leaks review notes or reviewer names, and lists each cited source once", () => {
    expect(JSON.stringify(out)).not.toMatch(/BLOCKING|Secret Reviewer Name|reviewNotes|reviewedBy/);
    const ids = out.guide.sources.map((s) => s.id);
    expect(ids.filter((id) => id === "test-cultural")).toHaveLength(1);
    expect(out.guide.sources.every((s) => s.role !== undefined && s.id)).toBe(true);
  });
});

describe("the loader reports pendingReview only when drafted content stays unpublished", () => {
  const reviewed = { status: "reviewed" as const, reviewedAt: "2027-05-10", reviewedBy: "Secret Reviewer Name" };
  const goodSection = { ...reviewedSection };
  const guideOf = (r: ReturnType<typeof makeRecord>) => publishRecord(r, TODAY).guide;

  it("is false when everything drafted is published, even if optional content was never written", () => {
    const g = guideOf(makeRecord({ sections: [goodSection], quickFacts: [{ label: "Meaning", text: "Reviewed meaning.", sourceIds: ["test-cultural"], ...reviewed }] }));
    expect(g.pendingReview).toBe(false);
    expect(g.sections).toHaveLength(1);
  });

  it("is true when a section, quick fact or deity entry is still draft", () => {
    expect(guideOf(makeRecord({ sections: [goodSection, { ...goodSection, title: "Other", status: "draft", reviewedAt: undefined, reviewedBy: undefined }] })).pendingReview).toBe(true);
    expect(guideOf(makeRecord({ sections: [goodSection], quickFacts: [{ label: "Meaning", text: "Draft.", sourceIds: ["test-cultural"], status: "draft" }] })).pendingReview).toBe(true);
    expect(guideOf(makeRecord({ sections: [goodSection], deityEntries: [{ name: "Draft Deity", role: "Draft.", tradition: "T", sourceIds: ["test-cultural"], status: "draft" }] })).pendingReview).toBe(true);
  });

  it("is true when a reviewed item is withheld because it fails validation", () => {
    const g = guideOf(makeRecord({ sections: [goodSection, { ...goodSection, title: "Broken", body: "Reviewed but TODO unfinished" }] }));
    expect(g.sections).toHaveLength(1);
    expect(g.pendingReview).toBe(true);
  });

  it("is false for a festival with no drafted guide content at all", () => {
    expect(guideOf(makeRecord({})).pendingReview).toBe(false);
  });
});

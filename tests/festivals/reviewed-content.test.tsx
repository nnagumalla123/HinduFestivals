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

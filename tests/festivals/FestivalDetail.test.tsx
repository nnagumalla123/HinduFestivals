import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FestivalDetail } from "@/components/festivals/detail/FestivalDetail";
import { GUIDE_SLOTS, SECTION_NAV } from "@/lib/festivals/guide";
import { contentFestivals, draftFestivals, withReviewedBasics } from "../fixtures/festivals";
import type { FestivalGuide, FestivalOccurrence } from "@/lib/festivals/types";
import { syntheticGuide } from "../fixtures/guide";
import { syntheticDisputed, syntheticDraft, syntheticVerifiedMultiDay, syntheticVerifiedSingleDay } from "../fixtures/occurrences";

const diwali = contentFestivals[0];
const emptyGuide: FestivalGuide = { sections: [], quickFacts: [], deities: [], sources: [] };

const renderDetail = (occurrences: readonly FestivalOccurrence[] = [], guide: FestivalGuide = emptyGuide, festival = diwali) =>
  render(<FestivalDetail festival={festival} occurrences={occurrences} guide={guide} />);

const h2Titles = () => screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("festival detail: structure (PRD section 4)", () => {
  it("shows one h1, then the sections in the PRD order", () => {
    renderDetail();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(h2Titles()).toEqual([
      "Quick facts",
      "Why celebrate?",
      "Stories & mythology",
      "Deities",
      "Traditions",
      "Food & fasting",
      "How to celebrate",
      "Regional variations",
      "Sources & review",
    ]);
  });

  it("has a typographic hero with the name, approved subtitle and aliases, and no image", () => {
    const reviewed = withReviewedBasics("diwali");
    const { container } = renderDetail([], emptyGuide, reviewed);
    expect(screen.getByRole("heading", { level: 1, name: "Diwali" })).toBeInTheDocument();
    expect(screen.getByText(reviewed.subtitle!)).toBeInTheDocument();
    expect(screen.getByText("Also known as Deepavali")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    // The decorative motif is hidden from assistive technology.
    expect(container.querySelector("header svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("shows only the name while the festival's basics are unreviewed (synthetic draft)", () => {
    const janmashtami = draftFestivals.find((f) => f.slug === "krishna-janmashtami")!;
    const { container } = renderDetail([], emptyGuide, janmashtami);
    expect(screen.getByRole("heading", { level: 1, name: "Krishna Janmashtami" })).toBeInTheDocument();
    expect(container.querySelector("header")).not.toHaveTextContent(/Also known as|Deepavali|festival of lights/);
    expect(container.querySelector("header p:not(:has(*))")?.textContent).toBe("Festival guide");
  });

  it("omits the aliases line for a festival without aliases", () => {
    renderDetail([], emptyGuide, { ...withReviewedBasics("holi"), aliases: [] });
    expect(screen.queryByText(/Also known as/)).not.toBeInTheDocument();
  });
});

describe("festival detail: honest placeholders", () => {
  it("says 'Not yet available' for every unwritten section and invents nothing", () => {
    const { container } = renderDetail();
    // 5 quick facts + 7 guide sections
    expect(screen.getAllByText("Not yet available.")).toHaveLength(12);
    expect(screen.getByText(/work in progress/i)).toBeInTheDocument();
    expect(container.querySelectorAll("details")).toHaveLength(0);
    expect(container.querySelector("time")).toBeNull();
  });

  it("says what each section is for, without making any claim about the festival", () => {
    const { container } = renderDetail();
    GUIDE_SLOTS.forEach((slot) => expect(container).toHaveTextContent(slot.purpose));
    // No deity names or festival-specific content leaks onto the page from the search-only data.
    diwali.provisional.deities.forEach((deity) => expect(container).not.toHaveTextContent(deity));
  });

  it("shows 'Not yet editorially reviewed' and empty source lists", () => {
    renderDetail();
    expect(screen.getByText("Not yet editorially reviewed.")).toBeInTheDocument();
    expect(screen.getByText("No date source has been recorded yet.")).toBeInTheDocument();
    expect(screen.getByText("No cultural content source has been recorded yet.")).toBeInTheDocument();
  });
});

describe("festival detail: dates and location stay together", () => {
  it("shows 'Date not yet verified' and no location when there is no occurrence", () => {
    const { container } = renderDetail();
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/Atlanta|Reference calendar/);
  });

  it.each([
    ["draft", syntheticDraft],
    ["disputed", syntheticDisputed],
  ])("does not show a %s date", (_name, occurrence) => {
    const { container } = renderDetail([occurrence]);
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent("Atlanta");
  });

  it("shows a verified date together with its location and year, and no countdown", () => {
    const { container } = renderDetail([syntheticVerifiedSingleDay]);
    const group = screen.getByRole("group", { name: "Festival date" });
    expect(within(group).getByText("Fri, Mar 5")).toHaveAttribute("datetime", "2027-03-05");
    expect(group).toHaveTextContent("Atlanta, GA · 2027");
    expect(screen.queryByText("Date not yet verified")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/countdown|days (left|to go)/i);
  });

  it("shows a multi-day range and every verified occurrence, each with its location", () => {
    renderDetail([syntheticVerifiedMultiDay, { ...syntheticVerifiedSingleDay, startDate: "2027-09-01", endDate: "2027-09-01" }]);
    const group = screen.getByRole("group", { name: "Festival date" });
    expect(group).toHaveTextContent("Fri, Mar 5 – Sun, Mar 7");
    expect(group).toHaveTextContent("Wed, Sep 1");
    expect(group.textContent?.match(/Atlanta, GA · 2027/g)).toHaveLength(2);
  });
});

describe("festival detail: navigation between sections", () => {
  it("links to every section, and every link target exists on the page", () => {
    const { container } = renderDetail();
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(SECTION_NAV.map((s) => s.title));
    links.forEach((link) => {
      const id = link.getAttribute("href")!.slice(1);
      expect(container.querySelector(`section#${id}`), `section #${id}`).not.toBeNull();
    });
  });

  it("labels each section by its own heading", () => {
    renderDetail();
    SECTION_NAV.forEach(({ title }) => {
      expect(screen.getByRole("region", { name: title })).toBeInTheDocument();
    });
  });
});

describe("festival detail: reviewed content (synthetic)", () => {
  it("shows published sections in the right slots, and hides the work-in-progress note", () => {
    renderDetail([], syntheticGuide);
    expect(screen.queryByText(/work in progress/i)).not.toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Why celebrate?" })).getByText("Synthetic paragraph one.")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Food & fasting" })).getByText("Test food note")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Food & fasting" })).getByText("Test fasting note")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "How to celebrate" })).getByText("Test college idea")).toBeInTheDocument();
  });

  it("splits body text into paragraphs", () => {
    renderDetail([], syntheticGuide);
    expect(screen.getByText("Synthetic paragraph two.").tagName).toBe("P");
  });

  it("makes stories expandable, closed by default, with the tradition and review date", () => {
    renderDetail([], syntheticGuide);
    const stories = screen.getByRole("region", { name: "Stories & mythology" });
    const details = stories.querySelectorAll("details");
    expect(details).toHaveLength(2);
    details.forEach((d) => expect(d.open).toBe(false));
    expect(within(stories).getByText("Tradition: Test tradition")).toBeInTheDocument();
    expect(within(stories).getByText("Reviewed February 3, 2027")).toBeInTheDocument();
    // Each summary is the toggle for its story, reachable by keyboard (a native <summary>).
    expect(details[0].querySelector("summary")).toHaveTextContent("Test story A");
  });

  it("still shows 'Not yet available' for slots with no published section, and never shows unpublished ones", () => {
    const { container } = renderDetail([], syntheticGuide);
    expect(within(screen.getByRole("region", { name: "Regional variations" })).getByText("Not yet available.")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Deities" })).getByText("Not yet available.")).toBeInTheDocument();
    expect(container).not.toHaveTextContent("Unpublished draft");
  });

  it("renders markup in content as plain text, never as HTML", () => {
    const { container } = renderDetail([], syntheticGuide);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("b")).toBeNull();
    expect(screen.getByText("<b>not bold</b> & <script>alert(1)</script>")).toBeInTheDocument();
  });

  it("lists date and cultural sources separately, with the latest review date", () => {
    renderDetail([], syntheticGuide);
    const sources = screen.getByRole("region", { name: "Sources & review" });
    const dateGroup = within(sources).getByRole("heading", { name: "Date sources" }).parentElement!;
    const culturalGroup = within(sources).getByRole("heading", { name: "Cultural content sources" }).parentElement!;
    expect(within(dateGroup).getByRole("link", { name: /Test date source/ })).toHaveAttribute("href", "https://example.test/dates");
    expect(dateGroup).toHaveTextContent("Test Publisher");
    expect(dateGroup).toHaveTextContent("accessed February 10, 2027");
    expect(within(dateGroup).queryByText("Test cultural source")).not.toBeInTheDocument();
    expect(within(culturalGroup).getByRole("link", { name: /Test cultural source/ })).toBeInTheDocument();
    expect(sources).toHaveTextContent("Last reviewed February 3, 2027.");
  });

  it("opens source links safely, and never makes a link from a non-http URL", () => {
    renderDetail([], syntheticGuide);
    const link = screen.getByRole("link", { name: /^Test date source/ });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveTextContent("(opens in a new tab)");
    expect(screen.getByText("Unsafe link source").closest("a")).toBeNull();
    expect(screen.queryByRole("link", { name: /Unsafe link source/ })).not.toBeInTheDocument();
  });
});

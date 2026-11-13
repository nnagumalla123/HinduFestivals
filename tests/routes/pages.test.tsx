import { render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import CalendarPage from "@/app/calendar/page";
import ExplorePage from "@/app/explore/page";
import FestivalPage, { generateMetadata, generateStaticParams } from "@/app/festivals/[slug]/page";
import Home from "@/app/page";
import MyFestivalsPage from "@/app/my-festivals/page";
import { contentFestivals } from "../fixtures/festivals";

// `connection()` only works inside a real request; in unit tests there is none, so it becomes a no-op.
vi.mock("next/server", () => ({ connection: async () => {} }));

const slugProps = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("pages render for guests", () => {
  it.each([
    ["/my-festivals", async () => MyFestivalsPage(), /my festivals/i],
    ["/", async () => Home(), /your traditions, wherever life takes you/i],
  ] as Array<[string, () => Promise<ReactElement>, RegExp]>)("%s has one h1", async (_path, element, heading) => {
    render(await element());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("/calendar has one h1", async () => {
    render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: /festival calendar/i })).toBeInTheDocument();
  });

  it("/explore lists all ten festivals, each linking to its page", async () => {
    render(await ExplorePage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { level: 1, name: /explore festivals/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    contentFestivals.forEach((f) => {
      expect(screen.getByRole("link", { name: f.name })).toHaveAttribute("href", `/festivals/${f.slug}`);
    });
  });

  it("/explore marks every festival's date as not verified", async () => {
    render(await ExplorePage({ searchParams: Promise.resolve({}) }));
    expect(screen.getAllByText("Date not yet verified")).toHaveLength(10);
  });
});

describe("home and calendar never show invented dates", () => {
  it("home shows an honest empty state instead of a countdown", async () => {
    render(await Home());
    expect(screen.getByRole("heading", { name: "No verified dates yet" })).toBeInTheDocument();
  });

  it("calendar names its reference location directly beneath the page heading", async () => {
    const { container } = render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    const heading = screen.getByRole("heading", { level: 1, name: "Festival calendar" });
    const label = screen.getByText(/Reference calendar: Atlanta, GA · 2027/);
    // DOCUMENT_POSITION_FOLLOWING (4) means the label comes after the heading in the page.
    expect(heading.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // ...and it is the first thing after the heading, not buried lower down.
    expect(heading.parentElement?.contains(label)).toBe(true);
    expect(container.textContent?.match(/Atlanta/g)).toHaveLength(1);
  });

  it("the location label appears only on the calendar page", async () => {
    const { container: home } = render(await Home());
    expect(home).not.toHaveTextContent(/Atlanta|Reference calendar/);
    const { container: festival } = render(await FestivalPage(slugProps("diwali")));
    expect(festival).not.toHaveTextContent(/Atlanta|Reference calendar/);
  });
});

describe("/festivals/[slug]", () => {
  it.each(contentFestivals.map((f) => [f.slug, f.name]))("renders %s", async (slug, name) => {
    render(await FestivalPage(slugProps(slug)));
    expect(screen.getByRole("heading", { level: 1, name })).toBeInTheDocument();
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
  });

  // No real festival is draft any more; the draft layout (placeholders, work-in-progress notice) is covered by
  // FestivalDetail.test.tsx and content-gating.test.ts with synthetic draft records.
  it("renders all ten festivals as reviewed guides, none as work in progress", async () => {
    expect(contentFestivals).toHaveLength(10);
    for (const f of contentFestivals) {
      const { container, unmount } = render(await FestivalPage(slugProps(f.slug)));
      expect(container, f.slug).not.toHaveTextContent(/work in progress|Not yet available/i);
      unmount();
    }
  });

  it.each([
    ["diwali", 8, "November 8, 2026"],
    ["ugadi", 9, "November 12, 2026"],
    ["navaratri", 9, "November 12, 2026"],
    ["makara-sankranti", 8, "November 12, 2026"],
    ["maha-shivaratri", 9, "November 8, 2026"],
    ["holi", 9, "November 12, 2026"],
    ["rama-navami", 9, "November 12, 2026"],
    ["krishna-janmashtami", 9, "November 12, 2026"],
    ["ganesh-chaturthi", 9, "November 12, 2026"],
    ["vijayadashami", 8, "November 12, 2026"],
  ])("%s (reviewed) shows its guide, citations and review date, and still no date or countdown", async (slug, h2s, reviewedOn) => {
    const { container } = render(await FestivalPage(slugProps(slug)));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(h2s);
    // Complete reviewed guides carry no placeholders and no partly-reviewed notice.
    expect(container).not.toHaveTextContent(/Not yet available|Parts of this guide are complete|work in progress/i);
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Last reviewed ${reviewedOn}`))).toBeInTheDocument();
    expect(container.querySelectorAll("a[aria-label^='Source ']").length).toBeGreaterThan(10);
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent(/Atlanta|Reference calendar|days? (to go|left|until)/i);
    expect(container).not.toHaveTextContent(/desi-days-editorial|SOURCE NOTE|OPTIONAL:|EDITORIAL:/);
  });

  it("Diwali hides its empty optional content instead of showing placeholders, and invents nothing", async () => {
    const { container } = render(await FestivalPage(slugProps("diwali")));
    expect(screen.queryByRole("heading", { level: 2, name: "Food & fasting" })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "On this page" })).queryByRole("link", { name: "Food & fasting" })).not.toBeInTheDocument();
    const facts = document.getElementById("quick-facts")!;
    expect(within(facts).getAllByRole("term").map((t) => t.textContent)).toEqual(["Meaning", "Length of observance", "Associated deities", "Common customs"]);
    expect(container).not.toHaveTextContent(/Dietary practices|Signature foods/);
  });

  it("does not show unreviewed aliases or subtitles as approved content", async () => {
    const { container } = render(await FestivalPage(slugProps("holi")));
    expect(container).not.toHaveTextContent(/Also known as/);
  });

  it("shows the approved subtitle and aliases for a reviewed festival", async () => {
    render(await FestivalPage(slugProps("diwali")));
    expect(screen.getByText("The festival of lights")).toBeInTheDocument();
    expect(screen.getByText("Also known as Deepavali")).toBeInTheDocument();
  });

  it("triggers Next.js's 404 for an unknown slug", async () => {
    // notFound() throws a special error carrying a 404 marker; Next.js turns it into a 404 response.
    await expect(FestivalPage(slugProps("not-a-festival"))).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });

  it("does not match slugs by partial text", async () => {
    await expect(FestivalPage(slugProps("diwal"))).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });

  it("pre-builds one page per festival", async () => {
    expect(await generateStaticParams()).toHaveLength(10);
  });

  it("sets a page title from the festival name", async () => {
    const holi = await generateMetadata(slugProps("holi"));
    expect(holi.title).toBe("Holi");
    expect(holi.description).toMatch(/^Holi: The festival of colors\./);
    expect(await generateMetadata(slugProps("nope"))).toEqual({ title: "Festival not found" });
    for (const { slug } of contentFestivals) {
      const m = await generateMetadata(slugProps(slug));
      expect(m.description).toBeTruthy();
      expect(String(m.description)).not.toMatch(/20\d\d|verified/i); // never implies a date
    }
  });
});

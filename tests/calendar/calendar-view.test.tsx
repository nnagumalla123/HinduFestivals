import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CalendarPage from "@/app/calendar/page";
import { CalendarView } from "@/components/calendar/CalendarView";
import { buildEntries, type CalendarEntry } from "@/lib/festivals/calendar";
import { contentFestivals } from "../fixtures/festivals";
import { syntheticDraft, syntheticVerifiedMultiDay, syntheticVerifiedSingleDay } from "../fixtures/occurrences";

const festivals = contentFestivals.map(({ slug, name }) => ({ slug, name }));
// Synthetic dates attached to a real festival name only so links resolve; the dates are invented.
const holiSingle = { ...syntheticVerifiedSingleDay, festivalSlug: "holi" };
const ugadiMulti = { ...syntheticVerifiedMultiDay, festivalSlug: "ugadi" };
const entries: CalendarEntry[] = buildEntries([holiSingle, ugadiMulti, { ...syntheticDraft, festivalSlug: "diwali" }], festivals);
const march = { year: 2027, month: 3 };

const renderView = (props: Partial<Parameters<typeof CalendarView>[0]> = {}) =>
  render(<CalendarView view="grid" month={march} day={null} entries={entries} {...props} />);

describe("calendar with no verified dates (production data)", () => {
  it("explains why there are no dates and invents none", async () => {
    const { container } = render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { name: "No verified dates yet" })).toBeInTheDocument();
    expect(container.querySelector("time")).toBeNull();
    expect(container.querySelectorAll("table a")).toHaveLength(0);
  });

  it("keeps the grid, month navigation and toggle usable", async () => {
    render(await CalendarPage({ searchParams: Promise.resolve({ month: "2027-06" }) }));
    expect(screen.getByRole("heading", { level: 2, name: "June 2027" })).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next month, July 2027" })).toHaveAttribute("href", "/calendar?month=2027-07");
    expect(screen.getByRole("link", { name: "Previous month, May 2027" })).toHaveAttribute("href", "/calendar?month=2027-05");
  });

  it("falls back to January 2027 for invalid URL values", async () => {
    render(await CalendarPage({ searchParams: Promise.resolve({ month: "2099-99", view: "<script>", day: "nope" }) }));
    expect(screen.getByRole("heading", { level: 2, name: "January 2027" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Month grid" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });
});

describe("navigation and boundaries", () => {
  it("disables Previous in January and Next in December, as non-links", () => {
    const { unmount } = renderView({ month: { year: 2027, month: 1 } });
    expect(screen.queryByRole("link", { name: /previous month/i })).not.toBeInTheDocument();
    expect(screen.getByText("Prev", { exact: false })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("link", { name: "Next month, February 2027" })).toBeInTheDocument();
    unmount();
    renderView({ month: { year: 2027, month: 12 } });
    expect(screen.queryByRole("link", { name: /next month/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Previous month, November 2027" })).toBeInTheDocument();
  });

  it("toggle keeps the month and marks the current view", () => {
    renderView({ view: "list" });
    expect(screen.getByRole("link", { name: "List" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Month grid" })).toHaveAttribute("href", "/calendar?month=2027-03");
    expect(screen.getByRole("link", { name: "List" })).toHaveAttribute("href", "/calendar?view=list&month=2027-03");
  });

  it("month links keep the chosen view", () => {
    renderView({ view: "list" });
    expect(screen.getByRole("link", { name: "Next month, April 2027" })).toHaveAttribute("href", "/calendar?view=list&month=2027-04");
  });
});

describe("no-dates notice", () => {
  it("is short: two sentences", async () => {
    render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    const notice = screen.getByRole("heading", { name: "No verified dates yet" }).parentElement as HTMLElement;
    const sentences = (notice.querySelector("p")?.textContent ?? "").split(/(?<=[.!?”"])\s+/).filter(Boolean);
    expect(sentences.length).toBeLessThanOrEqual(2);
    expect(notice).toHaveTextContent(/lunar/i);
    expect(notice).toHaveTextContent(/location/i);
    expect(notice).toHaveTextContent(/Date not yet verified/);
  });
});

describe("grid with synthetic verified occurrences", () => {
  it("is a table with column headers for the seven weekdays", () => {
    renderView();
    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
    expect(screen.getByRole("columnheader", { name: "Sun" })).toHaveAttribute("abbr", "Sunday");
  });

  it("makes only days with verified festivals into links, with descriptive names", () => {
    renderView();
    const links = within(screen.getByRole("table")).getAllByRole("link");
    expect(links.map((l) => l.getAttribute("aria-label"))).toEqual([
      "March 5, 2027: Holi, Ugadi",
      "March 6, 2027: Ugadi",
      "March 7, 2027: Ugadi",
    ]);
    expect(links[0]).toHaveAttribute("href", "/calendar?month=2027-03&day=2027-03-05#day-details");
  });

  it("does not place draft occurrences on the grid", () => {
    renderView({ entries: buildEntries([{ ...syntheticDraft, festivalSlug: "diwali" }], festivals) });
    expect(within(screen.getByRole("table")).queryAllByRole("link")).toHaveLength(0);
  });

  it("shows the selected day's festivals with date, location and year", () => {
    renderView({ day: "2027-03-05" });
    const details = screen.getByRole("region", { name: "Fri, Mar 5" });
    expect(within(details).getByRole("link", { name: "Holi" })).toHaveAttribute("href", "/festivals/holi");
    expect(within(details).getByRole("link", { name: "Ugadi" })).toBeInTheDocument();
    expect(details).toHaveTextContent("Atlanta, GA · 2027");
    expect(screen.getByRole("link", { name: /March 5, 2027/ })).toHaveAttribute("aria-current", "true");
  });

  it("says so when the selected day has no festivals", () => {
    renderView({ day: "2027-03-20" });
    expect(screen.getByText("No verified festival dates on this day.")).toBeInTheDocument();
  });

  it("says when the month shown has no verified dates but other months do", () => {
    renderView({ month: { year: 2027, month: 8 } });
    expect(screen.getByText("There are no verified festival dates in August 2027.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "No verified dates yet" })).not.toBeInTheDocument();
  });
});

describe("list view with synthetic verified occurrences", () => {
  it("lists the month's festivals earliest first, each with location and year", () => {
    renderView({ view: "list" });
    const items = screen.getAllByRole("listitem").filter((li) => li.querySelector("time"));
    expect(items.map((li) => li.querySelector("h3")?.textContent)).toEqual(["Holi", "Ugadi"]);
    expect(items[1]).toHaveTextContent("Fri, Mar 5 – Sun, Mar 7");
    items.forEach((li) => expect(li).toHaveTextContent("Atlanta, GA · 2027"));
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("shows no list for a month without verified dates", () => {
    const { container } = renderView({ view: "list", month: { year: 2027, month: 8 } });
    expect(container.querySelector("ol")).toBeNull();
    expect(container.querySelector("time")).toBeNull();
    expect(screen.getByText(/no verified festival dates in August 2027/i)).toBeInTheDocument();
  });
});

describe("grid and list are mutually exclusive", () => {
  const empty = (view: "grid" | "list") => CalendarPage({ searchParams: Promise.resolve(view === "list" ? { view: "list" } : {}) });

  it("grid view with no verified dates shows the grid and one empty-state card, and nothing from the list view", async () => {
    const { container } = render(await empty("grid"));
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "No verified dates yet" })).toHaveLength(1);
    expect(container.querySelector("ol")).toBeNull();
  });

  it("list view with no verified dates shows only the empty-state card: no grid, no list items", async () => {
    const { container } = render(await empty("list"));
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "No verified dates yet" })).toHaveLength(1);
    expect(container.querySelector("ol")).toBeNull();
    expect(container.querySelector("time")).toBeNull();
  });

  it.each(["grid", "list"] as const)("the %s view does not repeat the festival guides under the calendar", async (view) => {
    const { container } = render(await empty(view));
    expect(screen.queryByText(/Awaiting verified dates/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll('a[href^="/festivals/"]')).toHaveLength(0);
  });

  it("with data, grid view shows no list and list view shows no grid", () => {
    const { container, unmount } = renderView({ view: "grid" });
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(container.querySelector("ol")).toBeNull();
    unmount();
    const list = renderView({ view: "list" });
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(list.container.querySelector("ol")).not.toBeNull();
  });

  it("with data, neither view links to festival guides other than the ones with dates that month", () => {
    const grid = renderView({ view: "grid" });
    expect(grid.container.querySelectorAll('a[href^="/festivals/"]')).toHaveLength(0); // only after a day is selected
    grid.unmount();
    const list = renderView({ view: "list" });
    const hrefs = [...list.container.querySelectorAll('a[href^="/festivals/"]')].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/festivals/holi", "/festivals/ugadi"]);
  });

  it("keeps the toggle accessible in both views, marking the current one", () => {
    const grid = renderView({ view: "grid" });
    const nav = screen.getByRole("navigation", { name: "Calendar view" });
    expect(within(nav).getByRole("link", { name: "Month grid" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "List" })).not.toHaveAttribute("aria-current");
    grid.unmount();
    renderView({ view: "list" });
    expect(within(screen.getByRole("navigation", { name: "Calendar view" })).getByRole("link", { name: "List" })).toHaveAttribute("aria-current", "page");
  });

  it("does not repeat the site footer's note about dates differing by location", async () => {
    const { container } = render(await empty("grid"));
    expect(container).not.toHaveTextContent(/can differ by location/i);
  });

  it("has no month dropdown or Go button", async () => {
    const { container } = render(await empty("grid"));
    expect(container.querySelector("select")).toBeNull();
    expect(screen.queryByRole("button", { name: "Go" })).not.toBeInTheDocument();
  });
});

describe("empty-state card layout", () => {
  it("lets the description use the full card width (no paragraph max-width)", async () => {
    render(await CalendarPage({ searchParams: Promise.resolve({}) }));
    const paragraph = screen.getByRole("heading", { name: "No verified dates yet" }).parentElement!.querySelector("p")!;
    expect(paragraph.className).not.toMatch(/max-w-/);
  });
});

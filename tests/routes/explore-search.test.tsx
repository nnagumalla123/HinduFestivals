import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExplorePage from "@/app/explore/page";

const renderExplore = async (params: Record<string, string | string[] | undefined>) =>
  render(await ExplorePage({ searchParams: Promise.resolve(params) }));

describe("/explore search", () => {
  it("shows a labelled search form that submits by GET to /explore", async () => {
    await renderExplore({});
    const form = screen.getByRole("search", { name: /search festivals/i });
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveAttribute("action", "/explore");
    expect(screen.getByLabelText(/search by festival/i)).toHaveAttribute("name", "q");
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit");
    expect(screen.queryByRole("link", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("shows all ten festivals with no query", async () => {
    await renderExplore({});
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    expect(screen.getByRole("status")).toHaveTextContent("Showing all 10 festivals");
  });

  it("finds Ugadi, keeps the query in the box, and offers to clear it", async () => {
    await renderExplore({ q: "Ugadi" });
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Ugadi" })).toHaveAttribute("href", "/festivals/ugadi");
    expect(screen.getByLabelText(/search by festival/i)).toHaveValue("Ugadi");
    expect(screen.getByRole("status")).toHaveTextContent("1 festival found for “Ugadi”");
    expect(screen.getByRole("link", { name: "Clear search" })).toHaveAttribute("href", "/explore");
  });

  it("finds Vijayadashami by its alias and says why", async () => {
    await renderExplore({ q: "dussehra" });
    expect(screen.getByRole("link", { name: "Vijayadashami" })).toBeInTheDocument();
    expect(screen.getByText("Matched other name: Dussehra")).toBeInTheDocument();
  });

  it("labels a deity match neutrally until deity associations are reviewed", async () => {
    const { container } = await renderExplore({ q: "ganesha" });
    expect(screen.getByText("Matched search term: Ganesha")).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/matched deity/i);
  });

  it("shows an empty state with a way back when nothing matches", async () => {
    await renderExplore({ q: "zzzz" });
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "No festivals found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Show all festivals" })).toHaveAttribute("href", "/explore");
    expect(screen.getByRole("status")).toHaveTextContent("0 festivals found");
  });

  it("uses the first value when q is repeated, and caps very long queries", async () => {
    await renderExplore({ q: ["holi", "diwali"] });
    expect(screen.getByRole("link", { name: "Holi" })).toBeInTheDocument();
    await renderExplore({ q: "x".repeat(5000) });
    const box = screen.getAllByLabelText(/search by festival/i).at(-1) as HTMLInputElement;
    expect(box.value.length).toBeLessThanOrEqual(100);
  });

  it("renders markup in the query as text, not HTML", async () => {
    const { container } = await renderExplore({ q: "<img src=x onerror=alert(1)>" });
    expect(container.querySelector("img")).toBeNull();
  });

  it("never shows a date while no dates are verified, and has one h1", async () => {
    await renderExplore({});
    expect(screen.getAllByText("Date not yet verified")).toHaveLength(10);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});

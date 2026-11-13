import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MyFestivalsPage from "@/app/my-festivals/page";
import { SaveButton } from "@/components/festivals/SaveButton";
import { SavedFestivals } from "@/components/festivals/SavedFestivals";
import { FestivalCard } from "@/components/festivals/FestivalCard";
import FestivalPage from "@/app/festivals/[slug]/page";
import { SAVED_KEY, parseSaved, resetSavedStateForTests } from "@/lib/festivals/saved";
import { contentFestivals } from "../fixtures/festivals";

// `connection()` only works inside a real request; in unit tests there is none, so it becomes a no-op.
vi.mock("next/server", () => ({ connection: async () => {} }));

const stored = () => JSON.parse(window.localStorage.getItem(SAVED_KEY) ?? "null");

beforeEach(() => {
  window.localStorage.clear();
  resetSavedStateForTests();
});
afterEach(() => vi.restoreAllMocks());

describe("parseSaved (untrusted storage)", () => {
  it.each([
    [null, []],
    ["", []],
    ["not json{", []],
    ['{"a":1}', []],
    ['"ugadi"', []],
    ["42", []],
    ['["holi", 3, null, "", {"x":1}, "holi", "diwali"]', ["holi", "diwali"]],
  ])("%j -> %j", (raw, expected) => {
    expect(parseSaved(raw)).toEqual(expected);
  });
});

describe("save button", () => {
  it("saves, persists to localStorage, and unsaves", () => {
    render(<SaveButton slug="ugadi" name="Ugadi" />);
    fireEvent.click(screen.getByRole("button", { name: /Save Ugadi/ }));
    expect(stored()).toEqual(["ugadi"]);
    expect(screen.getByRole("button", { name: /Saved Ugadi/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Saved Ugadi/ }));
    expect(stored()).toEqual([]);
    expect(screen.getByRole("button", { name: /Save Ugadi/ })).toBeInTheDocument();
  });

  it("starts saved when the festival is already in storage (survives a refresh)", () => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(["holi"]));
    render(<SaveButton slug="holi" name="Holi" />);
    expect(screen.getByRole("button", { name: /Saved Holi/ })).toBeInTheDocument();
  });

  it("keeps two buttons for the same festival in step on one page", () => {
    render(
      <>
        <SaveButton slug="diwali" name="Diwali" />
        <SaveButton slug="diwali" name="Diwali" />
      </>,
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    screen.getAllByRole("button").forEach((b) => expect(b).toHaveTextContent("Saved"));
  });

  it("follows changes made in another tab (storage event)", () => {
    render(<SaveButton slug="holi" name="Holi" />);
    expect(screen.getByRole("button")).toHaveTextContent("Save");
    act(() => {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(["holi"]));
      window.dispatchEvent(new StorageEvent("storage", { key: SAVED_KEY }));
    });
    expect(screen.getByRole("button")).toHaveTextContent("Saved");
  });

  it("saves are additive and never duplicate", () => {
    render(
      <>
        <SaveButton slug="holi" name="Holi" />
        <SaveButton slug="ugadi" name="Ugadi" />
      </>,
    );
    const [holi, ugadi] = screen.getAllByRole("button");
    fireEvent.click(holi);
    fireEvent.click(ugadi);
    expect(stored()).toEqual(["holi", "ugadi"]);
  });

  it("recovers from corrupted storage and overwrites it with a valid list", () => {
    window.localStorage.setItem(SAVED_KEY, "{{{garbage");
    render(<SaveButton slug="holi" name="Holi" />);
    expect(screen.getByRole("button")).toHaveTextContent("Save");
    fireEvent.click(screen.getByRole("button"));
    expect(stored()).toEqual(["holi"]);
  });

  it("still works in memory when localStorage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<SaveButton slug="holi" name="Holi" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("Saved");
  });
});

describe("My Festivals list", () => {
  const list = () => render(<SavedFestivals festivals={contentFestivals} occurrences={[]} />);

  it("shows a friendly empty state with a link to Explore", () => {
    list();
    expect(screen.getByRole("heading", { name: "No saved festivals yet" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore festivals" })).toHaveAttribute("href", "/explore");
  });

  it("shows saved festivals as cards, ignoring unknown slugs", () => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(["ugadi", "not-a-festival", "holi"]));
    list();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Ugadi" })).toHaveAttribute("href", "/festivals/ugadi");
    expect(screen.getByRole("status")).toHaveTextContent("2 saved festivals");
    expect(screen.getAllByText("Date not yet verified")).toHaveLength(2);
  });

  it("removes a festival and falls back to the empty state after the last one", () => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(["ugadi"]));
    list();
    fireEvent.click(screen.getByRole("button", { name: /Remove Ugadi/ }));
    expect(stored()).toEqual([]);
    expect(screen.getByRole("heading", { name: "No saved festivals yet" })).toBeInTheDocument();
  });

  it("warns, but keeps working, when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    list();
    expect(screen.getByRole("alert")).toHaveTextContent(/blocking storage/);
    expect(screen.getByRole("heading", { name: "No saved festivals yet" })).toBeInTheDocument();
  });
});

describe("keyboard focus after Remove", () => {
  const slugs = ["diwali", "ugadi", "holi"];
  const removeButton = (name: string) => screen.getByRole("button", { name: new RegExp(`Remove ${name}`) });
  const setup = () => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(slugs));
    render(<SavedFestivals festivals={contentFestivals} occurrences={[]} />);
  };

  it("moves to the next Remove button", () => {
    setup();
    const ugadi = removeButton("Ugadi");
    ugadi.focus();
    fireEvent.click(ugadi);
    expect(removeButton("Holi")).toHaveFocus();
  });

  it("moves to the previous Remove button when the last item was removed", () => {
    setup();
    const holi = removeButton("Holi");
    holi.focus();
    fireEvent.click(holi);
    expect(removeButton("Ugadi")).toHaveFocus();
  });

  it("moves to the Explore link when the list becomes empty", () => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(["holi"]));
    render(<SavedFestivals festivals={contentFestivals} occurrences={[]} />);
    const holi = removeButton("Holi");
    holi.focus();
    fireEvent.click(holi);
    expect(screen.getByRole("link", { name: "Explore festivals" })).toHaveFocus();
  });
});

describe("where the save controls appear", () => {
  it("is on every festival detail page", async () => {
    for (const { slug, name } of contentFestivals) {
      const { unmount } = render(await FestivalPage({ params: Promise.resolve({ slug }) }));
      expect(screen.getByRole("button", { name: new RegExp(`Save ${name}`) })).toBeInTheDocument();
      unmount();
    }
  });

  it("is on festival cards without breaking the card link", () => {
    render(
      <ul>
        <FestivalCard festival={contentFestivals[0]} />
      </ul>,
    );
    expect(screen.getByRole("button", { name: /Save / })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("the My Festivals page renders its heading and loads the list", async () => {
    render(await MyFestivalsPage());
    expect(screen.getByRole("heading", { level: 1, name: "My Festivals" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore festivals" })).toBeInTheDocument();
  });
});

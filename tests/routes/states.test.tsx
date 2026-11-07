import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorPage from "@/app/error";
import FestivalNotFound from "@/app/festivals/[slug]/not-found";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";

describe("loading state", () => {
  it("announces itself politely to screen readers", () => {
    render(<Loading />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });
});

describe("error state", () => {
  it("shows a friendly message, not technical details", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorPage error={new Error("secret database detail")} retry={() => {}} />);
    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    expect(screen.queryByText(/secret database detail/)).toBeNull();
  });

  it("lets the visitor retry", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const retry = vi.fn();
    render(<ErrorPage error={new Error("boom")} retry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("offers a way home", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorPage error={new Error("boom")} retry={() => {}} />);
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});

describe("full-page states have exactly one h1 (so screen-reader users get a page title)", () => {
  it.each([
    ["global 404", () => <NotFound />],
    ["festival 404", () => <FestivalNotFound />],
    ["error page", () => <ErrorPage error={new Error("x")} retry={() => {}} />],
  ])("%s", (_name, element) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(element());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});

describe("not-found states", () => {
  it("global 404 offers ways back", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Explore festivals" })).toHaveAttribute("href", "/explore");
  });

  it("festival 404 points back to the festival list", () => {
    render(<FestivalNotFound />);
    expect(screen.getByRole("heading", { name: "Festival not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore all festivals" })).toHaveAttribute("href", "/explore");
  });
});

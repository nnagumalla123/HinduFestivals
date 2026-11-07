import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("EmptyState", () => {
  it("shows a heading, description and action", () => {
    render(
      <EmptyState
        title="No festivals found"
        description="Try another search."
        action={<button type="button">Clear</button>}
      />,
    );
    expect(screen.getByRole("heading", { level: 2, name: "No festivals found" })).toBeInTheDocument();
    expect(screen.getByText("Try another search.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("can be the page's h1 (used by the 404 and error pages)", () => {
    render(<EmptyState title="Page not found" headingLevel={1} />);
    expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument();
  });

  it("lets the page choose the heading level", () => {
    render(<EmptyState title="Nothing yet" headingLevel={3} />);
    expect(screen.getByRole("heading", { level: 3, name: "Nothing yet" })).toBeInTheDocument();
  });
});

describe("LoadingState", () => {
  it("announces a status message to assistive technology", () => {
    render(<LoadingState label="Loading festivals…" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading festivals…");
  });

  it("has a sensible default label", () => {
    render(<LoadingState />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });
});

describe("SectionHeading", () => {
  it("renders an h2 by default", () => {
    render(<SectionHeading title="Upcoming" />);
    expect(screen.getByRole("heading", { level: 2, name: "Upcoming" })).toBeInTheDocument();
  });

  it("renders the requested heading level", () => {
    render(<SectionHeading title="Welcome" level={1} />);
    expect(screen.getByRole("heading", { level: 1, name: "Welcome" })).toBeInTheDocument();
  });

  it("shows the optional eyebrow and description", () => {
    render(<SectionHeading title="Explore" eyebrow="Discover" description="Browse festivals." />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Browse festivals.")).toBeInTheDocument();
  });
});

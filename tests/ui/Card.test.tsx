import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("can render as a semantic <article>", () => {
    render(
      <Card as="article" aria-label="Sample">
        Content
      </Card>,
    );
    expect(screen.getByRole("article", { name: "Sample" })).toBeInTheDocument();
  });
});

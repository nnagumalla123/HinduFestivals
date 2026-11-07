import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "@/components/ui/Button";

describe("ButtonLink", () => {
  it("is a real link (not a <button>) so it navigates and is announced as a link", () => {
    render(<ButtonLink href="/explore">Explore</ButtonLink>);
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute("href", "/explore");
    expect(screen.queryByRole("button")).toBeNull();
  });
});

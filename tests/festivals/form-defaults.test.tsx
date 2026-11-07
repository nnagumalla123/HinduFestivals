import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchForm } from "@/components/festivals/SearchForm";

// Regression: Next.js keeps a form mounted when only the URL changes ("Clear search"),
// and an uncontrolled input's defaultValue is read only on mount. The forms must rebuild themselves.
describe("the search form follows the URL when the page stays mounted", () => {
  it("the search box empties when the query is cleared", () => {
    const { rerender } = render(<SearchForm defaultValue="ganesha" />);
    expect(screen.getByRole("searchbox")).toHaveValue("ganesha");
    rerender(<SearchForm defaultValue="" />);
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
});

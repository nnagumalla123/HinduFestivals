import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OccurrenceDate } from "@/components/festivals/OccurrenceDate";
import {
  syntheticDisputed,
  syntheticDraft,
  syntheticVerifiedMultiDay,
  syntheticVerifiedSingleDay,
} from "../fixtures/occurrences";

describe("OccurrenceDate", () => {
  it("shows a verified date together with its reference location and year", () => {
    render(<OccurrenceDate occurrence={syntheticVerifiedSingleDay} />);
    expect(screen.getByText("Fri, Mar 5")).toHaveAttribute("datetime", "2027-03-05");
    expect(screen.getByText("Atlanta, GA · 2027")).toBeInTheDocument();
    expect(screen.queryByText("Date not yet verified")).not.toBeInTheDocument();
  });

  it("shows the start and end of a multi-day observance", () => {
    const { container } = render(<OccurrenceDate occurrence={syntheticVerifiedMultiDay} />);
    expect(container).toHaveTextContent("Fri, Mar 5 – Sun, Mar 7");
    expect(container).toHaveTextContent("Atlanta, GA · 2027");
  });

  it.each([
    ["missing", undefined],
    ["draft", syntheticDraft],
    ["disputed", syntheticDisputed],
    ["malformed", { ...syntheticVerifiedSingleDay, startDate: "2027-02-30" }],
  ])("shows 'Date not yet verified', and no date or location, when the occurrence is %s", (_n, occurrence) => {
    const { container } = render(<OccurrenceDate occurrence={occurrence} />);
    expect(screen.getByText("Date not yet verified")).toBeInTheDocument();
    expect(container.querySelector("time")).toBeNull();
    expect(container).not.toHaveTextContent("Atlanta");
  });
});

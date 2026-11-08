import { describe, expect, it } from "vitest";
import { QUICK_FACT_KEYS } from "@/lib/festivals/content/schema";
import { QUICK_FACT_LABELS, QUICK_FACT_SLOTS } from "@/lib/festivals/types";
import { errors, validateRecord } from "@/lib/festivals/content/validate";
import { publishRecord } from "@/lib/festivals/content/load";
import { makeRecord, reviewedSection, TODAY, verifiedOccurrence } from "../fixtures/content";

describe("quick-fact labels", () => {
  it("are the same list in the authoring schema and the public types", () => {
    expect([...QUICK_FACT_KEYS]).toEqual([...QUICK_FACT_LABELS]);
  });

  it("include 'Signature foods' and 'Dietary practices' in one shared display slot", () => {
    expect(QUICK_FACT_LABELS).toContain("Signature foods");
    expect(QUICK_FACT_LABELS).toContain("Dietary practices");
    const slot = QUICK_FACT_SLOTS.find((s) => s.includes("Signature foods"));
    expect(slot).toEqual(["Dietary practices", "Signature foods"]);
    // Every label belongs to exactly one slot.
    QUICK_FACT_LABELS.forEach((label) => expect(QUICK_FACT_SLOTS.filter((s) => s.includes(label))).toHaveLength(1));
  });

  it("publish a reviewed 'Signature foods' fact with its citations and no internal notes", () => {
    const reviewed = { status: "reviewed" as const, reviewedAt: "2027-05-10", reviewedBy: "Secret Reviewer Name" };
    const record = makeRecord({
      sections: [reviewedSection],
      quickFacts: [{ label: "Signature foods", text: "Reviewed signature dish.", sourceIds: ["test-cultural"], ...reviewed, reviewNotes: ["BLOCKING: internal"] }],
      occurrences: [verifiedOccurrence],
    });
    expect(errors(validateRecord(record, TODAY))).toEqual([]);
    const out = publishRecord(record, TODAY);
    expect(out.guide.quickFacts.map((f) => f.label)).toEqual(["Signature foods"]);
    expect(JSON.stringify(out)).not.toContain("Secret Reviewer Name");
    expect(JSON.stringify(out)).not.toContain("internal");
  });
});

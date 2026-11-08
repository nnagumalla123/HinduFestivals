import { describe, expect, it } from "vitest";
import { FESTIVAL_RECORDS } from "@/content";
import { publishAll, publishRecord } from "@/lib/festivals/content/load";
import { errors, validateRecord } from "@/lib/festivals/content/validate";
import { isVerified } from "@/lib/festivals/occurrences";
import { TODAY, makeRecord, reviewedSection, verifiedOccurrence } from "../fixtures/content";

describe("the real content files", () => {
  it("contain exactly the ten festivals with unique slugs", () => {
    const slugs = FESTIVAL_RECORDS.map((r) => r.slug);
    expect(slugs).toHaveLength(10);
    expect(new Set(slugs).size).toBe(10);
  });

  it("have no validation errors (drafts included)", () => {
    for (const record of FESTIVAL_RECORDS) {
      expect(errors(validateRecord(record, "2027-01-01")), record.slug).toEqual([]);
    }
  });

  it("never use a discovery or holiday-list source for a published date or claim", () => {
    for (const record of FESTIVAL_RECORDS) {
      const bySource = new Map(record.sources.map((s) => [s.id, s]));
      const used = [...record.sections.flatMap((s) => s.sourceIds), ...record.occurrences.flatMap((o) => o.sourceIds)];
      for (const id of used) {
        const source = bySource.get(id)!;
        if (source.role === "discovery") throw new Error(`${record.slug}: discovery source ${id} is cited`);
      }
    }
  });

  it("never publish a verified occurrence that lacks Atlanta context", () => {
    for (const item of publishAll(FESTIVAL_RECORDS, TODAY)) {
      item.occurrences.forEach((o) => {
        expect(o.locationLabel).toBe("Atlanta, GA");
        expect(o.year).toBe(2027);
      });
    }
  });
});

describe("publishRecord (the fail-closed loader)", () => {
  it("publishes a reviewed section and a verified occurrence, with their sources", () => {
    const out = publishRecord(makeRecord({ sections: [reviewedSection], occurrences: [verifiedOccurrence] }), TODAY);
    expect(out.guide.sections).toHaveLength(1);
    expect(out.occurrences).toHaveLength(1);
    expect(out.occurrences[0]).toMatchObject({ locationLabel: "Atlanta, GA", year: 2027, verificationStatus: "verified" });
    expect(out.guide.sources.map((s) => `${s.role}:${s.title}`).sort()).toEqual([
      "cultural:Test cultural source",
      "date:Test Atlanta calendar",
      "date:Test independent calendar",
    ]);
  });

  it("withholds draft and in-review items, however complete they look", () => {
    const record = makeRecord({
      sections: [
        { ...reviewedSection, status: "draft" },
        { ...reviewedSection, status: "in_review", title: "Another" },
      ],
      occurrences: [
        { ...verifiedOccurrence, status: "draft" },
        { ...verifiedOccurrence, status: "disputed", notes: "differs", traditionKey: "other" },
      ],
    });
    const out = publishRecord(record, TODAY);
    expect(out.guide.sections).toEqual([]);
    expect(out.guide.sources).toEqual([]);
    expect(out.occurrences).toEqual([]);
  });

  it("withholds a 'reviewed' item that fails validation, but keeps its valid neighbours", () => {
    const record = makeRecord({
      sections: [
        { ...reviewedSection, title: "Bad", body: "TODO write this" },
        { ...reviewedSection, title: "Good" },
      ],
      occurrences: [{ ...verifiedOccurrence, sourceIds: ["test-date-primary"] }], // no independent check
    });
    const out = publishRecord(record, TODAY);
    expect(out.guide.sections.map((s) => s.title)).toEqual(["Good"]);
    expect(out.occurrences).toEqual([]);
  });

  it("keeps working notes out: draft text never appears anywhere in the public output", () => {
    const record = makeRecord({
      sections: [{ ...reviewedSection, status: "draft", body: "SECRET DRAFT TEXT TODO" }],
      occurrences: [{ ...verifiedOccurrence, status: "draft", notes: "SECRET NOTE" }],
    });
    expect(JSON.stringify(publishRecord(record, TODAY))).not.toMatch(/SECRET/);
  });

  it("never leaks reviewer or verifier identity, internal notes or discovery sources", () => {
    const record = makeRecord({
      sections: [reviewedSection],
      occurrences: [{ ...verifiedOccurrence, notes: "INTERNAL NOTE" }],
    });
    const json = JSON.stringify(publishRecord(record, TODAY));
    expect(json).not.toMatch(/Secret Reviewer Name|Secret Verifier Name|INTERNAL NOTE|reviewedBy|verifiedBy|Test discovery|Test holiday list/);
  });

  it("withholds all sections and occurrences when the record itself is broken", () => {
    const record = makeRecord({ slug: "Bad Slug!", sections: [reviewedSection], occurrences: [verifiedOccurrence] });
    const out = publishRecord(record, TODAY);
    expect(out.guide.sections).toEqual([]);
    expect(out.occurrences).toEqual([]);
    expect(out.festival.name).toBe("Test Festival"); // still listed
  });

  it("withholds both occurrences when two claim the same tradition", () => {
    const labelled = { ...verifiedOccurrence, traditionKey: "smarta", traditionLabel: "Smarta" };
    const out = publishRecord(makeRecord({ occurrences: [labelled, { ...labelled }] }), TODAY);
    expect(out.occurrences).toEqual([]);
  });

  it("publishes tradition-specific occurrences with their labels", () => {
    const a = { ...verifiedOccurrence, traditionKey: "a", traditionLabel: "Tradition A" };
    const b = { ...verifiedOccurrence, traditionKey: "b", traditionLabel: "Tradition B", startDate: "2027-03-06", endDate: "2027-03-06" };
    const out = publishRecord(makeRecord({ occurrences: [a, b] }), TODAY);
    expect(out.occurrences.map((o) => o.traditionLabel)).toEqual(["Tradition A", "Tradition B"]);
    expect(out.occurrences.every(isVerified)).toBe(true);
  });

  it("does not trust a verified date whose verification is dated in the future", () => {
    const out = publishRecord(makeRecord({ occurrences: [{ ...verifiedOccurrence, verifiedAt: "2028-01-01" }] }), TODAY);
    expect(out.occurrences).toEqual([]);
  });
});

describe("publishRecord and key days", () => {
  it("publishes key days with a verified occurrence", () => {
    const occ = { ...verifiedOccurrence, keyDays: [{ date: "2027-03-06", label: "Main puja", main: true }] };
    const out = publishRecord(makeRecord({ occurrences: [occ] }), TODAY);
    expect(out.occurrences[0].keyDays).toEqual([{ date: "2027-03-06", label: "Main puja", main: true }]);
  });

  it("withholds an occurrence whose key days are invalid, and never publishes key days of a draft", () => {
    const bad = { ...verifiedOccurrence, keyDays: [{ date: "2027-04-09", label: "Outside" }] };
    expect(publishRecord(makeRecord({ occurrences: [bad] }), TODAY).occurrences).toEqual([]);
    const draft = { ...verifiedOccurrence, status: "draft" as const, keyDays: [{ date: "2027-03-06", label: "SECRETDAY" }] };
    expect(JSON.stringify(publishRecord(makeRecord({ occurrences: [draft] }), TODAY))).not.toContain("SECRETDAY");
  });
});

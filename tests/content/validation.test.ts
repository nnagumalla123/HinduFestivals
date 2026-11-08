import { describe, expect, it } from "vitest";
import { errors, validateRecord, wordCount } from "@/lib/festivals/content/validate";
import {
  TODAY,
  culturalSource,
  holidayListSource,
  independentDateSource,
  makeRecord,
  primaryDateSource,
  reviewedSection,
  sameDataDateSource,
  verifiedOccurrence,
} from "../fixtures/content";

const messages = (record: ReturnType<typeof makeRecord>) => errors(validateRecord(record, TODAY)).map((i) => i.message);
const withSection = (patch: object) => makeRecord({ sections: [{ ...reviewedSection, ...patch }] });
const withOccurrence = (patch: object) => makeRecord({ occurrences: [{ ...verifiedOccurrence, ...patch }] });

describe("a complete reviewed section and verified occurrence", () => {
  it("has no errors", () => {
    expect(messages(makeRecord({ sections: [reviewedSection], occurrences: [verifiedOccurrence] }))).toEqual([]);
  });
});

describe("drafts", () => {
  it("may contain placeholders and be incomplete", () => {
    const record = makeRecord({
      sections: [{ ...reviewedSection, status: "draft", body: "TODO [source needed] ???", sourceIds: [], reviewedAt: undefined, reviewedBy: undefined }],
      occurrences: [{ ...verifiedOccurrence, status: "draft", method: undefined, verifiedAt: undefined, sourceIds: [] }],
    });
    expect(messages(record)).toEqual([]);
  });

  it("must still be structurally sound (real dates, known sources, right roles)", () => {
    expect(messages(withOccurrence({ status: "draft", startDate: "2027-02-30", endDate: "2027-02-30" }))).toContain(
      "startDate and endDate must be real YYYY-MM-DD dates",
    );
    expect(messages(withSection({ status: "draft", sourceIds: ["nope"] }))).toContain('unknown source id "nope"');
  });
});

describe("reviewed sections", () => {
  it.each([
    ["no reviewer", { reviewedBy: "" }, "reviewedBy is required"],
    ["review date in the future", { reviewedAt: "2027-12-01" }, "reviewedAt must be a real date that is not in the future"],
    ["no review date", { reviewedAt: undefined }, "reviewedAt must be a real date that is not in the future"],
    ["placeholder text", { body: "Real text. TODO check this" }, "contains placeholder or working-note text"],
    ["bracketed working note", { body: "Text [add source later]" }, "contains placeholder or working-note text"],
    ["empty body", { body: "  " }, "body is required"],
    ["a story with no tradition", { tradition: undefined }, "stories and regional variations must name their tradition"],
    ["no source", { sourceIds: [] }, "a cultural claim needs at least one cultural source"],
  ])("are rejected: %s", (_name, patch, expected) => {
    expect(messages(withSection(patch)).join("|")).toContain(expected);
  });

  it("need a source that lists the claims it supports and carries an audit note", () => {
    const noClaims = { ...culturalSource, claimsSupported: [] };
    const noNote = { ...culturalSource, termsNote: "" };
    expect(messages(makeRecord({ sections: [reviewedSection], sources: [noClaims] })).join("|")).toContain("claims it supports");
    expect(messages(makeRecord({ sections: [reviewedSection], sources: [noNote] })).join("|")).toContain("audit note");
  });

  describe("source-use model (terms read, reproduction, permission needed, permission granted)", () => {
    const use = (patch: Partial<typeof culturalSource>) =>
      messages(makeRecord({ sections: [reviewedSection], sources: [{ ...culturalSource, ...patch }] })).join("|");

    it("does NOT block an original paraphrase just because the terms were never read", () => {
      expect(use({ termsChecked: false, termsNote: "No terms page found; paraphrase and link only." })).toBe("");
    });

    it("blocks reproduction of protected content unless permission was granted", () => {
      expect(use({ reproducesProtectedContent: true })).toContain("reproduce protected content");
      expect(
        use({ reproducesProtectedContent: true, permissionRequired: "yes", permissionStatus: "granted" }),
      ).toBe("");
    });

    it("blocks a use that needs permission until the permission is granted", () => {
      for (const status of ["not_requested", "requested", "denied"] as const) {
        expect(use({ permissionRequired: "yes", permissionStatus: status }), status).toContain("requires permission");
      }
      expect(use({ permissionRequired: "yes", permissionStatus: "granted" })).toBe("");
    });

    it("blocks an unresolved permission question", () => {
      expect(use({ permissionRequired: "unresolved", permissionStatus: "not_requested" })).toContain("unresolved");
    });

    it("rejects inconsistent permission fields", () => {
      expect(use({ permissionRequired: "no", permissionStatus: "requested" })).toContain("must be \"not_needed\"");
      expect(use({ permissionRequired: "yes", permissionStatus: "not_needed" })).toContain("cannot be \"not_needed\"");
    });
  });

  it("let practical college guidance omit sources", () => {
    expect(messages(withSection({ kind: "college_guide", sourceIds: [], tradition: undefined }))).toEqual([]);
  });

  it("can never be backed by a date, discovery or holiday-list source", () => {
    for (const id of ["test-date-primary", "test-discovery", "test-holiday-list"]) {
      expect(messages(withSection({ sourceIds: [id] })).join("|"), id).toContain("cannot back cultural content");
    }
    const holidayAsCultural = { ...holidayListSource, role: "cultural" as const };
    expect(messages(makeRecord({ sections: [{ ...reviewedSection, sourceIds: [holidayAsCultural.id] }], sources: [holidayAsCultural] })).join("|")).toContain(
      "holiday-list",
    );
  });

  it("only warn (not error) about universal wording and unusual overview length", () => {
    const record = withSection({ kind: "overview", tradition: undefined, body: "All Hindus must fast." });
    const issues = validateRecord(record, TODAY);
    expect(errors(issues)).toEqual([]);
    expect(issues.filter((i) => i.severity === "warning").length).toBe(2);
  });
});

describe("verified occurrences", () => {
  it.each([
    ["no method", { method: "" }, "a verified date must state its method"],
    ["no verifier", { verifiedBy: undefined }, "verifiedBy is required"],
    ["wrong year", { year: 2026, startDate: "2026-03-05", endDate: "2026-03-05" }, "year must be 2027"],
    ["end before start", { endDate: "2027-03-04" }, "endDate cannot be before startDate"],
    ["another location", { locationSlug: "elsewhere" }, 'locationSlug must be "atlanta-ga"'],
    ["no sources", { sourceIds: [] }, "primary date source"],
    ["a cultural source as proof of a date", { sourceIds: ["test-cultural"] }, "cannot back a date"],
  ])("are rejected: %s", (_name, patch, expected) => {
    expect(messages(withOccurrence(patch)).join("|")).toContain(expected);
  });

  it("need an independent cross-check", () => {
    const onlyPrimary = withOccurrence({ sourceIds: ["test-date-primary"] });
    expect(messages(onlyPrimary).join("|")).toContain("independent cross-check");
  });

  it("do not accept a second source built on the same underlying data", () => {
    const sameData = withOccurrence({ sourceIds: ["test-date-primary", sameDataDateSource.id] });
    expect(messages(sameData).join("|")).toContain("independent cross-check");
  });

  it("do not accept a holiday list as the independent check or as the primary", () => {
    expect(messages(withOccurrence({ sourceIds: ["test-date-primary", "test-holiday-list"] })).join("|")).toContain("independent cross-check");
    expect(messages(withOccurrence({ sourceIds: ["test-date-independent", "test-holiday-list"] })).join("|")).toContain("primary date source");
  });

  it("accept a holiday list as an extra cross-check beside two real sources", () => {
    expect(messages(withOccurrence({ sourceIds: ["test-date-primary", "test-date-independent", "test-holiday-list"] }))).toEqual([]);
  });

  it("need the primary to be specific to the reference location and to state its method", () => {
    const generic = { ...primaryDateSource, locationSpecific: false };
    const noMethod = { ...primaryDateSource, methodNote: " " };
    for (const bad of [generic, noMethod]) {
      const record = makeRecord({ occurrences: [verifiedOccurrence], sources: [bad, independentDateSource] });
      expect(messages(record).join("|")).toContain("primary date source");
    }
  });

  it("require disputed dates to explain the disagreement", () => {
    expect(messages(withOccurrence({ status: "disputed", notes: undefined }))).toContain("a disputed date must explain the disagreement in notes");
    expect(messages(withOccurrence({ status: "disputed", notes: "Sources differ by a day" }))).toEqual([]);
  });
});

describe("tradition-specific observances", () => {
  const smarta = { ...verifiedOccurrence, traditionKey: "smarta", traditionLabel: "Smarta" };
  const vaishnava = { ...verifiedOccurrence, traditionKey: "vaishnava", traditionLabel: "Vaishnava", startDate: "2027-03-06", endDate: "2027-03-06" };

  it("allow separately labeled observances", () => {
    expect(messages(makeRecord({ occurrences: [smarta, vaishnava] }))).toEqual([]);
  });

  it("need a public label", () => {
    expect(messages(makeRecord({ occurrences: [{ ...smarta, traditionLabel: undefined }] })).join("|")).toContain("traditionLabel");
  });

  it("never allow a 'general' observance beside tradition-specific ones", () => {
    expect(messages(makeRecord({ occurrences: [verifiedOccurrence, smarta] })).join("|")).toContain("cannot coexist");
  });

  it("reject duplicates for the same tradition", () => {
    expect(messages(makeRecord({ occurrences: [smarta, { ...smarta }] })).join("|")).toContain("duplicate occurrence");
  });
});

describe("reviewed basics", () => {
  it("need a review date and an internal reviewer", () => {
    expect(messages(makeRecord({ basics: { status: "reviewed" } })).join("|")).toContain("reviewedBy is required");
    expect(messages(makeRecord({ basics: { status: "reviewed", reviewedAt: "2027-05-01", reviewedBy: "A" } }))).toEqual([]);
  });
});

describe("helpers", () => {
  it("wordCount counts words", () => {
    expect(wordCount("  one two\nthree ")).toBe(3);
    expect(wordCount("")).toBe(0);
  });
});

describe("key days inside a multi-day observance", () => {
  const withKeyDays = (keyDays: object[]) => messages(withOccurrence({ keyDays })).join("|");

  it("accept labelled days inside the range with one main day", () => {
    expect(
      withKeyDays([
        { date: "2027-03-05", label: "Opening" },
        { date: "2027-03-06", label: "Main puja", main: true },
        { date: "2027-03-07", label: "Closing" },
      ]),
    ).toBe("");
  });

  it("reject a bad date, a date outside the range, a blank label and two main days", () => {
    expect(withKeyDays([{ date: "2027-02-30", label: "Bad" }])).toContain("real YYYY-MM-DD");
    expect(withKeyDays([{ date: "2027-04-01", label: "Late" }])).toContain("outside the occurrence");
    expect(withKeyDays([{ date: "2027-03-06", label: " " }])).toContain("needs a label");
    expect(
      withKeyDays([
        { date: "2027-03-05", label: "A", main: true },
        { date: "2027-03-06", label: "B", main: true },
      ]),
    ).toContain("at most one key day");
  });

  it("reject working notes in a verified occurrence's key-day label", () => {
    expect(withKeyDays([{ date: "2027-03-06", label: "TODO name this" }])).toContain("placeholder");
  });
});

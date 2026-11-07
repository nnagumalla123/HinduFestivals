import { describe, expect, it } from "vitest";
import { safeReturnPath } from "@/lib/utils/return-path";

describe("safeReturnPath", () => {
  it.each([
    ["/", "/"],
    ["/festivals/ugadi", "/festivals/ugadi"],
    ["/explore?q=ugadi", "/explore?q=ugadi"],
    ["/festivals/ugadi#stories", "/festivals/ugadi#stories"],
    ["/calendar?view=list&month=2027-03", "/calendar?view=list&month=2027-03"],
  ])("keeps the same-site path %s", (input, expected) => {
    expect(safeReturnPath(input)).toBe(expected);
  });

  it.each([
    "https://evil.com",
    "http://evil.com/festivals",
    "//evil.com",
    "//evil.com/path",
    "/\\evil.com",
    "/\t/evil.com",
    "/\n/evil.com",
    "\\\\evil.com",
    "javascript:alert(1)",
    "data:text/html,hi",
    "evil.com",
    "festivals/ugadi",
    "",
  ])("falls back for the unsafe value %j", (input) => {
    expect(safeReturnPath(input)).toBe("/");
  });

  it("falls back for missing values and honors a custom fallback", () => {
    expect(safeReturnPath(null)).toBe("/");
    expect(safeReturnPath(undefined)).toBe("/");
    expect(safeReturnPath("//evil.com", "/explore")).toBe("/explore");
  });
});

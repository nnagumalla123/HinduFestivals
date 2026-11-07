import { describe, expect, it, vi } from "vitest";

// next/font/google only works inside the Next.js build, so replace it with a stub.
vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-fraunces" }),
  Source_Sans_3: () => ({ variable: "font-source-sans" }),
}));

import { metadata } from "@/app/layout";

describe("site metadata", () => {
  it("names the app Desi Days, with a template for per-page titles", () => {
    expect(metadata.title).toEqual({ default: "Desi Days", template: "%s | Desi Days" });
  });

  it("no longer uses the old working name", () => {
    expect(JSON.stringify(metadata)).not.toMatch(/Festival Companion/);
  });
});

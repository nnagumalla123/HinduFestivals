import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

describe("synthetic test data stays out of the shipped app", () => {
  it("is never imported from app/, components/ or lib/", () => {
    const offenders = ["app", "components", "lib"]
      .flatMap((dir) => sourceFiles(join(process.cwd(), dir)))
      .filter((file) => /fixtures/.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });
});

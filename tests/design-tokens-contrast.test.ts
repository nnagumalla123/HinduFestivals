import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Reads the color tokens straight from app/globals.css and checks WCAG AA contrast
 * for the text/background pairings the components actually use.
 * AA: 4.5:1 for normal text, 3:1 for large text and UI boundaries.
 */
const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Token --color-${name} not found in globals.css`);
  return match[1];
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel(n >> 16) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

function contrast(foreground: string, background: string): number {
  const [a, b] = [luminance(token(foreground)), luminance(token(background))].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

describe("brand tokens match the PRD palette", () => {
  it.each([
    ["maroon", "#7b1e2b"],
    ["saffron", "#c46b26"],
    ["gold", "#d6a545"],
    ["ivory", "#f8eedb"],
    ["green", "#315b47"],
  ])("%s is %s", (name, hex) => {
    expect(token(name).toLowerCase()).toBe(hex);
  });
});

describe("text pairings meet WCAG AA (4.5:1)", () => {
  it.each([
    ["ink", "ivory"],
    ["ink", "ivory-soft"],
    ["ink-muted", "ivory"],
    ["ink-muted", "ivory-soft"],
    ["maroon", "ivory"],
    ["maroon", "ivory-soft"],
    ["maroon", "gold-tint"],
    ["green", "ivory"],
    ["saffron-deep", "ivory"],
    ["saffron-deep", "ivory-soft"],
    ["gold-deep", "ivory"],
    ["gold-deep", "gold-tint"],
    ["error", "ivory-soft"],
    ["ivory", "maroon"],
    ["ivory", "maroon-deep"],
    ["ivory", "green"],
    ["gold", "maroon-deep"],
  ])("%s on %s", (fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("known limits of the raw brand colors (documented on purpose)", () => {
  it("plain saffron is only OK for large text and UI, not body text", () => {
    const ratio = contrast("saffron", "ivory");
    expect(ratio).toBeGreaterThanOrEqual(3);
    expect(ratio).toBeLessThan(4.5);
  });

  it("plain gold on ivory is decoration only", () => {
    expect(contrast("gold", "ivory")).toBeLessThan(3);
  });
});

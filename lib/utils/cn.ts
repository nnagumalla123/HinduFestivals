/** Joins class names, skipping falsy values. A tiny stand-in for the `clsx` package. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

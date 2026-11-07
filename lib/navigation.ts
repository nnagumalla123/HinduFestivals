export interface NavItem {
  label: string;
  href: string;
  /** Extra path prefixes that should also highlight this item (e.g. festival pages belong to Explore). */
  alsoActiveFor?: readonly string[];
}

/** The four primary destinations (PRD section 3). Shown in the desktop header and the mobile bottom bar. */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Explore", href: "/explore", alsoActiveFor: ["/festivals"] },
  { label: "My Festivals", href: "/my-festivals" },
];

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** True when `pathname` is this nav item's page (or one of its child pages). */
export function isNavItemActive(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false;
  // "/" is a prefix of every path, so Home must match exactly.
  if (item.href === "/") return pathname === "/";
  return [item.href, ...(item.alsoActiveFor ?? [])].some((p) => matchesPrefix(pathname, p));
}

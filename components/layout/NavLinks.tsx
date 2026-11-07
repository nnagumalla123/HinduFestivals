"use client"; // needs usePathname(), which only works in the browser

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavItemActive, primaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";

interface NavLinksProps {
  /** desktop = inline links in the header; mobile = equal-width tabs in the bottom bar */
  variant: "desktop" | "mobile";
}

/** The primary links. A client component only so it can highlight the current page. */
export function NavLinks({ variant }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex", variant === "desktop" ? "items-center gap-1" : "w-full")}>
      {primaryNav.map((item) => {
        const active = isNavItemActive(item, pathname);
        return (
          <li key={item.href} className={variant === "mobile" ? "flex-1" : undefined}>
            <Link
              href={item.href}
              // Tells screen readers which page is current; also drives the styling below.
              aria-current={active ? "page" : undefined}
              className={cn(
                variant === "desktop"
                  ? "inline-flex min-h-11 items-center rounded-md px-3 font-semibold underline-offset-8 hover:bg-gold-tint"
                  : "flex min-h-14 flex-col items-center justify-center border-t-4 px-1 text-sm font-semibold",
                active
                  ? variant === "desktop"
                    ? "text-maroon underline decoration-gold decoration-4"
                    : "border-gold text-maroon"
                  : variant === "desktop"
                    ? "text-ink"
                    : "border-transparent text-ink-muted",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

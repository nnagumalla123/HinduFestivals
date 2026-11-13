import Link from "next/link";
import { NavLinks } from "./NavLinks";

/**
 * Top bar. Desktop: brand and four links. Mobile: brand only (the four links move to the
 * bottom bar, see MobileNav).
 */
export function Header() {
  return (
    <header className="border-b border-gold/60 bg-ivory">
      <div className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between gap-4 px-6">
        {/* Wordmark: "Desi Days" in the display serif and brand maroon. */}
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-maroon sm:text-3xl">
          Desi Days
        </Link>

        {/* Desktop navigation: hidden on small screens (display: none also hides it from screen readers). */}
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks variant="desktop" />
        </nav>
      </div>
    </header>
  );
}

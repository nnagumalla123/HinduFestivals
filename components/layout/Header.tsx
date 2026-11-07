import Link from "next/link";
import { NavLinks } from "./NavLinks";

/**
 * Top bar. Desktop: brand, four links, "Sign in". Mobile: brand and a single account
 * icon (the four links move to the bottom bar, see MobileNav).
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

        {/* Desktop account link */}
        <Link
          href="/login"
          className="hidden min-h-11 items-center rounded-md border border-maroon px-4 font-semibold text-maroon hover:bg-gold-tint md:inline-flex"
        >
          Sign in
        </Link>

        {/* Mobile account icon: the only icon in the shell, as the PRD requires */}
        <Link
          href="/login"
          className="inline-flex size-11 items-center justify-center rounded-full border border-maroon text-maroon hover:bg-gold-tint md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Sign in</span>
        </Link>
      </div>
    </header>
  );
}

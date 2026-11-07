import { NavLinks } from "./NavLinks";

/** Bottom tab bar for phones. Hidden from the `md` breakpoint (768px) up, where the header nav takes over. */
export function MobileNav() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/60 bg-ivory-soft shadow-card md:hidden"
    >
      <NavLinks variant="mobile" />
    </nav>
  );
}

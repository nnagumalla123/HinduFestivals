import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { SkipLink } from "./SkipLink";

/**
 * The frame around every page: skip link, header, <main>, footer, mobile bottom bar.
 * Pages only supply what goes inside <main>.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      {/* tabIndex=-1 lets the skip link move focus here without adding a tab stop. */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      {/* On phones, leave room so the fixed bottom bar never covers the footer text. */}
      <div className="pb-16 md:pb-0">
        <Footer />
      </div>
      <MobileNav />
    </>
  );
}

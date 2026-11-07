import { SECTION_NAV } from "@/lib/festivals/guide";

/** In-page links to each section. Plain anchors: they work without JavaScript and show up in the URL. */
export function SectionNav() {
  return (
    <nav aria-label="On this page" className="flex flex-col gap-2">
      <p className="text-sm font-semibold uppercase tracking-widest text-ink-muted">On this page</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {SECTION_NAV.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-8 items-center font-semibold text-saffron-deep underline underline-offset-4 hover:text-maroon"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

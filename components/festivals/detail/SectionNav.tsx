import { SECTION_NAV } from "@/lib/festivals/guide";

/**
 * In-page links to each section. Plain anchors: they work without JavaScript and show up in the URL.
 * `items` lets a reviewed guide leave out the sections it hides, so no link points at nothing.
 */
export function SectionNav({ items = SECTION_NAV }: { items?: readonly { id: string; title: string }[] }) {
  return (
    <nav aria-label="On this page" className="flex flex-col gap-2">
      <p className="text-sm font-semibold uppercase tracking-widest text-ink-muted">On this page</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {items.map((item) => (
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

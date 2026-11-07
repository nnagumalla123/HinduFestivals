/**
 * First focusable element on every page. Keyboard users press Tab once and can jump
 * past the header straight to the content. Invisible until it receives focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-maroon focus:px-4 focus:py-2 focus:font-semibold focus:text-ivory"
    >
      Skip to main content
    </a>
  );
}

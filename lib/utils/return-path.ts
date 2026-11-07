const BASE = "http://return-path.invalid"; // placeholder origin, used only to detect off-site URLs

/**
 * Makes a "send me back here after sign-in" value safe to redirect to. Accepts only
 * same-site relative paths ("/festivals/ugadi?x=1"). Anything else (other sites,
 * "//evil.com", "/\evil.com", "javascript:", empty) becomes `fallback`.
 *
 * Why URL parsing instead of string checks: browsers treat "\" like "/" and ignore
 * tabs/newlines, so "/\evil.com" and "/\t/evil.com" both mean "//evil.com". Letting the
 * URL parser resolve it and checking the origin catches all of those tricks.
 */
export function safeReturnPath(raw: string | null | undefined, fallback = "/"): string {
  if (!raw || !raw.startsWith("/")) return fallback;
  try {
    const url = new URL(raw, BASE);
    if (url.origin !== BASE) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

/**
 * Link to the sign-in page that remembers where to come back to: "/login?next=%2Ffestivals%2Fugadi".
 * The target is validated first, so an unsafe value can never be put into the link. Authentication
 * itself arrives in Phase 4, which will read `next` (and validate it again) after sign-in.
 */
export function signInHref(returnTo: string): string {
  return `/login?next=${encodeURIComponent(safeReturnPath(returnTo))}`;
}

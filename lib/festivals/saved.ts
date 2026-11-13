/*
 * Saved festivals, kept in the browser's localStorage as a JSON array of slugs.
 * Browser storage is untrusted: it can be missing, full, blocked or edited by hand, so every
 * read is validated and every access is wrapped in try/catch. If storage fails, the list is
 * kept in memory for this page visit instead, so the buttons still work (it just won't persist).
 */

export const SAVED_KEY = "desi-days:saved-festivals";

let memoryRaw: string | null = null;
let usingMemory = false;
const listeners = new Set<() => void>();

/** Turns whatever is stored into a clean list of unique slugs. Anything unexpected gives []. */
export function parseSaved(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((item): item is string => typeof item === "string" && item !== ""))];
  } catch {
    return [];
  }
}

/** The raw stored string. A stable primitive, which is what useSyncExternalStore needs. */
export function readRaw(): string | null {
  if (usingMemory) return memoryRaw;
  try {
    return window.localStorage.getItem(SAVED_KEY);
  } catch {
    usingMemory = true;
    return memoryRaw;
  }
}

/** False once storage has failed and the list lives only in memory. */
export function isPersistent(): boolean {
  return !usingMemory;
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // The `storage` event fires in OTHER tabs when this key changes, which keeps tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === SAVED_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function write(slugs: string[]) {
  const raw = JSON.stringify(slugs);
  try {
    window.localStorage.setItem(SAVED_KEY, raw);
    usingMemory = false;
  } catch {
    usingMemory = true;
    memoryRaw = raw;
  }
  listeners.forEach((listener) => listener()); // same-tab listeners (the storage event skips this tab)
}

export function saveFestival(slug: string) {
  const current = parseSaved(readRaw());
  if (!current.includes(slug)) write([...current, slug]);
}

export function unsaveFestival(slug: string) {
  const current = parseSaved(readRaw());
  if (current.includes(slug)) write(current.filter((s) => s !== slug));
}

/** Test helper: forget in-memory fallback state. */
export function resetSavedStateForTests() {
  memoryRaw = null;
  usingMemory = false;
  listeners.clear();
}

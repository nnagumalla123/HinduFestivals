"use client";

import { useMemo, useSyncExternalStore } from "react";
import { isPersistent, parseSaved, readRaw, saveFestival, subscribe, unsaveFestival } from "./saved";

const noopSubscribe = () => () => {};

/**
 * Read and change the saved festivals from a client component.
 * `ready` is false during server rendering and the first client render, so callers can show a
 * loading state instead of briefly flashing "nothing saved".
 */
export function useSavedFestivals() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const saved = useMemo(() => parseSaved(raw), [raw]);
  return {
    saved,
    ready,
    persistent: isPersistent(),
    isSaved: (slug: string) => saved.includes(slug),
    save: saveFestival,
    unsave: unsaveFestival,
  };
}

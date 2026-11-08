"use client";

import { useSyncExternalStore } from "react";
import { occurrenceCountdown, todayInReferenceZone } from "@/lib/festivals/next-festival";
import type { FestivalOccurrence } from "@/lib/festivals/types";

/**
 * A countdown for one verified occurrence. It measures "today" in the Atlanta reference time zone.
 *
 * With no `today` prop it works it out in the browser after the page loads, so festival pages can stay
 * statically built (cacheable, and an unknown slug is still a real HTTP 404) while the countdown is never
 * frozen at build time. The date itself is already in the page's HTML; only this line appears after load.
 * Tests (or a server caller) can pass `today` to render it immediately.
 * Renders nothing for an unverified, malformed or past occurrence.
 */
const subscribe = () => () => {};
const browserToday = () => todayInReferenceZone(new Date());
const serverToday = () => ""; // on the server (and while hydrating) no countdown, so the HTML never has a stale one

export function Countdown({ occurrence, today }: { occurrence: FestivalOccurrence; today?: string }) {
  // The browser's clock is an external system, so it is read with useSyncExternalStore.
  const clockToday = useSyncExternalStore(subscribe, browserToday, serverToday);
  const label = occurrenceCountdown(occurrence, today ?? clockToday);
  if (!label) return null;
  return <p className="text-lg font-semibold text-maroon">{label}</p>;
}

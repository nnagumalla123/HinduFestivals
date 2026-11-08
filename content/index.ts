import type { FestivalRecord } from "@/lib/festivals/content/schema";
import { diwali } from "./festivals/diwali";
import { ugadi } from "./festivals/ugadi";
import { holi } from "./festivals/holi";
import { ganeshChaturthi } from "./festivals/ganesh-chaturthi";
import { navaratri } from "./festivals/navaratri";
import { vijayadashami } from "./festivals/vijayadashami";
import { krishnaJanmashtami } from "./festivals/krishna-janmashtami";
import { mahaShivaratri } from "./festivals/maha-shivaratri";
import { makaraSankranti } from "./festivals/makara-sankranti";
import { ramaNavami } from "./festivals/rama-navami";

/**
 * Every festival record, in display order (the ten curated festivals from the PRD).
 * Authoring rules: docs/IMPLEMENTATION_PLAN.md (Phase 3). Only reviewed, validated items
 * reach public pages (lib/festivals/content/load.ts).
 */
export const FESTIVAL_RECORDS: readonly FestivalRecord[] = [
  diwali,
  ugadi,
  holi,
  ganeshChaturthi,
  navaratri,
  vijayadashami,
  krishnaJanmashtami,
  mahaShivaratri,
  makaraSankranti,
  ramaNavami,
];

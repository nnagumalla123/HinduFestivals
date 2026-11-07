import { DATE_NOT_VERIFIED_LABEL } from "@/lib/festivals/constants";

/** The only date information shown while data is mock: an honest "we don't know yet". */
export function DateNotVerified() {
  return (
    <p className="inline-block rounded-sm bg-gold-tint px-2 py-0.5 text-sm font-semibold text-gold-deep">
      {DATE_NOT_VERIFIED_LABEL}
    </p>
  );
}

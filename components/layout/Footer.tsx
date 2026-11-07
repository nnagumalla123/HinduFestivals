import { DATE_NOT_VERIFIED_LABEL } from "@/lib/festivals/constants";

/** Dark maroon footer. `surface-dark` flips the keyboard focus ring to gold so it stays visible here. */
export function Footer() {
  return (
    <footer className="surface-dark bg-maroon-deep text-ivory">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-10">
        <p className="max-w-prose text-ivory/90">
          Festival dates can differ by location, so we only show a date once it has been
          verified; otherwise you will see “{DATE_NOT_VERIFIED_LABEL}”.
        </p>
        <p className="text-sm text-ivory/80">Content is still being prepared and reviewed.</p>
      </div>
    </footer>
  );
}

import { Button, ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MAX_QUERY_LENGTH } from "@/lib/festivals/search";

/**
 * A plain HTML GET form: submitting it loads /explore?q=..., so search works without
 * JavaScript, can be bookmarked or shared, and the Back button behaves normally.
 */
export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    // `key`: rebuild the form when the query in the URL changes (e.g. "Clear search" is a link, and an
    // input's defaultValue is only read when it is first created).
    <form
      key={defaultValue}
      action="/explore"
      method="get"
      role="search"
      aria-label="Search festivals"
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Search by festival, other name, or deity"
            name="q"
            type="search"
            defaultValue={defaultValue}
            maxLength={MAX_QUERY_LENGTH}
            placeholder="Try Ugadi, Dussehra, or Ganesha"
            autoComplete="off"
          />
        </div>
        <Button type="submit" size="md">
          Search
        </Button>
        {defaultValue && (
          <ButtonLink href="/explore" variant="quiet">
            Clear search
          </ButtonLink>
        )}
      </div>
    </form>
  );
}

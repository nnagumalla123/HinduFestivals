# Desi Days — Technical Architecture

**Version:** 1.0 | **Date:** 2026-11-07 | **Status:** Proposed implementation baseline

## 1. Stack and rationale
- **Next.js App Router + React + TypeScript:** one repo for server-rendered public content, UI, and server-side mutations.
- **Tailwind CSS:** responsive design system.
- **Supabase PostgreSQL + Auth:** relational data, email/password login, verified emails, Row Level Security.
- **Resend (or equivalent):** transactional reminder email.
- **Vercel:** deployment and scheduled cron endpoint; verify plan limits and cron frequency before relying on it.
- **Vitest + React Testing Library + Playwright:** unit, component, and end-to-end tests.
- No separate FastAPI backend, AI-generated content, or live Panchang API in MVP.

## 2. Architecture flow
```text
Browser (guest/authenticated)
  → Next.js App Router (server components, client components)
  → server-side services / route handlers (validate input + enforce authorization)
  → Supabase PostgreSQL (public published content; private user rows under RLS)

Scheduled cron → protected server route → due reminder query/atomic claim
               → recheck consent/follow/verification → email provider
               → delivery status + bounded retry
```

Public pages can be server-rendered; interactive calendar, filters, and follow buttons are client components. Use server-side reads for privileged operations. Keep service-role keys server-only and narrowly scoped.

## 3. Domain model
> **Phase 3 decision (2026-11-07):** public festival content is stored in typed, version-controlled content files (`content/festivals/<slug>.ts`) validated by `lib/festivals/content/`, not in Supabase. The relational model below is the **target shape** for that content and the migration path: each content file maps to these tables (slug is the stable key). Supabase is introduced in Phase 4 for the user-owned tables; a `festivals` table seeded from the content files by a reviewed script gives `user_festivals` its foreign key without changing how public pages read content. The query layer (`lib/festivals/queries.ts`) is the only place pages read content, so the data source can change later without touching pages.

### Published content
- `festivals`: `id uuid PK`, `slug text UNIQUE`, `name text`, `subtitle text`, `summary text`, `hero_image_url text NULL`, `hero_alt text NULL`, `status enum(draft,published)`, `reviewed_at timestamptz NULL`, `created_at`, `updated_at`.
- `festival_aliases`: `id uuid PK`, `festival_id FK`, `alias text`, `language_code text NULL`; unique `(festival_id, lower(alias))` via expression index.
- `deities`: `id uuid PK`, `name text UNIQUE`, `summary text NULL`.
- `festival_deities`: `(festival_id, deity_id)` composite PK, `association_note text`, `tradition_key text NULL`; deity search can join this relation.
- `festival_sections`: `id uuid PK`, `festival_id FK`, `kind enum(overview,significance,story,rituals,food,fasting,traditional_guide,college_guide,regional_variation)`, `title text`, `body text`, `tradition_key text NULL`, `sort_order int`, `is_expanded_by_default bool`, `reviewed_at timestamptz NULL`.
- `festival_practices`: `id uuid PK`, `festival_id FK`, `category enum(ritual,food,fasting,dietary,preparation)`, `name text`, `description text`, `region_id FK NULL`, `tradition_key text NULL`, `optionality enum(common,optional,varies)`, `sort_order int`.
- `regions`: `id uuid PK`, `slug text UNIQUE`, `name text`.
- `festival_regions`: composite PK `(festival_id,region_id)`; region filters aid discovery, never imply universal practice.
- `calendar_locations`: `id uuid PK`, `slug text UNIQUE`, `label text`, `latitude numeric`, `longitude numeric`, `iana_timezone text`, `methodology text`.
- `festival_occurrences`: `id uuid PK`, `festival_id FK`, `calendar_location_id FK`, `year int`, `start_date date`, `end_date date`, `tradition_key text DEFAULT 'general'`, `verification_status enum(draft,verified,disputed)`, `verified_at timestamptz NULL`, `notes text NULL`; check end_date >= start_date. Do not insert fabricated dates.
- `festival_sources`: `id uuid PK`, `festival_id FK`, `occurrence_id FK NULL`, `section_id FK NULL`, `title text`, `url text`, `publisher text NULL`, `source_type enum(calendar,text,temple,academic,cultural,other)`, `accessed_at date`, `notes text NULL`. Require at least one relevant source for each verified occurrence and each published festival, enforced in editorial validation (cross-table checks may require application logic/trigger).

### User-owned data
- `profiles`: `user_id uuid PK REFERENCES auth.users(id)`, `calendar_location_id FK`, `iana_timezone text NOT NULL`, `onboarding_complete bool DEFAULT false`, `created_at`, `updated_at`. Default calendar location Atlanta; time zone may be set separately. Validate IANA timezone against known identifiers.
- `user_regions`: `(user_id,region_id)` composite PK.
- `user_festivals`: `(user_id,festival_id)` composite PK, `created_at`.
- `reminder_preferences`: `user_id uuid PK`, `email_enabled bool DEFAULT false`, `lead_days int[] DEFAULT '{}'`, `updated_at`; validate every lead day in {0,1,3,7} and uniqueness; avoid invalid/null values.
- `reminder_deliveries`: `id uuid PK`, `user_id FK`, `occurrence_id FK`, `lead_day int`, `channel text DEFAULT 'email'`, `due_at timestamptz`, `status enum(pending,processing,sent,failed,cancelled)`, `attempts int DEFAULT 0`, `claimed_at timestamptz NULL`, `provider_message_id text NULL`, `last_error_code text NULL`, `sent_at timestamptz NULL`, `created_at`; UNIQUE `(user_id,occurrence_id,lead_day,channel)`.

### Relationships
`festival → aliases/sections/practices/deities/regions/occurrences/sources`; `profile → user_regions/user_festivals/reminder_preferences/reminder_deliveries`; `occurrence → calendar_location + source(s)`.

### Data integrity
Use foreign keys, indexes on occurrence `(calendar_location_id,start_date,verification_status)`, published festival slug, user follows, and pending deliveries `(status,due_at)`. Enforce positive valid years and nonnegative attempts. Avoid multiple conflicting verified occurrences with the same `(festival_id, calendar_location_id, year, tradition_key)` unless explicitly modeled as separate observances. When in doubt, leave as draft/disputed.

## 4. Date handling
- Initial `calendar_locations`: Atlanta, GA, USA, `America/New_York` (reference calendar); coordinates documented in seed metadata, not derived from user geolocation.
- Add verified **2027** dates to the content files only after editorial verification; no hardcoded dates in component logic.
- **Source roles:** every source is `date`, `cultural` or `discovery`. Only `cultural` sources may back a guide section; only `date` sources may back an occurrence; `discovery` sources are never cited publicly. A holiday-list source (flag `holidayList`) may only be a cross-check and never counts as the primary source or as the independent check.
- **Independence rule:** a `verified` occurrence needs (1) a primary `date` source that is location-specific for the reference location and states its method, and (2) a second `date` source in a different `independenceGroup` (sources sharing underlying calendar data share a group) that is not a holiday-list source. The loader re-checks this and silently withholds any item that fails, so a mistake fails closed.
- **Tradition-specific observances:** several occurrences may exist for one festival, year and location only if each has a distinct `traditionKey` and a public `traditionLabel`; they are never merged.
- Third-party holiday lists (for example CalendarLabs) are candidate/cross-check sources, never the basis for `verification_status = 'verified'`. A verified occurrence must cite a reliable location-specific calendar source (`festival_sources.source_type = 'calendar'`) and record its method; discovery-only sources must not be attached as proof of a date.
- The selected calendar reference location determines displayed observance dates. A user's IANA timezone only controls reminder send time.
- If an occurrence is missing, show 'Date not yet verified' and no countdown/reminder for that occurrence.
- `date` is a civil calendar date, not UTC midnight. Format as calendar date in reference location; avoid accidental day shifts.
- For lead day `d`, compute target local calendar date = occurrence.start_date − d days; schedule at 09:00 in user's IANA time zone, convert to UTC for `due_at`. Use DST-aware APIs/library and test transitions.
- If no supported occurrence exists for a followed festival, keep follow but do not schedule mail.

## 5. Authorization and security
- Public read only for published festivals and verified occurrences (plus published sections, sources, etc.); drafts are restricted.
- `profiles`, `user_regions`, `user_festivals`, and `reminder_preferences`: RLS policies using `auth.uid() = user_id` for SELECT/INSERT/UPDATE/DELETE as appropriate. Verify every join and write is scoped.
- `reminder_deliveries`: no client writes; server/service role only; optional restricted user read view if necessary.
- No service-role keys in `NEXT_PUBLIC_*` variables, client bundles, logs, or git.
- Use validated server actions/route handlers for writes; protect cron with secret authentication, avoid publicly callable mail sending.
- Auth redirect target must be a safe relative path (prevent open redirects).
- Apply rate limiting or abuse controls to auth-sensitive routes and email scheduling as supported.
- Include privacy notice, consent record via preference timestamps if feasible, and account deletion plan (delete or cascade user-owned rows, handle auth identity deletion via secure server process).

## 6. Application services and API contracts
Prefer server components for public reads and validated server actions for mutations; use route handlers only where useful.

Suggested service functions:
- `listPublishedFestivals({search,regionIds,page,pageSize})`
- `getFestivalBySlug(slug)` → published content + aliases + deities + sections + practices + sources
- `listVerifiedOccurrences({calendarLocationId,from,to,regionIds})`
- `getMyFollowedFestivals(userId)`
- `setFestivalFollow(userId,festivalId,follow:boolean)`
- `updateUserPreferences(userId,{regionIds,calendarLocationId,ianaTimezone,emailEnabled,leadDays})`
- `processDueReminders(nowUtc,limit)` — server-only; atomically claim + send + log.

Suggested route handler: `GET /api/cron/reminders`, protected by scheduler secret; never publicly expose send parameters. For auth, use Supabase's supported server/client patterns and official callbacks.

### Response/error patterns
Typed data transfer objects; explicit 400 invalid input, 401 unauthenticated, 403 forbidden, 404 unknown or unpublished, 429 rate limited if applicable, 500 internal error. Don't leak private user or provider data. UI must handle loading/empty/error states.

## 7. UI component boundaries
```text
app/
  page.tsx
  calendar/page.tsx
  explore/page.tsx
  festivals/[slug]/page.tsx
  my-festivals/page.tsx
  login/page.tsx
  signup/page.tsx
  onboarding/page.tsx
  settings/page.tsx
  api/cron/reminders/route.ts   # Phase 5
components/
  layout/       # header, mobile nav, footer
  festivals/    # cards, hero, quick facts, detail sections, follow action
  calendar/     # month grid, list, filters
  ui/           # accessible reusable primitives
lib/
  supabase/     # client/server adapters
  festivals/    # queries, types, formatters
  reminders/    # eligibility, time calculation, sender, worker
  validation/   # schemas
supabase/migrations/
content/         # typed festival content files (Phase 3); drafts allowed, only reviewed items publish
docs/research/   # date ledgers and source notes (never shipped)
types/
tests/
docs/
CLAUDE.md
```
Use this as a guide; do not create empty directories prematurely.

## 8. Operational design
- Environment variables: Supabase URL, public anon/publishable key, server-only service key (if required), email API key, verified sender, cron secret, public app URL. Provide `.env.example` with placeholders; never real credentials.
- Vercel deployment with staging/production environment separation and Supabase project separation where practical.
- Scheduler: verify cron plan supports desired frequency. A periodic scan should catch due deliveries; use a small grace window and define missed-job behavior.
- Retry bounded failures, use provider idempotency when available, and record ambiguous sends; don't promise exactly-once under provider timeouts.
- Log status and error codes without raw emails, unsubscribe tokens, or personal data.
- Backups/migrations: version-controlled SQL migrations and seed scripts; never manually mutate production schema without migration.

## 9. Testing strategy
**Unit:** date formatting and DST, lead-day calculation, reminder eligibility, input validation, search normalization.  
**Integration:** Supabase RLS cross-user isolation, published/draft access, follow uniqueness, query filters, delivery uniqueness.  
**E2E:** anonymous browsing; search alias; guest follow redirect; sign-up/login; follow/unfollow; settings persistence; opt-in/opt-out; unsubscribe; mobile navigation.  
**Scheduler tests:** controlled clock, duplicate cron invocation, retry, failed provider response, unfollow before send, disputed/unverified occurrence, multi-day start.  
**Quality gates:** lint, typecheck, automated tests, accessibility smoke, responsive viewport checks, no exposed secrets.

## 10. Architecture decisions
- ADR-001: Next.js single-app architecture instead of split frontend/backend (simpler first full-stack learning path).
- ADR-002: Curated dates instead of automatic Panchang engine (accuracy and scope).
- ADR-003: Guest-first published content with authenticated personal features (low friction).
- ADR-004: Explicit follow + opt-in mail (privacy and relevance).
- ADR-005: Typed relational content rather than large opaque festival JSON (maintainability and search).
- ADR-006: Reviewed seed files instead of admin CMS (smaller MVP).
- ADR-007 (2026-11-07): Public festival content lives in typed, version-controlled content files through Phase 3; Supabase arrives in Phase 4 for user data. Reason: ten festivals, one editor, review by pull request, compile-time checks, no RLS risk for drafts. Trade-off: a content change needs a redeploy and there is no editing UI. Migration path: files already follow the section 3 relational shape; a seed script loads them into tables when a database-backed read path is needed. Supersedes ADR-005's implication that content is stored in tables from the start.
- ADR-008 (2026-11-07): Publication is fail-closed. Content carries a review state (`draft`, `in_review`, `reviewed`); only `reviewed` items that also pass validation reach public pages. Reviewer identity is internal and never passed to public types.

Revisit decisions only with a documented reason and updated PRD/implementation plan.

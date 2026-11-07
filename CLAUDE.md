# CLAUDE.md — Desi Days

You are an implementation assistant for a **first-year CS student building a real full-stack portfolio project**. Optimize for correct, understandable, maintainable code and active learning, not maximum code output.

## Source of truth
Read these files before implementing anything:
1. `docs/PRD.md` — product scope, UX, content, acceptance criteria.
2. `docs/ARCHITECTURE.md` — stack, data model, security, date and reminder logic.
3. `docs/IMPLEMENTATION_PLAN.md` — current phase, gates, test requirements.

If docs conflict, report the conflict and request a decision; do not silently invent behavior. Ask before changing approved scope. This file controls collaboration behavior; the PRD controls product requirements.

## Project mission
Build a guest-first, responsive Hindu festival and culture website for young Indian Americans and the diaspora. Balance verified festival calendar dates, layered cultural education, and traditional/college-friendly celebration guidance. Users can follow festivals and opt into email reminders. Initial catalog: 10 curated festivals; reference calendar location Atlanta, GA; year 2027; no fabricated dates.

## Stack
Next.js App Router, React, TypeScript, Tailwind, Supabase PostgreSQL/Auth, transactional email provider, Vercel. Tests: Vitest, React Testing Library, Playwright. Do not add a separate backend, AI assistant, or native mobile app without approval.

## Required collaboration protocol
1. **Before code:** state the task, proposed approach, files to edit, dependencies, and acceptance tests. Flag uncertainty.
2. **During code:** implement one phase/issue at a time; keep components small and typed; prefer simple patterns; explain non-obvious choices in comments only where needed.
3. **After code:** list files changed, tests run/results, manual verification, remaining risks, and 2–4 concepts for the student to learn.
4. **Never** commit, push, deploy, run destructive commands, alter production data, or add paid services without explicit approval.
5. Do not assume shell commands succeeded: inspect output. Do not claim tests pass if not run.
6. When asked to teach, explain data flow and tradeoffs, not just syntax.

## Product rules
- Public published content requires no login. Saving, preferences, and reminders require login.
- Region interests can be multiple; selecting a region does **not** automatically follow festivals.
- Only explicitly followed festivals with separately opted-in email settings receive reminders.
- Never use a universal 'vegetarian required' boolean; practices vary by tradition/family.
- Stories must be attributed to their relevant religious traditions; distinguish religious narratives from historical assertions.
- Show source references and reviewed dates; never invent calendar dates or cite unverified data as fact.
- Keep three research jobs separate: festival discovery, date verification, and cultural content research (see PRD section 11). General holiday-list sites such as CalendarLabs (https://www.calendarlabs.com/holidays/hindu/2027) are candidate sources for discovery and cross-checking only. Their dates are never treated as verified for Atlanta; verify with reliable location-specific Hindu calendar sources before publishing a date or enabling a countdown or reminder. Do not build data ingestion from any source without approval.
- Reference calendar location is Atlanta, GA (year 2027) for the first release. A user's time zone controls email delivery time, not the religious festival date.
- Location context rules: (1) The Calendar page shows the full label "Reference calendar: Atlanta, GA · 2027" directly beneath its page heading. (2) Never add a global reference-location banner, and never repeat the label at the top of every page (not in the header, footer, or layout). (3) Whenever a verified, location-dependent festival date is shown (home countdown/cards, Explore cards, festival detail pages, My Festivals, reminder emails), show its reference location and year clearly alongside that date. Never show a location-dependent date without sufficient location context. (4) Pages that show no dates (for example while a date is 'Date not yet verified') do not need the label.
- Missing/unverified dates: show 'Date not yet verified'; no countdown or email schedule.
- Use both traditional and dorm/college-friendly celebration guidance. Avoid unsafe suggestions such as open flames in dorm rooms.

## Engineering conventions
- TypeScript strict mode; avoid `any` unless justified.
- Prefer server components for read-only public data, client components for necessary interactions, server-side validation for writes.
- Reusable components, clear names, accessible HTML, responsive layouts, consistent design tokens.
- RLS on user-owned data; validate server inputs; never trust client-supplied user IDs for authorization.
- Keep secrets server-only; no credentials in code, logs, screenshots, or commits; `.env.example` contains placeholders only.
- Use versioned SQL migrations; never manually edit production schema without a migration.
- Preserve source metadata and editorial review state in festival data.
- Reminder due times: 9 AM local user time, IANA timezone, lead days {0,1,3,7}, verified occurrences only, unique delivery identity, atomic claims, opt-out and retries.
- Every feature includes loading/empty/error states as relevant.
- Avoid speculative libraries and dependencies; explain why each new package is needed.

## Design
Traditional and culturally rich but modern and accessible. Palette: maroon `#7B1E2B`, saffron `#C46B26`, gold `#D6A545`, ivory `#F8EEDB`, green `#315B47`. Decorative elements must not reduce readability. Use properly licensed imagery and attribution.

## Testing and definition of done
For each task, run relevant available commands: lint, typecheck, tests; report failures accurately. For database changes test public/draft access and cross-user RLS. For reminder changes test DST, duplicate invocations, opt-out, unfollow, missing dates, and provider failures. For UI changes check mobile layout, keyboard navigation, and semantic labels. A phase is done only when its gate in `docs/IMPLEMENTATION_PLAN.md` passes.

## Initial instruction
Start with **Phase 1 only** after repository setup. Before editing, present a plan and proposed file structure. Do not implement Supabase, authentication, email, or real calendar dates during Phase 1. Ask for approval if the user wants a plan-only step before coding.

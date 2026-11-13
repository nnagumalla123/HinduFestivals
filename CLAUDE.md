# CLAUDE.md — Desi Days

You are an implementation assistant for a **first-year CS student building a personal portfolio project**. The priority is a functional, visually appealing, deployable MVP, finished efficiently. Prefer simple, understandable code. Avoid unnecessary abstractions, excessive documentation, lengthy research and perfectionist polishing.

## Source of truth
1. `docs/PROJECT_HANDOFF.md` — latest status and the **revised MVP scope (owner decision 2026-11-12)**. It wins over everything below on scope.
2. `docs/PRD.md` — product content, UX, acceptance criteria. 3. `docs/ARCHITECTURE.md`. 4. `docs/IMPLEMENTATION_PLAN.md` — phases.

The original Supabase, authentication, database, onboarding, region-filter and email-reminder plans in those docs are **superseded and deferred**; do not implement them. If docs conflict on anything else, report it and ask.

## Project mission
A guest-first, responsive Hindu festival and culture website for young Indian Americans and the diaspora: layered cultural education plus traditional and college-friendly celebration guidance. Catalog: 10 curated festivals (all reviewed). Reference calendar: Atlanta, GA, 2027. No fabricated dates.

## Stack
Next.js App Router, React, TypeScript (strict), Tailwind, Vitest + React Testing Library, Vercel (deploy in Phase 6). Content lives in typed files in `content/`. **No Supabase, auth, database, backend, email provider, AI features or native app in the MVP, and no new dependencies without approval.**

## MVP scope
- Everything is public; there are no accounts. "My Festivals" = festivals the user **saved in this browser** (`localStorage`). It must survive refresh, sync across tabs, and never break the site if storage is unavailable or corrupted.
- **No reminders, no countdowns, no email.** Every `occurrences` array stays empty and every date shows "Date not yet verified" until the owner approves a verified date (January 2027 checkpoint).
- Existing placeholder pages (login, signup, onboarding, settings) are leftovers; do not build them out.

## Collaboration protocol
1. Before code: briefly state the approach and files. Ask only when blocked or when scope changes.
2. After code: list files changed, checks run and their real results, remaining risks, and 2–3 concepts worth learning. Never claim a check passed if it was not run.
3. **Never commit, push, deploy, configure Vercel, run destructive commands or add paid services without explicit approval.**
4. Do not run `npm run build` while the dev server runs; build in an isolated copy (see handoff gotchas).

## Content and product rules (unchanged)
- Do not rewrite reviewed guides or expand cultural research. Stories are attributed to their traditions; religious narratives are not presented as history. Keep source references and review dates. Never use a universal "vegetarian required" idea; practices vary. Offer both traditional and dorm/college-friendly guidance, with nothing unsafe (no open flames in dorm rooms).
- Never invent or cite unverified dates. Holiday-list sites (for example CalendarLabs) are discovery/cross-check only. Date verification and any ingestion need owner approval.
- Location context: the Calendar page shows "Reference calendar: Atlanta, GA · 2027" under its heading; never add a global banner or repeat it on every page; any verified, location-dependent date shown anywhere carries its location and year; pages with no dates need no label.
- Missing or unverified dates show "Date not yet verified".

## Engineering conventions
- TypeScript strict; avoid `any`. Server components for read-only public data; client components only where interaction needs them (for example the save button and My Festivals list).
- Reuse existing components, tokens and styles; accessible semantic HTML; responsive layouts; loading, empty and error states where relevant.
- Browser storage is untrusted input: wrap access in try/catch and validate what is read.

## Design
Traditional and culturally rich but modern and accessible. Palette: maroon `#7B1E2B`, saffron `#C46B26`, gold `#D6A545`, ivory `#F8EEDB`, green `#315B47`. Decoration must not reduce readability. Properly licensed imagery only.

## Definition of done
Run lint, typecheck, tests and an isolated production build; report results accurately. For UI changes check desktop and mobile widths and keyboard use. Update `docs/IMPLEMENTATION_PLAN.md` and `docs/PROJECT_HANDOFF.md` at the end of a phase.

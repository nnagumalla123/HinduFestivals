# Desi Days

A guest-first Hindu festival guide for young Indian Americans and the wider diaspora. It explains what ten major festivals mean, how different traditions observe them, and how to celebrate away from home, including in a dorm. Everything is public: there are no accounts.

**Live site:** _coming soon (URL to be added after the first deployment)_

## MVP features
- **Ten reviewed festival guides:** Diwali, Ugadi, Holi, Ganesh Chaturthi, Navaratri, Vijayadashami, Krishna Janmashtami, Maha Shivaratri, Makara Sankranti and Rama Navami. Each has quick facts, attributed stories, traditions, regional differences, food and fasting notes, traditional and college-friendly celebration ideas, and cited sources with review dates.
- **Explore:** search by festival name, other names or deity.
- **Calendar:** month and list views for a reference location (Atlanta, GA, 2027).
- **My Festivals:** save festivals in your browser and revisit them (see below).
- Responsive layout, keyboard-friendly controls and accessible markup.

## Tech stack
Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, Vitest and React Testing Library. Festival content lives in typed files under `content/`; there is no backend or database.

## Run locally
Requires Node.js 24 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run the tests once |
| `npm run build` | Production build |

## How saved festivals work
Saving uses the browser's `localStorage` (key `desi-days:saved-festivals`, a JSON list of festival slugs). Nothing is sent to a server. Saves persist across refreshes and browser restarts, and stay in sync across tabs and pages through the `storage` event. Invalid or corrupted stored data is ignored, and if storage is blocked the site still works, but saves last only for that page visit.

## Current limitations
- **No 2027 festival date is verified yet.** Every festival shows "Date not yet verified", and there are no countdowns. Dates will be added only after checking authoritative Atlanta-area calendars.
- Saved festivals are **local to one browser on one device**. They do not follow you to another browser or device, and clearing site data removes them.
- No accounts, email reminders or regional personalization in this version.
- Content is reviewed editorially but is a learning resource, not religious or dietary advice.

## Project docs
Scope, history and decisions are in `docs/` (`PROJECT_HANDOFF.md`, `PRD.md`, `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`).

# Desi Days
_(Repository name: HinduFestivals)_

A personalized Hindu festival calendar and cultural guide helping the Indian diaspora discover, understand, and celebrate their traditions.


## Status
Phase 1 (foundation) in progress. See `docs/IMPLEMENTATION_PLAN.md`.

## Tech versions
- Node.js v24.19.0, npm 12.1.0
- Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4
- Tests: Vitest + React Testing Library

## Local setup
```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check without emitting files |
| `npm test` | Run tests once |
| `npm run test:watch` | Re-run tests on file changes |

Environment variables: copy `.env.example` to `.env.local` (not needed yet).

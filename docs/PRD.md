# Desi Days — Product Requirements Document

**Status:** Approved for implementation planning  
**Version:** 1.0  
**Date:** 2026-11-07  
**Owner:** Project creator  
**Product name:** Desi Days (renamed from the working name "Hindu Festival Companion"). Wordmark in the header: "Desi Days". The repository, folder, and npm package keep their original names.

## 1. Vision
**Tagline:** Your traditions, wherever life takes you.

A responsive, guest-first cultural companion for young Indian Americans and the wider diaspora. Help users (1) know when Hindu festivals occur, (2) understand their meaning and associated stories, (3) learn customary food, fasting, and celebration practices, and (4) find feasible ways to celebrate independently, especially in college.

### Target users
- Primary: young diaspora members, roughly 18–28, living away from family.
- Secondary: anyone seeking approachable, sourced information about Hindu festivals.
- No assumption that users follow a specific regional, family, or religious practice.

### Product principles
1. Guest access to all published educational content.
2. Balanced calendar, learning, and actionable celebration guidance.
3. Layered education: short answer first; optional deep stories.
4. Regional variation and religious nuance; never present a custom as universally mandatory.
5. Respectful, source-backed editorial content, not unreviewed AI-generated religious advice.
6. Mobile-first, accessible, traditional Indian-inspired aesthetic.
7. Only explicitly followed festivals trigger opt-in reminders.

## 2. Release scope
### MVP (P0)
- Public responsive home, festival library, calendar, festival detail pages.
- Curated catalog of 10 festivals; sourced summaries, narratives, deity associations where relevant, rituals, foods, fasting and vegetarian practices, regional differences, traditional and college-friendly celebration guidance.
- 2027 **verified** occurrence data for a documented US reference calendar location (initially Atlanta, GA). Date coverage must be clearly labeled. No algorithmic Panchang computation or automatic worldwide date claims. Where legitimate traditions observe a festival on different dates, each is a separately sourced, clearly labeled observance; conflicting dates are never collapsed into one supposedly universal date.
- Search by festival name, aliases, and associated deity names; month/list calendar, month navigation, upcoming events. (Region filters on Explore and Calendar arrive in Phase 4 with regional preferences and onboarding.)
- Supabase email/password authentication with email verification; optional onboarding; multi-region preferences; follow/unfollow; My Festivals; settings.
- Opt-in email reminders for followed festivals at 7, 3, 1, and/or 0 days before occurrence start, at 9:00 AM user's IANA time zone; opt-out/unsubscribe.
- Server-side authorization, RLS, logging, automated tests, Vercel deployment, README.

### Out of scope (P1/P2)
- Native mobile app, push notifications, Google Calendar sync, user-authored family notes, checklists with persistence, translations, AI assistant, temple events, admin CMS, automated Panchang calculations, worldwide location-aware festival dates, user-generated festival articles.

### Initial catalog
Diwali/Deepavali; Ugadi; Holi; Ganesh Chaturthi; Navaratri; Vijayadashami/Dussehra; Krishna Janmashtami; Maha Shivaratri; Makara Sankranti; Rama Navami. Navaratri and Vijayadashami are separate but related guides; region-specific Sankranti/Pongal customs should not be conflated.

## 3. Navigation and screens
| Route | Access | Requirements |
|---|---|---|
| `/` | Public | Next verified upcoming festival; countdown; upcoming 3–5 cards; discovery/search; reference location and year shown alongside the next festival's date and countdown (no global banner; see section 7); no invented dates. |
| `/calendar` | Public | Full label "Reference calendar: Atlanta, GA · 2027" directly beneath the page heading; month/list toggle; previous/next month; select day; date and region filters; festival click-through; preserve view state in URL where practical. |
| `/explore` | Public | Search by name/alias/deity; festival cards (reference location and year shown alongside any date a card displays); regional filters; empty/loading/error states. |
| `/festivals/[slug]` | Public | Hero, aliases, dates each shown with their reference location and year, quick facts, layered story sections, deities, practices, food/fasting, celebration styles, regional differences, sources, follow/reminder actions. |
| `/my-festivals` | Signed-in | Followed festivals, upcoming verified occurrences, reminder state; guest sign-in invitation. |
| `/login`, `/signup` | Public | Email/password; verification and error states; redirect back to original action. |
| `/onboarding` | Signed-in | Optional multi-region selection, calendar reference location, IANA time zone, explicit festival follows, email opt-in. |
| `/settings` | Signed-in | Update regions, time zone, follows, reminder lead days, email opt-in; sign out and account deletion pathway. |

### Responsive navigation
Desktop header: Home, Calendar, Explore, My Festivals, account menu. Mobile: bottom nav for four primary destinations, profile via top account icon. Semantic headings, focus indicators, keyboard support, alt text, WCAG AA contrast targets.

## 4. Detailed festival page contract
Order:
1. Hero: image, title, aliases, subtitle, date(s) shown together with their reference location and year, countdown if verified, follow and reminder actions.
2. Quick facts: meaning, observance length, associated deities (when relevant), common customs, dietary practices (qualified).
3. Why celebrate? 80–150 word beginner summary.
4. Stories & mythology: expandable, attributed to texts/traditions; distinguish belief/narrative from verifiable historical claims.
5. Deities: names, roles, traditions, where applicable.
6. Traditions: practices with descriptions, optionality, region/tradition labels.
7. Food & fasting: dishes, vegetarian practices, fasting details and exceptions; no universal yes/no 'must be vegetarian' label; no medical fasting directives.
8. How to celebrate: traditional and college-friendly guidance; practical dorm-safe options (e.g., battery-powered lamps).
9. Regional variations: multiple community practices, not inferred solely from language.
10. Sources, date methodology, review timestamp.

If content is unverified or absent, omit the section or show 'not yet available'; never hallucinate. All sourced assertions have traceable citations in data. No source-less definitive claims about dates.

## 5. User journeys
### J1 Guest learning
Visit home → Explore → search 'Ugadi' → open detail → read story and Ugadi pachadi guidance → select college-friendly suggestions → follow prompts login, preserving return URL. **Pass:** reading never requires login.

### J2 Account personalization
Sign up and verify email → choose multiple regional interests → select supported calendar reference location and time zone → explicitly follow festivals → choose reminder lead days and opt in. **Pass:** preferences persist after new session.

### J3 Festival reminder
Follow verified festival → opt in → scheduler identifies due delivery based on 9 AM user local time and lead day → sends email linking to festival → user can unsubscribe. **Pass:** no mail for unfollowed, unverified, or opted-out festivals; duplicate prevention under retries.

### J4 Regional discovery
Select Telugu and Tamil interests → browse all festivals, with relevant regional sections highlighted but other content accessible. **Pass:** region selection never auto-follows festivals.

## 6. Functional requirements and acceptance criteria
| ID | Priority | Requirement | Acceptance |
|---|---|---|---|
| FR-01 | P0 | Guest-readable published pages | Anonymous user can view home, explore, calendar, and details. |
| FR-02 | P0 | Search names, aliases, deity names | Relevant festivals returned, case-insensitive; empty state. |
| FR-03 | P0 | Verified occurrence calendar | Only verified dates labeled confirmed; reference location and year shown alongside every location-dependent date (section 7); full reference label beneath the Calendar heading; month/list and navigation. |
| FR-04 | P0 | Festival editorial content | Every published guide has overview, celebration guidance, and references; nuanced customs. |
| FR-05 | P0 | Layered reading | Short summary and expandable deeper content; keyboard accessible. |
| FR-06 | P0 | Auth | Sign-up, verification, login, logout, protected routes and safe redirects. |
| FR-07 | P0 | Following | Authenticated user follows/unfollows; no duplicates; state persists. |
| FR-08 | P0 | Regions | Multi-select interests; no automatic follow. |
| FR-09 | P0 | Preferences | IANA timezone, calendar reference location, email opt-in and lead days persist. |
| FR-10 | P0 | Reminders | Only opted-in users + followed festivals + verified occurrences; 9 AM local; 0/1/3/7 days. |
| FR-11 | P0 | Unsubscribe | Signed unsubscribe link or authenticated toggle disables future reminders. |
| FR-12 | P0 | Reminder safety | Claim/idempotency protection, delivery state and retry policy; no secrets in client. |
| FR-13 | P0 | Privacy and security | RLS on all user data; unauthorized cross-user access denied; server secrets protected. |
| FR-14 | P0 | Mobile and accessibility | Mobile/desktop core journeys, keyboard controls, alt text, labeled inputs, contrast checks. |
| FR-15 | P0 | Content coverage | Ten reviewed guides; 2027 Atlanta-reference occurrences verified before showing dates. |
| FR-16 | P0 | Production readiness | Lint, typecheck, tests, deploy, documented setup, no placeholder claims in production. |

## 7. Date and cultural accuracy policy
- Hindu observance dates can depend on tithi, sunrise/moonrise, geographic location, and calendar traditions. A single Gregorian date is not globally universal.
- Initial reference calendar location: **Atlanta, Georgia, USA**. Store its coordinates, IANA time zone and editorial method; do not imply that an Atlanta date is accurate for all users.
- **Location context rules (display):**
  - The Calendar page shows the full label "Reference calendar: Atlanta, GA · 2027" directly beneath its page heading.
  - No global reference-location banner. Do not repeat the label at the top of every page, or in the header, footer, or shared layout.
  - Whenever a verified, location-dependent date is shown (home next-festival date and countdown, Explore cards that show dates, festival detail pages, My Festivals, reminder emails), the relevant reference location and year must appear clearly alongside that date, visible without hovering or clicking.
  - Never show a location-dependent festival date without sufficient location context.
  - Pages or components that show no dates (for example 'Date not yet verified') do not need the label.
- For 2027, date records must be researched and verified with a reliable Panchang/calendar source and documented source URL before publication. **No dates are supplied in this PRD**; placeholders are never published as verified.
- If a date is unavailable or disputed, show 'Date not yet verified' and disable scheduling for that occurrence.
- Multi-day observances have start/end dates; for MVP, reminders attach to the first day of the explicitly followed festival occurrence. Do not automatically send for every sub-observance.
- User time zone controls email send time, **not** which calendar location's religious date is used.
- Cite primary religious texts, reputable cultural/temple sources, and authoritative calendar sources appropriately; attribute interpretations by tradition. Distinguish mythology, belief, and historical claims.

## 8. Reminder rules
- Explicit festival follow + separate email opt-in required; defaults OFF.
- Lead days supported: any subset of {0,1,3,7}. Send at 09:00 local user time on target date (occurrence start minus lead days).
- Use IANA timezone and a DST-aware library. Avoid assuming a fixed UTC offset.
- Unique delivery key per user, occurrence, lead-day, and channel; atomic claiming; retry with bounded backoff; audit states pending/processing/sent/failed/cancelled.
- Before send, re-check follow status, consent, occurrence verification, and user email validity.
- Signed unsubscribe link; never reveal user IDs or tokens in analytics/logs.
- Delivery is best-effort; email provider may not guarantee exactly-once delivery after ambiguous network failures. Document retry tradeoffs.

## 9. Visual design
Palette: maroon `#7B1E2B`, saffron `#C46B26`, gold `#D6A545`, ivory `#F8EEDB`, green `#315B47`. Traditional ornamentation (rangoli, lotus, diya motifs) should remain subtle and not impair usability. Use licensed assets with attribution as needed. Mobile-first responsive typography, readable spacing, accessible contrast, and reduced-motion support.

## 10. Quality, privacy, and operations
- Never store plaintext passwords; use managed auth. Minimal PII: email, user ID, preferences, timezone. Public content read-only to guests.
- Apply RLS, input validation, parameterized queries, secure cookies, and server-only secrets.
- No public content editing APIs in MVP. Public festival content (guides, sources, occurrences) lives in version-controlled, typed content files in the repository (Phase 3 decision, 2026-11-07); editorial updates are reviewed code changes. Supabase holds user accounts, follows and preferences from Phase 4. Only explicitly reviewed content is published; reviewer details are recorded internally and only the review date is shown publicly.
- Provide privacy notice, email consent, unsubscribe, and a documented account deletion flow before public launch.
- Handle loading, empty, missing date, offline/network failure, 404, and unauthorized states.
- Tests: unit (date/reminder logic), integration (RLS and data queries), E2E (guest, signup, follow, settings, unsubscribe), responsive/accessibility smoke tests.
- Success: all P0 acceptance tests pass, 10 reviewed guides available, no false date claims, production deployment and clear GitHub README.

## 11. Dependencies and open editorial tasks
- Verify actual 2027 Atlanta-reference festival dates and source methodology; no assumption that every festival has one uncontested date.
- **Research source roles (keep these three jobs separate):**
  - **Festival discovery** (which festivals and observances exist, their names and aliases, ideas for expanding the catalog): candidate source *CalendarLabs, 2027 Hindu holidays*, https://www.calendarlabs.com/holidays/hindu/2027. The launch catalog stays the ten festivals in section 2; the catalog may expand after launch.
  - **Date verification** (the dates users see, count down to, or receive reminders for): requires reliable, location-specific Hindu calendar/Panchang sources for the reference location (Atlanta, GA), with the source URL and method recorded. CalendarLabs dates are **not** verified for Atlanta: it is unknown what location or method they assume until confirmed. They may be used only as a cross-check, and any disagreement means the occurrence stays draft or disputed ('Date not yet verified').
  - **Cultural content research** (stories, rituals, food, fasting, regional customs): primary texts and reputable cultural, temple, or academic sources, attributed by tradition. A holiday-list website is not a source for cultural or religious claims.
  - **Source roles are enforced, not just documented.** A holiday-list site such as CalendarLabs may be recorded as a discovery or cross-check source. It can never, on its own or as the independent check, qualify a date as verified, and it can never support a cultural or religious claim.
  - **Independence:** verifying a date needs a reliable Atlanta-specific calendar source with a documented calculation or observance method, plus an independent cross-check. Two sites built on the same underlying calendar data do not count as independent confirmation. Disagreements are investigated before a status is set.
  - **Reviewer privacy:** reviewer identity is recorded internally; the public page shows the review date only.
  - Before any use, check each source's terms of use and copyright; summarize in our own words, do not copy its text or tables. No automated data ingestion from any source without explicit approval.
- Research and review 10 festival guides with culturally knowledgeable reviewers where possible.
- Select a licensed image set and attribution format.
- Confirm email provider, sender domain, quotas, and scheduler cadence before Phase 5.
- Product name/domain remain working choices, not blockers.

## 12. Release criteria
Do not mark MVP complete until every P0 FR has passed, all published dates and religious content are reviewed, unsubscribe and privacy controls work, user data is isolated, reminders are tested with controlled time and test addresses, and the deployed site is usable on mobile and desktop.

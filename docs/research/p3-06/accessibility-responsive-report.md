# Accessibility, responsive and keyboard validation (P3-06)

Audit date 2026-11-12, against an isolated production build served on port 3100 and the built-in browser (no new dependencies). Viewports: **1280 px (desktop), 640 px (about 200% zoom of 1280 px), 375 px (mobile)**, for all ten festival pages, plus Explore, Calendar and home at 1280 and 375 px. Scripted checks ran inside same-origin frames at each width (30 page-width combinations); keyboard checks used real Tab and key presses.

## Results (30 combinations: 10 festival pages x 3 widths)

| Check | Result |
|---|---|
| Horizontal overflow | **0** of 30 |
| Elements beyond the viewport edge | Only the decorative header motif (SVG circles), clipped by an `overflow: hidden` container; no text or control |
| Page language, title, one `<h1>`, one `<main>` | Pass on all 30 |
| Heading order (no skipped levels) | Pass (0 skips) |
| Landmarks: every `<nav>` has an accessible name ("On this page", main navigation) | Pass |
| Duplicate IDs; links, buttons and summaries without an accessible name | 0 and 0 |
| Images without alt text | 0 (the site uses no content images; the header motif is `aria-hidden`) |
| Positive `tabindex` | 0 |
| Interactive target size (WCAG 2.5.8, 24 x 24 px), excluding inline text links and the visually hidden skip link | **0 violations**; inline citation links "[1]" measure 24 x 24 px (min-h-6, min-w-6) on every page; nearly all (44 to 56 per page) are visible, and the few inside closed disclosures are reachable once opened |
| In-page citation anchors and "On this page" links resolve | Pass (0 broken) |
| Outbound links | All carry `rel` with `noopener noreferrer`; open in a new tab with a visible "(opens in a new tab)" cue |
| Base font size | 17 px at every width |
| Contrast | The design-token contrast test (`tests/design-tokens-contrast.test.ts`) passes in the full suite |

## Keyboard

- **Order (checked on Holi, 40+ stops):** Skip to main content, brand, Home, Calendar, Explore, My Festivals, Sign in, "All festivals", Follow, then the nine "On this page" links, then source citations in reading order; the first collapsed story disclosure ("The burning of Holika") is reached by Tab.
- **Focus visibility:** a 3 px maroon outline on citation, navigation and link focus (computed style `solid 3px rgb(123, 30, 43)`).
- **Disclosures (F-17, verified 2026-11-12):** each collapsed story section is a native `<details>`/`<summary>` in the tab order. With real key presses on the Holi page, Tab reached "The burning of Holika" (3 px outline), **Enter opened it, Space toggled it closed**, and focus stayed on the summary.
- **Skip link** present on all ten pages.

## Mobile and desktop visual checks (screenshots reviewed)

- Ten festival pages, Explore (ten cards, approved subtitles and aliases), Calendar (label under the heading, no dates), home ("Next festival: No verified dates yet"): no clipped or overlapping text; one-column quick facts on mobile; the bottom navigation does not hide the end of the page (checked earlier for the pilots and again for the Batch A and B pages).
- Citation links in a section's "Sources:" line wrap cleanly at 375 px.

## Readability (see `readability.md`)

Reading ease 43 to 63, grade 8.3 to 11.9 on whole-guide text. The pilots sit near grade 8 to 9; Ganesh Chaturthi (overview grade 13.5) and Vijayadashami (whole guide 11.9, one 71-word sentence) are the densest: **F-15 (S3)**.

## Findings

- **F-13 (S3):** long page titles with a tagline; no per-page descriptions.
- **F-15 (S3):** readability of two Batch B guides.
- **F-17 (S3): verified, closed.**
No S1 or S2 accessibility finding. The matrix was re-run on 2026-11-12 after the content fixes: 0 overflow, 0 heading skips, 0 unnamed controls, 0 broken anchors, 497 of 497 citation links laid out and at least 24 x 24 px.

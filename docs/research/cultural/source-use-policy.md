# Source use: research, paraphrase, linking and reproduction

How Desi Days uses third-party sources. This is a working editorial policy, not legal advice. **A missing terms page is never treated as permission.**

| Activity | What we do | What we do not do |
|---|---|---|
| **Factual research** | Read pages in a browser or by ordinary fetch, one at a time; record URL, title, publisher, access date and which claims each source supports. Facts and ideas (who did what, what a custom is called, what a tradition says) are not owned by a publisher. | No scraping, bulk download, automated ingestion, or use of any publisher's text for AI training or analysis. Search-engine snippets are never counted as reading a source. |
| **Original paraphrasing** | Every guide passage is written in our own words, with our own structure and voice, and attributed to the tradition or region it describes. | No copied sentences, tables, lists or distinctive phrasing. No quotations are used in the guides so far. |
| **Linking and citation** | The Sources section cites each source by title, publisher and link, with the access date. Links point readers to the original. | We do not link to a source whose terms require permission to link (see the BiblioAsia note below). Links never frame or embed another site's content. |
| **Reproduction of protected content** | None: no text, images, diagrams, data files or audio from any source are reproduced. | No hotlinked or copied images; no copied recipes or translations. Primary-text translations (Valmiki, Bhagavata Purana, Devi Mahatmya) are summarised, not quoted. |

## Where each source stands (2026-11-07)

`termsChecked: true` in the content files means **the terms or copyright page was actually read**, not that permission was granted. Each source's `termsNote` records what it said. The full list of sources with their terms status is generated into [p3-03-verification-list.md](p3-03-verification-list.md).

- **Read:**
  - Britannica: personal and nonprofit-educational copying is allowed; any other reproduction, including AI training or analysis, needs permission; there is no licence to republish. We paraphrase and link only.
  - Karnataka Tourism: content is the department's property, unauthorized reproduction is prohibited, and external links are permitted.
  - SikhNet: a copyright and fair-use page with a DMCA procedure; it states no limit on summarising or linking and grants no licence to reproduce.
  - Encyclopaedia Britannica, 11th edition (1911): public domain.
- **Read and restrictive: BiblioAsia (National Library Board, Singapore).** Its terms list reproduction, adaptation and *hyperlinking* among actions needing prior written permission. **Resolved by removal:** the Navaratri guide no longer cites or links BiblioAsia, and every claim that rested on it was either re-sourced (Britannica, the Hinduism Today digest) or removed. No link to BiblioAsia remains anywhere in the content, so there is no unresolved linking restriction unless it is reintroduced.
- **No terms page found (not treated as permission):** Princeton, Hindu American Foundation (a privacy policy and an images guide only), Hinduism Today and the HPI digest, vedabase.io (Bhaktivedanta Book Trust; privacy policy only), the Pluralism Project (only a Harvard copyright-reporting link), Telangana Today, The Hans India, Deccan Chronicle, the two US temple pages, the South African Hindu Maha Sabha, the Colorado State faculty page (Malaiya), and the housing policies. Several show a copyright notice, which we respect by paraphrasing only.
- **Not checked:** Brandeis, valmikiramayan.net (the translation is copyrighted by its translator), Wisdomlib.

## What the owner still decides

1. Whether to request permission (for example through Britannica's syndication form) for certainty, or rely on paraphrase and links.
2. Whether any source with no terms page found should be replaced or kept.
3. Before publication, `termsChecked` must be true on every cited source, which the validator enforces. Today that is true only for the Britannica pages, Karnataka Tourism, SikhNet and the 1911 Britannica entry.

## How the validator models this (P3-04A refinement)

Each source records four separate answers (`lib/festivals/content/schema.ts`):

| Field | Question | Blocks publication? |
|---|---|---|
| `termsChecked` | Was the terms or copyright page actually read? | **No.** An unread or missing terms page is recorded for the audit trail but does not block an original factual paraphrase, and is never read as permission. |
| `reproducesProtectedContent` | Do we copy protected text, images or data? | **Yes**, unless `permissionStatus` is `granted`. |
| `permissionRequired` | Does our intended use (paraphrase plus a link) need permission? `no`, `yes` or `unresolved`. | `yes` blocks until `granted`; `unresolved` always blocks. |
| `permissionStatus` | `not_needed`, `not_requested`, `requested`, `granted` or `denied`. | Must agree with `permissionRequired` (a structural check for every status). |

A cited source must also carry a `termsNote` (the audit note) and list the claims it supports. Restricted material is handled conservatively: for example, a source whose terms require permission even to link would be marked `permissionRequired: "yes"` and stay blocked until permission is `granted` (this is how BiblioAsia would be recorded if it were reintroduced). Today every source is `permissionRequired: "no"` with nothing reproduced.

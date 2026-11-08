import fs from "node:fs";
const ROOT = "/Users/nidhinagumalla/Code/HinduFestivals/";
const OUT = ROOT + "docs/research/cultural/";
const { makaraSankranti } = await import(ROOT + "content/festivals/makara-sankranti.ts");
const { mahaShivaratri } = await import(ROOT + "content/festivals/maha-shivaratri.ts");
const { holi } = await import(ROOT + "content/festivals/holi.ts");
const { ramaNavami } = await import(ROOT + "content/festivals/rama-navami.ts");
const records = [makaraSankranti, mahaShivaratri, holi, ramaNavami];

const GROUPS = [
  ["Why celebrate?", ["overview", "significance"]],
  ["Stories & mythology", ["story"]],
  ["Traditions", ["rituals"]],
  ["Food & fasting", ["food", "fasting"]],
  ["How to celebrate", ["traditional_guide", "college_guide"]],
  ["Regional variations", ["regional_variation"]],
];
const ids = (a) => (a ?? []).join(", ");
const bt = (a) => (a ?? []).map((x) => "`" + x + "`").join(", ");

// ------------------------------------------------------------------ readable drafts
let drafts = `# Batch A guides for editorial review (P3-05)

**STATUS: REVIEWED 2026-11-08 (editorial revision 3, owner-approved).** The guides, basics, quick facts and deity entries are marked \`reviewed\` in the content files and publish on the site through the loader; the \"Research notes\" below remain internal and are never published. **No 2027 date is verified.** Readable export of the four content files in \`content/festivals/\` (generated from them; edit the \`.ts\` files, not this file): Makara Sankranti, Maha Shivaratri, Holi and Rama Navami. Bracketed source IDs show which sources back each passage; "Research notes" are internal and never published. No dates appear in any guide, and every occurrence is empty. Basics (subtitle, aliases, deity search terms) were approved with the guides.

---
`;
const notes = [];
for (const r of records) {
  drafts += `\n# ${r.name}\n\n## Basics (reviewed)\n\n- **Subtitle:** ${r.subtitle}\n- **Aliases:** ${r.aliases.join(", ")}\n- **Deity search terms:** ${r.deities.join(", ")}\n\n## Quick facts (reviewed)\n\n`;
  for (const q of r.quickFacts ?? []) {
    drafts += `- **${q.label}:** ${q.text}${q.tradition ? ` _(${q.tradition})_` : ""}  \n  Sources: ${ids(q.sourceIds)}\n`;
    (q.reviewNotes ?? []).forEach((n) => notes.push([r.name, `quick fact "${q.label}"`, n]));
  }
  drafts += `\n## Deities (reviewed)\n\n`;
  for (const d of r.deityEntries ?? []) {
    drafts += `- **${d.name}** (${d.tradition}): ${d.role}  \n  Sources: ${ids(d.sourceIds)}\n`;
    (d.reviewNotes ?? []).forEach((n) => notes.push([r.name, `deity ${d.name}`, n]));
  }
  for (const [gname, kinds] of GROUPS) {
    const secs = r.sections.filter((s) => kinds.includes(s.kind));
    if (!secs.length) continue;
    drafts += `\n## ${gname}\n`;
    for (const s of secs) {
      drafts += `\n### ${s.title}\n\n`;
      if (s.tradition) drafts += `_Tradition: ${s.tradition}_\n\n`;
      drafts += s.body + "\n\n**Sources:** " + bt(s.sourceIds) + "\n\n";
      if (s.reviewNotes?.length) {
        drafts += "**Research notes (internal, not published):**\n" + s.reviewNotes.map((n) => `- ${n}`).join("\n") + "\n";
        s.reviewNotes.forEach((n) => notes.push([r.name, s.title, n]));
      }
    }
  }
  drafts += `\n## Sources used\n\n| ID | Title | Publisher | URL |\n|---|---|---|---|\n`;
  for (const s of r.sources) drafts += `| \`${s.id}\` | ${s.title} | ${s.publisher} | ${s.url} |\n`;
  drafts += `\n---\n`;
}
fs.writeFileSync(OUT + "p3-05-batch-a-drafts-for-review.md", drafts);

// ------------------------------------------------------------------ verification list
const cls = (n) => (n.startsWith("OPTIONAL") ? "OPTIONAL" : n.startsWith("EDITORIAL") ? "EDITORIAL" : n.startsWith("SOURCE NOTE") ? "SOURCE" : n.startsWith("BLOCKING") ? "BLOCKING" : "?");
const line = ([g, sec, n]) => `- **${g}: ${sec}.** ${n.replace(/^[A-Z ]+: /, "")}`;
const sect = (c) => notes.filter(([, , n]) => cls(n) === c).map(line).join("\n") || "- None.";
const count = (g, c) => notes.filter(([x, , n]) => x === g && cls(n) === c).length;
let v = `# P3-05 Batch A: claims needing verification

Generated from the internal \`reviewNotes\` in \`content/festivals/\` (makara-sankranti, maha-shivaratri, holi, rama-navami), 2026-11-08. Companion to [p3-05-batch-a-drafts-for-review.md](p3-05-batch-a-drafts-for-review.md) and the packet [p3-05-batch-a-editorial-review-packet.md](p3-05-batch-a-editorial-review-packet.md). **The four guides were marked reviewed on 2026-11-08 (owner-approved revision 3); these notes are internal and never published.** Classification: **BLOCKING** (must be resolved before a section can be marked reviewed; none remained), **OPTIONAL** (worthwhile future research), **EDITORIAL** (an owner choice), **SOURCE NOTE** (a source-critical observation kept out of the public text). Source-use rules: [source-use-policy.md](source-use-policy.md).

## Readiness by festival

| Guide | Sections | Quick facts | Deity entries | Sources | Sources with terms review not done | BLOCKING | OPTIONAL | EDITORIAL | SOURCE NOTE | Status |
|---|---|---|---|---|---|---|---|---|---|---|
`;
for (const r of records) {
  const unread = r.sources.filter((s) => !s.termsChecked).length;
  v += `| ${r.name} | ${r.sections.length} | ${(r.quickFacts ?? []).length} | ${(r.deityEntries ?? []).length} | ${r.sources.length} | ${unread} of ${r.sources.length} | ${count(r.name, "BLOCKING")} | ${count(r.name, "OPTIONAL")} | ${count(r.name, "EDITORIAL")} | ${count(r.name, "SOURCE")} | Reviewed |\n`;
}
v += `\nNo content blockers remain in the notes; the one source-use blocker (IGNCA) was resolved by leaving that source out. See the packet for the register of unresolved claims.

## Optional future research
${sect("OPTIONAL")}

## Editorial decisions for the owner
${sect("EDITORIAL")}

## Source-critical notes (kept out of the public text)
${sect("SOURCE")}

## Source reuse terms: what was checked

**Content read status and terms review status are different things.** Content read status (which part of a page was read, and how) is recorded in each source pack and in the start of every audit note; terms review status (whether the publisher's terms, copyright or linking page was read) is the column below. Four questions per source (see [source-use-policy.md](source-use-policy.md)): terms page read; reproduces protected content (no, everywhere); permission needed for paraphrase plus a link (no, everywhere in the content files); permission status (not needed). An unread or missing terms page is never treated as permission.

| Guide | Publisher | Source id | Terms review status | Audit note |
|---|---|---|---|---|
`;
for (const r of records) {
  for (const s of r.sources) v += `| ${r.name} | ${s.publisher} | \`${s.id}\` | ${s.termsChecked ? "Done (terms read)" : "Not done"} | ${s.termsNote.replace(/\|/g, "/")} |\n`;
}
v += `
**Source left out because of its terms:** IGNCA (Indira Gandhi National Centre for the Arts), "Mahasivaratri in Kashmir". Its Hyper linking Policy, read live on 2026-11-08, says: prior permission is required before hyperlinks are directed from any website or portal to its site, with a request stating the nature of the content and the exact link wording. Its Copyright Policy bars reproduction without written permission. Under the source-use policy it would be recorded \`permissionRequired: "yes"\` and stay blocked until permission is granted, so it is not in any content file and no detail drawn only from it is used.
`;
fs.writeFileSync(OUT + "p3-05-batch-a-verification-list.md", v);

// ------------------------------------------------------------------ review packet
const N = {};
const add = (g, h, flag, note) => (N[`${g}|${h}`] = [flag, note]);
const MS = "Makara Sankranti", SH = "Maha Shivaratri", HO = "Holi", RN = "Rama Navami";
add(MS, "Quick facts (draft)", "C", "**Changed:** 'Meaning' now separates the traditional uttarayana reckoning from the astronomical December solstice. Indra is kept and tied to Tamil Pongal; 'Signature foods' unchanged.");
add(MS, "Deities (draft)", "R", "**Revision 3:** Surya's entry no longer implies the Sun's astronomical northward turn happens on Makara Sankranti (it now says thanks are offered on the day the Sun enters makara in the solar calendar, and at harvest). Indra kept, explicitly 'Tamil Pongal'. Saraswati (HAF only) stays out.");
add(MS, "Why celebrate Makara Sankranti?", "C", "**Changed:** canonical name 'Makara Sankranti' (Makar as an alias); overview now says the festival opens uttarayana by tradition while the Sun's actual turn is the December solstice, a few weeks earlier.");
add(MS, "A solar festival: tradition and astronomy", "C", "**Changed per your direction:** explains the traditional uttarayana association, keeps Britannica's note that the festival began as a winter-solstice holiday, and distinguishes it from the December solstice. **Revision 3:** the astronomy is now cited to the U.S. Naval Observatory page \"Sunrise and Sunset Times Near the Solstices\" (read in full in the browser): at the December solstice the Sun is on its most southerly track, after which it begins its slow march northward. Bhishma is omitted.");
add(MS, "One solar moment, many festivals", "C", "**Changed (revision 3 narrowed it):** the Telangana and Andhra detail is only what the two sources say: Kanuma is part of Sankranti; in Telangana it is the third day with worship of cattle and farm tools and cattle processions (News On AIR); in Andhra Pradesh bulls are decorated and paraded (Chittoor District). The unsourced 'celebrated over several days' is removed. Bhogi, Sankranti day and Mukkanuma stay unwritten (no readable source). Pongal, Lohri, Magh Bihu and Uttarayan remain distinct.");
add(MS, "Pongal: four days of thanks", "R", "Unchanged.");
add(MS, "Lohri: the evening before", "R", "Unchanged.");
add(MS, "Customs of the season", "R", "Unchanged; no reason is given for kites.");
add(MS, "Sesame, jaggery and new rice", "R", "Unchanged; no fasting claim.");
add(MS, "Celebrating Makar Sankranti away from home", "R", "Allergen tip (FDA, read directly) and the glass-coated-string caution kept, as you asked. No fasting advice appears here.");
add(SH, "Quick facts (draft)", "C", "**Changed:** the deities fact no longer mentions Parvati's fast.");
add(SH, "Deities (draft)", "C", "**Changed:** Parvati's entry keeps only the marriage account.");
add(SH, "Why celebrate Maha Shivaratri?", "R", "Unchanged.");
add(SH, "A night each month, and a great night once a year", "R", "Unchanged.");
add(SH, "The pillar of light", "C", "**Simplified as you asked:** 'The Linga Purana and the Shiva Purana tell this story, and Shaiva festival tradition associates it with Maha Shivaratri.' The text no longer says anything about what the passages name, so it cannot imply that they name the night; the internal notes still record that they do not.");
add(SH, "Other stories: the poison and the marriage", "C", "**Shortened and attributed** to Maharashtra Tourism and Incredible India. The separate Parvati fasting account (Brandeis) is removed.");
add(SH, "The hunter who worshipped without knowing", "R", "Kept, attributed to the Shiva Purana.");
add(SH, "The vigil, the fast and the lingam", "R", "Unchanged.");
add(SH, "Fasting and food", "C", "**Changed:** keeps the optional, varied fasting language; **revision 3:** the repeated disclaimer is replaced by 'Fasting practices vary by family and tradition.'");
add(SH, "Shiva’s night in different places", "R", "Herath stays one sentence; **no IGNCA permission request**, as you directed. Regional differences kept.");
add(SH, "Celebrating Maha Shivaratri away from home", "C", "**Changed:** 'If you fast, keep it simple' and 'look after your health' removed; fasting is now described neutrally as varying by family and tradition (revision 3 wording).");
add(HO, "Quick facts (draft)", "C", "**Changed:** Shiva and Kama removed from the deities fact; Holika Dahan is described as a preceding bonfire, not as part of a two-day count.");
add(HO, "Deities (draft)", "R", "Krishna, Radha, Vishnu. No Shiva or Kama.");
add(HO, "Why celebrate Holi?", "C", "**Changed:** Holika Dahan is 'the evening before'; Holi itself is the colour day.");
add(HO, "The burning of Holika", "R", "Traditional narrative, no named text, as you directed.");
add(HO, "Radha and Krishna", "C", "**Shortened:** the story now says Krishna playfully smeared colour on Radha's face; no skin-colour detail.");
add(HO, "A bonfire and a day of color", "C", "**Changed:** Holika Dahan is explained as a related preceding observance; the hierarchy line is softened to 'in some places the play loosens everyday formalities of age and status, though customs vary'.");
add(HO, "Colors, then and now", "C", "**Revision 3:** the synthetic-color wording is softened: ingredients vary by product, Britannica cautions that some pigments can irritate skin and eyes, and some people choose herbal colors. It no longer implies all synthetic powders are hazardous.");
add(HO, "Sweets and drinks", "C", "**Revision 3:** the unsupported clause about cannabis-infused versions of other drinks, and the inferred 'ordinarily made without cannabis' wording, are removed. The text now says only what Britannica supports: thandai is a cooling milk drink with almonds, saffron, poppy seeds, cardamom and rose petals; bhang, a mild cannabis-based drink, is listed separately and served in some places. No consumption guidance.");
add(HO, "Holi across India", "C", "**Changed:** the southern Kama sentence is removed with the Kama story.");
add(HO, "Holi beyond temples and homes", "C", "**Changed:** the boundary line now says 'in some places'. The explicit consent sentence is kept.");
add(HO, "Celebrating Holi away from home", "C", "Consent language and eye-safety guidance kept. **Revision 3:** the eye-and-skin tip now says ingredients vary, so check labels or choose herbal colors if you prefer, and keep powder away from your eyes; the rinse-with-water guidance is unchanged.");
add(RN, "Quick facts (draft)", "R", "Proposed quick facts kept.");
add(RN, "Deities (draft)", "R", "Proposed deity entries kept.");
add(RN, "Why celebrate Rama Navami?", "R", "Ayodhya's religious significance is now in the worship section; no political commentary anywhere.");
add(RN, "Rama’s birth in the Ramayana", "C", "**Changed:** the sentence inferring the festival arose later was removed; the guide makes no claim about the festival's origin.");
add(RN, "The last day of spring Navaratri", "R", "Kept.");
add(RN, "A day of worship at home and in the temple", "C", "**Changed:** the short Ayodhya section is folded in here as a final paragraph.");
add(RN, "The wedding of Rama and Sita", "C", "**Shortened:** the Michigan example is one sentence ('at one Michigan temple, families of the congregation sponsor the wedding as the families of the bride and the groom').");
add(RN, "Fasting and food", "C", "**Changed:** the temple foods are attributed ('Hinduism Today describes temples that...'). **Revision 3:** the dietary/medical disclaimer is replaced by 'Fasting practices vary by family and tradition.' No other change.");
add(RN, "Celebrating Rama Navami away from home", "C", "**Changed:** 'If you fast, keep it simple' removed. **Revision 3:** the line now reads 'Fasting practices vary by family and tradition.'");

const FLAG = { D: "🔶 NEEDS YOUR DECISION", C: "🔁 CHANGED PER YOUR DECISION", S: "💡 SUGGESTION", R: "✅ UNCHANGED" };
const decision = (flag, note) => `\n> **Reviewer note — ${FLAG[flag]}**\n> ${note}\n>\n> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold\n`;
let body = "";
const flagCount = {};
for (const r of records) {
  flagCount[r.name] = { D: 0, C: 0, S: 0, R: 0 };
  body += `\n# ${r.name}\n\n## Basics (reviewed)\n\n- **Subtitle:** ${r.subtitle}\n- **Aliases:** ${r.aliases.join(", ")}\n- **Deity search terms:** ${r.deities.join(", ")}\n`;
  body += decision("S", "Basics decision is in the **Basics** table above.").replace("**Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold", "**Your decision:** see the Basics table");
  const note = (h) => {
    const n = N[`${r.name}|${h}`];
    if (!n) throw new Error(`no note for ${r.name} | ${h}`);
    flagCount[r.name][n[0]]++;
    return decision(...n);
  };
  body += `\n## Quick facts (reviewed)\n\n`;
  for (const q of r.quickFacts ?? []) body += `- **${q.label}:** ${q.text}${q.tradition ? ` _(${q.tradition})_` : ""}  \n  Sources: ${ids(q.sourceIds)}\n`;
  body += note("Quick facts (draft)");
  body += `\n## Deities (reviewed)\n\n`;
  for (const d of r.deityEntries ?? []) body += `- **${d.name}** (${d.tradition}): ${d.role}  \n  Sources: ${ids(d.sourceIds)}\n`;
  body += note("Deities (draft)");
  for (const [gname, kinds] of GROUPS) {
    const secs = r.sections.filter((s) => kinds.includes(s.kind));
    if (!secs.length) continue;
    body += `\n## ${gname}\n`;
    for (const s of secs) {
      body += `\n### ${s.title}\n\n`;
      if (s.tradition) body += `_Tradition: ${s.tradition}_\n\n`;
      body += s.body + "\n\n**Sources:** " + bt(s.sourceIds) + "\n\n";
      if (s.reviewNotes?.length) body += "**Research notes (internal, not published):**\n" + s.reviewNotes.map((n) => `- ${n}`).join("\n") + "\n";
      body += note(s.title);
    }
  }
  body += `\n## Sources used\n\n| ID | Title | Publisher | URL | Terms review |\n|---|---|---|---|---|\n`;
  for (const s of r.sources) body += `| \`${s.id}\` | ${s.title} | ${s.publisher} | ${s.url} | ${s.termsChecked ? "Done" : "Not done"} |\n`;
  body += `\n---\n`;
}

const summaryRows = records.map((r) => `| ${r.name} | ${r.sections.length + 2} | ${flagCount[r.name].R} | ${flagCount[r.name].C} | ${flagCount[r.name].S} | ${flagCount[r.name].D} |`).join("\n");

const header = `# P3-05 Batch A editorial review packet, revision 3 (final editorial pass): Makara Sankranti, Maha Shivaratri, Holi, Rama Navami

**Revised 2026-11-08 after your editorial decisions (revision 3 applies the six final changes listed below). STATUS: APPROVED and marked \`reviewed\` locally on 2026-11-08 (reviewer recorded internally as \`desi-days-editorial\`); not committed, pushed or deployed.** The four guides and their basics now publish through the loader. Every occurrence is still empty and no 2027 date is verified. The three previously reviewed pilot guides and the three Batch B festivals are unchanged. Packs behind this packet: [makar-sankranti.md](makar-sankranti.md), [maha-shivaratri.md](maha-shivaratri.md), [holi.md](holi.md), [rama-navami.md](rama-navami.md). Other files: [p3-05-batch-a-drafts-for-review.md](p3-05-batch-a-drafts-for-review.md), [p3-05-batch-a-verification-list.md](p3-05-batch-a-verification-list.md).

## How to use this packet

1. Read **What changed in this revision**, **Decision summary**, **Basics** and the **Register of unresolved claims** first.
2. Then read each guide (kept for the record). Under every section is a reviewer note and a decision row. Markers: 🔁 changed per your decision, ✅ unchanged, 💡 suggestion, 🔶 needs your decision.
3. **Outcome:** revision 3 was approved in full and marked reviewed after lint, typecheck, tests, an isolated production build, a leak scan and desktop and 375px checks (see docs/PROJECT_HANDOFF.md).
4. No commit, push or deploy has happened; those need your separate approval.

## Two different statuses for every source

The research documents now keep two things apart:

- **Content read status:** which part of the page's content was actually read, and how (read in full in a browser, first part only, read by a fetch agent, or a search-result summary that is not relied on). This decides whether a claim may rest on the source.
- **Terms review status:** whether the publisher's terms, copyright or linking page was read, and what it says about paraphrasing and linking. An unread or missing terms page is recorded as such, is never treated as permission, and does not by itself block an original paraphrase plus a link. A source whose terms restrict linking (IGNCA) is left out.

In the content files, each source's \`termsNote\` now starts with "Terms review:" and states the content-read status separately.

## What changed in revision 3 (final editorial pass)

1. **Holi:** the unsupported cannabis-infused-drinks clause and the inferred 'ordinarily made without cannabis' wording are removed; only the Britannica-supported thandai and bhang distinction remains.
2. **Makara Sankranti:** the December solstice and the Sun's northward turn are now cited to the U.S. Naval Observatory page \"Sunrise and Sunset Times Near the Solstices\" (source \`sankranti-usno\`), read in full in the browser on 2026-11-08, and cited from the overview, the 'Meaning' quick fact and the solar-calendar section.
3. **Makara Sankranti:** Surya's entry no longer implies the astronomical turn occurs on Makara Sankranti.
4. **Makara Sankranti:** the Telugu-region detail is limited to the two sources' statements about Kanuma; the unsourced 'several days' is dropped.
5. **Holi:** the synthetic-color wording is softened; eye-safety and consent language kept.
6. **Maha Shivaratri and Rama Navami:** the repeated dietary/medical disclaimers are replaced by 'Fasting practices vary by family and tradition.'; nothing else changed in these guides.

## What changed in revision 2

| Guide | Change |
|---|---|
| Makara Sankranti | Subtitle "A solar festival of harvest and renewal"; canonical name and "Makar Sankranti" alias kept; overview, quick fact and solar-calendar section now separate the traditional uttarayana reckoning from the astronomical December solstice and keep Britannica's solstice-history note; Surya and Indra kept (Indra tied to Tamil Pongal); Bhishma omitted; allergen and kite cautions kept; one Telangana and Andhra sentence (Kanuma) added from a single targeted search. |
| Maha Shivaratri | Pillar-of-light wording simplified; poison and marriage kept, shortened; Parvati's fasting account removed (text, quick fact, deity entry); hunter story, one-sentence Herath, regional differences and optional fasting language kept; fasting and vigil advice made neutral. |
| Holi | Radha and Krishna shortened (no skin-color detail); Shiva-and-Kama story, its quick-fact mention and the ancient-origins paragraph removed; thandai and bhang kept separate and neutral; "Holika Dahan" removed from aliases and explained as a preceding observance; hierarchy line softened; consent and eye-safety kept. |
| Rama Navami | Ayodhya section folded into the worship section; Michigan example shortened; the inference that the festival arose later removed; spring Navaratri link kept; temple foods now attributed. |
| All four | Fasting lines no longer read as personal dietary or medical advice; documentation separates content-read status from terms-review status. |

## Targeted checks completed earlier (2026-11-08)

| Check | Result |
|---|---|
| IGNCA linking policy, read live | Prior permission is required before hyperlinks are directed to its site; copyright bars reproduction without written permission. **No permission requested** (your decision). Not used as a source. |
| Alternative Herath source | None of scholarly standing; one DD News (Prasar Bharati) item gives the name and says it is observed with night-long prayers at home. **Herath stays one sentence.** |
| Sesame allergy source | The FDA page was read directly (sesame is a major food allergen and must be declared on packaged-food labels). |
| Summary-only government pages | Incredible India Holi and Maha Shivratri and the first parts of the Maharashtra Tourism pages were re-read in a browser. |
| Valmiki credit (Diwali question) | No error: Murthy translated the Yuddha Kanda; Desiraju Hanumanta Rao translated the Bala Kanda. |
| **Telugu-region source (one targeted attempt)** | Partly found. A News On AIR (Prasar Bharati) item (Telangana: Kanuma, the festival of cattle, on the third day of Sankranti; cattle and farm tools worshipped; cattle processions) and the Chittoor District (Government of Andhra Pradesh) page (Kanuma with decorated bulls paraded) were read in a browser. In revision 3 the guide text was narrowed to exactly these statements. The Andhra Pradesh Tourism page covering Bhogi, Sankranti and Mukkanuma could not be opened, so **only Kanuma is written** and the rest is recorded as a gap. |

## Decision summary

| Guide | Items | Unchanged | Changed per your decision | Suggestions | Needs your decision |
|---|---|---|---|---|---|
${summaryRows}

**No item is waiting on a decision from revision 3.** Holi's cannabis clause was removed (former U7) and the solstice astronomy is now cited (former U14).

## Basics (all four guides)

| Festival | Subtitle | Aliases | Deity search terms | Notes | Decision |
|---|---|---|---|---|---|
| Makara Sankranti | A solar festival of harvest and renewal | Sankranti, Makar Sankranti | Surya | Your subtitle. Pongal, Lohri, Uttarayan and Bihu are not aliases. | ☐ Approve ☐ Edit |
| Maha Shivaratri | The great night of Shiva | Shivaratri, Mahashivratri, Maha Shivratri | Shiva, Parvati | "Herath" is not an alias. | ☐ Approve ☐ Edit |
| Holi | The festival of colors | none | Krishna, Radha, Vishnu | Holika Dahan removed from aliases and explained in the guide. | ☐ Approve ☐ Edit |
| Rama Navami | A festival honoring the birth of Rama | Ram Navami, Sri Rama Navami | Rama, Sita, Hanuman | Proposed basics kept. | ☐ Approve ☐ Edit |

## Register of unresolved claims

| # | Guide | Claim or gap | Status | What would resolve it |
|---|---|---|---|---|
| U1 | Maha Shivaratri | Kashmir's Herath tradition beyond one sentence | **Omitted** (IGNCA needs link permission; no scholarly alternative; no request, per your decision) | A reputable scholarly or museum source |
| U2 | Holi | Which text tells Holika's burning | **Accepted as traditional narrative** (your decision) | Optional: Narada, Bhavishya and a full Vishnu Purana |
| U3 | Makara Sankranti | Bhogi, Sankranti day and Mukkanuma in Andhra Pradesh and Telangana | **Partly resolved**: only Kanuma is written | A readable reputable source (Andhra Pradesh Tourism could not be opened) |
| U4 | Maha Shivaratri | The poison and marriage stories rest on government tourism pages (stated as beliefs) | Included briefly, attributed | A verbatim scholarly or encyclopedic source |
| U5 | Maha Shivaratri | The hunter story's popular currency (primary text only) | Included from the Shiva Purana | A secondary source |
| U6 | Holi | Dol Jatra and Lathmar details; plant colors; the bhang statement | Included, **one source each (Britannica)** | Second sources |
| U7 | Holi | Cannabis-infused versions of other drinks "may exist" | **Resolved (revision 3): clause removed** | Nothing further |
| U8 | Holi | Holi-specific health guidance | Not found; general AAO eye guidance used | An AAD or other medical page on Holi colors |
| U9 | Rama Navami | Bhadrachalam, panaka region, Vivaha Panchami, Vaishnava differences | **Omitted or generic** | An official temple source, a regional source |
| U10 | Rama Navami | The Ramcharitmanas birth passage | Not read | An English translation |
| U11 | Maha Shivaratri, Rama Navami | US temple examples come from undated Pluralism essays | Generic, unnamed (Michigan only) | A dated, named source |
| U12 | All | Pages read only in part (Britannica's Pongal, Lohri, Holi end, Rama Navami end; Maharashtra Tourism; Incredible India) | Unread parts not used | Read the rest |
| U13 | All | utsav.gov.in (expired certificate), Andhra Pradesh Tourism (not reachable), PDF files | Not read | Retry later |
| U14 | Makara Sankranti | The December-solstice statement | **Resolved (revision 3):** cited to the U.S. Naval Observatory page, read in full. The page gives the solstice date and the Sun's northward movement afterward; the "few weeks earlier" comparison with the festival is the editor's inference from that and Britannica's mid-January timing (no date is printed) | Optional second astronomy source (a NASA page read through the fetch tool agrees on the southernmost position but was not used) |

`;
fs.writeFileSync(OUT + "p3-05-batch-a-editorial-review-packet.md", header + "---\n" + body);
console.log(Object.fromEntries(records.map((r) => [r.name, { notes: ["BLOCKING", "OPTIONAL", "EDITORIAL", "SOURCE"].map((c) => count(r.name, c)), flags: flagCount[r.name] }])));

// Regenerates the three Batch B review documents from the content files (P3-05 Batch B).
// Run from the repository root (see README.md in this folder). Writes only under docs/research/cultural/.
import fs from "node:fs";
const ROOT = "/Users/nidhinagumalla/Code/HinduFestivals/";
const OUT = ROOT + "docs/research/cultural/";
const { krishnaJanmashtami } = await import(ROOT + "content/festivals/krishna-janmashtami.ts");
const { ganeshChaturthi } = await import(ROOT + "content/festivals/ganesh-chaturthi.ts");
const { vijayadashami } = await import(ROOT + "content/festivals/vijayadashami.ts");
const records = [krishnaJanmashtami, ganeshChaturthi, vijayadashami];

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
const cls = (n) => (n.startsWith("BLOCKING") ? "BLOCKING" : n.startsWith("EDITORIAL") ? "EDITORIAL" : n.startsWith("OPTIONAL") ? "OPTIONAL" : n.startsWith("SOURCE NOTE") ? "SOURCE" : "?");
const strip = (n) => n.replace(/^[A-Z ]+(\([^)]*\))?: /, "");

// ---- collect notes
const notes = []; // [guide, item, text]
for (const r of records) {
  for (const q of r.quickFacts ?? []) (q.reviewNotes ?? []).forEach((n) => notes.push([r.name, `quick fact ${q.label}`, n]));
  for (const d of r.deityEntries ?? []) (d.reviewNotes ?? []).forEach((n) => notes.push([r.name, `deity ${d.name}`, n]));
  for (const s of r.sections) (s.reviewNotes ?? []).forEach((n) => notes.push([r.name, s.title, n]));
}
const count = (g, c) => notes.filter(([x, , n]) => x === g && cls(n) === c).length;
const sect = (c) => notes.filter(([, , n]) => cls(n) === c).map(([g, s, n]) => `- **${g}: ${s}.** ${strip(n)}`).join("\n") || "- None.";

// ---- readable drafts
let drafts = `# Batch B guides for editorial review (P3-05), revision 2

**STATUS: REVIEWED 2026-11-12 (editorial revision 2, owner-approved).** The guides, basics, quick facts and deity entries are marked \`reviewed\` in the content files and publish on the site through the loader; the "Research notes" below remain internal and are never published. **No 2027 date is verified.**** Readable export of the three content files in \`content/festivals/\` (generated from them; edit the \`.ts\` files, not this file): Krishna Janmashtami, Ganesh Chaturthi and Vijayadashami. Bracketed source IDs show which sources back each passage; "Research notes" are internal and never published. No festival dates appear in any guide, and every occurrence is empty. Basics (subtitle, aliases, deity search terms) were approved with the guides.

---
`;
for (const r of records) {
  drafts += `\n# ${r.name}\n\n## Basics (reviewed)\n\n- **Subtitle:** ${r.subtitle}\n- **Aliases:** ${r.aliases.join(", ") || "none"}\n- **Deity search terms:** ${r.deities.join(", ")}\n\n## Quick facts (reviewed)\n\n`;
  for (const q of r.quickFacts ?? []) drafts += `- **${q.label}:** ${q.text}${q.tradition ? ` _(${q.tradition})_` : ""}  \n  Sources: ${ids(q.sourceIds)}\n`;
  drafts += `\n## Deities (reviewed)\n\n`;
  for (const d of r.deityEntries ?? []) drafts += `- **${d.name}** (${d.tradition}): ${d.role}  \n  Sources: ${ids(d.sourceIds)}\n`;
  for (const [gname, kinds] of GROUPS) {
    const secs = r.sections.filter((s) => kinds.includes(s.kind));
    if (!secs.length) continue;
    drafts += `\n## ${gname}\n`;
    for (const s of secs) {
      drafts += `\n### ${s.title}\n\n`;
      if (s.tradition) drafts += `_Tradition: ${s.tradition}_\n\n`;
      drafts += s.body + "\n\n**Sources:** " + bt(s.sourceIds) + "\n\n";
      if (s.reviewNotes?.length) drafts += "**Research notes (internal, not published):**\n" + s.reviewNotes.map((n) => `- ${n}`).join("\n") + "\n";
    }
  }
  drafts += `\n## Sources used\n\n| ID | Title | Publisher | URL |\n|---|---|---|---|\n`;
  for (const s of r.sources) drafts += `| \`${s.id}\` | ${s.title} | ${s.publisher} | ${s.url} |\n`;
  drafts += `\n---\n`;
}
fs.writeFileSync(OUT + "p3-05-batch-b-drafts-for-review.md", drafts);

// ---- verification list
let v = `# P3-05 Batch B: claims needing verification

Generated from the internal \`reviewNotes\` in \`content/festivals/\` (krishna-janmashtami, ganesh-chaturthi, vijayadashami), 2026-11-08. Companion to [p3-05-batch-b-drafts-for-review.md](p3-05-batch-b-drafts-for-review.md) and the packet [p3-05-batch-b-editorial-review-packet.md](p3-05-batch-b-editorial-review-packet.md). **The three guides were marked reviewed on 2026-11-12 (owner-approved revision 2); these notes are internal and never published.** Classification: **BLOCKING** (must be resolved, or consciously accepted by the owner, before the section can be marked reviewed), **OPTIONAL** (worthwhile future research), **EDITORIAL** (an owner choice), **SOURCE NOTE** (a source-critical observation kept out of the public text). Source-use rules: [source-use-policy.md](source-use-policy.md).

## Readiness by festival

| Guide | Sections | Quick facts | Deity entries | Sources | Sources with terms review not done | BLOCKING | OPTIONAL | EDITORIAL | SOURCE NOTE | Status |
|---|---|---|---|---|---|---|---|---|---|---|
`;
for (const r of records) {
  const unread = r.sources.filter((s) => !s.termsChecked).length;
  v += `| ${r.name} | ${r.sections.length} | ${(r.quickFacts ?? []).length} | ${(r.deityEntries ?? []).length} | ${r.sources.length} | ${unread} of ${r.sources.length} | ${count(r.name, "BLOCKING")} | ${count(r.name, "OPTIONAL")} | ${count(r.name, "EDITORIAL")} | ${count(r.name, "SOURCE")} | Reviewed |\n`;
}
v += `
## Blocking: resolve or consciously accept
${sect("BLOCKING")}

## Editorial decisions for the owner
${sect("EDITORIAL")}

## Optional future research
${sect("OPTIONAL")}

## Source-critical notes (kept out of the public text)
${sect("SOURCE")}

## Source reuse terms: what was checked

**Content read status and terms review status are different things.** Content read status (which part of a page was read, and how) is recorded in each source pack and at the start of each audit note; terms review status is the column below. Four questions per source (see [source-use-policy.md](source-use-policy.md)): terms page read; reproduces protected content (no, everywhere); permission needed for paraphrase plus a link (no, everywhere in the content files); permission status (not needed). An unread or missing terms page is recorded as such, is never permission, and does not by itself block an original paraphrase plus a link.

| Guide | Publisher | Source id | Terms review status | Audit note |
|---|---|---|---|---|
`;
for (const r of records) for (const s of r.sources) v += `| ${r.name} | ${s.publisher} | \`${s.id}\` | ${s.termsChecked ? "Done (terms read)" : "Not done"} | ${s.termsNote.replace(/\|/g, "/")} |\n`;
fs.writeFileSync(OUT + "p3-05-batch-b-verification-list.md", v);

// ---- editorial packet
const decision = (flag, note) => `\n> **Reviewer note — ${flag}**\n> ${note}\n>\n> **Your decision:** ☐ Approve as is  ☐ Approve with my suggestion  ☐ Edit (notes: )  ☐ Hold\n`;
const flagFor = (item) => {
  const ns = (item.reviewNotes ?? []);
  if (ns.some((n) => cls(n) === "BLOCKING")) return "🔶 NEEDS YOUR DECISION (blocking note)";
  if (ns.some((n) => /needs the owner/i.test(n))) return "🔶 NEEDS YOUR DECISION";
  if (ns.some((n) => cls(n) === "EDITORIAL")) return "💡 EDITORIAL POINT";
  return "🆕 NEW DRAFT";
};
const summarize = (item) => {
  const ns = item.reviewNotes ?? [];
  const first = ns.find((n) => cls(n) === "BLOCKING") ?? ns.find((n) => /needs the owner/i.test(n)) ?? ns.find((n) => cls(n) === "EDITORIAL") ?? ns[0];
  return first ? strip(first) : "New draft; no open points.";
};
let body = "";
const flagCount = {};
for (const r of records) {
  flagCount[r.name] = { block: 0, edit: 0, fresh: 0 };
  const tick = (item) => { const f = flagFor(item); if (f.startsWith("🔶")) flagCount[r.name].block++; else if (f.startsWith("💡")) flagCount[r.name].edit++; else flagCount[r.name].fresh++; return f; };
  body += `\n# ${r.name}\n\n## Basics (reviewed)\n\n- **Subtitle:** ${r.subtitle}\n- **Aliases:** ${r.aliases.join(", ") || "none"}\n- **Deity search terms:** ${r.deities.join(", ")}\n\n**Your decision:** see the Basics table above.\n`;
  body += `\n## Quick facts (reviewed)\n\n`;
  for (const q of r.quickFacts ?? []) body += `- **${q.label}:** ${q.text}${q.tradition ? ` _(${q.tradition})_` : ""}  \n  Sources: ${ids(q.sourceIds)}\n`;
  body += decision("🆕 NEW DRAFT", "Quick facts follow the guide text; check that each is supported by its listed sources.");
  body += `\n## Deities (reviewed)\n\n`;
  for (const d of r.deityEntries ?? []) body += `- **${d.name}** (${d.tradition}): ${d.role}  \n  Sources: ${ids(d.sourceIds)}\n`;
  body += decision("🆕 NEW DRAFT", "Each entry names the tradition that makes the association.");
  for (const [gname, kinds] of GROUPS) {
    const secs = r.sections.filter((s) => kinds.includes(s.kind));
    if (!secs.length) continue;
    body += `\n## ${gname}\n`;
    for (const s of secs) {
      body += `\n### ${s.title}\n\n`;
      if (s.tradition) body += `_Tradition: ${s.tradition}_\n\n`;
      body += s.body + "\n\n**Sources:** " + bt(s.sourceIds) + "\n\n";
      if (s.reviewNotes?.length) body += "**Research notes (internal, not published):**\n" + s.reviewNotes.map((n) => `- ${n}`).join("\n") + "\n";
      body += decision(tick(s), summarize(s));
    }
  }
  body += `\n## Sources used\n\n| ID | Title | Publisher | URL | Terms review |\n|---|---|---|---|---|\n`;
  for (const s of r.sources) body += `| \`${s.id}\` | ${s.title} | ${s.publisher} | ${s.url} | ${s.termsChecked ? "Done" : "Not done"} |\n`;
  body += `\n---\n`;
}
const summaryRows = records.map((r) => `| ${r.name} | ${r.sections.length + 2} | ${flagCount[r.name].fresh} | ${flagCount[r.name].edit} | ${flagCount[r.name].block} |`).join("\n");

const header = `# P3-05 Batch B editorial review packet, revision 2: Krishna Janmashtami, Ganesh Chaturthi, Vijayadashami

**Prepared 2026-11-08; revised 2026-11-12 after your combined editorial review. STATUS: APPROVED and marked \`reviewed\` locally on 2026-11-12 (reviewer recorded internally as \`desi-days-editorial\`); not committed, pushed or deployed.** The three guides and their basics now publish through the loader. Every occurrence is still empty and no 2027 date is verified. The seven earlier reviewed guides (Diwali, Ugadi, Navaratri and the four Batch A guides) are unchanged. Packs behind this packet: [krishna-janmashtami.md](krishna-janmashtami.md), [ganesh-chaturthi.md](ganesh-chaturthi.md), [vijayadashami.md](vijayadashami.md). Other files: [p3-05-batch-b-drafts-for-review.md](p3-05-batch-b-drafts-for-review.md), [p3-05-batch-b-verification-list.md](p3-05-batch-b-verification-list.md).

## How to use this packet

1. Read **Unresolved claims in brief**, **Decision summary**, **Basics** and the **Register** first.
2. Then read each guide. Under every section is a reviewer note and a decision row. Markers: 🔶 needs your decision, 💡 an editorial point, 🆕 new draft with no open points.
3. **Outcome:** revision 2 was approved in full and marked reviewed after lint, typecheck, tests, an isolated production build, a leak scan and desktop and 375px checks (see docs/PROJECT_HANDOFF.md).
4. No commit, push or deploy has happened; those need your separate approval.

## How the research was done

- **Reading, not summaries:** Britannica and Brandeis pages (which refuse the fetch tool) were read in the built-in browser. Other pages were read through the fetch tool; where a page was only partly read or reached only as a model summary, the pack says so and the claim is not relied on.
- **Content read status and terms review status are kept apart** in every pack and in each source's audit note. An unread terms page is recorded as such and is never permission.
- **Independent corroboration:** the core claims rest on at least two publishers; the exceptions are listed in the register below.
- **Dates:** none. Janmashtami's Smarta and Vaishnava observances stay in the date ledger as a disputed festival.

## What changed in revision 2 (your consolidated revisions)

| Guide | Change |
|---|---|
| Krishna Janmashtami | The birth story stays attributed to the Bhagavata Purana and focused on the birth. The Smarta and Vaishnava section says only, generally, that observance dates can differ by tradition (attributed to an Odisha report); the sunrise, Rohini and Ashtami-timing rules and HAF's dawn-count explanation were removed. Dahi Handi keeps the custom and the general safety concern; the court-limit discussion, ages, helmets, pyramid heights and the injury statistic were removed. Removed: "many families do not fast at all", the low-pot assurance and "or swing". The fasting disclaimer now appears once. |
| Ganesh Chaturthi | **One targeted attempt succeeded:** the Shiva Purana (Rudra Samhita, Kumara Khanda, chapter 13, J. L. Shastri translation) was read in full and is now cited for the birth story, with the other versions kept as variants; no other Purana is named. The broken-tusk connection, the Shivaji nationalism claim and the "more communal" clause were removed. The Rangari and 1892 versus 1893 question is acknowledged and left unsettled. Duration and day-counting are stated explicitly (day one is the first day; Anant Chaturdashi is the eleventh day and ten days after the first). The CPCB details were generalized; the dorm bucket-immersion and pour-the-water-on-plants instructions were removed in favor of consulting a temple or community organizer. |
| Vijayadashami | Dussehra, Dasara and Vijaya Dashami stay as aliases, with the regional distinctions explained (Dussehra in the north and west, Vijayadashami and Bijoya Doshomi in the east, Dasara in Karnataka). Rama and Durga stay attributed. The overview no longer says "the day Rama defeated Ravana", so the guide does not claim the epic puts Ravana's death on the tenth day. The children-shooting-flaming-arrows example was removed. Mahanavami customs (Ayudha puja, Golu) are separated from Vijayadashami customs (shami puja, Jamboo Savari, apta leaves). Kullu is one sentence limited to Britannica. The books-and-laptop idea is an optional modern adaptation, not a documented ritual. |
| All three | The seven reviewed guides are unchanged. Every Batch B section, quick fact and deity entry is still \`draft\`; every occurrence is empty. Sources no longer cited (Scroll, India TV 2014, The Hans India) stay in the packs as read and not used. |

## Unresolved claims in brief

No item is blocking any longer: the four earlier blockers were resolved by the revisions above (one by finding and reading the primary text, three by generalizing or removing the claim). What remains:

1. **Krishna Janmashtami:** the Smarta and Vaishnava reckoning and the current Dahi Handi safety requirements are deliberately not stated; a calendar authority and a recent authoritative source would allow them later. Pushtimarg, Gaudiya fasting rules, Tamil Nadu and other regional customs are not described.
2. **Ganesh Chaturthi:** the Shiva Purana version rests on one chapter read in full, but the later chapter on the head and other Puranic versions were not read. The public-festival history rests on Britannica and two news-media features (no scholarly history), with the 1892 versus 1893 question left open. Immersion advice is general; no US source was found.
3. **Vijayadashami:** Kullu rests on Britannica alone; the Ramcharitmanas, traditions honoring Ravana, Saraswati puja and Vidyarambham are not covered; the Karnataka bulb counts and festival lengths differ between sources and are not stated.
4. **Across all three:** no Atlanta-area event, temple or student group is verified; Gauri Aagman and other regional customs are not described because no reliable source was read in full (nothing is invented); publisher terms pages are mostly unread (recorded as such, never treated as permission).

## Decision summary

| Guide | Items | New drafts, no open points | Editorial points | Need your decision |
|---|---|---|---|---|
${summaryRows}

## Basics (all three guides)

| Festival | Subtitle | Aliases | Deity search terms | Notes | Decision |
|---|---|---|---|---|---|
${records.map((r) => `| ${r.name} | ${r.subtitle} | ${r.aliases.join(", ") || "none"} | ${r.deities.join(", ")} | See the pack's proposed-basics table. | ☐ Approve ☐ Edit |`).join("\n")}

## Register of unresolved claims

| # | Guide | Claim or gap | Status | What would resolve it |
|---|---|---|---|---|
| U1 | Krishna Janmashtami | Smarta versus Vaishnava reckoning | **Revision 2: not stated**; the guide says only that observance dates can differ by tradition | A panchang authority, temple or scholarly source, if the owner wants the rules explained |
| U2 | Krishna Janmashtami | Current Dahi Handi age and height rules | **Revision 2: removed**; only the general safety concern remains | A recent authoritative source |
| U3 | Krishna Janmashtami | Pushtimarg, Gaudiya fasting rules, Tamil Nadu and other regional customs | Not described | Readable reputable sources |
| U4 | Krishna Janmashtami | Midnight versus "dark of night" | Text read says dark of night; publishers say midnight | Optional: the Bhagavata verses with a commentary |
| U5 | Ganesh Chaturthi | Primary text for the birth stories | **Revision 2: resolved in part.** Shiva Purana, Rudra Samhita, Kumara Khanda, ch. 13 read in full and cited; later chapter on the head and other Puranic versions not read | Optional: the later chapter and other versions |
| U6 | Ganesh Chaturthi | Public-festival history: 1892 versus 1893, Rangari; Shivaji removed | Hedged and attributed; no scholarly source | An academic history |
| U7 | Ganesh Chaturthi | Britannica's "more communal" judgment | **Revision 2: removed** (owner decision) | None |
| U8 | Ganesh Chaturthi | Home immersion and US rules | **Revision 2: removed**; a temple or community organizer is the pointer | A US temple or municipal source, if specific advice is wanted |
| U9 | Ganesh Chaturthi | Gauri Aagman, chants, regional customs | Not described (only partly read sources) | Reading the Maharashtra Tourism and Incredible India pages in full |
| U10 | Vijayadashami | Kullu Dussehra | One source (Britannica) | An independent source |
| U11 | Vijayadashami | Ramcharitmanas, regional Ramayanas, traditions honoring Ravana | Not covered | Readable sources |
| U12 | Vijayadashami | Saraswati puja and Vidyarambham | Not described | A reliable source |
| U13 | All | Pages read only in part or through summaries (Britannica Durga Puja and Ganesha beyond the read parts; HAF Dusshera feed; Incredible India and Maharashtra Tourism) | Unread parts not used | Read the rest |
| U14 | All | Publisher terms pages | Mostly not read; recorded as such, never treated as permission | Read them if the owner wants |

`;
fs.writeFileSync(OUT + "p3-05-batch-b-editorial-review-packet.md", header + "---\n" + body);
console.log(Object.fromEntries(records.map((r) => [r.name, { notes: ["BLOCKING", "OPTIONAL", "EDITORIAL", "SOURCE"].map((c) => count(r.name, c)), flags: flagCount[r.name] }])));

import fs from "node:fs";
const ROOT = "/Users/nidhinagumalla/Code/HinduFestivals/";
const { diwali } = await import(ROOT + "content/festivals/diwali.ts");
const { ugadi } = await import(ROOT + "content/festivals/ugadi.ts");
const { navaratri } = await import(ROOT + "content/festivals/navaratri.ts");
const records = [diwali, ugadi, navaratri];

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

let out = `# Cultural guides: Diwali, Ugadi, Navaratri (revision 4, reviewed 2026-11-08)

**STATUS: REVIEWED locally 2026-11-08 (P3-05B, reviewer recorded internally) and published by the loader. The other seven festivals are still draft. No 2027 date is verified.** Readable export of the three content files in \`content/festivals/\` (generated from them; edit the \`.ts\` files, not this file). Bracketed source IDs show which sources back each passage; "Research notes" are internal and never published. No dates appear in any guide. Basics (subtitle, aliases, deity search terms) are shown at the top of each guide and are reviewed.

---
`;

const notes = [];
for (const r of records) {
  out += `\n# ${r.name}\n\n`;
  out += `## Basics (reviewed)\n\n- **Subtitle:** ${r.subtitle}\n- **Aliases:** ${r.aliases.join(", ")}\n- **Deity search terms:** ${r.deities.join(", ")}\n\n`;
  out += `## Quick facts (reviewed)\n\n`;
  for (const q of r.quickFacts ?? []) {
    out += `- **${q.label}:** ${q.text}${q.tradition ? ` _(${q.tradition})_` : ""}  \n  Sources: ${ids(q.sourceIds)}\n`;
    (q.reviewNotes ?? []).forEach((n) => notes.push([r.name, `quick fact "${q.label}"`, n]));
  }
  out += `\n## Deities (reviewed)\n\n`;
  for (const d of r.deityEntries ?? []) {
    out += `- **${d.name}** (${d.tradition}): ${d.role}  \n  Sources: ${ids(d.sourceIds)}\n`;
    (d.reviewNotes ?? []).forEach((n) => notes.push([r.name, `deity ${d.name}`, n]));
  }
  for (const [gname, kinds] of GROUPS) {
    const secs = r.sections.filter((s) => kinds.includes(s.kind));
    if (!secs.length) continue;
    out += `\n## ${gname}\n`;
    for (const s of secs) {
      out += `\n### ${s.title}\n\n`;
      if (s.tradition) out += `_Tradition: ${s.tradition}_\n\n`;
      out += s.body + "\n\n";
      out += `**Sources:** ${bt(s.sourceIds)}\n\n`;
      if (s.reviewNotes?.length) {
        out += `**Research notes (internal, not published):**\n` + s.reviewNotes.map((n) => `- ${n}`).join("\n") + "\n";
        s.reviewNotes.forEach((n) => notes.push([r.name, s.title, n]));
      }
    }
  }
  out += `\n## Sources used\n\n| ID | Title | Publisher | URL |\n|---|---|---|---|\n`;
  for (const s of r.sources.filter((x) => x.role === "cultural")) {
    out += `| \`${s.id}\` | ${s.title} | ${s.publisher} | ${s.url} |\n`;
  }
  out += `\n---\n`;
}
fs.writeFileSync(ROOT + "docs/research/cultural/p3-03-drafts-for-review.md", out);

// ---- verification list: rebuild the three note-derived sections and the counts
const cls = (n) => (n.startsWith("OPTIONAL") ? "OPTIONAL" : n.startsWith("EDITORIAL") ? "EDITORIAL" : n.startsWith("SOURCE NOTE") ? "SOURCE" : n.startsWith("BLOCKING") ? "BLOCKING" : "?");
const line = ([g, sec, n]) => `- **${g}: ${sec}.** ${n.replace(/^[A-Z ]+: /, "")}`;
const sect = (c) => notes.filter(([, , n]) => cls(n) === c).map(line).join("\n");
const counts = Object.fromEntries(records.map((r) => [r.name, notes.filter(([g, , n]) => g === r.name && cls(n) === "OPTIONAL").length]));
const termsUnread = Object.fromEntries(records.map((r) => {
  const c = r.sources.filter((x) => x.role === "cultural");
  return [r.name, `${c.filter((x) => !x.termsChecked).length} of ${c.length}`];
}));
const vp = ROOT + "docs/research/cultural/p3-03-verification-list.md";
let v = fs.readFileSync(vp, "utf8");
const a = v.indexOf("## Optional future research");
const b = v.indexOf("## Source reuse terms");
const head = v.slice(0, a);
const tail = v.slice(b);
v = head + `## Optional future research\n${sect("OPTIONAL")}\n\n## Editorial decisions for the owner\n${sect("EDITORIAL")}\n\n## Source-critical notes (kept out of the public text)\n${sect("SOURCE")}\n\n` + tail;
for (const r of records) {
  v = v.replace(new RegExp(`\\| ${r.name} \\| 0 \\| \\d+ \\| [^|]+ \\| Draft \\|`), `| ${r.name} | 0 | ${counts[r.name]} | ${termsUnread[r.name]} | Draft |`);
}
v = v.replace(/^\| Radha Krishna Temple \(temple blog\).*\n/m, "");
v = v.replace("Generated from the internal `reviewNotes` in `content/festivals/` (diwali, ugadi, navaratri).", "Generated from the internal `reviewNotes` in `content/festivals/` (diwali, ugadi, navaratri); regenerated after the P3-05A edits (2026-11-08).");
fs.writeFileSync(vp, v);
console.log(counts, termsUnread);

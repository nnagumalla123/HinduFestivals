// Public-text reading copy of the ten guides for a second reader (no internal notes, no reviewer data).
import fs from "node:fs";
const ROOT = "/Users/nidhinagumalla/Code/HinduFestivals/";
const { FESTIVAL_RECORDS } = await import(ROOT + "content/index.ts");
let md = `# The ten guides: reading copy for a second reader\n\nThis is the text a visitor sees (subtitle, quick facts, deity entries, sections with their tradition labels, and the sources cited), copied from the content files. It contains **no** internal review notes or reviewer data. Every guide is marked reviewed by the project's editorial process; this copy exists so a culturally knowledgeable reader can check it. See \`second-reader-packet.md\` for what to look for.\n\n`;
for (const r of FESTIVAL_RECORDS) {
  md += `\n---\n\n# ${r.name}\n\n*${r.subtitle}*${r.aliases.length ? ` · Also known as ${r.aliases.join(", ")}` : ""}\n\n## Quick facts\n\n`;
  for (const q of r.quickFacts ?? []) md += `- **${q.label}:** ${q.text}${q.tradition ? ` _(${q.tradition})_` : ""}\n`;
  md += `\n## Deities\n\n`;
  for (const d of r.deityEntries ?? []) md += `- **${d.name}** _(${d.tradition})_: ${d.role}\n`;
  for (const s of r.sections) md += `\n## ${s.title}\n\n${s.tradition ? `_Tradition: ${s.tradition}_\n\n` : ""}${s.body}\n`;
  md += `\n## Sources cited\n\n` + r.sources.map((s, i) => `${i + 1}. ${s.title}, ${s.publisher ?? ""}`).join("\n") + "\n";
}
fs.writeFileSync(ROOT + "docs/research/p3-06/ten-guides-reading-copy.md", md);
console.log("words:", md.split(/\s+/).length);

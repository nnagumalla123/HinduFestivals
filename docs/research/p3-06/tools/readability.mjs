// Approximate Flesch-Kincaid grade and reading ease per guide (heuristic syllable count; diacritics and Sanskrit names inflate it).
import fs from "node:fs";
const ROOT = "/Users/nidhinagumalla/Code/HinduFestivals/";
const { FESTIVAL_RECORDS } = await import(ROOT + "content/index.ts");
const syl = (w) => { w = w.toLowerCase().replace(/[^a-z]/g, ""); if (!w) return 0; if (w.length <= 3) return 1; w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, ""); const m = w.match(/[aeiouy]{1,2}/g); return Math.max(1, m ? m.length : 1); };
const stats = (text) => { const sents = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 3); const words = text.split(/\s+/).filter((w) => /[A-Za-z]/.test(w)); const syls = words.reduce((a, w) => a + syl(w), 0); const W = words.length, S = Math.max(1, sents.length); return { words: W, sents: S, grade: 0.39 * (W / S) + 11.8 * (syls / W) - 15.59, ease: 206.835 - 1.015 * (W / S) - 84.6 * (syls / W), wps: W / S }; };
let md = `# Readability (P3-06)\n\nHeuristic Flesch-Kincaid on each guide's public text. Sanskrit and place names inflate syllable counts, so treat the numbers as relative. The project's target is an accessible, beginner-friendly voice (PRD); general web guidance is roughly grade 8 to 10 for broad audiences.\n\n| Guide | Overview words | Overview grade | Whole-guide words | Whole-guide grade | Reading ease | Words per sentence | Longest sentence (words) |\n|---|---|---|---|---|---|---|---|\n`;
for (const r of FESTIVAL_RECORDS) {
  const ov = r.sections.find((s) => s.kind === "overview");
  const all = [...r.sections.map((s) => s.body), ...(r.quickFacts ?? []).map((q) => q.text), ...(r.deityEntries ?? []).map((d) => d.role)].join(" ");
  const o = stats(ov.body), a = stats(all);
  const longest = Math.max(...all.split(/(?<=[.!?])\s+/).map((s) => s.split(/\s+/).length));
  md += `| ${r.name} | ${o.words} | ${o.grade.toFixed(1)} | ${a.words} | ${a.grade.toFixed(1)} | ${a.ease.toFixed(0)} | ${a.wps.toFixed(1)} | ${longest} |\n`;
}
fs.writeFileSync(ROOT + "docs/research/p3-06/readability.md", md);
console.log(md);

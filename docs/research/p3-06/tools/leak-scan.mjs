// Repeatable public-output scan (P3-06). Usage, from the repository root, after an isolated production build:
//   node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs \
//        docs/research/p3-06/tools/leak-scan.mjs <build-dir> [report.md]
// <build-dir> is a copy of the project that has been built (it must contain .next/). Exit code 1 on any HIT.
// What counts as PUBLIC: prerendered HTML, RSC payloads, route metadata under .next/server/app, everything under
// .next/static (client bundles, CSS, any source maps) and public/. Server-only chunks (.next/server/chunks) are not served
// to browsers and are deliberately NOT scanned (they contain the raw content modules by design).
import fs from "node:fs";
import path from "node:path";
const ROOT = "/Users/nidhinagumalla/Code/HinduFestivals/";
const BUILD = process.argv[2];
const REPORT = process.argv[3] ?? ROOT + "docs/research/p3-06/leak-scan-report.md";
if (!BUILD || !fs.existsSync(BUILD + "/.next")) { console.error("usage: leak-scan.mjs <built-project-dir> [report.md]"); process.exit(2); }
const { FESTIVAL_RECORDS } = await import(ROOT + "content/index.ts");

const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
const appFiles = walk(BUILD + "/.next/server/app");
const staticFiles = walk(BUILD + "/.next/static");
const publicFiles = walk(BUILD + "/public");
const all = [...appFiles, ...staticFiles, ...publicFiles];
const isText = (f) => !/\.(woff2?|ico|png|jpe?g|webp|avif|gif)$/i.test(f);
const corpus = all.filter(isText).map((f) => [f.replace(BUILD, ""), fs.readFileSync(f, "utf8")]);
const html = corpus.filter(([f]) => f.endsWith(".html"));

const hits = [];
const notes = [];
const hit = (check, detail, files) => hits.push({ check, detail, files: files.slice(0, 3) });
const where = (needle) => corpus.filter(([, t]) => t.includes(needle)).map(([f]) => f);

// 1. Internal vocabulary and metadata keys
const TOKENS = ["desi-days-editorial", "reviewedBy", "reviewNotes", "reviewedAt\":", "termsNote", "termsChecked", "permissionStatus", "permissionRequired", "reproducesProtectedContent", "claimsSupported", "accessedAt", "deityEntries", "independenceGroup", "BLOCKING", "SOURCE NOTE", "OPTIONAL:", "EDITORIAL", "Dry Run", "IGNCA", "owner decision", "owner direction", "Owner direction", "Revision 2", "revision 3"];
for (const t of TOKENS) { const w = where(t); if (w.length) hit("internal token", t, w); }
// 2. Fingerprints of every internal note, terms note and claimsSupported entry, for every record
const fp = (s) => s.replace(/\s+/g, " ").slice(0, 50);
let fingerprints = 0;
for (const r of FESTIVAL_RECORDS) {
  const items = [...r.sections, ...(r.quickFacts ?? []), ...(r.deityEntries ?? [])];
  for (const i of items) for (const n of i.reviewNotes ?? []) { fingerprints++; const w = where(fp(n)); if (w.length) hit("note fingerprint", `${r.slug}: ${fp(n)}`, w); }
  for (const s of r.sources) { fingerprints += 1 + s.claimsSupported.length; const w = where(fp(s.termsNote)); if (w.length) hit("terms-note fingerprint", `${r.slug}/${s.id}`, w); for (const c of s.claimsSupported) { if (fp(c).length < 30) continue; /* too generic to fingerprint */ const w2 = where(fp(c)); if (w2.length) hit("claimsSupported fingerprint", `${r.slug}/${s.id}: ${fp(c)}`, w2); } }
}
// 3. Secrets, environment names, absolute paths
for (const [re, label] of [[/SUPABASE_[A-Z_]+|SERVICE_ROLE|EMAIL_API_KEY|CRON_SECRET/, "environment variable name"], [/sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{12,}|BEGIN (RSA |PRIVATE )/, "key-like string"], [/\/Users\/[a-z]/i, "local absolute path"], [/localhost:\d{4}/, "localhost URL"]]) {
  const w = corpus.filter(([, t]) => re.test(t)).map(([f]) => f); if (w.length) hit("secret or path", label, w);
}
// 4. Source maps and stray files served publicly
const maps = staticFiles.filter((f) => f.endsWith(".map")); if (maps.length) hit("source maps in .next/static", `${maps.length} file(s)`, maps.map((f) => f.replace(BUILD, "")));
const strays = publicFiles.filter((f) => !/favicon\.ico$/.test(f)); if (strays.length) hit("unexpected file in public/", strays.length + " file(s)", strays.map((f) => f.replace(BUILD, "")));
// 5. Draft and placeholder wording on festival pages (all ten are reviewed)
const festHtml = html.filter(([f]) => /\/festivals\/[a-z-]+\.html$/.test(f));
for (const [f, t] of festHtml) {
  const text = t.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  for (const [re, label] of [[/work in progress/i, "work-in-progress notice"], [/Not yet available/i, "placeholder"], [/Parts of this guide/i, "partly-reviewed notice"], [/\bTODO\b|\bTBD\b|lorem ipsum|\?\?\?/i, "working-note text"], [/\bdraft\b/i, "the word draft"]]) if (re.test(text)) hit("draft or placeholder text", `${label} on ${f}`, [f]);
  if (!/Last reviewed [A-Z][a-z]+ \d{1,2}, 2026/.test(text)) hit("missing review date", f, [f]);
  if (!/Date not yet verified/.test(text)) hit("missing date notice", f, [f]);
  // dates: strip source titles and URLs (links), then look for dates, countdowns, the location label
  let scrub = text;
  for (const r of FESTIVAL_RECORDS) for (const s of r.sources) scrub = scrub.split(s.title.replace(/&/g, "&")).join("");
  scrub = scrub.replace(/https?:\/\/\S+/g, " ");
  if (/\b2027\b/.test(scrub)) hit("date text", `2027 on ${f}: ${(scrub.match(/.{0,50}\b2027\b.{0,30}/) ?? [""])[0]}`, [f]);
  if (/\b20\d\d-\d\d-\d\d\b/.test(scrub)) hit("date text", `ISO date on ${f}`, [f]);
  if (/days? (to go|left|until)|starts in/i.test(scrub)) hit("countdown text", f, [f]);
  if (/countdown/i.test(scrub)) notes.push(`the word "countdown" appears in prose on ${f}: ${(scrub.match(/.{0,50}countdown.{0,30}/i) ?? [""])[0]}`);
  if (/Reference calendar|Atlanta/.test(scrub)) hit("location label outside Calendar", f, [f]);
  if (/<time\b/.test(t)) hit("<time> element on a festival page", f, [f]);
}
// 6. Per-page metadata
const metas = {};
for (const [f, t] of html) { const title = (t.match(/<title>([^<]*)<\/title>/) ?? [])[1]; const desc = (t.match(/<meta name="description" content="([^"]*)"/) ?? [])[1]; metas[f] = { title, desc }; if (!title) hit("page metadata", `no <title> in ${f}`, [f]); }
// 7. Calendar page keeps its single label; no other page carries it
for (const [f, t] of html) { const has = /Reference calendar: Atlanta, GA/.test(t.replace(/<[^>]+>/g, " ")); if (has && !/calendar/.test(f)) hit("location label outside Calendar", f, [f]); }

const files = { app: appFiles.length, static: staticFiles.length, public: publicFiles.length, html: html.length, festivalPages: festHtml.length };
let md = `# Metadata leak and public-output scan (P3-06)\n\nGenerated by \`docs/research/p3-06/tools/leak-scan.mjs\` against an isolated production build (${new Date().toISOString().slice(0, 10)}). **Result: ${hits.length === 0 ? "PASS, 0 hits" : `FAIL, ${hits.length} hit(s)`}.**\n\n- Public files scanned: ${all.length} (${files.app} under \`.next/server/app\`, ${files.static} under \`.next/static\`, ${files.public} under \`public/\`); festival pages: ${files.festivalPages}; fingerprints checked (internal notes, terms notes, claimsSupported): ${fingerprints}; vocabulary tokens: ${TOKENS.length}.\n- Not scanned on purpose: \`.next/server/chunks\` and other server-only output (never served to browsers; it holds the raw content modules).\n- Source URLs may contain dates (for example an India TV article URL); they are stripped before the date check because they are links, not displayed dates.\n\n## Checks\n\n1. Internal vocabulary and metadata keys in public output.\n2. Fingerprints (first 50 characters) of every internal review note, source terms note and claimsSupported entry, for all ten records.\n3. Environment variable names, key-like strings, local absolute paths, localhost URLs.\n4. Source maps in \`.next/static\`, and unexpected files in \`public/\`.\n5. Draft or placeholder wording on the ten festival pages; a "Last reviewed" date and "Date not yet verified" on each.\n6. Dates, countdown phrases, \`<time>\` elements and the location label on festival pages.\n7. A \`<title>\` on every page; the "Reference calendar" label only on the Calendar page.\n\n## Hits\n\n${hits.length ? hits.map((h) => `- **${h.check}:** ${h.detail} (${h.files.join(", ")})`).join("\n") : "None."}\n\n## Informational notes (not hits)\n\n${notes.length ? notes.map((n) => `- ${n}`).join("\n") : "None."}\n\n## Page titles (public metadata)\n\n${Object.entries(metas).map(([f, m]) => `- \`${f}\`: ${m.title ?? "(none)"}${m.desc ? ` — ${m.desc}` : ""}`).join("\n")}\n`;
fs.writeFileSync(REPORT, md);
console.log(hits.length === 0 ? `PASS: 0 hits (${all.length} public files, ${fingerprints} fingerprints)` : `FAIL: ${hits.length} hit(s)`);
if (hits.length) hits.slice(0, 20).forEach((h) => console.log(" -", h.check, "|", h.detail));
process.exit(hits.length ? 1 : 0);

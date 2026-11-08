import { register } from "node:module";
const hook = `export async function resolve(s, c, n) {
  if ((s.startsWith("./") || s.startsWith("../")) && !/\\.[a-z]+$/.test(s)) {
    try { return await n(s + ".ts", c); } catch {}
  }
  return n(s, c);
}`;
register("data:text/javascript," + encodeURIComponent(hook), import.meta.url);

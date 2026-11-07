/** True only for http(s) URLs. Used before turning stored text into a link, so "javascript:" and similar never become clickable. */
export function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Render the tiny Markdown subset used in SDK snippet prose (`code` spans
 * and bare URLs) as HTML. Everything else is escaped.
 */
const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function inlineHtml(text: string): string {
  return escape(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /(https?:\/\/[^\s<]+[^\s<.,)])/g,
      '<a href="$1" class="text-primary hover:underline">$1</a>',
    );
}

import type { APIRoute, GetStaticPaths } from "astro";
import { product } from "../../data/product";

/**
 * Markdown twin of each docs page, served at /docs/<slug>.md.
 * Reads the same source file the HTML page is built from.
 */
const sources = import.meta.glob<string>("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

interface Doc {
  slug: string;
  title: string;
  description: string;
  body: string;
}

function parse(path: string, raw: string): Doc {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  const body = (match ? match[2] : raw)
    // Images point at src/assets, which doesn't exist at runtime.
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt) => `*[Image: ${alt}]*`)
    .trim();
  const fallbackSlug = path.replace(/^.*\//, "").replace(/\.md$/, "");
  return {
    slug: meta.slug ?? fallbackSlug,
    title: meta.title ?? fallbackSlug,
    description: meta.description ?? "",
    body,
  };
}

const docs = Object.entries(sources).map(([path, raw]) => parse(path, raw));

export const getStaticPaths: GetStaticPaths = () =>
  docs.map((doc) => ({ params: { slug: doc.slug }, props: { doc } }));

export const GET: APIRoute = ({ props }) => {
  const { doc } = props as { doc: Doc };
  const md = [
    `# ${doc.title}`,
    doc.description && `> ${doc.description}`,
    doc.body,
    `---\n\nHTML version: ${product.url}/docs/${doc.slug} · All docs: ${product.url}/docs · ${product.url}/llms.txt`,
  ]
    .filter(Boolean)
    .join("\n\n");
  return new Response(md + "\n", {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};

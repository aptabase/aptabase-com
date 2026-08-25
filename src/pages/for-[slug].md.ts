import type { APIRoute, GetStaticPaths } from "astro";
import frameworks from "../lib/frameworks";
import { frameworkMarkdown } from "../lib/markdown";

/** Markdown twin of each framework landing page, served at /for-<slug>.md. */
export const getStaticPaths: GetStaticPaths = () =>
  frameworks.map((fw) => ({ params: { slug: fw.slug }, props: { fw } }));

export const GET: APIRoute = ({ props }) => {
  const { fw } = props as { fw: (typeof frameworks)[number] };
  return new Response(frameworkMarkdown(fw), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};

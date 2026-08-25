import type { APIRoute } from "astro";
import { docsMarkdown } from "../lib/markdown";

export const GET: APIRoute = () =>
  new Response(docsMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });

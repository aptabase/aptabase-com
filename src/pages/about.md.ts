import type { APIRoute } from "astro";
import { aboutMarkdown } from "../lib/markdown";

export const GET: APIRoute = () =>
  new Response(aboutMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });

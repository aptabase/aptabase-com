import type { APIRoute } from "astro";
import { llmsTxt } from "../lib/markdown";

// Generated from src/data at build time so it can never drift from the site.
export const GET: APIRoute = () =>
  new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

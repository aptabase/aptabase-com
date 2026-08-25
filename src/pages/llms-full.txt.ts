import type { APIRoute } from "astro";
import { llmsFullTxt } from "../lib/markdown";

// Generated from src/data/sdks.ts at build time — the same snippets that
// render on the /for-<slug> pages.
export const GET: APIRoute = () =>
  new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

import type { APIRoute } from "astro";
import { pricingMarkdown } from "../lib/markdown";

export const GET: APIRoute = () =>
  new Response(pricingMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });

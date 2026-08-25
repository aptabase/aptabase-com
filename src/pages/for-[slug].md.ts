import type { APIRoute, GetStaticPaths } from "astro";
import { sdkPages, type Sdk } from "../data/sdks";
import { frameworkMarkdown } from "../lib/markdown";

/** Markdown twin of each framework landing page, served at /for-<slug>.md. */
export const getStaticPaths: GetStaticPaths = () =>
  sdkPages.map((sdk) => ({ params: { slug: sdk.page.slug }, props: { sdk } }));

export const GET: APIRoute = ({ props }) => {
  const { sdk } = props as { sdk: Sdk };
  return new Response(frameworkMarkdown(sdk), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};

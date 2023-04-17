import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://aptabase.com",
  trailingSlash: "never",
  integrations: [tailwind(), sitemap()],
  server: {
    port: 4000,
  },
  build: {
    format: "file",
  },
  experimental: {
    assets: true,
  },
  image: {
    service: "astro/assets/services/sharp",
  },
});

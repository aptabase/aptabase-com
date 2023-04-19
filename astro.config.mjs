import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import alpine from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://aptabase.com",
  trailingSlash: "never",
  integrations: [tailwind(), sitemap(), alpine()],
  server: {
    port: 4000,
  },
  experimental: {
    assets: true,
  },
  image: {
    service: "astro/assets/services/sharp",
  },
});

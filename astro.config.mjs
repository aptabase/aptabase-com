import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import alpine from "@astrojs/alpinejs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://aptabase.com",
  trailingSlash: "never",
  integrations: [tailwind(), sitemap(), alpine(), mdx()],
  server: {
    port: 4000
  },
  image: {
    service: sharpImageService()
  }
});
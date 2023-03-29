import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://aptabase.com",
  integrations: [tailwind(), image(), sitemap()],
  server: {
    port: 4000,
  },
});

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import alpine from "@astrojs/alpinejs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://aptabase.com",
  trailingSlash: "never",
  // Restore pre-v7 HTML whitespace rules; the templates rely on
  // whitespace around inline elements.
  compressHTML: true,
  integrations: [sitemap(), alpine(), mdx()],
  server: {
    port: 4000
  },
  vite: {
    plugins: [tailwindcss()]
  }
});

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      title: ["Cal Sans", ...defaultTheme.fontFamily.sans],
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#1A61FF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    colors: {
      dark_bg: "#070E36",
      dark_primary: "#21bbff",
      dark_secondary: "#050b2f",
      dark_text: "#ffffff",

      light_bg: "#ffffff",
      light_primary: "#2a7785",
      light_secondary: "#d7f2fa",
      light_text: "#000000",
    },
  },
  plugins: [],
};
export default config;

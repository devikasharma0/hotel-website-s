import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper and a single earth brown, taken from the logo.
        cream: {
          DEFAULT: "#F2EADC",
          dark: "#E8DCC8",
        },
        ink: {
          DEFAULT: "#2B2117",
          muted: "#5A4834",
          soft: "#6F604A",
        },
        accent: {
          DEFAULT: "#6E4F2C",
          light: "#8E6C3F",
          dark: "#523719",
        },
        line: "#DED0B8",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "88rem",
      },
      transitionDuration: {
        DEFAULT: "280ms",
      },
      boxShadow: {
        soft: "0 24px 64px -32px rgba(43, 33, 23, 0.18)",
        search: "0 32px 80px -40px rgba(43, 33, 23, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;

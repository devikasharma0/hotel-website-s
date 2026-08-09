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
        cream: {
          DEFAULT: "#F7F4EF",
          dark: "#EDE8DF",
        },
        ink: {
          DEFAULT: "#1C1B19",
          muted: "#4A4641",
          soft: "#6B6560",
        },
        accent: {
          DEFAULT: "#8B7355",
          light: "#A89172",
          dark: "#6E5A42",
        },
        line: "#D9D2C8",
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
        soft: "0 24px 64px -32px rgba(28, 27, 25, 0.18)",
        search: "0 32px 80px -40px rgba(28, 27, 25, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;

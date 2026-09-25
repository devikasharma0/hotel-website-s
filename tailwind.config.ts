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
        // Sampled from the logo artwork: its ink and its paper.
        cream: {
          DEFAULT: "#E8DFD0",
          dark: "#DCD0BC",
        },
        ink: {
          DEFAULT: "#2A2117",
          muted: "#56452F",
          soft: "#665844",
        },
        accent: {
          DEFAULT: "#624B33",
          light: "#82684A",
          dark: "#47351F",
        },
        line: "#D3C5AE",
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
        soft: "0 24px 64px -32px rgba(42, 33, 23, 0.18)",
        search: "0 32px 80px -40px rgba(42, 33, 23, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;

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
        charcoal: {
          DEFAULT: "#0a0a0a",
          soft: "#111111",
          muted: "#1a1a1a",
          light: "#2a2a2a",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#d4af37",
          soft: "#e8d48b",
          dark: "#a68520",
        },
        cream: {
          DEFAULT: "#f5f0e8",
          soft: "#faf7f2",
          muted: "#e8e0d4",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a227 0%, #d4af37 50%, #a68520 100%)",
        "hero-pattern":
          "radial-gradient(ellipse at top, rgba(201,162,39,0.12) 0%, transparent 55%)",
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201, 162, 39, 0.25)",
        soft: "0 8px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

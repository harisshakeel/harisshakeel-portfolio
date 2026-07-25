import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.sans],
        pixel: ["var(--font-pixel)", ...fontFamily.mono],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))", // Added primary-light
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Device/screen mockups (bento visuals, feature previews, chat &
        // browser mockups) — dark in dark mode, light in light mode.
        screen: {
          DEFAULT: "hsl(var(--screen) / <alpha-value>)",
          panel: "hsl(var(--screen-panel) / <alpha-value>)",
        },
        // Hero code editor surfaces/chrome (VSCodeLive). Syntax token colors
        // are applied via inline style from the --code-* hex vars instead.
        code: {
          bg: "hsl(var(--code-bg) / <alpha-value>)",
          panel: "hsl(var(--code-panel) / <alpha-value>)",
          titlebar: "hsl(var(--code-titlebar) / <alpha-value>)",
          term: "hsl(var(--code-term) / <alpha-value>)",
          fg: "hsl(var(--code-fg) / <alpha-value>)",
          line: "hsl(var(--code-line) / <alpha-value>)",
          chrome: "hsl(var(--code-chrome) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -40%) scale(1)",
          },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(8%,-6%,0) scale(1.08)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-7%,5%,0) scale(1.1)" },
        },
        "aurora-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "marquee-vertical": "marquee-vertical var(--duration, 30s) linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "spin-slow": "spin 5s linear infinite",
        "drift-a": "drift-a 18s ease-in-out infinite",
        "drift-b": "drift-b 22s ease-in-out infinite",
        "aurora-pulse": "aurora-pulse 9s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

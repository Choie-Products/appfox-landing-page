import type { Config } from "tailwindcss";

export default {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-jost)", "Jost", "Futura", "sans-serif"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        quiet: "var(--quiet)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-soft": "var(--accent-soft)",
        dark: "var(--dark)",
        "dark-surface": "var(--dark-surface)",
        "dark-line": "var(--dark-line)",
        "dark-muted": "var(--dark-muted)",
        danger: "var(--danger)",
        good: "var(--good)",
      },
      maxWidth: {
        site: "1280px",
        prose: "68ch",
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 4.2vw, 3.75rem)", { lineHeight: "0.97", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2rem, 3vw, 2.625rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.625rem, 2.1vw, 1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.25rem, 1.6vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
} satisfies Config;

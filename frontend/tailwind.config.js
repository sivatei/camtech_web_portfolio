/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink:      "#ffffff", // Pure white background
        surface:  "#ffffff", // Pure white for cards
        surface2: "#f1f5f9", // Light slate for secondary cards/inputs
        fog:      "#1e3a8a", // Navy blue for muted/secondary text
        paper:    "#0f172a", // Deep navy/black for primary text
        crimson:  "#1d4ed8", // Primary cobalt blue
        rose:     "#3b82f6", // Vibrant blue
        blood:    "#1e3a8a", // Dark navy blue
        ember:    "#2563eb", // Electric blue
        glow:     "#4f46e5", // Indigo glow accent
      },
      fontFamily: {
        display: ["'Google Sans Flex'", "sans-serif"],
        body:    ["'Google Sans Flex'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        "float-orb-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%":      { transform: "translate(60px, 80px) scale(1.1)" },
          "66%":      { transform: "translate(-40px, 40px) scale(0.95)" },
        },
        "float-orb-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%":      { transform: "translate(-70px, -60px) scale(1.08)" },
          "70%":      { transform: "translate(50px, -30px) scale(0.92)" },
        },
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "blink": {
          "50%": { opacity: "0" },
        },
        "pulse-blue": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(37,99,235,0.4)" },
          "50%":      { boxShadow: "0 0 28px rgba(37,99,235,0.85)" },
        },
      },
      animation: {
        "float-orb-1":    "float-orb-1 14s ease-in-out infinite",
        "float-orb-2":    "float-orb-2 18s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "slide-up":       "slide-up 0.65s cubic-bezier(0.16,1,0.3,1) both",
        "blink":          "blink 1s step-end infinite",
        "pulse-blue":     "pulse-blue 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

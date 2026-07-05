/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink:      "#090d16", // Deep black-blue for page background
        surface:  "#0c1524", // Sleek dark card background
        surface2: "#172337", // Secondary slate cards / inputs
        fog:      "#94a3b8", // Slate grey for muted/secondary labels
        paper:    "#f8fafc", // Slate white for primary text
        crimson:  "#3b82f6", // Cobalt blue accents
        rose:     "#60a5fa", // Vibrant blue highlights
        blood:    "#020617", // Deepest black background
        ember:    "#3b82f6", // Electric blue accents
        glow:     "#6366f1", // Indigo glow accent
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'Fira Code'", "monospace"],
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

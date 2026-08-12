/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Preset B — Nocturne Prestige (arrangement clair-dominant)
        charbon: "#0F0F13", // primaire sombre
        gold: "#D4A843", // accent
        goldink: "#8A6520", // accent lisible sur fond clair
        cream: "#F5F3EE", // fond
        ink: "#1E1E26", // texte / ardoise
        ivory: "#EBE7DD", // fond clair secondaire
        onyx: "#0A0A0D", // pied de page
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        card: "0 18px 60px -24px rgba(15,15,19,0.30)",
        cardHover: "0 30px 80px -22px rgba(212,168,67,0.45)",
        panel: "0 40px 120px -40px rgba(15,15,19,0.55)",
        goldring:
          "0 0 0 2px rgba(212,168,67,0.75), 0 0 60px -12px rgba(212,168,67,0.85)",
      },
    },
  },
  plugins: [],
};

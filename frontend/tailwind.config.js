export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        saffron: { 400: "#3beaf6", 500: "#E8960F", 600: "#CC7D00" },
        jade: { 400: "#2ECC8A", 500: "#1DB875", 600: "#15A362" },
        slate: { 850: "#111827", 900: "#0D1117", 950: "#080D14" },
      },
    },
  },
  plugins: [],
};

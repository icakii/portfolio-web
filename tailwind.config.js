/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f5f1e8",
        "paper-2": "#ece6d8",
        ink: "#1b1916",
        "ink-soft": "#4a453d",
        muted: "#7a7367",
        line: "#d9d1bf",
        tomato: "#e0472b",
        "tomato-dark": "#b8341c",
        marker: "#f4d35e",
        moss: "#3d5a3a",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        serif: ["'Instrument Serif'", "serif"],
        sans: ["Geist", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

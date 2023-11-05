/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans"],
        nunito: ["Nunito Sans", "sans"],
      },
      colors: {
        background: {
          dark: "#131316",
        },
        // accent: "#286dd4",
        accent: "#286dd4",
        overlay: {
          light: "rgba(255, 255, 255, 0.6)",
          dark: "rgba(0, 0, 0, 0.6)",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

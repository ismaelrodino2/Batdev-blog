


/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors");

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: "Raleway",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        primary: "#222222",

        secondary: "#74C2BD",

        accent: "#909699",

        neutral: "#f3f4f6",

        "base-100": "#F5F5F5",

        white: "#FFFFFF",

        info: "#3ABFF8",

        success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
      },
      dark: {
        primary: "#f5f5f5",
        secondary: "#74c2bd",
        accent: "#909699",
        neutral: "#1e2022",
        "base-100": "#1e2022",
        white: "#181a1b",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
      },
    }),
  ],
};

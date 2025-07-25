/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./blog/**/*.html",
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/**/*.md",
  ],
  safelist: ["text-h1", "md:text-h1", "lg:text-h1"],
  theme: {
    extend: {
      colors: {
        "military-green": "#596B58",
        "regal-blue": "#243c5a",
        "dashboard-white": "#FFFFFF",
        "dashboard-grey": "#F7F7F7",
        "profile-grey": "#EAEAEA",
        "dashboard-text-grey": "#909090",
        "activity-yellow": "#FCF5EA",
        "activity-grey": "#595959",
        "goal-blue": "#F2F4FE",
        "goal-red": "#FFDFDF",
        "goal-green": "#BACBB5",
        "border-yellow": "#F29D38",
        "devonus-orange": "#FF8C00",
        "devonus-black": "#242424",
        "devonus-grey": {
          50: "#f7f7f7",
          100: "#e1e1e1",
          200: "#cfcfcf",
          300: "#b1b1b1",
          400: "#9e9e9e",
          500: "#8b8b8b",
          600: "#6e6e6e",
          700: "#525252",
          800: "#383838",
          900: "#1c1c1c",
        },
        "devonus-green": "#B8F73E",
        "devonus-teal": "#1E5F74",
        "devonus-white": "#FFFFFF",
      },
      fontFamily: {
        garamond: ['"EB Garamond"', "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        archivoblack: ["Archivo Black", "sans-serif"],
        humane: ["Humane", "sans-serif"],
      },
      fontSize: {
        h1: "135px",
        "3xl": "2rem",
        "9xl": "8rem",
      },
      letterSpacing: {
        wider10: "0.1em",
      },
      boxShadow: {
        "devonus-green-sm": "0 1px 3px 0 rgba(184, 247, 62, 0.3)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      CabinetGrotesk: ['Cabinet Grotesk', "sans-serif"],
    },
    colors: {
      ...colors,
      transparent: "transparent",
      Mblack: "#343230",
      Mred: "#EC6A5C",
    },
    screens: {
      xxs: "375px",
      xx: "425px",
      ss: "480px",
      xs: "576px",
      minH650: { raw: "(min-height: 650px) and (max-width: 576px)" },
      minW1600: { raw: "(min-width: 1600px)" },
      minW1800: { raw: "(min-width: 1800px)" },
      minW2000: { raw: "(min-width: 2000px)" },
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};

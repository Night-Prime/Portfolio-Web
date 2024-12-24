/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f3e6",
        highlight: "#FC703B",
      },
      fontFamily: {
        header: ["Oxygen", "sans-serif"],
        paragraph: ["Cormorant Garamond", "serif"],
        highlight: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [],
};

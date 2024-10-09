/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Add paths for React (JS/TSX) files
  ],
  theme: {
    extend: {
      fontFamily: {
        Flux: ["Afacad Flux", "sans-serif"],
        SF: ["SF Pro Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};

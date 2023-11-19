/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },

    extend: {
      colors: {
        skyblue: "#38bdf8",
        lightblue: "#c6e9f7",
        darkblue: "#0f172a",
        bg: "#f4f5ff",
      },
    },
  },
  plugins: [],
};

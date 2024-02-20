/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      abril: ["Abril FatFace"],
    },
    extend: {
      colors: {
        Linen: "#FFF4E9",
        lightBrown: "#FFD5A6",
        deepBrown: "#CF7500",
      },
    },
  },

  plugins: [],
};

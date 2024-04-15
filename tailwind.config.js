/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: { xs: "400px" },
      colors: {
        primary: {
          DEFAULT: "#2a8dca",
          100: "#d4e8f4",
          200: "#aad1ea",
          300: "#7fbbdf",
          400: "#55a4d5",
          500: "#2a8dca",
          600: "#2271a2",
          700: "#195579",
          800: "#113851",
          900: "#081c28",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};

// blue: {
//     100: "#d4e8f4",
//     200: "#aad1ea",
//     300: "#7fbbdf",
//     400: "#55a4d5",
//     500: "#2a8dca",
//     600: "#2271a2",
//     700: "#195579",
//     800: "#113851",
//     900: "#081c28"
// },

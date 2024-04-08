/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1cd6ab",
          100: "#d2f7ee",
          200: "#a4efdd",
          300: "#77e6cd",
          400: "#49debc",
          500: "#1cd6ab",
          600: "#16ab89",
          700: "#118067",
          800: "#0b5644",
          900: "#062b22",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};

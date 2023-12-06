/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d2e5f7",
          200: "#a4cbef",
          300: "#77b2e6",
          400: "#4998de",
          500: "#1c7ed6",
          600: "#1665ab",
          700: "#114c80",
          800: "#0b3256",
          900: "#06192b",
        },
      },
    },
  },
  plugins: [],
};

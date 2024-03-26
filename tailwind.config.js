/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
      100: "#d2f7e1",
      200: "#a4efc3",
      300: "#77e6a5",
      400: "#49de87",
      500: "#1cd6ab",
      600: "#16ab54",
      700: "#11803f",
      800: "#0b562a",
      900: "#062b15"
        },
      },
    },
  },
  plugins: [],
};

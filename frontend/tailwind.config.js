/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Edu NSW ACT Cursive"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      keyframes: {
        "shrink-expand": {
          "0%": { width: "100%" },
          "50%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "shrink-expand": "shrink-expand 1s ease-in-out",
      },
    },
  },
  plugins: [],
}

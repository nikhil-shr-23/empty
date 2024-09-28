/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro-display': ['"SF Pro Display"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


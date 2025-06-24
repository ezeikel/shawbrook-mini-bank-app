/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        shawbrook: {
          pink: '#E10A93',
        },
      },
    },
  },
  plugins: [],
}


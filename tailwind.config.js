/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#5E3DE3",
        "primary-hover":"#7052ea",
      }
    },
  },
  plugins: [],
}


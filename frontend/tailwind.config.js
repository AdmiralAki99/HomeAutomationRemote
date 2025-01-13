/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        home: '#181818',
        primary: '#DA3B5E',
        noir: '#1C1C1C',
        menu_bg: '#1e1e2f',
        card_bg: '#2F2F2F',
        primary_text: '#FFFFFF'
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar' : {
          display: 'none'
        },
        '.no-scrollbar' : {
          'overflow-y': 'auto',
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none'  /* Firefox */
        }
      })
    })
  ],
}


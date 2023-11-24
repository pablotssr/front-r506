/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'a': '#37C191',
        'b': '#DB81CC',
        'c': '#C70039',
        'd': '#5DADE2',
        'e': '#5D6D7E',
        'f': '#F7DC6F',
        'g': '#58D68D',
        'h': '#DAF7A6',
        'i': '#F5B7B1',
        'j': {
          'start': '#FF1700', 
          'end': '#FFFFFF',   
          'gradient': 'linear-gradient(to bottom, #FF1700, #FFFFFF)' 
        },
      }
    },
  },
  plugins: [require("daisyui")],
}


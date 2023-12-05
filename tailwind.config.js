/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'lbl-blue': {
          '50': '#F2F6FA', 
          '100': '#E4ECF5', 
          '200': '#BCCBE3', 
          '300': '#9BADD4', 
          '400': '#5D6BB3', 
          '500': '#2E3092', 
          '600': '#262782', 
          '700': '#1A1C6E', 
          '800': '#101257', 
          '900': '#090A42', 
          '950': '#04052B'
      }
      }
    },
  },
  plugins: [],
}


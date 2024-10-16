/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,hbs,tsx}', './views/**/*.{html,js,hbs}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['nord'],
  },
};

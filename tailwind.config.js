/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,hbs,tsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['nord'],
  },
};

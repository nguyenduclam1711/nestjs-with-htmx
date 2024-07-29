/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,hbs}', './views/**/*.{html,js,hbs}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['nord'],
  },
};

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  presets: [require('./tailwind/presets/default.config.cjs')],
}

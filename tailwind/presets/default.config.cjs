/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        black: '#010409',
        /* Primary */
        'primary': '#197cfc', // Primary color
        'primary-focus': '#1063cd', // Primary color when focused
        'primary-content': '#cee5fe', // Foreground content color to use on primary color
        /* Secondary */
        'secondary': '#473ba0', // Secondary color
        'secondary-focus': '#392f80', // Secondary color when focused
        'secondary-content': '#ccc5fe', // Foreground content color to use on secondary color
        /* Base */
        'base-100': '#fff' // Base color of page, used for blank backgrounds
      }
    }
  }
};

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        black: '#010409',
        /* Primary */
        "primary": "var(--primary)",   // Primary color
        'primary-focus': "var(--primary-focus)", // Primary color when focused
        'primary-content': "var(--primary-content)", // Foreground content color to use on primary color
        /* Secondary */
        'secondary': "var(--secondary)", // Secondary color
        'secondary-focus': "var(--secondary-focus)", // Secondary color when focused
        'secondary-content': "var(--secondary-content)", // Foreground content color to use on secondary color
        'neutral': "var(--neutral)", // Neutral color
        /* Base */
        'base-100': "var(--base-100)", // Base color of page, used for blank backgrounds
        'base-200': "var(--base-200)", // Base color, a little darker
        'base-content': "var(--base-content)" // Foreground content color to use on base color
      }
    }
  }
};

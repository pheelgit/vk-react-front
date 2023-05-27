const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gap: {
        widgets: '12px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, theme, e, config }) {
      addComponents({
        '.widget': {
          backgroundColor: theme('colors.white'),
          padding: '1rem',
          borderRadius: '12px',
          outline: '1px solid #dce1e6',
        },
      });
    }),
  ],

  corePlugins: {
    // preflight: false,
  },
};

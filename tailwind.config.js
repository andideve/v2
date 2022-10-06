const { theme } = require('@andideve/ds-core');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: theme.screens,
    extend: {},
  },
  plugins: [],
};

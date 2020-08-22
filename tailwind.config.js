const tailwindCSSCustomForms = require('@tailwindcss/custom-forms');

module.exports = {
  purge: ['./src/**/*.js'],
  experimental: 'all',
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [tailwindCSSCustomForms],
};

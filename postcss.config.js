const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss,
    postcssPresetEnv,
    cssnano,
  ],
};

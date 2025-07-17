/**
 * @typedef {import('prettier').Config} Config
 */
// import type { Config } from "prettier";

module.exports = {
  printWidth: 120, // default: 80
  tabWidth: 2, // indent_size = 2 (default)
  useTabs: false, // indent_style = space (default)
  semi: false, // default: true
  singleQuote: true, // default: false
  trailingComma: 'es5', // default
  bracketSpacing: true, //default
  arrowParens: 'always', //default
  bracketSameLine: false, //default
  // parser: "flow",
  endOfLine: 'lf', // end_of_line = lf (default)
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
}
// export default prettierConfig;

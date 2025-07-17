// import path from 'node:path'

// const buildEslintCommand = (filenames) =>
//   `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  // '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
}

export default lintStagedConfig

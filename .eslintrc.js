/* global module */
module.exports = {
  plugins: [
    'import',
    'unused-imports',
  ],
  env: {
    browser: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  settings: {
    'import/parser': 'babel-eslint',
  },
  rules: {
    indent: [ 'error', 2, { SwitchCase: 1 }],
    'linebreak-style': [ 'error', 'unix' ],
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'always' ],
    // 'unused-imports/no-unused-imports': 'error', // causing error with require('....')
    'no-unused-vars': ['error', { 
      varsIgnorePattern: '[_e]',
      argsIgnorePattern: '[_e]'
    }]
  }
};

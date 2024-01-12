module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}', '**/*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['docs'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0,
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    semi: ['error', 'always'],
  },
};

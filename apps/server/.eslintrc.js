module.exports = {
  ...require('configs/eslint-server'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
  rules: {
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-console': 'off',
  },
}

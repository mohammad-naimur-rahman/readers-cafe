module.exports = {
  ...require('configs/eslint-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 0,
  },
}

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json'],
      },
    },
  },
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/react-in-jsx-scope': 0,
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.build',
    'coverage',
    'dist',
    '.turbo',
  ],
}

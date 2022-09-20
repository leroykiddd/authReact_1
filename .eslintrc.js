module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'node',
    'promise',
    'react',
    'standard',
    'react-hooks',
    'markdown',
    'prettier',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  env: {
    es6: true,
    node: true,
  },
  globals: {
    document: true,
    navigator: true,
    window: true,
    console: true,
    WebSocket: true,
    history: true,
    location: true,
    TweenMax: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'keyword-spacing': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'prefer-template': 'error',
    indent: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: '17.0.2',
    },
  },
};

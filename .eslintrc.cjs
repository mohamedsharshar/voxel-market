module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unknown-property': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'react/no-unescaped-entities': 'off'
  },
  globals: {
    test: 'readonly',
    expect: 'readonly',
    vi: 'readonly'
  }
};

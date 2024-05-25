module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['@nuxtjs', 'prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }]
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.vue']
    }
  ]
}

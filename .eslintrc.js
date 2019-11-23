module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:import/typescript',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'airbnb-base',
    '@vue/typescript',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'no-debugger': 'off',
    'no-console': 'off',
    'object-curly-newline': ['warn', {
      ObjectPattern: {
        multiline: true,
        minProperties: 2,
        consistent: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: 'never',
    }],
    indent: 'off',
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/order-in-components': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    // '@typescript-eslint/no-unused-vars': 'warn',

  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        paths: [
          './src',
        ],
      },
    },
  },
  // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  overrides: [
    {
      files: ['*.vue', '*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
};

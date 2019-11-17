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
  },
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': {
      'eslint-import-resolver-babel-module': { },
    },
  },
};

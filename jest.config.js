module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/*.spec.(js|ts)',
  ],
  moduleNameMapper: {
    'components(.*)$': '<rootDir>/src/components/$1',
  },
};

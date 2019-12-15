module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['module-resolver', {
      root: [
        './src',
      ],
      alias: {
        components: './src/components',
        store: './src/store',
        types: './src/types',
      },
      extensions: [
        '.js',
        '.ts',
        '.vue',
      ],
    }],
  ],
};

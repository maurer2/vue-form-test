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
      },
      extensions: [
        '.js',
        '.ts',
        '.vue',
      ],
    }],
  ],
};

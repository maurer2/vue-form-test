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
        components: './components',
      },
      extensions: [
        '.js',
        '.ts',
        '.vue',
      ],
    }],
  ],
};

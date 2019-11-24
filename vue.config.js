module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/variables.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': './src',
      },
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
  },
};

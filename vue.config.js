const path = require('path');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import './src/variables.scss';
          @import './src/mixins.scss';
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./src/components'),
        path.resolve('./node_modules'),
      ],
      alias: {
        components: path.resolve(__dirname, 'src/components'),
      },
      extensions: [
        '.ts', '.vue', '.js',
      ],
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
  },
};

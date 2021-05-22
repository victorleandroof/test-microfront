const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  filenameHashing: false,
  publicPath: '/news/public',

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {}
  },

  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new AssetsPlugin({
        filename: '../server/src/assets.json',
        useCompilerPath: false
      })
    ]
  },

  transpileDependencies: [
    'vuetify'
  ]
};

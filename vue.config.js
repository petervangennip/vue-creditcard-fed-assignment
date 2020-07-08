var path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  chainWebpack: (config) => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  runtimeCompiler: true,
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
    },
  },
};

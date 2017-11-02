function mergeConfig(options) {

  const webpack = require('webpack');
  const path = require('path');
  const fs = require('fs');

  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const DefinePlugin = require('webpack/lib/DefinePlugin');
  const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

  const METADATA = Object.assign({
    jsSourceMap: 'cheap-source-map',
  }, options.metaData);

  const config = {
    performance: {
      hints: false
    },
    devtool: METADATA.jsSourceMap,
    entry:  {
      'sampleApp': [
        './src/index.js'
      ]
    },
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[id].[chunkhash:8].js',  // The name for non-entry chunks
      path: path.resolve(__dirname, 'dist/'),
      pathinfo: false
    },
    module: {
      rules: [
        {
          test: /src\/.*\.(js|jsx)$/,
          use: [
            {
              'loader': 'babel-loader',
              'options': {
                'cacheDirectory': true
              }
            }
          ],
          exclude: ['node_modules']
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index-template.html',
        filename: 'index.html',
        inject: false
      }),
      new DefinePlugin({ 'process.env': {
        'HMR': process.argv.join('').indexOf('hot') > -1
      }}),
      new LoaderOptionsPlugin(options.loaderOptions)
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  config.devServer = {
    contentBase: path.resolve(__dirname, 'dev/'),
    port: 3000,
    host: 'localhost'
  };

  return config;
}

module.exports.mergeConfig = mergeConfig;

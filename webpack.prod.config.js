const configOptions = {
  metaData: {
    jsSourceMap: 'source-map'
  },
  loaderOptions: {
    debug: false,
    minimize: true
  }
};

module.exports =  require('./webpack.config.js').mergeConfig(configOptions);

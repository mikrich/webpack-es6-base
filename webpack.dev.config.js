const configOptions = {
  metaData: {
    jsSourceMap: 'cheap-module-source-map',
  },
  loaderOptions: {
    debug: true
  }
};

module.exports =  require('./webpack.config.js').mergeConfig(configOptions);

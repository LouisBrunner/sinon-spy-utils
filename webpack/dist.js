const webpackMerge = require('webpack-merge');
const commonConfig = require('./core.js');

module.exports = webpackMerge(commonConfig(), {
  entry: {
    'sinon-spy-utils': './src/index.js',
  },
  output: {
    path: `${__dirname}/../dist`,
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'SinonSpyUtils',
  },
  externals: {
    // Use external version of Sinon.js
    sinon: 'sinon',
  },
});

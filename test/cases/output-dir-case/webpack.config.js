const path = require('path');

const ManifestReplacePlugin = require('../../../');

module.exports = {
  entry: {
    'index': './index.js',
  },
  output: {
    publicPath: '',
    filename: '[name]-[chunkhash].js',
  },
  plugins: [
    new ManifestReplacePlugin({
      include: path.resolve(__dirname),
	  outputDir: path.join(__dirname, '../../js/output-dir-case')
    }),
  ]
};

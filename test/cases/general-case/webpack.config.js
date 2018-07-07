const path = require('path');

const ManifestReplacePlugin = require('../../../');

module.exports = {
  entry: {
    'index': './index.js',
  },
  output: {
    filename: '[name]-[chunkhash].js',
  },
  plugins: [
    new ManifestReplacePlugin({
      include: path.resolve(__dirname),
    }),
  ]
};

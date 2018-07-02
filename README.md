# webpack-manifest-replace-plugin 

Webpack plugin to replace assets path using manifest file.

## Install

```shell
npm install --save-dev webpack-manifest-replace-plugin
```

## Usage

```javascript
var ManifestReplacePlugin = require('webpack-manifest-replace-plugin');

module.exports = {
  ...
  plugins: [
    new ManifestReplacePlugin({
      basedir: path.resolve(__dirname, 'src'),
      test: /\.(jsp|htm|html)$/,
    })
  ]
  ...
};
```

## License

MIT © 2017 [unchai](https://github.com/unchai)

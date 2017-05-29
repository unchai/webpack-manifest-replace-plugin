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
      src: '**/*.+(jsp|html|htm)',
      manifestFilename: 'manifest.json'
    });
  ]
  ...
};
```

## License

MIT © 2017 [unchai](https://github.com/unchai)

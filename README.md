# webpack-manifest-replace-plugin 

[![npm](https://img.shields.io/npm/v/webpack-manifest-replace-plugin.svg)](https://www.npmjs.com/package/webpack-manifest-replace-plugin)
[![download](https://img.shields.io/npm/dm/webpack-manifest-replace-plugin.svg)](https://npmcharts.com/compare/webpack-manifest-replace-plugin?minimal=true)
[![Build Status](https://img.shields.io/travis/unchai/webpack-manifest-replace-plugin.svg)](https://travis-ci.org/unchai/webpack-manifest-replace-plugin)
[![deps](https://david-dm.org/unchai/webpack-manifest-replace-plugin.svg)](https://david-dm.org/unchai/webpack-manifest-replace-plugin)


Webpack plugin to replace assets path using manifest context.

### Install

```shell
# for webpack 4
npm install --save-dev webpack-manifest-replace-plugin

# for webpack 3
npm install --save-dev webpack-manifest-replace-plugin@0.0.4
```

### Usage

> :warning: `webpack-manifest-replace-plugin >= 1.0.0` is no longer required `manifest.json` file.

```javascript
const ManifestReplacePlugin = require('webpack-manifest-replace-plugin');

module.exports = {
  ...
  plugins: [
    new ManifestReplacePlugin({
      include: path.resolve(__dirname, 'src'),
      test: /\.(jsp|php|htm|html)$/,
    })
  ]
  ...
};
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`include`**|`{String}`|`undefined `| Files to include. |
|**`test`**|`{Pattern}`|`/\.(htm\|html)$/`| Test to match files against. |
|**`outputDir`**|`{String}`|`Webpack output.path`| Output directory for replaced files. |

## License

MIT © 2017 [unchai](https://github.com/unchai)

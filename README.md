# webpack-manifest-replace-plugin 

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

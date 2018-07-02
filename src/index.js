const path = require('path');

const fs = require('fs');

const glob = require('glob');

const pluginName = 'webpack-manifest-replace-plugin';

function replaceString(manifest, file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw new Error(err);

    let result = data;
    for (const prop in manifest) {
      if (Object.prototype.hasOwnProperty.call(manifest, prop)) {
        result = result.replace(new RegExp(prop, 'gm'), manifest[prop]);
      }
    }

    fs.writeFile(file, result, 'utf8', (err) => {
      if (err) throw new Error(err);
    });
  });
}

function ManifestReplacePlugin(options) {
  this.pluginOptions = options;
}

ManifestReplacePlugin.prototype.apply = function(compiler) {
  const pluginOptions = this.pluginOptions;

  compiler.hooks.afterEmit.tap(pluginName, () => {
    const manifestFilePath = path.join(
      compiler.options.output.path,
      pluginOptions.manifestFilename
    );
    const manifest = require(manifestFilePath);

    glob(
      path.join(pluginOptions.basedir, pluginOptions.src),
      { ignore: [manifestFilePath] },
      (err, files) => {
        files.forEach((file) => {
          replaceString(manifest, file);
        });
      }
    );
  });
};

module.exports = ManifestReplacePlugin;

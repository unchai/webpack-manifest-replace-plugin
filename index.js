var path = require('path');
var glob = require('glob');
var fs = require('graceful-fs');

function replaceString(manifest, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) return console.log(err);

    var result = data;
    for (var prop in manifest) {
      result = result.replace(new RegExp(prop, 'gm'), manifest[prop]);
    }

    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

function ManifestReplacePlugin(options) {
  this.pluginOptions = options;
}

ManifestReplacePlugin.prototype.apply = function (compiler) {
  var pluginOptions = this.pluginOptions;

  compiler.plugin('done', function () {
    var manifest = require(path.join(this.options.output.path, pluginOptions.manifestFilename));

    glob(path.join(pluginOptions.basedir, pluginOptions.src), function (err, files) {
      files.forEach(function (file) {
        replaceString(manifest, file);
      });
    });
  });
};

module.exports = ManifestReplacePlugin;

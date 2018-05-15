var path = require("path");
var glob = require("glob");
var fs = require("graceful-fs");

function replaceString(manifest, file) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) return console.log(err);

    var result = data;
    for (var prop in manifest) {
      result = result.replace(new RegExp(prop, "gm"), manifest[prop]);
    }

    fs.writeFile(file, result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
}

function ManifestReplacePlugin(options) {
  this.pluginOptions = options;
}

ManifestReplacePlugin.prototype.apply = function(compiler) {
  var pluginOptions = this.pluginOptions;

  compiler.plugin("after-emit", function(compilation, callback) {
    var manifestFilePath = path.join(this.options.output.path, pluginOptions.manifestFilename);
    var manifest = require(manifestFilePath);

    glob(path.join(pluginOptions.basedir, pluginOptions.src), {"ignore": [manifestFilePath]}, function(err, files) {
      files.forEach(function(file) {
        replaceString(manifest, file);
      });
    });

    callback();
  });
};

module.exports = ManifestReplacePlugin;

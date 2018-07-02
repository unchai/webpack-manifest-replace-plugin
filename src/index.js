import path from 'path';

import glob from 'glob';

import { buildChunkMap, replaceSource } from './lib';

const pluginName = 'manifest-replace-plugin';

class ManifestReplacePlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        test: /\.html$/,
      },
      options
    );

    if (!this.options.basedir) {
      throw new Error(`[${pluginName}] options.basedir is required!`);
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      const chunkMap = buildChunkMap(compilation);

      const relativeTargetDir = this.options.output
        ? path.relative(compiler.options.output.path, this.options.output)
        : '';

      glob
        .sync(path.join(this.options.basedir, '**/**'), { nodir: true })
        .filter((file) => this.options.test.test(path.basename(file)))
        .forEach((file) => {
          const source = replaceSource(file, chunkMap);

          const assetKey = path.join(
            relativeTargetDir,
            path.relative(this.options.basedir, file)
          );

          compilation.assets[assetKey] = {
            source: () => source,
            size: () => source.length,
          };
        });
    });
  }
}

module.exports = ManifestReplacePlugin;

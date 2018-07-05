import path from 'path';

import glob from 'glob';

import { buildChunkMap, replaceSource } from './lib';

const pluginName = 'manifest-replace-plugin';

class ManifestReplacePlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        test: /\.(htm|html)$/,
      },
      options
    );

    if (!this.options.include) {
      throw new Error(`[${pluginName}] options.include is required!`);
    }
  }

  apply(compiler) {
    const { options } = this;

    compiler.hooks.emit.tap(pluginName, (compilation) => {
      const chunkMap = buildChunkMap(compilation);
      const relativeTargetDir = options.outputDir
        ? path.relative(compiler.options.output.path, options.outputDir)
        : '';

      glob
        .sync(path.join(options.include, '**/**'), { nodir: true })
        .filter((file) => options.test.test(path.basename(file)))
        .forEach((file) => {
          const source = replaceSource(file, chunkMap);

          const assetKey = path.join(
            relativeTargetDir,
            path.relative(options.include, file)
          );

          // eslint-disable-next-line no-param-reassign
          compilation.assets[assetKey] = {
            source: () => source,
            size: () => source.length,
          };
        });
    });
  }
}

module.exports = ManifestReplacePlugin;

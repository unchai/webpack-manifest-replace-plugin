import path from 'path';

import fs from 'fs';

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
      const outputDir = options.outputDir
        ? options.outputDir
        : compiler.options.output.path
      glob
        .sync(path.join(options.include, '**/**'), { nodir: true })
        .filter((file) => options.test.test(path.basename(file)))
        .forEach((file) => {
          const source = replaceSource(file, chunkMap);

          const outputPath = path.join(outputDir, path.relative(options.include, file));
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
          }

          fs.writeFile(outputPath, source, err => {
            if (err) console.error(err);
		  });
        });
    });
  }
}

module.exports = ManifestReplacePlugin;

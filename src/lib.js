import path from 'path';
import fs from 'fs';

export function buildChunkMap(compilation) {
  const publicPath = compilation.mainTemplate.getPublicPath({
    hash: compilation.hash,
  });

  const chunkMap = new Map();
  for (const chunk of compilation.chunks) {
    for (const file of chunk.files) {
      chunkMap.set(
        `${publicPath}${chunk.name}${path.extname(file)}`,
        `${publicPath}${file}`
      );
    }
  }

  return chunkMap;
}

export function replaceSource(file, chunkMap) {
  let source = fs.readFileSync(file, 'utf8');

  for (const key of chunkMap.keys()) {
    source = source.replace(new RegExp(key, 'gm'), chunkMap.get(key));
  }

  return source;
}

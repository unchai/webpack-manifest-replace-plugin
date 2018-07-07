import path from 'path';
import fs from 'fs';

import webpack from 'webpack';

describe('Tests', () => {
  fs.readdirSync(path.join(__dirname, 'cases')).forEach((testCase) => {
    it(testCase, (done) => {
      const testDir = path.join(__dirname, 'cases', testCase);
      const outputDir = path.join(__dirname, 'js', testCase);
      const configFile = path.join(testDir, 'webpack.config.js');

      // eslint-disable-next-line import/no-dynamic-require,global-require
      const webpackConfig = require(configFile);
      webpackConfig.context = testDir;
      webpackConfig.output.path = outputDir;

      webpack(webpackConfig, (err, stats) => {
        if (err) {
          done(err);
          return;
        }

        if (stats.hasErrors()) {
          done(new Error(stats.toString()));
          return;
        }

        const expectedDir = path.join(testDir, 'expected');
        fs.readdirSync(expectedDir).forEach((expectedFile) => {
          const expected = fs.readFileSync(path.resolve(expectedDir, expectedFile), 'utf8');
          const actual = fs.readFileSync(path.resolve(outputDir, expectedFile), 'utf8');

          expect(actual).toEqual(expected);
        });
      });

      done();
    });
  })
});

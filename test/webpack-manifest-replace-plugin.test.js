const assert = require('assert');
const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

describe('Tests', () => {
  fs.readdirSync(path.join(__dirname, 'cases')).forEach((testCase) => {
    it(testCase, () => {
      const testDir = path.join(__dirname, 'cases', testCase);
      const outputDir = path.join(__dirname, 'js', testCase);
      const configFile = path.join(testDir, 'webpack.config.js');

      // eslint-disable-next-line import/no-dynamic-require,global-require
      const webpackConfig = require(configFile);
      webpackConfig.context = testDir;
      webpackConfig.output.path = outputDir;

      webpack(webpackConfig, (err, stats) => {
        if (err) {
          throw err;
        }

        if (stats.hasErrors()) {
          throw new Error(stats.toString());
        }

        const expectedDir = path.join(testDir, 'expected');
        fs.readdirSync(expectedDir).forEach((expectedFile) => {
          const expected = fs.readFileSync(path.resolve(expectedDir, expectedFile), 'utf8');
          const actual = fs.readFileSync(path.resolve(outputDir, expectedFile), 'utf8');

          assert.strictEqual(actual, expected);
        });
      });
    });
  })
});

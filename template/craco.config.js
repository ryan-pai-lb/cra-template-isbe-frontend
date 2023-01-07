// const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const CracoEsbuildPlugin = require('craco-esbuild');
const path = require('path');

module.exports = function({env, ...other}) {
	return {
    reactScriptsVersion: "react-scripts",
    plugins: [{ plugin: CracoEsbuildPlugin }],
    webpack: {
      alias: {
        '@': path.join(path.resolve(__dirname, './src')),
      }
    }
  }
}
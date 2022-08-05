// const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const path = require('path');

module.exports = function({env, ...other}) {
	return {
    reactScriptsVersion: "react-scripts",
    webpack: {
      alias: {
        '@': path.join(path.resolve(__dirname, './src')),
      }
    }
  }
}
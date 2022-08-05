const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy-api',
    createProxyMiddleware({
      target: 'https://api.beta.metasens.io',
      "pathRewrite": {
        "^/proxy-api": ""
      },
      changeOrigin: true,
    })
  );
};
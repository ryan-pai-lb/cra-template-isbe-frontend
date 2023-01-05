const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy-api',
    createProxyMiddleware({
      target: 'https://crudapi.co.uk/api',
      "pathRewrite": {
        "^/proxy-api": ""
      },
      changeOrigin: true,
    })
  );
};
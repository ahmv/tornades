const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
    '/api',
    {
      target: 'http://localhost:1337',
      changeOrigin: true,
    })
  );  
  app.use(
    createProxyMiddleware(
    '/uploads',
    {
      target: 'http://localhost:1337',
      changeOrigin: true,
    })
  );
    app.use('/graphql', createProxyMiddleware({ target: 'http://localhost:1337', changeOrigin: true }));  
};



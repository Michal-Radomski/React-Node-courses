const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: "http://localhost:5000",
  changeOrigin: false,
};

module.exports = function (app) {
  app.use("/auth/*", createProxyMiddleware(proxy));
  app.use("/api/*", createProxyMiddleware(proxy));
};

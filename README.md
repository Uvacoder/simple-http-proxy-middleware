# simple-http-proxy-middleware

HTTP proxy middleware that works with the Typescrypt version of Create React App. Inspired by https://github.com/chimurai/http-proxy-middleware.

## Usage with Create React App

Add the following code in `src/setupProxy.js`.
```
const { createProxyMiddleware } = require("simple-http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
    })
  );
};
```

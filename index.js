const http = require("http");
const url = require("url");

module.exports.createProxyMiddleware = function createProxyMiddleware(opts) {
  opts = opts || {};
  opts.target = opts.target || "";
  opts.changeOrigin = opts.changeOrigin || false;
  opts.options = opts.options || {};

  const target = url.parse(opts.target);

  return (req, res, next) => {
    const options = {
      host: target.hostname,
      port: target.port,
      method: req.method,
      protocol: target.protocol,
      path: req.originalUrl,
      headers: req.headers,
    };
    Object.keys(opts.options).forEach((key) => {
      options[key] = opts.options[key];
    });

    const request = http.request(options, (response) => {
      Object.keys(response.headers).forEach((key) => {
        res.set(key, response.headers[key]);
      });

      if (opts.changeOrigin) {
        res.set(
          "Host",
          !!target.port ? target.hostname + ":" + target.port : target.hostname
        );
      }

      res.status(response.statusCode);
      response.setEncoding("utf8");
      response.pipe(res);
    });

    if (req.body) {
      request.write(req.body);
    }
    request.end();
  };
};

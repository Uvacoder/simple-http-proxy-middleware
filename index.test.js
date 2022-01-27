const { createProxyMiddleware } = require("./index");

test("", () => {
  const middleware = createProxyMiddleware({ target: "http://example.com" });
  expect(middleware).toEqual(expect.any(Function));
  expect(middleware.length).toBe(3);
});

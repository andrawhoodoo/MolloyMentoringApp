const { parse } = require("url");
var counter = 0;

module.exports = class Router {
  constructor() {
    this.routes = [];
  }
  add(method, url, handler) {
    this.routes.push({ method, url, handler });
  }
  resolve(context, request) {
    console.log(decodeURIComponent(request.url));
    decodeURIComponent(request.url);
  }
};

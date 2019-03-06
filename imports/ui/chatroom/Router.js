const { parse } = require("url");

module.exports = class Router {
  constructor() {
    this.routes = [];
  }
  add(method, url, handler) {
    this.routes.push({ method, url, handler });
  }

  resolve(context, { request, response }, handler) {
    let URLpath = request.url;
    let METHODpath = request.method;

    for (let { method, url, handler } of this.routes) {
      if (method == METHODpath && url == URLpath) {
        return handler(context, url, { request, response });
      }
    }
    return null;
  }
};

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SegmentClient: true
};
Object.defineProperty(exports, "SegmentClient", {
  enumerable: true,
  get: function () {
    return _analytics.SegmentClient;
  }
});

var _client = require("./client");

Object.keys(_client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _client[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _client[key];
    }
  });
});

var _plugin = require("./plugin");

Object.keys(_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _plugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _plugin[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _mapTransform = require("./mapTransform");

Object.keys(_mapTransform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mapTransform[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapTransform[key];
    }
  });
});

var _analytics = require("./analytics");
//# sourceMappingURL=index.js.map
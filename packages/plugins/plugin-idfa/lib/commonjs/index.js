"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IdfaPlugin = require("./IdfaPlugin");

Object.keys(_IdfaPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IdfaPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IdfaPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map
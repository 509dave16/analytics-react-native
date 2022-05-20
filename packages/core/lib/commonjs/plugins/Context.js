"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InjectContext = void 0;

var _plugin = require("../plugin");

var _types = require("../types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InjectContext extends _plugin.PlatformPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _types.PluginType.before);
  }

  execute(event) {
    return { ...event,
      context: { ...event.context,
        ...this.analytics.context.get()
      }
    };
  }

}

exports.InjectContext = InjectContext;
//# sourceMappingURL=Context.js.map
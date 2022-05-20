"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirebasePlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _identify = _interopRequireDefault(require("./methods/identify"));

var _screen = _interopRequireDefault(require("./methods/screen"));

var _track = _interopRequireDefault(require("./methods/track"));

var _reset = _interopRequireDefault(require("./methods/reset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FirebasePlugin extends _analyticsReactNative.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.destination);

    _defineProperty(this, "key", 'Firebase');
  }

  identify(event) {
    (0, _identify.default)(event);
    return event;
  }

  track(event) {
    (0, _track.default)(event);
    return event;
  }

  screen(event) {
    (0, _screen.default)(event);
    return event;
  }

  reset() {
    (0, _reset.default)();
  }

}

exports.FirebasePlugin = FirebasePlugin;
//# sourceMappingURL=FirebasePlugin.js.map
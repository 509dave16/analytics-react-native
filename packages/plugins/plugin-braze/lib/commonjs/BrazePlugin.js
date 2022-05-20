"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrazePlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _identify = _interopRequireDefault(require("./methods/identify"));

var _track = _interopRequireDefault(require("./methods/track"));

var _flush = _interopRequireDefault(require("./methods/flush"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BrazePlugin extends _analyticsReactNative.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.destination);

    _defineProperty(this, "key", 'Braze');
  }

  identify(event) {
    var _this$analytics;

    const currentUserInfo = (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.userInfo.get(); //check to see if anything has changed.
    //if it hasn't changed don't send event

    if ((currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId) === event.userId && (currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.anonymousId) === event.anonymousId && (currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.traits) === event.traits) {
      let integrations = event.integrations;

      if (integrations !== undefined) {
        integrations[this.key] = false;
      }
    } else {
      (0, _identify.default)(event);
    }

    return event;
  }

  track(event) {
    (0, _track.default)(event);
    return event;
  }

  flush() {
    (0, _flush.default)();
  }

}

exports.BrazePlugin = BrazePlugin;
//# sourceMappingURL=BrazePlugin.js.map
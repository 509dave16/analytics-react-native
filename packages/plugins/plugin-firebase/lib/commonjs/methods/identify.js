"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _analytics = _interopRequireDefault(require("@react-native-firebase/analytics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async event => {
  await (0, _analytics.default)().setUserId(event.userId);

  if (event.traits) {
    await (0, _analytics.default)().setUserProperties(event.traits);
  }
};

exports.default = _default;
//# sourceMappingURL=identify.js.map
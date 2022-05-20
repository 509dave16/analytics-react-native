"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeAppboySdk = _interopRequireDefault(require("react-native-appboy-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  _reactNativeAppboySdk.default.requestImmediateDataFlush();
};

exports.default = _default;
//# sourceMappingURL=flush.js.map
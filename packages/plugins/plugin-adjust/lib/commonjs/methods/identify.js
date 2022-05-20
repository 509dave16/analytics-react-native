"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeAdjust = require("react-native-adjust");

var _default = event => {
  const userId = event.userId;

  if (userId && userId.length > 0) {
    _reactNativeAdjust.Adjust.addSessionPartnerParameter('user_id', userId);
  }

  const anonId = event.anonymousId;

  if (anonId && anonId.length > 0) {
    _reactNativeAdjust.Adjust.addSessionPartnerParameter('anonymous_id', anonId);
  }
};

exports.default = _default;
//# sourceMappingURL=identify.js.map
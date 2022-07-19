"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUUID = void 0;

var _nonSecure = require("nanoid/non-secure");

var _reactNative = require("react-native");

const getUUID = () => {
  // Currently the RN dev server does not allow to call synchronous methods via the bridge.
  // For that reason, we use nanoids in development and UUIDs (generated on the native side) in production.
  // More information at https://github.com/facebook/react-native/issues/26705
  if (__DEV__) {
    return (0, _nonSecure.nanoid)();
  }

  return _reactNative.NativeModules.AnalyticsReactNative.getUUIDSync();
};

exports.getUUID = getUUID;
//# sourceMappingURL=uuid.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsReactNativePluginIdfa = void 0;

var _reactNative = require("react-native");

/**
 * This module is just here to have a way to mock the Native Module of IDFA with Detox
 */
const AnalyticsReactNativePluginIdfa = _reactNative.Platform.select({
  default: {
    getTrackingAuthorizationStatus: () => {
      return Promise.reject('IDFA is only supported on iOS');
    }
  },
  ios: _reactNative.NativeModules.AnalyticsReactNativePluginIdfa
});

exports.AnalyticsReactNativePluginIdfa = AnalyticsReactNativePluginIdfa;
//# sourceMappingURL=AnalyticsReactNativePluginIdfa.js.map
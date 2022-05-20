"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsReactNativePluginIdfa = void 0;

var _types = require("./types");

const AnalyticsReactNativePluginIdfa = {
  getTrackingAuthorizationStatus: async () => {
    return {
      adTrackingEnabled: false,
      advertisingId: 'trackMeId',
      trackingStatus: _types.TrackingStatus.Denied
    };
  }
};
exports.AnalyticsReactNativePluginIdfa = AnalyticsReactNativePluginIdfa;
//# sourceMappingURL=AnalyticsReactNativePluginIdfa.e2e.mock.js.map
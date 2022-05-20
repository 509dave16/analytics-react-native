"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdfaPlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _IdfaEvents = require("./IdfaEvents");

var _AnalyticsReactNativePluginIdfa = require("./AnalyticsReactNativePluginIdfa");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  getTrackingAuthorizationStatus
} = _AnalyticsReactNativePluginIdfa.AnalyticsReactNativePluginIdfa;

class IdfaPlugin extends _analyticsReactNative.Plugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.enrichment);
  }

  configure(analytics) {
    this.analytics = analytics;
    this.getTrackingStatus(); // subscribe to IDFAQuery event
    // emitted when we prompt a user for permission

    _IdfaEvents.IdfaEvents.addListener('IDFAQuery', res => {
      var _this$analytics;

      this.getTrackingStatus();
      (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.track('IDFAQuery', res);
    });
  }

  getTrackingStatus() {
    getTrackingAuthorizationStatus().then(idfa => {
      var _this$analytics2;

      // update our context with the idfa data
      (_this$analytics2 = this.analytics) === null || _this$analytics2 === void 0 ? void 0 : _this$analytics2.context.set({
        device: { ...idfa
        }
      });
    }).catch(err => {
      console.warn(err);
    });
  }

}

exports.IdfaPlugin = IdfaPlugin;
//# sourceMappingURL=IdfaPlugin.js.map
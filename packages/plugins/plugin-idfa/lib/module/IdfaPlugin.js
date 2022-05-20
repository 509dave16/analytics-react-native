function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Plugin, PluginType } from '@segment/analytics-react-native';
import { IdfaEvents } from './IdfaEvents';
import { AnalyticsReactNativePluginIdfa } from './AnalyticsReactNativePluginIdfa';
const {
  getTrackingAuthorizationStatus
} = AnalyticsReactNativePluginIdfa;
export class IdfaPlugin extends Plugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.enrichment);
  }

  configure(analytics) {
    this.analytics = analytics;
    this.getTrackingStatus(); // subscribe to IDFAQuery event
    // emitted when we prompt a user for permission

    IdfaEvents.addListener('IDFAQuery', res => {
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
//# sourceMappingURL=IdfaPlugin.js.map
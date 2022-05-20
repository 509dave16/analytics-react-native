function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import identify from './methods/identify';
import track from './methods/track';
import flush from './methods/flush';
export class BrazePlugin extends DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

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
      identify(event);
    }

    return event;
  }

  track(event) {
    track(event);
    return event;
  }

  flush() {
    flush();
  }

}
//# sourceMappingURL=BrazePlugin.js.map
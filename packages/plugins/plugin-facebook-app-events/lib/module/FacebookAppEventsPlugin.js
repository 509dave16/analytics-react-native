function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import track from './methods/track';
import screen from './methods/screen';
import { Settings } from 'react-native-fbsdk-next';

const isFBPluginSettings = settings => {
  return typeof settings === 'object' && 'trackScreenEvent' in Object.keys(settings);
};

export class FacebookAppEventsPlugin extends DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

    _defineProperty(this, "key", 'Facebook App Events');

    _defineProperty(this, "trackScreens", false);
  }

  async configure(analytics) {
    var _this$analytics;

    this.analytics = analytics;
    let adTrackingEnabled = (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.adTrackingEnabled.get();
    this.analytics.adTrackingEnabled.onChange(value => {
      Settings.setAdvertiserTrackingEnabled(value);
    }); //you will likely need consent first
    //this example assumes consentManager plugin is used

    await Settings.initializeSDK();

    if (adTrackingEnabled) {
      try {
        await Settings.setAdvertiserTrackingEnabled(true);
      } catch (e) {
        //handle error
        console.log('Add Tracking Enabled Error', e);
      }
    } //default facebook data processing options


    Settings.setDataProcessingOptions([], 0, 0);
  }

  update(settings, _) {
    const fbSettings = settings.integrations[this.key];

    if (isFBPluginSettings(fbSettings)) {
      this.trackScreens = fbSettings.trackScreenEvent;
    }
  }

  track(event) {
    track(event);
    return event;
  }

  screen(event) {
    if (this.trackScreens === true) {
      screen(event);
    }

    return event;
  }

}
//# sourceMappingURL=FacebookAppEventsPlugin.js.map
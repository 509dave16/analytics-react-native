"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FacebookAppEventsPlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _track = _interopRequireDefault(require("./methods/track"));

var _screen = _interopRequireDefault(require("./methods/screen"));

var _reactNativeFbsdkNext = require("react-native-fbsdk-next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isFBPluginSettings = settings => {
  return typeof settings === 'object' && 'trackScreenEvent' in Object.keys(settings);
};

class FacebookAppEventsPlugin extends _analyticsReactNative.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.destination);

    _defineProperty(this, "key", 'Facebook App Events');

    _defineProperty(this, "trackScreens", false);
  }

  async configure(analytics) {
    var _this$analytics;

    this.analytics = analytics;
    let adTrackingEnabled = (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.adTrackingEnabled.get();
    this.analytics.adTrackingEnabled.onChange(value => {
      _reactNativeFbsdkNext.Settings.setAdvertiserTrackingEnabled(value);
    }); //you will likely need consent first
    //this example assumes consentManager plugin is used

    await _reactNativeFbsdkNext.Settings.initializeSDK();

    if (adTrackingEnabled) {
      try {
        await _reactNativeFbsdkNext.Settings.setAdvertiserTrackingEnabled(true);
      } catch (e) {
        //handle error
        console.log('Add Tracking Enabled Error', e);
      }
    } //default facebook data processing options


    _reactNativeFbsdkNext.Settings.setDataProcessingOptions([], 0, 0);
  }

  update(settings, _) {
    const fbSettings = settings.integrations[this.key];

    if (isFBPluginSettings(fbSettings)) {
      this.trackScreens = fbSettings.trackScreenEvent;
    }
  }

  track(event) {
    (0, _track.default)(event);
    return event;
  }

  screen(event) {
    if (this.trackScreens === true) {
      (0, _screen.default)(event);
    }

    return event;
  }

}

exports.FacebookAppEventsPlugin = FacebookAppEventsPlugin;
//# sourceMappingURL=FacebookAppEventsPlugin.js.map
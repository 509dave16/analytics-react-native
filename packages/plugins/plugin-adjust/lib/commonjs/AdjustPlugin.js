"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdjustPlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _reactNativeAdjust = require("react-native-adjust");

var _identify = _interopRequireDefault(require("./methods/identify"));

var _track = _interopRequireDefault(require("./methods/track"));

var _reset = _interopRequireDefault(require("./methods/reset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AdjustPlugin extends _analyticsReactNative.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.destination);

    _defineProperty(this, "key", 'Adjust');

    _defineProperty(this, "settings", null);

    _defineProperty(this, "hasRegisteredCallback", false);
  }

  update(settings, _) {
    const adjustSettings = settings.integrations[this.key];

    if (!adjustSettings) {
      return;
    }

    this.settings = adjustSettings;
    const environment = this.settings.setEnvironmentProduction ? 'production' : 'sandbox';
    const adjustConfig = new _reactNativeAdjust.AdjustConfig(this.settings.appToken, environment);

    if (this.hasRegisteredCallback === false) {
      adjustConfig.setAttributionCallbackListener(attribution => {
        var _this$analytics;

        let trackPayload = {
          provider: 'Adjust',
          trackerToken: attribution.trackerToken,
          trackerName: attribution.trackerName,
          campaign: {
            source: attribution.network,
            name: attribution.campaign,
            content: attribution.clickLabel,
            adCreative: attribution.creative,
            adGroup: attribution.adgroup
          }
        };
        (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.track('Install Attributed', trackPayload);
      });
      this.hasRegisteredCallback = true;
    }

    const bufferingEnabled = this.settings.setEventBufferingEnabled;

    if (bufferingEnabled) {
      adjustConfig.setEventBufferingEnabled(bufferingEnabled);
    }

    const useDelay = this.settings.setDelay;

    if (useDelay) {
      const delayTime = this.settings.delayTime;

      if (delayTime) {
        adjustConfig.setDelayStart(delayTime);
      }
    }

    _reactNativeAdjust.Adjust.create(adjustConfig);
  }

  identify(event) {
    (0, _identify.default)(event);
    return event;
  }

  track(event) {
    (0, _track.default)(event, this.settings);
    return event;
  }

  reset() {
    (0, _reset.default)();
  }

}

exports.AdjustPlugin = AdjustPlugin;
//# sourceMappingURL=AdjustPlugin.js.map
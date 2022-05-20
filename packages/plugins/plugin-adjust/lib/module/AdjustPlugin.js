function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import { Adjust, AdjustConfig } from 'react-native-adjust';
import identify from './methods/identify';
import track from './methods/track';
import reset from './methods/reset';
export class AdjustPlugin extends DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

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
    const adjustConfig = new AdjustConfig(this.settings.appToken, environment);

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

    Adjust.create(adjustConfig);
  }

  identify(event) {
    identify(event);
    return event;
  }

  track(event) {
    track(event, this.settings);
    return event;
  }

  reset() {
    reset();
  }

}
//# sourceMappingURL=AdjustPlugin.js.map
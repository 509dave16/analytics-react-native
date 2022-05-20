function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import { Mixpanel } from 'mixpanel-react-native';
import identify from './methods/identify';
import screen from './methods/screen';
import group from './methods/group';
import alias from './methods/alias';
import track from './methods/track';
export const EU_SERVER = 'api.eu.mixpanel.com';
export class MixpanelPlugin extends DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

    _defineProperty(this, "key", 'Mixpanel');

    _defineProperty(this, "trackScreens", false);

    _defineProperty(this, "mixpanel", void 0);

    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "isInitialized", () => this.mixpanel !== undefined && this.settings !== undefined);
  }

  update(settings, _) {
    const mixpanelSettings = settings.integrations[this.key];

    if (mixpanelSettings === undefined || this.mixpanel !== undefined) {
      return;
    }

    if (mixpanelSettings.token.length === 0) {
      return;
    }

    this.mixpanel = new Mixpanel(mixpanelSettings.token);
    this.mixpanel.init();
    this.settings = mixpanelSettings;

    if (mixpanelSettings.enableEuropeanEndpoint) {
      var _this$mixpanel;

      (_this$mixpanel = this.mixpanel) === null || _this$mixpanel === void 0 ? void 0 : _this$mixpanel.setServerURL(EU_SERVER);
    }
  }

  identify(event) {
    if (this.isInitialized()) {
      identify(event, this.mixpanel, this.settings);
    }

    return event;
  }

  track(event) {
    const eventName = event.event;
    const properties = event.properties;

    if (this.isInitialized()) {
      track(eventName, properties, this.settings, this.mixpanel);
    }

    return event;
  }

  screen(event) {
    if (this.isInitialized()) {
      screen(event, this.mixpanel, this.settings);
    }

    return event;
  }

  group(event) {
    if (this.isInitialized()) {
      group(event, this.mixpanel, this.settings);
    }

    return event;
  }

  alias(event) {
    if (this.mixpanel !== undefined) {
      alias(event, this.mixpanel, this.analytics);
    }

    return event;
  }

  flush() {
    var _this$mixpanel2;

    (_this$mixpanel2 = this.mixpanel) === null || _this$mixpanel2 === void 0 ? void 0 : _this$mixpanel2.flush();
  }

  reset() {
    var _this$mixpanel3;

    (_this$mixpanel3 = this.mixpanel) === null || _this$mixpanel3 === void 0 ? void 0 : _this$mixpanel3.reset();
  }

}
//# sourceMappingURL=MixpanelPlugin.js.map
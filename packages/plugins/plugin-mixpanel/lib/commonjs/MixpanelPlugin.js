"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MixpanelPlugin = exports.EU_SERVER = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _mixpanelReactNative = require("mixpanel-react-native");

var _identify = _interopRequireDefault(require("./methods/identify"));

var _screen = _interopRequireDefault(require("./methods/screen"));

var _group = _interopRequireDefault(require("./methods/group"));

var _alias = _interopRequireDefault(require("./methods/alias"));

var _track = _interopRequireDefault(require("./methods/track"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EU_SERVER = 'api.eu.mixpanel.com';
exports.EU_SERVER = EU_SERVER;

class MixpanelPlugin extends _analyticsReactNative.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.destination);

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

    this.mixpanel = new _mixpanelReactNative.Mixpanel(mixpanelSettings.token);
    this.mixpanel.init();
    this.settings = mixpanelSettings;

    if (mixpanelSettings.enableEuropeanEndpoint) {
      var _this$mixpanel;

      (_this$mixpanel = this.mixpanel) === null || _this$mixpanel === void 0 ? void 0 : _this$mixpanel.setServerURL(EU_SERVER);
    }
  }

  identify(event) {
    if (this.isInitialized()) {
      (0, _identify.default)(event, this.mixpanel, this.settings);
    }

    return event;
  }

  track(event) {
    const eventName = event.event;
    const properties = event.properties;

    if (this.isInitialized()) {
      (0, _track.default)(eventName, properties, this.settings, this.mixpanel);
    }

    return event;
  }

  screen(event) {
    if (this.isInitialized()) {
      (0, _screen.default)(event, this.mixpanel, this.settings);
    }

    return event;
  }

  group(event) {
    if (this.isInitialized()) {
      (0, _group.default)(event, this.mixpanel, this.settings);
    }

    return event;
  }

  alias(event) {
    if (this.mixpanel !== undefined) {
      (0, _alias.default)(event, this.mixpanel, this.analytics);
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

exports.MixpanelPlugin = MixpanelPlugin;
//# sourceMappingURL=MixpanelPlugin.js.map
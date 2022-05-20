"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppsflyerPlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _reactNativeAppsflyer = _interopRequireDefault(require("react-native-appsflyer"));

var _identify = _interopRequireDefault(require("./methods/identify"));

var _track = _interopRequireDefault(require("./methods/track"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AppsflyerPlugin extends _analyticsReactNative.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.destination);

    _defineProperty(this, "key", 'AppsFlyer');

    _defineProperty(this, "settings", null);

    _defineProperty(this, "hasRegisteredInstallCallback", false);

    _defineProperty(this, "hasRegisteredDeepLinkCallback", false);

    _defineProperty(this, "hasInitialized", false);

    _defineProperty(this, "registerConversionCallback", () => {
      _reactNativeAppsflyer.default.onInstallConversionData(res => {
        const {
          af_status,
          media_source,
          campaign,
          is_first_launch
        } = res === null || res === void 0 ? void 0 : res.data;
        const properties = {
          provider: this.key,
          campaign: {
            source: media_source,
            name: campaign
          }
        };

        if (is_first_launch === 'true') {
          if (af_status === 'Non-organic') {
            var _this$analytics;

            (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.track('Install Attributed', properties);
          } else {
            var _this$analytics2;

            (_this$analytics2 = this.analytics) === null || _this$analytics2 === void 0 ? void 0 : _this$analytics2.track('Organic Install', {
              provider: 'AppsFlyer'
            });
          }
        }
      });
    });

    _defineProperty(this, "registerDeepLinkCallback", () => {
      _reactNativeAppsflyer.default.onAppOpenAttribution(res => {
        if ((res === null || res === void 0 ? void 0 : res.status) === 'success') {
          var _this$analytics3;

          const {
            campaign,
            media_source
          } = res.data;
          const properties = {
            provider: this.key,
            campaign: {
              name: campaign,
              source: media_source
            }
          };
          (_this$analytics3 = this.analytics) === null || _this$analytics3 === void 0 ? void 0 : _this$analytics3.track('Deep Link Opened', properties);
        }
      });
    });
  }

  update(settings, _) {
    var _this$analytics4;

    let defaultOpts = {
      isDebug: false,
      timeToWaitForATTUserAuthorization: 60,
      onInstallConversionDataListener: true
    };
    const appsflyerSettings = settings.integrations[this.key];

    if (appsflyerSettings === undefined) {
      return;
    }

    const clientConfig = (_this$analytics4 = this.analytics) === null || _this$analytics4 === void 0 ? void 0 : _this$analytics4.getConfig();
    this.settings = appsflyerSettings;

    if (this.settings.trackAttributionData && !this.hasRegisteredInstallCallback) {
      this.registerConversionCallback();
      this.hasRegisteredInstallCallback = true;
    }

    if ((clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.trackDeepLinks) === true && !this.hasRegisteredDeepLinkCallback) {
      this.registerDeepLinkCallback();
      this.hasRegisteredDeepLinkCallback = true;
    }

    if (!this.hasInitialized) {
      _reactNativeAppsflyer.default.initSdk({
        devKey: this.settings.appsFlyerDevKey,
        appId: this.settings.appleAppID,
        onDeepLinkListener: (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.trackDeepLinks) === true,
        ...defaultOpts
      });

      this.hasInitialized = true;
    }
  }

  identify(event) {
    (0, _identify.default)(event);
    return event;
  }

  track(event) {
    (0, _track.default)(event);
    return event;
  }

}

exports.AppsflyerPlugin = AppsflyerPlugin;
//# sourceMappingURL=AppsflyerPlugin.js.map
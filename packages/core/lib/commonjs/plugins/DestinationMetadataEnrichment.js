"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestinationMetadataEnrichment = void 0;

var _plugin = require("../plugin");

var _types = require("../types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DestinationMetadataEnrichment extends _plugin.UtilityPlugin {
  constructor(destinationKey) {
    super();

    _defineProperty(this, "type", _types.PluginType.enrichment);

    _defineProperty(this, "destinationKey", void 0);

    this.destinationKey = destinationKey;
  }

  execute(event) {
    var _this$analytics, _this$analytics2, _plugins$map, _ref, _segmentInfo$unbundle;

    const pluginSettings = (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.settings.get();
    const plugins = (_this$analytics2 = this.analytics) === null || _this$analytics2 === void 0 ? void 0 : _this$analytics2.getPlugins(_types.PluginType.destination);

    if (pluginSettings === undefined) {
      return event;
    } // Disable all destinations that have a device mode plugin


    const destinations = (_plugins$map = plugins === null || plugins === void 0 ? void 0 : plugins.map(plugin => plugin.key)) !== null && _plugins$map !== void 0 ? _plugins$map : [];
    const bundled = [];

    for (const key of destinations) {
      if (key === this.destinationKey) {
        continue;
      }

      if (Object.keys(pluginSettings).includes(key)) {
        bundled.push(key);
      }
    }

    const unbundled = [];
    const segmentInfo = (_ref = pluginSettings[this.destinationKey]) !== null && _ref !== void 0 ? _ref : {};
    var unbundledIntegrations = (_segmentInfo$unbundle = segmentInfo.unbundledIntegrations) !== null && _segmentInfo$unbundle !== void 0 ? _segmentInfo$unbundle : [];

    if (segmentInfo.maybeBundledConfigIds) {
      const maybeBundledIntegrations = Object.keys(segmentInfo.maybeBundledConfigIds);
      unbundledIntegrations = unbundledIntegrations.concat(maybeBundledIntegrations);
    }

    for (const integration of unbundledIntegrations) {
      if (!bundled.includes(integration)) {
        unbundled.push(integration);
      }
    } // User/event defined integrations override the cloud/device mode merge


    const enrichedEvent = { ...event,
      _metadata: {
        bundled,
        unbundled,
        bundledIds: []
      }
    };
    return enrichedEvent;
  }

}

exports.DestinationMetadataEnrichment = DestinationMetadataEnrichment;
//# sourceMappingURL=DestinationMetadataEnrichment.js.map
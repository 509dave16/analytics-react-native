"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentDestination = exports.SEGMENT_DESTINATION_KEY = void 0;

var _plugin = require("../plugin");

var _types = require("../types");

var _util = require("../util");

var _api = require("../api");

var _DestinationMetadataEnrichment = require("./DestinationMetadataEnrichment");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MAX_EVENTS_PER_BATCH = 100;
const SEGMENT_DESTINATION_KEY = 'Segment.io';
exports.SEGMENT_DESTINATION_KEY = SEGMENT_DESTINATION_KEY;

class SegmentDestination extends _plugin.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _types.PluginType.destination);

    _defineProperty(this, "key", SEGMENT_DESTINATION_KEY);
  }

  configure(analytics) {
    super.configure(analytics); // Enrich events with the Destination metadata

    this.add(new _DestinationMetadataEnrichment.DestinationMetadataEnrichment(SEGMENT_DESTINATION_KEY));
  }

  execute(event) {
    const enrichedEvent = super.execute(event);

    if (enrichedEvent !== undefined) {
      var _this$analytics;

      (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.queueEvent(enrichedEvent);
    }

    return enrichedEvent;
  }

  async flush() {
    var _this$analytics$event, _this$analytics2, _this$analytics$getCo, _this$analytics3;

    const events = (_this$analytics$event = (_this$analytics2 = this.analytics) === null || _this$analytics2 === void 0 ? void 0 : _this$analytics2.events.get()) !== null && _this$analytics$event !== void 0 ? _this$analytics$event : [];
    const chunkedEvents = (0, _util.chunk)(events, (_this$analytics$getCo = (_this$analytics3 = this.analytics) === null || _this$analytics3 === void 0 ? void 0 : _this$analytics3.getConfig().maxBatchSize) !== null && _this$analytics$getCo !== void 0 ? _this$analytics$getCo : MAX_EVENTS_PER_BATCH);
    let sentEvents = [];
    let numFailedEvents = 0;
    await Promise.all(chunkedEvents.map(async batch => {
      try {
        var _this$analytics4;

        await (0, _api.sendEvents)({
          config: (_this$analytics4 = this.analytics) === null || _this$analytics4 === void 0 ? void 0 : _this$analytics4.getConfig(),
          events: batch
        });
        sentEvents = sentEvents.concat(batch);
      } catch (e) {
        console.warn(e);
        numFailedEvents += batch.length;
      } finally {
        var _this$analytics5;

        (_this$analytics5 = this.analytics) === null || _this$analytics5 === void 0 ? void 0 : _this$analytics5.removeEvents(sentEvents);
      }
    }));

    if (sentEvents.length) {
      var _this$analytics6;

      if ((_this$analytics6 = this.analytics) !== null && _this$analytics6 !== void 0 && _this$analytics6.getConfig().debug) {
        console.info(`Sent ${sentEvents.length} events`);
      }
    }

    if (numFailedEvents) {
      console.error(`Failed to send ${numFailedEvents} events.`);
    }
  }

}

exports.SegmentDestination = SegmentDestination;
//# sourceMappingURL=SegmentDestination.js.map
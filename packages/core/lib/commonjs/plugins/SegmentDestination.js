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

var _QueueFlushingPlugin = require("./QueueFlushingPlugin");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MAX_EVENTS_PER_BATCH = 100;
const MAX_PAYLOAD_SIZE_IN_KB = 500;
const SEGMENT_DESTINATION_KEY = 'Segment.io';
exports.SEGMENT_DESTINATION_KEY = SEGMENT_DESTINATION_KEY;

class SegmentDestination extends _plugin.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _types.PluginType.destination);

    _defineProperty(this, "key", SEGMENT_DESTINATION_KEY);

    _defineProperty(this, "sendEvents", async events => {
      var _this$analytics$getCo, _this$analytics;

      if (events.length === 0) {
        return Promise.resolve();
      }

      const chunkedEvents = (0, _util.chunk)(events, (_this$analytics$getCo = (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.getConfig().maxBatchSize) !== null && _this$analytics$getCo !== void 0 ? _this$analytics$getCo : MAX_EVENTS_PER_BATCH, MAX_PAYLOAD_SIZE_IN_KB);
      let sentEvents = [];
      let numFailedEvents = 0;
      await Promise.all(chunkedEvents.map(async batch => {
        try {
          var _this$analytics2;

          await (0, _api.uploadEvents)({
            config: (_this$analytics2 = this.analytics) === null || _this$analytics2 === void 0 ? void 0 : _this$analytics2.getConfig(),
            events: batch
          });
          sentEvents = sentEvents.concat(batch);
        } catch (e) {
          console.warn(e);
          numFailedEvents += batch.length;
        } finally {
          await this.queuePlugin.dequeue(sentEvents);
        }
      }));

      if (sentEvents.length) {
        var _this$analytics3;

        if ((_this$analytics3 = this.analytics) !== null && _this$analytics3 !== void 0 && _this$analytics3.getConfig().debug) {
          console.info(`Sent ${sentEvents.length} events`);
        }
      }

      if (numFailedEvents) {
        console.error(`Failed to send ${numFailedEvents} events.`);
      }

      return Promise.resolve();
    });

    _defineProperty(this, "queuePlugin", new _QueueFlushingPlugin.QueueFlushingPlugin(this.sendEvents));
  }

  configure(analytics) {
    super.configure(analytics); // Enrich events with the Destination metadata

    this.add(new _DestinationMetadataEnrichment.DestinationMetadataEnrichment(SEGMENT_DESTINATION_KEY));
    this.add(this.queuePlugin);
  }

  execute(event) {
    // Execute the internal timeline here, the queue plugin will pick up the event and add it to the queue automatically
    const enrichedEvent = super.execute(event);
    return enrichedEvent;
  }

  async flush() {
    return this.queuePlugin.flush();
  }

}

exports.SegmentDestination = SegmentDestination;
//# sourceMappingURL=SegmentDestination.js.map
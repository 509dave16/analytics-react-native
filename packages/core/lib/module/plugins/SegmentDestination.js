function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DestinationPlugin } from '../plugin';
import { PluginType } from '../types';
import { chunk } from '../util';
import { sendEvents } from '../api';
import { DestinationMetadataEnrichment } from './DestinationMetadataEnrichment';
const MAX_EVENTS_PER_BATCH = 100;
export const SEGMENT_DESTINATION_KEY = 'Segment.io';
export class SegmentDestination extends DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

    _defineProperty(this, "key", SEGMENT_DESTINATION_KEY);
  }

  configure(analytics) {
    super.configure(analytics); // Enrich events with the Destination metadata

    this.add(new DestinationMetadataEnrichment(SEGMENT_DESTINATION_KEY));
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
    const chunkedEvents = chunk(events, (_this$analytics$getCo = (_this$analytics3 = this.analytics) === null || _this$analytics3 === void 0 ? void 0 : _this$analytics3.getConfig().maxBatchSize) !== null && _this$analytics$getCo !== void 0 ? _this$analytics$getCo : MAX_EVENTS_PER_BATCH);
    let sentEvents = [];
    let numFailedEvents = 0;
    await Promise.all(chunkedEvents.map(async batch => {
      try {
        var _this$analytics4;

        await sendEvents({
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
//# sourceMappingURL=SegmentDestination.js.map